const db = require('../components/db')




// multi insert
// [[],[],[]] 형식
module.exports.multipleInsert = async (options, connection) =>{
  try{
    const result = await db.query({
      conection: connection,
      sql:
        "INSERT INTO images (`product_idx`, `path`) VALUES ?",
      values: [options]
      
    })
    console.log("resulteraneslrknesr---1",result)
    return result;
  }catch(err){
    throw new Error(err)
  }
}




module.exports.deleteDetailImages = async(options, connection) =>{
  try{
    return await db.query({
      connection,
      sql: `DELETE FROM images WHERE product_idx = ?`,
      values:[options.product_idx]
    })
  }catch(err){
    throw new Error(err)
  }
}

module.exports.getImagesByProductIdx = async(options) =>{
  try{
    let sql = `SELECT * FROM images WHERE product_idx = ?`
    const result = await db.query({
      sql,
      values: [options.product_idx]
    })
    return result
  }catch(err){
    throw new Error(err)
  }
}