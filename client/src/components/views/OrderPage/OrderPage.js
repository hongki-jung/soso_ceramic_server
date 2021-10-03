import React, {useEffect, useState} from 'react'
import {List, Typoraphy, Divider} from 'antd'

import axios from 'axios'
import OrdererInfo from './Sections/OrdererInfo'
import { USER_SERVER } from '../../Config'
import OrderProductInfo from './Sections/OrderProductInfo'

function OrderPage(props){


  return(
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h1>
        주문/결제
      </h1>
      <br />
      
      <div>
        <OrdererInfo />
      </div>
        <OrderProductInfo />

    </div>



  )




}

export default OrderPage