import youyiche from '../../base-common/js/youyiche.js'
import youyicheWX from '../../base-common/js/youyicheWX.js'
// 接口 api
var itemConfig = {
	api:{
		appOauthUrl:'/agentForWxApi/getAgentInfo',  //入口接口
        registerCarneed:'/webapi/public/register_carneed',   //提交车源 (接口域名需使用youyiche.publicParams.baseUrl)
        getRecordLogByNeedid:'/agentForWxApi/getRecordLogByNeedid',
        getIncome:'/agentForWxApi/getAgentSuretyGroupByDate', //收入
        getIncomeDetail:'/agentForWxApi/getAgentSurety', //收入明细
        getMyCenter:'/agentForWxApi/getAgentAccountInfo',   //我的
        editAccountInfo:'/agentForWxApi/editAgentPayAccountInfo',//编辑代理账户
        getCars:'/agentForWxApi/getAgentRecord',//车源进行中
        getPayAccountInfo:'/agentForWxApi/getAgentPayAccountInfo',//获取代理人支付信息
        getAgentNearSubsidy:'/agentForWxApi/getAgentNearSubsidy', //获取最新激励方案
        getAgentByRecommend:'/agentForWxApi/getAgentByRecommend', //获取我推荐的代理人信息
        getRecommentPage:'/agentForWxApi/getRecommentAgentBySharePage',//获取分享人信息
        adviceRegisterByAgent:'/agentForWxApi/registerByAgent', //推荐代理人注册
        registerByOnline:'/agentForWxApi/registerByOnline',//线上注册代理人
        getVerifycode:'/agentForWxApi/verifycode', // 获取验证码


        agentInfo: '/wx_vehicle_agent/getAgentInfo?group_id=1', //代理人信息
        failureSouce:'/wx_vehicle_agent/getMySureties?date=',  //跟踪
        getMateriel:'/wx_vehicle_agent/getMateriel',      //营销物料
        
        registerByAgent:'/wx_vehicle_agent/registerByAgent',//代理人注册
        registerbybindcode:'/wx_vehicle_agent/registerbybindcode', // 注册绑定码
        checkopenidsubscribe:'/wx_vehicle_agent/checkopenidsubscribe', 

	},
    wxShare:function(options){
    	youyiche.wxShare({
    		title:options.title,
	        desc: options.desc,
	        link:options.link,
	        imgUrl:options.imgUrl || "" ,
	        success:function(){
	          options.success && options.success();
	        }
    	})
    },

    //滚动条高度
    getScrollTop(){
    　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    　　if(document.body){
    　　　　bodyScrollTop = document.body.scrollTop;
    　　}
    　　if(document.documentElement){
    　　　　documentScrollTop = document.documentElement.scrollTop;
    　　}
    　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    　　return scrollTop;
    } ,

    //内容高度 
    getScrollHeight(){
    　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    　　if(document.body){
    　　　　bodyScrollHeight = document.body.scrollHeight;
    　　}
    　　if(document.documentElement){
    　　　　documentScrollHeight = document.documentElement.scrollHeight;
    　　}
    　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    　　return scrollHeight;
    },

    //容器高度 
    getWindowHeight(){
    　　var windowHeight = 0;
    　　if(document.compatMode == "CSS1Compat"){
    　　　　windowHeight = document.documentElement.clientHeight;
    　　}else{
    　　　　windowHeight = document.body.clientHeight;
    　　}
    　　return windowHeight;
    },
    productShare:function(shareTitle,shareContent,shareIconUrl,enParam,pid){
    	this.wxShare({
    		title:shareTitle,
    		desc:shareContent,
    		link:'http://' + window.location.host+ '/WxWeb/item-agent/index.html?enParam=' + enParam +'#/productDetail/' + pid,
    		imgUrl:shareIconUrl,
    		success:function(){
    			youyiche.getAgentStatisticalConfig('share');
    		}
    	})
    },
    commonMriginAgentId:'', //全局变量  加密代理人信息

    // Remove a value from an array
    removeArr:function (arr,target) {
      for(var i=0;i<arr.length;i++){
        if(arr[i] == target){
          arr.splice(i,1);
        }
      }
      return arr;
    },
    agenInfoParm:{
        agentId:''
    }

    
}
export default itemConfig
