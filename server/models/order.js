const db = require('../components/db')


module.exports.getList = async (option) => { // condition filter
    try{
        let sql = `SELECT * FROM order`

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
            sql: `INSERT INTO order SET ?`,
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
            sql: `UPDATE order SET ? WHERE order_idx = ?`,
            values: [options, options.order_idx]
          })
          return affectedRows
    } catch(err){
        throw new Error(err)
    }
}


module.exports.delete = async (options, connection) => {
    try{
        return await db.query({
            connection,
            sql: `DELETE FROM order WHERE order_idx = ?`,
            values: [options.order_idx]
          })
    } catch(err){
        throw new Error(err)
    }
}

