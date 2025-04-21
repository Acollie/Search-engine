package sqlx

type ConnType string

var (
	PG     ConnType = ConnType("postgres")
	SQLite ConnType = ConnType("sqlite")
	Maria  ConnType = ConnType("mariadb")
)
