import React from 'react'
import youyiche from 'youyiche'

class NoticeDetail extends  React.Component{
	constructor(props) {
        super(props);
        this.state = {
        	title:'',
			content:''
        }
    }
	componentDidMount(){
		var that = this;
		youyiche.getData({
            url:'/wxapp/api/message/getMessageLogById?m_id='+this.props.params.id
        }).then(function(data){
        	if(!data.success){
        		return false;
        	}
            that.setState({
				title:data.ret.title,
				content:data.ret.content
			})
        })
	}
	render(){
		var that = this;
		function formatContent(){
			return {
				__html: that.state.content
			}
		};
		return  <div className='notice-detail'>
					<div className='notice-title'>{ this.state.title }</div>
					<div className='notice-body' dangerouslySetInnerHTML={ formatContent() }></div>
				</div>
	}
};

export default NoticeDetail
