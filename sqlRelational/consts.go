package sqlRelational

const (
	updateWebsite   = ``
	checkForWebsite = ``
	port            = 5432

	addWebsite = `create table website
	(
		baseurl       text
			constraint website_pk_2
				unique,
		promancevalue integer,
		uuid          uuid default uuid_generate_v4() not null
			primary key
	);

	alter table website
		owner to root;

	create index website_baseurl_index
		on website (baseurl);`

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

	dropWebsite = `drop table website;`
	dropPage    = `drop table page;`
)
