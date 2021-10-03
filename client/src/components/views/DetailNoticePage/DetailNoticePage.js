import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { List, Typography, Divider } from 'antd';
import { Row, Col } from 'antd';
import { USER_SERVER } from '../../Config';

function DetailNoticePage(props){
  // console.log("DetailNoticePage")
  const noticeIdx = props.match.params.noticeIdx
  const [notice, setNotice] = useState({})
  useEffect(()=>{
    axios.get(`${USER_SERVER}/api/notice?notice_idx=${noticeIdx}`)
      .then(response =>{
        // console.log("response.data",response.data.result[0])
        setNotice(response.data.result[0])
      }) 
  },[])

  return(
    <div style={{ width: "80%", margin: "3rem auto" }}>
        <div style={{ textAlign: "left" }}>
          <h2>{notice.title}</h2>
          <div>{notice.first_create_dt}</div>
        </div>
       
       
        <Divider />
        <Typography.Text>
          {notice.content}
        </Typography.Text>
          {/* <Divider orientation="left">공지사항</Divider> */}
        
    </div>
  )

}

export default DetailNoticePage