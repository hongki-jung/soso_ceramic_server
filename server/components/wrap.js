'use strict'

//원하는 값만 빼내어 json 형식 으로 만든다
module.exports = (object, properties) => {
  try{
    if(!object || object.length === 0) return object
    let wrap = null
    const arrayWrap = []
    let keyName = Object.keys(properties)
    if (object && object.length > 0 && keyName.length > 1) {
      let temp = null
      object.forEach((data) => {
        temp = {}

        keyName.forEach((item, index) => {
          temp[keyName[index]] = {}
          properties[keyName[index]].replace(/ /gi, '').split(',').forEach((fieldName) => {
            temp[keyName[index]][fieldName] = data[fieldName]
          })
        })
        arrayWrap.push(temp)
      })
      wrap = arrayWrap
    }
    else if (object.length > 0) {
      let temp = null
      object.forEach(data => {
        temp = {}
        properties[keyName[0]].replace(/ /gi, '').split(',').forEach((fieldName) => {
          temp[fieldName] = data[fieldName]
        })
        arrayWrap.push(temp)
      })
      wrap = arrayWrap
    }
    else if (keyName.length > 1){
      wrap = {}
      keyName.forEach((item, index) => {
        wrap[keyName[index]] = {}
        properties[keyName[index]].replace(/ /gi, '').split(',').forEach((fieldName) => {
          wrap[keyName[index]][fieldName] = object[fieldName]
        })
      })
    }
    else {
      wrap = {}
      properties[keyName[0]].replace(/ /gi, '').split(',').forEach((fieldName) => {
        wrap[fieldName] = object[fieldName]
      })
    }

    return wrap
  }
  catch (err) {
    throw new Error(err)
    // console.log(err)
  }
}
