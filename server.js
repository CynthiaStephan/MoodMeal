const express = require('express');
const mongoose = require('mongoose');
const app = express();

const userRoutes = require('./app/routes/userRoutes');
const moodRoutes = require('./app/routes/moodRoutes');
const recipeRoutes = require('./app/routes/recipeRoutes');

app.use(express.json());

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/moodmeal';

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(mongoUrl)
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur de connexion :', err));
}

app.get('/', (req, res) => {
  res.json({ message: `Connecté à l'API` });
});

app.use('/api/users', userRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/recipe', recipeRoutes);

const PORT = process.env.PORT || 3000;

// Ne démarre le serveur que si le fichier est exécuté directement
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
  });
}

module.exports = app;
