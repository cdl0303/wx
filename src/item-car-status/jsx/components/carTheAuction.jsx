import React from 'react';
import youyiche from 'youyiche'

//车辆竞拍中
class CarTheAuction extends React.Component {
    constructor(props) {
        super(props);
       
        this.common = {
            InterValObj:null
        }
        this.state = {
            hour:'00', //时
            minite:'00', //分
            second:'00', //秒
        }
    }
    componentDidMount() {
        this.countDown(this.props)
    }
    componentWillReceiveProps(nextProps){
        window.clearInterval(this.common.InterValObj); 
        this.countDown(nextProps)
    }

    //竞拍倒计时
    countDown(props){ 
        var self = this;
        var chaTime = props.carStatusInfo.left/1000;
        var second,minite,hour;
        if(chaTime>0){
            setRemainTime();
            this.common.InterValObj = window.setInterval(setRemainTime, 1000);
        }
        function setRemainTime(){
            if (chaTime > 0) { 
                chaTime = chaTime - 1;
                second = parseInt(chaTime % 60);             // 计算秒     
                minite = parseInt((chaTime / 60) % 60);      //计算分 
                hour = parseInt((chaTime / 3600) % 24);      //计算时
                if(hour<10){
                    hour = '0' + hour;
                }
                if(minite<10){
                    minite = '0' + minite;
                }
                if(second<10){
                    second = '0' + second;
                }
                self.setState({
                    hour:hour,
                    minite:minite,
                    second:second
                })
            }
            else{
                window.clearInterval(this.common.InterValObj); 
            }
        }
    }

    render() {
    	//车辆竞拍中
        return <div>
        	<div className='carTheAuction'>
        		<div>
	        		<span className='colorBlack'>竞拍倒计时</span>
	        		<span className='floatRight colorBlack'>
                        <i className='hour'>{this.state.hour}</i>:
                        <i className='minite'>{this.state.minite}</i>:
                        <i className='second'>{this.state.second}</i>
                    </span>
        		</div>
                <div className='line'></div>
                <p className='priceWord font0750 colorBlack'>出价次数(次)</p>
                <p className='priceNum colorBlue'>{this.props.carStatusInfo.bidding_times}</p>
                <p className='des font0750 colorLightGray'>*往往单车出价次数超过15次就能获得很好的价格哟</p>
        	</div>
        </div>;
    }
}

//车辆竞拍中
export default CarTheAuction;
