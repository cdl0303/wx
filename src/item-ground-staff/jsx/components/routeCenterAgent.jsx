import React from 'react'
import youyiche from 'youyiche'
import itemConfig from 'itemConfig'
import AgentList from './agentList.jsx'

var CenterAgent = React.createClass({
	getInitialState(){
		return{
			date:'',//title
			allData:null,
			agentTypeList:[],
			agentList:[],
			agentListData:[]
		}
	},
	componentDidMount(){
		var scrolling={
          agentListData:[],
          getData:[],
          n:1
        }
		let self = this;
		youyiche.getData({
			url:itemConfig.api.getAgentListFromTongji,
			data:{
				type:this.props.params.type,
				month:this.props.params.date
			}
		}).then(function(data){
			if(data.errcode){
				return;
			}
			self.setState({
				allData:data.data,
				agentListData:data.data,
				date:self.props.params.date
			},function(){
			    if(self.state.agentListData){
			        scrolling.agentListData = self.state.agentListData;
			        scrolling.getData = scrolling.agentListData.slice(0,15);
			        this.setState({
			            agentList:scrolling.agentListData.slice(0,15) //加载前15条数据
		            });
			        scrolling.n += 1;
			    }
			    var bodyHeight = document.body.clientHeight;
			    document.getElementById("centerAgentBox").style.maxHeight = bodyHeight - 56 +"px";
			    //监听滚动  
			    if(location.hash.indexOf('centerAgent')>-1){
			       document.getElementById("centerAgentBox").addEventListener('scroll', function(){self.handleScroll(scrolling)});
			    }
			})
		})
	},
	//滚动条高度  
	getScrollTop(){
		var scrollTop = 0;
		var listScroll = document.getElementById("centerAgentBox");
		scrollTop = listScroll.scrollTop;
		return scrollTop;
	},
	 //内容高度 
  	getScrollHeight(){
	  　　var listBoxHeight = document.getElementById("centerAgentBox").scrollHeight || 0;
	　　  return listBoxHeight;
  	},
  	//容器高度 
	getWindowHeight(){
	　　return document.getElementById("centerAgentBox").clientHeight || 0;
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
            console.info(scrolling.getData);
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
	//点击进入代理人详情
	agentDetail(id){
		window.location.href = '#/agentDetail/'+id;
	},
	render(){
		if(this.state.allData){
			var content = '';
			if(this.props.params.type == 'newAgentNotCreateTotal'){
				content = '新开未提交'
			}
			else if(this.props.params.type == 'activityTotal'){
				content = '新开有提交'
			}
			else if(this.props.params.type == 'recordTotal'){
				content = '有提交'
			}
			else if(this.props.params.type == 'noneRecord'){
				content = '潜在流失'
			}
			else if(this.props.params.type == 'examTotal'){
				content = '有检测'
			}
			else{
				content = '有成交'
			}
			return(
				<div className='centerAgent'>
					<p className='title px-one-border px-one-border-bottom'>{this.state.date}月{content}</p>
					<div className='centerAgentBox' id='centerAgentBox'>
						<div className='agentList' id='agentList'>
							 <AgentList agentList={this.state.agentList} agentDetail = {this.agentDetail}/>
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

export default CenterAgent