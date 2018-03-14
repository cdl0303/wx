

//  item-ground-staff项目配置文件（包括api的url以及在本项目中用到的方法）
import youyiche from 'youyiche'
import youyicheWX from 'youyicheWX'

var itemConfig = {
	//api
	api:{
		getBrandAddress:'/groundStaff/getBrandAddress',//获取品牌网点信息
		getGroundStaffGpsRecord:'/groundStaff/getGroundStaffGpsRecord',//记录代理人GPS坐标
		getAgentByMobile:'/groundStaff/getAgentByMobile',//通过手机号调取代理人信息
		getCarDealersByGeo:'/groundStaff/getCarDealersByGeo',//根据地理位置查询经销商
		registerAgent:'/groundStaff/registerAgent',//提交代理人
		getNoActiveAgentList:'/groundStaff/getNoActiveAgentList',//查看未激活代理人列表
		getNoActiveAgentQRCode:'/groundStaff/getNoActiveAgentQRCode',//查看未激活代理人二维码
		getAgentTypes:'/groundStaff/getAgentTypes',//代理人归类
		getAgentListByTypeAndParam:'/groundStaff/getAgentListByTypeAndParam',//地推人员名下代理人列表
		getAgentDetail:'/groundStaff/getAgentDetail',//代理人详情页
		getFollowRecord:'/groundStaff/getFollowRecord',//代理人跟进记录获取
		addFollowRecord:'/groundStaff/addFollowRecord',//代理人跟进记录添加
		getAgentTongji:'/groundStaff/getAgentTongji',//地推员业绩
		getAgentListFromTongji:'/groundStaff/getAgentListFromTongji',//代理人列表页（我的业绩）
		getAgentTongjiByMonth:'/groundStaff/getAgentTongjiByMonth',//根据月份查询地推人员的业绩
		getAgentTasksDetail:'/groundStaff/getAgentTasksDetail',//代理人参加活动详情
		getCarDealerActivity:'/groundStaff/getCarDealerActivity',//地推人员名下的代理人所属网点的代理人提交车源、成交车源经销商详情
		getCardealerAgentList:'/groundStaff/getCardealerAgentList',//根据经销商查看代理人情况
		getAgentBrandAndName:'/groundStaff/getAgentBrandAndName',//获取归类为4s代理人的品牌和网点
		updateAgentBrandAndName:'/groundStaff/updateAgentBrandAndName',//修改归类为4S的代理人的品牌和网点
		addAgentToNetWork:'/groundStaff/addAgentToNetWork'//添加代理人到网点
	},
	//代理人归类,用来存储agentTypes,防止多次http重复请求
	agentTypes:'',
	//代理人品牌和网点,brandAddress,防止多次http重复请求
	brandAddress:''
}

export default itemConfig