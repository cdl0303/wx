
import React from 'react'
import {Link,IndexLink} from 'react-router'
import youyiche from '../../../base-common/js/youyiche.js'
import itemConfig from '../../js/itemConfig.js'
//入口
var App = React.createClass({
  getInitialState:function(){
    return { 
      appIn:false,
      }
  },
  componentWillMount(){
    var that = this;
    youyiche.getData({
      url:itemConfig.api.appOauthUrl
    }).then(
        (data)=>{
          if(data.errcode == 0 && data.data != ""){
            that.setState({
              appIn:true
            })
            itemConfig.agenInfoParm.agentId = data.data.id;
            //console.log(itemConfig.agenInfoParm.agentId );
          }else if(data.errcode == 0 && data.data == ""){
            window.location.href = '#/agentRegister';
            return;
          }else{
            alert(data.errmsg);
            // that.setState({
            //   appIn:true
            // })
          }
        }
      )
  },
  render: function() {
      
    if(this.state.appIn){
        return ( 
          <div className="agentBOX">
            
             <ul className="foot-nav px-one-border px-one-border-top">
                
                <li className="nav-li nav-li-1"><IndexLink to="/" activeClassName="active"><span className='nav-icon'></span><p>提交车源</p></IndexLink></li>
                <li className="nav-li nav-li-2"><Link to="/income" activeClassName="active"><span className='nav-icon'></span><p>收入</p></Link></li>
                <li className="nav-li nav-li-3"><Link to="/carTrack" activeClassName="active"><span className='nav-icon'></span><p>车源跟踪</p></Link></li>
                <li className="nav-li nav-li-4"><Link to="/center" activeClassName="active"><span className='nav-icon'></span><p>个人中心</p></Link></li>
                
            </ul>

            <div>{this.props.children}</div>
          </div>
      )
    }else{
        return false;
    }
  }
});

export default App
