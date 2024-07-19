const graphql = require("graphql");
const axios = require("axios");

const { ROOT_URL } = require("./constants");
const { UserType } = require("./types");

const { GraphQLNonNull, GraphQLString, GraphQLObjectType, GraphQLInt } =
  graphql;

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        comanyId: { type: GraphQLString },
      },
      resolve(_, { firstName, age }) {
        return axios
          .post(`${ROOT_URL}/users`, {
            firstName,
            age,
          })
          .then((res) => res.data);
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, { id }) {
        return axios.delete(`${ROOT_URL}/users/${id}`).then((res) => res.data);
      },
    },
  },
});

module.exports = mutation;
