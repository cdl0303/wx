import youyiche from '../../../base-common/js/youyiche.js'
import React from 'react'
import FailureLog from './failureLog.jsx'
import NoMessage from './noMessage.jsx'
import Loading from './loading.jsx'
import itemConfig from '../../js/itemConfig.js'

//失效车源
var FailureSouce = React.createClass({

  getInitialState(){
    return { 
      failureCar: [],
      groupDate:[],
      loading:true,
      downIndex:null,
      failureLog:[],
      dataEnd:true
    }
  },
  failureParm:{
    failure:{
      imgUrl:require('../../img/icon12.png'),
      note:'暂无失效车源'
    }
  },
  scrolling : {
      pushGetData:[], //下拉加载的数据
      num:1,          //默认加载第一页
      isEnd:false
  },
  
  showDetail(nid,index){
    if(this.state.downIndex==index){
      this.setState({
        downIndex:-1
      })
    }else{
      this.refs["failureLog"+nid].showLog(nid);
      this.setState({
        downIndex:index
      })
    }
  },

  //加载数据
  loadIndexPage(index){
    var that = this;
    // console.log(this.scrolling.num);
      youyiche.getData({
        url:itemConfig.api.getCars+"?type=invalid&page="+index   //  +''+'&inValid=1'+'&isGroupDate=1' 上线放开
      })
        .then(
          (data)=>{
            that.setState({
              loading:true
            })
            if(data.errcode == 0){
              that.setState({
                loading:false
              })
              if(data.data.length == 0){
                  that.scrolling.isEnd = true;
                  that.setState({
                    dataEnd: false
                  })
              }else{
                that.scrolling.isEnd = false;
                for(var i=0;i<data.data.length;i++){
                  data.data[i].date = data.data[i].date.replace(/-/g,'.'); 
                }
                if(data.data.length < 20 && data.data.length > 0){
                    that.setState({
                      dataEnd:false
                    })
                }else{
                  that.setState({
                    dataEnd:true
                  })
                }
                that.scrolling.pushGetData = that.scrolling.pushGetData.concat(data.data);
                that.setState({
                  failureCar: that.scrolling.pushGetData
                })
              }  
            }else{
              that.setState({
                loading:false
              })

            }
          }
        )
  },
  addScrollFun(){
    this.handleScroll(this.scrolling);
  },
  componentWillMount:function(){
   
    this.addScrollFun = this.addScrollFun.bind(this);
    this.loadIndexPage(this.scrolling.num);
    if(itemConfig.getScrollTop() > 0){
     // console.log("999");
      document.body.scrollTop=0;
    } 
    document.addEventListener('scroll', this.addScrollFun,false);
  },
  componentWillUnmount(){
      document.removeEventListener('scroll', this.addScrollFun,false);  //销毁监听事件
      this.scrolling.num = 1;      //恢复第一页
      this.scrolling.pushGetData = [];
  },
  handleScroll(scrolling){
    
    if(itemConfig.getScrollTop() + itemConfig.getWindowHeight() == itemConfig.getScrollHeight()){

       // console.log("111");
       
       if(!scrolling.isEnd){
          scrolling.num += 1;
          this.loadIndexPage(scrolling.num);

       }
        

    }
  },
  render:function(){
      if(!this.state.loading){
          return(
            <div className="failureSouce">
                {
                  this.state.failureCar.length >0 ? 
                  <div>
                    <ul className="invalidUl">
                      {
                        this.state.failureCar.map(function(item,i){
                          return(
                            <li className={this.state.downIndex == i ? "invalidLi px-one-border px-one-border-all show" : "invalidLi px-one-border px-one-border-all"} onClick={ this.showDetail.bind(this,item.need_id,i) }>
                                <div  className="failureTit">
                                  <p className="failureTxt">{item.name}&nbsp;&nbsp;{item.brand}&nbsp;&nbsp;{item.series}</p>
                                  <p className="invalidTime">失效时间 {item.date} id:{item.need_id}</p>
                                </div>
                                <FailureLog ref={"failureLog"+item.need_id} />
                            </li>
                          )
                        },this)
                      }
                  </ul>
                  <div className="pullMore">{this.state.dataEnd ? "下拉加载更多......" : "没有更多了......"}</div>
                </div>
                :
                <NoMessage value={ this.failureParm.failure } />
                }
            </div>
          )
      }else{
        return (<Loading />)
      } 
      
  }
});
export default FailureSouce