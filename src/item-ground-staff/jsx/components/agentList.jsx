import React from 'react';

class AgentList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <ul className='clearfix'>
				{
					this.props.agentList.map((agent,index)=>{
						return(
							<li className='everyAgent colorBlack font0750 px-one-border px-one-border-bottom' onClick={this.props.agentDetail.bind(this,agent.id)}>
								<span className='info'>{agent.id}&nbsp;{agent.name}</span>
								<span className='info'>{agent.type}</span>
								<span className='info'>{agent.note}</span>
								<span className='direction'></span>
							</li>
						)
					})
				}
			</ul>
    }
}

export default AgentList;
