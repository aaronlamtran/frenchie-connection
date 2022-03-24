FROM node:15 as build

WORKDIR ./app

COPY package.json .

RUN npm install

COPY . .


ENTRYPOINT ["npm", "start"]

RUN npm run build

FROM nginx
EXPOSE 80
COPY --from=build /app/build /user/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]