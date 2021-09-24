const db = require('../components/db')


module.exports.getList = async (option) => { // condition filter
    try{
        let sql = `SELECT * FROM category`

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
        const {insertId} = await db.query({
            connection: connection,
            sql: `INSERT INTO category SET ?`,
            values: [options]
          })
          return insertId
    }
        catch(err){
        throw new Error(err)
    }
}



module.exports.update = async (options, connection) => {
    try{
        const {affectedRows} = await db.query({
            connection: connection,
            sql: `UPDATE category SET ? WHERE category_idx = ?`,
            values: [options, options.category_idx]
          })

          console.log('affectedRows ',affectedRows);
          
          return affectedRows
    } catch(err){
        throw new Error(err)
    }
}


module.exports.delete = async (options, connection) => {
    try{
        return await db.query({
            connection,
            sql: `DELETE FROM category WHERE category_idx = ?`,
            values: [options.category_idx]
          })
    } catch(err){
        throw new Error(err)
    }
}

