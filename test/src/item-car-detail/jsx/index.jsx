/**
车商H5页面
*
*/
import React from 'react'
import { Router,Route,IndexRoute,Link,IndexLink,hashHistory,StateMixin} from 'react-router'
import ReactDOM from 'react-dom'
import NavBtn from './components/navBtn.jsx'
import NavHandle from './components/navHandle.jsx'
import CountDown from './components/countDown.jsx'
import DownTime from './components/downTime.jsx'
import HistoryPrice from './components/historyPrice.jsx'


require('../sass/index.scss')

var CarDetail = React.createClass({
  getInitialState(){
    return {
      isAppOpen:false,//app打开  默认不是
      showVersion:false,
      isAndroid:false,
    }
  },
  commonParms:{
    doPrice:false,
    nav:[
      {value: '概况',takeData:"",matter:false},
      {value: '外观',takeData:"_report_waiguan",matter:false},
      {value: '骨架',takeData:"_report_gujia",matter:false},
      {value: '内饰',takeData:"_report_neishi",matter:false},
      {value: '机械',takeData:"_report_jixiejidianqi",matter:false}
    ],
    swiperImages:[],
      app:{},
      wg:[],
      gj:[],
      ns:[],
      jx:[],
    },

  imgHandle(imgs) {
      var images = [];
      var w = window.devicePixelRatio * window.innerWidth;
      if(w>1200){
          w = 1200;
      }
      //图片像素
      var dips = w + 'x' + (w * 0.75);
      //图片截取的宽高
      for (var i = 0; i < imgs.length; i++) {
          images[i] = 'http://static.youyiche.com/' + imgs[i] + '?imageMogr2/thumbnail/!' + dips + 'r/gravity/Center/crop/' + dips + '/strip|watermark/1/image/aHR0cDovL2Fzc2V0LnlvdXlpY2hlLmNvbS9pbWFnZXMvd2F0ZXIucG5n/dissolve/50/gravity/SouthEast/ws/0.1';
      }
      return images;
  },
  
  setMatter(data,nav){
    for(let i=0;i<data.length;i++){
        if(data[i].name == "外观" && data[i].degree != 0){
          nav[1].matter = true;
        }else if(data[i].name == "骨架" && data[i].degree != 0){
          nav[2].matter = true;
        }else if(data[i].name == "内饰" && data[i].degree != 0){
          nav[3].matter = true;
        }else if(data[i].name == "机械及电器" && data[i].degree != 0){
          nav[4].matter = true;
        }
    }

  },
    //跳转历史价格
  checkHistory(){
     //window.location.href = "#/historyPrice";
     let spUrl = "http://"+window.location.host+window.location.pathname+"#/historyPrice";
     if(AppParam && AppParam.priceSearch){
         AppParam.priceSearch(spUrl);
     }else{
        this.setState({
          showVersion:true
        })
     }
  },
  closeUpop(){
    this.setState({
      showVersion:false
    })
  },
  toUpdate(){
    window.location.href = "https://itunes.apple.com/us/app/you-yi-che-zhuan-ye-ban/id960188924?mt=8&uo=4";
  },
  componentWillMount(){
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    if(isAndroid){
      this.setState({
        isAndroid:true
      })
    }
    if(typeof AppParam != "undefined"){
      this.setState({
        isAppOpen:true
      })
      this.commonParms.app = JSON.parse(AppParam.getH5Init());      
      // this.commonParms.app = {reward:'此星期你还剩下5次得手，即可获得500元现金!',leftTime:10000, downTime:100000,showPriceSearch: true,myPrice: 1000,onlyPrice:1000,vehicleorigin:'自营'}
    }
     this.commonParms.app = {reward:'此星期你还剩下5次得手，即可获得500元现金!',leftTime:111110,showPriceSearch: true,myPrice:100,onlyPrice:0,vehicleorigin:'自营'}
    // console.log(this.commonParms.app);
    
    this.commonParms.swiperImages = info.app_label_0 ? this.imgHandle(info.app_label_0) : [];
    this.setMatter(info.app_label_40,this.commonParms.nav);
  },
  render(){
    return (
     <div>
        <div className="carDetailBox">
            {
              this.state.isAppOpen ? <CountDown time={this.commonParms.app.leftTime}/> : ''
            }
            
            <NavHandle nav={this.commonParms.nav} isAppOpen={this.state.isAppOpen} swiperImgs={this.commonParms.swiperImages} app={this.commonParms.app}/>
            {
              !this.state.isAppOpen ? <NavBtn/> : ""
            }
            {
                this.commonParms.app.showPriceSearch ? <div className="checkHistory" onClick={this.checkHistory}>
                    <span className="historyPrice"></span>
                </div>
                : ''
            }
            <div className={this.state.showVersion ? "versonPop tc show" : "versonPop tc hide"}>
                <div className="bg"></div>
                <div className="versionBox">
                    <p className="versionTit">更新提醒</p>
                    <p className="versionTxt">
                      历史价格查询仅支持最新版本的<br/>
                      又一车APP
                    </p>
                    
                    {
                      this.state.isAndroid ? 
                      <div>
                        <p className="versionTxt">请前往我的-设置-关于又一车更新您的app</p>
                        <button className="versionBtn" onClick={this.closeUpop}>我知道了</button> 
                      </div>
                      : 
                      <div>
                        <p className="versionTxt">请更新您的app</p>
                        <button className="versionBtn" onClick={this.toUpdate}>立即更新</button>
                      </div>
                    }
                    
                    <span className="close" onClick={this.closeUpop}></span>
                </div>
            </div>
            
        </div>
     </div>
    )
  }
})
  var routes = (  
    <Router history={ hashHistory }>
      <Route path="/" component={ CarDetail }/>
      <Route path="carDetail" component={ CarDetail } />
      <Route path="historyPrice" component={ HistoryPrice } />
    </Router>
  );
  ReactDOM.render(routes,document.getElementById('carDetail'));
// ReactDOM.render(
//   <CarDetail/>,
//   document.getElementById('carDetail')
// );
