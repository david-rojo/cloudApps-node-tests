const app = require('../../src/app');
const supertest = require('supertest');
const { GenericContainer } = require('testcontainers');
const createTableIfNotExist = require('../../src/db/createTable')
const AWS = require('aws-sdk');

const request = supertest(app)

let dynamoContainer;

jest.setTimeout(60000)

beforeAll(async () => {
    dynamoContainer = await new GenericContainer("amazon/dynamodb-local","1.13.6")
        .withExposedPorts(8000)
        .start();
    
    AWS.config.update({
        region: process.env.AWS_REGION || 'local',
        endpoint: process.env.AWS_DYNAMO_ENDPOINT || `http://localhost:${dynamoContainer.getMappedPort(8000)}`,
        accessKeyId: "xxxxxx",
        secretAccessKey: "xxxxxx"
    });

    await createTableIfNotExist("films");
});

afterAll(async () => {
    await dynamoContainer.stop();
});

test('Get films e2e test, expected ok', async () => {
    await request
        .post('/api/films/')
        .send({
            title: "title1",
            year: 2001,
            director: "director1"
        });
    await request
        .post('/api/films/')
        .send({
            title: "title2",
            year: 2002,
            director: "director2"
        });
    await request
        .post('/api/films/')
        .send({
            title: "title3",
            year: 2003,
            director: "director3"
        });
    
    const response = await request
        .get('/api/films/')
        .expect(200);

    expect(response.body.length).toBe(3);

    let item1 = response.body.find(element => element.title === "title1");
    expect(item1.title).toEqual("title1");
    expect(item1.year).toEqual(2001);
    expect(item1.director).toEqual("director1");
  
    let item2 = response.body.find(element => element.title === "title2");
    expect(item2.title).toEqual("title2");
    expect(item2.year).toEqual(2002);
    expect(item2.director).toEqual("director2");
  
    let item3 = response.body.find(element => element.title === "title3");
    expect(item3.title).toEqual("title3");
    expect(item3.year).toEqual(2003);
    expect(item3.director).toEqual("director3");
});

test('Post film e2e test, expected created', async () => {
    
    const film = {
        title:"title4",
        year: 2004,
        director: "director4"
    };

    const response = await request
        .post('/api/films/')
        .send(film)
        .expect(201);

  expect(response.body['title']).toBe("title4");
  expect(response.body['year']).toBe(2004);
  expect(response.body['director']).toBe("director4");
});