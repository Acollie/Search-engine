package queue

const (
	GetQueue                   = `select url from Queue limit 20`
	AddLink                    = `insert into Queue (url) values ("%s");`
	RemoveLink                 = `delete from Queue where url = "%s";`
	DropQueue                  = `drop table Queue;`
	CheckQueueTableExistSqlite = `SELECT name FROM sqlite_master WHERE type='table' AND name='Queue';`
)
