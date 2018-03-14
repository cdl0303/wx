
// 环境配置(生产)
var environmentConfig = {
	appid:'wxde0fc0146fc3a732', //微信授权用的appid(默认公众号)
    baseUrl:"http://b.youyiche.com",  //api域名(默认)
    tokenUrl:"http://wxservice.youyiche.com", //与微信相关api域名(获取token)
    appidGroundStaff:{//地推项目使用
    	appid:'wx4eaca523c8c658c5',
    	baseUrl:'http://dbtool.youyiche.com'
    }
}

// 环境配置(测试)
// var environmentConfig = {
// 	appid:'wxa96ed258599c7a38', //微信授权用的appid(默认公众号)
//     baseUrl:"http://uat.youyiche.com",  //api域名(默认)
//     tokenUrl:"http://uatwxservice.youyiche.com", //与微信相关api域名(获取token)
//     appidGroundStaff:{//地推项目使用
//     	appid:'wx4eaca523c8c658c5',
//     	baseUrl:'http://uatdbtool.youyiche.com'
//     }
// }


