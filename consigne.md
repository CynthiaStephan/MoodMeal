# MoodMeal

## Contexte
MoodMeal est une API ludique et utile destinée à proposer des idées de repas adaptées à l’humeur de l’utilisateur et à ce qu’il a dans son réfrigérateur. Elle vise à simplifier la planification des repas tout en ajoutant une touche amusante et personnalisée.


## Objectifs du projet
1. **Fournir une API capable de générer des suggestions de repas basées sur :**
   - L’humeur de l’utilisateur.
   - Les ingrédients disponibles.
   - Les préférences alimentaires (allergies, régime).
2. **Ajouter une touche fun** grâce à des fonctionnalités comme le mode surprise ou des suggestions humoristiques.
3. **Faciliter l’accès à des recettes adaptées au quotidien**, avec des indications claires et des substitutions possibles.


## Fonctionnalités principales

### Gestion des utilisateurs (facultatif)
- **Authentification** via email ou OAuth.
- **Gestion des préférences alimentaires.**

### Analyse de l’humeur
- Saisie de l’humeur par texte ou émoji.
- Conversion en catégorie interne (exemple : `"triste"` → `"réconfort"`).

### Gestion des ingrédients
- Envoi d’une liste d’ingrédients disponibles par l’utilisateur.
- Identification des ingrédients manquants et proposition de substitutions.

### Recommandation de recettes
- Génération de suggestions basées sur :
  - Humeur.
  - Ingrédients disponibles.
  - Temps de préparation requis.
- Indication des instructions claires pour chaque recette.

### Mode surprise
- Proposition aléatoire de recettes pour découvrir de nouvelles idées.

### Retour fun
- Messages humoristiques ou motivants pour enrichir l’expérience utilisateur.

### Statistiques et gamification (optionnel)
- Suivi des recettes essayées.
- Déblocage de badges pour inciter à explorer davantage.

## Données manipulées

### Entrées (exemple de payload)
```json
{
  "userId": "12345",
  "mood": "fatigué",
  "ingredients": ["riz", "œufs", "carottes"],
  "preferences": {
    "allergies": ["gluten"],
    "diet": "végétarien"
  },
  "surpriseMode": false
}
```

### Sorties (exemple de réponse)
```json
{
  "status": "success",
  "recipes": [
    {
      "id": "recipe123",
      "name": "Riz sauté aux légumes",
      "description": "Un plat rapide et réconfortant.",
      "ingredients": ["riz", "carottes", "œufs", "sauce soja"],
      "missingIngredients": ["sauce soja"],
      "instructions": [
        "1. Faites cuire le riz.",
        "2. Faites sauter les légumes dans une poêle.",
        "3. Ajoutez les œufs battus et mélangez.",
        "4. Assaisonnez avec de la sauce soja."
      ],
      "image": "",
      "tags": ["rapide", "réconfortant", "végétarien"]
    }
  ],
  "suggestedReplacements": {
    "sauce soja": "sel et huile d'olive"
  },
  "funMessage": "Pour te détendre encore plus, écoute une playlist zen en cuisinant ! 🎵"
}
```

## Endpoints principaux

### **POST** `/api/recommend`
- **Description** : Génère des suggestions de recettes.
- **Entrées** : Humeur, liste d’ingrédients, préférences.
- **Sorties** : Liste de recettes adaptées.

### **GET** `/api/recipes/:id`
- **Description** : Récupère les détails d’une recette spécifique.
- **Entrées** : ID de la recette.
- **Sorties** : Nom, description, instructions, ingrédients.

### **POST** `/api/mood`
- **Description** : Analyse une humeur et retourne une catégorie.
- **Entrées** : Texte ou émoji.
- **Sorties** : Catégorie (ex. : `"réconfort"`).

### **GET** `/api/surprise`
- **Description** : Retourne une recette aléatoire.
- **Sorties** : Détails de la recette.


## Technologies prévues

### Backend
- **Node.js avec Express.js** pour une gestion rapide des endpoints.
- **WebSocket** (ou **Socket.IO**) pour des suggestions en temps réel.

### Base de données
- **MongoDB** pour un stockage flexible des recettes et utilisateurs.
- Modèle documentaire pour gérer les relations simples entre recettes et catégories.

### Autres intégrations
- **API externe** pour des recettes supplémentaires (exemple : Spoonacular).
- Service de notifications push (**Firebase** ou autre).

## Contraintes techniques

### Performances
- Réponses rapides même en cas de charge importante.
- Mise en cache des données fréquentes (ex. : recettes populaires).

### Scalabilité
- Architecture évolutive pour accueillir un grand volume d’utilisateurs.
- Utilisation de **Docker** pour la containerisation et **Kubernetes** pour l’orchestration.

### Sécurité
- Protection des endpoints sensibles.
- Validation des données utilisateur (ex. : nettoyage des listes d’ingrédients).

## Livrables attendus
- Code source de l’API.
- Documentation des endpoints (exemple : Swagger).
- Base de données pré-remplie avec des recettes test.

## Structure de la base de données

### Collections principales

#### Collection `recipes`
Contient les informations sur les recettes.
```json
{
  "_id": "recipe123",
  "name": "Riz sauté aux légumes",
  "description": "Un plat rapide et réconfortant.",
  "ingredients": ["riz", "carottes", "œufs", "sauce soja"],
  "tags": ["rapide", "réconfortant", "végétarien"],
  "instructions": [
    "1. Faites cuire le riz.",
    "2. Faites sauter les légumes dans une poêle.",
    "3. Ajoutez les œufs battus et mélangez.",
    "4. Assaisonnez avec de la sauce soja."
  ],
  "image": "",
  "timeToPrepare": 20
}
```

#### Collection `users`
Contient les informations sur les utilisateurs.
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
```

#### Collection `moods`
Définit les catégories d’humeur et leurs correspondances.
```json
{
  "_id": "mood_stress",
  "mood": "stressé",
  "description": "Des plats réconfortants pour te détendre.",
  "suggestedTags": ["réconfortant", "rapide"]
}
```

## Relations et requêtes principales
1. **Recettes par humeur** : Filtrage des recettes par tags associés à une humeur.
2. **Ingrédients disponibles** : Requêtes pour trouver les recettes correspondant aux ingrédients fournis.
3. **Suggestions personnalisées** : Association des préférences utilisateurs (allergies, régime) avec les recettes disponibles.
