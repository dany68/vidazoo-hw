# Vidazoo Home Assignment - Daniel Elmalem

## Project setup

The project was setup using Vite `npm create vite@latest` with the React Typescript template.
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Additionally I added Express and TSX in order to run a node REST API server.
To start it locally run `npm run dev-node`. Changes will be hot reloaded.
All APIs endpoints are defined in the root server/index.js file and are proxied via the Vite config file.

## Features

- Download results JSON file
- Search (with counter) and Sort through the results
- Loading animation (on the search bar "Parse" button) while fetch is pending
- Error handling with visual red indication on the search bar
- Project hosted on Vercel
- Server cache (TODO)
- Typescript (very lightly..)

#### Error status codes
- Validation errors: 400
- Ads.txt file not found: 404
- Server error: 500


## Run locally

Go to the root of the project and run:
- `npm run dev`for the front-end
- `npm run dev-node`for the backend

Both environment use HMR.

## Production CMDs: