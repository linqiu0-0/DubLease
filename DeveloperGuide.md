# Developer Guidelines

## Installation

To get started, clone the repo:
`$ git@github.com:linqiu0-0/DubLease.git`

## Start Developing
### Start containers
Use the `docker-compose` tool from the root directory to start both the backend and frontend containers:
1. First, build the system through `docker compose build `
2. Then, run the system through`docker compose up`
   
Now, you should get logs from both the express server/backend and the webpack-dev-server that serves the frontend.

If you have any docker errors, please launch the frontend and backend services separately and follow the rest tutorial.

# Frontend
DubLease frontend uses the React framework with javascript. 
The UI design for the frontend is based on this [Fimga Design](https://www.figma.com/file/8Ivetl62l7CELx0hTaaq1N/Dub-Lease?node-id=0%3A1&t=QWbdjKd0nRIM1hva-1).

## How to visit DubLease
Dublease is published on  [DubLease]( http://52.38.78.226:8080/). You can sign up to visit and explore the most update-to-date version is here. ***However, this link is currnetly unavailable because we suspend the ec2 depolyment server due to limited budget. It will come back soon.***

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
- npm: 6.14.13+
- Chrome: 109.0.5414.119


## How to run the system
1. `cd client` from the root directory
2. Install the dependencies: `$ npm install`
3. Start the server: `$ npm start`

## How to test the system
As the test plan states, we aren’t planning to implement automated tests for the frontend. 
Our team will test frontend pages manually to mimic users click on different components and make sure they function as expected.

# Backend

## Project structure /server
- `app.js`: the main backend program that sets up the server and all the endpoints
- `data`: contains code in the database layer
   - `database.js`: code that interacts with Amazon RDS Database
   - `images.js`: code that interacts with Amazon S3 File Storage to save and read images
- `user`: contains code in the business logic layer that handles user data
   - `account.js`: handles sign-up and log-in activities
- `sublease`: contains code in the business logic layer that handles subleasing information
   - `search.js`: functions that search for available subleases based on user-specified filters and conditions
- `test`: test code for the backend
- `/Dockerfile`: docker config to launch the system

## Current dependency
- npm: version 6.14.13+
- node: version 14+

## How to run the system
1. `cd server` from the root directory
2. Install the dependencies: `$ npm install`
2. Start the server: `$ npm start`

## How to test the system
1. `cd server` from the root directory
2. run `npm test`

## How to add new tests
1. All of the testing script files are located under`server/test`.
2. Each module should have its own testing script. The convention, for now, is each js file under `server` is considered a module, and the corresponding testing script should have the same name under the same directory hierarchy (e.g., the test for `server/user/account.js` should be `server/test/user/account.js`).
4. Inside each module's testing script, the tests should be further split into 'submodules' that divide the module reasonably (e.g., by each function). Under each submodule is where individual test cases are written. For more details on the testing template, please refer to the Testing & CI section in the [living document](https://docs.google.com/document/d/1rcpL10wDu8ECY_ctBVh5NeI-DTemNds5bQ_EMhQXcTM/edit?usp=sharing)


# Build & Deployment
Our app is deployed on Amazon EC2. The service is currently suspended due to a limited development budget. We will provide an update once the server is reactivated. The frontend is deployed with `port 8080`, and the backend is deployed with `port 8000`.

# Contribution
Each version release of the app is currently done manually by the developers. After creating a pull request, please get in touch with [Lin](lq9@uw.edu) for it to be reviewed and included in a future release.
