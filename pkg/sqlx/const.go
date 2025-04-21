package sqlx

const (
	VarcharLength = 1000

	CheckTableMySql       = `SHOW TABLES LIKE SeenPages;`
	SelectDB              = `USE %s`
	CheckTableExistSqlite = `SELECT name FROM sqlite_master WHERE type='table' AND name='SeenPages';`

	// Queue

	MainDB = "main_db"
)
