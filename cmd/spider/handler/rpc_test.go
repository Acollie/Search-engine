package handler

import (
	"context"
	"io"
	"testing"
	"webcrawler/cmd/spider/pkg/site"
	"webcrawler/pkg/generated/service/spider"
	"webcrawler/pkg/sqlx"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"google.golang.org/grpc/metadata"
)

// MockPageDB is a mock implementation of page.DbiPage
type MockPageDB struct {
	mock.Mock
}

func (m *MockPageDB) SavePage(ctx context.Context, page site.Page) error {
	args := m.Called(ctx, page)
	return args.Error(0)
}

func (m *MockPageDB) UpdatePage(ctx context.Context, page site.Page) error {
	args := m.Called(ctx, page)
	return args.Error(0)
}

func (m *MockPageDB) GetPage(ctx context.Context, url string) (*site.Page, error) {
	args := m.Called(ctx, url)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*site.Page), args.Error(1)
}

func (m *MockPageDB) GetAllPages(ctx context.Context) ([]site.Page, error) {
	args := m.Called(ctx)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).([]site.Page), args.Error(1)
}

func (m *MockPageDB) GetPagesPaginated(ctx context.Context, limit, offset int32) ([]site.Page, error) {
	args := m.Called(ctx, limit, offset)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).([]site.Page), args.Error(1)
}

func (m *MockPageDB) DeletePage(ctx context.Context, url string) error {
	args := m.Called(ctx, url)
	return args.Error(0)
}

func (m *MockPageDB) NumberOfPages(ctx context.Context) (int, error) {
	args := m.Called(ctx)
	return args.Int(0), args.Error(1)
}

func (m *MockPageDB) CreateIndex(ctx context.Context) error {
	args := m.Called(ctx)
	return args.Error(0)
}

func (m *MockPageDB) CreateTable(ctx context.Context) error {
	args := m.Called(ctx)
	return args.Error(0)
}

func (m *MockPageDB) DropTable(ctx context.Context) error {
	args := m.Called(ctx)
	return args.Error(0)
}

// MockQueueDB is a mock implementation of queue.DbiQueue
type MockQueueDB struct {
	mock.Mock
}

func (m *MockQueueDB) GetExplore(ctx context.Context) ([]string, error) {
	args := m.Called(ctx)
	return args.Get(0).([]string), args.Error(1)
}

func (m *MockQueueDB) AddLink(ctx context.Context, url string) error {
	args := m.Called(ctx, url)
	return args.Error(0)
}

func (m *MockQueueDB) AddLinks(ctx context.Context, links []string) error {
	args := m.Called(ctx, links)
	return args.Error(0)
}

func (m *MockQueueDB) RemoveLink(ctx context.Context, link string) error {
	args := m.Called(ctx, link)
	return args.Error(0)
}

// MockSpiderStream is a mock implementation of the bidirectional stream
type MockSpiderStream struct {
	mock.Mock
	requests  []*spider.SeenListRequest
	responses []*spider.SeenListResponse
	sendIdx   int
	recvIdx   int
}

func NewMockSpiderStream() *MockSpiderStream {
	return &MockSpiderStream{
		requests:  []*spider.SeenListRequest{},
		responses: []*spider.SeenListResponse{},
	}
}

func (m *MockSpiderStream) Send(resp *spider.SeenListResponse) error {
	args := m.Called(resp)
	m.responses = append(m.responses, resp)
	return args.Error(0)
}

func (m *MockSpiderStream) Recv() (*spider.SeenListRequest, error) {
	args := m.Called()
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*spider.SeenListRequest), args.Error(1)
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

func (m *MockSpiderStream) SetHeader(md metadata.MD) error {
	args := m.Called(md)
	return args.Error(0)
}

func (m *MockSpiderStream) SendHeader(md metadata.MD) error {
	args := m.Called(md)
	return args.Error(0)
}

func (m *MockSpiderStream) SetTrailer(md metadata.MD) {
	m.Called(md)
}

func TestNewRPCServer(t *testing.T) {
	mockPageDB := &MockPageDB{}
	mockQueueDB := &MockQueueDB{}

	db := sqlx.Db{
		Page:  mockPageDB,
		Queue: mockQueueDB,
	}

	server := NewRPCServer(db)

	assert.NotNil(t, server)
	assert.Equal(t, db, server.db)
}

