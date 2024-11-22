require('dotenv').config();
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const morgan = require('morgan');


const app = express();

// Definir el esquema (typeDefs)
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Definir los resolvers
const resolvers = {
  Query: {
    hello: () => '¡Hola, mundo!',
  },
};


app.use(morgan('dev'));

const server = new ApolloServer({
    typeDefs,
    resolvers
});


async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Servidor listo en http:localhost:${PORT}${server.graphqlPath} `);
    });
}

startServer();
