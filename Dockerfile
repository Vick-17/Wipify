FROM node:20-alpine as builder
WORKDIR /app
COPY . .
RUN npm ci 
RUN npm run build

FROM nginx:1.25.1-alpine
EXPOSE 80
COPY --chown=nginx:nginx nginx-ui.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx --from=builder /app/build /var/www/html/
