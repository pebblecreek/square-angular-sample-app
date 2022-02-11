# Project Title

A nice project with a nice description

---
## Requirements

For development, you will need Node.js and a node global package, Yarn or npm, installed in your environement.

You'll also need postgres installed as database and you'll need to create a database as well

## Important URL's
	Database
	https://www.postgresql.org/
	
	Database Explorer
	https://dbeaver.io/
	https://www.pgadmin.org/

## Install

    $ git clone https://gitlab.com/lb-developers/emotionwave/dlogixs/api.git
    $ cd api
    $ npm install OR yarn install

## Configure app

Open `config/config-backup.ts` then save it as `config/config.ts` with your settings. You will need:

Change DB username password and database name in config file mentioned above
```
db: {
	username: "postgres",
	password: "test123",
	database: "dlogixs",
	host: "localhost",
}
```
Also you need to add your host name in Allowed Domains setting in config file mentioned above

```
allowedDomains: ["http://localhost:4200", "http://localhost:3000"],
```

## Running the project

    $ npm start

## Simple build for production

    $ npm build