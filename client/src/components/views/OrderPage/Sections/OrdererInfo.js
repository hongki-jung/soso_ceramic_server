import React, {useState, useEffect} from 'react'
import {Input, Divider ,Typography, Form, Alert, Modal, Button} from 'antd'

import "./OrdererInfo.css"

function OrdererInfo(props){
  const { Text } =Typography
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('죄송합니다. 결제 기능은 현재 준비중에 있습니다. ');

  useEffect(()=>{
    showModal()
  },[])

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    // setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    // console.log('Clicked cancel button');
    setVisible(false);
  };
  return (
    <Form className="ordererInfo">
      <Divider orientation="left">주문자 정보</Divider>

      <div style={{ width: "80%" }}>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "70%",
          }}
        >
          <label>이름</label>
          <Input style={{ width: "70%", marginLeft: "20px" }} />
        </div>
        <br />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "70%",
          }}
        >
          <label>연락처</label>
          <Input style={{ width: "70%", marginLeft: "20px" }} />
        </div>
        <br />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "70%",
          }}
        >
          <label>이메일</label>
          <Input tyle="email" style={{ width: "70%", marginLeft: "20px" }} />
        </div>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "70%",
          }}
        >
          <label>주소</label>
          <Input style={{ width: "70%", marginLeft: "20px" }} />
        </div>
        <br />
        <br />
        <Divider orientation="left" plain>
          주문상품 정보
        </Divider>
      </div>
      {visible ?
      <>
  
        <Modal
          title="알림"
          visible={visible}
          onOk={handleOk}
          okText="확인"
          cancelText="취소"
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{modalText}</p>
        </Modal>
      </>
      :
      null
      }
    </Form>
  );
}

export default OrdererInfo