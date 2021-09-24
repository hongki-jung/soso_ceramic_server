const db = require('../components/db')


module.exports.getList = async (options) => { // condition filter
    try{
      const {user_idx, cart_idx} = options
      let whereClause = ``
      if (user_idx) whereClause += ` AND cart.user_idx = ${user_idx}`
      if (cart_idx) whereClause += ` AND cart.cart_idx = ${cart_idx}`

      let sql = `
        SELECT * FROM cart WHERE 1=1 ${whereClause} ORDER BY cart.first_create_dt DESC  
        `
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
            sql: `INSERT INTO cart SET ?`,
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

