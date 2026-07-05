package queue

const (
	GetQueue                   = `select url from Queue limit 20`
	AddLink                    = `insert into Queue (url) values ($1) on conflict (url) do nothing;`
	RemoveLink                 = `delete from Queue where url = $1;`
	DropQueue                  = `drop table Queue;`
	CheckQueueTableExistSqlite = `SELECT name FROM sqlite_master WHERE type='table' AND name='Queue';`
	// QueueSizeApprox uses pg_class statistics for an O(1) row-count estimate.
	// The estimate is updated by autovacuum/ANALYZE, typically within minutes.
	QueueSizeApprox = `SELECT reltuples::bigint FROM pg_class WHERE relname = 'queue'`
	// PruneQueue deletes the oldest rows by heap order. Pass the number of rows to remove.
	PruneQueue = `DELETE FROM queue WHERE ctid IN (SELECT ctid FROM queue LIMIT $1)`
)
