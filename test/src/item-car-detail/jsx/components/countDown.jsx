/**
*保护期倒计时 弹出层
*
*/
import React from 'react'
var CountDown = React.createClass({
	getInitialState(){
	    return {
	    	h:"00",//时
	   		min:"00", //分
	   		second:"00", //秒
	   		showPop:false, //是否显示弹层 
	   		showCount:true,
	    }
	},
	downParm:{
		InterValObj:null
	},
	closeCountDown(){
		this.setState({
			showCount:false,
			showPop:false
		})
	},
	handelTime(time){//time 为毫秒单位
		var that = this;
		var t,h,min,second;
				t = time/1000;
			that.downParm.InterValObj = window.setInterval(function(){
				if(t > 0){
					t--;
					h = parseInt((t/3600)%24);
					min = parseInt((t/60)%60);
					second =  parseInt(t%60);
					
					if(h < 10){
						h = "0" + h;
					}
					if(min < 10){
						min = "0" + min;
					}
					if(second < 10){
						second = "0" + second;
					}
					that.setState({
						h:h,
						min:min,
						second:second
					})
					
				}else{
					window.clearInterval(that.downParm.InterValObj); 
					that.setState({
						showPop:true
					})
					
				}	
			},1000)
	
	},
	componentWillMount(){
		if(this.props.time > 0){
			this.handelTime(this.props.time);
		}else{
			this.setState({
				showCount:false
			})
		}

	},
  	render:function(){
  		
	    return (
	    	<div className={this.state.showCount ? "countDownRealH show" : "countDownRealH hide"}>
	    		<div className="countDownBox">
		    		<div className="leftTime">
		    			<em></em>
		    			<span className='second'>{this.state.h}:{this.state.min}:{this.state.second}</span>分之后保护期结束
		    		</div>
	                
	                <div className={this.state.showPop ? "countDownInfo show" : "countDownInfo hide"}>
	                    <div className="countDownTxt">
	                        <p className="txt">保护期结束，车辆将在“专场”车源中公开展示，所有车商均可竞拍。</p>
	                        <p>
	                        	<span className="button" onClick={this.closeCountDown}>确定</span>
	                        </p>
	                    </div>
	                </div>
	            </div>
	    	</div>
	    )
	}
})
export default CountDown