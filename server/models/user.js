const db = require('../components/db')


// ID
module.exports.findOneById = async (id) => {
  try {
    let query = `SELECT * FROM user WHERE user_id = ? limit 1`;
    // return await db.query(sql, [id])
    //console.log("query : ", query);
    const result = await db.query({
      sql: query,
      values: [id],
    });

    return result[0];
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getList = async (option) => { // condition filter
    try{
        let sql = `SELECT * FROM user`

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
            sql: `INSERT INTO user SET ?`,
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
            sql: `UPDATE user SET ? WHERE idx = ?`,
            values: [options, options.IDX]
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
            sql: `DELETE FROM user WHERE idx = ?`,
            values: [IDX]
          })
    } catch(err){
        throw new Error(err)
    }
}

