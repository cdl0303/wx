import youyiche from 'youyiche'
import React from 'react'
import Loading from './loading.jsx'
import itemConfig from '../../js/itemConfig.js'
//Incentive
var Incentive = React.createClass({
  getInitialState:function(){
    return ({
      baseSubsidy:null,
      scInfo:null,
      myScInfo:null,
      loading:true
    })
  },
  componentDidMount:function(){
    // const data = {"success":true,"token_invalid":true,"ret":{"baseSubsidy":{"highBrand":"250","midleBrand":"150","lowBrand":"50","dealMoney1":"3600","dealMoney2":"1800","dealMoney3":"900","dealMoney4":"450","newDate":1462042800000},"scInfo":[{"level":"3","levelName":"\u4e70\u83dc\u7ec4","customTaskPercent":"180","ownerTaskPercent":"100","customDealPercent":"100","ownerDealPercent":"100"},{"level":"2","levelName":"\u94a2\u70ae\u7ec4","customTaskPercent":"200","ownerTaskPercent":"100","customDealPercent":"110","ownerDealPercent":"100"},{"level":"1","levelName":"\u808c\u8089\u7ec4","customTaskPercent":"220","ownerTaskPercent":"100","customDealPercent":"120","ownerDealPercent":"100"}],"myScInfo":{"level":"3","levelName":"\u4e70\u83dc\u7ec4","customTaskPercent":"180","ownerTaskPercent":"100","customDealPercent":"100","ownerDealPercent":"100"}}}
    youyiche.getData({
        url:itemConfig.api.getAgentNearSubsidy
    })
      .then(
        (data)=>{
          if(data.errcode != 0){
            return;
          }
          this.setState({
            baseSubsidy:data.data.baseSubsidy,
            scInfo:data.data.scInfo.reverse(),
            myScInfo:data.data.myScInfo,
            loading:false
          })
        }
      )
  },
  render:function(){
    if(!this.state.loading){
      var myLev = this.state.myScInfo.level;
      return (
        <div className="d-info">
            <div className="item">
                <div className="text">
                    <h6>您本月所在分组:<strong >{ this.state.myScInfo.levelName }</strong></h6>
                    <p>奖励政策：我们将在每月1日凌晨3点钟，根据您上月的成交金额（不看检测奖励），决定您本月分组</p>
                </div>
                <table cellPadding="0" cellSpacing="0" className="group">
                  <tbody>
                    <tr>
                        <td colSpan="2"></td>
                        <td className="icon1"><i className={ myLev == 1 ? 'show' : null }></i><div className={ myLev == 1 ? 'isLev1' : null }>{ this.state.scInfo[2].levelName }</div></td>
                        <td className="icon2"><i className={ myLev == 2 ? 'show' : null }></i><div className={ myLev == 2 ? 'isLev2' : null }>{ this.state.scInfo[1].levelName }</div></td>
                        <td className="icon3"><i className={ myLev == 3 ? 'show' : null }></i><div className={ myLev == 3 ? 'isLev3' : null }>{ this.state.scInfo[0].levelName }</div></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><div></div></td>
                        <td><div className={ myLev == 1 ? 'isLev1' : null }>上月<br/>成交奖励<br/>&gt;=4000</div></td>
                        <td><div className={ myLev == 2 ? 'isLev2' : null }>500&lt;=<br/>上月成交奖励<br/>&lt;4000</div></td>
                        <td><div className={ myLev == 3 ? 'isLev3' : null }>上月<br/>成交奖励<br/>&lt;500</div></td>
                    </tr>
                    <tr>
                        <td rowSpan="2"><div>检测<br />系数</div></td>
                        <td><div>本人信息</div></td>
                        <td><div className={ myLev == 1 ? 'isLev1' : null }>{ this.state.scInfo[2].ownerTaskPercent/100 }</div></td>
                        <td><div className={ myLev == 2 ? 'isLev2' : null }>{ this.state.scInfo[1].ownerTaskPercent/100 }</div></td>
                        <td><div className={ myLev == 3 ? 'isLev3' : null }>{ this.state.scInfo[0].ownerTaskPercent/100 }</div></td>
                    </tr>
                    <tr>
                        <td><div>客户信息</div></td>
                        <td><div className={ myLev == 1 ? 'isLev1' : null }>{ this.state.scInfo[2].customTaskPercent/100 }</div></td>
                        <td><div className={ myLev == 2 ? 'isLev2' : null }>{ this.state.scInfo[1].customTaskPercent/100 }</div></td>
                        <td><div className={ myLev == 3 ? 'isLev3' : null }>{ this.state.scInfo[0].customTaskPercent/100 }</div></td>
                    </tr>
                    <tr>
                        <td rowSpan="2"><div>成交<br />系数</div></td>
                        <td><div>本人信息</div></td>
                        <td><div className={ myLev == 1 ? 'isLev1' : null }>{ this.state.scInfo[2].ownerDealPercent/100 }</div></td>
                        <td><div className={ myLev == 2 ? 'isLev2' : null }>{ this.state.scInfo[1].ownerDealPercent/100 }</div></td>
                        <td><div className={ myLev == 3 ? 'isLev3' : null }>{ this.state.scInfo[0].ownerDealPercent/100 }</div></td>
                    </tr>
                    <tr>
                        <td><div>客户信息</div></td>
                        <td><div className={ myLev == 1 ? 'isLev1' : null }>{ this.state.scInfo[2].customDealPercent/100 }</div></td>
                        <td><div className={ myLev == 2 ? 'isLev2' : null }>{ this.state.scInfo[1].customDealPercent/100 }</div></td>
                        <td><div className={ myLev == 3 ? 'isLev3' : null }>{ this.state.scInfo[0].customDealPercent/100 }</div></td>
                    </tr>
                    <tr>
                        <td colSpan="5"><div>(每升一组，至少多赚<strong>10%</strong>哟~~)</div></td>
                    </tr>
                  </tbody>
                </table>
            </div>
            <div className="item">
                <div className="text">
                    <h6>您的奖励基数为:</h6>
                    <p>您的个人所得为 奖励基数*您所在分组的系数即可</p>
                </div>
                <ul className="clearfix">
                    <li>
                        <dl>
                            <dt>检测激励</dt>
                            <dd>超豪华品牌<p>{ this.state.baseSubsidy.highBrand }</p> 劳斯莱斯，法拉利，兰博基尼等</dd>
                            <dd>豪华品牌<p>{ this.state.baseSubsidy.midleBrand }</p> 保时捷，奔驰，宝马，奥迪等 </dd>
                            <dd>其他品牌<p>{ this.state.baseSubsidy.lowBrand }</p></dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>成交</dt>
                            <dd>成交额40w以上<br/><strong>{ this.state.baseSubsidy.dealMoney1 }</strong></dd>
                            <dd>成交额20w以上<br/><strong>{ this.state.baseSubsidy.dealMoney2 }</strong></dd>
                            <dd>成交额10w以上<br/><strong>{ this.state.baseSubsidy.dealMoney3 }</strong></dd>
                            <dd>成交额10w以下<br/><strong>{ this.state.baseSubsidy.dealMoney4 }</strong></dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>年份系数</dt>
                            <dd>1年内<br/>1</dd>
                            <dd>1-6年<br/>1</dd>
                            <dd>&gt;6年<br/>0.8</dd>
                        </dl>
                    </li>
                </ul>
            </div>
            <div className="item">
                <div className="text">
                    <h6>举例：</h6>
                    <p>2010年宝马5系，成交金额为21w</p>
                </div>
                <table className="example">
                  <tbody>
                    <tr>
                        <td></td>
                        <td>肌肉组</td>
                        <td>钢炮组</td>
                        <td>买菜组</td>
                    </tr>
                    <tr>
                        <td>留本人信息</td>
                        <td>
                            检测：{ this.state.baseSubsidy.midleBrand * 1 * this.state.scInfo[2].ownerTaskPercent/100 }<br/>
                            成交：{ this.state.baseSubsidy.dealMoney2 * 1 * this.state.scInfo[2].ownerDealPercent/100 }
                        </td>
                        <td>
                            检测：{ this.state.baseSubsidy.midleBrand * 1 * this.state.scInfo[1].ownerTaskPercent/100 }<br/>
                            成交：{ this.state.baseSubsidy.dealMoney2 * 1 * this.state.scInfo[1].ownerDealPercent/100 }
                         </td>
                        <td>
                            检测：{ this.state.baseSubsidy.midleBrand * 1 * this.state.scInfo[0].ownerTaskPercent/100 }<br/>
                            成交：{ this.state.baseSubsidy.dealMoney2 * 1 * this.state.scInfo[0].ownerDealPercent/100 }
                        </td>
                    </tr>
                    <tr>
                        <td>留客户信息</td>
                        <td>
                            检测：{ this.state.baseSubsidy.midleBrand * 1 * this.state.scInfo[2].customTaskPercent/100 }<br/>
                            成交：{ this.state.baseSubsidy.dealMoney2 * 1 * this.state.scInfo[2].customDealPercent/100 }
                        </td>
                        <td>
                            检测：{ this.state.baseSubsidy.midleBrand * 1 * this.state.scInfo[1].customTaskPercent/100 }<br/>
                            成交：{ this.state.baseSubsidy.dealMoney2 * 1 * this.state.scInfo[1].customDealPercent/100 }
                        </td>
                        <td>
                            检测：{ this.state.baseSubsidy.midleBrand * 1 * this.state.scInfo[0].customTaskPercent/100 }<br/>
                            成交：{ this.state.baseSubsidy.dealMoney2 * 1 * this.state.scInfo[0].customDealPercent/100 }
                        </td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </div>
      )
    }else{
      return ( <Loading /> )
    }
  }
});

export default Incentive