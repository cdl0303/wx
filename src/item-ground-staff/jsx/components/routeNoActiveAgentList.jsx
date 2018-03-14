import React from 'react'
import youyiche from 'youyiche'
import itemConfig from 'itemConfig'
import AgentListAndNoAgent from './agentListAndNoAgent.jsx'
import AgentQr from './agentQr.jsx'

class NoActiveAgentList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        	allData:null,
    	  	agentQr:'',
	  		agentList:[],
			agentListData:[]
        };
        this.closeAgentQr = this.closeAgentQr.bind(this);
        this.agentDetail = this.agentDetail.bind(this);
    }
    componentDidMount(){
    	youyiche.changeTitle('渠道经理专用');
    	let self = this;
    	youyiche.getData({
			url:itemConfig.api.getNoActiveAgentList
		}).then(function(data){
			if(data.errcode){
				return;
			}
			self.setState({
				allData:data.data,
				agentList:data.data,
				agentListData:data.data
			},function(){
				this.generateDom();
			})
		})
    }
	//点击代理人弹出二维码
	agentDetail(id){
    	let self = this;
    	youyiche.getData({
			url:itemConfig.api.getNoActiveAgentQRCode,
			data:{
				agentId:id
			}
		}).then(function(data){
			if(data.errcode){
				return;
			}
			self.setState({
				agentQr:data.data
			})
		})
	}
    //添加代理人
    addAgentPage(){
		window.location.href = '#/';
	}
	//关闭二维码弹窗
	closeAgentQr(){
		this.setState({
			agentQr:''
		})
	}

	generateDom(){
		document.getElementById("noAgentData").style.height = document.body.clientHeight - 56 +"px";
	}
    render() {
    	if(this.state.allData){
    		 return <div className='noActiveAgent'>
    		 	<p className='title px-one-border px-one-border-bottom'>尚未激活代理人名录</p>
	        	<AgentListAndNoAgent agentList={this.state.agentList} agentDetail={this.agentDetail} agentListData={this.state.agentListData} search='' addAgentPage={this.addAgentPage} txt='暂无未激活代理人'/>
	        	<AgentQr agentQr={ this.state.agentQr } closeAgentQr = {this.closeAgentQr} scope={this}/>
	        </div>
    	}
    	else{
    		return false;
    	}
    }
}

export default NoActiveAgentList;
