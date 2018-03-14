

//  item-car-status项目配置文件（包括api的url以及在本项目中用到的方法）
import youyiche from 'youyiche'
import youyicheWX from 'youyicheWX'

var itemConfig = {
	//api
	api:{
		wxBind:'/wxapp/api/mycar/bind',//1.当前微信用户是否绑定 2.绑定微信用户
		bindVerifycode:'/wxapp/api/mycar/bind_verifycode',//获取验证码
		getCity:'/wxapp/api/mycar/city',//获取城市
		getShop:'/wxapp/api/mycar/shop',//获取监测点
		getCarList:'/wxapp/api/mycar/carlist',//获取监测点
		waitingVN:'/wxapp/api/mycar/waiting_vn',//待跟进卖车需求
		vehcileStatus:'/wxapp/api/mycar/vehicle',//获取具体车辆状态
		rate:'/wxapp/api/mycar/rate'//投票
	},
	//用来存储车辆列表
	carList:'',
	baiduMap:(lon,lat,zoom,markerArr)=>{//lon经度，lat纬度，zoom地图级别
		//创建信息窗口
		var baiduMap = new BMap.Map("baiduMap");//baiduMap为id
		baiduMap.centerAndZoom(new BMap.Point(lon, lat), zoom);
		baiduMap.addControl(new BMap.ZoomControl());  //添加地图缩放控件

        for (var i = 0; i < markerArr.length; i++) {  //绘制点  可以绘制多个点
            var lon = markerArr[i].split(",")[0];  
            var lat = markerArr[i].split(",")[1];  
            baiduMap.addOverlay(new BMap.Marker(new BMap.Point(lon, lat))); //创建标注  将标注添加到地图中
        }
	}
}

export default itemConfig