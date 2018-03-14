/*
*价格展示
*
*/
import React from 'react'
var MyPrice = React.createClass({
	getInitialState(){
	    return {
	      pirceShow:true, //显示价格
	      priceTxt:"",
	      myTxt:"",
	      onlyTxt:"",
	      myOnly:false,//一口价和我的出价同时显示 默认不显示
	      myPrice:"",
	      onlyPrice:"",
	      price:"",
	      isYellow:false
	    }
	},
	handelApp(price){
		if(price.myPrice > 0 && info.auctionLightPrice > 0){//起拍价、我的出价 同时显示
			this.setState({
				myTxt:"我的出价：",
				onlyTxt:"起拍价：",
				myPrice:"¥"+price.myPrice+"万",
				onlyPrice:"¥"+info.auctionLightPrice+"万",
				myOnly:true,
			})
		}
		if(price.myPrice > 0 && price.onlyPrice > 0){
			this.setState({
				myTxt:"我的出价：",
				onlyTxt:"一口价：",
				myPrice:"¥"+price.myPrice+"万",
				onlyPrice:"¥"+price.onlyPrice+"万",
				myOnly:true,
			})
		}else if(price.myPrice > 0 && price.onlyPrice == 0){
			this.setState({
				priceTxt:"我的出价：",
				price:"¥"+price.myPrice+"万",
			})
		}else if(price.myPrice == 0 && price.onlyPrice > 0){
			this.setState({
				priceTxt:"一口价：",
				price:"¥"+price.onlyPrice+"万",
				isYellow:true
			})
		}else{
			this.setState({
				pirceShow:false

			})
		}
	},
	componentWillMount(){
		this.handelApp(this.props.app)
	},


  	render:function(){
	    return (
	    	<div>
	    		{
	    			this.state.pirceShow ? 
	    				<div className="surveyItem px-one-border px-one-border-bottom">
				    		<div className="versionPrice">
				    			{
				    				this.state.myOnly ? 
					    				<div>
					    					<div className="vPriceL fl">
							                  	<span className="tit">{this.state.myTxt}</span>
							                  	<span className="txt blue">{this.state.myPrice}</span>
							                </div>
							                <div className="vPriceL fr">
							                	<span className="vLine"></span>
							                  	<span className="tit">{this.state.onlyTxt}</span>
							                  	<span className="txt yellow">{this.state.onlyPrice}</span>
							                </div>
					    				</div>
					                :
					                	<div className="vPriceL fl">
						                  	<span className="tit">{this.state.priceTxt}</span>
						                  	<span className={this.state.isYellow ? "txt yellow" : "txt blue"}>{this.state.price}</span>
						                </div>

				    			}
				    			 
				    		</div>
			            </div>
		           :
		           ''
	    		}
	    	</div>
	    )
	}
})
export default MyPrice