func Test_GetSeenList_Success(t *testing.T) {
	mockPageDB := &MockPageDB{}
	mockQueueDB := &MockQueueDB{}

	db := sqlx.Db{
		Page:  mockPageDB,
		Queue: mockQueueDB,
	}

	server := NewRPCServer(db)

	// Mock pages data
	pages := []site.Page{
		{
			URL:   "https://example.com",
			Title: "Example Page",
			Body:  "Content",
		},
		{
			URL:   "https://test.com",
			Title: "Test Page",
			Body:  "Test Content",
		},
	}

	ctx := context.Background()

	// Setup mock expectations
	mockPageDB.On("GetPagesPaginated", ctx, int32(100), int32(0)).Return(pages, nil)

	// Create mock stream
	mockStream := NewMockSpiderStream()

	request := &spider.SeenListRequest{
		Limit: 100,
	}

	// First Recv returns request, then EOF
	mockStream.On("Recv").Return(request, nil).Once()
	mockStream.On("Context").Return(ctx)
	mockStream.On("Send", mock.MatchedBy(func(resp *spider.SeenListResponse) bool {
		return len(resp.SeenSites) == 2 &&
			resp.SeenSites[0].Url == "https://example.com" &&
			resp.SeenSites[1].Url == "https://test.com"
	})).Return(nil).Once()
	mockStream.On("Recv").Return(nil, io.EOF).Once()

	// Execute
	err := server.GetSeenList(mockStream)

	assert.NoError(t, err)
	mockPageDB.AssertExpectations(t)
	mockStream.AssertExpectations(t)
}

func Test_GetSeenList_EmptyDatabase(t *testing.T) {
	mockPageDB := &MockPageDB{}
	mockQueueDB := &MockQueueDB{}

	db := sqlx.Db{
		Page:  mockPageDB,
		Queue: mockQueueDB,
	}

	server := NewRPCServer(db)

	ctx := context.Background()

	// Mock empty pages
	mockPageDB.On("GetPagesPaginated", ctx, int32(100), int32(0)).Return([]site.Page{}, nil)

	mockStream := NewMockSpiderStream()

	request := &spider.SeenListRequest{
		Limit: 100,
	}

	mockStream.On("Recv").Return(request, nil).Once()
	mockStream.On("Context").Return(ctx)
	mockStream.On("Send", mock.MatchedBy(func(resp *spider.SeenListResponse) bool {
		return len(resp.SeenSites) == 0
	})).Return(nil).Once()
	mockStream.On("Recv").Return(nil, io.EOF).Once()

	err := server.GetSeenList(mockStream)

	assert.NoError(t, err)
	mockPageDB.AssertExpectations(t)
}

func Test_GetSeenList_DatabaseError(t *testing.T) {
	mockPageDB := &MockPageDB{}
	mockQueueDB := &MockQueueDB{}

	db := sqlx.Db{
		Page:  mockPageDB,
		Queue: mockQueueDB,
	}

	server := NewRPCServer(db)

	ctx := context.Background()

	// Mock database error
	mockPageDB.On("GetPagesPaginated", ctx, int32(100), int32(0)).Return(nil, assert.AnError)

	mockStream := NewMockSpiderStream()

	request := &spider.SeenListRequest{
		Limit: 100,
	}

	mockStream.On("Recv").Return(request, nil).Once()
	mockStream.On("Context").Return(ctx)

	err := server.GetSeenList(mockStream)

	assert.Error(t, err)
	mockPageDB.AssertExpectations(t)
}

func Test_GetSeenList_RecvError(t *testing.T) {
	mockPageDB := &MockPageDB{}
	mockQueueDB := &MockQueueDB{}

	db := sqlx.Db{
		Page:  mockPageDB,
		Queue: mockQueueDB,
	}

	server := NewRPCServer(db)

	mockStream := NewMockSpiderStream()

	// Recv returns error immediately
	mockStream.On("Recv").Return(nil, assert.AnError)

	err := server.GetSeenList(mockStream)

	assert.Error(t, err)
	mockStream.AssertExpectations(t)
}

