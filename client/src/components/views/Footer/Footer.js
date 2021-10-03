import React from 'react'
import {Icon } from 'antd';

function Footer() {
    return (
        <div style={{borderTop:'3px solid #d3d3d3' , marginTop:'20px'}}>
          <div style={{
              
              height: '80px', display: 'flex',
              flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', fontSize:'1rem'
             
          }}>
            {/* <p> 소소 도자기 공방 <Icon type="smile" /></p> */}
            <div>주소: 인천광역시 부평구 길주남로 155 성진프라자 4층 403-5호 / 대표번호 : 010-5522-0789 </div>
            <div>Copyright (c) 2021 소소도자기공방 All rights reserved. </div>
            
            

          </div>
        </div>
    )
}

export default Footer
