/*
*顶部导航
*
*/
import React from 'react'
import SwiperImg from './swiper.jsx'
import Survey from './tabSurvey.jsx'
import Appearance from './tabAppearance.jsx'
import Cytoskeleton from './tabCytoskeleton.jsx'
import Mechanics from './tabMechanics.jsx'
import Modules from './tabModules.jsx'
import PicPop from './picPop.jsx'


var NavHandle = React.createClass({
  getInitialState:function(){
    return {
      index:0, //默认选中第一个
      tabIndex:0,
      showPop:false,
      images:[],//查看大图数组
    }
  },
  commonNav:{
    waiguanPics:[],
    neishiPics:[],
    gujiaPics:[],
    jixiePics:[],
    waiguanDegree:[],
    neishiDegree:[],
    gujiaDegree:[],
    jixieDegree:[],
    noRepeatWg:[],
    tabClick:null
  },
  
  //调用客户端方法
  navSwitch:function(val,str,key){
    this.commonNav.tabClick.slideTo(key, 100, false);
    this.setState({
      tabIndex:key
    })
    if(this.props.isAppOpen){
      if(str != ""){
         AppParam.talkingDataCollect(val+"|"+str)
      }else{
        
         AppParam.talkingDataCollect(val)
      }
    }
    
    
    $(document).scrollTop(0);
  },

  //绑定事件
  handle:function(value,key,str){
    var that = this;
    that.setState({
      index:key
    });
    if(value == "概况"){
      that.navSwitch(value,"",key);
    }else{
      that.navSwitch(value,str,key);
    }
   
  },
  //查看大图
  showPics(key,num,str,data){ 
    if(typeof AppParam != "undefined"){
      info['app_label_80']['num'] = num;
      info['app_label_80']['index'] = key;
      AppParam.showCarPic(JSON.stringify(info['app_label_80']));
      AppParam.talkingDataCollect(str);
    }else{
      this.setState({
        showPop:true,
        index:key,
        images:data
      },function(){
        this.refs.getPopFun.handelInfo(this.state.index);
      });
    }
  
  },

  hidePoP(){
    this.setState({
      showPop:false
    })
  },
  //区分 1:外观 2:骨架 3:内饰 4:机械
  handelDegree:function(data){
    for(let i=0;i<data.length;i++){
      if(data[i].name == "外观"){
        this.commonNav.waiguanDegree.push(data[i])
      }else if(data[i].name == "骨架"){
        this.commonNav.gujiaDegree.push(data[i])
      }else if(data[i].name == "内饰"){
        this.commonNav.neishiDegree.push(data[i])
      }else if(data[i].name == "机械及电器"){
        this.commonNav.jixieDegree.push(data[i])
      }
    }
  },
  handePic:function(images){
    for(let i=0;i<images.res.length;i++){
      // images.res[i] = images.res[i].filter(function(item){
      //     return item.img != "noimg";
      // });
      for(let j=0;j<images.res[i].length;j++){
        images.res[i][j].title = images.res[i][j].detail.split(":")[0];
        images.res[i][j].value = images.res[i][j].detail.split(":")[1];
        images.res[i][j].isRepeat = false;

        if(images.res[i][j].degree == 6){
          images.res[i][j].degreeTxt = "重度"
        }else if(images.res[i][j].degree == 5){
          images.res[i][j].degreeTxt = "较差"
        }else if(images.res[i][j].degree == 4){
          images.res[i][j].degreeTxt = "中度"
        }else if(images.res[i][j].degree == 3){
          images.res[i][j].degreeTxt = "一般"
        }else if(images.res[i][j].degree == 2){
          images.res[i][j].degreeTxt = "轻微"
        }else if(images.res[i][j].degree == 1){
          images.res[i][j].degreeTxt = "较好"
        }

        if(images.res[i][j].img != "noimg"){
            if( !/^http:\/\//i.test(images.res[i][j].img)){
              images.res[i][j].img = "http://static.youyiche.com/"+images.res[i][j].img
            }
            
        }
        if(images.res[i][j].name == "外观"){
          this.commonNav.waiguanPics.push(images.res[i][j]);
        }else if(images.res[i][j].name == "内饰"){
          this.commonNav.neishiPics.push(images.res[i][j]);
        }else if(images.res[i][j].name == "骨架"){
          this.commonNav.gujiaPics.push(images.res[i][j]);
        }else if(images.res[i][j].name == "机械及电器"){
          this.commonNav.jixiePics.push(images.res[i][j]);
        }
       
      }
      
    }
  },
  changeImages(data){
      this.setState({
        images:data
      })
  },
  handleRepeat:function(data){//重复位置不会在前端显示
    let newArr = [],isRepeat=false;
    for(let i=0;i<data.length;i++){
      isRepeat=false;
      for(let m =0;m<newArr.length;m++){
        if(data[i].title == newArr[m].title){
           data[i].isRepeat = true; 
           isRepeat = true;
        }
      }
      if(!isRepeat){
        newArr.push(data[i])
      }
    }
    // console.log(data);
    return data;
  },

  changeTab(index){
    this.setState({
      tabIndex:index
    })
  },
  //初始化swiper
  initBoxItem(){
      var that = this;
      that.commonNav.tabClick = new Swiper ('.initBox-container', {
          direction: 'horizontal',
          pagination: '.initBox-pagination',
          initialSlide:0,
          paginationClickable :true,
          threshold :100,
          followFinger:false,
          onSlideNextStart:function(swiper){
            that.changeTab(swiper.activeIndex);
          },
          onSlidePrevStart:function(swiper){
            that.changeTab(swiper.activeIndex);
          },
      });

  },
  componentDidMount:function(){
    this.initBoxItem();
    var navH = $(".navBtn").length > 0 ? 90 : 40;
    var windowH = $(window).height();
    var realHeight = windowH-navH;
    $(".fixedH .appearance").css({"height":realHeight+"px"});
  },
  componentWillMount:function(){
    this.handePic(info.app_label_80);
    this.handelDegree(info.app_label_40);
    this.commonNav.waiguanPics = this.handleRepeat(this.commonNav.waiguanPics); 
    this.commonNav.gujiaPics = this.handleRepeat(this.commonNav.gujiaPics); 
    this.commonNav.neishiPics = this.handleRepeat(this.commonNav.neishiPics); 
    this.commonNav.jixiePics = this.handleRepeat(this.commonNav.jixiePics); 
  },
  componentWillUnmount(){

    this.commonNav.waiguanPics = [];
    this.commonNav.neishiPics = [];
    this.commonNav.gujiaPics = [];
    this.commonNav.jixiePics = [];
    this.commonNav.waiguanDegree = [];
    this.commonNav.neishiDegree = [];
    this.commonNav.jixieDegree = [];
  },
  render:function(){
    return (
      <div>
        <div className="nav">
          <ul>
             {
              this.props.nav.map((item,key)=>{
                return(
                  <li key={item.value} onClick={this.handle.bind(this,item.value,key,item.takeData)} className={this.state.tabIndex == key ?'hover':''}>{item.value}{item.matter ? <span className="redIcon"></span> : ''}</li>
                )
              })
             }
          </ul>
        </div>

        <div className="initBox" id="initBox">
          <div className="swiper-container initBox-container" >
            <div className="swiper-wrapper">
                <div className="swiper-slide">
                    <div className="fixedH">
                      <div className="appearance">
                        <SwiperImg images={this.props.swiperImgs}/>
                        <Survey app={this.props.app} isAppOpen={this.props.isAppOpen}/>
                        
                        <div className="reserveRoom"></div>
                      </div>
                    </div>
                   
                </div>  
                <div className="swiper-slide">
                  <div className="fixedH">
                      <Appearance isAppOpen={this.props.isAppOpen} images={this.commonNav.waiguanPics} degreeInfo={this.commonNav.waiguanDegree} showPics={this.showPics}/>
                  </div>
                </div>  
                <div className="swiper-slide">
                  <div className="fixedH">
                    <Cytoskeleton isAppOpen={this.props.isAppOpen} images={this.commonNav.gujiaPics} degreeInfo={this.commonNav.gujiaDegree} showPics={this.showPics}/>
                  </div>
                </div> 
                <div className="swiper-slide">
                  <div className="fixedH">
                    <Modules isAppOpen={this.props.isAppOpen} images={this.commonNav.neishiPics} degreeInfo={this.commonNav.neishiDegree} showPics={this.showPics}/>
                  </div>
                </div> 
                <div className="swiper-slide">
                  <div className="fixedH">
                    <Mechanics isAppOpen={this.props.isAppOpen} images={this.commonNav.jixiePics} degreeInfo={this.commonNav.jixieDegree} showPics={this.showPics}/>
                  </div>
                </div>  
            </div>
            <div className="swiper-pagination initBox-pagination"></div>
          </div>
        </div>
        {
          this.state.showPop ? <div className={"picPopBox show"}>
              <div className="bg" onClick={this.hidePoP}></div>
              <PicPop ref="getPopFun" images={this.state.images} isShow={this.state.showPop} num={this.state.index} hidePoP={this.hidePoP}/>
            </div> 
          : ''
        }
      </div>
      
    )
  }
})
export default NavHandle