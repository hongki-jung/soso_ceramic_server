const db = require('../components/db');
const { limit } = require('../config');


// Email
module.exports.findOneById = async (id) => {
  try {
    let query = `SELECT * FROM user WHERE user_email = ? limit 1`;
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

module.exports.getList = async (options) => { // condition filter
    try{
      const {user_idx, user_email, phone_number, user_name, user_level, limit} = options
      let page = options.page;
      console.log("page :",page)

      if(!page || page<0){
        page=1;
      }
      let offset = (page -1) *limit
      let limitClause;
      if (limit) {
        limitClause = `limit ${offset},${limit}`;
      }else{
        limitClause = ``;  
      }
      let whereClause = ``;

      if(user_idx) whereClause += `AND user.user_idx = ${user_idx}`
      if(user_email) whereClause += `AND user.user_email LIKE '%${user_email}%'`;
      if(phone_number) whereClause += `AND user.phone_number LIKE '%${phone_number}%'`;
      if(user_name) whereClause += `AND user.user_name = '${user_name}'`;
      if(user_level) whereClause += `AND user.user_level = '${user_level}'`;

      let sql = `
          SELECT * FROM user 
            WHERE 1=1 ${whereClause} 
            ORDER BY user.first_create_dt DESC ${limitClause}
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

