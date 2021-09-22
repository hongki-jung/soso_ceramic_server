'use strict'

const handler = require('./classTime-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')


module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const cTime = req.options
    console.log('cTime ',cTime);
    
    const result = await handler.insert(cTime, connection)
    await db.commit(connection)
    res.status(200).json({result: result});

  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

module.exports.update = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try{
    const cTime = req.options

    console.log('cTime', cTime);

    const result = await handler.update(cTime, connection)
    if(result === 0) throw {status: 404, errorMessage: 'Not found lecture'}
    
    await db.commit(connection)
    res.status(200).json({result:true})
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}


module.exports.delete = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try{
    const cTime =req.options;
    console.log('cTime ',cTime);
    console.log('cTime.IDX',cTime.IDX);
    
    const result = await handler.delete({IDX:cTime.IDX}, connection)
    await db.commit(connection)
    let returnValue = false;
    if(result.affectedRows === 1){
      returnValue = true
    }
    res.status(200).json({result:returnValue})
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

module.exports.getList = async (req, res, next) => {
  try {
    const params = req.options
    console.log('hihi')
    const result = await handler.getList(params)
    res.status(200).json(result)
  }
  catch (err) {
    next(err)
  }
}

