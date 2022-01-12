# Documents App

Documents app

## Getting Started

This steps will get you through the setup process of installing and usage of the project.

### Project installation guide

In order to get install the dependecies of the project you can use the package manager of your choice. I will use `yarn` as example.

To install the packages, got to the root and launch this command

```
yarn install
```

After installing all packages, we can proceed to run the app.

To launch app

```
yarn watch
```

To check the app, navigate to `http://localhost:8000/`.
Note: it's a simple server so there is no watcher on save.

In order to test the server events we need to launch the node server. Go to `server/` folder and run the next command:

```
node server.js
```

To check if server is running, navigate to `http://localhost:3000/`

That's it, you are good to go!

## Running the tests

To run the tests

```
yarn run test
```

## Aditional information

- Things like dependency injection, styling and color shades can be improve.
- In a scale up situation, a route handler with lazy loading would be necessary.

