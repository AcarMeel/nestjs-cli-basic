Video Introduction to Data Transfer Objects
Min 5:04

## Open Docker. Start port
## Start containers in detached / background mode
```docker-compose up -d
```

## Stop containers
```docker-compose down
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
http://localhost:3000/


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## RUNNING MIGRATIONS 

/**
 * 💡 Remember 💡
 * You must BUILD your Nest project (so that everything is output to the `/dist/` folder,
 * before a Migration can run, it needs compilated files.
 */
## Creating a TypeOrm Migration
```npx typeorm migration:create -n CoffeeRefactor
```
## Compile project first 
```npm run build
```
## Run migration(s) 
```npx typeorm migration:run
```
## REVERT migration(s)
```npx typeorm migration:revert
```
## Let TypeOrm generate migrations (for you)
```npx typeorm migration:generate -n SchemaSync
```