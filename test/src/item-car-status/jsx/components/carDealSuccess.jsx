import React from 'react';
import ShareMount from './shareMount.jsx'

//车辆交易成功
class CarDealSuccess extends React.Component {
    constructor(props) {
        super(props);
        //车辆交易成功
        this.state = {
            shareMount:false
        }
        //提交评论成功
        this.common = {
            successDealImg:require('../../img/successDealImg.png')
        }
        this.shareButton = this.shareButton.bind(this)
    }
    shareButton(){
        this.setState({
            shareMount:true
        })
    }
    render() {
    	//车辆交易成功
        return <div className='carDealSuccess'>
        	<div className='dealbox'>
        		<img className='successDealImg' src={this.common.successDealImg}/>
        		<p className='colorBlack'>您的爱车</p>
        		<p className='colorBlack'> 成功通过又一车出售啦！</p>
        		<button className='buttonDefault' onClick={this.shareButton} >推荐朋友卖高价</button>
        	</div>
            <ShareMount shareMount={this.state.shareMount}/>
        </div>;
    }
}

//车辆交易成功
export default CarDealSuccess;
