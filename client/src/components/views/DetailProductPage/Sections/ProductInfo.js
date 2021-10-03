import React ,{ useState } from 'react'
import { Button, Descriptions, Typography, Divider , Modal} from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/cart_actions';
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'
function ProductInfo(props) {
    const dispatch = useDispatch();
    const { Title, Text } = Typography;
    const [number, setNumber] = useState(1)
    const user = useSelector(state => state.user)

    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)


    // console.log("props ? in ProductInfo ",props)



    const clickHandler = () => {
        // console.log("user.userData ?",user.userData)
        if(!user.userData.userIdx){ return alert("로그인 후 이용가능합니다.") }
        
        showModal()
        dispatch(addToCart(props.detail.product_idx, user.userData.userIdx ,number))
   
    }

    const onIncrease = ()=> {
      setNumber(prevNumber => prevNumber + 1);
    }
    const onDecrease = ()=>{
      setNumber(prevNumber => prevNumber - 1);
    }

    const showModal = () => {
      setVisible(true)
    };

    const handleOk = () => {
      setLoading(true)

      setTimeout(() => {
        setLoading(false)
        setVisible(false)
      }, 3000);
    };


  const handleCancel = () => {
    setVisible(false)
  };

    return (
        <div>
            <Title strong level={2}>{props.detail.product_name}</Title>
            <Text strong style={{fontSize:'30px', color:'gray'}}>{props.detail.price}원</Text>
            <Divider />

            <Text style={{fontSize:'20px'}}>{"무료배송 ㅣ 2일 이내 출고 ㅣ 택배배송(친환경 포장)"}</Text>
            <Divider />
            <Text style={{fontSize:'20px'}}>{"100% 수작업 제작"}</Text>
            <Divider />

            <div style={{display:'flex', direction:'row'}}>
                <Text  style={{fontSize:'20px'}}>수량 :</Text>
                <h3 style={{marginLeft:'4px', marginRight:'4px',fontSize:'20px'}}>{number} </h3>
                <Button onClick={onIncrease}>+</Button>
                <Button disabled={number <= 1 ? true: false} onClick={onDecrease}>-</Button>
              
            </div>
            <Divider />

            <Text style={{width:"100%", fontSize:'18px'}}>
              {props.detail.product_description}
            </Text>


            <br />
            <br />
            <br />
            <br />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button style={{width:'48%'}} size="large"  type="primary" onClick={clickHandler}>
                    장바구니
                </Button>

                <Button style={{marginLeft:'5px', width:'48%'}} size="large"  type="danger" onClick={clickHandler}>
                    구매하기
                </Button>
            </div>
            <Modal
                visible={visible}
                title="장바구니 담기"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[

      
                ]}
              >
                <p>선택하신 상품을 장바구니에 담았습니다.</p>
                <Button type="danger" key="back" onClick={handleCancel}>
                    계속쇼핑
                </Button>
                <Button loading={loading} >
                  <Link to="/cart">
                    장바구니
                  </Link>
                </Button>
            </Modal>

        </div>

        
    )
}

export default ProductInfo
