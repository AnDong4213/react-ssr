import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Provider } from "react-redux";
import store from "./store";
import Routes, { routesConfig } from "./routes";

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("dist/public"));

app.get("*", (req, res) => {
  console.log(req.url);
  console.log(routesConfig);

  const content = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <Routes />
      </StaticRouter>
    </Provider>
  );

  console.log("content--", content);

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root">${content}</div>
        <script src="bundle_client.js"></script>
      </body>
    </html>
  `;

  res.writeHead(200, {
    "content-type": "text/html;charset=utf8"
  });
  res.end(html);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
