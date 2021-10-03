/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Icon, Badge, MenuItemGroup } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter , Link } from 'react-router-dom';
import { useSelector } from "react-redux";


function RightMenu(props) {
  const SubMenu = Menu.SubMenu;
  const MenuItemGroup = Menu.ItemGroup;
  const user = useSelector(state => state.user)
  
  const logoutHandler = () => {
    localStorage.removeItem("token");
    axios.get(`${USER_SERVER}/api/user/logout`,{withCredentials: true}).then(response => {
      // console.log("response ?? in logout",response)
      if (response.data.logoutSuccess) {


        props.history.go("/");
      } else {
        alert('Log Out Failed')
      }
    });
  };
  
  if (user.userData && !user.userData.userIdx) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <Link to="/login">로그인</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">회원가입</Link>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        {/* <Menu.Item key="history">
          <a href="/history">
            <Icon type="user" style={{ fontSize: 30, marginBottom: 3 }} />
          </a>    

        </Menu.Item> */}

        <SubMenu title={<span>마이페이지</span>}>
          <Menu.Item key="setting:1">
            <Link to="/history">
              구매내역
            </Link>  
          </Menu.Item>
          <Menu.Item key="setting:2">내정보</Menu.Item>
        </SubMenu>

        {/* <Menu.Item key="upload">
          <a href="/product/upload">Upload</a>
        </Menu.Item> */}

        <Menu.Item key="cart" style={{ paddingBottom: 3 }}>
        {/* <Badge count={user.userData && user.userData.cart.length}> */}
          {/* <Badge count={user.userData && user.userData.cart.length}> */}
            <Link to="/cart" className="head-example" style={{ marginRight: -22, color: '#667777' }} >
              <Icon type="shopping-cart" style={{ fontSize: 30, marginBottom: 3 }} />
            </Link>
          {/* </Badge> */}
        </Menu.Item>

        <Menu.Item key="logout">
          <a onClick={logoutHandler}>로그아웃</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

