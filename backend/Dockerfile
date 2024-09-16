FROM node:lts-alpine
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 4000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]