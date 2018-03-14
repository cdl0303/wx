import React from 'react'
import youyiche from 'youyiche'
import itemConfig from 'itemConfig'
import Loading from './loading.jsx'
import AgentListAndNoAgent from './agentListAndNoAgent.jsx'
//名下代理人
var NameAgentList = React.createClass({
	getInitialState(){
		return{
			allData:null,
			search:'', //搜索输入框内容
			agentType:0,//已选代理人类型
			agentTypeList:[],
			agentList:[],
			agentListData:[],
			loading:true
		}
	},
	componentDidMount(){
		youyiche.changeTitle('渠道经理专用');
		let self = this;
		//请求代理人列表
		this.getAgentListData();
		if(itemConfig.agentTypes){
			this.getAgentTypes(itemConfig.agentTypes)
		}
		else{
			youyiche.getData({
				url:itemConfig.api.getAgentTypes
			}).then(function(data){
				if(data.errcode){
					return;
				}
				itemConfig.agentTypes = data.data;
				self.getAgentTypes(data.data)
			})
		}
	},
	//获取代理人类型
	getAgentTypes(data){
		let self = this;
		let list = data;
      	list.unshift({
            'id':0,
            'name':'全部'
        })
		self.setState({
			allData:data,
			agentTypeList:self.state.agentTypeList.concat(list)
		},function(){
			self.generateDom();
		})
	},
	//生成dom以后
	generateDom(){
		var self = this;
		var bodyHeight = document.body.clientHeight;
		document.getElementById("agentList").style.maxHeight = bodyHeight - 52 - 40 - 50 -10 +"px";
		document.getElementById("noAgentData").style.height = bodyHeight - 52 - 40 - 50 -10 +"px";
		//获取li的长度相加得出ul的长度
		let agentType = document.querySelectorAll(".typeLi");
		var ulLength = 0; //定义ul的宽度等于0
		agentType[0].className = "typeLi selected";
		for(let i=0;i<agentType.length;i++){
			ulLength += agentType[i].clientWidth
		}
		document.getElementById("typeUl").style.width = ulLength+'px';
	    document.getElementById("form").addEventListener("keydown",function(e){
			if(e.which===13){
				self.setState({
					search:e.target.value
				},function(){
					self.getAgentListData();
				})
			}
		})
	},
	//获取代理人列表信息
	getAgentListData(){
		var scrolling={
          agentListData:[],
          getData:[],
          n:1
        }
		let self = this;
		youyiche.getData({
			url:itemConfig.api.getAgentListByTypeAndParam,
			data:{
				param:this.state.search,
				type:this.state.agentType
			}
		}).then(function(data){
			if(data.errcode){
				return;
			}
			// console.info(data.data);
			self.setState({
				allData:data.data,
				agentListData:data.data,
				loading:false
			},function(){
			    if(self.state.agentListData){
			        scrolling.agentListData = self.state.agentListData;
			        scrolling.getData = scrolling.agentListData.slice(0,15);
			        this.setState({
			            agentList:scrolling.agentListData.slice(0,15) //加载前15条数据
		            });
			        scrolling.n += 1;
			    }

			    //监听滚动  
			    if(location.hash.indexOf('nameAgentList')>-1){
			       document.getElementById("agentList").addEventListener('scroll', function(){self.handleScroll(scrolling)});
			    }
			})
		})
	},
	
	//滚动条高度  
	getScrollTop(){
		var scrollTop = 0;
		var listScroll = document.getElementById("agentList");
		scrollTop = listScroll.scrollTop;
		return scrollTop;
	},
	 //内容高度 
  	getScrollHeight(){
	  　　var listBoxHeight = document.getElementById("agentList").scrollHeight || 0;
	　　  return listBoxHeight;
  	},
  	//容器高度 
	getWindowHeight(){
	　　return document.getElementById("agentList").clientHeight || 0;
	},
	handleScroll:function(scrolling){
      var num = 0,
          pages = 0; //页数
      if(this.getScrollTop() + this.getWindowHeight() > this.getScrollHeight() - 15){
        if(scrolling.agentListData.length > 0){
        num = scrolling.agentListData.length%15;
          pages = Math.ceil(scrolling.agentListData.length/15);
          if(scrolling.n <= pages){
            if((scrolling.agentListData.length-scrolling.getData.length) < 15){
              scrolling.getData = scrolling.getData.concat(scrolling.agentListData.slice(15*(scrolling.n-1),15*scrolling.n+num));
            }else {
              scrolling.getData = scrolling.getData.concat(scrolling.agentListData.slice(15*(scrolling.n-1),15*scrolling.n));
            }
            scrolling.n += 1;
            this.setState({
              agentList:scrolling.getData
            });
          }else{
            return false;
          }
        }else{
       		return false;
        }
  　　 }
  	},
	//光标
	getFocus:function(){
	 	let searchInput = document.getElementById("searchInput");
	 	searchInput.className = "searchInput searchInputShow";
	 	searchInput.style.width = "86%";
	 	document.getElementById("searchOrder").focus();
 	},
	//取消
	cancelSearch:function(){
		let self = this;
		let searchInput = document.getElementById("searchInput");
		searchInput.className = "searchInput";
		searchInput.style.width = "100%";
	 	document.getElementById("searchOrder").value = "";
	 	this.setState({
	 	 	search:'',
	 	 	loading:true
	 	},function(){
	 	 	self.getAgentListData();
	 	})
	},
	//切换选中的代理人类型
	choseType(agent,index){
		this.setState({
			agentType:agent.id,
			loading:true
		},function(){
			this.getAgentListData()
		})
		let choseType = document.querySelectorAll(".typeLi")
		for(let i=0;i<choseType.length;i++){
			choseType[i].className="typeLi";
		}
		choseType[index].className = "typeLi selected";

	},
	//点击进入代理人详情
	agentDetail(id){
		window.location.href = '#/agentDetail/'+id;
	},
	addAgentPage(){
		window.location.href = '#/';
	},
  	render(){
  		if(this.state.allData){
  			let hrefSvg = require('../../../base-common/svg/symbol.svg');
		    return(
		      <div className='underNameAgent clearfix'>
		      		<div className='listSearch'>
						<div className='searchMenu'>
							<div className='searchInput' id='searchInput' onClick={this.getFocus}>
								<span className='searchRemind font0750 colorLightGray'>
									<svg className='svg1'>
					      				<use xlinkHref={ hrefSvg+'#search'}></use>
					      			</svg>
									可输入ID，手机号，姓名查询
								</span>
								<form id="form">
									<svg className='svg2 '>
						      				<use xlinkHref={ hrefSvg+'#search'}></use>
					      			</svg>
									<input  type="search" id="searchOrder" placeholder="搜索" className="typeSearch font0750">
										
					      			</input>
									<input type="text" className="hide"/>
								</form>
							</div>
							<span className="cancelSearch colorBlue" id="cancelSearch" onClick={this.cancelSearch}>取消</span>
						</div>
					</div>
					<div className='agentContent px-one-border px-one-border-bottom'>
						<div className='px-one-border px-one-border-bottom'>
							<div className='agentType'>
								<ul className='font0750 typeUl' id='typeUl'>
									{
										this.state.agentTypeList.map((agent,index)=>{
											return(
												<li className='typeLi colorBlack' onClick={this.choseType.bind(this,agent,index)}><p>{agent.name}</p></li>
											)
										})
									}
								</ul>
							</div>
						</div>
						<AgentListAndNoAgent agentList={this.state.agentList} agentDetail={this.agentDetail} agentListData={this.state.agentListData} search={this.state.search} addAgentPage={this.addAgentPage} txt='暂无代理人'/>
						{
							this.state.loading ? <Loading /> : ''
						}
					</div>
		      </div>
		    )
  		}
  		else{
  			return false;
  		}
    }
})

export default NameAgentList