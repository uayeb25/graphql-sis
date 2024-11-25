require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const morgan = require('morgan');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const authMiddleware = require('./middleware/auth');

const app = express();

app.use(cors());

app.use(morgan('dev'));
app.use(authMiddleware);


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        return { user: req.user };
    },
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
