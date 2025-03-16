package sqlRelational

const (
	port = 5432

	addPage = `create table page
	(
		pageurl       varchar                            not null,
		title         varchar,
		body          text,
		baseurl       varchar,
		uuid          uuid    default uuid_generate_v4() not null
			primary key,
		promancevalue integer default 1                  not null
	);

	alter table page
		owner to root;

	create index page_pageurl_index
		on page (pageurl);`

	dropPage = `drop table page;`
)
