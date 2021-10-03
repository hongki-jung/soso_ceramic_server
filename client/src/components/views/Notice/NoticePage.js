import React, {useEffect, useState} from 'react'
import { List, Typography, Divider } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../Config';
import {Link} from 'react-router-dom'
function NoticePage(props) {
  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

  const [noticeList, setNoticeList] = useState([])

  useEffect(()=>{
    axios.get(`${USER_SERVER}/api/notice`)
      .then(response =>{
        // console.log("response.data",response.data)
        setNoticeList(response.data.result)
      }) 
  },[])


  return (
    <div style={{ width: "80%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h1>공지사항</h1>
      </div>
      <br />
      <>
        {/* <Divider orientation="left">공지사항</Divider> */}
        <List
          // header={<div>Header</div>}
          // footer={<div>Footer</div>}
          bordered
          dataSource={noticeList}
          renderItem={(item, index) => (
            <List.Item> 
              <Link to={`/notice/${item.notice_idx}`} style={{color:'#000'}}><Typography.Text>{"[공지] "}</Typography.Text>{item.title}</Link>
              <Typography.Text>{ item.first_create_dt }</Typography.Text>
            </List.Item>
          )}
        />
      </>
    </div>
  );
}

export default NoticePage
