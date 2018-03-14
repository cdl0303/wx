import React from 'react'

//分享弹层
class ShareMount extends React.Component{
	constructor(props){
		super(props);
		this.common = {
			shareHands:require('../../img/shareHands.png')
		}
	}
	render() {
		return <div  className={this.props.shareMount?'shareMount show':'shareMount'}>
			<img src={this.common.shareHands}/>
			<p className='content font1375'>给您的好友指一条</p>
			<p className='font1375'>高价卖车之路吧~</p>
		</div>
	}
}

export default ShareMount