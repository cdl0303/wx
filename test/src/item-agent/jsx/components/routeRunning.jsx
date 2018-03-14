import youyiche from '../../../base-common/js/youyiche.js'
import React from 'react'
import Loading from './loading.jsx'
import RunningCar from './runningCar.jsx'
import NoMessage from './noMessage.jsx'
import itemConfig from '../../js/itemConfig.js'
var staticImg = {
  running:{
    imgUrl:require('../../img/icon10.png'),
    note:'暂无进行中车源'
  }
};
var Running = React.createClass({
  getInitialState:function(){
    return { 
      runningList : [],
      logList:[],
      page:1,
      scrolling :true,
      loading:true,
      dataEnd:false,
    }
  },
  scrolling:{
    num:1,
    pushGetData:[],
    isEnd:false,
  },
  componentDidMount:function(){
    TDAPP.onEvent ("车源跟踪页打开次数","合伙人");
    //var that = this;
    //this.loadData();
  },
  addScrollFun(){
    this.handleScroll(this.scrolling);
  },
   handleScroll(scrolling){
   
    if(itemConfig.getScrollTop() + itemConfig.getWindowHeight() == itemConfig.getScrollHeight()){
       
       if(!scrolling.isEnd){
          scrolling.num += 1;
          this.loadData(scrolling.num);

       }
    }
  },
  componentWillMount:function(){
    
    this.addScrollFun = this.addScrollFun.bind(this);
    this.loadData(this.scrolling.num);    
    document.addEventListener('scroll', this.addScrollFun,false);
  },
  componentWillUnmount(){
      document.removeEventListener('scroll', this.addScrollFun,false);  //销毁监听事件
      this.scrolling.num = 1;      //恢复第一页
      this.scrolling.pushGetData = [];
  },
  // componentWillUnmount:function(){
  //   $(window).off('scroll',null);
  // },
  loadData:function (index) {
    var that = this;
    // const data = {"success":true,"token_invalid":true,"ret":{"records":[{"status":3,"name":"\u9648\u5148\u751f","create_at":1461495162000,"brand":"\u6bd4\u4e9a\u8fea","series":"\u79e6","vnId":"102473","cid":"69821"}],"logs":[]}}
    youyiche.getData({
      url:itemConfig.api.getCars+"?page="+index
    })  
      .then(
        (data)=>{
          that.setState({
            loading:false
          });
          if(data.errcode != 0){
             that.scrolling.isEnd = true;
            return
          }
         if(data.data.length > 0){
            that.scrolling.isEnd = false;
            for(var i=0;i<data.data.length;i++){
              data.data[i].date = data.data[i].date.replace(/-/g,'.'); 
            }
            if(data.data.length < 20){
                that.setState({
                  dataEnd:false
                })
            }else{
              that.setState({
                dataEnd:true
              })
            }
            that.setState({
              runningList:that.state.runningList.concat(data.data),
              //logList:that.state.logList.concat(data.ret.logs),
              scrolling:true
            })
            //$(window).on('scroll',that.scroll);
          }else{
            that.scrolling.isEnd = true;
          }
        }
      )
  },
  render:function(){ 
    if(!this.state.loading){
      if(this.state.runningList.length != 0){
        return(
          <div className='running-page' >
            <RunningCar value={ this.state.runningList }  log = {this.state.logList} firstnid={this.state.runningList[0].need_id}/>
            <div className="pullMore">{this.state.dataEnd ? "下拉加载更多......" : "没有更多了......"}</div>
          </div>
        )
      }else{
        return(
          <NoMessage value={ staticImg.running } />
        )
      }
    }else{
      return (
        <Loading />
      )
    }
  }
})
export default Running