import youyiche from 'youyiche'
import youyicheWX from 'youyicheWX'
import React from 'react'
import { Router,Route,IndexRoute,hashHistory} from 'react-router'
import App from './components/routeApp.jsx'
import AddAgent from './components/routeAddAgent.jsx'
import NameAgentList from './components/routeNameAgentList.jsx'
import Center from './components/routeCenter.jsx'
import AgentDetail from './components/routeAgentDetail.jsx'
import AddAgentTrack from './components/routeAddAgentTrack.jsx'
import CenterAgent from './components/routeCenterAgent.jsx'
import CenterWebsite from './components/routeCenterWebsite.jsx'
import NoActiveAgentList from './components/routeNoActiveAgentList.jsx'
import ActivitiesAgentList from './components/routeActivitiesAgentList.jsx'
import WebsiteAgentList from './components/routeWebsiteAgentList.jsx'
import BranchEdit from './components/routeBranchEdit.jsx'

require('../sass/index.scss')


function appInit(){
    // 定义页面上的路由
  	var routes = (  
	    <Router history={ hashHistory }>
	      <Route path="/" component={ App }>
	        <IndexRoute component={ AddAgent }/>
	        <Route path="nameAgentList" component={ NameAgentList } />  
	        <Route path="center" component={ Center } />
	      </Route>
	      <Route path="agentDetail/:id" component={ AgentDetail } />
	      <Route path="addAgentTrack/:id" component={ AddAgentTrack } />
	      <Route path="centerAgent/:date/:type" component={ CenterAgent } />
	      <Route path="centerWebsite/:type" component={ CenterWebsite } />
	      <Route path="noActiveAgentList" component={ NoActiveAgentList } />
	      <Route path="activitiesAgentList" component={ ActivitiesAgentList } />
	      <Route path="websiteAgentList/:id/:name" component={ WebsiteAgentList } />
	      <Route path="BranchEdit/:id" component={ BranchEdit } />
	    </Router>
	);
  ReactDOM.render(routes,document.getElementById('groundStaff'));
}

//微信认证
youyiche.scriptConfig(()=>{
	youyicheWX.wxAuth({
		type:"snsapi_userinfo",
		itemName:"itemGroundStaff",
		success:appInit
	});
})
