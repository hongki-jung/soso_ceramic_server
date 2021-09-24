'use strict'


const db = require('../../../components/db')
const util = require('../../../components/util')
const productModel = require('../../../models/product')
const imagesModel = require('../../../models/images')


// 상품 등록
module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const newProduct = {...req.options}
    
    const detailImagePath = req.options.product_detail_images
    delete newProduct.product_detail_images

    const newImagePathList = []

    newProduct.first_create_dt = util.getCurrentTime()
    const result = await productModel.insert(newProduct, connection)

    // 상세 이미지 등록
    if (detailImagePath && detailImagePath.length > 0){
      for (let i = 0 ; i< detailImagePath.length; i++){
        let temp = []
        temp.push(result)
        temp.push(detailImagePath[i])
        newImagePathList.push(temp)
      }
      await imagesModel.multipleInsert(newImagePathList, connection)
    }

    

    await db.commit(connection)
    res.status(200).json({result: result});

  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

// 상품 정보 수정
module.exports.update = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try{
    const product_info = req.options
    
    const result = await productModel.update(product_info, connection)
    if(result === 0) throw {status: 404, errorMessage: 'Product Not found'}
    
    if (product_info.product_detail_image && product_info.product_detail_image.length >0){

    }

    await db.commit(connection)
    res.status(200).json({result:true})
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

// 상품 삭제
module.exports.delete = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try{
    const product_info = req.options;
    const result = await productModel.delete({product_info: product_info.product_idx}, connection)
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

// 조건 별 상품 정보 조회
module.exports.getList = async (req, res, next) => {
  try {
    const params = req.options
    const result = await productModel.getList(params)
    // const total = await productModel.getListTotal(params)

    // const query = req.query
    // const pagenation = util.makePageData(total.length, req.options.page, req.options.srch_cnt)
    res.status(200).json(result)
  }
  catch (err) {
    next(err)
  }
}

// 상품 상세정보
module.exports.getProductDetailInfo = async (req, res, next) => {
  try {
    const productIdx = req.options

    const result = await productModel.findOneByProductIdx(productIdx)

    const images = await imagesModel.getImagesByProductIdx({product_idx: result.product_idx})
    const productDetailImg = images.map((item) => {
      return { 
        file_idx : item.file_idx,
        product_idx: item.product_idx,
        path: item.path
      }
    })

    result.productDetailImg = [...productDetailImg]

    res.status(200).json(result)
  }
  catch (err) {
    next(err)
  }
}
