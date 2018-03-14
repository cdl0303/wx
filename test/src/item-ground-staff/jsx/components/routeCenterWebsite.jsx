import React from 'react'
import youyiche from 'youyiche'
import itemConfig from 'itemConfig'

class CenterWebsite extends React.Component{
	constructor(props) {
	    super(props);
	    this.state={
	    	allData:null,
	    	websiteList:[]//经销商列表
	    }	
	}
	componentDidMount(){
		var self = this;
		youyiche.getData({
			url:itemConfig.api.getCarDealerActivity,
			data:{
				type:this.props.params.type
			}
		}).then(function(data){
			if(data.errcode){
				return;
			}
			console.info(data);
			self.setState({
				allData:data.data,
				websiteList:data.data
			})
		})
	}
	websiteDetail(website){
		window.location.href = '#/websiteAgentList/' + website.cdid +'/' + website.name;
	}
	render() {
		if(this.state.allData){
			var content = '';
			if(this.props.params.type == 'noRecordCarDealer'){
				content = '无提交网点'
			}
			else if(this.props.params.type == 'recordCarDealer'){
				content = '活跃网点'
			}
			else{
				content = '有成交的网点'
			}
		    return  <div className='centerAgent'>
				<p className='title px-one-border px-one-border-bottom'>{content}</p>
				<div className='centerWebsiteBox' id='centerWebsiteBox'>
					<div className='websiteList' id='websiteList'>
						<ul>
							{
								this.state.websiteList.map((website,index)=>{
									return(
										<li className='everyWebsite colorBlack font0750 px-one-border px-one-border-bottom' onClick={this.websiteDetail.bind(this,website)}>
											<span className='info'>{website.name}</span>
											<span className='info right'>活跃{website.recordCarDealerTotal}人，总共{website.allAgent}人</span>
											<span className='direction'></span>
										</li>
									)
								})
							}
						</ul>
					</div>
				</div>
			</div>
		}
		else{
			return false;
		}
	}
}

export default CenterWebsite