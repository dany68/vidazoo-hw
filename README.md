# Viadezoo Home Assignment - Daniel Elmalem

## Project setup

The project was setup using Vite `npm create vite@latest` with the React Typescript template.
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Additionally I added Express and TSX in order to run a node REST API server.
To start it locally run `npm run dev-node`. Changes will be hot reloaded.
All APIs endpoints are defined in the root server/index.js file and are proxied via the Vite config file.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
