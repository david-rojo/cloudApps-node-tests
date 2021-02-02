// This is the proposed solution of practice

const app = require('../../src/app');
const supertest = require('supertest')
const AWS = require('aws-sdk');

let film = {
    "title": "title5",
    "year" : 2009,
    "director": "director5"
}

// Option 1
jest.mock('aws-sdk');
AWS.DynamoDB.DocumentClient.prototype.scan.mockImplementation((_, cb) => cb(null, { Items: [film] } ));
AWS.DynamoDB.DocumentClient.prototype.put.mockImplementation((film, cb) => cb(null, film));

// Option 2
// jest.spyOn(AWS.DynamoDB.DocumentClient.prototype, 'scan').mockImplementation((_, cb) => cb(null, { Items: [film]} ));
// jest.spyOn(AWS.DynamoDB.DocumentClient.prototype, 'put').mockImplementation((film, cb) => cb(null, film));

const request = supertest(app)
test('Create new film', async () => {

    const response = await request.post('/api/films/')
        .send(film)      
        .expect(201)

    expect(response.body.director).toBe(film.director)

})

test('Get all films', async () => {

    const response = await request.get('/api/films/')
        .expect('Content-type', /json/)
        .expect(200)

    expect(response.body.length).toBe(1)

})