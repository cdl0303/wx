/*
*h5一口价 展示
*
*/
import React from 'react'
var FixPrice = React.createClass({

  	render:function(){
	    return (
	 		<div className="surveyItem px-one-border px-one-border-bottom">
	     		<div className="versionPrice">
		     		<div className="vPriceL fl">
	                  	<span className="tit">一口价：</span>
	                  	<span className="txt yellow">¥{this.props.price/10000}万</span>
	                </div>
		     	</div>
	 		</div>
	    )
	}
})
export default FixPrice