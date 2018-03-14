
import React from 'react';
import AgentList from './agentList.jsx'

class AgentListAndNoAgent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        	noAgentImg:require('../../img/noAgent.png')
        }
    }
    render() {
        return <div className='agentList' id='agentList'>
        	<AgentList agentList={this.props.agentList} agentDetail = {this.props.agentDetail}/>
			<div className={this.props.agentListData.length ? 'noAgentData none' : 'noAgentData '}  id = 'noAgentData'>
				{
					this.props.search == '' ?
					<div id = 'nodata'>
						<div className='noAgentImg imgAdaptive'>
							<img src={this.state.noAgentImg}/>
						</div>
						<p className='colorLightGray txt'>{this.props.txt}</p>
						<button className='buttonDefault' onClick={this.props.addAgentPage}>开通代理人</button>
					</div>
					:
					<div id = 'nosearch'>
						暂无查询代理人
					</div>
				}
			</div>
		</div>
    }
}

export default AgentListAndNoAgent;
