import React from 'react'
import youyiche from 'youyiche'
import itemConfig from 'itemConfig'
import youyicheWX from 'youyicheWX'
import ErrorModal from './errorModal.jsx'
import AgentQr from './agentQr.jsx'
//开通代理人
var AddAgent = React.createClass({
	getInitialState(){
	    return {
	      allData:null,//全部数据
	      name:'',//姓名
	      mobile:'',//手机号
	      type:-1, //归类类型
	      brand:-1,//品牌
	      note:'',//备注
	      address:-1,//注册地址
	      position:'',//注册人坐标
	      optionClassify:[],//归类
	      brandAddress:[],
	      addressList:[],
	      txt:'',//错误提示
	      agentQr:'',
	      brandAddressByGPS:'',//根据gps获取品牌网点
	      brandAddressByGPSString:''//根据gps获取品牌网点拼成的字符串
	    }
	},
	componentDidMount(){
		youyiche.changeTitle('开通代理人');
		
		//请求代理人类型
		let self = this;
		youyicheWX.wxGetLocation(function(position){
			self.setState({
				position:position
			})
			//用户授权后，发送gps坐标
			youyiche.getData({
				url:itemConfig.api.getGroundStaffGpsRecord,
				data:{
					record_type:1,
					gps:JSON.stringify({
						lat:position.latitude,
						lon:position.longitude
					})
				}
			}).then(function(data){
				if(data.errcode){
					return;
				}
			})
		})
		if(itemConfig.agentTypes){
			self.setState({
				allData:itemConfig.agentTypes,
				optionClassify:itemConfig.agentTypes
			})
		}
		else{
			youyiche.getData({
				url:itemConfig.api.getAgentTypes
			}).then(function(data){
				if(data.errcode){
					return;
				}
				itemConfig.agentTypes = data.data;
				self.setState({
					allData:data.data,
					optionClassify:data.data
				})
			})
		}
		
	},
	//根据品牌获取网点数组
	getAddressList(value){
		for(var i=0;i<this.state.brandAddress.length;i++){
    		if(value == this.state.brandAddress[i].brand){
    			this.setState({
    				addressList:this.state.brandAddress[i].address
    			})
    		}
    	}
	},
	//根据网点获取品牌数组
	getBrandListByAddress(value){
		for(var i=0;i<this.state.brandAddress.length;i++){
    		if(this.state.brandAddress[i].address.indexOf(value) > -1){
    			//根据品牌获取网点数组
    			this.getAddressList(this.state.brandAddress[i].brand)
    			this.setState({
    				brand:this.state.brandAddress[i].brand,
    			})
    		}
    	}
	},
	handInput(prop,event){
		let self = this;
	    this.setState({
	      [prop]:event.target.value
	    });
	    if(prop == 'brand'){
	    	this.getAddressList(event.target.value);
	    }
	    else if(prop == 'type'){
	    	if(event.target.value == 3 || event.target.value == 14){
	    		this.getbrandAddress();
	    		this.getbrandAddressByGPS();
	    	}
	    	else{
	    		self.setState({
					brandAddressByGPS:'',
					brandAddressByGPSString:''
				})
	    	}
	    }
	    else if(prop == 'addressByGPS'){
	    	self.getBrandListByAddress(event.target.value);
	    	self.setState({
	    		address:event.target.value,
	    	})
	    }
	    else if(prop == 'mobile' && /^1(\d){10}$/i.test(event.target.value) ){
	    	youyiche.getData({
				url:itemConfig.api.getAgentByMobile,
				data:{
					mobile:event.target.value
				}
			}).then(function(data){
				if(data.errcode == 2){
					return;
				}
				if(data.errcode == 1){
					self.setState({
						txt:data.errmsg
					})
					return;
				}
				self.setState({
					allData:data.data,
					name:data.data.name,
					mobile:data.data.mobile,
					type:data.data.type,
					note:data.data.note,
					brand:data.data.note,
					address:data.data.address
				},function(){
					if(data.data.type == 3 || data.data.type == 14){
						self.getbrandAddress(data.data.note);
					}
					else{
					    document.querySelector('.note').value = data.data.note;	
					}
				})
			    document.querySelector('.name').value = data.data.name;
			})
	    }
	},
	//根据归类获取品牌和网点
	getbrandAddress(note){
		var self = this;
		if(itemConfig.brandAddress){
			self.setState({
				allData:itemConfig.brandAddress,
				brandAddress:itemConfig.brandAddress
			},function(){
				self.getAddressList(note)
			})
		}
		else{
			youyiche.getData({
				url:itemConfig.api.getBrandAddress
			}).then(function(data){
				if(data.errcode){
					return;
				}
				itemConfig.brandAddress = data.data;
				self.setState({
					allData:data.data,
					brandAddress:data.data
				},function(){
					self.getAddressList(note)
				})
			})
		}
	},
	//根据gps获取推荐的网点
	getbrandAddressByGPS(){
		var self = this;
		youyiche.getData({
			url:itemConfig.api.getCarDealersByGeo,
			data:{
				lat:self.state.position.latitude,
				lon:self.state.position.longitude
			}
		}).then(function(data){
			if(data.errcode){
				return;
			}
			var brandAddressByGPSString = '';
			for(var i = 0; i<3; i++){
				if(i<2){
					brandAddressByGPSString += data.data[i].name + ','
				}
				else{
					brandAddressByGPSString +=data.data[i].name
				}
			}
			self.setState({
				allData:data.data,
				brandAddressByGPS:data.data,
				brandAddressByGPSString:brandAddressByGPSString
			})
		})
	},
	//提交代理人信息
	submitAgent(){
		var self = this;
		if(!this.state.mobile || !/^1(\d){10}$/i.test(this.state.mobile)){
			this.submitError('请输入11位有效手机号码');
		}
		else if(!this.state.name){
			this.submitError('姓名不能为空');
		}
		else if(this.state.type == -1){
			this.submitError('请选择归类');
		}
		else{
			if(this.state.type == 3 || this.state.type == 14){
				if(this.state.brand == -1){
					this.submitError('请选择品牌');
				}
				else if(this.state.address == -1){
					this.submitError('请选择网点');
				}
				else{
					youyiche.getData({
						url:itemConfig.api.registerAgent,
						data:{
							name:this.state.name,
							mobile:this.state.mobile,
							type:this.state.type,
							brand:this.state.brand,
							address:this.state.address,
							position:JSON.stringify({
								latitude:this.state.position.latitude,
								longitude:this.state.position.longitude
							})
						}
					}).then(function(data){
						if(data.errcode){
							return;
						}
						self.submitSuccess(data);
					})
				}
			}
			else{
				if(!this.state.note){
					this.submitError('请填写备注');
				}
				else{
					youyiche.getData({
						url:itemConfig.api.registerAgent,
						data:{
							name:this.state.name,
							mobile:this.state.mobile,
							type:this.state.type,
							note:this.state.note,
							position:JSON.stringify({
								latitude:this.state.position.latitude,
								longitude:this.state.position.longitude
							})
						}
					}).then(function(data){
						if(data.errcode){
							return;
						}
						self.submitSuccess(data);
					})
				}
			}
		}
	},
	//提交代理人成功
	submitSuccess(data){
		this.setState({
		  agentQr:data.data,
          name:'',//姓名
	      mobile:'',//手机号
	      type:-1, //归类类型
	      brand:-1,//品牌
	      note:'',//备注
	      address:-1,//注册地址
	      brandAddressByGPS:'',
		  brandAddressByGPSString:''
        })
        document.querySelector('.name').value = '';
        document.querySelector('.phone').value = '';
        return;

	},
	//提交代理人错误
	submitError(note){
		this.setState({
          txt:note,
        })
        setTimeout(() => {
          this.setState({
            txt:''
          })
        },2000);
        return;
	},
	//关闭二维码弹窗
	closeAgentQr(){
		this.setState({
			agentQr:''
		})
	},
	//关闭错误弹窗
	closeErrorModal(){
		this.setState({
			txt:'',
			mobile:''
		})
		document.getElementById('mobile').value  = '';
	},
	//查询未激活代理人按钮
	noActiveAgentList(){
		window.location.href = '#/noActiveAgentList/';
	},
	render(){
		if(this.state.allData){
		    return(
		      <div className='addAgent'>
		      	<div className='info px-one-border px-one-border-all'>
	  				<div className='px-one-border px-one-border-bottom'>
		      			<input className='phone' id='mobile' type="tel"  placeholder='请填写手机号' onChange={ this.handInput.bind(this,'mobile') }/>
	      			</div>
	      			<input className='name' type="text" placeholder='请填写姓名' onChange={ this.handInput.bind(this,'name') }/>
		      	</div>
		      	<div className='classify px-one-border px-one-border-all'>
		      		<lable>归类</lable>
		      		<select className='colorLightGray' value={ this.state.type } onChange={ this.handInput.bind(this,'type') }>
		      			<option value='-1'>请选择归类</option>
		      			{
		      				this.state.optionClassify.map((option,index)=>{
		      					return(
		      						<option value={option.id}>{option.name}</option>
		      					)
		      				})
		      			}
		      		</select>
		      		<span className='orientation'></span>
		      	</div>
		      	{
		      		//写map的原因是因为ui有三种状态
		      		this.state.optionClassify.map((optionClassify,index)=>{
		      			if((this.state.type == 3 || this.state.type == 14) && index == 1){
		      				return(
		      					<div>
							      	<div className='classify px-one-border px-one-border-all'>
							      		<lable>品牌</lable>
							      		<select className='colorLightGray' value={ this.state.brand } onChange={ this.handInput.bind(this,'brand') }>
							      			<option value='-1'>请选择品牌</option>
							      			{
							      				this.state.brandAddress.map((option,index)=>{
							      					return(
							      						<option value={option.brand}>{option.brand}</option>
							      					)
							      				})
							      			}
							      		</select>
							      		<span className='orientation'></span>
							      	</div>
							      	<div className='classify px-one-border px-one-border-all'>
							      		<lable>网点</lable>
							      		<select className='colorLightGray' value={ this.state.address } onChange={ this.handInput.bind(this,'address') }>
							      			<option value='-1'>请选择网点</option>
							      			{
							      				this.state.addressList.map((option,index)=>{
							      					return(
							      						<option value={option}>{option}</option>
							      					)
							      				})
							      			}
							      		</select>
							      		<span className='orientation'></span>
							      	</div>
							      	
						      	</div>
		      				)
		      			}
		      			else if((this.state.type != 3 || this.state.type != 14) && index == 1 && this.state.type != -1){
		      				return(
		      					<div className='write px-one-border px-one-border-all'>
					  				<div className='px-one-border px-one-border-top'>
						      			<textarea className='note' type="text" placeholder='请填写备注' onChange={ this.handInput.bind(this,'note') }/>
					      			</div>
					      		</div>
		      				)
		      			}
		      		})    	
		      	}
		      	{
		      		this.state.brandAddressByGPS ?
		      		<div className='brandAddressByGPS colorBlue'>
			      		<lable>智能推荐:</lable>
			      		<select  value={ this.state.address } onChange={ this.handInput.bind(this,'addressByGPS') }>
			      			<option value='-1'>请选择</option>
			      			{
			      				this.state.brandAddressByGPS.map((option,index)=>{
			      					return(
			      						<option value={option.name}>{option.name}</option>
			      					)
			      				})
			      			}
			      		</select>
			      		<span>{this.state.brandAddressByGPSString}</span>
			      	</div>
			      	:
			      	''
		      	}
		      	
		      	<button className='buttonDefault' onClick={this.submitAgent}>生成二维码</button>
		      	<button className='buttonDefault inactivated' onClick={this.noActiveAgentList}>查询尚未激活代理人</button>
		      	<AgentQr agentQr={ this.state.agentQr } closeAgentQr = {this.closeAgentQr}/>
		      	<ErrorModal txt={ this.state.txt } closeErrorModal = {this.closeErrorModal}/>
		      </div>
		    )
		}
		else{
			return false;
		}
	}
})

export default AddAgent