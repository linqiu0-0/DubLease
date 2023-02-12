# Developer Guidelines

## Installation

To get started, clone the repo:
`$ git@github.com:linqiu0-0/DubLease.git`

## Start Developing
### Start containers
Use the `docker-compose` tool from the root directory to start both the backend and frontend containers, :
1. Fisrt build the system through `docker compose build `
2. Then run the system through`docker compose up`
   
Now, you should be getting logs from both the express server/backend and the webpack-dev-server that serves the frontend.

If you have any errors with docker, please launch frontend and backend service separately follow the rest tutorial.

# Frontend
DubLease frontend uses the React framework with javascript. 
The UI design for the frontend is based on this [Fimga Design](https://www.figma.com/file/8Ivetl62l7CELx0hTaaq1N/Dub-Lease?node-id=0%3A1&t=QWbdjKd0nRIM1hva-1).

## How to visit DubLease
Currently, Dublease is published on  [DubLease]( http://52.38.78.226:8080/
). You can sign up to visit and explore 
the most update-to-date version in here. 

## Project structure /client
- `/src`: source code folder
    - `/assets`：fonts that are used in the app
    - `/components`: helpers widgets that are used to build components of a page
    - `/images`: icons and logo
    - `/pages`: Dublease main pages
    - `/styles`: css files for page styles
    - `/test`: frontend example test code folder 
- `/app.js`: React home app
- `/index.js`: handles app startup
- `/reportWebVitals.js`:  measures a set of metrics that aim to capture the user experience of a web page
- `/Routes.js`: react app router
- `/test`: test code folder for Flutter
- `/.eslintrc.json`: eslint config
- `/Dockerfile`: docker config to launch the system
- `/postcss.config.js`: post css config
- `/tailwind.config.js`: tailwind css config

## Current dependency
- npm: 6.14.13
- Chrome: 109.0.5414.119


## How to run the system
1. `cd client` from the root directory
2. Install the dependencies: `$ npm install`
2. Start the server: `$ npm start`

## How to test the system
Right now, we aren't plan to implement any automated tests 
for frontend as stated in the test plan. Front-end pages will be tested manually to mimic 
users clicking on different components and make sure they 
function as expected.

# Backend

## Project structure /server

## Current dependency

## How to run the system
1. `cd server` from the root directory
2. Install the dependencies: `$ npm install`
2. Start the server: `$ npm start`

## How to test the system

# Deployment
Our app is deployed on the Amazon EC2. Frontend is deployed with `port 8080` 
and backend is deployed with `port 8000`.















