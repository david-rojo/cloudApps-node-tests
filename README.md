# Testing in Node: Jest & TestContainers

The implemented tests cover the following [scenario](doc/scenario.md).

## Create film (bash)

```
$ curl -d '{ "title": "Watchmen", "year" : 2009, "director": "Zack Snyder"}'\
    -H "Content-Type: application/json" -X POST http://localhost:3000/api/films/
```

## Run DynamoDB locally

```
$ docker run --rm -p 8000:8000 -d amazon/dynamodb-local:1.13.6
```

## Install dependencies

```
$ npm install
```

## Run tests

Is mandatory to install dependencies previously

```
$ npm test
```

## Author

[David Rojo(@david-rojo)](https://github.com/david-rojo)
