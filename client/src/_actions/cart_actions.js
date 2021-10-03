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


export async function removeCartItem(cartIdx, cartInfo) {

  const request = await axios.delete(`${USER_SERVER}/api/cart/${cartIdx}`)
      .then(response => {
        
        const newCartInfo = cartInfo.filter(item => item.cart_idx !== cartIdx)
        return response.data = [...newCartInfo]
      });
  
  return {
      type: REMOVE_CART_ITEM,
      payload: request
  }
}



export function getCartList(user) {

const request = axios.get(`${USER_SERVER}/api/cart?user_idx=${user.userIdx}`)
            .then(response => {
                return response.data;
            });

return {
    type: GET_CART_LIST,
    payload: request
  }
}


//props.detail.product_idx, user.userData.userIdx ,number
export function addToCart(productIdx, userIdx, quantity) {
  let body = {
      product_idx: productIdx,
      user_idx: userIdx,
      quantity: quantity
  }

  const request = axios.post(`${USER_SERVER}/api/cart`, body)
      .then(response => {
        return response.data
      });

  return {
      type: ADD_TO_CART,
      payload: request
  }
}