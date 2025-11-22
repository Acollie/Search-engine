package handler

import (
	"context"
	"errors"
	"io"
	"testing"
	"time"
	"webcrawler/cmd/spider/pkg/site"
	"webcrawler/pkg/awsx/queue"
	"webcrawler/pkg/generated/service/spider"
	sitepb "webcrawler/pkg/generated/types/site"
	mockspider "webcrawler/pkg/mocks/service/spider"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"google.golang.org/grpc/metadata"
)

// MockSiteAdder is a mock implementation of the SiteI interface
type MockSiteAdder struct {
	mock.Mock
}

func (m *MockSiteAdder) Add(ctx context.Context, page site.Page) error {
	args := m.Called(ctx, page)
	return args.Error(0)
}

// MockQueueHandler is a mock implementation of queue.HandlerI
type MockQueueHandler struct {
	mock.Mock
}

func (m *MockQueueHandler) Fetch(ctx context.Context) ([]queue.Message, error) {
	args := m.Called(ctx)
	return args.Get(0).([]queue.Message), args.Error(1)
}

func (m *MockQueueHandler) Add(ctx context.Context, message queue.Message) error {
	args := m.Called(ctx, message)
	return args.Error(0)
}

func (m *MockQueueHandler) BatchAdd(ctx context.Context, messages []queue.Message) error {
	args := m.Called(ctx, messages)
	return args.Error(0)
}

func (m *MockQueueHandler) Remove(ctx context.Context, message string) error {
	args := m.Called(ctx, message)
	return args.Error(0)
}

// MockSpiderStream is a mock implementation of the Spider_GetSeenListClient stream
type MockSpiderStream struct {
	mock.Mock
	pages    []*sitepb.Page
	pageIdx  int
	sendChan chan *spider.SeenListRequest
}

func NewMockSpiderStream() *MockSpiderStream {
	return &MockSpiderStream{
		sendChan: make(chan *spider.SeenListRequest, 1),
		pageIdx:  0,
	}
}

func (m *MockSpiderStream) Send(req *spider.SeenListRequest) error {
	args := m.Called(req)
	return args.Error(0)
}

func (m *MockSpiderStream) Recv() (*spider.SeenListResponse, error) {
	args := m.Called()
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*spider.SeenListResponse), args.Error(1)
}

func (m *MockSpiderStream) Header() (metadata.MD, error) {
	args := m.Called()
	return args.Get(0).(metadata.MD), args.Error(1)
}

func (m *MockSpiderStream) Trailer() metadata.MD {
	args := m.Called()
	return args.Get(0).(metadata.MD)
}

func (m *MockSpiderStream) CloseSend() error {
	args := m.Called()
	return args.Error(0)
}

func (m *MockSpiderStream) Context() context.Context {
	args := m.Called()
	return args.Get(0).(context.Context)
}

func (m *MockSpiderStream) SendMsg(msg interface{}) error {
	args := m.Called(msg)
	return args.Error(0)
}

func (m *MockSpiderStream) RecvMsg(msg interface{}) error {
	args := m.Called(msg)
	return args.Error(0)
}

func TestNew(t *testing.T) {
	mockSite := &MockSiteAdder{}
	mockQueue := &MockQueueHandler{}
	mockSpider := mockspider.NewMockSpiderClient(t)

	h := New(mockSite, mockQueue, mockSpider)

	assert.NotNil(t, h)
	assert.Equal(t, mockSite, h.siteI)
	assert.Equal(t, mockQueue, h.queue)
	assert.Equal(t, mockSpider, h.spiderClient)
}

func TestProcessPage_Success(t *testing.T) {
	mockSite := &MockSiteAdder{}
	mockQueue := &MockQueueHandler{}
	mockSpider := mockspider.NewMockSpiderClient(t)

	h := New(mockSite, mockQueue, mockSpider)

	ctx := context.Background()
	protoPage := &sitepb.Page{
		Url:     "https://example.com",
		Title:   "Example Page",
		Body:    "This is the body content",
		BaseUrl: "https://example.com",
		Meta: map[string]string{
			"description": "Example description",
		},
		Links: []string{
			"https://example.com/page1",
			"https://example.com/page2",
		},
	}

	// Expect Add to be called with the converted page
	mockSite.On("Add", ctx, mock.MatchedBy(func(p site.Page) bool {
		return p.URL == "https://example.com" &&
			p.Title == "Example Page" &&
			p.Body == "This is the body content" &&
			len(p.Links) == 2
	})).Return(nil)

	// Expect BatchAdd to be called with the links
	mockQueue.On("BatchAdd", ctx, mock.MatchedBy(func(msgs []queue.Message) bool {
		return len(msgs) == 2 &&
			msgs[0].Url == "https://example.com/page1" &&
			msgs[1].Url == "https://example.com/page2"
	})).Return(nil)

	err := h.processPage(ctx, protoPage)

	assert.NoError(t, err)
	mockSite.AssertExpectations(t)
	mockQueue.AssertExpectations(t)
}

