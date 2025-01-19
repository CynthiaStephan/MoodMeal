# Documentation API - MoodMeal

## Base URL

Toutes les requêtes sont relatives à la base URL suivante :  
`http://localhost:3050/api`

## Endpoints

### 1. **Génère des suggestions de recettes**

- **URL** : `/recipes/suggestion`
- **Méthode** : `POST`
- **Description** : Crée une suggestion de repas en fonction de l’humeur, un ingrédiens ou un tag.
- **Corps de la Requête** :
  ```json
  {
      "tags": "spicy"
  }
  ```

### 2. **Retourne une recette aléatoire**

- **URL** : `/recipes/random`
- **Méthode** : `GET`
- **Description** : Renvoie une recette aléatoire.

### 3. **Obtenir des recettes à partir de tags**

- **URL** : `/recipes/tag`
- **Méthode** : `POST`
- **Description** : Récupère des recettes correspondant à des tags
- **Corps de la Requête** :
  ```json
  {
      "tag": "spicy"
  }
  ```

### 4. **Récupérer tags par moods**

- **URL** : `/moods/`
- **Méthode** : `POST`
- **Description** : Récupère les tags associés à une humeur.
- **Corps de la Requête** :
  ```json
  {
      "mood": "adventurous"
  }
  ```

### 5. **Retour Fun - Messages Motivants**

- **URL** : `/recipes/recipe/:id`
- **Méthode** : `GET`
- **Description** : Renvoie les détails de la recette à partir de l'id.
- **Paramètres URL** :
  - `id` : id de la recette.

---

## Structure de la Base de Données

### `recipes`
Contient les informations sur les recettes disponibles, y compris les ingrédients, les instructions, les tags et le temps de préparation.

#### Exemple de Document
```json
{
  "_id": ObjectId('678b651945facc30d8b6e72a'),
  "name": "Tacos au poulet épicé",
  "description": "Des tacos rapides et savoureux pour un mood heureux.",
  "ingredients": [
    "poulet",
    "tortillas",
    "fromage",
    "avocat",
    "salsa épicée"
  ],
  "tags": [
    "quick",
    "spicy",
    "savory"
  ],
  "instructions": [
    "1. Faites cuire le poulet épicé.",
    "2. Réchauffez les tortillas.",
    "3. Garnissez avec le poulet, fromage, avocat et salsa."
  ],
  "image": "",
  "timeToPrepare": 15
}
```

<!-- ### `users`
Stocke les informations des utilisateurs, y compris leurs préférences alimentaires, allergies et recettes sauvegardées.

#### Exemple de Document
```json
{
  "_id": "user123",
  "email": "user@example.com",
  "preferences": {
    "allergies": ["gluten"],
    "diet": "végétarien"
  },
  "savedRecipes": ["recipe123", "recipe456"]
}
``` -->

### `moods`
Définit les différentes catégories d'humeur et les tags associés aux recettes pour faire des suggestions pertinentes.

#### Exemple de Document
```json
{
  "_id": ObjectId('678b652645facc30d8b6e739'),
  "mood": "happy",
  "description": "Des recettes légères et pleines de saveurs pour accompagner ta bonne humeur.",
  "suggestedTags": [
    "light",
    "spicy"
  ],
  "funMessage": [
    "Fais danser tes papilles avec cette recette ! 🎉",
    "Ton sourire illumine la cuisine ! 😄",
    "Cette recette est aussi joyeuse que toi ! 🌈"
  ]
}
```

## Utilisation

Pour utiliser cette API, envoyez des requêtes HTTP aux points de terminaison décrits ci-dessus en vous assurant de respecter le format des données (JSON) pour chaque requête. L'API répondra en fonction des paramètres envoyés, en proposant des suggestions personnalisées pour l'utilisateur.
