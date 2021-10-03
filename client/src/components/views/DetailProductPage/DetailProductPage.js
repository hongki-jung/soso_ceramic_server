import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import ProductDetailImages from './Sections/ProductDetailImages';
import { Row, Col } from 'antd';
import { USER_SERVER } from '../../Config';

function DetailProductPage(props) {
    // console.log("DetailProductPage props",props)
    const productIdx = props.match.params.productIdx

    const [Product, setProduct] = useState({})

    useEffect(() => {

        axios.get(`${USER_SERVER}/api/product/product-detail/${productIdx}`)
            .then(response => {
                // console.log("response.data ",response.data)
                setProduct(response.data)
            })
            .catch(err => alert(err))
    }, [])



    return (
        <div style={{ width: '100%', padding: '3rem 4rem' }}>

            {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Product.product_name}</h1>
            </div> */}

            <br />

            <Row gutter={[16, 16]} >
                <Col lg={12} sm={24}>
                    {/* ProductImage */}
                    <ProductImage detail={Product} />
                </Col>
                <Col lg={12} sm={24}>
                    {/* ProductInfo */}
                    <ProductInfo detail={Product} />
                </Col>
            </Row>
            <Row gutter={[16, 16]} >
              <Col lg={24} sm={24}>
              {
                Product.productDetailImg && Product.productDetailImg.length > 0 ?  
                  <ProductDetailImages detail={Product} /> 
                  : 
                  null
              }
              </Col>
            </Row>




        </div>
    )
}

export default DetailProductPage
