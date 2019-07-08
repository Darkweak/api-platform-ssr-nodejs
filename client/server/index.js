import express from 'express';
import React from 'react';
import thunk from 'redux-thunk';
import { render } from './render';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { matchRoutes } from 'react-router-config';
import { reducers } from "../src/reducer";
import { routes } from "../src/routes";

const PORT = 8082; // port defined in docker-compose file
const app = express();
const BUILD_DIR = 'dist';

app.use(`/${ BUILD_DIR }`, express.static(`./${ BUILD_DIR }`));

app.get('*', async (req, res) => {
  const store = createStore(
    combineReducers({
      ...reducers
    }),
    {},
    applyMiddleware(thunk)
  ); //define store depending on each request

  try {
    const actions = matchRoutes(routes, req.path)
      .map(({ route }) => route.component.fetching ? route.component.fetching({...store, path: req.path }) : null) // Static method named fetching defined below
      .map(async actions => await Promise.all(
        (actions || []).map(p => p && new Promise(resolve => p.then(resolve).catch(resolve)))
        ) // Execute static fetching method
      );

    await  Promise.all(actions);
    const context = {};
    const content = render(context, req.path, store);
    res.send(content);
  } catch (e) {
    console.log(e)
  }
});


app.listen(PORT, () => console.log(`SSR service listening on port: ${PORT}`));
