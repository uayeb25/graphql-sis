const { mergeResolvers } = require('@graphql-tools/merge');

const observacionResolvers = require('./observacion')
const estudiantesResolvers = require('./estudiantes')
const estudianteClaseResolvers = require('./estudianteClase')
const classResolver = require('./clases')

const resolversArray = [
    observacionResolvers
    , estudiantesResolvers
    , estudianteClaseResolvers
    , classResolver
]

const resolvers = mergeResolvers( resolversArray );

module.exports = resolvers;