import {

  GET_CART_LIST, REMOVE_CART_ITEM, ADD_TO_CART
} from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {

      case GET_CART_LIST:

        return {
          ...state,
          cartDetail: action.payload
        }


      case REMOVE_CART_ITEM:
        return{
          ...state,
          cartDetail: [
            ...action.payload
          ]
        }

      case ADD_TO_CART:
        return {
          ...state
        }

      default:
        return state;

    }


}


// case REMOVE_CART_ITEM:
//   return {
//       ...state, 
//       cartDetail: action.payload.productInfo,
//       userData: {
//           ...state.userData,
//           cart: action.payload.cart
//       }
//   }