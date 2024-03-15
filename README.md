## Nest movies application

This is a "catalog of movies application" example in Nest.js built with:

Link to the live application:

### Features

- Nest.js
- Redis
- Postgres
- Typeorm
- Node.js (16+)
- Jest
- Docker
- JWT

### Installation

Copy and modify the `.env.example` file to your own local environment variables

```
  cp .env.example .env
```

If you wish to run the application locally, you can just run it through docker. The whole application can run through docker, including Nest itself.

```
  docker-compose up -d
```

### API guide

A showcase of all available endpoints can be accessed in the `/api` route in your url application.

### Running tests

If you're running the application through docker, it will be needed that you stop the application container.
You can do so by running.

```
  docker ps
```

This command will list all of your available containers

```
  docker stop <CONTAINER-NAME>
```

And, finally, running the tests

`npm test` or `npm test:cov` to see the test coverage

What could be done to better this application:

- Add integration and end-to-end tests
- Add a better strategy for caching with Redis
- Solve problems of code duplication and refactor slower parts of the code
- Add a pipeline that runs all tests and checks for broken or flaky ones when merging on GitHub
