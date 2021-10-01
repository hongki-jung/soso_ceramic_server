'use strict'

const CryptoJS = require('crypto-js')
var moment = require('moment');

module.exports.encryption =  (val) => {
  return CryptoJS.SHA512(val).toString()
}



module.exports.makePageData = (listTotal, currentPage, block, limit = 10) => {
  const pagenation = {}
  const total = listTotal
  const pageBlock = (!block || block < 0) ? 10 : block
  
  if (!currentPage || currentPage < 0) {
    pagenation.cur_page = 1
  } else {
    pagenation.cur_page = currentPage
  }

  // const totalpage = parseInt(total / pageBlock)
  // const remain = total % pageBlock
  const totalPage = parseInt(total / limit)
  const remain = total % limit
  pagenation.block = pageBlock

  
  if(remain !== 0){
    pagenation.total_page = totalPage + 1
  } else {
    pagenation.total_page = totalPage
  }

  pagenation.total = total
  let curPageBlock

  if (pagenation.cur_page % pageBlock === 0 && pagenation.cur_page / pageBlock !== 0) {
    curPageBlock = parseInt(pagenation.cur_page / pageBlock)
  } else {
    curPageBlock = parseInt(pagenation.cur_page / pageBlock) + 1
  }

  let totalPageBlock = parseInt(pagenation.total_page / pageBlock) + 1
  pagenation.total_block = totalPageBlock

  if (curPageBlock === 0) {
    pagenation.cur_block = 1
  } else {
    pagenation.cur_block = curPageBlock
  }

  return pagenation
}


///////////////////// makePageData upgrade version /////////////////////////////
// listTotal - 전체 페이지 수 
// CurrentPage - 현재 페이지 수
// block - 한 페이지에 몇 개씩 불러올 건지 결정

// module.exports.makePageData = (listTotal, CurrentPage, block) => {
//   const pagenation = {}
//   const total = listTotal
//   const pageBlock = (!block || block < 0) ? 10 : block
  
//   if (!CurrentPage || CurrentPage < 0) {
//     pagenation.cur_page = 1
//   } else {
//     pagenation.cur_page = CurrentPage
//   }

//   const totalpage = parseInt(total / pageBlock)
//   const remain = total % pageBlock
//   pagenation.block = pageBlock

  
//   if(remain !== 0){
//     pagenation.totalpage = totalpage + 1
//   } else {
//     pagenation.totalpage = totalpage
//   }
  
//   pagenation.total = total
//   let curPageBlock

//   if (pagenation.cur_page % pageBlock === 0 && pagenation.cur_page / pageBlock !== 0) {
//     curPageBlock = parseInt(pagenation.cur_page / pageBlock)
//   } else {
//     curPageBlock = parseInt(pagenation.cur_page / pageBlock) + 1
//   }

//   let totalPageBlock = parseInt(pagenation.totalpage / pageBlock) + 1
//   pagenation.total_block = totalPageBlock

//   if (curPageBlock === 0) {
//     pagenation.cur_block = 1
//   } else {
//     pagenation.cur_block = curPageBlock
//   }

//   return pagenation
// }

module.exports.createTempPassword = (length) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
  let randNum = null
  let tempPassword = ''
  for(let i = 0; i < length; i++) {
    randNum = Math.floor(Math.random() * chars.length)
    tempPassword += chars.substring(randNum, randNum + 1)
  }
  return tempPassword
}

module.exports.getCurrentTime = () => {

  var date = new Date().toLocaleString("en-US", {timeZone: "Asia/Seoul"});
  date = new Date(date);

  Date.prototype.YYYYMMDDHHMMSS = function () {
    var yyyy = this.getFullYear().toString();
    var MM = pad(this.getMonth() + 1,2);
    var dd = pad(this.getDate(), 2);
    var hh = pad(this.getHours(), 2);
    var mm = pad(this.getMinutes(), 2)
    var ss = pad(this.getSeconds(), 2)
  
    return yyyy+"-" + MM+"-" + dd+" "+  hh +":"+ mm +":"+ ss;
  };
  function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
  }
  return date.YYYYMMDDHHMMSS();
}