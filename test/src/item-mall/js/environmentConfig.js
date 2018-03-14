
// 环境配置
var environmentConfig = {
    baseUrl:"http://"+location.host,  //api域名 http://shop.dev.youyiche.com
    tokenUrl:"http://wx.dev.youyiche.com", //获取授权token的api域名
    appid:'wxa96ed258599c7a38', //微信授权用的appid (开发和测试环境使用这个)
    appidGroundStaff:{
    	appid:'wx4eaca523c8c658c5',//地推项目使用的appid(测试和开发共用一个)
    	baseUrl:'http://dbtool.youyiche.com/'
    },
    appidMall:{
    	appid:'wx4eaca523c8c658c5', //地推项目使用的appid(测试和开发共用一个)
    	baseUrl:'http://dbtool.youyiche.com/'
    }
}




