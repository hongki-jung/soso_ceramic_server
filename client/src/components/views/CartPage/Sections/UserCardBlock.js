import { Button } from 'antd'
import React from 'react'
import "./UserCardBlock.css"
function UserCardBlock(props) {

    // const renderCartImage = (images) => {
    //     if (images) {
            
    //         return `http://localhost:5000/${image}`
    //     }
    // }

    // console.log("props ? inUserCardBlock ",props.products)


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
                    <Button onClick={() => props.removeItem(product.cart_idx)}>
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
                        <th>삭제</th>
                    </tr>
                </thead>

                <tbody style={{backgroundColor:'white'}}>
                    {renderItems()}
                
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock
