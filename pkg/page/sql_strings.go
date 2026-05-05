package page

const (
	CreateSeenTable = `
    CREATE TABLE IF NOT EXISTS SeenPages (
        url VARCHAR(768) NOT NULL PRIMARY KEY,
        title VARCHAR(4000) NOT NULL,
        body TEXT,
        prominence INT NOT NULL,
        links TEXT
    )`
	DropSeenPages        = `drop table SeenPages;`
	CreateSeenTableIndex = `CREATE INDEX IF NOT EXISTS idx_url ON SeenPages (url);`
	AddPage              = `INSERT INTO SeenPages (url, title, body, prominence,links) VALUES (?, ?, ?, ?, ?)`
	AddPagePG            = `INSERT INTO SeenPages (url, title, body, prominence,links) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (url) DO NOTHING`
	GetPage              = `SELECT url, title, body, prominence, links FROM SeenPages WHERE url = ?`
	GetPagePG            = `SELECT url, title, body, prominence, links FROM SeenPages WHERE url = $1`
	UpdatePage           = `UPDATE SeenPages SET title = ?, body = ?, prominence = ? WHERE url = ?`
	UpdatePagePG         = `UPDATE SeenPages SET title = $1, body = $2, prominence = $3 WHERE url = $4`
	RemovePage           = `delete from SeenPages where url = ?;`
	RemovePagePG         = `delete from SeenPages where url = $1;`
	GetAllPages          = `SELECT url, title, body, prominence, links FROM SeenPages`
	GetPagesPaginated    = `SELECT url, title, body, prominence, links FROM SeenPages ORDER BY url LIMIT ? OFFSET ?`
	GetPagesPaginatedPG  = `SELECT url, title, body, prominence, links FROM SeenPages ORDER BY url LIMIT $1 OFFSET $2`
	CountSeenPages       = `select count(*) as "count" from seenPages;`
)
