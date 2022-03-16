FROM node:14-bullseye

WORKDIR ./app

COPY . .

RUN npm install

EXPOSE 3004

# npm run nodemon --watch server
ENTRYPOINT ["npm", "start"]