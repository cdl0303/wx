import youyiche from 'youyiche'

var itemConfig = {
	ajaxSuccessEvent:function(response,data,successCallback,errorCallback){
		if(response.success){
			successCallback && successCallback(data);
		}else{
			errorCallback && errorCallback(response.message);
		}
	},
	ajaxSubmitNumber:function(rq,successCallback,errorCallback){//安排检测or再来一单
		var self = this;
		var request = {
			number:rq.number, //车辆编号或者卖车需求编号(检测任务号)
			type:rq.type  //任务类型(0:安排检测,1:再来一单)
		};
		
		youyiche.getData({
			url:'/qywx/api/apjc/vehicle_check',
			data:request,
			howDoWithSameAjax:'exclusive'
		}).then(function(response){
			var data = {};
			var rData = response.ret||{};
			if(request.type==0){
				data.vnId=rData.vnId; //卖车需求编号
        		data.cName=rData.cName;  //潜客姓名
        		data.vNumber=rData.vNumber; //车辆编号
				data.vInfo=rData.vInfo; //车辆信息
			}else if(request.type==1){
				data.shop=rData.shop;  //门店|检测点
        		data.remark=rData.remark;  //备注
            	data.city=rData.city; //城市
            	data.shopId=rData.shopId;   //检测点Id
            	data.examinantId=rData.examinantId; //检测师Id
			}
        	data.origin=rData.origin; //来源
        	data.timestamp=rData.timestamp;  //服务器时间
			self.ajaxSuccessEvent(response,data,successCallback,errorCallback);
		})
	},
	ajaxSubmitTaskDetail:function(rq,successCallback,errorCallback){//创建任务
		var self = this;
		var request = {
			number:rq.number, //车辆编号或者卖车需求编号(检测任务号)
			type:rq.type,  //任务类型(0:安排检测,1:再来一单)
			timestamp:rq.timestamp,
			city:rq.city,
			shopId:rq.shopId,
			examinantId:rq.examinantId,
			remark:rq.remark
		};

		youyiche.getData({
			method:"POST",
			url:'/qywx/api/apjc/et',
			data:request,
			howDoWithSameAjax:'exclusive'
		}).then(function(response){
			var data = {};
			var rData = response.ret||{};

			data.vnId=rData.vnId; //卖车需求编号
        	data.vNumber=rData.vNumber; //车辆编号
			data.shop=rData.shop;  //门店|检测点
        	data.origin=rData.origin; //来源

			self.ajaxSuccessEvent(response,data,successCallback,errorCallback);
		})
	},
	ajaxGetCity:function(rq,successCallback,errorCallback){//获取城市
		var self = this;

		youyiche.getData({
			url:'/qywx/api/apjc/city',
			howDoWithSameAjax:'once'
		}).then(function(response){
			var data = response.ret||[];
			self.ajaxSuccessEvent(response,data,successCallback);
		})
	},
	ajaxGetTest:function(rq,successCallback,errorCallback){//获取城市
		var self = this;
		var request = {
			city:rq.city //城市
		};

		youyiche.getData({
			url:'/qywx/api/apjc/shop_examinant',
			data:request,
		}).then(function(response){
			var data = {};
			var rData = response.ret||{};
			data.shops = rData.shops;
			data.examinants = rData.examinants;
			self.ajaxSuccessEvent(response,data,successCallback);
		})
	},
	common:{
		city:null
	}
}

export default itemConfig




