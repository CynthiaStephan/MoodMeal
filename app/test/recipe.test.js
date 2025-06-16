// Import dependencies
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../server');
const Recipe = require('../models/Recipes');

let mongoServer;

// Setup before all tests run: start in-memory MongoDB and connect mongoose
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: 'test' });
});

// Cleanup after each test: remove all recipes to isolate tests
afterEach(async () => {
  await Recipe.deleteMany();
});

// Cleanup after all tests: close mongoose connection and stop MongoDB server
afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

// Grouping all tests related to Recipe routes
describe('Recipe routes', () => {

  // Test for GET /api/recipe/alltags: should return all tags in the database
  it('GET /api/recipe/alltags devrait retourner tous les tags', async () => {
    // Seed the database with two recipes having various tags
    await Recipe.create([
      {
        name: "Mac and Cheese crémeux",
        description: "Un plat réconfortant pour les moments de stress.",
        tags: ["comforting", "quick", "creamy"]
      },
      {
        name: "Salade de quinoa épicée",
        description: "Une recette légère pour un mood heureux.",
        tags: ["light", "spicy", "fresh"]
      }
    ]);

    // Send GET request to fetch all tags
    const res = await request(app).get('/api/recipe/alltags');

    // Expect HTTP 200 OK
    expect(res.statusCode).toBe(200);

    // Expect response body to include all tags from the seeded recipes
    expect(res.body).toEqual(expect.arrayContaining([
      'comforting', 'quick', 'creamy', 'light', 'spicy', 'fresh'
    ]));
  });

  // Test for POST /api/recipe/tag: should return recipes matching a given tag
  it('POST /api/recipe/tag devrait retourner les recettes avec un tag donné', async () => {
    // Seed the database with two recipes with different tags
    await Recipe.create([
      {
        name: "Smoothie énergisant",
        description: "Un smoothie nourrissant pour recharger tes batteries.",
        tags: ["nourishing", "quick", "healthy"]
      },
      {
        name: "Pizza maison créative",
        description: "Une pizza créative pour stimuler ta créativité.",
        tags: ["creative", "unique", "fun"]
      }
    ]);

    // Send POST request with tag 'quick' to filter recipes
    const res = await request(app)
      .post('/api/recipe/tag')
      .send({ tag: 'quick' });

    // Expect HTTP 200 OK
    expect(res.statusCode).toBe(200);

    // Expect response to contain the recipe tagged 'quick'
    expect(res.body.some(r => r.name === 'Smoothie énergisant')).toBe(true);
  });

  // Test for GET /api/recipe/recipe/:id: should return recipe by ID
  it('GET /api/recipe/recipe/:id retourne une recette par son ID', async () => {
    // Create a recipe and store its ID
    const recette = await Recipe.create({
      name: "Soupe aux lentilles réconfortante",
      description: "Un bol de réconfort pour les moments tristes.",
      tags: ["comforting", "soft", "hearty"]
    });

    // Send GET request to fetch the recipe by its ID
    const res = await request(app).get(`/api/recipe/recipe/${recette._id}`);

    // Expect HTTP 200 OK
    expect(res.statusCode).toBe(200);

    // Expect the returned recipe to have the correct name
    expect(res.body.name).toBe("Soupe aux lentilles réconfortante");
  });

  // Test for GET /api/recipe/random: should return a random recipe
  it('GET /api/recipe/random retourne une recette aléatoire', async () => {
    // Create a recipe in the database
    await Recipe.create({
      name: "Curry de pois chiches épicé",
      description: "Un curry réconfortant avec un twist épicé.",
      tags: ["comforting", "spicy", "vegetarian"]
    });

    // Send GET request to fetch a random recipe
    const res = await request(app).get('/api/recipe/random');

    // Expect HTTP 200 OK
    expect(res.statusCode).toBe(200);

    // Verify that the returned recipe matches the one created
    expect(res.body[0].name).toBe("Curry de pois chiches épicé");
  });
});