func TestProcessPage_DuplicateURL(t *testing.T) {
	mockSite := &MockSiteAdder{}
	mockQueue := &MockQueueHandler{}
	mockSpider := mockspider.NewMockSpiderClient(t)

	h := New(mockSite, mockQueue, mockSpider)

	ctx := context.Background()
	protoPage := &sitepb.Page{
		Url:   "https://example.com",
		Title: "Example Page",
	}

	// Return duplicate error
	mockSite.On("Add", ctx, mock.Anything).
		Return(errors.New("duplicate key value violates unique constraint"))

	err := h.processPage(ctx, protoPage)

	// Should not return error for duplicates
	assert.NoError(t, err)
	mockSite.AssertExpectations(t)
	// Queue should not be called for duplicates
	mockQueue.AssertNotCalled(t, "BatchAdd")
}

func TestProcessPage_DatabaseError(t *testing.T) {
	mockSite := &MockSiteAdder{}
	mockQueue := &MockQueueHandler{}
	mockSpider := mockspider.NewMockSpiderClient(t)

	h := New(mockSite, mockQueue, mockSpider)

	ctx := context.Background()
	protoPage := &sitepb.Page{
		Url:   "https://example.com",
		Title: "Example Page",
	}

	expectedErr := errors.New("database connection failed")
	mockSite.On("Add", ctx, mock.Anything).Return(expectedErr)

	err := h.processPage(ctx, protoPage)

	assert.Error(t, err)
	assert.Equal(t, expectedErr, err)
	mockSite.AssertExpectations(t)
}

func TestProcessPage_QueueError(t *testing.T) {
	mockSite := &MockSiteAdder{}
	mockQueue := &MockQueueHandler{}
	mockSpider := mockspider.NewMockSpiderClient(t)

	h := New(mockSite, mockQueue, mockSpider)

	ctx := context.Background()
	protoPage := &sitepb.Page{
		Url:   "https://example.com",
		Title: "Example Page",
		Links: []string{"https://example.com/page1"},
	}

	mockSite.On("Add", ctx, mock.Anything).Return(nil)

	queueErr := errors.New("SQS unavailable")
	mockQueue.On("BatchAdd", ctx, mock.Anything).Return(queueErr)

	err := h.processPage(ctx, protoPage)

	assert.Error(t, err)
	assert.Equal(t, queueErr, err)
	mockSite.AssertExpectations(t)
	mockQueue.AssertExpectations(t)
}

func TestProcessPage_NoLinks(t *testing.T) {
	mockSite := &MockSiteAdder{}
	mockQueue := &MockQueueHandler{}
	mockSpider := mockspider.NewMockSpiderClient(t)

	h := New(mockSite, mockQueue, mockSpider)

	ctx := context.Background()
	protoPage := &sitepb.Page{
		Url:   "https://example.com",
		Title: "Example Page",
		Links: []string{}, // No links
	}

	mockSite.On("Add", ctx, mock.Anything).Return(nil)

	err := h.processPage(ctx, protoPage)

	assert.NoError(t, err)
	mockSite.AssertExpectations(t)
	// Queue should not be called when there are no links
	mockQueue.AssertNotCalled(t, "BatchAdd")
}

func TestAddLinksToQueue(t *testing.T) {
	mockSite := &MockSiteAdder{}
	mockQueue := &MockQueueHandler{}
	mockSpider := mockspider.NewMockSpiderClient(t)

	h := New(mockSite, mockQueue, mockSpider)

	ctx := context.Background()
	links := []string{
		"https://example.com/page1",
		"https://example.com/page2",
		"https://example.com/page3",
	}

	mockQueue.On("BatchAdd", ctx, mock.MatchedBy(func(msgs []queue.Message) bool {
		if len(msgs) != 3 {
			return false
		}
		for i, msg := range msgs {
			if msg.Url != links[i] {
				return false
			}
		}
		return true
	})).Return(nil)

	err := h.addLinksToQueue(ctx, links)

	assert.NoError(t, err)
	mockQueue.AssertExpectations(t)
}

func TestAddLinksToQueue_Empty(t *testing.T) {
	mockSite := &MockSiteAdder{}
	mockQueue := &MockQueueHandler{}
	mockSpider := mockspider.NewMockSpiderClient(t)

	h := New(mockSite, mockQueue, mockSpider)

	ctx := context.Background()
	links := []string{}

	mockQueue.On("BatchAdd", ctx, mock.MatchedBy(func(msgs []queue.Message) bool {
		return len(msgs) == 0
	})).Return(nil)

	err := h.addLinksToQueue(ctx, links)

	assert.NoError(t, err)
	mockQueue.AssertExpectations(t)
}

