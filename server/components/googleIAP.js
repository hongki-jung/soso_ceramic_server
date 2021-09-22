// const google = require('googleapis');
// const OAuth2 = google.auth.OAuth2;
// const config = require('../config')
// const request = require('request')
//
// const scopes = ['https://www.googleapis.com/auth/androidpublisher']
//
// const clientId = config.google.test.clientId
// const clientSecret = config.google.test.clientSecret
// const redirectUri = config.google.test.redirectUri
//
// let tokenStorage = {
//   access_token: null,
//   token_type: null,
//   expires_in: null,
//   refresh_token: null
// };
//
// module.exports.getAuthUrl = async () => {
//   try {
//     let oauth2Client = new OAuth2(clientId, clientSecret, redirectUri)
//     let url = oauth2Client.generateAuthUrl({
//       access_type: 'offline',
//       scope: scopes,
//       approval_prompt: 'force'
//     });
//     console.log(url);
//     return url
//   }
//   catch(err) {
//     throw new Error(err)
//   }
// }
//
// let repeat_refresh = null; //setInterval 설정이 저장될 변수
// const min30 = 30*60*1000; //30분
//
// module.exports.setTokenStorage = async (code) => {
//   //토큰을 요청하여 redirect되면 authorization code를 포함한다.
//   //code 유무를 확인.
//   if( (code === null || code === undefined)) {
//     return tokenStorage
//   }
//
//   //authorization code를 포함하면 access token과 교환할 수 있도록 한다.
//   let url = 'https://www.googleapis.com/oauth2/v4/token';
//   let payload = {
//     grant_type: 'authorization_code',//OAuth 2.0 스펙에 포함된 필드로 반드시 'authorization_code'로 입력한다.
//     code, //토큰 요청을 통해서 얻은 코드
//     client_id: clientId,
//     client_secret: clientSecret,
//     redirect_uri: redirectUri
//   };
//
//   request.post(url, { form: payload }, function (error, response, body) {
//
//     let parseBody = JSON.parse(body)
//     tokenStorage.access_token = parseBody.access_token
//     tokenStorage.token_type = parseBody.token_type
//     tokenStorage.expires_in = parseBody.expires_in
//     tokenStorage.refresh_token = parseBody.refresh_token
//
//     console.log('setTokenStorage')
//     console.log(parseBody)
//
//     //refresh_token으로 1시간이 되기 전에 access token으로 교환되도록 한다.
//     if(repeat_refresh === null) {
//       repeat_refresh = setInterval(RefreshIABTokenInterval, min30)
//     }
//
//     return tokenStorage
//   });
// }
//
// function RefreshIABTokenInterval() {
//   let url = 'https://www.googleapis.com/oauth2/v4/token';
//   let payload = {
//     refresh_token: tokenStorage.refresh_token,
//     grant_type: 'refresh_token',
//     client_id: clientId,
//     client_secret: clientSecret
//   };
//
//   request.post(url, { form: payload }, function (error, response, body) {
//     if(error) {
//       repeat_refresh = null;
//       clearInterval(repeat_refresh);
//       return;
//     }
//
//     let parseBody = JSON.parse(body);
//     tokenStorage.access_token = parseBody.access_token;
//     tokenStorage.token_type = parseBody.token_type;
//     tokenStorage.expires_in = parseBody.expires_in;
//   });
// }
