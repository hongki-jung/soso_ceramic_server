const db = require('../components/db')


module.exports.getList = async (option) => { // condition filter
    try{
        let sql = `SELECT * FROM cart`

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
            sql: `INSERT INTO cart SET ?`,
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
            sql: `UPDATE cart SET ? WHERE cart_idx = ?`,
            values: [options, options.cart_idx]
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
            sql: `DELETE FROM cart WHERE cart_idx = ?`,
            values: [options.cart_idx]
          })
    } catch(err){
        throw new Error(err)
    }
}

