'use strict'

const classTimeModel = require('../../../models/classTime')


module.exports.insert = async (options, connection) => {
  try{
    return await classTimeModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}



module.exports.update = async (options, connection) => {
  try{
    return await classTimeModel.update(options, connection)
  }
  catch (e) {
    // throw new Error(e)
    console.log(e)
  }
  
}



module.exports.getList = async (options) => {
    try{
      console.log("getList")
      const results =  await classTimeModel.getList(options)
      return results.map(result => {
        delete result.password
        return result
      })      
    }
    catch (e) {
      throw new Error(e)
    }
  }
  
  module.exports.delete = async (options, connection) => {
    try{    
      console.log('del options.IDX',options.IDX);
      return await classTimeModel.delete(options.IDX, connection)
    }
    catch (e) {
      throw new Error(e)
    }
  }