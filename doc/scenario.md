# Testing in Node scenario

It is requested to implement the needed tests to verify the correct functionality of an application that manages films. The application code is provided.

Following tests are required to implement:

* REST API tests mocking connection to database:
  * It is possible to create a new film.
  * It is possible to retrieve all films.

* REST API tests using TestContainers:
  * It is possible to create a new film.
  * It is possible to retrieve all films.

**NOTES:**
* Tests must be independant of each other (not depend on information that other tests have created or deleted).
* Tests must be implemented with Jest and Supertest.
* Tests must be grouped by different modules because they are different type of tests.
* Application uses a DynamoDB database, usually managed by Amazon Web Services cloud service provider. It is possible to run the application locally using this docker command:
```
$ docker run --rm -p 8000:8000 -d amazon/dynamodb-local:1.13.6
```
* In unit tests are mandatory the Mocks usage, because persistence is done using the database (and we want to avoid it in this type of test).
* In REST API tests, is mandatory to doesn't use the existing database (remote or local). To cover this requirement, is mandatory the usage of TestContainers.
