import React from 'react';
import youyiche from 'youyiche'
import itemConfig from 'itemConfig'

class BranchEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	brand:-1,//品牌
        	address:-1,//网点
        	oldName:'',// 传给后台的参数 老网点
        	brandAddress:[],//品牌数组
        	addressList:[]//网点数组
        }
        this.saveAgentBranch = this.saveAgentBranch.bind(this)
        this.getAddressList = this.getAddressList.bind(this)
        this.brandAddress = this.brandAddress.bind(this)
    }

    componentDidMount(){
		var self = this;

		youyiche.getData({
			url:itemConfig.api.getAgentBrandAndName,
			data:{
				id:this.props.params.id
			}
		}).then(function(data){
			if(data.errcode){
				return;
			}
			self.setState({
				brand:data.data.carDealerBrand,//品牌
        		address:data.data.carDealerName,//网点
        		oldName:data.data.carDealerName//网点
			},()=>{
				self.brandAddress(data.data.carDealerBrand)
			})
		})

		
    }

    brandAddress(brand){
    	var self = this;
    	if(itemConfig.brandAddress){
			self.setState({
				allData:itemConfig.brandAddress,
				brandAddress:itemConfig.brandAddress
			},function(){
				self.getAddressList(brand)
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
					self.getAddressList(brand)
				})
			})
		}
    }

    //根据品牌获取网点数组
	getAddressList(value){
		var self = this;
		for(var i=0;i<this.state.brandAddress.length;i++){
    		if(value == this.state.brandAddress[i].brand){
    			this.setState({
    				addressList:this.state.brandAddress[i].address
    			},()=>{
    				self.fillExistInfo()
    			})
    		}
    	}
	}
	//填充代理人现有品牌和网点信息
	fillExistInfo(){
		if(this.props.params.branch){
			this.setState({
				brand:this.props.params.branch,
				address:this.props.params.address
			})
		}
	}

	handInput(prop,event){
	    this.setState({
	      [prop]:event.target.value
	    });
	    if(prop == 'brand'){
	    	this.getAddressList(event.target.value);
	    }
	}
	//保存代理人
	saveAgentBranch(){
		var self = this;
		youyiche.getData({
			url:itemConfig.api.updateAgentBrandAndName,
			data:{
				id:this.props.params.id,
				brand:this.state.brand,
				name:this.state.address,
				oldName:this.state.oldName
			},
			method:'POST'
		}).then(function(data){
			if(data.errcode){
				return;
			}
			window.location.href = '#/agentDetail/' + self.props.params.id;
		})
		
	}

    render() {
        return <div className='branchEdit'>
        	<p className='agentId colorBlack'>ID:{this.props.params.id}</p>
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
	      	<button className='buttonDefault' onClick={this.saveAgentBranch}>保存</button>
        </div>
    }
}

export default BranchEdit;
