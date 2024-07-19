const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const routes = require("./routes");
const schema = require("./schema/schema");

const app = express();

const PORT = 4000;

app.use(
  routes.GRAPHQL,
  expressGraphQL({
    schema,
    graphiql: true, // enables interactive in-browser GraphQL IDE
  })
);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
