import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { routes } from "../src/routes";

export const render = (context, path, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter>
        {
          renderRoutes(routes)
        }
      </StaticRouter>
    </Provider>
  );


  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <script src="/dist/bundle.js"></script>
    <title>Welcome to API Platform</title>
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root">${content}</div>
    <script>window.INITIAL_STATE = ${JSON.stringify(store.getState())}</script>
  </body>
</html>
  `;
};
