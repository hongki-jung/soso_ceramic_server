'use strict'

const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey')

let account, databaseURL


account = serviceAccount.development
databaseURL = "https://juchating-f276a.firebaseio.com"



admin.initializeApp({
  credential: admin.credential.cert(account),
  databaseURL: databaseURL
})


// console.log("admin : ", admin)
module.exports = admin
