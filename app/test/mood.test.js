// Import dependencies
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../server');

const Mood = require('../models/Moods');

let mongoServer;

// Before all tests: start an in-memory MongoDB server and connect mongoose to it
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    // Note: these options are deprecated but not blocking
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// After all tests: disconnect mongoose and stop the in-memory MongoDB server
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Before each test: clear the Mood collection and insert a default document
beforeEach(async () => {
  await Mood.deleteMany();

  await Mood.create({
    mood: 'heureux',
    description: 'You seem happy today!',
    suggestedTags: ['light', 'sweet'],
    funMessage: ['Treat yourself to something colorful!'],
  });
});

// Group of tests for the GET /api/mood route
describe('GET /api/mood', () => {
  it('should return the moods', async () => {
    // Send a GET request to /api/mood
    const res = await request(app).get('/api/mood');

    // Expect HTTP status 200 OK
    expect(res.status).toBe(200);

    // Expect the response body to be an array with one element
    expect(res.body.length).toBe(1);

    // Expect the first mood to be "heureux"
    expect(res.body[0].mood).toBe('heureux');
  });
});

// Group of tests for the POST /api/mood route
describe('POST /api/mood', () => {
  it('should return tags associated with a given mood', async () => {
    // Send a POST request with mood "heureux"
    const res = await request(app)
      .post('/api/mood')
      .send({ mood: 'heureux' });

    // Expect HTTP status 200 OK
    expect(res.status).toBe(200);

    // Expect the response body to contain the tags ['light', 'sweet']
    expect(res.body).toEqual(expect.arrayContaining(['light', 'sweet']));
  });

  it('should return an error if the mood does not exist', async () => {
    // Send a POST request with an unknown mood
    const res = await request(app)
      .post('/api/mood')
      .send({ mood: 'unknown' });

    // Expect HTTP status 400 Bad Request
    expect(res.status).toBe(400);

    // Expect the response body to contain an error property
    expect(res.body).toHaveProperty('error');
  });
});
