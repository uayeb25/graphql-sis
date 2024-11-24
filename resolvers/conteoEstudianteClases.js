const { getConnection, sql } = require('../DB/db'); 
const { Query } = require('./observacion');

const conteoEstudiantesClaseResolver = {
    Query: {
        conteoEstudiantesClase: async () => {
            const pool = await getConnection();
            const result = await pool.request()
            .query(`
                select 
                    C.id
                    , C.nombre
                    , c.descripcion
                    , COUNT( EC.estudiante_id ) conteo
                from exampleprep.EstudianteClases EC
                INNER join exampleprep.Clases C 
                on EC.clase_id = C.id
                GROUP BY C.id
                    , C.nombre
                    , c.descripcion
            `);

            return result.recordset.map( row => ({
                conteo: row.conteo
                , clase: {
                    id: row.id
                    , nombre: row.nombre
                    , descripcion: row.descripcion
                }
            }));
        }
    }
}

module.exports = conteoEstudiantesClaseResolver;