/*
*寄售
*
*/
import React from 'react'
var Consignment = React.createClass({
  	render:function(){
	    return (
	 		<div className="surveyItem consignment px-one-border px-one-border-bottom">
                <div className="consignmentItem">
                    <p className="consTit">上次拍卖价格</p>
                    <p className="consPrice">￥{info['price_auctionLast'] > 0 ? info['price_auctionLast']+"万" : '0'}</p>
                    <span className="consLine"></span>
                </div>
                <div className="consignmentItem">
                    <p className="consTit">客户心理价</p>
                    <p className="consPrice priceBlue">￥{info['price_psychologicalPrice'] > 0 ? info['price_psychologicalPrice']+"万" : '0'}</p>
                    <span className="consLine"></span>
                </div>
                <div className="consignmentItem">
                    <p className="consTit">二手市场价</p>
                    <p className="consPrice">{info['price_secondMarket'] > 0 ? '￥'+info['price_secondMarket'] + "万" :'询价中...'}</p>
                </div>
            </div>
	    )
	}
})
export default Consignment