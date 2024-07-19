const graphql = require("graphql");
const axios = require("axios");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;

const { ROOT_URL } = require("./constants");

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: GraphQLList(UserType),
      resolve(parentValue) {
        return axios
          .get(`${ROOT_URL}/companies/${parentValue.id}/users`)
          .then((res) => res.data);
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue) {
        return axios
          .get(`${ROOT_URL}/companies/${parentValue.companyId}`)
          .then((response) => response.data);
      },
    },
  },
});

module.exports = {
  UserType,
  CompanyType,
};
