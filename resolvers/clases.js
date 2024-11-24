const { getConnection, sql } = require('../DB/db'); 

const classResolver = {
    Query:{
        clases: async ( _ , args ) => {
            try{
                const pool = await getConnection()
                const request = pool.request();

                let qry = "select * from exampleprep.Clases where 1=1"

                if( args.nombre ){
                    request.input( "clase_nombre" , sql.VarChar , `%${args.nombre}%` );
                    qry += " and nombre like @clase_nombre "
                }

                if( args.id ){
                    request.input( "clase_id" , sql.Int, args.id )
                    qry += " and id = @clase_id "
                }

                const result= await request.query(qry)
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