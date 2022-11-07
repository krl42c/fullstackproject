# Build angular app
FROM node:19-alpine as build
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
RUN npm run build

# Copy conf and dist files and run from nginx
FROM nginx:1.17.1-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/usersfront /usr/share/nginx/html

