'use strict'

const orderModel = require('../../../models/order')
const orderDetailModel = require('../../../models/orderDetail')

const db = require('../../../components/db')
const util = require('../../../components/util')


module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const newOrder = {...req.options}
    const productInfo = newOrder.order_detail_list
    const productInfoList = []

    delete newOrder.order_detail_list

    
    newOrder.order_dt = util.getCurrentTime();

    const result = await orderModel.insert(newOrder, connection)
    
    if (productInfo && productInfo.length > 0){
      for (let i = 0 ; i< productInfo.length; i++){
        let temp = []
        temp.push(result)
        temp.push(productInfo[i].product_idx)
        temp.push(productInfo[i].product_count)
        temp.push(productInfo[i].product_price)
        productInfoList.push(temp)
      }
      await orderDetailModel.multipleInsert(productInfoList, connection)

    }else{
      throw {status: 404, errorMessage: 'Order product not found'} 
    }

    await db.commit(connection)
    res.status(200).json({result: result});
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

// 주문 상태 변경
module.exports.update = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try{
    const order_info = req.options

    const result = await orderModel.update(order_info, connection)
    if(result === 0) throw {status: 404, errorMessage: 'Order not found'}
    
    await db.commit(connection)
    res.status(200).json({result:true})
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

// 주문 취소
module.exports.delete = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try{
    const order_info =req.options;
 
    const result = await orderModel.delete({order_idx:order_info.order_idx}, connection)
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
    
    const result = await orderModel.getList(params)
    res.status(200).json(result)
  }
  catch (err) {
    next(err)
  }
}

