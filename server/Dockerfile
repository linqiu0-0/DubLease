FROM node:16.17.0-bullseye-slim
# Create app directory
RUN mkdir /server
WORKDIR /server
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
CMD ["npm", "start"]
EXPOSE 8000
#docker build -t goals-react .
#docker run --name goals-app --rm -p 3000:3000 goals-react

