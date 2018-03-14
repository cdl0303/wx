
import youyiche from 'youyiche'
import youyicheWX from 'youyicheWX'
import React from 'react'
import itemConfig from '../../js/itemConfig.js'

//Marketing
var Marketing = React.createClass({
  marketingPic:{
    
    png:require('../../img/yxzs_tit.png'),
     png1:require('../../img/yxzs_01.png'),
     png2:require('../../img/yxzs_02.png'),
     png3:require('../../img/yxzs_03.png'),
     
    
  },
  componentDidMount:function(){
    TDAPP.onEvent ("营销助手打开次数","合伙人");
    youyicheWX.wxShare({
        title:'我为大家推荐又一车二手车交易平台，卖车值得信赖！ ',
        desc: '又一车服务免费、千余家车商竞价，让您的爱车价更高！',
        link: 'http://' + window.location.host+'/WxWeb/item-car-source/index.html?origin=vehicleagent&enAid='+itemConfig.commonMriginAgentId,
        imgUrl: 'http://' + window.document.domain + '/WxWeb/images/share1.5.jpg',
        success:function(){
          TDAPP.onEvent ("营销助手转发次数","合伙人");
        }
    });
  },
  render:function(){
    
    return (
      <div className='Marketing-page'>
        <img src={this.marketingPic.png}/>
        <img src={this.marketingPic.png1}/>
        <img src={this.marketingPic.png2}/>
        <img src={this.marketingPic.png3}/>
        
     
      </div>
    )
  }
});

export default Marketing