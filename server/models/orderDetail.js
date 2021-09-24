const db = require('../components/db')


module.exports.getList = async (option) => { // condition filter
    try{
        let sql = `SELECT * FROM order_detail`

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
            sql: `INSERT INTO order_detail SET ?`,
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
            sql: `UPDATE order SET ? WHERE order_detail_idx = ?`,
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
            sql: `DELETE FROM order_detail WHERE order_idx = ?`,
            values: [options.order_idx]
          })
    } catch(err){
        throw new Error(err)
    }
}


// multi insert
// [[],[],[]] 형식
module.exports.multipleInsert = async (options, connection) =>{
  try{
    const result = await db.query({
      conection: connection,
      sql:
        "INSERT INTO order_detail (`order_idx`, `product_idx`, `product_count`, `product_price`) VALUES ?",
      values: [options]
      
    })
    return result;
  }catch(err){
    throw new Error(err)
  }
}