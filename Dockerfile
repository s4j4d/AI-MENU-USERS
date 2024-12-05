FROM node:18.20.3-alpine3.20 As dev-users
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY ./src .
COPY nest-cli.json .
COPY tsconfig*.json ./
RUN npm run build

FROM node:18.20.3-alpine3.20 As prod-users
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY --from=dev-users /usr/src/app/package*.json ./
RUN npm ci --omit=dev --ignore-scripts
COPY --from=dev-users /usr/src/app/dist ./dist
CMD ["node", "dist/main"]