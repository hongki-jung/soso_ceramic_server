'use strict'

const fcm = require('./firebase/index')

module.exports.sendToTopic = async (options) => {
  try {
    console.log('sendToTopic')
    // console.log(options)
    fcm.messaging().send(options).then()
  }
  catch (err) {
    throw new Error(err)
    // console.log(err)
  }
}

module.exports.sendToCall = async (options) => {
  try {
    // const message = {
    //   notification: {
    //     title: options.title,
    //     body: options.msg
    //   },
    //   data: {userInfo: JSON.stringify(options.data)},
    //   topic: options.topic.toString()
    // }
    // console.log('sendToCall')
    // console.log(options)
    await fcm.messaging().send(options)
  }
  catch (err) {
    throw new Error(err)
    // console.log(err)
  }
}



module.exports.convertMessage = (title, body, data, sendUserInfo, isPush = false) => {
  return {
    notification: {
      title,
      body,
    },
    data: {
      message: isPush ? JSON.stringify(data) : data,
      type: 'text',
      sendUserInfo: isPush ? JSON.stringify(sendUserInfo) : sendUserInfo
    },
  }
}

module.exports.convertCall = (title, body, topic, sendUserInfo, callData) => {
  return {
    notification: {
      title,
      body,
    },
    data: {
      type: 'call',
      sendUserInfo: JSON.stringify(sendUserInfo),
      call: JSON.stringify(callData),
    },
    topic: topic.toString()
  }
}

module.exports.testSendToTopic = async (options) => {
  try {
    // console.log('testSendToTopic')
    // console.log(options)
    fcm.messaging().send({
      notification: {
        body: options.msg
      },
      topic: options.topic.toString()
    }).then()
  }
  catch (err) {
    // console.log("push error : ", err)
    throw new Error(err)
  }
}
