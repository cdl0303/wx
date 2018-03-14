import React from 'react'
import { Link,IndexLink} from 'react-router'

//入口
var App = React.createClass({
  render(){
  	return(
  	    <div>
         <div>{this.props.children}</div>
	        <nav className='footNav'>
            <ul className="footUl">
              <li className="nav-li"><IndexLink to="/" activeClassName="active"><span className='navIcon'></span><p>商城</p></IndexLink></li>
              <li className="nav-li"><Link to="/productAll" activeClassName="active"><span className='navIcon'></span><p>全部商品</p></Link></li>
              <li className="nav-li"><Link to="/center" activeClassName="active"><span className='navIcon'></span><p>我的订单</p></Link></li>
            </ul>
        	</nav>
        </div>
  	)
  }
})

export default App