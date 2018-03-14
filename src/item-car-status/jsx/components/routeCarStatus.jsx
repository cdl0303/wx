import React from 'react';
import youyiche from 'youyiche'
import youyicheWX from 'youyicheWX'
import itemConfig from 'itemConfig'
import BottomCaption from './bottomCaption.jsx'
import CarVN from './carVN.jsx'
import CarReservation from './carReservation.jsx'
import CarArrangeDetection from './carArrangeDetection.jsx'
import CarDetection from './carDetection.jsx'
import CarTheAuction from './carTheAuction.jsx'
import CarEndAuction from './carEndAuction.jsx'
import CarReservationDeal from './carReservationDeal.jsx'
import CarDealSuccess from './carDealSuccess.jsx'

//有v的情况下，车辆的五种状态
class CarStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	carStatusMount:'',//车辆的状态的模块
            hrefSvg:require('svgSymbol'),
            carStatus:1,//1、代预约 2、待检测  3、检测中 4、竞拍中 5、报价释放 6、预约交易 7、交易成功
            carStatusInfo:'',//车辆当前状态的相关信息
            carVN:0,//是否有VN
            carStatusArray:[
                {name:'待预约',status:'phone'},
                {name:'待检测',status:'waitingdetection'},
                {name:'检测中',status:'detection'},
                {name:'竞拍中',status:'bidding'},
                {name:'竞拍结束',status:'biddingEnd'},
                {name:'预约交易',status:'trading'},
                {name:'交易成功',status:'successful'}
            ],//车辆7种状态数组
            carPlate:'',
            carList:[],
            selectCar:false,//选择车子弹层
            cid:'',//c端id
            bottomCaption:false//底部文字
        }
        this.common = {
            clientHeight:document.documentElement.clientHeight + 'px',
            timer:null,
            changeScroll:null
        }
        this.closeListPop = this.closeListPop.bind(this);
        this.closeCarVN = this.closeCarVN.bind(this);
        this.cutoverCar = this.cutoverCar.bind(this);
        this.selectCar = this.selectCar.bind(this);
        this.changeCarStatus = this.changeCarStatus.bind(this);
    }
    componentWillMount() {
        var self = this;
        //获取车辆列表
        youyiche.getData({
            url:itemConfig.api.getCarList
        }).then(function(data){
            if(!data.success){
                return;
            }
            var addCar = [{number: "", plate: "卖车登记", vid:'0000'}];
            var vid = youyiche.getParamByUrl('vid',false)
            //请求vn
            self.waitingVN(data.ret)
            //url是否有vid 如果有则直接进入该条车的状态
            if(vid){
                for(var i=0;i<data.ret.length;i++){
                    if(vid == data.ret[i].vid){
                        self.setState({
                            carList:data.ret.concat(addCar),
                            carPlate:data.ret[i].plate,
                            vid:data.ret[i].vid
                        })
                        self.getvehcileStatus(data.ret[i].vid)
                    }
                }
            }
            //没有vid时，第一辆车为默认
            else{     
                // //判断名下是否有v
                if(data.ret.length>0){
                    self.setState({
                        carList:data.ret.concat(addCar),
                        carPlate:data.ret[0].plate,
                        vid:data.ret[0].vid
                    })
                    self.getvehcileStatus(data.ret[0].vid)
                }
            }
        })
    }
    componentWillUnmount(){
        window.clearInterval(self.common.timer); 
    }
    waitingVN(carList){
        var self = this;
        //待跟进卖车需求,vn弹层
        youyiche.getData({
            url:itemConfig.api.waitingVN
        }).then(function(data){
            if(!data.success){
                return;
            }
            if(carList.length>0){
                document.getElementsByClassName('carStatus')[0].style.opacity = 1;
                self.setState({
                   carVN:data.ret
                })
            }
            else{
                var url = 'http://'+location.host+'/WxWeb/item-car-source/index.html?origin=m_weixin&carVN=' + data.ret;
                youyiche.locationChange(url,'replace');
                window.location.href = url;
            }
            self.common.timer = window.setInterval(()=>{
                if(self.state.cid != ''){
                //分享
                    youyicheWX.wxShare({
                        title:'我为大家推荐又一车二手车交易平台，卖车值得信赖！',
                        desc: '又一车服务免费，千余家车商竞价，让您的爱车价更高！',
                        link:'http://' + window.location.host+ '/WxWeb/item-car-source/index.html?origin=car_status&carVN=' + data.ret +'&cid=' + self.state.cid,
                        imgUrl: 'http://' + window.location.host+'/WxWeb/item-car-status/img/copy/share.png',
                        success:function(){
                           TDAPP.onEvent ("卖车动态客户转发",self.state.cid);
                        }
                    })
                    window.clearInterval(self.common.timer); 
                }
            }, 100);
           
        })
    }
     //获取具体车辆状态
    getvehcileStatus(vid){
        var self  = this;
        //获取车辆列表
        youyiche.getData({
            url:itemConfig.api.vehcileStatus,
            data:{
                vid:vid
            }
        }).then(function(data){
            if(!data.success){
                return;
            }
            self.setState({
                carStatus:data.ret.state,
                carStatusInfo:data.ret,
                cid:data.ret.cid,
                bottomCaption:data.ret.state == 2 || data.ret.state == 3 || data.ret.state == 4 || data.ret.state == 6 || data.ret.state == 7 ? true:false
            },()=>{
                self.showCarInfo();
            })
        })
    }
    //展示车辆的信息
    showCarInfo(){
        var self = this;
        //根据状态显示相关的组建
    	this.carStatusComponent(this.state.carStatus);

        //获取li数组
        var carStatusScheduleItem = document.getElementsByClassName('carStatusScheduleItem')
        //切换车辆时，样式初始化
        for(var i = 1 ; i< carStatusScheduleItem.length - 1 ;i++){
            carStatusScheduleItem[i].className = 'carStatusScheduleItem';
        }
        //根据后端返回的车辆状态，更改该状态的class
        carStatusScheduleItem[this.state.carStatus].className='carStatusScheduleItem current'

        //获取屏幕宽度
        var clientWidth = document.body.clientWidth;
        //获取html的font-size
        var getHtmlFontsize = parseFloat(window.getComputedStyle(document.documentElement, null).getPropertyValue('font-size'));

        //当车辆状态为待检测（第一种状态）时，需要算第一个li的宽度
        if(this.state.carStatus == 1){
            //获取状态为待预约时的svg宽度
            var getSvgWidth = parseFloat(window.getComputedStyle(carStatusScheduleItem[1].firstElementChild, null).getPropertyValue('width'));
            //更改第一个li的宽度
            carStatusScheduleItem[0].style.width = ((clientWidth - getSvgWidth)/2/getHtmlFontsize) +'rem';
        }
        
        //当车辆状态为交易成功（最后一种状态）时，需要算最后一个li的宽度
        if(this.state.carStatus == 7){
            //获取状态为交易成功时的li宽度
            var getLiwidth = parseFloat(window.getComputedStyle(carStatusScheduleItem[7], null).getPropertyValue('width'));
            //获取状态为交易成功时的svg宽度
            var getSvgWidth = parseFloat(window.getComputedStyle(carStatusScheduleItem[7].firstElementChild, null).getPropertyValue('width'));
            carStatusScheduleItem[8].style.width = (clientWidth/2-(getLiwidth-(getSvgWidth/2)))/getHtmlFontsize +'rem';
        }

        
        //获取ul
        var carStatusSchedule = document.getElementsByClassName('carStatusSchedule');
        var carStatusUlWidth = 0;
        for(var i = 0;i<carStatusScheduleItem.length;i++){
            carStatusUlWidth += parseFloat(window.getComputedStyle(carStatusScheduleItem[i], null).getPropertyValue('width'));
        }
        // 更改ul的宽度
        carStatusSchedule[0].style.width = carStatusUlWidth/getHtmlFontsize + 0.05 +'rem';

        var i=1;//变量i 长度
        var j=1;//变量j 滑动距离
        var liWidth =  5.55556*getHtmlFontsize;
        var linearWidth = 3.9*getHtmlFontsize;
        //改变scroll的位置
        // var changeScroll;

        //当前状态之前所有li的长度之和
        var currentStatusLength = 0;
        for(var i = 0;i<parseInt(this.state.carStatus);i++){
            currentStatusLength += parseFloat(window.getComputedStyle(carStatusScheduleItem[i], null).getPropertyValue('width'));
        }

        //第一个li的宽度
        var firstLinearMaskWidth = parseFloat(window.getComputedStyle(carStatusScheduleItem[0], null).getPropertyValue('width'))
        //最快速度执行
        this.common.changeScroll = window.setInterval(ChangeScrollLeft);
        
        //改变linearMask长度的功用方法
        function linearMaskLength(carStatus){
            carStatusScheduleItem[carStatus].getElementsByClassName('linearMask')[0].style.width = j - (liWidth*(carStatus - 1)) + 2.5  +'px';
        }

        function ChangeScrollLeft(){
            //充满第一个li
            if(i<=firstLinearMaskWidth){
                carStatusScheduleItem[0].getElementsByClassName('linearMask')[0].style.width = i *1.033 +'px';
                i+=2.5;
            }
            else if(firstLinearMaskWidth<i && i<currentStatusLength){
               
                if(j<=linearWidth){
                    linearMaskLength(1);
                }
                else if(j>=liWidth && j< (linearWidth + liWidth)){
                    linearMaskLength(2);
                }
                else if(j>=2*liWidth  && j< (linearWidth + (liWidth*2))){
                    linearMaskLength(3);
                }
                else if(j>=3*liWidth  && j< (linearWidth + (liWidth*3))){
                    linearMaskLength(4);
                }
                else if(j>=4*liWidth  && j< (linearWidth + (liWidth*4))){
                    linearMaskLength(5);
                }
                else if(j>=5*liWidth  && j< (linearWidth + (liWidth*5))){
                    linearMaskLength(6);
                }
                else if(j>=6*liWidth  && j< (linearWidth + (liWidth*6))){
                    linearMaskLength(7);
                }

                //滑动
                document.getElementById('carStatusBox').scrollLeft=j;
                i+=2.5;
                j+=2.5;
            }
            else if(i>=currentStatusLength){
                window.clearInterval(self.common.changeScroll); 
            }  
        }
    }

    //根据后台返回的状态（数字）转换成相关的react组件
    carStatusComponent(carStatus){
        switch(carStatus){
            case 1://待预约
                this.changeCarStatus(<CarReservation/>)
                break;
            case 2://待检测
                this.changeCarStatus(<CarArrangeDetection carStatusInfo={this.state.carStatusInfo}/>)
                break;
            case 3://检测中
                this.changeCarStatus(<CarDetection carStatusInfo={this.state.carStatusInfo}/>)
                break;
            case 4://竞拍中
                this.changeCarStatus(<CarTheAuction carStatusInfo={this.state.carStatusInfo}/>)
                break;
            case 5://竞拍结束（报价释放）
                this.changeCarStatus(<CarEndAuction carStatusInfo={this.state.carStatusInfo}/>)
                break;
            case 6://预约交易
                this.changeCarStatus(<CarReservationDeal carStatusInfo={this.state.carStatusInfo}/>)
                break;
            case 7://交易成功
                this.changeCarStatus(<CarDealSuccess/>)
                break;
          }
    }
    //更改车辆状态
    changeCarStatus(componentName){
        this.setState({
            carStatusMount:componentName
        })
    }
    //切换车辆按钮
    cutoverCar(){
        this.setState({
            selectCar:this.state.selectCar?false:true
        })
    }
    //点击任何地方关闭车辆列表
    closeListPop(){
        if(this.state.selectCar){
            this.setState({
                selectCar:false
            })
        }
    }
    //选择车辆
    selectCar(car){
        if(car.vid =='0000'){
            window.location.href = 'http://'+location.host+'/WxWeb/item-car-source/index.html?cid='+this.state.cid; 
        }
        else{
            if(car.vid != this.state.vid){
                window.clearInterval(this.common.changeScroll); 
                //清空linearMask
                for(var i=0;i<document.getElementsByClassName('linearMask').length;i++){
                    document.getElementsByClassName('linearMask')[i].style.width = '0px'
                }
                //滑动条回到初始位置
                document.getElementById('carStatusBox').scrollLeft=0;
                this.getvehcileStatus(car.vid)
                this.setState({
                    carPlate:car.plate,
                    vid:car.vid,
                    selectCar:false
                })
            }
        }
    }

    //关闭vn弹层
    closeCarVN(){
        this.setState({
            carVN:0
        })
    }

    render() {
        return <div className='carStatus' onClick={this.closeListPop} style={{height:this.state.carStatus == 4 ? this.common.clientHeight : null}}>
            <div >
                <div className='carStatusTop'>
                    <p className='carNumber font1000'>{this.state.carPlate}</p>
                    <svg className='changeCar' onClick={this.cutoverCar}>
                        <use xlinkHref={ this.state.hrefSvg +'#switch'}></use>
                    </svg>
                    <div className={this.state.selectCar ? 'selectCar':'selectCar none'}>
                        <span className='cusp'></span>
                        <ul>
                        {
                            this.state.carList.map((car,index)=>{
                                return(
                                    <li className='carLi carSelect font0750 px-one-border px-one-border-bottom' onClick={this.selectCar.bind(this,car)}>{car.plate}</li>
                                )
                            })  
                        }
                        </ul>
                    </div>
                    <div className='carStatusBox' id='carStatusBox'>
                    {
                        <ul className='carStatusSchedule'>
                            <li className='carStatusScheduleItem first'>
                                <span className='linear'></span>
                                <span className='linearMask'></span>
                            </li>
                            {
                                this.state.carStatusArray.map((carStatus,index)=>{
                                    return(
                                        <li className='carStatusScheduleItem'>
                                            <svg className='statusSvg'>
                                                <use xlinkHref={ this.state.hrefSvg +'#' + carStatus.status}></use>
                                            </svg> 
                                            <i className='statusName font0750'>{carStatus.name}</i>
                                            <span className='linear'></span>
                                            <span className='linearMask'></span>
                                        </li>
                                    )
                                })
                            }
                            <li className='carStatusScheduleItem last'>
                                <span className='linear'></span>
                                <span className='linearMask'></span>
                            </li>
                        </ul>  
                    } 
                    </div>
                </div>
                <div className='carStatusContent'>
                    {
                        this.state.carStatusMount
                    }
                </div>  
            </div>
            {
                this.state.bottomCaption? <BottomCaption />:''
            }  
            <CarVN carVN={this.state.carVN} closeCarVN = {this.closeCarVN}/>
    	</div>
    }
}

export default CarStatus;
