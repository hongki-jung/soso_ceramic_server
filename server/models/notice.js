const db = require('../components/db')


module.exports.getList = async (options) => { // condition filter
    try{
        const {notice_idx, limit} = options
        let page = options.page
        if(!page || page<0){
          page=1;
        }
        let offset = (page-1)*limit
        let limitClause
        if(limit){
          limitClause = `limit ${offset}, ${limit}`;
        }else{
          limitClause = ``
        }

        let whereClause = ``;
        if (notice_idx) whereClause += ` AND notice.notice_idx = ${notice_idx}`
        

        let sql = `SELECT * FROM notice WHERE 1=1 ${whereClause} ORDER BY notice.first_create_dt DESC ${limitClause}`

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
            sql: `INSERT INTO notice SET ?`,
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
            sql: `UPDATE notice SET ? WHERE notice_idx = ?`,
            values: [options, options.notice_idx]
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
            sql: `DELETE FROM notice WHERE notice_idx = ?`,
            values: [options.notice_idx]
          })
    } catch(err){
        throw new Error(err)
    }
}

