const db = require('../components/db')


module.exports.getList = async (options) => { 
    try{
        const {product_idx,product_name, price, category_idx, limit}=options
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
        
        if (product_idx) whereClause += `AND product.product_idx = ${product_idx}`
        if (product_name) whereClause += `AND product.product_name LIKE '%${product_name}%'`;
        if (price) whereClause += `AND product.price LIKE '%${price}%'`
        if (category_idx) whereClause += `AND product.category_idx = ${category_idx}`
        
        let sql = `
        SELECT product.*, category.category_name FROM product 
          INNER JOIN category ON product.category_idx = category.category_idx
          WHERE 1=1 ${whereClause}
        ORDER BY product.first_create_dt DESC ${limitClause}
        `
        // return await db.query(sql)
        return await db.query({
            sql: sql
        })
    } catch(err){
        throw new Error(err)
    }
}


module.exports.findOneByProductIdx = async(options) =>{
  try{
    let sql =`
        SELECT product.*, category.category_name FROM product 
          INNER JOIN category ON product.category_idx = category.category_idx
        WHERE product_idx = ?
    `
    const result = await db.query({
      sql,
      values: [options]
    })
    return result[0]
  }catch(err){
    throw new Error(err)
  }
}

module.exports.insert = async (options, connection) => {
    try{        
        const {insertId} = await db.query({
            connection: connection,
            sql: `INSERT INTO product SET ?`,
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
            sql: `UPDATE product SET ? WHERE product_idx = ?`,
            values: [options, options.product_idx]
          })
          return affectedRows
    } catch(err){
        throw new Error(err)
    }
}



module.exports.updateProductCategory = async (options, connection) => {
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



module.exports.delete = async (options, connection) => {
    try{
        return await db.query({
            connection,
            sql: `DELETE FROM product WHERE product_idx = ?`,
            values: [options.product_idx]
          })
    } catch(err){
        throw new Error(err)
    }
}


module.exports.getListTotal = async(options) =>{
  try{
    const result = await db.query({
      sql: `SELECT COUNT(*) as total FROM product`
    })
    return result[0].total
  }catch(err){
    throw new Error(err);
  }
}