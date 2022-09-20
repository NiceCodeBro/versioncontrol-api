# How to run the service

1. `npm install` under the backend folder
2. `npm run build `
3. `npm run dev`

-> To run unit tests `npm run test`

# API Instructions

1. Returns most popular github repositories available
   Api path: `http://localhost:8000/api/v1/version-control/github/popular-repositories`

Api Query Parameters:

1. per_page: `Optional` | number of items that can be viewed | must be numeric value | can be eiter 10, 50 or 100
2. date_from: `Required` | the most popular repositories created from this date | must be a valid date string
3. language_filter: `Optional` | Option to filter repositories by programming language

# Project Structure

```
root
│
└───src
│   │   index.ts                : Starts express and app routes
│   │
│   └───bootstraps              : Combines class and object located under modules and expose the controller
│   └───express-adapter         : An abstraction layer between application controller and express
│   └───modules
│   │   └───version-control
│   │   │   └───controllers     : Abtracts http request and response from application logic
│   │   │   └───external-apis   : Includes api calls to external services
│   │   │   └───repositories    : data access layer
│   │   │   └───use-cases       : Includes all bussines related logic
│   └───routes
│   └───shared                  : Includes some shared

```
