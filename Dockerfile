# Step 1: Build your Vue application
FROM node:16.10.0-alpine3.13 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Setup the server with Nginx
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY web/nginx.conf /etc/nginx/nginx.conf
COPY web/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
COPY web/nginx-selfsigned.crt /etc/ssl/private/nginx-selfsigned.crt

CMD ["nginx", "-g", "daemon off;"]