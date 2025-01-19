const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./app/routes/userRoutes');
const moodRoutes = require('./app/routes/moodRoutes');
const recipeRoutes = require('./app/routes/recipeRoutes');


app.use(express.json());

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/moodmeal';

mongoose.connect(mongoUrl)
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion :', err));

app.get('/', (req, res) => {
  res.json({ message: 'Test réussi !' });
});

app.use('/api/users', userRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/recipes', recipeRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});