func TestIsDuplicateError(t *testing.T) {
	tests := []struct {
		name     string
		err      error
		expected bool
	}{
		{
			name:     "nil error",
			err:      nil,
			expected: false,
		},
		{
			name:     "duplicate constraint error",
			err:      errors.New("duplicate key value violates unique constraint"),
			expected: true,
		},
		{
			name:     "other database error",
			err:      errors.New("connection timeout"),
			expected: false,
		},
		{
			name:     "partial match should not work",
			err:      errors.New("some duplicate error"),
			expected: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := isDuplicateError(tt.err)
			assert.Equal(t, tt.expected, result)
		})
	}
}

func TestProcessBatch_Success(t *testing.T) {
	mockSite := &MockSiteAdder{}
	mockQueue := &MockQueueHandler{}
	mockSpider := mockspider.NewMockSpiderClient(t)

	h := New(mockSite, mockQueue, mockSpider)

	ctx := context.Background()
	mockStream := NewMockSpiderStream()

	// Setup mock stream
	mockSpider.EXPECT().
		GetSeenList(mock.Anything).
		Return(mockStream, nil)

	mockStream.On("Send", mock.MatchedBy(func(req *spider.SeenListRequest) bool {
		return req.Limit == 100
	})).Return(nil)

	// First recv returns pages
	response := &spider.SeenListResponse{
		SeenSites: []*sitepb.Page{
			{
				Url:   "https://example.com/page1",
				Title: "Page 1",
				Body:  "Content 1",
			},
			{
				Url:   "https://example.com/page2",
				Title: "Page 2",
				Body:  "Content 2",
			},
		},
	}
	mockStream.On("Recv").Return(response, nil).Once()

	// Second recv returns EOF
	mockStream.On("Recv").Return(nil, io.EOF).Once()

	// Expect pages to be processed
	mockSite.On("Add", mock.Anything, mock.Anything).Return(nil).Twice()

	err := h.processBatch(ctx)

	assert.NoError(t, err)
	mockSite.AssertExpectations(t)
	mockStream.AssertExpectations(t)
}

func TestProcessBatch_StreamError(t *testing.T) {
	mockSite := &MockSiteAdder{}
	mockQueue := &MockQueueHandler{}
	mockSpider := mockspider.NewMockSpiderClient(t)

	h := New(mockSite, mockQueue, mockSpider)

	ctx := context.Background()

	expectedErr := errors.New("failed to connect to spider")
	mockSpider.EXPECT().
		GetSeenList(mock.Anything).
		Return(nil, expectedErr)

	err := h.processBatch(ctx)

	assert.Error(t, err)
	assert.Equal(t, expectedErr, err)
}

func TestProcessBatch_SendError(t *testing.T) {
	mockSite := &MockSiteAdder{}
	mockQueue := &MockQueueHandler{}
	mockSpider := mockspider.NewMockSpiderClient(t)

	h := New(mockSite, mockQueue, mockSpider)

	ctx := context.Background()
	mockStream := NewMockSpiderStream()

	mockSpider.EXPECT().
		GetSeenList(mock.Anything).
		Return(mockStream, nil)

	sendErr := errors.New("failed to send request")
	mockStream.On("Send", mock.Anything).Return(sendErr)

	err := h.processBatch(ctx)

	assert.Error(t, err)
	assert.Equal(t, sendErr, err)
}

func TestProcessBatch_RecvError(t *testing.T) {
	mockSite := &MockSiteAdder{}
	mockQueue := &MockQueueHandler{}
	mockSpider := mockspider.NewMockSpiderClient(t)

	h := New(mockSite, mockQueue, mockSpider)

	ctx := context.Background()
	mockStream := NewMockSpiderStream()

	mockSpider.EXPECT().
		GetSeenList(mock.Anything).
		Return(mockStream, nil)

	mockStream.On("Send", mock.Anything).Return(nil)

	recvErr := errors.New("stream interrupted")
	mockStream.On("Recv").Return(nil, recvErr)

	err := h.processBatch(ctx)

	assert.Error(t, err)
	assert.Equal(t, recvErr, err)
}

