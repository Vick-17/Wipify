FROM node:20-alpine as builder
# paramétrage du dossier courant pour le build
WORKDIR /app
COPY . .
# suppression du contenu de nodes_modules
RUN rm -rf node_modules
# Copie du fichier .env.prod


# npm ci similaire à npm install (mais environnement automatisé) -> installation de tous les packages nécessaires au build
RUN npm i 
RUN npm run build

FROM nginx:1.25.1-alpine
EXPOSE 80
COPY --chown=nginx:nginx nginx-ui.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx --from=builder /app/build /var/www/html/