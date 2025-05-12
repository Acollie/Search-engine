package sqlx

const (
	VarcharLength = 1000

	CheckTableMySql       = `SHOW TABLES LIKE SeenPages;`
	CheckTableExistSqlite = `SELECT name FROM sqlite_master WHERE type='table' AND name='SeenPages';`
)
