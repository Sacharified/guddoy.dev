# [guddoy.dev](https://guddoy.dev)
[![CircleCI](https://circleci.com/gh/Sacharified/guddoy.dev/tree/master.svg?style=svg)](https://circleci.com/gh/Sacharified/guddoy.dev/tree/master)
[![Netlify Status](https://api.netlify.com/api/v1/badges/e02791c6-580f-4520-8e29-66d8c3371735/deploy-status)](https://app.netlify.com/sites/relaxed-dubinsky-422af7/deploys)

This is a fairly blank template for a statically deployed NextJS site using Netlify (can easily be changed) for hosting and Contentful as a content provider.

## Usage
Requires the following environment variables (will be loaded from a .env file in the project root if there is one):
```
CONTENTFUL_ACCESS_TOKEN=yourAccesstoken
CONTENTFUL_SPACE_ID=yourSpaceId
```

### Build

`npm run export`

Statically built files are located in `/out`  

### Development

`npm run dev`  

### Tests

Unit tests (Jest and Enzyme):  
`npm run test`  
`npm run test-watch`

UA tests (Cypress):  
`npm run test-ua`

UA tests in CI mode:  
`npm run test-ua:ci`