import React from 'react'
import youyiche from 'youyiche'
import itemConfig from 'itemConfig'

//我的业绩
var Center = React.createClass({
	getInitialState(){
		return{
			allData:null,
			avatar:'',//地推头像
			name:'',//地推名字
			agentTotal:'',//代理人总数
			thisMonthDate:'',//本月时间
			otherMonthDate:'',//其他月份
			selectMonth:false,//选择月份弹层
			basicData:[],//基本数据
			thisMonthData:[],//本月详细数据
			otherMonthData:[],//其他月详细数据
			changeMonthes:[],//月份列表
			websiteList:[],//网点数据
			activitiesAgentNum:'' //名下参加活动代理人名录
		}
	},
	componentDidMount(){
		youyiche.changeTitle('渠道经理专用');
		var self = this;
		youyiche.getData({
			url:itemConfig.api.getAgentTongji
		}).then(function(data){
			if(data.errcode){
				return;
			}
			var achievement0 = data.data.achievement[0];
			var achievement1 = data.data.achievement[1];
			self.setState({
				allData:data.data,
				name:data.data.name,
				avatar:data.data.avatar,
				activitiesAgentNum:data.data.tasks,
				agentTotal:data.data.agentTotal,
				thisMonthDate:achievement0.month,
				otherMonthDate:achievement1.month,
				thisMonthData:[
					{name:'本月新开未提交',type:'newAgentNotCreateTotal',number:achievement0.data.newAgentNotCreateTotal},
					{name:'本月新开有提交',type:'activityTotal',number:achievement0.data.activityTotal},
					{name:'本月有提交',type:'recordTotal',number:achievement0.data.recordTotal},
					{name:'本月潜在流失',type:'noneRecord',number:achievement0.data.noneRecord},
					{name:'本月有检测',type:'examTotal',number:achievement0.data.examTotal},
					{name:'本月有成交',type:'dealTotal',number:achievement0.data.dealTotal}
				],
				websiteList:[
					{name:'无提交网点数(个)',type:'noRecordCarDealer',number:achievement0.data.noRecordCarDealer},
					{name:'活跃网点数(个)',type:'recordCarDealer',number:achievement0.data.recordCarDealer},
					{name:'成交网点数(个)',type:'dealCarDealer',number:achievement0.data.dealCarDealer}
				],//网点数据
				otherMonthData:[
					{name:'当月新开未提交<br/>截止至今天',type:'newAgentNotCreateTotal',number:achievement1.data.newAgentNotCreateTotal},
					{name:'当月新开有提交<br/>截止至今天',type:'activityTotal',number:achievement1.data.activityTotal},
					{name:'当月有提交',type:'recordTotal',number:achievement1.data.recordTotal},
					{name:'当月潜在流失',type:'noneRecord',number:achievement1.data.noneRecord},
					{name:'当月有检测',type:'examTotal',number:achievement1.data.examTotal},
					{name:'当月有成交',type:'dealTotal',number:achievement1.data.dealTotal}
				],
				basicData:[
					{name:'总代理人数',number:data.data.agentTotal},
					{name:'总活跃代理人数',number:data.data.activityAgentTotal},
					{name:'总成交代理人数',number:data.data.agentDealTotal}
				],//基本数据
				changeMonthes:data.data.changeMonthes
			})
		})
	},
	//切换月份按钮
	cutoverMonth(){
		this.setState({
			selectMonth:this.state.selectMonth?false:true
		})
	},
	//选择月份
	selectMonth(month){
		var self = this;
		youyiche.getData({
			url:itemConfig.api.getAgentTongjiByMonth,
			data:{
				month:month
			}
		}).then(function(data){
			if(data.errcode){
				return;
			}
			self.setState({
				otherMonthDate:month,
				otherMonthData:[
					{name:'当月新开未提交<br/>截止至今天',type:'newAgentNotCreateTotal',number:data.data.newAgentNotCreateTotal},
					{name:'当月新开有提交<br/>截止至今天',type:'activityTotal',number:data.data.activityTotal},
					{name:'当月有提交',type:'recordTotal',number:data.data.recordTotal},
					{name:'当月潜在流失',type:'noneRecord',number:data.data.noneRecord},
					{name:'当月有检测',type:'examTotal',number:data.data.examTotal},
					{name:'当月有成交',type:'dealTotal',number:data.data.dealTotal}
				]
			})
		})

		this.setState({
			selectMonth:false
		})
	},
	//我的业绩六宫格代理人列表
	centerAgentList(basic,date){
		//date 表示日期
		//basic.type 表示类型
		if(basic.number>0){
			window.location.href = '#/centerAgent/'+date+'/'+basic.type;
		}
	},
	//我的业绩网点列表
	centerWebsiteList(basic){
		//basic.type 表示类型
		if(basic.number>0){
			window.location.href = '#/centerWebsite/'+basic.type;
		}
	},
	//参加活动代理人名录
	centerActivitiesAgent(number){
		if(number>0){
			window.location.href = '#/activitiesAgentList';
		}
	},
  	render(){
  		if(this.state.allData){
	  		let titlePng =this.state.avatar  || require('../../img/defaultHeadPic.png');
	  		let hrefSvg = require('../../../base-common/svg/symbol.svg');
		  	return(
		  	  <div className='myCenter'>
		  	  	<div className='centerTitle'>
		  	  		<div className='titlePart1'>
		  	  			<div className='leftPic'>
			  	  			<div className='centerPicMenu imgAdaptive'>
			  	  				<img src={titlePng}/>
				  	  		</div>
			  	  		</div>
			  	  		<div className='rightWord'>
			  	  			<p className='centerName'>{this.state.name}</p>
		  	  				<p className='centerName'>本月成交{this.state.thisMonthData[5].number}台｜上月成交{this.state.otherMonthData[5].number}台</p>
			  	  		</div>
			  	  		
		  	  		</div>
		  	  		<div className='titlePart2'>
		  	  			<ul className='font0750'>
		  	  				{	
		  						this.state.basicData.map((basic,index)=>{
		  							return(
		  								<li className='clearfix px-one-border px-one-border-right'> 
		  									<p className='font1375'>{basic.number}</p>
						  	  				<p className='font0625'>{basic.name}</p>
						  	  			</li>
		  							)
		  						})
		  					}
		  	  			</ul>	
		  	  		</div>
		  	  	</div>
		  	  	<div className='agentDirectory px-one-border px-one-border-all' onClick={this.centerActivitiesAgent.bind(this,this.state.activitiesAgentNum)}>
		  	  		<span className='colorBlack'>名下参加活动代理人名录</span>
		  	  		<span className='overviewRight colorLightGray'>{this.state.activitiesAgentNum}</span>
		  	  		<span className='direction'></span>
		  	  	</div>
		  	  	<div className='thisMonth px-one-border px-one-border-all'>
		  	  		<p className='colorBlack title'>本月（截止至此时）</p>
		  	  		<ul>
		  	  			{	
	  						this.state.thisMonthData.map((basic,index)=>{
	  							return(
									<li className='agentLi px-one-border px-one-border-right' onClick={this.centerAgentList.bind(this,basic,this.state.thisMonthDate)}>
					  	  				<p className='font1375 colorBlack'>{basic.number}</p>
					  	  				<p className='font0625'>{basic.name}</p>
				  	  				</li>
	  							)
	  						})
	  					}
		  	  		</ul>
		  	  		<ul>
		  	  			{	
	  						this.state.websiteList.map((basic,index)=>{
	  							return(
									<li className='agentLi px-one-border px-one-border-right' onClick={this.centerWebsiteList.bind(this,basic)}>
					  	  				<p className='font1375 colorBlack'>{basic.number}</p>
					  	  				<p className='font0625'>{basic.name}</p>
				  	  				</li>
	  							)
	  						})
	  					}
		  	  		</ul>
		  	  	</div>
		  	  	<div className='otherMonth px-one-border px-one-border-all'>
		  	  		<p className='colorBlack title'>
		  	  			<span className='overviewLeft'>{this.state.otherMonthDate}月业绩情况</span>
		  	  			<span className='overviewRight' onClick={this.cutoverMonth}>切换月份</span>
		  	  		</p>
		  	  		<svg onClick={this.cutoverMonth}>
	      				<use xlinkHref={ hrefSvg+'#calendar'}></use>
	      			</svg>
	      			<div className={this.state.selectMonth ? 'selectMonth':'selectMonth none'} id='monthSelect'>
	      				<span className='cusp'></span>
	      				<ul>
	      				{
	      					this.state.changeMonthes.map((month,index)=>{
	      						return(
	      							<li className='monthLi monthSelect font0750 px-one-border px-one-border-bottom' onClick={this.selectMonth.bind(this,month.month)}>{month.month}月</li>
	      						)
	      					})	
	      				}
	      				</ul>
	      			</div>
		  	  		<ul>
		  	  			{	
	  						this.state.otherMonthData.map((basic,index)=>{
	  							return(
									<li className='agentLi  px-one-border px-one-border-right' onClick={this.centerAgentList.bind(this,basic,this.state.otherMonthDate)}>
					  	  				<p className='font1375 colorBlack'>{basic.number}</p>
					  	  				<p className='font0625' dangerouslySetInnerHTML = {{__html:basic.name}}></p>
				  	  				</li>
	  							)
	  						})
	  					}
		  	  		</ul>
		  	  	</div>
		  	  	
		  	  </div>
		  	)
		}
		else{
			return false;
		}
    }
})

export default Center