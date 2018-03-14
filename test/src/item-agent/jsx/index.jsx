
//import { NICE, SUPER_NICE } from './colors';
import youyiche from '../../base-common/js/youyiche.js'
import youyicheWX from '../../base-common/js/youyicheWX.js'
import React from 'react'
import { Router,Route,IndexRoute,Link,IndexLink,hashHistory,StateMixin} from 'react-router'
import App from './components/routeApp.jsx'
import CarTrack from './components/routeCarTrack.jsx'
import Running from './components/routeRunning.jsx'
import Center from './components/routeCenter.jsx'
import Account from './components/routeAccount.jsx'
import Plan from './components/routePlan.jsx'
import Incentive from './components/routeIncentive.jsx'

import Marketing from './components/routeMarketing.jsx'
import Join from './components/routeJoin.jsx'
import TiroGuide from './components/routeTiroGuide.jsx'
import AgentRegister from './components/routeRegister.jsx'
import Income from './components/routeIncome.jsx'
import IncomeDetail from './components/routeIncomeDetail.jsx'
import NewSource from './components/routeNewSource.jsx'
import FailureSource from './components/routeFailureSource.jsx'
import Reward from './components/routeReward.jsx'



require('../sass/index.scss')
require('../sass/register.scss')

function init(){

  // 定义页面上的路由
  var routes = (  
    <Router history={ hashHistory }>
      <Route path="/" component={ App }>
        <IndexRoute component={ NewSource }/>
     
        <Route path="carTrack" component={ CarTrack } >  
          <IndexRoute component={ Running } /> 
         
          <Route path="failureSource" component={ FailureSource } />
        </Route>
        <Route path="center" component={ Center } />
        <Route path="income" component={ Income } />
        
      </Route>
      <Route path="incomeDetail" component={ IncomeDetail } />
      <Route path="account" component={ Account } />
      <Route path='plan' component={ Plan } />
      <Route path='incentive' component={ Incentive } />
      <Route path='marketing' component={ Marketing } />
      <Route path='join' component={ Join } />
      <Route path='tiroGuide' component={ TiroGuide } />
      <Route path='agentRegister' component={ AgentRegister } />
      <Route path='reward' component={ Reward } />
      
    </Router>
  );
  ReactDOM.render(routes,document.getElementById('agent'));

}

youyiche.scriptConfig(()=>{
  youyicheWX.wxAuth({
    type:"snsapi_userinfo",
    itemName:"itemAgent",
    success:init
  });
})
