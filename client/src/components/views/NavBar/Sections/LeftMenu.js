import React from 'react';
import { Menu } from 'antd';
import {Link} from 'react-router-dom'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="notice">
      <Link to="/notice">공지사항</Link>
    </Menu.Item>
    {/* <Menu.Item key="QnA">
      <a href="/">Q & A</a>
    </Menu.Item> */}
    {/* <SubMenu title={<span>공지사항</span>}>
      <MenuItemGroup title="Item 1">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="Item 2">
        <Menu.Item key="setting:3">Option 3</Menu.Item>
        <Menu.Item key="setting:4">Option 4</Menu.Item>
      </MenuItemGroup>
    </SubMenu> */}
  </Menu>
  )
}

export default LeftMenu