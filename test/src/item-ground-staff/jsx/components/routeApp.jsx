import React from 'react'
import { Link,IndexLink} from 'react-router'

//入口
var App = React.createClass({
  render(){
    let hrefSvg = require('../../../base-common/svg/symbol.svg');
  	return(
  	    <div>
         <div>{this.props.children}</div>
	        <nav className='footNav'>
            <ul className="footUl px-one-border px-one-border-top">
              <li className="nav-li"><IndexLink  to="/" activeClassName="active"><svg><use xlinkHref={ hrefSvg+'#openTheAgent'}></use></svg><p className='font0625'>开通代理人</p></IndexLink></li>
              <li className="nav-li"><Link to="/nameAgentList" activeClassName="active"><svg><use xlinkHref={ hrefSvg+'#nameOfTheAgent'}></use></svg><p className='font0625'>名下代理人</p></Link></li>
              <li className="nav-li"><Link to="/center" activeClassName="active"><svg><use xlinkHref={ hrefSvg+'#myPerformance'}></use></svg><p className='font0625'>我的业绩</p></Link></li>
            </ul>
        	</nav>
        </div>
  	)
  }
})

export default App