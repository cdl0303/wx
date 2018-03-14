import youyiche from '../../base-common/js/common.js'
import React from 'react'
import Modal from './components/modal.jsx'

require('../sass/index.scss')

function init(){
  //推广代理人
var SpreadAgent = React.createClass({
  getInitialState:function(){
    return ({
        name:'',
        phone:'',
        code:'',
        txt:'',
        isClicked:false,
        tip:'获取验证码',
        imgUrl:null,
        showCode:false
      }
    )
  },
  componentDidMount:function() {
    TDAPP.onEvent ("被推荐页打开次数",'合作渠道');
    var that = this;
    youyiche.getJson('/wx_vehicle_agent/getMyRecommAgentInfo?originAgentId=MaQgO0O0OeO0O0On')
      .then(
        (data)=>{
          if(data.success){
            youyiche.wxShare({
                title:'又一车合伙人计划等待您的加入！',
                desc: '你提交车源，我们负责跟进，轻松每月1w+',
                link:'http://' + window.location.host+'WxWeb/item-spread-agent/index.html',
                imgUrl: 'http://' + window.document.domain + '/WxWeb/images/share.jpg',
            });
          }
        }
      )
  },
  handInput:function(prop,event){
    this.setState({
      [prop]:event.target.value
    })
  },
  getCode:function(){
    var that = this;
    if(!this.state.phone || !/^1(\d){10}$/i.test(this.state.phone) ){
      this.setState({
        txt:'请输入正确手机号码',
      })
      setTimeout(() => {
        this.setState({
          txt:'',
        })
      },2000);
      return;
    }
    if(this.state.isClicked){
      return;
    }
    var remainTime = 60;
    var timer = setInterval(function(){
      if(remainTime > 0 ){
        that.setState({
          tip:remainTime+'s后重试',
          isClicked:true
        })
        remainTime--;
      }else{
        clearInterval(timer);
        that.setState({
          tip:'获取验证码',
          isClicked:false
        })
      }
    },1000);

    youyiche.getJson('/wx_vehicle_agent/sendCode?mobile='+this.state.phone)
      .then(
        (data)=>{
        }
      )
  },
  submitMessage:function(){
    var that = this;
    if(!this.state.name){
      this.setState({
        txt:'请输入姓名',
      })
      setTimeout(() => {
        this.setState({
          txt:'',
        })
      },2000);
      return;
    }else if(!this.state.phone || !/^1(\d){10}$/i.test(this.state.phone) ){
      this.setState({
        txt:'请输入正确手机号码',
      })
      setTimeout(() => {
        this.setState({
          txt:'',
        })
      },2000);
      return;
    }else if(!this.state.code){
      this.setState({
        txt:'请输入验证码',
      })
      setTimeout(() => {
        this.setState({
          txt:'',
        })
      },2000);
      return;
    }
    var params = {
      name:this.state.name,
      mobile:this.state.phone,
      code:this.state.code,
      originAgentId:'MaQgO0O0OeO0O0On'
    }
    youyiche.getJson('/wx_vehicle_agent/registerByAgent','get',params)
      .then(
        (data)=>{
          if(!data.success){
            that.setState({
              txt:data.message,
            })
            setTimeout(() => {
              that.setState({
                txt:'',
              })
            },2000);
            return;
          }
          that.setState({
            imgUrl:data.QRcodeUrl,
            showCode:true
          })
        }
      )
  },
  closeCode:function(){
    this.setState({
      showCode:false
    })
  },
  render:function(){
    var style = this.state.isClicked ? 'isclick' : '';
    var code = this.state.showCode ? 'QRcodeUrl show': 'QRcodeUrl';
    let png1 = require('../img/banner1.png');
    let png2 = require('../img/wenhao.png');
    return (
      <div>
        <div className='join-banner'>
          <img src={png1}/>
          </div>
        <div className='input-box join-form'>
          <input type='text' placeholder='请输入姓名' onBlur={ this.handInput.bind(this,'name') }/>
          <p><input type='tel' placeholder='请输入手机号码' onBlur={ this.handInput.bind(this,'phone') }/>
          <span onClick={ this.getCode } className={ style }>{ this.state.tip }</span></p>
          <input type='tel' placeholder='请输入验证码' onBlur={ this.handInput.bind(this,'code') }/>
          <div className='submit' onClick={ this.submitMessage }>立即开通</div>
        </div>
        <section className="company-info">
          <h4>诚邀您加入又一车合伙人计划</h4>
          <dl>
            <dt><img src={png2} />什么是又一车合伙人计划？</dt>
            <dd>我们是专业的二手车交易平台，我们有近千家商户天天在使用我们系统拍卖车子；</dd>
            <dd>我们会对您的个人信息及提交的信息进行保密，仅您自己有权查询及跟踪，确保您的收益；</dd>
            <dd>我们有专业的客服团队，您提交车源我们预约，我们促成交，轻轻松松赚奖励；</dd>
            <dd>我们为您提供多一个成交的可能。</dd>
          </dl>
        </section>
        <Modal text={ this.state.txt } />
        <div className={ code } onClick={ this.closeCode }>
          <p>你离成功只差一步</p>
          <img src={this.state.imgUrl} />
          <p>长按上方二维码，关注我们又一车服务号，<br />您就可以在服务号内提交车源啦</p>
        </div>
      </div>
    )
  }
});

ReactDOM.render(<SpreadAgent/>,document.getElementById('spreadAgent'));
}

//wx-auth.js 微信认证
youyiche.wauth(init,"snsapi_base");


