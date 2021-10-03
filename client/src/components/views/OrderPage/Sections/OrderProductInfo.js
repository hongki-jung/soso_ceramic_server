import React from 'react'
import {Button} from 'antd'

function OrderProductInfo(props) {

    // const renderCartImage = (images) => {
    //     if (images) {
            
    //         return `http://localhost:5000/${image}`
    //     }
    // }




    const renderItems = () => (
     
        props.products && props.products.map((product, index) => (
            <tr key={index}>
                <td>
                    <img style={{ width: '70px', height:'70px' }} 
                      alt="product"
                      src={product.main_image_path} 
                      />
                      <div style={{display:'inline', marginLeft:10}}>{product.product_name} </div>
                      {/* <div>{product.product_description}</div> */}
                </td>
                <td >
                    {product.quantity} 개
                </td>
                <td >
                   {product.price} 원 
                </td>
                <td >
                    <Button size="large"  type="primary"  onClick={() => props.removeItem(product._id)}>
                        삭제 
                    </Button>
                    
                </td>
            </tr>
        ))
    )


    return (
        <div>
            <table>
                <thead >
                    <tr>
                        <th>상품정보</th>
                        <th>수량</th>
                        <th>상품가격</th>
                    </tr>
                </thead>

                <tbody style={{backgroundColor:'white'}}>
                    {/* {renderItems()} */}
                
                </tbody>
            </table>
        </div>
    )
}

export default OrderProductInfo
