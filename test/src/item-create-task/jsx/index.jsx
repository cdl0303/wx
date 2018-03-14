import youyiche from 'youyiche'
import youyicheWX from 'youyicheWX'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router,Route,IndexRoute,hashHistory} from 'react-router'
import RouteIndex from './components/routeIndex'
import RouteInputNumber from './components/routeInputNumber'
import RouteInputTaskDetail from './components/routeInputTaskDetail'
import RouteSuccess from './components/routeSuccess'


require('../sass/index.scss')


function appInit(){
    // 定义页面上的路由
  	var routes = (  
	    <Router history={ hashHistory }>
	      <Route path="/" component={ RouteIndex } />
	      <Route path="inputNumber/:type" component={ RouteInputNumber } />  
	      <Route path="inputTaskDetail/:type" component={ RouteInputTaskDetail } />
	      <Route path="success/:type" component={ RouteSuccess } />
	    </Router>
	);
  	ReactDOM.render(routes,document.getElementById('wrap'));
}

//微信认证
youyiche.scriptConfig(()=>{
	youyicheWX.wxAuth({
		type:"snsapi_userinfo",
		itemName:"itemCreateTask",
		success:appInit
	});
})
