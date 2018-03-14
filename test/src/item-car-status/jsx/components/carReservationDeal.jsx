import React from 'react';
import youyiche from 'youyiche'
import itemConfig from 'itemConfig'

//车辆预约交易
class CarReservationDeal extends React.Component {
    constructor(props) {
        super(props);
        var state = this.changeProps(props);
        this.state = state;
        this.common = {
            baiduMapHeight:document.body.clientWidth*0.64 +'px',
            topImg:require('../../img/topImg4.png'),
            carryContent:['身份证','车辆行驶证','车辆产证','钥匙及备用钥匙'],
            hrefSvg: require('svgSymbol'),
        }
    }
    changeProps(props){
        var state = {
            coord:props.carStatusInfo.where.coord//坐标
        }
        return state;
    }

    componentDidMount() {
        this.baiduMapProps(this.props)
    }

    componentWillReceiveProps(nextProps){
        var state = this.changeProps(nextProps)
        this.setState(state,()=>{
            this.baiduMapProps(nextProps);
        });
       
    }
    baiduMapProps(props) {
        //百度地图
        if(props.carStatusInfo.where.coord!=''){
            var lon = props.carStatusInfo.where.coord.split(",")[0];  
            var lat = props.carStatusInfo.where.coord.split(",")[1];
            itemConfig.baiduMap(lon,lat,14,[props.carStatusInfo.where.coord]);
        }
    }
    render() {
        let self = this;
    	//车辆预约交易
        return <div className='carReservationDeal'>
                {
                    this.state.coord !=''?
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
                {
                    <div className='dealBox dealMaterial'>
                        <p className='colorBlack'>需携带内容</p>
                        <div className='line'></div>
                        <ul>
                            {
                                this.common.carryContent.map((content,index)=>{
                                    return(
                                        <li>
                                            <svg>
                                                <use xlinkHref={ self.common.hrefSvg+'#gou'}></use>
                                            </svg>
                                            <span className='colorBlack'>{content}</span>
                                        </li>
                                    ) 
                                })
                            } 
                        </ul>
                        
                    </div>
                }
            </div>
    }
}

//车辆预约交易
export default CarReservationDeal;
