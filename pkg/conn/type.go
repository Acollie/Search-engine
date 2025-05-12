package conn

type ConnType string

var (
	PG     = ConnType("postgres")
	SQLite = ConnType("sqlite")
	Maria  = ConnType("mariadb")
)
