// const mongoose = require("mongoose");
// const { MongoMemoryServer } = require("mongodb-memory-server");
// const UserService = require("../services/user.service");
// const User = require("../models/user.model");

// let mongoServer;

// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const uri = mongoServer.getUri();
//   await mongoose.connect(uri);
// });

// afterAll(async () => {
//   await mongoose.disconnect();
//   await mongoServer.stop();
// });

// afterEach(async () => {
//   await User.deleteMany(); // Nettoyage entre les tests
// });

// test("Créer un utilisateur", async () => {
//   const user = await UserService.createUser("Cynthia", "cynthia@example.com");

//   expect(user.name).toBe("Cynthia");
//   expect(user.email).toBe("cynthia@example.com");
// });

// test("Récupérer un utilisateur par email", async () => {
//   await UserService.createUser("Cynthia", "cynthia@example.com");
//   const user = await UserService.getUserByEmail("cynthia@example.com");

//   expect(user).not.toBeNull();
//   expect(user.name).toBe("Cynthia");
// });
