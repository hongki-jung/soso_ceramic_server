const db = require('../components/db')


module.exports.getList = async (options) => { // condition filter
    try{
        const {order_idx, user_idx, order_dt, order_state, limit} = options
        let page = options.page
        if(!page || page<0){
          page=1;
        }
        let offset = (page - 1)*limit
        let limitClause
        if(limit){
          limitClause = `limit ${offset}, ${limit}`;
        }else{
          limitClause = ``
        }
        let whereClause = ``;

        if (order_idx) whereClause += ` AND orders.order_idx = ${order_idx}`
        if (user_idx) whereClause += ` AND orders.user_idx = ${user_idx}`
        // if (order_dt) whereClause += ` `
        if (order_state) whereClause += ` AND orders.order_state = ${order_state}`
        
        let sql = `
          SELECT 
            orders.*, user.user_id, user.user_email, user.phone_number, user.user_name
          FROM orders 
            INNER JOIN
              user ON user.user_idx = orders.user_idx
            WHERE 1=1 ${whereClause}
            ORDER BY orders.order_dt DESC ${limitClause}
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
            sql: `INSERT INTO orders SET ?`,
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
            sql: `UPDATE orders SET ? WHERE order_idx = ?`,
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
            sql: `DELETE FROM orders WHERE order_idx = ?`,
            values: [options.order_idx]
          })
    } catch(err){
        throw new Error(err)
    }
}

