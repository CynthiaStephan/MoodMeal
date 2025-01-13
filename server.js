const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/mydb';

mongoose.connect(mongoUrl)
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion :', err));

app.get('/', (req, res) => {
  res.json({ message: 'Test réussi !' });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});