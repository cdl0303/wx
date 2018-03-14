import youyiche from 'youyiche'
import youyicheWX from 'youyicheWX'
import React from 'react'
import itemConfig from '../../js/itemConfig.js'
import itemShare from '../../js/itemShare.js'
//plan Qrcode
var QrCode = React.createClass({
  render:function(){
    return(
      <div className="code">
        <h2>您的推荐二维码</h2>
        <p>小伙伴扫码即成为合伙人</p>
        <div id='code'></div>
      </div>
    )
  }
});

//plan QrBtn
var QrBtn = React.createClass({
  handClick:function(){
    var newstate = true;
    this.props.callbackParent(newstate);
  },
  render:function(){
    return(
      <div className="qrbtn">
        <div className='submit' onClick={ this.handClick }>邀请小伙伴加入合伙人</div>
        <p>您可以扫码或者转发邀请小伙伴,<br />只要有成交，您就有200元奖励，不封顶哟.</p>
      </div>
    )
  }
});

//Members
var Members = React.createClass({
  render:function(){
    let png1 = require('../../img/no-members.png');
    let png2 = require('../../img/noheadimg.png');
    console.log(this.props.value);
    if(!this.props.value || this.props.value.length == 0){
      return(
        <div className='members no-members'>
          <div className="px-one-border px-one-border-bottom">
            <h4>您的小伙伴</h4>
            <p>尚未邀请小伙伴，还不快试试？点右上角...立即转发邀请</p>
          </div>
          <div>
            <img src={png1}/>
            <p>您还没有小伙伴呦</p>
          </div>
        </div>
      )
    }else {
      var items = this.props.value.map(function(item,i){
        item.headImg
        return(
          <li key={ i }><img src={ item.headImg ? item.headImg : png2 } /><p>贡献:{ item.money }元</p></li>
        )
      });
      return(
        <div className='members has-members'>
          <div><h4>您的小伙伴情况</h4></div>
          <div><ul>{ items }</ul></div>
        </div>
      )
    }
  }
});

//mark
var Mark = React.createClass({
  handClick:function(){
    var newstate = false;
    this.props.callbackParent(newstate);
  },
  render:function(){
    let png = require('../../img/icon13.png');
    return(
      <div className="mark" style={{ display:this.props.show }} onClick={ this.handClick }>
        <img className='point' src={png} />
        <p className='point-p'>转发邀请小伙伴<br/><strong>只要有成交，您就有200元奖励</strong><br/><b>不封顶哟!</b></p>
      </div>
    )
  }
});

//Plan
var Plan = React.createClass({
  getInitialState:function(){
    return({ display:false, recommAgent:[]})
  },
  componentDidMount:function(){
    TDAPP.onEvent ("推荐朋友页打开次数","合伙人");
    var that = this;
  
    youyiche.getData({
      url:itemConfig.api.getAgentByRecommend
    })
      .then(
        (data)=>{
          if(data.errcode != 0){
            return;
          }
          let partialOriginAgentId  = encodeURIComponent(data.data.originAgentId);
          // console.log(partialOriginAgentId);
          $('#code').qrcode({
              width:172,
              height:172, 
              text:'http://'+window.location.host+'/WxWeb/item-agent/index.html?originAgentId='+partialOriginAgentId+'#/join'
          });
          that.setState({
            recommAgent:data.data.recommAgent
          })
          itemShare.join(data.data.agentName,partialOriginAgentId,function(){
            TDAPP.onEvent ("推荐朋友页转发次数","合伙人");
          });
          // youyicheWX.wxShare({
          //     title:'你被'+data.data.agentName+'推荐啦，成为又一车超级代理人，动动手指就能赚钱哟！',
          //     desc: '你提交车源，我们负责跟进，轻松每月1w+',
          //     link:'http://'+window.location.host+'/WxWeb/item-agent/index.html?originAgentId='+partialOriginAgentId+'#/join',
          //     imgUrl: 'http://' + window.document.domain + '/WxWeb/item-agent/img/share.jpg',
          //     success:function(){
          //       TDAPP.onEvent ("推荐朋友页转发次数","合伙人");
          //     }
          // });
        }
      )
  },
  showMark:function(newstate){
    this.setState({display:newstate})
  },
  render:function(){
    var isShow = this.state.display ? 'block' : 'none';
    var recommAgent = this.state.recommAgent;
    return (
      <div>
        <div className='qr-section px-one-border px-one-border-bottom'>
            <QrCode />
            <QrBtn callbackParent={ this.showMark }/>
        </div>
        <div className='offline px-one-border px-one-border-all'>
         <Members value={ recommAgent }/>
        </div>
        <Mark show={ isShow } callbackParent={ this.showMark }/>
      </div>
    )
  }
});
export default Plan