const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  const delay = 500 + (Math.random() * 800);
  setTimeout(() => next(), delay);
});

const createRoutes = require('./api/routes');
const apolloServer = require('./graphql');

createRoutes(app);
apolloServer.applyMiddleware({ app, path: '/graphql' });

app.listen(9595, () => {
  console.log('Server running at http://localhost:9595');
});
