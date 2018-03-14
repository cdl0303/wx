import youyiche from 'youyiche'
import youyicheWX from 'youyicheWX'
import React from 'react'
import { Router,Route,IndexRoute,hashHistory} from 'react-router'
import NoticeList from './components/noticeList.jsx'
import NoticeDetail from './components/noticeDetail.jsx'

require('../sass/index.scss')

function init(){
	// 定义页面上的路由
	var routes = (  
		<Router history={ hashHistory }>
	  	  <Route path="/" component={ NoticeList } />
	  	  <Route path="/detail/:id" component={ NoticeDetail } />
		</Router>
	);
	ReactDOM.render(routes,document.getElementById('notice'));
}

//微信认证
youyiche.scriptConfig(function(){
	youyicheWX.wxAuth({
		type:"snsapi_base",
		itemName:"itemNotice",
		success:init
	});
})