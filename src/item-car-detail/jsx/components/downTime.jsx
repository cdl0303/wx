/**
*下拍时间倒计时 弹出层
*
*/
import React from 'react'
var DownTime = React.createClass({
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
	closeDown(){
		this.setState({
			showCount:false,
			showPop:false
		})
	},
	handelTime(time){//time 为毫秒单位
		var that = this;
		var t,h,min,second,nowTime =  new Date();
			t = time/1000-nowTime.getTime()/1000;
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
		this.handelTime(this.props.time);

	},
  	render:function(){
  		
	    return (
	    	<div className={this.state.showCount ? "downTimeBox show" : "downTimeBox hide"}>
	    		<div className="leftTime">
	    			<em></em>
	    			剩余下拍 时间:<span className='second'>{this.state.h}时{this.state.min}分{this.state.second}秒</span>
	    		</div>
                
                <div className={this.state.showPop ? "countDownInfo show" : "countDownInfo hide"}>
                    <div className="countDownTxt">
                        <p className="txt tc">下拍 时间结束</p>
                        <p>
                        	<span className="button" onClick={this.closeDown}>确定</span>
                        </p>
                    </div>
                </div>
            </div>
	    	
	    )
	}
})
export default DownTime