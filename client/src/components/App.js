import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import UploadProductPage from "./views/UploadProductPage/UploadProductPage.js";
import DetailProductPage from "./views/DetailProductPage/DetailProductPage";
import CartPage from './views/CartPage/CartPage';
import HistoryPage from './views/HistoryPage/HistoryPage';
import NoticePage from './views/Notice/NoticePage';
import DetailNoticePage from './views/DetailNoticePage/DetailNoticePage';
import OrderPage from './views/OrderPage/OrderPage';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          {/** option의 종류 : null, true, false
           *  null: 아무나 출입 가능한 페이지
           *  true: 로그인한 유저만 출입 가능 페이지
           *  false: 로그인한 유저는 출입 불가능한 페이지
           */}
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
          <Route exact path="/product/:productIdx" component={Auth(DetailProductPage, null)} />
          <Route exact path="/cart" component={Auth(CartPage, true)} />
          <Route exact path="/history" component={Auth(HistoryPage, true)} />
          <Route exact path="/notice" component={Auth(NoticePage, null)} />
          <Route exact path="/notice/:noticeIdx" component={Auth(DetailNoticePage, null)} />
          <Route exact path="/order" component={Auth(OrderPage, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
