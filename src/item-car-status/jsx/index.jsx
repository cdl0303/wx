import youyiche from 'youyiche'
import youyicheWX from 'youyicheWX'
import React from 'react'
import { Router,Route,IndexRoute,hashHistory} from 'react-router'
import App from './components/routeApp.jsx'
import CarStatus from './components/routeCarStatus.jsx'
import Login from './components/routeLogin.jsx'

require('../sass/index.scss')

function init(){
    // 定义页面上的路由
  	var routes = (  
	    <Router history={ hashHistory }>
	    	<Route path="/" component={ App }/>
	    	<Route path="login" component={ Login } />
	    	<Route path="carStatus" component={ CarStatus } />
	    </Router>
	);
  ReactDOM.render(routes,document.getElementById('carStatus'));
}

//微信认证
youyiche.scriptConfig(function(){
	youyicheWX.wxAuth({
		type:"snsapi_userinfo",
		itemName:"itemCarStatus",
		success:init
	});
})
