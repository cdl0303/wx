import React from 'react'
import youyiche from 'youyiche'
import itemConfig from 'itemConfig'

//代理人情况详情
var AgentDetail = React.createClass({
	getInitialState(){
		return{
			allData:null,
			id:'',//代理人id
			name:'',//代理人名字
			type:'',//代理人类型
			numberList:[],//各种基本数据数量
			dateList:[],//各种日期
			followRecord:[],//代理人跟进
			phoneNum:'',//代理人手机号
			branchName:''
		}
	},
	componentWillMount(){
		var self = this;
		youyiche.getData({
			url:itemConfig.api.getAgentDetail,
			data:{
				id:this.props.params.id
			}
		}).then(function(data){
			if(data.errcode){
				return;
			}
			self.setState({
				allData:data.data,
				name:data.data.name,
				type:data.data.type,
				phoneNum:data.data.mobile,
				numberList:[
					{name:'总提交(台)',number:data.data.vechileRecordTotal},
					{name:'检测(台)',number:data.data.examVehicleTotal},
					{name:'成交(台)',number:data.data.dealVehicleTotal}
				],
				dateList:[
					{name:'开通日期',date:data.data.registerDate || '无'},
					{name:'初次提交日期',date:data.data.firstCreateRecordDate || '无'},
					{name:'最后提交日期',date:data.data.lastCreateRecordDate || '无'},
					{name:'初次检测日期',date:data.data.firstExamDate || '无'},
					{name:'最后检测日期',date:data.data.lastExamDate || '无'},
					{name:'初次成交日期',date:data.data.firstDealDate || '无'},
					{name:'最后成交日期',date:data.data.lastDealDate || '无'}
				],
				branchName:data.data.carDealerBrand ? (data.data.carDealerBrand+'-'+data.data.carDealerName) : '暂无对应网点'
			})
		})
		this.getFollowRecord();
		// console.info( this.props.params.id);
	},
	getFollowRecord(){
		var self = this;
		youyiche.getData({
			url:itemConfig.api.getFollowRecord,
			method:'POST',
			data:{
				agentid:this.props.params.id
			}
		}).then(function(data){
			if(data.errcode){
				return;
			}
			self.setState({
				allData:data.data,
				followRecord:data.data
			})
		})
	},
	//致电代理人，其实为插入一条跟踪记录
	phoneAgent(){
		var self = this;
		youyiche.getData({
			url:itemConfig.api.addFollowRecord,
			method:'post',
			data:{
				agentid:this.props.params.id,
				content:'尝试联系该代理人',
				type:1
			}
		}).then(function(data){
			if(data.errcode){
				return;
			}
			self.getFollowRecord();

		})
	},
	//进入添加代理人跟着记录界面
	addAgent(id){
		window.location.href = '#/addAgentTrack/'+id;
	},
	//修改网点
	editBranch(){
		window.location.href = '#/BranchEdit/'+this.props.params.id;
	},
  	render(){
	    let record = null;
	    if(this.state.allData){
		    if(this.state.followRecord != ''){
				record = this.state.followRecord.map((record,index)=>{
					return(
						<li>
			            <div className='trackDiv px-one-border px-one-border-bottom'>
			                <span></span>
			                <span className='circle'></span>
			                <p>{record.content}</p>
			                <p>{record.createDate}</p>
			            </div>
			        </li>
					)
				})
			}
			else{
				record = <p className='noInfo font0750 colorBlue'>目前没有跟进记录</p>
			}
		  	return(
		  	    <div >
		  	    	<div className='agentDetail'>
		  	    		<div className='agentInfo px-one-border px-one-border-all'>
		  	    		
		  	    			<p className='info colorBlack'>
			  	    			<span className='name'>{this.state.name}</span>
			  	    			<span>ID:{this.props.params.id}</span>
			  	    		</p>
			  	
			  	    		
			  	    		<ul className='numberList px-one-border px-one-border-top'>
			  	    		{
			  	    			this.state.numberList.map((item,index)=>{
			  	    				return(
			  	    					<li className=' px-one-border px-one-border-right'>
					  	    				<p className='colorBlack font1375'>{item.number}</p>
					  	    				<p className='font0625'>{item.name}</p>
					  	    			</li>
			  	    				)
			  	    			})
			  	    		}
			  	    		</ul>
			  	    		{
		  	    				(this.state.type == 3 || this.state.type == 14) ?
		  	    				<div className = 'branch px-one-border px-one-border-top'>
				  	    			<span className='branchName colorBlack'>{this.state.branchName}</span>
				  	    			<span className=' colorBlue' onClick = {this.editBranch}>修改</span>
				  	    		</div>
				  	    		:
				  	    		''
		  	    			}
			  	    		
			  	    		<ul className='dateList'>
		  	    			{
		  	    				this.state.dateList.map((item,index)=>{
			  	    				return(
			  	    					<li className=' px-one-border px-one-border-top'>
					  	    				<span className='font0750 colorBlack'>{item.name}</span>
					  	    				<span className='font0750 date'>{item.date}</span>
					  	    			</li>
			  	    				)
			  	    			})
		  	    			}
			  	    		</ul>
			  	    	</div>
			  	    	<div className='agentTrack'>
		  	    			<p className='title colorBlack px-one-border px-one-border-bottom'>跟近记录</p>
		  	    			<ul className='trackDetail'>{record}</ul>
			  	    	</div>
		  	    	</div>
		  	    	<div className='agentDetailFoot px-one-border px-one-border-top font1000'>
		  	    		<div className='addButton colorBlue' onClick={this.addAgent.bind(this,this.props.params.id)}>添加跟进记录</div>
		  	    		<div className='phoneButton' onClick={this.phoneAgent}>
		  	    		<a href={'tel:'+this.state.phoneNum}>致电代理人</a>
		  	    		</div>
		  	    	</div>
		  	    </div>
		  	)
	    }
	    else{
	    	return false;
	    }
    }
})

export default AgentDetail