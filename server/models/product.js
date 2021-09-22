const db = require('../components/db')


module.exports.getList = async (option) => { 
    try{
        let sql = `SELECT * FROM product`

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
            sql: `INSERT INTO product SET ?`,
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
            sql: `UPDATE product SET ? WHERE product_idx = ?`,
            values: [options, options.product_idx]
          })
          return affectedRows
    } catch(err){
        throw new Error(err)
    }
}


module.exports.delete = async (IDX, connection) => {
    try{
        return await db.query({
            connection,
            sql: `DELETE FROM product WHERE product_idx = ?`,
            values: [IDX]
          })
    } catch(err){
        throw new Error(err)
    }
}