func TestProcessBatch_ContextCanceled(t *testing.T) {
	mockSite := &MockSiteAdder{}
	mockQueue := &MockQueueHandler{}
	mockSpider := mockspider.NewMockSpiderClient(t)

	h := New(mockSite, mockQueue, mockSpider)

	ctx, cancel := context.WithCancel(context.Background())
	cancel() // Cancel immediately

	mockStream := NewMockSpiderStream()

	mockSpider.EXPECT().
		GetSeenList(mock.Anything).
		Return(mockStream, nil)

	mockStream.On("Send", mock.Anything).Return(nil)

	err := h.processBatch(ctx)

	assert.Error(t, err)
	assert.Equal(t, context.Canceled, err)
}

func TestProcessBatch_WithErrors(t *testing.T) {
	mockSite := &MockSiteAdder{}
	mockQueue := &MockQueueHandler{}
	mockSpider := mockspider.NewMockSpiderClient(t)

	h := New(mockSite, mockQueue, mockSpider)

	ctx := context.Background()
	mockStream := NewMockSpiderStream()

	mockSpider.EXPECT().
		GetSeenList(mock.Anything).
		Return(mockStream, nil)

	mockStream.On("Send", mock.Anything).Return(nil)

	// Response with errors from Spider
	response := &spider.SeenListResponse{
		SeenSites: []*sitepb.Page{
			{
				Url:   "https://example.com/page1",
				Title: "Page 1",
			},
		},
		Errors: []*sitepb.Error{
			{
				Code:    500,
				Message: "Failed to crawl",
				Url:     "https://failed.com",
			},
		},
	}
	mockStream.On("Recv").Return(response, nil).Once()
	mockStream.On("Recv").Return(nil, io.EOF).Once()

	mockSite.On("Add", mock.Anything, mock.Anything).Return(nil)

	err := h.processBatch(ctx)

	// Should not fail even with spider errors
	assert.NoError(t, err)
	mockSite.AssertExpectations(t)
}

func TestListen_GracefulShutdown(t *testing.T) {
	mockSite := &MockSiteAdder{}
	mockQueue := &MockQueueHandler{}
	mockSpider := mockspider.NewMockSpiderClient(t)

	h := New(mockSite, mockQueue, mockSpider)

	ctx, cancel := context.WithCancel(context.Background())

	// Mock successful stream creation to allow clean shutdown
	mockStream := NewMockSpiderStream()
	mockSpider.EXPECT().
		GetSeenList(mock.Anything).
		Return(mockStream, nil).
		Maybe()

	mockStream.On("Send", mock.Anything).Return(nil).Maybe()
	mockStream.On("Recv").Return(nil, io.EOF).Maybe()

	// Listen should return when context is canceled
	done := make(chan bool)
	go func() {
		h.Listen(ctx)
		done <- true
	}()

	// Give it a moment to start
	time.Sleep(50 * time.Millisecond)

	// Cancel context
	cancel()

	select {
	case <-done:
		// Success - Listen returned
	case <-time.After(2 * time.Second):
		t.Fatal("Listen did not return after context cancellation")
	}
}

func TestProcessPage_MetadataExtraction(t *testing.T) {
	mockSite := &MockSiteAdder{}
	mockQueue := &MockQueueHandler{}
	mockSpider := mockspider.NewMockSpiderClient(t)

	h := New(mockSite, mockQueue, mockSpider)

	ctx := context.Background()
	protoPage := &sitepb.Page{
		Url:     "https://example.com",
		Title:   "Example Page",
		Body:    "Content",
		BaseUrl: "https://example.com",
		Meta: map[string]string{
			"description":    "Page description",
			"keywords":       "test,example",
			"og:title":       "Open Graph Title",
			"og:description": "Open Graph Description",
		},
	}

	mockSite.On("Add", ctx, mock.MatchedBy(func(p site.Page) bool {
		return p.Meta["description"] == "Page description" &&
			p.Meta["keywords"] == "test,example" &&
			p.Meta["og:title"] == "Open Graph Title"
	})).Return(nil)

	err := h.processPage(ctx, protoPage)

	assert.NoError(t, err)
	mockSite.AssertExpectations(t)
}

func BenchmarkProcessPage(b *testing.B) {
	mockSite := &MockSiteAdder{}
	mockQueue := &MockQueueHandler{}
	mockSpider := mockspider.NewMockSpiderClient(b)

	h := New(mockSite, mockQueue, mockSpider)

	ctx := context.Background()
	protoPage := &sitepb.Page{
		Url:     "https://example.com",
		Title:   "Example Page",
		Body:    "Content",
		BaseUrl: "https://example.com",
		Meta:    map[string]string{"description": "test"},
		Links:   []string{"https://example.com/1", "https://example.com/2"},
	}

	mockSite.On("Add", mock.Anything, mock.Anything).Return(nil)
	mockQueue.On("BatchAdd", mock.Anything, mock.Anything).Return(nil)

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		h.processPage(ctx, protoPage)
	}
}
