import React from 'react'
import Modal from './modal.jsx'
import youyiche from 'youyiche'
import itemConfig from 'itemConfig'

class Verification extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			verification:false,//false 表示在提醒页，true表示进入验证页
			initial:'点击发送',
			verificationCode:true,//false 表示不可以点击发送，true表示可以点击发送
			warningInfo:''
		}
		this.verificationButton = this.verificationButton.bind(this);
		this.clickGetVerificationCode = this.clickGetVerificationCode.bind(this);
		this.change = this.change.bind(this);
		this.closeVerification = this.closeVerification.bind(this);
		this.clickSpanFocus = this.clickSpanFocus.bind(this);
	}
	//进入验证码验证页面
	verificationButton(){
		this.setState({
			verification:true
		},()=>{
			this.clickSpanFocus()
		})
		this.clickGetVerificationCode()
	}
	//获取验证码点击操作
	clickGetVerificationCode(){
		this.clickSpanFocus()
		this.countDown()
		this.getVerificationCode()
	}
	//获取验证码
	getVerificationCode(){
		youyiche.getData({
	      url:itemConfig.api.verifycode,
	      method:'post',
	      data:{
	      	mobile:this.props.mobile
	      }
	    }).then((data)=>{
	    })
	}
	//光标foucs
	clickSpanFocus(){
		document.getElementById("verifyCode").click()
		document.getElementById("verifyCode").focus()
	}
	//我知道了 &&  关闭 弹窗	
	closeVerification(){
		//调用父组件中的方法重置父组件中相关的变量
		this.props.closeVerification()
		this.setState({
			verification:false //false 表示在提醒页，true表示进入验证页
		})
	}
  	//删除左右两端的空格
	getTrim(str){
	    return str.replace(/(^\s*)|(\s*$)/g, "");
	}
	//验证码倒计时
	countDown(){
		var self = this;
        var initial = 60;
        var InterValObj;
    	InterValObj = window.setInterval(function(){
    		if (initial > 1) { 
			    initial--;
			    if(initial<10){
			    	initial = '0' + initial;
			    }
			    self.setState({
			    	verificationCode:false,
			    	initial:initial+'秒'
			    })
			}else{
				window.clearInterval(InterValObj); 
				self.setState({
			    	initial:'重新发送',
			    	verificationCode:true
			    })
			}
    	}, 1000);
	}
	//赋值
	change(event){
		var that = this;
		var value = event.target.value;
		var length = value.length;
		var code = document.querySelectorAll('.codes');
		Array.prototype.forEach.call(code,function(item,index){
			//赋值
			item.innerHTML = value.substring(index,index+1)?value.substring(index,index+1):'<i></i>';
			if(length == index){
				item.className = 'codes active';
			}
			else{
				item.className = 'codes'
			}
		})
		if(length == 4){
			//发送验证码设为只读
			document.querySelector('.code-input').setAttribute("readOnly",'true');

			var parm = {
	          origin: "vehicleagent_" + itemConfig.agenInfoParm.agentId,
	          name:that.getTrim(that.props.globalState.name),
	          phone:that.getTrim(that.props.globalState.mobile),
	          brand:'',
	          series: '', 
	          plate:that.getTrim(that.props.globalState.demand),  //车牌号或备注
	          isSell: true,
	          notice:that.props.globalState.notice,               //是否告知客户
	          operate:'verifyCode',
	          verifyCode:value
	        }

	        var header = {"content-type":"application/json;charset=utf-8"};
	        youyiche.getData({
	          url:youyiche.publicParams.baseUrl+itemConfig.api.registerCarneed,
	          data:parm,
	          method:"post",
	          headers:header
	        },false).then((data)=>{
	        	if(!data.success&&(data.message=='001'||data.message=='002')){
		            that.showWarning('提交错误',code);
		            return;
	          	}
	        	if(!data.success&&(data.message=='004'||data.message=='003')){
	        		that.showWarning('验证码输入错误',code)
	          		return;
	        	}
	        	that.showWarning('提交成功',code);
	        })
		}
	}

	//显示错误信息
	showWarning(str,code){
	    this.setState({
	      	warningInfo:str
	    });
	    setTimeout(() => {
	    	if(str == '提交成功'){
	    		this.props.closeVerificationByCode();
	    	}
	        this.setState({
	       		warningInfo:'',
	        })
	        document.querySelector('.code-input').removeAttribute("readOnly");
	        //清空value
	        document.querySelector('.code-input').value = '';
	        //焦点
	        document.querySelector('.code-input').focus();
        	Array.prototype.forEach.call(code,function(item,index){
		   		item.innerHTML = '<i></i>';
		   		if(index == 0){
		   			item.className = 'codes active';
		   		}
		   		else{
		   			item.className = 'codes';
		   		}
			})
	    },2000);

	 }

	render() {
		return <div className='verification'>
			<div className={this.state.verification?'verification-remind none':'verification-remind'}>
				<p className='title'>信息重复提醒<span className='close' onClick={this.closeVerification}></span></p>
				<p className='font0750 colorDarkGrey'>后台已存在相同号码信息，如果这是</p>
				<p className='font0750 colorDarkGrey'>您的个人手机号，请验证。</p>
				<p className='font0750 colorDarkGrey'>通过验证的手机号码将不进行自动判</p>
				<p className='font0750 colorDarkGrey'>断重复处理。</p>
				<div className='button-box clearfix'>
					<button className='button button1' onClick={this.closeVerification}>我知道了</button>
					<button className='button button2' onClick={this.verificationButton}>验证手机号</button>
				</div>
			</div>
			<div className={this.state.verification?'verification-box':'verification-box none'}>
				<p className='title'>验证手机号<span className='close' onClick={this.closeVerification}></span></p>
				<div className='mobile'>
					<span className='number colorLightGray font0750'>{this.props.mobile.slice(0,3)}</span>
					<span className='number colorLightGray font0750'>{this.props.mobile.slice(3,7)}</span>
					<span className='number colorLightGray font0750'>{this.props.mobile.slice(7,11)}</span>
					<span id='sendCodeBtn' className={this.state.verificationCode ? 'countdown font0625 colorBlack':'countdown countdown2 font0625'} onClick={this.clickGetVerificationCode}>{this.state.initial}</span>
				</div>
				<div className='verificationCode'>
					<div className='code-box' onClick={this.clickSpanFocus}>
						<span className='codes active'><i></i></span>
						<span className='codes'><i></i></span>
						<span className='codes'><i></i></span>
						<span className='codes'><i></i></span>
					</div>
					<input className='code-input'  id='verifyCode' type="tel"  maxLength='4' onClick={this.change} onChange={this.change}></input>
				</div>
			</div>
			<Modal text={ this.state.warningInfo } />
		</div>
	}
}

export default Verification