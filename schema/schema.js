const graphql = require("graphql");
const axios = require("axios");

const { ROOT_URL } = require("./constants");
const { UserType, CompanyType } = require("./types");
const mutation = require("./mutation");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(_, args) {
        return axios
          .get(`${ROOT_URL}/users/${args.id}`)
          .then((res) => res.data);
      },
    },
    company: {
      type: CompanyType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(_, args) {
        return axios
          .get(`${ROOT_URL}/companies/${args.id}`)
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
