/*
*底部按钮组件
*
*/
import React from 'react'

var NavBtn = React.createClass({
	getInitialState:function(){
	    return {
	      downShot:false,
	      sid:''
	    }
	  },
	downShot(){
   
		var nowTimer = new Date();
		var times = parseInt(nowTimer.getTime()/1000);
		if(times > info.shutdownTime){
			this.setState({
				downShot:true
			})
		}
    	
	},
	getParamByUrl :function(name) {
        var search = location.href;
        var result = search.match(new RegExp("[\?\&]" + name + "=([^\?\&#]+)", "i"));
        if (result == null || result.length < 1 || result[1] == "undefined") {
            return "";
        }
        return result[1];
    },
    openH5Link(){//统计页面
    	let that = this,url = "http://"+window.location.host+"/exam_app_h5/ajax_pv/"+that.state.sid;
    	$.ajax({url: url,type:"GET"});
    },
	componentWillMount:function(){
		this.downShot();
		var sid = this.getParamByUrl("sid");
		this.setState({
			sid:sid
		},function(){
			this.openH5Link();
		});
	},
	componentDidMount:function(){

		var that = this;
	    new Mlink({
	        mlink : "AalH",
	        button : document.querySelector("a#btnOpenAppDetail"),
	        params: {type:"vehicle",aeid:info.auction_examtask_id,sid:that.state.sid}
	    },{
	        mlink : "AalH",
	        button : document.querySelector("a#btnOpenApp"),
	        params: {type:"auction_anchor",sid:that.state.sid}
	    });
	},
	checkData(){//点击按钮
		let that = this,
			url = "http://"+window.location.host+"/exam_app_h5/ajax_click_button/"+that.state.sid;
    	$.ajax({url: url,type:"GET"});
	},
	render:function(){
	    return (
	     	<div className="navBtn">
	     		<div className="navBtnMenu">
	     			<div className="aBtn">
	     				<a id="btnOpenApp" href="javascript:void(0);" onClick={this.checkData}>更多车源</a>
	     			</div>
	     			
	     			{
	     				this.state.downShot 
	     					? 
	     					<div className="aBtn">
		     					<a id="btnOpenAppDetail" href="javascript:void(0);" className="hide">立即出价</a>
		     					<a  href="javascript:void(0);" className="shotDwon">该车已下拍</a> </div>
	     					: <div className="aBtn">
	     						<a id="btnOpenApp" href="javascript:void(0);" className="hide">立即出价</a>
	     						<a id="btnOpenAppDetail" href="javascript:void(0);" onClick={this.checkData}>立即出价</a></div>
	     			}
	     			
	     		</div>
		       	
		    </div>
	    )
  	}
})
export default NavBtn