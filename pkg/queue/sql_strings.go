package queue

const (
	GetQueue                   = `select url from Queue limit 20`
	AddLink                    = `insert into Queue (url) values ($1);`
	RemoveLink                 = `delete from Queue where url = $1;`
	DropQueue                  = `drop table Queue;`
	CheckQueueTableExistSqlite = `SELECT name FROM sqlite_master WHERE type='table' AND name='Queue';`
)
