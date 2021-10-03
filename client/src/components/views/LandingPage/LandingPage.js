import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from "axios";
import {Route, Link} from 'react-router-dom'
import { Icon, Col, Card, Row, Carousel, Image } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import Checkbox from './Sections/CheckBox';
import Radiobox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';
import { continents, price } from './Sections/Datas';
import d from './soso7.png'
import { USER_SERVER } from '../../Config';
function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })
    const [SearchTerm, setSearchTerm] = useState("")

    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }

        getProducts(body)
        
 
    }, [])

    const getProducts = (body) => {
        axios.get(`${USER_SERVER}/api/product`)
            .then(response => {

                if (response.data) {
                    if (body.loadMore) {
                        setProducts([...Products, ...response.data])
                    } else {
                        setProducts(response.data)
                    }
                    setPostSize(response.data.length)
                } else {
                    alert(" 상품들을 가져오는데 실패 했습니다.")
                }
            })
    }




    const loadMoreHanlder = () => {

        let skip = Skip + Limit
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters
        }

        getProducts(body)
        setSkip(skip)
    }


    const renderCards = Products.map((product, index) => {
        // console.log("product",product)
        return <Col lg={8} md={12} xs={24} key={index}> 
            <Card
                cover={<Link to={`/product/${product.product_idx}`} ><img src={product.main_image_path} style={{width: '100%', height: '250px'}}/></Link>}
            >
                <Meta
                    title={product.product_name}
                    description={`${product.product_description}`}
                    style={{textOverflow:"ellipsis", whiteSpace:'nowrap'}}
                />
            <div className="additional">
              <p className="price" style={{marginTop:'10px' ,fontSize:16, fontWeight:"bold"}}>{`${product.price}원`} </p>
            </div>
            </Card>
        </Col>
    })

    const showFilteredResults = (filters) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }

        getProducts(body)
        setSkip(0)

    }


    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        return array;
    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }
            
        newFilters[category] = filters

        // console.log('filters', filters)

        if (category === "price") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }
        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerm = (newSearchTerm) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)

    }



    return (
      <>
        <img src={d} style={{flex: 'center', width:'100%' , height: 340}} />
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                {/* <h1>소소 도자기  공방 <Icon type="rocket" /> </h1> */}
                
                {/* <Card src="http://news.samsungdisplay.com/wp-content/uploads/2018/08/2.png" style={{width="100"}}> </Card> */}
            </div>

            {/* Filter */}

            <Row gutter={[16, 16]}>
                {/* <Col lg={12} xs={24}> */}
                    {/* CheckBox */}
                    {/* <Checkbox list={continents} handleFilters={filters => handleFilters(filters, "continents")} /> */}
                {/* </Col> */}
                {/* <Col lg={12} xs={24}> */}
                    {/* RadioBox */}
                    {/* <Radiobox list={price} handleFilters={filters => handleFilters(filters, "price")} /> */}
                {/* </Col> */}
            </Row>





            {/* Search */}

            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                <SearchFeature
                    refreshFunction={updateSearchTerm}
                />
            </div>

            {/* Cards */}


            <Row gutter={[16, 16]} >
                {renderCards}
            </Row>

            <br />

            {/* {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={loadMoreHanlder}>더보기</button>
                </div>
            } */}

        </div>
      </>
    )
}

export default LandingPage
