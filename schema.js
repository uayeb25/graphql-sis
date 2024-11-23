const { gpl } = require('apollo-server-express');

const typeDefs = gpl`
    type Estudiante{
        id: ID!
        nombre: String!
        edad: Int
        clases: [EstudianteClase]
    }

    type Clase{
        id: ID!
        nombre: String!
        descripcion: String
        estudiantes: [EstudianteClase]
    }

    type Observacion {
        id: ID!
        descripcion: String!
    }

    type EstudianteClase {
        estudiante: Estudiante
        clase: Clase
        observacion: Observacion
        nota: Float
    }

    type Query{
        estudiante: [Estudiante]
        clases: [Clase]
        observaciones: [Observacion]
    }

`

module.exports = typeDefs;