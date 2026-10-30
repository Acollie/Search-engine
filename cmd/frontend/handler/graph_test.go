package handler

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
)

func TestBuildCocitationEdges(t *testing.T) {
	nodes := []GraphNode{
		{ID: "1", URL: "http://a"}, {ID: "2", URL: "http://b"},
		{ID: "3", URL: "http://c"}, {ID: "4", URL: "http://d"},
		{ID: "5", URL: "http://e"}, {ID: "6", URL: "http://f"},
	}
	links := map[string]string{
		"1": "x1------x2------x3------x4------nav",
		"2": "x1------x2------x3------nav",
		"3": "x9------nav",
		"4": "http://a------nav", // direct link 4 -> 1
		"5": "nav",
		"6": "",
	}
	edges := buildCocitationEdges(nodes, links)
	got := map[string]int{}
	for _, e := range edges {
		got[e.Source+"-"+e.Target] = e.Weight
	}
	if got["1-2"] != 3 {
		t.Errorf("expected 1-2 weight 3 (nav ignored), got %v", got)
	}
	if got["1-4"] != constellationMinShared {
		t.Errorf("expected direct edge 1-4, got %v", got)
	}
	if len(edges) != 2 {
		t.Errorf("expected 2 edges, got %v", edges)
	}
}

func TestGraphHandleConstellation(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	mock.ExpectQuery("FROM seenpages sp").WithArgs(10, graphCandidateLimit).
		WillReturnRows(sqlmock.NewRows([]string{"id", "url", "title", "score"}).
			AddRow(1, "http://a", "A", 0.5).AddRow(2, "http://b", "B", 0.4))
	mock.ExpectQuery("SELECT id, left\\(links, 150000\\) FROM seenpages WHERE id = ANY").
		WillReturnRows(sqlmock.NewRows([]string{"id", "links"}).
			AddRow(1, "s1------s2------s3").AddRow(2, "s1------s2------s3"))

	h := NewGraphHandler(db)
	rec := httptest.NewRecorder()
	h.Handle(rec, httptest.NewRequest(http.MethodGet, "/api/graph?n=10&mode=constellation", nil))
	if rec.Code != 200 {
		t.Fatalf("status %d", rec.Code)
	}
	var resp GraphResponse
	if err := json.Unmarshal(rec.Body.Bytes(), &resp); err != nil {
		t.Fatal(err)
	}
	if len(resp.Nodes) != 2 || len(resp.Edges) != 1 || resp.Edges[0].Weight != 3 {
		t.Fatalf("unexpected response %+v", resp)
	}

	// Second call must be served from cache (no further queries expected).
	rec2 := httptest.NewRecorder()
	h.Handle(rec2, httptest.NewRequest(http.MethodGet, "/api/graph?n=10&mode=constellation", nil))
	if rec2.Body.String() != rec.Body.String() {
		t.Error("expected cached identical payload")
	}
	if err := mock.ExpectationsWereMet(); err != nil {
		t.Error(err)
	}
}
