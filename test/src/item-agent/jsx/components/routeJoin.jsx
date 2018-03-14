import youyiche from 'youyiche'
import youyicheWX from 'youyicheWX'
import React from 'react'
import Modal from './modal.jsx'
import itemConfig from '../../js/itemConfig.js'
import itemShare from '../../js/itemShare.js'
//join agent
var Join = React.createClass({
  getInitialState:function(){
    return ({
        name:'',
        phone:'',
        code:'',
        txt:'',
        isClicked:false,
        tip:'获取验证码',
        imgUrl:null,
        showCode:false,
        headImg:null,
        originAgentId:'',
        done:false,//页面请求数据是否成功 默认 不成功
      }
    )
  },
  commPar:{
    png1 : require('../../img/banner1.png'),
    png2 :require('../../img/wenhao.png')
  },
  componentDidMount:function() {
    TDAPP.onEvent ("被推荐朋友页打开次数","合伙人");
    var that = this;
    //var partialOriginAgentId = 'KmUCF%2Fei4uOFDQ0r4p6YFant6leWIHGUqBVfmzJ8Uvc%3D' || location.search.match(new RegExp("[\?\&]" + 'originAgentId'+ "=([^\&]+)", "i"))[1];
    var partialOriginAgentId =  youyiche.getParamByUrl("originAgentId");
    
    that.setState({
      originAgentId:partialOriginAgentId
    });
    youyiche.getData({
      url:itemConfig.api.getRecommentPage+"?enAid="+partialOriginAgentId
    })
      .then(
        (data)=>{
          if(data.errcode == 0){
            if(data.data.isAgent){
                location.replace("#/");
                //history.replaceState({},"", "#/");
            }
            that.setState({
              headImg:data.data.headImg,
              done:true
            })
            itemShare.join(data.data.agentName,partialOriginAgentId);
            // youyicheWX.wxShare({
            //     title:'你被'+data.data.agentName+'推荐啦，成为又一车超级代理人，动动手指就能赚钱哟！',
            //     desc: '你提交车源，我们负责跟进，轻松每月1w+',
            //     link:'http://' + window.location.host+'/WxWeb/item-agent/index.html?originAgentId='+partialOriginAgentId+'#/join',
            //     imgUrl: 'http://' + window.document.domain + '/WxWeb/item-agent/img/share.jpg',
            // });
          }
        }
      )
  },
  handInput:function(prop,event){
    this.setState({
      [prop]:event.target.value
    })
  },
  setTimerFun(){
    var remainTime = 60;
    var that = this;
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
  },
  getCode:function(){
    var that = this;
    if(!this.state.phone || !/^1(\d){10}$/i.test(this.state.phone) ){
      that.showError('请输入正确手机号码');
      return;
    }
    if(this.state.isClicked){
      return;
    }
    youyiche.getData({
      url:itemConfig.api.getVerifycode+"?mobile="+this.state.phone
    })
    .then((data)=>{
      if(data.errcode != 0){
        return;
      }
      that.setTimerFun();
    })
  },
  showError(str){
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
    var that = this;
    if(!this.state.name){
      that.showError('请输入姓名');
      return;
    }else if(!this.state.phone || !/^1(\d){10}$/i.test(this.state.phone) ){
      that.showError('请输入正确手机号码');
      return;
    }else if(!this.state.code){
      that.showError('请输入验证码');
      return;
    }
    var params = {
      name:this.state.name,
      mobile:this.state.phone,
      code:this.state.code,
      enAid:this.state.originAgentId
    }
    youyiche.getData({
      url:itemConfig.api.adviceRegisterByAgent,
      method:"post",
      data:params
    })
      .then(
        (data)=>{
          if(data.errcode != 0){
            that.showError(data.errmsg);
            return;
          }
          that.setState({
            imgUrl:data.data,
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
    if(this.state.done){
      return (
        <div>
          <div className='join-banner'>
            <img src={this.commPar.png1}/>
            <p><img src={ this.state.headImg } />我已经是又一车合伙人啦，真的是个蛮不错的二手车交易平台，强烈推荐你也加入。</p>
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
              <dt><img src={this.commPar.png2} />什么是又一车合伙人计划？</dt>
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
    }else{
      return(
        <div></div>
      )
    }
  
  }
});

export default Join