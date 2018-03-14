import youyiche from 'youyiche'
import React from 'react'
import Loading from './loading.jsx'
import itemConfig from '../../js/itemConfig.js'
//奖励页面
var RewardSouce = React.createClass({

  getInitialState(){
    return { 
      show:false,//分组明细是否显示 默认不显示
      myScInfo:{},
      baseSubsidy:null,
      scInfo:null,
      statusLevel:'',
      statusTxt:'',
      hasNoneJc:false,//是否存在检测奖励 默认不存在
      loading:true,
    }
  },
  commomSvg:{
     hrefSvg :require('../../../base-common/svg/symbol.svg'),
     medalIcon:require("../../img/medal.png"),
     showSource:[]
  },
  handelData(data){
    if(parseInt(data.baseSubsidy.highBrand) + parseInt(data.baseSubsidy.lowBrand) + parseInt(data.baseSubsidy.midleBrand) == 0){
      this.setState({
        hasNoneJc:true
      })
      this.commomSvg.showSource.splice(2,1);
    }
    if(data.myScInfo.level == "1"){
        this.setState({
          statusLevel:'金牌组',
          statusTxt:'上月<br/>成交奖励<br/>&gt;=4000'
        })
    }else if(data.myScInfo.level == "2"){
        this.setState({
          statusLevel:'银牌组',
          statusTxt:'500&lt;=<br/>上月<br/>成交奖励<br/>&lt;4000'
        })
    }else if(data.myScInfo.level == "3"){
        this.setState({
          statusLevel:'铜牌组',
          statusTxt:'上月<br/>成交奖励<br/>&lt;500'
        })
    }
    data.scInfo.forEach(function(item,k){
        if(item.level == "1"){
            item.levelTxt = "上月<br/>成交奖励<br/>&gt;=4000";
        }else if(item.level == "2"){
            item.levelTxt = "500&lt;=<br/>上月<br/>成交奖励<br/>&lt;4000";
        }else if(item.level == "3"){
            item.levelTxt = "上月<br/>成交奖励<br/>&lt;500";
        }

    })
    this.setState({
      myScInfo:data.myScInfo,
      scInfo:data.scInfo,
      baseSubsidy:data.baseSubsidy
    })
    // console.log(this.state.scInfo);
  },
  componentWillMount:function(){
    var that = this;
    var showSource = [
      {
        class:"gongxian",
        txt:'下线贡献'
      },
      {
        class:"huodong",
        txt:'系统活动'
      },
      {
        class:"jiance",
        txt:'检测奖励'
      },
      {
        class:"chengjiao",
        txt:'成交奖励'
      },
    ];
    this.commomSvg.showSource = showSource;
    youyiche.getData({
      url:itemConfig.api.getAgentNearSubsidy
    }).then((data)=>{
      if(data.errcode != 0){
        return;
      }
      that.setState({
        loading:false
      })
      that.handelData(data.data);

    })
  },
 groupDetail(){
  this.setState({
    show:true
  })
 },
 hideDetail(){
  this.setState({
    show:false
  })
 },
  render:function(){
    if(!this.state.loading){
      return(
        <div className="rewardSouce">
            <div className="itemReard px-one-border px-one-border-all">
                <div className="rewardTit px-one-border px-one-border-bottom">
                  <span className="titLeft">奖励计算公式</span>
                  <span className="titRight">奖励=分组系数x基数</span>
                </div>
                <div className="itemCont">
                    <div className="rewardCircle">
                      <div className="circleTxt">
                        <span>收入</span>
                      </div>
                      {
                        this.commomSvg.showSource.map((item,key)=>{
                          return(
                            <div className={this.state.hasNoneJc ? "part3 "+item.class+"Circle" : "part4 "+item.class+"Circle"}>
                              <div className="transPart"></div>
                              <span className={"rewardIcon "+item.class+"Icon"}>
                                <svg>
                                  <use xlinkHref={ this.commomSvg.hrefSvg+'#'+item.class}></use>
                                </svg>
                              </span>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className="promptInfo">
                      {
                        this.commomSvg.showSource.map((item,k)=>{
                          return(
                            <span className="promptItem">
                              <svg className={item.class}>
                                <use xlinkHref={this.commomSvg.hrefSvg+"#"+item.class}></use>
                              </svg>
                              <span>{item.txt}</span>
                            </span>
                          )
                        })
                      }
                    </div>
                </div>
            </div>
            <div className="itemReard px-one-border px-one-border-all">
              <div className="rewardTit px-one-border px-one-border-bottom">
                <span className="titLeft">分组系数</span>
                <span className="titRight" onClick={this.groupDetail}><img src={this.commomSvg.medalIcon} width="14" height="20"/>&nbsp;&nbsp;查看等级</span>
              </div>
              <div className="itemCont">
                <p className="groupTit">
                    您本月所在分组：{this.state.statusLevel}
                </p>
                <p className="rewardPolicy">
                  奖励政策:我们将在每月1日凌晨3点钟，根据您上月的成交金额(不看检测奖励)，决定您本月分组
                </p>
                <div className="groupFactor">
                    {
                      this.state.hasNoneJc ? <table>
                          <tbody>
                            <tr>
                              <td rowSpan="8">
                                  <div className="factorIcon">
                                    <span className={"factor"+this.state.myScInfo.level}></span>
                                  </div>
                              </td>
                              <td className="borderBN">成交</td>
                              <td>本人信息</td>
                              <td>{this.state.myScInfo && this.state.myScInfo.ownerDealPercent/100}</td>
                              <td rowSpan="8" dangerouslySetInnerHTML={{__html:this.state.statusTxt}}>
                                
                              </td>
                            </tr>
                            <tr>
                              <td className="borderBT">系数</td>
                              <td>客户信息</td>
                              <td>{this.state.myScInfo && this.state.myScInfo.customDealPercent/100}</td>
                            </tr>
                            
                          </tbody>
                        </table>
                        :
                        <table>
                          <tbody>
                            <tr>
                              <td rowSpan="8">
                                  <div className="factorIcon">
                                    <span className={"factor"+this.state.myScInfo.level}></span>
                                  </div>
                              </td>
                              <td className="borderBN">检测</td>
                              <td>本人信息</td>
                              <td>{this.state.myScInfo && this.state.myScInfo.ownerTaskPercent/100}</td>
                              <td rowSpan="8" dangerouslySetInnerHTML={{__html:this.state.statusTxt}}>
                                
                              </td>
                            </tr>
                            <tr>
                              <td className="borderBT">系数</td>
                              <td>客户信息</td>
                              <td>{this.state.myScInfo && this.state.myScInfo.customTaskPercent/100}</td>  
                            </tr>
                            <tr>
                              <td className="borderBN">成交</td>
                              <td>本人信息</td>
                              <td>{this.state.myScInfo && this.state.myScInfo.ownerDealPercent/100}</td>
                            </tr>
                            <tr>
                              <td className="borderBT">系数</td>
                              <td>客户信息</td>
                              <td>{this.state.myScInfo && this.state.myScInfo.customDealPercent/100}</td>
                            </tr>
                            
                          </tbody>
                        </table>
                    }
                  
                </div>
              </div>
            </div>
            <div className="itemReard px-one-border px-one-border-all">
              <div className="rewardTit px-one-border px-one-border-bottom">
                <span className="titLeft">基数</span>
                
              </div>
              <div className="itemCont">
                  {
                    this.state.hasNoneJc ? '' :
                    <div className="baseItem">
                      <p className="baseTit"><span>检测奖励基数</span></p>
                      <table>
                        <thead>
                          <tr>
                            <td>超豪华</td>
                            <td>豪华</td>
                            <td>其他</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{ this.state.baseSubsidy&&this.state.baseSubsidy.highBrand }</td>
                            <td>{ this.state.baseSubsidy&&this.state.baseSubsidy.midleBrand }</td>
                            <td>{ this.state.baseSubsidy&&this.state.baseSubsidy.lowBrand }</td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="baseInstr">*6年以上车龄，检测奖励x0.8</p>
                     
                  </div>
                  }
                  
                  <div className="baseItem">
                      <p className="baseTit"><span>成交奖励基数</span></p>
                      <table>
                        <thead>
                          <tr>
                            <td>10w-</td>
                            <td>10-20w</td>
                            <td>20-40w</td>
                            <td>40w+</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{ this.state.baseSubsidy&&this.state.baseSubsidy.dealMoney4 }</td>
                            <td>{ this.state.baseSubsidy&&this.state.baseSubsidy.dealMoney3 }</td>
                            <td>{ this.state.baseSubsidy&&this.state.baseSubsidy.dealMoney2 }</td>
                            <td>{ this.state.baseSubsidy&&this.state.baseSubsidy.dealMoney1 }</td>
                          </tr>
                        </tbody>
                      </table>
                  </div>
              </div>
            </div>
            <div className="itemReard px-one-border px-one-border-all">
              
              <div className="itemCont">
                  <div className="baseItem">
                      <p className="baseTit"><span>系统活动</span></p>
                      <p className="baseInstr">又一车会不定时推出奖励活动，活动推出后会推送您，敬请期待。</p>
                  </div>
                  <div className="baseItem">
                      <p className="baseTit"><span>下线贡献</span></p>
                      <p className="baseInstr">您推荐的下线，成交时您会有额外奖励，而且不设上限哟</p>
                  </div>
              </div>
            </div>

            <div className={this.state.show ? "groupPop show" : "groupPop"}>
                <div className="groupPopBg" onClick={this.hideDetail}></div>
                <div className="groupDetail">
                    <p className="detailTit">分组明细</p>

                    {
                      this.state.hasNoneJc ?
                      this.state.scInfo&&this.state.scInfo.map((item,k)=>{
                        return(
                          <div className="gDetailTab">
                            <table>
                              <tbody>
                                <tr>
                                  <td rowSpan="8">
                                      <div className="factorIcon">
                                        <span className={"factor"+item.level}></span>
                                      </div>
                                  </td>
                                  <td className="borderBN">成交</td>
                                  <td>本人信息</td>
                                  <td width="38">{item.ownerDealPercent/100}</td>
                                  <td rowSpan="8" dangerouslySetInnerHTML={{__html:item.levelTxt}}>
                                   
                                  </td>
                                </tr>
                                
                            
                                <tr>
                                  <td className="borderBT">系数</td>
                                  <td>客户信息</td>
                                  <td>{item.customDealPercent/100}</td>
                                </tr>
                                
                              </tbody>
                            </table>
                          </div>
                        )
                      })
                      :
                      this.state.scInfo&&this.state.scInfo.map((item,k)=>{
                        return(
                          <div className="gDetailTab">
                            <table>
                              <tbody>
                                <tr>
                                  <td rowSpan="8">
                                      <div className="factorIcon">
                                        <span className={"factor"+item.level}></span>
                                      </div>
                                  </td>
                                  <td className="borderBN">检测</td>
                                  <td>本人信息</td>
                                  <td width="38">{item.ownerTaskPercent/100}</td>
                                  <td rowSpan="8" dangerouslySetInnerHTML={{__html:item.levelTxt}}>
                                   
                                  </td>
                                </tr>
                                <tr>
                                  <td className="borderBT">系数</td>
                                  <td>客户信息</td>
                                  <td>{item.customTaskPercent/100}</td>  
                                </tr>
                                <tr>
                                  <td className="borderBN">成交</td>
                                  <td>本人信息</td>
                                  <td>{item.ownerDealPercent/100}</td>
                                </tr>
                                <tr>
                                  <td className="borderBT">系数</td>
                                  <td>客户信息</td>
                                  <td>{item.customDealPercent/100}</td>
                                </tr>
                                
                              </tbody>
                            </table>
                          </div>
                        )
                      })

                    }
                    
                   
                    

                </div>
            </div>

        </div>
      )
    }else{
     return ( <Loading /> )
    }
    
  }
});
export default RewardSouce