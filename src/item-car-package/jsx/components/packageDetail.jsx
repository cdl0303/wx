import React from 'react'
import { Link } from 'react-router'
import youyiche from '../../../base-common/js/common.js'
import Loading from '../../jsx/components/loading.jsx'

// var shopAddressData = [];
// var n = 1;
// var getData = [];
const PackageDetail = React.createClass({
	 
	getInitialState(){
	    return{
	     DetailData:{
	     	'rulesList':[]
	     },
	     stores:[],
	     consumeCardQR:"",
	     showBing:false,
	     loading:true
	     
	    }
  	},
	componentDidMount:function(){
		var scrolling={
	      shopAddressData:[],
	      getData:[],
	      n:1
	    }
		var that = this;
		
		//卡券包详情接口数据
		youyiche.getJson("/wash_car/getUserWashCardDetail?oid="+this.props.params.id).then(function(data){

			if(!data.success && !data.token_invalid){
				return;
			}

			that.setState({
				showBing:true,
				loading:false
			});
			
			data.ret.validDate = data.ret.validDate.replace(/-/g,'.');
			if(data.ret.validType == '0'){
				data.ret.start_date = data.ret.create_date.match(/\d+-\d+-\d+/)[0].replace(/-/g,'.');
			}else if(data.ret.validType == '1'){
				data.ret.start_date = data.ret.receive_date.match(/\d+-\d+-\d+/)[0].replace(/-/g,'.');
			}
			data.ret.rulesList = data.ret.rule.split("<br>");
			that.setState({
	  			DetailData:data.ret			  			
	  		});
	  		
			if(data.ret.shopAddress){
				scrolling.shopAddressData = data.ret.shopAddress;
				scrolling.getData = scrolling.shopAddressData.slice(0,10);
				that.setState({
		  			
		  			stores:scrolling.shopAddressData.slice(0,10) //加载前10条数据
		  			
		  		});
		  		scrolling.n += 1;
		  		
			}
			//console.log(that.state.consumeCardQR);
			if(data.ret.consumeCardQR != ""){
				that.setState({
		  			consumeCardQR:data.ret.consumeCardQR	  				  			
		  		});
			}else{
				document.getElementById("qrcode").innerText = "获取二维码失败，请刷新页面";
			
			}

			
			
		});
		//监听滚动	
		document.addEventListener('scroll', function(){that.handleScroll(scrolling)});
	},
	﻿
//滚动条在Y轴上的滚动距离  
  getScrollTop:function(){
　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
　　if(document.body){
　　　　bodyScrollTop = document.body.scrollTop;
　　}
　　if(document.documentElement){
　　　　documentScrollTop = document.documentElement.scrollTop;
　　}
　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
　　return scrollTop;
} ,
 //文档的总高度 
  getScrollHeight:function(){
	　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
	　　if(document.body){
	　　　　bodyScrollHeight = document.body.scrollHeight;
	　　}
	　　if(document.documentElement){
	　　　　documentScrollHeight = document.documentElement.scrollHeight;
	　　}
	　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
	　　return scrollHeight;
  },
 //浏览器视口的高度 
  getWindowHeight:function(){
　　var windowHeight = 0;
　　if(document.compatMode == "CSS1Compat"){
　　　　windowHeight = document.documentElement.clientHeight;
　　}else{
　　　　windowHeight = document.body.clientHeight;
　　}
　　return windowHeight;
 },
	
   handleScroll:function(scrolling){
   	if(!document.getElementById("storeMore")){
        return false; 
      }
   	    var num = 0,
   	        pages = 0; //页数
   		if(this.getScrollTop() + this.getWindowHeight() > this.getScrollHeight() - 10){
	    	if(scrolling.shopAddressData.length > 0){
				num = scrolling.shopAddressData.length%10;
		    	pages = Math.ceil(scrolling.shopAddressData.length/10);

		    	//console.log("n：" +n  +"页数："+pages);
		    	if(scrolling.n <= pages){
		    		// console.log(getData);
		    		if((scrolling.shopAddressData.length-scrolling.getData.length) < 10){
			    		scrolling.getData = scrolling.getData.concat(scrolling.shopAddressData.slice(10*(scrolling.n-1),10*scrolling.n+num));
			    	}else {
			    		scrolling.getData = scrolling.getData.concat(scrolling.shopAddressData.slice(10*(scrolling.n-1),10*scrolling.n));
			    	}
			    	scrolling.n += 1;
			    	this.setState({
			  			
			  			stores:scrolling.getData
			  			
			  		});
			  		//console.log(getData);
			  		
		    	}else{
					document.getElementById("storeMore").innerText = "没有更多了......";
		    		return false;
		    	}
	    	}else{
				document.getElementById("storeMore").innerText = "没有更多了......";
	    	}
	    	
	    	
			//shopAddressData = shopAddressData.concat(shopAddressData.slice(10,20));
			
			//console.log(shopAddressData);
	　　}
   },
	render(){

		if(!this.state.loading){
			return (

				 <div className= {this.state.showBing ? 'packDetail_box' : 'packDetail_box hide'}>
			      <div className="pk_head">
			          <h3 className="pk_tit">{this.state.DetailData.name}</h3>
			          <p className="pk_time">{this.state.DetailData.start_date}-{this.state.DetailData.validDate}</p>
			          <div className="pk_img" id="qrcode">
			            <img src={this.state.consumeCardQR}/>
			          </div>
			          <p className="pk_number">
			            凭证号：{this.state.DetailData.orderNo}
			          </p>
			      </div>
			      <div className="pk_cont">
			        <span className="pk_mark"></span>
			        <div className="cont_tit"><span>使用规则</span></div>
			       	<div className="cont_box">
			       		
					     {

							this.state.DetailData.rulesList.map(function(rule){
								
								return(
									<p className="cont_txt">{rule}</p>	
						        )
								
							})
						}
				        <p className="cont_txt">&nbsp;</p>
			       	</div>
			      </div>

			      <div className="pk_cont">
			        <span className="pk_mark"></span>
			        <div className="cont_tit"><span>使用门店</span></div>
			        <div className="storeList">
			        	{
			        		this.state.stores.map(function(store){
			        			return(
			        				<div className="storeItem">
						              <p className="storeName">{store.name}</p>
						              <p className="storeAddress">{store.address}</p>
						            </div>
			        			)
			        		})
			        	}
			         
			        </div>
			        <div className="storeMore" id="storeMore">下拉加载更多......</div>
			      </div>		     
			    </div>


			)
		}else{
			 return (<Loading />)
		}
		
	}
})

export default PackageDetail