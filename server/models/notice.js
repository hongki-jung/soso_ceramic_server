const db = require('../components/db')


module.exports.getList = async (option) => { // condition filter
    try{
        let sql = `SELECT * FROM notice`

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
            sql: `INSERT INTO notice SET ?`,
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

