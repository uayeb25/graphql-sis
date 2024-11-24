const { mergeResolvers } = require('@graphql-tools/merge');

const observacionResolvers = require('./observacion')
const estudiantesResolvers = require('./estudiantes')
const estudianteClaseResolvers = require('./estudianteClase')
const classResolver = require('./clases')
const conteoEstudiantesClaseResolver = require('./conteoEstudianteClases')

const resolversArray = [
    observacionResolvers
    , estudiantesResolvers
    , estudianteClaseResolvers
    , classResolver
    , conteoEstudiantesClaseResolver
]

const resolvers = mergeResolvers( resolversArray );

module.exports = resolvers;