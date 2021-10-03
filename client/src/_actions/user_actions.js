import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    ON_SUCCESS_BUY,
    GET_CART_LIST
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit) {
  // console.log("dataToSubmit in registerUser",dataToSubmit)
    const request = axios.post(`${USER_SERVER}/api/user/signup`, dataToSubmit)
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export async function loginUser(dataToSubmit) {
    const request = await axios.post(`${USER_SERVER}/api/user/signin`, dataToSubmit,{withCredentials: true})
        .then(response =>
          response.data.result,
          
        );

    localStorage.setItem("token", JSON.stringify(request.access_token))
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export  function auth() {
    const token = JSON.parse(localStorage.getItem('token'));
    // console.log("token ??? auth()",token)
      
    const request = axios.get(`${USER_SERVER}/api/user/tokenCheck?token=${token}`,{withCredentials: true})
        .then(response => response.data)
        .catch(error => {
          return error
        })
    
    
    return {
        type: AUTH_USER,
        payload: request
    }

}

export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`)
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}




// export function getCartItems(cartItems, userCart) {

//     const request = axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`)
//         .then(response => {
//             // CartItem들에 해당하는 정보들을  
//             // Product Collection에서 가져온후에 
//             // Quantity 정보를 넣어 준다.
//             userCart.forEach(cartItem => {
//                 response.data.forEach((productDetail, index) => {
//                     if (cartItem.id === productDetail._id) {
//                         response.data[index].quantity = cartItem.quantity
//                     }
//                 })
//             })
//             return response.data;
//         });

//     return {
//         type: GET_CART_ITEMS,
//         payload: request
//     }
// }









export function onSuccessBuy(data) {

    const request = axios.post(`/api/users/successBuy`, data)
        .then(response => response.data);

    return {
        type: ON_SUCCESS_BUY,
        payload: request
    }
}












