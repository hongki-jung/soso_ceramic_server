'use strict'

const noticeModel = require('../../../models/notice')
const db = require('../../../components/db')
const util = require('../../../components/util')

// 공지사항 추가
module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const newNotice = req.options

    
    const result = await noticeModel.insert(newNotice, connection)
    await db.commit(connection)
    res.status(200).json({result: result});

  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

// 공지사항 수정
module.exports.update = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try{
    const notice_info = req.options

    console.log('notice_info', notice_info);

    const result = await noticeModel.update(notice_info, connection)
    if(result === 0) throw {status: 404, errorMessage: 'Notice Not found '}
    
    await db.commit(connection)
    res.status(200).json({result:true})
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

// 공지사항 삭제
module.exports.delete = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try{
    const notice_info = req.options;

    const result = await noticeModel.delete({notice_idx: notice_info.notice_idx}, connection)
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


// 공지사항 리스트 불러오기
module.exports.getList = async (req, res, next) => {
  try {
    const params = req.options

    const result = await noticeModel.getList(params)
    const total = await noticeModel.getListTotal(params)
    const query = req.query

    const pagenation = util.makePageData(total, req.options.page, req.options.block, req.options.limit)

    res.status(200).json({result, query, pagenation})
  }
  catch (err) {
    next(err)
  }
}

