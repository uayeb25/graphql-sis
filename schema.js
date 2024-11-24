const { gql } = require('apollo-server-express');

const typeDefs = gql`
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

    type ConteoEstudiantesClase{
        clase: Clase
        conteo: Int
    }

    type Query{
        estudiantes( id: Int ): [Estudiante]
        clases( id: Int, nombre: String ): [Clase]
        observaciones: [Observacion]
        conteoEstudiantesClase: [ConteoEstudiantesClase]
    }
`

module.exports = typeDefs;