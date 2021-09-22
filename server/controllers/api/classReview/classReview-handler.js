'use strict'

const classReviewModel = require('../../../models/classReview')



module.exports.insert = async (options, connection) => {
  try{
    return await classReviewModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}



module.exports.update = async (options, connection) => {
  try{
    return await classReviewModel.update(options, connection)
  }
  catch (e) {
    // throw new Error(e)
    console.log(e)
  }
}



module.exports.getList = async (options) => {
    try{
      console.log("getList")
      const results =  await classReviewModel.getList(options)
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
      return await classReviewModel.delete(options.IDX, connection)
    }
    catch (e) {
      throw new Error(e)
    }
  }