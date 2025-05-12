package page

const (
	CreateSeenTable = `
    CREATE TABLE SeenPages (
        url VARCHAR(768) NOT NULL PRIMARY KEY,
        title VARCHAR(4000) NOT NULL,
        body TEXT,
        prominence INT NOT NULL,
        links TEXT
    )`
	DropSeenPages        = `drop table SeenPages;`
	CreateSeenTableIndex = `CREATE INDEX idx_url ON SeenPages (url);`
	AddPage              = `INSERT INTO SeenPages (url, title, body, prominence,links) VALUES (?, ?, ?, ?, ?)`
	AddPagePG            = `INSERT INTO SeenPages (url, title, body, prominence,links) VALUES ($1, $2, $3, $4, $5)`
	GetPage              = `SELECT * FROM SeenPages WHERE url = ?`
	GetPagePG            = `SELECT * FROM SeenPages WHERE url = $1`
	UpdatePage           = `UPDATE SeenPages SET title = ?, body = ?, prominence = ? WHERE url = ?`
	UpdatePagePG         = `UPDATE SeenPages SET title = $1, body = $2, prominence = $3 WHERE url = $4`
	RemovePage           = `delete from SeenPages where url = ?;`
	RemovePagePG         = `delete from SeenPages where url = $1;`
	GetAllPages          = `SELECT * FROM SeenPages`
	CountSeenPages       = `select count(*) as "count" from seenPages;`
)
