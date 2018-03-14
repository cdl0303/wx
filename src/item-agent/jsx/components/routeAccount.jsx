import youyiche from 'youyiche'
import React from 'react'
import Modal from './modal.jsx'
import itemConfig from '../../js/itemConfig.js'
//Account
var Account = React.createClass({
  getInitialState:function(){
    return {
      bankName:'',
      bankCity:'',
      bankArea:'',
      bankNum:'',
      bankUser:'',
      txt:null,
      defaultType:''//支付方式
    }
  },
  handelData(data){
    for(var i=0;i<data.length;i++){
      var wx_obj = JSON.parse(data[i].data);
      this.setState({
        bankName:wx_obj.bankName,
        bankCity:wx_obj.bankCity,
        bankArea:wx_obj.bankArea,
        bankNum:wx_obj.bankNum,
        bankUser:wx_obj.bankUser
      })
    }
  },
  componentDidMount:function(){
    var that = this;
    youyiche.getData({
      url:itemConfig.api.getPayAccountInfo
    })
      .then(
        (data)=>{
          if(data.errcode != 0){
            return;
          }
          if(data.data.defaultAccount == "wx_pub"){
              this.setState({
                defaultType:"wx_pub",
              })
              
          }else{
            this.setState({
              defaultType:"bankcard",
            })
          }
          this.handelData(data.data.bankInfos);
        }
      )
  },
  handInput:function(prop,event){
    this.setState({
      [prop]:event.target.value,
    });
  },
  setNull:function(prop,event){
    this.setState({
      [prop]:null,
    });
  },
  showErrorInfo(str){
    this.setState({
      txt:str,
    })
    setTimeout(() => {
      this.setState({
        txt:'',
      })
    },2000);
  },
  submitMessage:function(){
    if(this.state.defaultType == 'wx_pub'){
      youyiche.getData({
        url:itemConfig.api.editAccountInfo+"?type=wx_pub"
      })
        .then(
          (data)=>{
            if(data.errcode != 0){
              this.showErrorInfo(data.errmsg);
              return;
            }
            this.showErrorInfo("操作成功");
          }
        )
    }
    else{
      if(!this.state.bankName){
        this.showErrorInfo("银行不能为空");
        return;
      }else if(!this.state.bankCity){
        this.showErrorInfo("城市不能为空");
        return;
      }else if(!this.state.bankArea){
        this.showErrorInfo("地址不能为空");
        return;
      }else if(!this.state.bankNum){
        this.showErrorInfo("账号不能为空");
        return;
      }else if(!this.state.bankUser){
        this.showErrorInfo("姓名不能为空");
        return;
      };
      var params = {
        bankName:this.state.bankName,
        bankArea:this.state.bankArea,
        bankCity:this.state.bankCity,
        bankNum:this.state.bankNum,
        bankUser:this.state.bankUser,
      };
      youyiche.getData({
        url:itemConfig.api.editAccountInfo+"?type=bankcard",
        data:params,
        method:"post"
      })
        .then(
          (data)=>{
            if(data.errcode != 0){
              this.showErrorInfo(data.errmsg);
              return;
            }
            this.showErrorInfo("操作成功");
          }
        )
    }    
  },
  render:function(){
    let png1 = require("../../img/wx-pay.png")
    let png2 = require("../../img/union-pay.png")
    return (
      <div>
        <ul className='account-style px-one-border px-one-border-all'>
          <li onClick={()=>{this.setState({defaultType:'wx_pub'})}} className="px-one-border px-one-border-bottom">
            <img src={png1}/>
            <div>
              <p>通过微信转账获得奖励</p>
              <p>奖励十个工作日内到账(测试中)</p>
            </div>
            <input className={this.state.defaultType == 'wx_pub' ? 'checked':'check'} type='radio' name='account-method' />
          </li>
          <li onClick={()=>{this.setState({defaultType:'bankcard'})}}>
            <img src={png2}/>
            <div>
              <p>通过银行卡转账获得奖励</p>
              <p>每月奖励将于次月15日打款</p>
            </div>
            <input className={this.state.defaultType == 'bankcard' ? 'checked':'check'} type='radio' name='account-method' />
          </li>
        </ul>
        { this.state.defaultType == 'bankcard' ? <ul className="account-form">
          <li><label>银行</label>
            <select value={ this.state.bankName } onChange={ this.handInput.bind(this,'bankName') }>
              <option value=''>请选择银行</option>
              <option value='中国农业银行'>中国农业银行</option>
              <option value='中国光大银行'>中国光大银行</option>
              <option value='北京银行'>北京银行</option>
              <option value='中国银行'>中国银行</option>
              <option value='中国建设银行'>中国建设银行</option>
              <option value='兴业银行'>兴业银行</option>
              <option value='招商银行'>招商银行</option>
              <option value='中国民生银行'>中国民生银行</option>
              <option value='广东发展银行'>广东发展银行</option>
              <option value='广州银行'>广州银行</option>
              <option value='华夏银行'>华夏银行</option>
              <option value='中国工商银行'>中国工商银行</option>
              <option value='交通银行'>交通银行</option>
              <option value='平安银行'>平安银行</option>
              <option value='中国邮政储蓄银行'>中国邮政储蓄银行</option>
              <option value='上海浦东发展银行'>上海浦东发展银行</option>
              <option value='中信银行'>中信银行</option>
            </select></li>
          <li><label>城市</label><input type='text' value={ this.state.bankCity } placeholder='请输入开户行所在城市' onBlur={ this.handInput.bind(this,'bankCity') } onFocus={ this.setNull.bind(this,'bankCity') }/></li>
          <li><label>开户行</label><input type='text' value={ this.state.bankArea } placeholder='请输入开户行' onBlur={ this.handInput.bind(this,'bankArea') } onFocus={ this.setNull.bind(this,'bankArea') }/></li>
          <li><label>储蓄卡号</label><input type='tel' value={ this.state.bankNum } placeholder='请输入卡号' onBlur={ this.handInput.bind(this,'bankNum') } onFocus={ this.setNull.bind(this,'bankNum') }/></li>
          <li><label>开户人姓名</label><input type='text' value={ this.state.bankUser } placeholder='请输入姓名' onBlur={ this.handInput.bind(this,'bankUser') } onFocus={ this.setNull.bind(this,'bankUser') }/></li>
        </ul>:''
        }
        
        <div className='submit' onClick={ this.submitMessage }>保存设置</div>

        <Modal text={ this.state.txt } />
      </div>
    )
  }
});

export default Account
