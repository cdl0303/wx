import youyiche from '../../base-common/js/youyiche.js'
import youyicheWX from '../../base-common/js/youyicheWX.js'



// 接口 api
var itemShare = {
    join:function(agentName,partialOriginAgentId,success){
        youyicheWX.wxShare({
            title:'你被'+agentName+'推荐啦，成为又一车车源合伙人，动动手指就能赚钱哟！',
            desc: '你提交车源，我们负责跟进，轻松每月1w+',
            link:'http://' + window.location.host+'/WxWeb/item-agent/index.html?originAgentId='+partialOriginAgentId+'#/join',
            imgUrl: 'http://' + window.location.host + '/WxWeb/images/share.jpg',
            success:success
        });
    }
}

export default itemShare
