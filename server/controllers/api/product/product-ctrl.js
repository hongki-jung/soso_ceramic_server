'use strict'


const db = require('../../../components/db')
const util = require('../../../components/util')
const productModel = require('../../../models/product')
const imagesModel = require('../../../models/images')
const config = require('../../../config/index')
const Redis = require("redis")
const redisCache = require('../../../components/redisCache')

const redisClient = Redis.createClient({
  host:config.redis.socket.host,
  port:config.redis.socket.port
})

// 상품 등록
module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const newProduct = {...req.options}
    
    // 상품 추가 시 전체 상품 조회 캐시 삭제 
    redisClient.del('products')

    const imagePathArray = req.options.product_detail_images
    delete newProduct.product_detail_images

    const newImagePathList = []

    newProduct.first_create_dt = util.getCurrentTime()
    const result = await productModel.insert(newProduct, connection)

    // 상세 이미지 등록
    if (imagePathArray && imagePathArray.length > 0){
      for (let i = 0 ; i< imagePathArray.length; i++){
        let temp = []
        temp.push(result)
        temp.push(imagePathArray[i])
        newImagePathList.push(temp)
      }
      console.log("newImagePathList multi insert",newImagePathList)
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
    const imagePathArray = product_info.product_detail_images
    delete product_info.product_detail_images

    // 상품 캐시 삭제 
    redisClient.del('products')
    redisClient.del(`products?productIdx=${product_info.product_idx}`)

    // 메인 이미지를 비롯한 상품 정보 수정 
    const result = await productModel.update(product_info, connection)
    if(result === 0) throw {status: 404, errorMessage: 'Product not found'}
    
    const newImagePathList = []

    // 상품 상세이미지 수정도 요청된 경우
    // 기존의 상세이미지들의 path를 모두 지워주고 새로운 path를 넣어준다
    if (imagePathArray && imagePathArray.length > 0){

      // 기존 상세 이미지 삭제
      await imagesModel.deleteDetailImages({product_idx: product_info.product_idx});

      // 새로운 상세 이미지 추가
      for (let i = 0; i < imagePathArray.length; i++) {
        let temp = [];
        temp.push(product_info.product_idx);
        temp.push(imagePathArray[i]);
        newImagePathList.push(temp);
      }
      await imagesModel.multipleInsert(newImagePathList, connection);
    }

    await db.commit(connection)
    res.status(200).json({result:true})
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
  finally {
    await connection.destroy()
  }
}


// 상품 카테고리 변경
module.exports.updateProductCategory = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try{
    const changeInfo = req.options

    // 특정 상품 캐시 삭제 
    redisClient.del('products')
    redisClient.del(`products?productIdx=${changeInfo.product_idx}`)

    const result = await productModel.updateProductCategory(changeInfo, connection)
    if(result === 0) throw {status: 404, errorMessage: 'Product Not found'}
    
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

    // 상품 캐시 삭제 
    redisClient.del('products')
    redisClient.del(`products?productIdx=${product_info.product_idx}`)

    const result = await productModel.delete({product_idx: product_info.product_idx}, connection)
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



// 조건 별 상품 조회 
module.exports.getListPagination = async (req, res, next) => {
  try {
    const params = req.options
    const result = await productModel.getList(params)
    const total = await productModel.getListTotal(params)

    const query = req.query
    const pagenation = util.makePageData(total, req.options.page, req.options.block, req.options.limit)

    res.status(200).json({result, query, pagenation})
  }
  catch (err) {
    next(err)
  }
}


// 상품 전체 조회
module.exports.getList = async (req, res, next) => {
  try {
    const params = req.options
 
    const DEFAULT_EXPIRATION = 1800

    redisClient.get("products", async (error, productInfo)=>{
      if (error) console.error(error)
    
      if (productInfo != null){
        // Cache Hit 
        return res.status(200).json(JSON.parse(productInfo))
      }else{
        // Cache Miss
        const products = await productModel.getList(params)
        redisClient.setex("products", DEFAULT_EXPIRATION, JSON.stringify(products))
        res.status(200).json(products)
      }
    })

  }catch (err) {
    next(err)
  }
}


// 상품 상세정보
module.exports.getProductDetailInfo = async (req, res, next) => {
  try {
    const productIdx = req.options.product_idx

    const product = await redisCache.getOrSetCache(`products?productIdx=${productIdx}`,async()=>{

          // 특정 상품의 정보를 불러온다.
          const result = await productModel.findOneByProductIdx(productIdx)
          if (!result) return {status: 400, errorMessage:"Product not found"}

          // 특정 상품의 상세 이미지들을 불러온다.
          const images = await imagesModel.getImagesByProductIdx({product_idx: result.product_idx})
          const productDetailImg = images.map((item) => {
              return {
                file_idx: item.file_idx,
                product_idx: item.product_idx,
                path: item.path,
              };
            })
            
          result.productDetailImg = [...productDetailImg]
  
          return result
    })

    res.status(200).json(product)

  }
  catch (err) {
    next(err)
  }
}



        // const images = await imagesModel.getImagesByProductIdx({product_idx: product_info.product_idx})
        // console.log("images??<<<",images)
        // if(images && images.length >0){
        //   // 기존의 상세이미지들의 path를 지워준다
        //   await imagesModel.deleteDetailImages({product_info: product_info.product_idx}, connection)
          
        // }