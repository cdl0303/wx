import youyiche from 'youyiche'
import React from 'react'
import {Link} from 'react-router'
import itemConfig from '../../js/itemConfig.js'
/**
*  personal center
*/
// personal center Component
//list
var list = [
  [
    {
      imgUrl:require('../../img/l-icon1.png'),
      title:'提现账户管理',
      url:'/account'
    },
    {
      imgUrl:require('../../img/l-icon2.png'),
      title:'推荐合伙人计划',
      url:'/plan'
    }
  ],
  [
    {
      imgUrl:require('../../img/l-icon3.png'),
      title:'最新激励方案',
      url:'/reward'
    },
    {
      imgUrl:require('../../img/l-icon4.png'),
      title:'转发赚更多',
      url:'/marketing'
    }
    // {
    //   imgUrl:require('../../img/l-icon5.png'),
    //   title:'营销物料申请',
    //   url:'/material'
    // }
  ]
];
// local img
var staticImg = {
  iconc:require('../../img/icon-c.png')
};

//PersonalNotice
var PersonalNotice = React.createClass({
  handClick:function(){
    window.location = 'http://'+window.location.host+'/WxWeb/item-notice/index.html?group_id=1';
  },
  render:function(){
    var hasMessage = this.props.value ? 'notice-icon dot' : 'notice-icon';
    return (
      <div onClick={ this.handClick } className={ hasMessage }></div>
    )
  }
});

//personal data
var PersonalScore = React.createClass({
  render:function(){
    return (
      <ul className="data-list">
        <li>
          <b>{ this.props.value.reward }</b>
          <p>当月奖励</p>
        </li>
        <li>
          <b>{ this.props.value.exam }</b>
          <p>累计检测数</p>
        </li>
        <li>
          <b>{ this.props.value.deal }</b>
          <p>累计成交数</p>
        </li>
      </ul>
    )
  }
});

// personal info
var PersonalInfo = React.createClass({
  render:function(){
    return (
      <div className="header">
        <img className='headImg' src={ this.props.value.headImg } />
        <div className="name-price">
          <p><span className='agentName'>{this.props.value.name}</span>(ID:{ this.props.value.agentId })
            <Link to='/plan'><img src={ this.props.imgUrl } /></Link>
           </p>
          <p>累计奖励：{ this.props.value.money }元</p>
        </div>
        <PersonalNotice value={ this.props.value.messageLog }/>
      </div>
    )
  }
});

//ListItem
var ListItem = React.createClass({
  handClick:function(target){
    var localStorageArr = window.localStorage.getItem('isClicked'),
        isClickedArr = localStorageArr ? new RegExp(target,'i').test(localStorageArr) ? localStorageArr : localStorageArr+','+target : target;
    window.localStorage.setItem('isClicked',isClickedArr);
  },
  render:function(){
    var hasMessage = new RegExp(this.props.url,'i').test(window.localStorage.getItem('isClicked')) ? '' : 'dot';
    return (
      <li className={ hasMessage} onClick={ this.handClick.bind(this,this.props.url) }>
      <Link to={ this.props.url } className={this.props.indexVal == 0 ? "px-one-border px-one-border-bottom" : ''}>
          <div className="centerListDiv"><img src={ this.props.imgUrl } />{ this.props.title }<span className={this.props.title == '推荐合伙人计划'? 'recommend-agent' : 'recommend-agent none'}>TA成交你赚钱</span></div>
      </Link>
      </li>
    )
  }
});

//list
var List = React.createClass({
  render:function(){
    var items = this.props.value.map(function(item,i){
      return (
        <ListItem title={ item.title } imgUrl={ item.imgUrl } 
          key={ i } url={ item.url } indexVal={i}/>
      )
    });
    return (
      <ul className={this.props.cName +' px-one-border px-one-border-all'}>{ items }</ul>
    )
  }
});

//个人中心
var Center = React.createClass({
  getInitialState:function(){
    return({
      name:'',
      headImg:'',
      money:0,
      reward:0,
      exam:0,
      deal:0,
      messageLog:false,
      agentId:null
    })
  },
  centerPic:{
    png : require("../../img/phone.png")
  },
  componentWillMount:function(){
      TDAPP.onEvent ("个人中心页打开次数","合伙人");
      var that = this;
      youyiche.getData({
        url:itemConfig.api.getMyCenter
      })
        .then(
          (data)=>{
            if(data.errcode != 0){
              return;
            }
            itemConfig.commonMriginAgentId = encodeURIComponent(data.data.enAid);
            that.setState({
              name:data.data.name,
              headImg:data.data.headimgurl,
              money:data.data.totalMoney,
              reward:data.data.thisMonthMoney,
              agentId:data.data.aid,
              exam:data.data.examNum,
              deal:data.data.dealNum,
              messageLog:data.data.messageLog
            })
          }
        )
  },
  render:function(){
    return (
      <div>
        <PersonalInfo value={ this.state } imgUrl={ staticImg.iconc } />
        <PersonalScore value={ this.state }/>
        <List value={ list[0] } cName='list list1'/>
        <List value={ list[1] } cName='list list2'/>
        <div className='centerPhone px-one-border px-one-border-all'> 
            <a href='tel:021-51796938'><img src={this.centerPic.png}/>专属秘书：021-51796938</a>
        </div>
      </div>
    )
  }
});

export default Center
