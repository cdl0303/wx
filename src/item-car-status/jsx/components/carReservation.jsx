import React from 'react';
import youyiche from 'youyiche'
import itemConfig from 'itemConfig'

//待预约状态
class CarReservation extends React.Component {
    constructor(props) {
        super(props);
        //待预约状态
        this.displayName = 'carReservation';
        this.state = {
            allData:null,
        	detectionLocation:null,
        	hrefSvg:require('svgSymbol'),
            markerArr:[],//百度地图点位gps数组
            cityList:[],//城市列表
            cityName:'',//当前城市
            selectCity:false,//选择弹层
            coord:false//有无坐标
        }
        this.common = {
            baiduMapHeight:document.body.clientWidth*0.64 +'px',
            topImg:require('../../img/topImg3.png'),
        }
        this.closeListPop = this.closeListPop.bind(this);
        this.cutoverCity = this.cutoverCity.bind(this);
        this.selectCity = this.selectCity.bind(this);
        this.currentLocation = this.currentLocation.bind(this);
    }
    componentWillMount() {
        var self = this;
        //获取城市接口
        youyiche.getData({
            url:itemConfig.api.getCity
        }).then(function(data){
            if(!data.success){
                return;
            }
            self.setState({
                cityList:data.ret,
                cityName:data.ret[0]
            })
            self.getCityShop(data.ret[0])
        })
    }
    //切换城市按钮
    cutoverCity(){
        this.setState({
            selectCity:this.state.selectCity?false:true
        })
    }

    //选择城市
    selectCity(city){
        this.getCityShop(city);
        this.setState({
            selectCity:false
        })
    }

    getCityShop(city){
        var self = this;
        //获取该城市的监测点
        youyiche.getData({
            url:itemConfig.api.getShop,
            data:{
                city:city
            }
        }).then(function(data){
            if(!data.success){
                return;
            }
            self.setState({
                detectionLocation:data.ret,
                allData:data.ret,
                cityName:city
            },()=>{
                self.showBaiDuMap(data.ret,10);
            })
        })  
    }
    showBaiDuMap(location,level){
        var self = this;
        var markerArr=[];
        for(var i=0;i<location.length;i++){
            if(location[i].coord != ''){
                markerArr.push(location[i].coord)
            }
        }
        if(markerArr.length>0){
            self.setState({
                coord:true
            },()=>{
                var lon = markerArr[0].split(",")[0];  
                var lat = markerArr[0].split(",")[1];
                itemConfig.baiduMap(lon,lat,level,markerArr); 
            })
        }
        else{
            self.setState({
                coord:false
            })
        }
    }

    //查看某一个检测点的百度地图位置
    currentLocation(location){
        //点击检测点回到顶部
        document.body.scrollTop = 0;
        this.showBaiDuMap([location],14);
    }

    //点击任何地方关闭城市列表
    closeListPop(){
        if(this.state.selectCity){
            this.setState({
                selectCity:false
            })
        }
    }

    render() {
        if(this.state.allData){
            //待预约状态
            return <div className='carReservation' onClick={this.closeListPop}>
                {
                    this.state.coord?
                    <div id='baiduMap' style={{height:this.common.baiduMapHeight}}></div>
                    :
                    <img className='carDealImg' src={this.common.topImg} />  
                }
                <div className='reservationBox'>
                    <p className='reservationCity colorBlack px-one-border px-one-border-bottom'>
                        <span>{this.state.cityName}</span>
                        <span onClick={this.cutoverCity}>
                            <svg>
                                <use xlinkHref={ this.state.hrefSvg +'#gps'}></use>
                            </svg>
                            <span>切换城市</span>
                        </span>
                        <div className={this.state.selectCity ? 'selectCity':'selectCity none'}>
                            <span className='cusp'></span>
                            <ul>
                            {
                                this.state.cityList.map((city,index)=>{
                                    return(
                                        <li className='cityLi citySelect font0750 px-one-border px-one-border-bottom' onClick={this.selectCity.bind(this,city)}>{city}</li>
                                    )
                                })  
                            }
                            </ul>
                        </div>
                    </p>
                    <p className='locationTitle colorBlack'>又一车定点检测点</p>
                    <div className='line'></div>
                    {
                        this.state.detectionLocation.length > 0 ?
                            <div>
                                <ul className='detectionLocation'>
                                    {
                                        this.state.detectionLocation.map((location,index)=>{
                                            return(
                                                <li className='location colorBlack font0750 px-one-border px-one-border-top' onClick={this.currentLocation.bind(this,location)}>
                                                    <span>检测点{index+1}：</span>
                                                    <span className='colorBlue'>{location.name}</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            :
                            <div className='noLocation'>暂无检测点</div>
                    }
                    
                </div>
                <div className='footerButton px-one-border px-one-border-top'>
                    <a href='tel:4008216161'>联系客服，确定检测时间及地点</a>
                </div>
            </div>;
        }
        else{
            return false;
        }
    }
}

//待预约状态
export default CarReservation;
