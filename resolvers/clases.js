const { getConnection, sql } = require('../DB/db'); 

const classResolver = {
    Query:{
        clases: async () => {
            try{
                const pool = await getConnection()
                const result = await pool.request()
                .query(`
                    select * from exampleprep.Clases
                `);
                return result.recordset;
            }catch(err){
                console.error(err);
                throw err;
            }
        }
    },
    Clase: {
        estudiantes: async (parent) => {
            try{
                const pool = await getConnection();
                const result = await pool.request()
                .input( 'clase_id' , sql.Int , parent.id )
                .query(`
                    select
                        EC.nota
                        , EC.observacion_id
                        , EC.estudiante_id
                        , E.nombre
                        , E.edad
                    from exampleprep.EstudianteClases EC 
                    inner join exampleprep.Estudiantes E 
                    on EC.estudiante_id = E.id
                    where clase_id = @clase_id
                `)

                return result.recordset.map( row => ({
                    nota: row.nota
                    , observacion: { id: row.observacion_id }
                    , estudiante: {
                        id: row.estudiante_id
                        , nombre: row.nombre
                        , edad: row.edad
                    }
                }));
            }catch(err){
                console.error(err);
                throw err;
            }
        }
    }
};

module.exports = classResolver;