# stage 1

FROM node:14.8.0-alpine AS builder

## Install node modules in folder (seperate layer, prevents reinstall every build)
COPY package.json package-lock.json ./
RUN npm install && mkdir /webapp && mv ./node_modules ./webapp
WORKDIR /webapp

COPY . .

RUN npm run build --prod --output-path=dist


# stage 2

FROM nginx:1.19-alpine
COPY --from=builder /webapp/dist/webapp /usr/share/nginx/html