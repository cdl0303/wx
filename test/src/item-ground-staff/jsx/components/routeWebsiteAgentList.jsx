import React from 'react'
import youyiche from 'youyiche'
import itemConfig from 'itemConfig'
import AgentList from './agentList.jsx'
import ErrorModal from './errorModal.jsx'

class WebsiteAgentList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        	allData:null,
	  		submitAgentList:[],//有提交代理人列表
            noSubmitAgentList:[],//无提交代理人列表
            txt:'',//错误提示
        }
        this.agentDetail = this.agentDetail.bind(this)
        this.submitAgent = this.submitAgent.bind(this)
        this.submitError = this.submitError.bind(this)
        this.getCardealerAgentList = this.getCardealerAgentList.bind(this)
    }
    agentDetail(id){
        window.location.href = '#/agentDetail/' + id;
    }
    componentDidMount(){
        this.getCardealerAgentList()  
    }

    getCardealerAgentList(){
        let self = this;
        youyiche.getData({
            url:itemConfig.api.getCardealerAgentList,
            data:{
                cdid:this.props.params.id
            }
        }).then(function(data){
            if(data.errcode){
                return;
            }
            self.setState({
                submitAgentList:data.data.recordAgentList,//有提交代理人列表
                noSubmitAgentList:data.data.noRecordAgentList,//无提交代理人列表
                allData:data.data
            })
        })
    }

    //添加代理人到该网点
    submitAgent(){
        var websiteAgent =  document.getElementById('websiteAgent').value;
        if(websiteAgent){
            let self = this;
            youyiche.getData({
                url:itemConfig.api.addAgentToNetWork,
                data:{
                    cdid:this.props.params.id,
                    id:websiteAgent
                }
            }).then(function(data){
                if(data.errcode == 1){
                    self.submitError('该代理人不存在')
                }
                else if(data.errcode == 2 ){
                    self.submitError('该代理人非4S,请联系郝亮')  
                }
                else if(data.errcode == 3){
                    self.submitError('修改失败,请联系郝亮')
                }
                else{
                     self.submitError('修改成功')
                     self.getCardealerAgentList()  
                }
            })
        }
    }

    //更改代理人错误
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
    }

    render() {
        if(this.state.allData){
    		return <div className='websiteAgentList'>
                {
                    this.state.submitAgentList.length?
                    <div className='submitAgentList px-one-border px-one-border-all'>
                        <p className='title px-one-border px-one-border-bottom'>{this.props.params.name}下有提交代理人</p>
                        <div className='agentList' id='agentList'>
                            <AgentList agentList={this.state.submitAgentList} agentDetail = {this.agentDetail}/>
                        </div>
                    </div>
                    :
                    ''
                }
	    		{
                    this.state.noSubmitAgentList?
                    <div className='noSubmitAgentList px-one-border px-one-border-all'>
                        <p className='title px-one-border px-one-border-bottom'>{this.props.params.name}下无提交代理人</p>
                        <div className='agentList' id='agentList'>
                            <AgentList agentList={this.state.noSubmitAgentList} agentDetail = {this.agentDetail}/>
                        </div>
                    </div>
                    :
                    ''
                }
                <div className = 'websiteAgentFooter'>
                    <input placeholder = '请输入ID号' id='websiteAgent' type ='txt'/>
                    <input className = 'websiteAgent' type ='submit' value='添加代理人到该网点' onClick={this.submitAgent}/>
                </div>
                <ErrorModal txt={ this.state.txt }/>
		 	</div>
    	}
    	else{
    		return false;
    	}
    }
}

export default WebsiteAgentList;
