import React from 'react';
import youyiche from 'youyiche'
import itemConfig from 'itemConfig'

//车辆预约检查
class CarArrangeDetection extends React.Component {
    constructor(props) {
        super(props);
        var state = this.changeProps(props);
        this.state = state;
        this.common = {
            topImg:require('../../img/topImg2.png'),
            baiduMapHeight:document.body.clientWidth*0.64 +'px'
        }
    }

    changeProps(props){
        var state = {
            titlePng:props.carStatusInfo.examinant.head||require('../../img/defaultHeadPic.png'),
            coord:props.carStatusInfo.where.coord//坐标
        }
        return state;
    }

    componentWillReceiveProps(nextProps){
        var state = this.changeProps(nextProps)
        this.setState(state,()=>{
            this.starNum(); 
        });
    }

    componentDidMount() {
        this.starNum()
    }

    //改变评分和百度地图
    starNum(){
        //星星清零
        for(var i = 0; i < 5; i++){
            document.getElementsByClassName('starNum')[i].style.backgroundPosition = '0 0px';
        }
        var starNum = this.props.carStatusInfo.examinant.rate;
        for(var i = 0; i < 5; i++){
            if(i<starNum){
                document.getElementsByClassName('starNum')[i].style.backgroundPosition = '0 -14px';
            }
        }
        //百度地图
        if(this.state.coord !=''){
            var lon = this.state.coord.split(",")[0];  
            var lat = this.state.coord.split(",")[1];
            itemConfig.baiduMap(lon,lat,14,[this.state.coord]);
        }
    }
    render() {
        return <div className='carArrangeDetection'>
            {
                this.state.coord != ''?
                <div id='baiduMap' style={{height:this.common.baiduMapHeight}}></div>
                :
                <img className='carDealImg' src={this.common.topImg} />  
            }
            <div className='dealBox dealInfo'>
                <p className='px-one-border px-one-border-bottom'>
                    <span className='colorLightGray'>预约时间：</span>
                    <span className='colorBlack'>{youyiche.formatTime(this.props.carStatusInfo.when,'string','-',false)}</span>
                </p>
                <p>
                    <span className='colorLightGray'>预约地点：</span>
                    <span className='colorBlack'>{this.props.carStatusInfo.where.name}</span>
                </p>
            </div>
            <div className='testEngineer'>
                <p className='colorBlack'>您的专属检测师</p>
                <div className='line'></div>
                <div className='titlePart'>
                    <div className='leftPic'>
                        <div className='centerPicMenu imgAdaptive'>
                            <img src={this.state.titlePng}/>
                        </div>
                    </div>
                    <div className='rightWord'>
                        <p className='centerName colorBlack'>
                            <span>{this.props.carStatusInfo.examinant.name}</span>
                            
                        </p>
                        <ul className='starNumUl'>
                            <li className='starNum'></li>
                            <li className='starNum'></li>
                            <li className='starNum'></li>
                            <li className='starNum'></li>
                            <li className='starNum'></li>
                        </ul>
                        <p className='centerName colorLightGray font0750'>已检测{this.props.carStatusInfo.examinant.count}台车，{this.props.carStatusInfo.examinant.rate_count}名客户评价过</p>
                    </div>  
                </div>
            </div> 
        </div>;
    }
}

export default CarArrangeDetection;
