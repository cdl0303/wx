
/**
*新版 提交车源 9/30
*/
import youyiche from '../../../base-common/js/youyiche.js'
import React from 'react'
import Modal from './modal.jsx'
import Verification from './verification.jsx'
import itemConfig from '../../js/itemConfig.js'
import {Link} from 'react-router'

//没有提交权限 弹层  
var Unseal = React.createClass({
  render(){
    return(
      <div className={ this.props.unseal ? 'unseal' : 'unseal none' } onClick = {this.props.closeUnseal}>
        <div className='unseal-box'>
          <i></i>
          <p>因您提交车源信息不佳，</p>
          <p>系统已暂停您的提交资格，</p>
          <p>解封请联系：021-51796938</p>
        </div>
      </div>
    )
  }
})

//临时数据
var activityData = [
    {
      type:'1',
      txt:'过户未满3个月，黄标车，营运车及扣押贷款车辆请勿提交'
    },
    // {
    //   type:'2',
    //   txt:'推荐小伙伴成为合伙人，小伙伴的每台成交您都会有200元奖励，每台都有哦~~'
    // },
    {
      type:'3',
      txt:'每台200奖励！！推荐小伙伴成为合伙人，小伙伴的每台成交您都会有200元奖励，每台都有哦~~'
    }
];
var NewSource = React.createClass({
  common:{
    intervalId:null,
    timer:500,     //毫秒
    error1:'输入正确的手机号码！',
    error2:'姓名不能为空！',
    error3:'备注不能为空！',
    error4:'提交成功',
    error5:'提交失败',
    error6:'信息重复，挪入失效中',
    activityData:[
        {
          type:'1',
          txt:'过户未满3个月，黄标车，营运车及扣押贷款车辆请勿提交',
          classTxt:'ring'
        },
        
        {
          type:'3',
          txt:'每台200奖励！！推荐小伙伴成为合伙人，小伙伴的每台成交您都会有200元奖励，每台都有哦~~',
          classTxt:'makeMoney'
        }
    ]
  },
  getInitialState(){
    return{
      newCarSourcePic:require('../../img/newCarSourcePic.png'),
      name:'',    //姓名
      mobile:'', //手机号
      demand:'', // 车牌号码或车型备注 
      notice:'',     //是否告知客户  默认不选中
      topNotice:[],     //头部滚动活动数组
      warningInfo:'',   //错误信息提示
      msgIcon:require('../../img/msgIcon.png'),
      andrFun:false,
      unReadMessage:false,     //是否有未读消息  默认无
      unseal:false, //解封弹层
      verification:false, //验证弹层
      operate:'',//只有代理人找回自己的小号的时候需要带上此参数 verifyCode 通过验证码找回 cancel 取消
      verifyCode:''//跟 operate一起使用,两个参数要么同时带上，要么都不带，填写的验证码
    }
  },
  autoScroll(obj){  
    $(obj).find(".titTxt").animate({  
      marginTop : "-44px"  
    },this.common.timer,function(){  
      $(this).css({marginTop : "0px"}).find("li:first").appendTo(this); 
    })
  },

  //告知客户
  informClient(curFit){
    if(!curFit){
      this.setState({
          getClient:!curFit,
          notice:'noice',
      })
    }else{
      this.setState({
          getClient:!curFit,
          notice:'',
      })
    }
  },

  //展示所有活动、通知等
  showPop(event){
    event.stopPropagation();  
    $(".titPop").show();
    window.clearInterval(this.common.intervalId);
  },

  //隐藏弹出
  bgClick(){
    $(".titPop").hide();
    this.setIntervalFn();
  },
  getFocus(){
    var t = $(".contForm").position().top;
    $(document).scrollTop(t);
  },
  //滚动计时器
  setIntervalFn(){
    var that = this;
    that.common.intervalId  = setInterval(function(){
    that.autoScroll(".carSource .tit")
    },3000); 
  },

  getInfo(prop,event){
    this.setState({
      [prop]:event.target.value
    })
  },

  //删除左右两端的空格
  getTrim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },

  //显示错误信息
  showWarning(str){
    this.setState({
      warningInfo:str
    });
    setTimeout(() => {
        this.setState({
          warningInfo:'',
        })
      },2000);
  },

  //提交信息
  subInfo(){
      var that = this;
      if(that.state.mobile == "" || !/^1[3,4,5,7,8]{1}(\d){9}$/i.test(that.state.mobile)){
        that.showWarning(that.common.error1);
      }else if(that.state.name == ""){
         that.showWarning(that.common.error2);
      }else if(that.state.demand == ""){
         that.showWarning(that.common.error3);
      }else{
        var parm = {
          origin: "vehicleagent_" + itemConfig.agenInfoParm.agentId,
          name:that.getTrim(that.state.name),
          phone:that.getTrim(that.state.mobile),
          brand:'',
          series: '', 
          plate:that.getTrim(that.state.demand),  //车牌号或备注
          isSell: true,
          notice:that.state.notice,               //是否告知客户
          operate:that.state.operate,
          verifyCode:that.state.verifyCode
        }

        var header = {"content-type":"application/json;charset=utf-8"};
        youyiche.getData({
          url:youyiche.publicParams.baseUrl+itemConfig.api.registerCarneed,
          data:parm,
          method:"post",
          headers:header
        },false).then((data)=>{

          if(!data.success&&data.message!='001'&&data.message!='002'&&data.message!='005'){
            that.showWarning(that.common.error5);
            return;
          }
          if(!data.success&&data.message=='001'){
              that.setState({
                unseal:true
              })
              return;
          }
          if(!data.success&&data.message=='002'){
              that.setState({
                verification:true
              })
              return;
          }
          if(!data.success&&data.message=='005'){
            that.showWarning(that.common.error6);
          }
          if(that.state.operate == 'cancel'){
            that.showWarning(that.common.error6);
          }
          else{
            that.showWarning(that.common.error4);
          }
          that.setState({
            name:'',
            mobile:'',
            demand:'',
            operate:''
          })
          
        })
      }
  },

  //关闭没有提交权限弹层
  closeUnseal(){
    this.setState({
      unseal:false
    })
  },
  //验证码通过后关闭验证弹层
  closeVerificationByCode(){
    this.setState({
      name:'',
      mobile:'',
      demand:'',
      operate:'',
      verifyCode:'',
      verification:false
    })
  },
  //关闭验证弹层并提交信息
  closeVerification(){
    this.setState({
      verification:false,
      operate:'cancel',
      verifyCode:''
    },()=>{
      this.subInfo()
    })
  },

  //未读消息跳转
  readMessage:function(){
    window.location = 'http://'+window.location.host+'/WxWeb/item-notice/index.html?group_id=1';
  },

  componentWillUnmount(){
    window.clearInterval(this.common.intervalId);  //销毁计时器
  },
  
  handleData(data){
    var dataArr = [];
    for(let i=0;i<data.length;i++){
      if(data[i].rewardEvent == "wanchengjiance"){
          data[i].rewardEvent = "完成检测"
      }else if(data[i].rewardEvent == "shengchengcheyuan"){
          data[i].rewardEvent = "生成车源"
      }else if(data[i].rewardEvent == "chengjiao"){
          data[i].rewardEvent = "成交"
      }
      if(data[i].rewardType == "meirenjiangliyici"){
          data[i].rewardType = "一次性额外"
      }else if(data[i].rewardType == "meirenjianglimeici"){
          data[i].rewardType = "每台额外";
          data[i].rewardCount = data[i].rewardCount -1;
      }
      dataArr.push({
        classTxt:"reward",
        txt:data[i].rewardSum+"元！！"+data[i].beginDate+"-"+data[i].endDate+"日，"+data[i].rewardEvent+"满"+data[i].rewardCount+"台后，"+data[i].rewardType+"奖励"+data[i].rewardSum+"元"
      });
    }
    dataArr = dataArr.concat(this.common.activityData)
    
    this.setState({
     topNotice:dataArr
    })
  },
  componentWillMount(){
    youyiche.changeTitle("又一车-合伙人");
    youyiche.getData({
      url:itemConfig.api.getAgentTasks
    }).then((data)=>{
        if(data.errcode == 0){
          if(data.data.length > 0){
            this.handleData(data.data); //处理数据
            this.setIntervalFn();  //开启计时器
          }else{
            this.setState({
              topNotice:this.common.activityData
            })
          }
        }
    })
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    if(isAndroid){
      this.setState({
        andrFun:true
      })
    }
  },
  componentDidMount(){
    TDAPP.onEvent ("提交车源页打开次数","合伙人");
  },

  render:function(){

    return (
      <div className="carSource">
        <div className="tit">
          
          <ul className="titTxt">
            {
              this.state.topNotice.map(function(item,k){
                return(
                    <li onClick={this.showPop}>
                      <span className={"titIcon "+item.classTxt}></span>
                      <div>{item.txt}</div>
                   </li>
                )
              },this)
            }
             
          </ul>
          <span className="titThrow"><span onClick={this.showPop}></span></span>
        </div>
        <div className="titPop">
            <div className="popBg" onClick={this.bgClick}></div>
            <span className="topThrow"></span>
            <div className="popCont">
              <ul>
                 {
                    this.state.topNotice.map(function(item,k){
                      return(
                          <li className="px-one-border px-one-border-bottom">
                            <span className={"icon "+item.classTxt+"Icon"}></span>
                            <div>{item.txt}</div>
                          </li>
                      )
                    })
                  }
                
              </ul>
            </div>
        </div>
        <div className="cont">
            <Link to="/plan" activeClassName="active"><div className="contBanner"></div></Link>
            <div className="contForm">
                <div className="formItem">
                    <div className="itemInput px-one-border px-one-border-bottom">
                      <input type="tel"  maxLength="11" placeholder="手机号" className="inputTxt" value={this.state.mobile} onChange={this.getInfo.bind(this,'mobile')}  onFocus={this.state.andrFun ? this.getFocus : ''}/>
                    </div>
                    <div className="itemInput px-one-border px-one-border-bottom">
                      <input type="text" placeholder="姓名" className="inputTxt inputClient" value={this.state.name} onChange={this.getInfo.bind(this,'name')}/>
                      <div className="informClient">
                        <span className={this.state.getClient ? "fitIcon curFit" : "fitIcon"} onClick={this.informClient.bind(this,this.state.getClient)}>
                            <em></em>
                        </span>
                        &nbsp;&nbsp;我已告知客户</div>
                    </div>
                    <div className="itemInput px-one-border px-one-border-bottom">
                      <input type="text" placeholder="车牌号码或车型备注" value={this.state.demand} className="inputTxt" onChange={this.getInfo.bind(this,'demand')}/>
                    </div>
                     <div className="itemBtn">
                        <button className="subInfo" onClick={this.subInfo}>提交信息</button>
                    </div>
                </div>
                <div className="formItem">
                    <div className="contIntr">
                        <p className="intrTit">
                            <span className="intrLine">
                              <span><i>◆</i>什么是合伙人计划<i>◆</i></span>
                            </span>

                        </p>
                        <p><span className="trTxt">线索变现金</span></p>
                        <p><span className="trTxt">10个工作日到账</span></p>
                        <p><span className="trTxt">隐私保障零风险</span></p>
                        {
                          this.state.unReadMessage ?
                          <span className="msgInfo" onClick={this.readMessage}>
                            <img src={this.state.msgIcon}/>
                          </span>
                          : ""
                        }
                        
                    </div>
                </div>
            </div>
        </div>
        <Modal text={ this.state.warningInfo } />
        <Unseal unseal = {this.state.unseal} closeUnseal = {this.closeUnseal}/>
        {
          this.state.verification ? <Verification closeVerification={this.closeVerification} mobile={this.state.mobile} globalState={this.state} closeVerificationByCode = {this.closeVerificationByCode}/>
          :''
        }
        </div>
    )
  }
})

export default NewSource

