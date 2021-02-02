const app = require('../../src/app');
const supertest = require('supertest');
const request = supertest(app);
const AWS = require('aws-sdk');

jest.mock('aws-sdk');

test('Get films unit test, expected ok', async () => {

    AWS.DynamoDB.DocumentClient.mockImplementation(() => {
        return {
            scan: (params, callback) => callback(undefined,
                { Items: [
                    { 
                        title: "title1",
                        year: 2001,
                        director: "director1"
                    },
                    { 
                        title: "title2",
                        year: 2002,
                        director: "director2"
                    },
                    { 
                        title: "title3",
                        year: 2003,
                        director: "director3"
                    }]
                }
            )
        };
    });

    const response = await request
        .get('/api/films/')
        .expect('Content-type', /json/)
        .expect(200);

    expect(response.body.length).toBe(3);
    expect(response.body[0]['title']).toBe("title1");
    expect(response.body[0]['director']).toBe("director1");
    expect(response.body[0]['year']).toBe(2001);
    expect(response.body[1]['title']).toBe("title2");
    expect(response.body[1]['director']).toBe("director2");
    expect(response.body[1]['year']).toBe(2002);
    expect(response.body[2]['title']).toBe("title3");
    expect(response.body[2]['director']).toBe("director3");
    expect(response.body[2]['year']).toBe(2003);
});

test('Post film unit test, expected created', async () => {

    const film = {
        title:"title4",
        year: 2004,
        director: "director4"
    };

    AWS.DynamoDB.DocumentClient.mockImplementation(() => {
        return {
            put: (params, callback) => callback(undefined, film)
        };
    });

    const response = await request
        .post('/api/films/')
        .send(film)
        .expect(201);

    expect(response.body['title']).toBe("title4");
    expect(response.body['year']).toBe(2004);
    expect(response.body['director']).toBe("director4");
});