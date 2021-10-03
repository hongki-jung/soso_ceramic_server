import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button, Icon } from 'antd';
import './Sections/Navbar.css';
import logo from './logo.png'
import { Link } from 'react-router-dom'

function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">

        <Link to="/"><img src={logo} style={{flex: 'center', width:'100%'}}></img></Link>
        
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          // title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar


// <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%', top: 0 }}>
// <div className="menu__logo">
//     <a href="/" style={{color:'#ffcc1b', fontSize: 17, fontWeight:'bold'}}>
//       <img src={logo} style={{flex: 'center', width:'100%'}}></img>
//     </a>
// </div>
// <div className="menu__container">
//   <div className="menu_left">
//     <LeftMenu mode="horizontal" />
//   </div>
//   <div className="menu_rigth">
//     <RightMenu mode="horizontal" />
//   </div>
//   <Button
//     className="menu__mobile-button"
//     type="primary"
//     onClick={showDrawer}
//   >
//     <Icon type="align-right" />
//   </Button>
//   <Drawer
//     title="Basic Drawer"
//     placement="right"
//     className="menu_drawer"
//     closable={false}
//     onClose={onClose}
//     visible={visible}
//   >
//     <LeftMenu mode="inline" />
//     <RightMenu mode="inline" />
//   </Drawer>
// </div>
// </nav>