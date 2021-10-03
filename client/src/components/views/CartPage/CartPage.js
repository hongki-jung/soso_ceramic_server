import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getCartItems, onSuccessBuy } from '../../../_actions/user_actions';
import {Link} from 'react-router-dom'
import { removeCartItem, getCartList } from '../../../_actions/cart_actions';
import UserCardBlock from './Sections/UserCardBlock';
import { Empty, Result, Icon, Button } from 'antd';
import Paypal from '../../utils/Paypal';
import { useSelector } from 'react-redux';
function CartPage(props) {
    const dispatch = useDispatch();

    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)
    const [cartData, setCartData] = useState([])
    const userInfo = useSelector(state => state.user.userDetail)
    const cartInfo = useSelector(state => state.cart.cartDetail)

    // console.log("cartInfo ",cartInfo)

    useEffect(() => {
        if (props.user.userData){
          dispatch(getCartList(props.user.userData))
            .then((response)=> calculateTotal(response.payload))
        }
    }, [props.user.userData])


    useEffect(()=>{

      if (cartInfo && cartInfo.length > 0){
        calculateTotal(cartInfo)
      }
    },[cartInfo])

    let calculateTotal = (cartDetail) => {
        let total = 0;
        // console.log(" cartDetail ???",cartDetail)
        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity
        })

        setTotal(total)
        setShowTotal(true)

    }


    let removeFromCart = (cartIdx) => {
 
        dispatch(removeCartItem(cartIdx, cartInfo))
            .then(response => {
                if (response.payload.length <= 0) {
                    setShowTotal(false)
                }

            })

    }

    const transactionSuccess = (data) => {
        dispatch(onSuccessBuy({
            paymentData: data,
            cartDetail: props.user.cartDetail
        }))
            .then(response => {
                if (response.payload.success) {
                    setShowTotal(false)
                    setShowSuccess(true)
                }
            })
    }



    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            
            <h1>
              <Icon type="shopping-cart" style={{ fontSize: 30, marginBottom: 3 , marginRight:5}}/>
               장바구니
            </h1>

            <div>
                { cartInfo && cartInfo.length >0 ?
                <UserCardBlock products={cartInfo} removeItem={removeFromCart} />
                :
                null
              }
            </div>


            
            {ShowTotal ?
                <div style={{border: '8px solid rgba(0, 0, 0, 0.05)',marginTop:15,marginBottom:15 , paddingTop:20,paddingBottom:15,
                    display:'flex',justifyContent:'center', alignItems:'center', flexDirection:'center'}}>
                    <div>
                      <h2 > 결제 예정 금액: {Total} 원</h2> 
                    </div>
                </div>
                : ShowSuccess ?
                    <Result
                        status="success"
                        title="Successfully Purchased Items"
                    />
                    :
                    <>
                        <br />
                        <Empty description={false} />
                    </>
            } 
                <div style={{display:'flex',justifyContent:'center', alignItems:'center'}}>
                  <Button style={{ width: '35%', height:'45px', alignItems:'center', marginRight:'5px' }} >
                    <Link to="/"> 쇼핑 계속하기 </Link>
                  </Button>
                  <Button type="danger" style={{ width: '35%', height:'45px', alignItems:'center' }} >
                    <Link to="/order">주문하기</Link>
                  </Button>
                </div>

            
            {/* {ShowTotal &&
                <Paypal
                    total={Total}
                    onSuccess={transactionSuccess}
                />
            } */}

        </div>
    )
}

export default CartPage