func Test_GetSeenList_SendError(t *testing.T) {
	mockPageDB := &MockPageDB{}
	mockQueueDB := &MockQueueDB{}

	db := sqlx.Db{
		Page:  mockPageDB,
		Queue: mockQueueDB,
	}

	server := NewRPCServer(db)

	ctx := context.Background()

	pages := []site.Page{
		{URL: "https://example.com", Title: "Example"},
	}

	mockPageDB.On("GetPagesPaginated", ctx, int32(100), int32(0)).Return(pages, nil)

	mockStream := NewMockSpiderStream()

	request := &spider.SeenListRequest{Limit: 100}

	mockStream.On("Recv").Return(request, nil).Once()
	mockStream.On("Context").Return(ctx)
	mockStream.On("Send", mock.Anything).Return(assert.AnError)

	err := server.GetSeenList(mockStream)

	assert.Error(t, err)
	mockPageDB.AssertExpectations(t)
	mockStream.AssertExpectations(t)
}

func Test_GetSeenList_MultipleRequests(t *testing.T) {
	mockPageDB := &MockPageDB{}
	mockQueueDB := &MockQueueDB{}

	db := sqlx.Db{
		Page:  mockPageDB,
		Queue: mockQueueDB,
	}

	server := NewRPCServer(db)

	ctx := context.Background()

	pages := []site.Page{
		{URL: "https://example.com", Title: "Example"},
	}

	// GetPagesPaginated called multiple times
	mockPageDB.On("GetPagesPaginated", ctx, int32(100), int32(0)).Return(pages, nil).Times(3)

	mockStream := NewMockSpiderStream()

	request := &spider.SeenListRequest{Limit: 100}

	// Multiple requests before EOF
	mockStream.On("Recv").Return(request, nil).Once()
	mockStream.On("Context").Return(ctx)
	mockStream.On("Send", mock.Anything).Return(nil).Once()

	mockStream.On("Recv").Return(request, nil).Once()
	mockStream.On("Send", mock.Anything).Return(nil).Once()

	mockStream.On("Recv").Return(request, nil).Once()
	mockStream.On("Send", mock.Anything).Return(nil).Once()

	mockStream.On("Recv").Return(nil, io.EOF).Once()

	err := server.GetSeenList(mockStream)

	assert.NoError(t, err)
	mockPageDB.AssertExpectations(t)
	mockStream.AssertExpectations(t)
}

func Test_GetSeenList_RespectsLimit(t *testing.T) {
	// This test verifies limit is now respected (bug fixed)
	mockPageDB := &MockPageDB{}
	mockQueueDB := &MockQueueDB{}

	db := sqlx.Db{
		Page:  mockPageDB,
		Queue: mockQueueDB,
	}

	server := NewRPCServer(db)

	ctx := context.Background()

	// Create 1000 pages
	pages := make([]site.Page, 1000)
	for i := range pages {
		pages[i] = site.Page{
			URL:   "https://example.com/" + string(rune(i)),
			Title: "Page " + string(rune(i)),
		}
	}

	// DB returns only the requested 10 pages (pagination handled at DB layer)
	mockPageDB.On("GetPagesPaginated", ctx, int32(10), int32(0)).Return(pages[:10], nil)

	mockStream := NewMockSpiderStream()

	// Request only 10 pages, should get exactly 10
	request := &spider.SeenListRequest{Limit: 10}

	mockStream.On("Recv").Return(request, nil).Once()
	mockStream.On("Context").Return(ctx)
	mockStream.On("Send", mock.MatchedBy(func(resp *spider.SeenListResponse) bool {
		return len(resp.SeenSites) == 10
	})).Return(nil).Once()
	mockStream.On("Recv").Return(nil, io.EOF).Once()

	err := server.GetSeenList(mockStream)

	assert.NoError(t, err)
	mockPageDB.AssertExpectations(t)
}

func Test_GetSeenList_DefaultLimit(t *testing.T) {
	// Test default limit of 100 when limit=0
	mockPageDB := &MockPageDB{}
	mockQueueDB := &MockQueueDB{}

	db := sqlx.Db{
		Page:  mockPageDB,
		Queue: mockQueueDB,
	}

	server := NewRPCServer(db)

	ctx := context.Background()

	// Create 200 pages
	pages := make([]site.Page, 200)
	for i := range pages {
		pages[i] = site.Page{
			URL:   "https://example.com/" + string(rune(i)),
			Title: "Page " + string(rune(i)),
		}
	}

	// DB returns only 100 pages (default limit applied before DB call)
	mockPageDB.On("GetPagesPaginated", ctx, int32(100), int32(0)).Return(pages[:100], nil)

	mockStream := NewMockSpiderStream()

	// Request with limit=0, should default to 100
	request := &spider.SeenListRequest{Limit: 0}

	mockStream.On("Recv").Return(request, nil).Once()
	mockStream.On("Context").Return(ctx)
	mockStream.On("Send", mock.MatchedBy(func(resp *spider.SeenListResponse) bool {
		return len(resp.SeenSites) == 100
	})).Return(nil).Once()
	mockStream.On("Recv").Return(nil, io.EOF).Once()

	err := server.GetSeenList(mockStream)

	assert.NoError(t, err)
	mockPageDB.AssertExpectations(t)
}

