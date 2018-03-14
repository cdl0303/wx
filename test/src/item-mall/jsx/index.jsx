import youyiche from 'youyiche'
import youyicheWX from 'youyicheWX'
import React from 'react'
import { Router,Route,IndexRoute,hashHistory} from 'react-router'
import App from './components/routeApp.jsx'
import MallHome from './components/routeMallHome.jsx'
import ProductAll from './components/routeProductAll.jsx'
import CenterDefault from './components/routeCenterDefault.jsx'
import Address from './components/routeAddress.jsx'
import AddAddress from './components/routeAddAddress.jsx'
import AddressList from './components/routeAddressList.jsx'
import EditAddress from './components/routeEditAddress.jsx'
import AddressPop from './components/routeAddressPop.jsx'
import OrderList from './components/routeOrderList.jsx'
require('../sass/index.scss')


function init(){
    // 定义页面上的路由
  	var routes = (  
	    <Router history={ hashHistory }>
	      <Route path="/" component={ App }>
	        <IndexRoute component={ MallHome }/>
	        <Route path="productAll" component={ ProductAll } />  
	        <Route path="center" component={ CenterDefault }/>
	      </Route>
	      <Route path="order" component={ OrderList }></Route>
	      <Route path="address" component={ Address }>
	      	<IndexRoute component={ AddressList }/>
	      	<Route path="add" component={ AddAddress } /> 
	      	<Route path="list" component={ AddressList } />  
	      	<Route path="addressPop" component={ AddressPop } />  
	      	<Route path="edit/:id" component={ EditAddress } />  
	      </Route>
	    </Router>
	);
  ReactDOM.render(routes,document.getElementById('mall'));
}

youyiche.scriptConfig(function(){
	youyicheWX.wxAuth({
		type:"snsapi_userinfo",
		//itemAppIdName:"appidGroundStaff",
		isWxConfig:false,
		success:init
	});
})