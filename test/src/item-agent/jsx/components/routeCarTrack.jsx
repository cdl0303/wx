/**
* car source report
*/
import youyiche from '../../../base-common/js/common.js'
import React from 'react'
import { Router,Route,IndexRoute,Link,IndexLink,hashHistory,StateMixin} from 'react-router'
var CarTrack = React.createClass({
  render:function(){
    return (
      <div>
        <ReportNav />
        <div>{this.props.children}</div>
      </div>
    )
  }
});
var ReportNav = React.createClass({
  render: function() {
    return (
      <nav className="report-nav px-one-border px-one-border-bottom">
        <li><IndexLink to="/carTrack/" activeClassName="active"><span className="activeSpan">进行中<em></em></span></IndexLink></li>
        
        <li><Link to="/carTrack/failureSource" activeClassName="active"><span className="activeSpan">已失效<em></em></span></Link></li>
      </nav>
    );
  }
})
export default CarTrack