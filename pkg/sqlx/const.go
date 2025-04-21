package sqlx

const (
	VarcharLength = 1000

	// Seen pages

	CreateSeenTable = `
    CREATE TABLE SeenPages (
        url VARCHAR(768) NOT NULL PRIMARY KEY,
        title VARCHAR(4000) NOT NULL,
        body TEXT,
        prominence INT NOT NULL,
        links TEXT
    )`
	CreateSeenTableIndex  = `CREATE INDEX idx_url ON SeenPages (url);`
	DropSeenPages         = `drop table SeenPages;`
	CheckTableMySql       = `SHOW TABLES LIKE SeenPages;`
	AddPage               = `INSERT INTO SeenPages (url, title, body, prominence,links) VALUES (?, ?, ?, ?, ?)`
	AddPagePG             = `INSERT INTO SeenPages (url, title, body, prominence,links) VALUES ($1, $2, $3, $4, $5)`
	GetPage               = `SELECT * FROM SeenPages WHERE url = ?`
	GetPagePG             = `SELECT * FROM SeenPages WHERE url = $1`
	UpdatePage            = `UPDATE SeenPages SET title = ?, body = ?, prominence = ? WHERE url = ?`
	UpdatePagePG          = `UPDATE SeenPages SET title = $1, body = $2, prominence = $3 WHERE url = $4`
	RemovePage            = `delete from SeenPages where url = ?;`
	RemovePagePG          = `delete from SeenPages where url = $1;`
	CountSeenPages        = `select count(*) as "count" from seenPages;`
	SelectDB              = `USE %s`
	CheckTableExistSqlite = `SELECT name FROM sqlite_master WHERE type='table' AND name='SeenPages';`
	GetAllPages           = `SELECT * FROM SeenPages`

	// Queue

	CreateQueueTable           = `CREATE TABLE Queue (url VARCHAR(1000));`
	GetQueue                   = `select url from Queue limit 20`
	AddLink                    = `insert into Queue (url) values ("%s");`
	RemoveLink                 = `delete from Queue where url = "%s";`
	DropQueue                  = `drop table Queue;`
	CheckQueueTableExistSqlite = `SELECT name FROM sqlite_master WHERE type='table' AND name='Queue';`

	MainDB = "main_db"
)
