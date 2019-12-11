# Jest Lunch and Learn
## 

Website: `https://jestjs.io/`

## Prerequisites

1. Clone this repository (already done!)
2. Install `docker` and `docker-compose`. You can do so using Docker Desktop at `https://www.docker.com/products/docker-desktop`.

## Setup
1. Run `docker-compose up server-install`. This will install the node modules that the server and tests will need to run in a volume inside docker. You may also choose to run `yarn install` or `npm install` to install your own `node_modules` folder, but docker won't use this.
2. Run `docker-compose up adminer db_test`. This will start the test database, which on first startup will create an initial database, and adminer, a mysql UI. It's a simple php server, but quite unbreakable.
3. In a browser, navigate to `http://localhost:8081` and log in with these values:

```
Server: db_test
Username: root
Password: example
Database: database
```

If it complains about an invalid database, that's because mysql is still setting up the initial database. It should resolve in a couple minutes.

## Info

This repo contains some docker containers:

- MySQL Databases
- A nodeJS server running express, which you can view at `http://localhost:8080` (once its docker container is running.)
- A jest test container, for running tests that require a server or a database connection.
- Adminer, a MySQL gui. You can use adminer by navigating to `http://localhost:8081` (once it is running).

## Testing

To run Jest tests, run `docker-compose up server-test`. This will start the server container and execute a yarn command inside it to run the tests.
