import React from 'react'
import youyiche from 'youyiche'
import itemConfig from 'itemConfig'
import ErrorModal from './errorModal.jsx'

var AddAgentTrack = React.createClass({
	getInitialState(){
		return{
			txt:''//错误提示
		}
	},
	componentDidMount(){
		youyiche.changeTitle('添加跟进记录');
	},
	//提交记录
	submitTrack(){
		var self = this;
		var track =  document.getElementById('content').value;
		if(track == ''){
			this.setState({
				txt:'跟进记录不能为空'
			})
			setTimeout(() => {
	          this.setState({
	            txt:''
	          })
	        },2000);
	        return;
		}
		else{
			youyiche.getData({
				url:itemConfig.api.addFollowRecord,
				data:{
					agentid:this.props.params.id,
					content:track,
					type:2
				},
				method:'POST'
			}).then(function(data){
				if(data.errcode){
					return;
				}
				window.location.href = '#/agentDetail/'+self.props.params.id;
			})
			
		}
		
	},
	render(){
		return(
			<div className='addAgentTrack px-one-border px-one-border-all'>
				<textarea  className='font0750 colorBlack' placeholder='请输入跟进记录' id="content">
				</textarea>
				<button className='buttonDefault' onClick={this.submitTrack}>保存</button>
				<ErrorModal txt={ this.state.txt }/>
			</div>
		)
	}
})

export default AddAgentTrack