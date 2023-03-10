FROM node:16-alpine as build
# Create app directory
RUN mkdir /client
WORKDIR /client
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
#CMD ["npm", "start"]
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /client/build /usr/share/nginx/html/
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
#ENV NODE_ENV production
#EXPOSE 3000
#CMD [ "npx", "serve", "build" ]
#docker build -t goals-react .
#docker run --name goals-app --rm -p 3000:3000 goals-react

