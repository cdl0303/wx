import React from 'react'
import youyiche from 'youyiche'
import itemConfig from 'itemConfig'
import AgentList from './agentList.jsx'

//名下参加活动代理人名录
class ActivitiesAgentList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        	allData:null,
        	agentList:[]
        }
    }
    componentDidMount(){
        var self = this;

        youyiche.getData({
            url:itemConfig.api.getAgentTasksDetail,
        }).then(function(data){
            if(data.errcode){
                return;
            }
            var tempAgentList = data.data;
            var tempArray = [];
            var tempRewardType;
            var tempRewardEvent;
            for(var i=0; i < tempAgentList.length;i++){
                switch(tempAgentList[i].rewardType){
                    case 'meirenjiangliyici':
                      tempRewardType = '一次'
                    break;
                    case 'meirenjianglimeici':
                      tempRewardType = '每次'
                    break;
                    case 'pingfenjiangliyici':
                      tempRewardType = '平分'
                    break;
                }
                switch(tempAgentList[i].rewardEvent){
                    case 'shengchengcheyuan':
                      tempRewardEvent = '提'
                    break;
                    case 'wanchengjiance':
                      tempRewardEvent = '检'
                    break;
                    case 'chengjiao':
                      tempRewardEvent = '成'
                    break;
                }
                tempArray[i] = 
                    {
                        id:tempAgentList[i].id,
                        name:tempAgentList[i].name,
                        type:tempAgentList[i].beginDate.substring(4,6)+'/'+tempAgentList[i].beginDate.substring(6,8)+'-'+tempAgentList[i].endDate.substring(4,6)+'/'+tempAgentList[i].endDate.substring(6,8),
                        note:tempRewardEvent +'满'+ tempAgentList[i].rewardCount +'奖'+tempAgentList[i].rewardSum + tempRewardType
                    }
            }
            self.setState({
                allData:tempArray,
                agentList:tempArray
            })
        })
    }
    agentDetail(id){
    	window.location.href = '#/agentDetail/' + id;
    }
    render() {
        if(this.state.allData){
    		 return <div className='centerAgent'>
					<p className='title px-one-border px-one-border-bottom'>名下参加活动代理人名录</p>
					<div className='centerAgentBox' id='centerAgentBox'>
						<div className='agentList' id='agentList'>
                            <AgentList agentList={this.state.agentList} agentDetail = {this.agentDetail}/>
						</div>
					</div>
				</div>
    	}
    	else{
    		return false;
    	}
    }
}

export default ActivitiesAgentList;
