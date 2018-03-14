import React from 'react';
import youyiche from 'youyiche'
import itemConfig from 'itemConfig'
import BottomCaption from './bottomCaption.jsx'
import ReactTipPop from 'reactComponents/react-tip-pop/component.jsx'


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	mobile:'',//手机号
        	codes:'',//验证码
        	txt:'',//错误提示
            topImg:require('../../img/topImg.png'),
            chaTime:'获取验证码',
            countDown:false//是否在倒计时
        }
        this.common = {
        	clientHeight:document.documentElement.clientHeight + 'px'
        }
        this.sendMsg = this.sendMsg.bind(this);
        this.countDown = this.countDown.bind(this);
        this.enter = this.enter.bind(this);
    }
    handInput(prop,event){
	    this.setState({
	      [prop]:event.target.value
	    });
	}

    //发送验证码
	sendMsg(){
		var self = this;
		if(self.state.mobile =="" || !/^1[3,4,5,8]{1}(\d){9}$/i.test(self.state.mobile)){
			self.showReactTipPop("请输入11位有效手机号码！");
		}else{
			//获取验证码
	      	youyiche.getData({
	          	url:itemConfig.api.bindVerifycode,
	          	data:{
	          		mobile:self.state.mobile
	          	},
	          	howDoWithSameAjax:'exclusive'
	      	}).then(function(data){
	          	if(!data.success){
	              	return;
	          	}
	          	//成功以后倒计时
	          	self.countDown();
	      	})
		}
		
	}
	showReactTipPop(value){ //显示提示框
        this.refs.reactTipPop.show(value);
    }
	//验证码倒计时
	countDown(){
		var self = this;
        var chaTime = 60;
        var InterValObj;
    	InterValObj = window.setInterval(function(){
    		if (chaTime > 0) { 
			    chaTime--;
			    if(chaTime<10){
			    	chaTime = '0' + chaTime;
			    }
			    self.setState({
			    	countDown:true,
			    	chaTime:chaTime+'秒'
			    })
			    document.getElementById("sendCodeBtn").setAttribute("disabled","disabled");

			}else{
				window.clearInterval(InterValObj); 
				self.setState({
			    	countDown:false,
			    	chaTime:'获取验证码'
			    })
				document.getElementById("sendCodeBtn").removeAttribute("disabled");
			}
    	}, 1000);
	}

    enter(){
    	var self = this;
    	if(self.state.mobile =="" || !/^1[3,4,5,8]{1}(\d){9}$/i.test(self.state.mobile)){
    		self.showReactTipPop("请输入11位有效手机号码！");
    	}
    	else if(self.state.codes ==""){
    		self.showReactTipPop("验证码不能为空！");
    	}
    	else{
    		//绑定微信用户
		    youyiche.getData({
	          	url:itemConfig.api.wxBind,
	          	method:'POST',
	          	data:{
		          	mobile:self.state.mobile,
		          	verifycode:self.state.codes
	          	}
	      	}).then(function(data){
	          	if(!data.success){
	              	return;
	          	}
	          	window.location.href = '#/carStatus'
	      	})
    	}
    }
    render() {
        return <div className='loginBox' style={{ height: this.common.clientHeight }}>
        	<div>
        		<img className='loginTopImg' src={this.state.topImg} />
        		<div className='inputBox'>
	        		<div className='px-one-border px-one-border-bottom'>
	        			<input  type='tel' placeholder="手机号"  onChange={ this.handInput.bind(this,'mobile')}/>
	        		</div>
	        		<div>
	        			<div className='codes px-one-border px-one-border-bottom'>
	        				<input type='tel' placeholder="验证码" onChange={ this.handInput.bind(this,'codes')}/>
	        			</div>
	        			<button className={this.state.countDown ? 'getCodes chaTime':'getCodes'} onClick={this.sendMsg} id='sendCodeBtn'>{this.state.chaTime}</button>
	        		</div>
	        		<button className='enter buttonDefault' onClick={this.enter}>进入</button>
	        	</div>
        	</div>
        	<BottomCaption/>
        	<ReactTipPop ref="reactTipPop"/>
        </div>;
    }
}

export default Login;
