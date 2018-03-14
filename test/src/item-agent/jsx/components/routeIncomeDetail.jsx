/**
*新版    收入明细
*/
import youyiche from '../../../base-common/js/youyiche.js'
import React from 'react'
import Loading from './loading.jsx'
import itemConfig from '../../js/itemConfig.js'
import NoMessage from './noMessage.jsx'

var IncomeDetail = React.createClass({
   getInitialState:function(){
    return {
      status:'',
      detailData:[],
      scrollShow:false,
      fixed:false, // 浮动
      scrollData:[],
      loading:true,
      dataEnd:false,
      downIndex:null,
    }
  },
  detailParm:{
    scrollArr:[],
    pushGetData:[],
    page:1,
    dataArr:[],
    isEnd:false,
    report:{
      imgUrl:require('../../img/noIncome.png'),
      note:'您还没有产生收益，加油!'
    },
    index:''
  },
  handleData(data){
    var dataArr = this.detailParm.dataArr,
        hash={},
        date,
        i =0,
        j =0,
        had = false,
        itemHandel = null;
    var setTitle = function(date){
      var year = data[i].date.substring(0,4);
      var month = data[i].date.substring(5,7);
      return year+"年"+month+"月"
    };   

    for(i=0;i<data.length;i++){
      had = false;

      date = setTitle(data[i].date);
      data[i].date = data[i].date.substring(5,10).split("-")[0]+"-"+data[i].date.substring(5,10).split("-")[1];
      
      if(data[i].type == "1"){//检测
        data[i].typeClass = 'detailJC';
        data[i].typeText = '已检测'
       
      }else if(data[i].type == "2"){//成交
        data[i].typeClass = 'detailCJ';
        data[i].typeText = '已成交'
        
      }else if(data[i].type == "5" || data[i].type == "4"){//下线

        data[i].typeClass = 'detailGX';
        data[i].typeText = '下线贡献'
       
      }else if(data[i].type == "6" || data[i].type == "8" || data[i].type == "9"){//奖励
        data[i].typeClass = 'detailJL';
        data[i].typeText = '活动奖励'
      
      }
      for(j=0;j<dataArr.length;j++){
        if(date==dataArr[j].date){
          had = true;
          break;
        }
      }
      
      if(had){
        dataArr[j] && dataArr[j].itemData.push(data[i])

      }else{
        itemHandel = {
          date:date,
          itemData:[data[i]]
        }
        dataArr.push(itemHandel);
      }

    }
    //console.log(dataArr);
    return dataArr;
    
  },
  getIncomeDetailData(page,index){
    var that = this;
    youyiche.getData({
      url:itemConfig.api.getIncomeDetail+"?page="+page 
    })
    .then((data)=>{
        that.setState({
          loading:false
        })
        if(data.data.length == 0){
          that.setState({
            dataEnd:false
          })
          return;
        }
        if(data.data.length > 0){
          that.setState({
            loading:false
          });
          if(data.data.length < 20){
              that.setState({
                dataEnd:false
              })
          }else{

            that.setState({
              dataEnd:true
            })
          }

          let newData = data.data.filter(function(item){
            return item.amount!=0;
          });
          var detailData =that.handleData(newData);
          //that.detailParm.pushGetData = that.detailParm.pushGetData.concat(detailData);

          
          this.setState({
            detailData:detailData,
            loading:false
          },function(){
            that.getScrollData(index);
          })
        }else{
          that.scrolling.isEnd = true;
          this.setState({
            dataEnd:false,
            loading:true
          })
        }
    });
  },
  addScrollFun(){
    this.handleScroll(this.detailParm);
  },
  componentWillMount(){
    this.addScrollFun = this.addScrollFun.bind(this);
    this.getIncomeDetailData(this.detailParm.page);
    //监听滚动  
    document.addEventListener('scroll', this.addScrollFun,false);
    
  },
  componentWillUnmount(){
      document.removeEventListener('scroll', this.addScrollFun,false);  //销毁监听事件
      this.detailParm.page = 1;      //恢复第一页
      this.detailParm.pushGetData = [];
      this.detailParm.dataArr = [];
      this.detailParm.scrollArr = [];
  },

  getScrollData(index){
      $(".incomeDetailItem").eq(index).addClass("fixed").siblings().removeClass("fixed");
      this.detailParm.scrollArr = [];
      var item;
      var itemEnd = {
        element:$(".incomeDetailItem").eq(this.state.detailData.length-1),
        top:99999999
      }
      for(let i=1;i<this.state.detailData.length;i++){
          item = {
            element:$(".incomeDetailItem").eq(i-1),
            top:$(".incomeDetailItem").eq(i).position().top || 0,
          };
          this.detailParm.scrollArr.push(item);
      }
      this.detailParm.scrollArr.push(itemEnd);
      //console.log(this.detailParm.scrollArr);
  },
  handleScroll(detailParm){
    var that = this;

    
    //console.log(this.detailParm.scrollArr);
    //var scrollTop = that.getScroll().top;
      for(let i=0;i<that.detailParm.scrollArr.length;i++){
          if(that.detailParm.scrollArr[i].top > itemConfig.getScrollTop()){
              that.detailParm.scrollArr[i].element.addClass("fixed").siblings().removeClass("fixed");
              that.detailParm.index = i;
              break;
          }
      } 

      if(itemConfig.getScrollTop() + itemConfig.getWindowHeight() == itemConfig.getScrollHeight()){
       if(!detailParm.isEnd){
          detailParm.page += 1;
          this.getIncomeDetailData(detailParm.page,that.detailParm.index);

       }
        

    } 
  },
  render:function(){
    if(!this.state.loading){
      if(this.state.detailData.length > 0){
        return (
          <div className="incomeDetail">             
              <div className="incomeDetailBox">
                 {
                    this.state.detailData.map(function(item,key){
                      return(
                           <div className= "incomeDetailItem">
                              
                              <div className="detailTit">
                                
                                <div className="titDate px-one-border px-one-border-bottom">{item.date }</div>
                              </div>
                              <div className="detaiWrap px-one-border px-one-border-bottom">
                                 
                                {
                                  item.itemData.map(function(it,i){
                                    return(
                                      <div className="listItem px-one-border px-one-border-bottom">
                                        <span className={"detailIcon " +it.typeClass}></span>
                                        <div className="detatilL">
                                            <div className="incomeSource clearfix">
                                              <span className="payTit">+{it.amount}</span>
                                              {it.status == '已支付' ? <span className="payStyle"></span> : ''}
                                              
                                            </div>
                                            <p className="incomeName">{it.name}&nbsp;{it.need_id == "" ? "" : 'id:'+it.need_id}</p>
                                        </div>
                                        <div className="detailR">
                                          <span className="getDate">{it.date}</span>
                                          <span className="souceStyle">{it.typeText}</span>
                                        </div>
                                      </div>
                                    )
                                  },this)
                                }   
                                  
                              </div>
                          </div>
                      )
                    },this)
                  }
              </div>
              <div className="pullMore">{this.state.dataEnd ? "下拉加载更多......" : "没有更多了......"}</div>
          </div>
        )
      }else{
        return(
          <NoMessage value={ this.detailParm.report } />
        )
      }
        
    }else{
      return (
        <Loading />
      )
    }
    
  }
})
export default IncomeDetail