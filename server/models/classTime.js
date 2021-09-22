const db = require('../components/db')


module.exports.getList = async (option) => { // condition filter
    try{
        let sql = `SELECT * FROM ClassTime`

        // return await db.query(sql)
        return await db.query({
            sql: sql
        })
    } catch(err){
        throw new Error(err)
    }
}

module.exports.insert = async (options, connection) => {
    try{        
        const {insertContent} = await db.query({
            connection: connection,
            sql: `INSERT INTO ClassTime SET ?`,
            values: [options]
          })
          return insertContent
    }
        catch(err){
        throw new Error(err)
    }
}



module.exports.update = async (options, connection) => {
    try{
        const {affectedRows} = await db.query({
            connection: connection,
            sql: `UPDATE ClassTime SET ? WHERE idx = ?`,
            values: [options, options.IDX]
          })

          console.log('affectedRows ',affectedRows);
          
          return affectedRows
    } catch(err){
        throw new Error(err)
    }
}


module.exports.delete = async (IDX, connection) => {
    try{
        return await db.query({
            connection,
            sql: `DELETE FROM ClassTime WHERE idx = ?`,
            values: [IDX]
          })
    } catch(err){
        throw new Error(err)
    }
}

