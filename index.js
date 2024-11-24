require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const morgan = require('morgan');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const app = express();

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
