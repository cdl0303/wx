/*
*h5起拍价 展示
*
*/
import React from 'react'
var AuctionPrice = React.createClass({

  	render:function(){
	    return (
	 		<div className="surveyItem px-one-border px-one-border-bottom">
	     		<div className="versionPrice">
		     		<div className="vPriceL fl">
	                  	<span className="tit">起拍价：</span>
	                  	<span className="txt yellow">¥{this.props.price}万</span>
	                </div>
		     	</div>
	 		</div>
	    )
	}
})
export default AuctionPrice