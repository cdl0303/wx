import React from 'react'
//弹出二维码
var Code = React.createClass({
  render:function(){
  	let load = require('../../img/code.png');
    return (
      <div className="yyc_pic" id="showCode">
      	<div className="yyc_covers_bg"></div>
      	<div className="yyc_covers">
      		<div className="yyc_covers_pic">
      			<img src={load} />
      		</div>
      		<div className="showCodeTit">长按二维码关注又一车即可成为合伙人</div>
      	</div>
      	
      </div>
    )
  }
});

export default Code