func Test_GetSeenList_MaxLimit(t *testing.T) {
	// Test maximum limit of 1000
	mockPageDB := &MockPageDB{}
	mockQueueDB := &MockQueueDB{}

	db := sqlx.Db{
		Page:  mockPageDB,
		Queue: mockQueueDB,
	}

	server := NewRPCServer(db)

	ctx := context.Background()

	// Create 2000 pages
	pages := make([]site.Page, 2000)
	for i := range pages {
		pages[i] = site.Page{
			URL:   "https://example.com/" + string(rune(i)),
			Title: "Page " + string(rune(i)),
		}
	}

	// DB returns only 100 pages (1500 exceeds max of 1000, capped to default 100)
	mockPageDB.On("GetPagesPaginated", ctx, int32(100), int32(0)).Return(pages[:100], nil)

	mockStream := NewMockSpiderStream()

	// Request 1500 pages, should be capped at 100 (default since 1500 > 1000)
	request := &spider.SeenListRequest{Limit: 1500}

	mockStream.On("Recv").Return(request, nil).Once()
	mockStream.On("Context").Return(ctx)
	mockStream.On("Send", mock.MatchedBy(func(resp *spider.SeenListResponse) bool {
		return len(resp.SeenSites) == 100
	})).Return(nil).Once()
	mockStream.On("Recv").Return(nil, io.EOF).Once()

	err := server.GetSeenList(mockStream)

	assert.NoError(t, err)
	mockPageDB.AssertExpectations(t)
}

func Test_internalGetSeenList_Success(t *testing.T) {
	mockPageDB := &MockPageDB{}
	mockQueueDB := &MockQueueDB{}

	db := sqlx.Db{
		Page:  mockPageDB,
		Queue: mockQueueDB,
	}

	server := NewRPCServer(db)

	ctx := context.Background()

	pages := []site.Page{
		{
			URL:     "https://example.com",
			Title:   "Example",
			Body:    "Content",
			BaseURL: "example.com",
			Meta:    map[string]string{"description": "test"},
		},
	}

	mockPageDB.On("GetPagesPaginated", ctx, int32(100), int32(0)).Return(pages, nil)

	request := &spider.SeenListRequest{Limit: 100}

	response, err := server._GetSeenList(ctx, request)

	assert.NoError(t, err)
	assert.NotNil(t, response)
	assert.Len(t, response.SeenSites, 1)
	assert.Equal(t, "https://example.com", response.SeenSites[0].Url)
	assert.Equal(t, "Example", response.SeenSites[0].Title)

	// Note: Body, Meta, etc are NOT included in response (potential bug)
	mockPageDB.AssertExpectations(t)
}

func Test_internalGetSeenList_DatabaseError(t *testing.T) {
	mockPageDB := &MockPageDB{}
	mockQueueDB := &MockQueueDB{}

	db := sqlx.Db{
		Page:  mockPageDB,
		Queue: mockQueueDB,
	}

	server := NewRPCServer(db)

	ctx := context.Background()

	mockPageDB.On("GetPagesPaginated", ctx, int32(100), int32(0)).Return(nil, assert.AnError)

	request := &spider.SeenListRequest{Limit: 100}

	response, err := server._GetSeenList(ctx, request)

	assert.Error(t, err)
	assert.Nil(t, response)
	mockPageDB.AssertExpectations(t)
}

func BenchmarkGetSeenList(b *testing.B) {
	mockPageDB := &MockPageDB{}
	mockQueueDB := &MockQueueDB{}

	db := sqlx.Db{
		Page:  mockPageDB,
		Queue: mockQueueDB,
	}

	server := NewRPCServer(db)

	ctx := context.Background()

	pages := make([]site.Page, 100)
	for i := range pages {
		pages[i] = site.Page{
			URL:   "https://example.com/" + string(rune(i)),
			Title: "Page",
		}
	}

	mockPageDB.On("GetPagesPaginated", ctx, int32(100), int32(0)).Return(pages, nil)

	request := &spider.SeenListRequest{Limit: 100}

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		server._GetSeenList(ctx, request)
	}
}
