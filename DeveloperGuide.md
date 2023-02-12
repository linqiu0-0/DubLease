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
Currently, Dublease is published on  [DubLease.com]( http://52.38.78.226:8080/
). You can sign up to visit and explore 
the most update-to-date version in here. 

## Project structure /client
- /src: source code folder
    - /assets：fonts that are used in the app
    - /components: helpers widgets that are used to build components of a page
    - /images: icons and logo
    - /pages: Dublease main pages
    - /styles: css files for page styles
    - /test: frontend example test code folder
- /app.js: React home app
- /index.js: 
- /reportWebVitals.js: generated web page articraft
- /Routes.jserated Windows articraft
- /test: test code folder for Flutter
- /.eslintrc.json: eslint config
- /Dockerfile: docker config to launch the system
- /postcss.config.js: post css config
- /tailwind.config.js: tailwind css config

## Before you start








