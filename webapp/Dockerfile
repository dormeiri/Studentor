# stage 1

FROM node:alpine AS my-app-build
WORKDIR /webapp
COPY . .
RUN npm install && npm run build


# stage 2

FROM nginx:alpine
COPY --from=my-app-build /webapp/dist/webapp /usr/share/nginx/html
EXPOSE 80