package conn

type Type string

var (
	PG     = Type("postgres")
	SQLite = Type("sqlite")
	Maria  = Type("mariadb")
)
