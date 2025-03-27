# Product Catalog

A Product Catalog is a structured collection of information about products offered by a business. It typically includes product names, descriptions, prices.

## Features

- Create product
- Get all products
- Delete specific product

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV`

`POSTGRES_HOST`

`POSTGRES_PORT`

`POSTGRES_USER`

`POSTGRES_PASSWORD`

`POSTGRES_DATABASE`

`PGADMIN_DEFAULT_EMAIL`

`PGADMIN_DEFAULT_PASSWORD`

## Services Used from Docker Hub

### PostgreSQL

We use the official PostgreSQL Docker image: [`postgres`](https://hub.docker.com/_/postgres).

- The database service is configured with the environment variables mentioned above.
- PostgreSQL runs on port `5433`.

### pgAdmin

We use the official pgAdmin Docker image: [`dpage/pgadmin4`](https://hub.docker.com/r/dpage/pgadmin4).

- pgAdmin is available at `http://localhost:5050`.
- You can log in using `PGADMIN_DEFAULT_EMAIL` and `PGADMIN_DEFAULT_PASSWORD`.

## Run Locally via Docker

Clone the project

```bash
  git clone https://github.com/YashPatel3005/kitchen365-backend.git
```

Go to the project directory

```bash
  cd kitchen365-backend
```

Start the services using Docker Compose

```bash
  docker-compose up --build
```

To stop the containers

```bash
  docker-compose down
```
