FROM node:20.9.0-alpine

# Installer sqlite sans cache
RUN apk add --no-cache bash

# Définir le répertoire de travail
WORKDIR /var/www

# Exposer le port 3000
EXPOSE 3000

COPY package.json .

COPY server.js .

CMD ["npm","start"]