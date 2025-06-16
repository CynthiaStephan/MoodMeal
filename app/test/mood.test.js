const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const bodyParser = require('body-parser');
const { describe, expect, test } = require('@jest/globals');


const moodRoutes = require('../routes/moodRoutes');
const Mood = require('../models/Moods');

let app;
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);

  app = express();
  app.use(bodyParser.json());
  app.use('/api/mood', moodRoutes);
});

afterEach(async () => {
  await Mood.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Tests API /api/mood', () => {
  test('GET /api/mood retourne les moods existants', async () => {
    await Mood.create({
      mood: 'happy',
      description: 'Des recettes légères et pleines de saveurs pour accompagner ta bonne humeur.',
      suggestedTags: ['light', 'spicy'],
      funMessage: ['Fais danser tes papilles avec cette recette !']
    });

    const res = await request(app).get('/api/mood');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].mood).toBe('joyful');
  });

  test('POST /api/mood retourne les tags associés à un mood', async () => {
    await Mood.create({
        "mood": "happy",
        "description": "Des recettes légères et pleines de saveurs pour accompagner ta bonne humeur.",
        "suggestedTags": ['light', 'spicy'],
        "funMessage": [
            "Fais danser tes papilles avec cette recette !",
            "Ton sourire illumine la cuisine !",
            "Cette recette est aussi joyeuse que toi !"
        ]
    });

    const res = await request(app)
      .post('/api/mood')
      .send({ mood: 'sad' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining(['comfort', 'cozy']));
  });

  test('POST /api/mood retourne 404 si le mood est introuvable', async () => {
    const res = await request(app)
      .post('/api/mood')
      .send({ mood: 'unknown' });

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Mood not found');
  });

  test('GET /api/mood retourne un tableau vide si aucun mood', async () => {
    const res = await request(app).get('/api/mood');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});
