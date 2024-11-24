const { getConnection , sql } = require('../DB/db');

const estudianteClaseResolvers = {
    EstudianteClase: {
        observacion: async (parent) => {
            try{
                const pool = await getConnection();
                const result = await pool.request()
                .input( 'observacion_id', sql.Int , parent.observacion.id )
                .query(`
                    select * from exampleprep.Observaciones where id=@observacion_id
                `);
                return result.recordset[0];
            }catch(err){
                console.error(err);
                throw err;
            }
        }
    }

};

module.exports = estudianteClaseResolvers;