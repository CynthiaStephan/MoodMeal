const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./app/routes/userRoutes')


app.use(express.json());

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/moodmeal';

mongoose.connect(mongoUrl)
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion :', err));

app.get('/', (req, res) => {
  res.json({ message: 'Test réussi !' });
});

app.use('api/users', userRoutes)

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});