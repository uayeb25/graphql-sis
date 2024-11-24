const { getConnection , sql } = require('../DB/db');

const estudiantesResolvers = {
    Query: {
        estudiantes: async ( _ , args ) => {
            try{
                const pool = await getConnection();
                const request = pool.request();

                let qry = "select * from exampleprep.Estudiantes where 1=1"

                if(args.id){
                    request.input( 'estudiante_id' , sql.Int, args.id )
                    qry += " and id=@estudiante_id"
                }

                const result= await request.query(qry)
                return result.recordset;
            }catch(err){
                console.error(err);
                throw err;
            }
        }
    },
    Estudiante: {
        clases: async (parent) => {
            const pool = await getConnection();
            const result = await pool.request()
            .input( 'estudiante_id' , sql.Int , parent.id )
            .query(`
                select 
                    EC.nota
                    , EC.observacion_id
                    , EC.clase_id
                    , C.nombre
                    , C.descripcion
                from [exampleprep].[EstudianteClases] EC 
                inner join exampleprep.Clases C 
                on EC.clase_id = C.id
                where estudiante_id = @estudiante_id
            `);

            return result.recordset.map(row=>({
                nota: row.nota
                , clase: {
                    id: row.clase_id
                    , nombre: row.nombre
                    , descripcion: row.descripcion
                }
                , observacion: {
                    id: row.observacion_id
                }
            }));
        }
    }
};


module.exports = estudiantesResolvers;