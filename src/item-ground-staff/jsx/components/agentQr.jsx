import React from 'react'

//ErrorModal
var AgentQr = React.createClass({
  render:function(){
  	let png = this.props.agentQr;
  	let hrefSvg = require('../../../base-common/svg/symbol.svg');
    return (
      <div className={ this.props.agentQr  ? 'agentQr show' : 'agentQr '}>
      	<div className='qrBox'>
      		<svg onClick={this.props.closeAgentQr}>
    				<use xlinkHref={ hrefSvg+'#shutDown'}></use>
    			</svg>
	        <img  src={png}/>
      	</div>
      	
      </div>
    )
  }
});

export default AgentQr