import React from 'react'
import { Link } from 'react-router'
import youyiche from '../../../base-common/js/common.js'
import Warning from '../../jsx/components/warning.jsx'
import  Code from '../../jsx/components/codePic.jsx'

require('../../sass/register.scss')
var c_img = require('../../img/re_good.png');
var InterValObj;
var AgentRegister = React.createClass({

	getInitialState(){
	    return{
	    	bindeCode:"",   //绑定码
	    	mobile:"",      //手机号
	    	name:"",        //姓名
	    	city:"" ,       //城市
	    	code:"",        //验证码
	    	warning:false,  //是否显示错误信息
			warningNo:null, //错误信息
	    }
  	},
  	
	componentDidMount(){

		this.setState({
  			bindeCode:""
  		});

  		
	},
	handleCity:function(e){
		var cityVal = e.target.value;
		this.setState({
			city: cityVal,
		});
		console.log();
		if(e.target.selectedIndex != 0){
			e.target.style.color = "#333";
		}else{
			e.target.style.color = "#cccccc";
		}

		//e.option[0].style.color = "#cccccc";
	},
	handInput:function(prop,event){
	    this.setState({
	      [prop]:event.target.value
	    })
	},
	setNull:function(prop,event){
	    this.setState({
	      [prop]:null,
	    });
	},

	//立即开通
	handleClick:function(event){
		var that = this;
		if(that.state.bindeCode != ""){
			var parm={
				bindcode:that.state.bindeCode
			};
			youyiche.getJson("/wx_vehicle_agent/registerbybindcode","post",parm).then(function(data){
				if(data.errcode  != 0){
					that.showError(data.errmsg);
				}else{
					youyiche.getJson("/wx_vehicle_agent/checkopenidsubscribe").then(function(d){
						if(d.errcode == 0){
							if(d.data.subscribe){
								window.location.href="#/";
								
							}else{
								document.getElementById("showCode").style.display = "block";
							}
						}else{
							that.showError(d.errmsg);
						}
					});
				}

			});
		}else{
			that.showError("绑定码不能为空！");
		}
		
	},
	//立即申请
	applyMsg:function(){
		var that = this;
		if(that.state.name == ""){
			that.showError("姓名不能为空！");
		}else if(that.state.mobile == "" || !/^1[3,4,5,8]{1}(\d){9}$/i.test(that.state.mobile)){
			that.showError("请输入11位有效手机号码！");
		}else if(that.state.code == ""){
			 that.showError("验证码不能为空！");
		}else if(that.state.city == ""){
			that.showError("请选择城市！");
		}else{
			var parms = {
				city:that.state.city,
				name:that.state.name,
				mobile:that.state.mobile,
				code:that.state.code
			}
			
			youyiche.getJson("/wx_vehicle_agent/register","post",parms).then(function(data){
				if(!data.success){
					that.showError(data.message);
				}else{
					youyiche.getJson("/wx_vehicle_agent/checkopenidsubscribe").then(function(d){
						if(d.errcode == 0){
							if(d.data.subscribe){
								window.location.href="#/";
							}else{
								document.getElementById("showCode").style.display = "block";
							}
						}else{
							that.showError(d.errmsg);
						}
					});
				}

			});
		}
	},
	//发送验证码
	sendMsg:function(){
		var that = this;
		if(that.state.mobile =="" || !/^1[3,4,5,8]{1}(\d){9}$/i.test(that.state.mobile)){
			that.showError("请输入11位有效手机号码！");
		}else{
			var parm = {
				mobile:this.state.mobile
			};
			 youyiche.getJson("/wx_vehicle_agent/sendCode","post",parm).then(function(data){
			 	if(!data.success){
			 		that.showError(data.message);
			 	}else{
			 		that.countDown();
			 	}

			 });
		}
		
	},

	//验证码倒计时
	countDown :function(){
	
        var chaTime = 60;

        if ( chaTime > 0) 
        	InterValObj = window.setInterval(function(){
        		if (chaTime > 0) { 
	  
				    chaTime--;
				    if(chaTime<10){
				    	chaTime = '0' + chaTime;
				    }
				    document.getElementById("sendCodeBtn").innerText = chaTime+"秒后重新获取";
				    document.getElementById("sendCodeBtn").style.background="#eae8e8"
				    document.getElementById("sendCodeBtn").setAttribute("disabled","disabled");

				}else{
					window.clearInterval(InterValObj); 
					document.getElementById("sendCodeBtn").innerText = "获取验证码";
					document.getElementById("sendCodeBtn").removeAttribute("disabled");
					document.getElementById("sendCodeBtn").style.background="#fff";

				}
        	}, 1000);
        
	},

	showError:function(str){
		this.setState({
			error:str,
			warning:true,//是否显示错误码
			warningNo:str,//付款时订单错误码
		});
		setTimeout(() => {
	        this.setState({
	          error:'',
	          warning:false,
			  warningNo:null,
	        })
	    },2000);
        return;
	},
	render(){
		
		return (
			<div>
				<div className="a_register">
					<div className="bind_code">
						<p className="bind_code_tit">您的绑定码</p>
						<div className="code_input">
							<span className="code_l">
								<input type="text" placeholder="请输入绑定码" value={this.state.bindeCode} onFocus={ this.setNull.bind(this,'bindeCode') } onBlur={ this.handInput.bind(this,'bindeCode')}/>
							</span>
							<span className="code_r" onClick={this.handleClick}>立即开通</span>
						</div>
						<p className="code_waring">如果您有绑定码请输入，没有绑定码需在下方注册</p>
						<span className="circle_span">或</span>
					</div>
					<div className="otherStyle">
						<div className="item_o">
							<span className="item_all">
								<input type="text" placeholder="请输入姓名" value={this.state.name} onFocus={ this.setNull.bind(this,'name') } onBlur={ this.handInput.bind(this,'name')}/>
							</span>
						</div>
						<div className="item_x">
							<span className="item_half">
								<input type="text" placeholder="请输入手机号" value={this.state.mobile} onFocus={ this.setNull.bind(this,'mobile') } onBlur={ this.handInput.bind(this,'mobile')} maxLength="11"/>
							</span>
							<div className="item_send">
								<button className="send_msg" onClick={this.sendMsg} id="sendCodeBtn">获取验证码</button>
							</div>
						</div>
						<div className="item_o">
							<span className="item_all">
								<input type="text" placeholder="请输入验证码" value={this.state.code} onFocus={ this.setNull.bind(this,'code') } onBlur={ this.handInput.bind(this,'code')}/>
							</span>
						</div>
						<div className="item_o">
							<span className="item_all">
								
								<select id="city_select" className="city_select" onChange={this.handleCity}>
									<option value="">请选择城市</option>
									<option value="上海">上海</option>
									<option value="苏州">苏州</option>
									<option value="成都">成都</option>
									<option value="杭州">杭州</option>
								</select>
							</span>
						</div>
						<div className="item_btn">
							<input type="submit" value="立即注册" className="appleBtn" onClick={ this.applyMsg }/>
						</div>
					</div>
					<div className="register_pic">
						<div className="re_img"><img src={c_img}/><span className="three_pic"></span></div>
						
					</div>
					
				</div>
				<Warning warning={ this.state.warning} value={ this.state.warningNo} />
				<Code />
			</div>
		)
	}
})

export default AgentRegister