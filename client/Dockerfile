FROM node:16-alpine
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
CMD ["npm", "start"]
#docker build -t goals-react .
#docker run --name goals-app --rm -p 3000:3000 goals-react

