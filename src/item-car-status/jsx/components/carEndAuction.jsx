import React from 'react';
import youyiche from 'youyiche'

//车辆竞拍结束
class CarEndAuction extends React.Component {
    constructor(props) {
        super(props);
        //车辆竞拍结束
        var state = this.changeProps(props);
        this.state = state;
        this.expandCarDetail = this.expandCarDetail.bind(this)
    }
    expandCarDetail(){
        this.setState({
            expand:this.state.expand ? false:true
        })
    }
    changeProps(props){
        var state = {
            expand:false,//是否展开
            when:youyiche.formatTime(props.carStatusInfo.when,'string','-',false),//释放时间
            price:props.carStatusInfo.price,//最终报价
            chaTime:parseInt((new Date().getTime() - props.carStatusInfo.when)/1000/3600),//当前时间减去报价释放时间,//时间差24 24-72 72以上  三种ui
            regDate:youyiche.formatTime(props.carStatusInfo.vehicle.regDate,'string','-',false)//上牌日期
        }
        return state;
    }
    componentWillReceiveProps(nextProps){
        var state = this.changeProps(nextProps)
        this.setState(state)
    }

    render() {
    	//车辆竞拍结束
        return <div className='carEndAuction'>
        	<div className='carPrice'>
        		<div>
	        		<span className='colorBlack'>报价日期：{this.state.when}</span>
	        		<span className='colorLightGray colorBlack floatRight'>有效期三天</span>
        		</div>
                <div className='line'></div>
                <p className='priceWord font0750 colorBlack'>最终报价(元)</p>
                <p className='priceNum colorBlue'>{this.state.price.toString().replace(/\B(?=(?:\d{3})+\b)/g, ',')}</p>
        	</div>
        	<div className='carDetail'>
        		<div onClick={this.expandCarDetail}>
	        		<span className='detailTitle colorBlack'>详细车辆记录</span>
	        		<span className={this.state.expand ? 'arrow expand colorLightGray floatRight':'arrow  colorLightGray floatRight'}></span>
        		</div>
        		<div className={this.state.expand ? 'detailInfo clearfix  px-one-border px-one-border-top':'detailInfo none clearfix  px-one-border px-one-border-top'}>
        			<div className='clearfix'>
        				<div className='carImg imgAdaptive'>
	        				<img src={this.props.carStatusInfo.vehicle.pic}/>
	        			</div>
	        			<div className='carDes'>
	        				<p className='des1 font0750 colorBlack'>{this.props.carStatusInfo.vehicle.modle_info}</p>
	        				<p className='des2 font0750 colorLightGray'>{this.state.regDate.substr(0, 4)}上牌&nbsp;{this.props.carStatusInfo.vehicle.mile.toString().replace(/\B(?=(?:\d{3})+\b)/g, ',')}公里</p>
	        			</div>
        			</div>
        			<p className='px-one-border px-one-border-top colorBlack font0750 carNum carInfoP'>
	        			<span>牌照：</span>
	        			<span className=''>{this.props.carStatusInfo.vehicle.plate}</span>
        			</p>
        		</div>
        	</div>
            <div className='bottomTel px-one-border px-one-border-top'>
                {
                    this.state.chaTime<=24?
                    <a href='tel:4008216161' className='font1000 status1'>报价满意 预约交易</a>:''
                }
                {
                    this.state.chaTime>24 && this.state.chaTime<=72?
                    <div className='status2'>
                        <a href='tel:4008216161' className='font1000'>
                            <p className='colorBlue'>提供竞品报价</p>
                            <p className='font0625'>我们为您争取更高价！</p>
                        </a>
                        <a href='tel:4008216161' className='font1000'>确认交易</a>
                    </div>
                    :''
                }
                {
                    this.state.chaTime>72?
                    <a href='tel:4008216161' className='font1000 status3'>我想再拍一次</a>:''
                }
            </div>
        </div>;
    }
}

//车辆竞拍结束
export default CarEndAuction;
