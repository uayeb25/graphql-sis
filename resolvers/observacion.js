const { getConnection } = require('../DB/db');

const observacionResorlvers = {
    Query: {
        observaciones: async () => {
            try{
                const pool = await getConnection();
                const result = await pool.request().query(`
                    select * from exampleprep.Observaciones
                `);
                return result.recordset ;
            }catch(err){
                console.error(err);
                throw err;
            }
        }
    }
};

module.exports = observacionResorlvers;