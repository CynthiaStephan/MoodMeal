# MoodMeal - API de Suggestions de Repas Basées sur l'Humeur

**[Documentation de l'api](./doc/API.md "Documentation de l'API")**

## Description du Projet
MoodMeal est une API qui génère des suggestions de repas basées sur l’humeur de l’utilisateur et les ingrédients disponibles. Il permet de simplifier la planification des repas en offrant des recommandations adaptées à l'état d'esprit du moment, aux préférences alimentaires et à ce que l'on a dans le réfrigérateur.

## Objectifs du Projet
- **Proposer des suggestions de repas** en fonction de l'humeur et des ingrédients disponibles.
- **Améliorer l'expérience utilisateur** avec des fonctionnalités comme des messages motivants et un mode surprise.
- **Optimiser les performances** pour des réponses rapides et une architecture évolutive.

## Fonctionnalités Principales
### Analyse de l'Humeur
- Les utilisateurs peuvent indiquer leur humeur en écrivant un texte ou en choisissant un emoji.
- L'humeur est ensuite catégorisée pour proposer des suggestions adaptées.

### Gestion des Ingrédients
- L'utilisateur entre les ingrédients qu'il a sous la main.
- L’API génère des recettes basées sur ces ingrédients.

### Recommandation de Recettes
- Suggestions personnalisées prenant en compte l’humeur, les ingrédients disponibles et le temps de préparation.

### Mode Surprise
- Pour ajouter un peu de fun, l'API propose des recettes aléatoires, idéal pour briser la routine.

### Retour Fun
- Des messages humoristiques ou motivants viennent compléter les suggestions, pour rendre l’expérience encore plus agréable.

## Technologies Utilisées

### Backend
- **Node.js** : Serveur backend pour gérer les requêtes et la logique métier.
- **Express.js** : Framework de gestion des routes et des requêtes HTTP.
- **MongoDB** : Base de données NoSQL.
- **Mongoose** : ODM pour interagir avec MongoDB.
- **Docker** : Pour la containerisation et le déploiement de l'application.

## Architecture et Déploiement
Le projet est conçu pour être évolutif, avec une architecture modulaire qui permet de facilement ajouter des fonctionnalités à l'avenir. L'utilisation de Docker permet de faciliter les déploiements et la gestion des environnements de développement et de production.

