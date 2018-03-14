import youyiche from 'youyiche'
import itemConfig from 'itemConfig'
import React from 'react';
import ReactTipPop from 'reactComponents/react-tip-pop/component.jsx'

class FormTip extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'FormTip';
    }
    render(){
    	if(this.props.type==0){
    		return <div className="group-item colorRed">请先与当地检测主管沟通<br />确认检测师有承接能力后再进行提交</div>;
    	}else{
    		return null;
    	}
    }
}

class SelectText extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'SelectText';
        this.eventChange = this.eventChange.bind(this);
    }
    eventChange(event) {
        this.props.change(event,this.props.id)
    }
    render(){
    	return  <div className={this.props.childClass?this.props.childClass:'group-select'}>
    				<select id={this.props.id} className="select-text" onChange={this.eventChange}>
	    				{
		    				this.props.options.map((item)=>{
                                let id = item.id==undefined?item:item.id;
                                let name = item.name==undefined?item:item.name;
		    					return <option value={id}>{name}</option>
		    				})
	    				}
	    			</select>
    			</div>;
    }
}

class RouteInputTaskDetail extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'RouteInputTaskDetail';
        this.eventSelect = this.eventSelect.bind(this);
        this.eventSubmit = this.eventSubmit.bind(this);
        this.eventInputRemarks = this.eventInputRemarks.bind(this);

        this.submitNumberResponseSS = sessionStorage.getItem("submitNumberResponse");
        this.submitNumberResponse = this.submitNumberResponseSS ? JSON.parse(this.submitNumberResponseSS):{};


        let des = this.createDes(this.submitNumberResponse);
        let day = this.createDay(parseInt(this.submitNumberResponse.timestamp));

        this.state = {
        	des:des,
        	day:day,
        	time:["时","08","09","10","11","12","13","14","15","16","17","18","19","20"],
        	minute:["分","00","15","30","45"],
        	city:["城市"],
        	locations:[
                {
                    id:0,
                    name:"检测点"
                }
            ],
        	masterWorker:[
                {
                    id:0,
                    name:"检测师"
                }
            ],
            disbled:'disbled'
        }
        this.request = {
            number:this.submitNumberResponse.number || "",
            type:parseInt(this.props.params.type),
            day:this.state.day[0],
            time:this.state.time[0],
            minute:this.state.minute[0],
            city:this.state.city[0],
            locations:this.state.locations[0],
            masterWorker:this.state.masterWorker[0],
            remarks:''
        };

        this.domElement = {};
    }
    componentDidMount(){
        this.domElement.domDay = document.querySelector("#day");
        this.domElement.domTime = document.querySelector("#time");
        this.domElement.domMinute = document.querySelector("#minute");
        this.domElement.domCity = document.querySelector("#city");
        this.domElement.domLocations = document.querySelector("#locations");
        this.domElement.domMasterWorker = document.querySelector("#masterWorker");

        this.getCity();
        this.setDefaultDate(this.submitNumberResponse);
    }
    disbledButton(){//禁用submit button
        this.setState({
            disbled:'disbled'
        })
    }
    showReactTipPop(value){ //显示提示框
        this.refs.reactTipPop.show(value);
    }
    createDes(data){//创建描述
    	let des = [
    		{
    			name:"卖车需求编号",
    			value:data.vnId || ''
    		},
    		{
    			name:"潜客姓名",
    			value:data.cName || ''
    		},
    		{
    			name:"车辆编号",
    			value:data.vNumber || ''
    		},
    		{
    			name:"来源",
    			value:data.origin || ''
    		},
    		{
    			name:"车辆信息",
    			value:data.vInfo || ''
    		}
        ];
        if(this.props.params.type==1){
        	des = [
        		{
	    			name:"来源",
	    			value:data.origin || ''
	    		},
	    		{
	    			name:"门店",
	    			value:data.shop || ''
	    		},
	    		{
	    			name:"备注",
	    			value:data.remark || ''
	    		}
        	];
        }
        return des;
    }
    createDay(timeStamp){//创建日期
        let date1 = youyiche.formatTime(timeStamp,"string","-",false);
        let date2 = youyiche.formatTime(timeStamp+86400000,"string","-",false);
        let date3 = youyiche.formatTime(timeStamp+86400000*2,"string","-",false);
        let date4 = youyiche.formatTime(timeStamp+86400000*3,"string","-",false);
        let day1 = youyiche.getDayOfWeek(timeStamp);
        let day2 = youyiche.getDayOfWeek(timeStamp+86400000);
        let day3 = youyiche.getDayOfWeek(timeStamp+86400000*2);
        let day4 = youyiche.getDayOfWeek(timeStamp+86400000*3);
        let result = [
            {
                id:0,
                name:"日期"
            },
            {
                id:date1,
                name:"今天"+"("+date1+day1+")"
            },
            {
                id:date2,
                name:"明天"+"("+date2+day2+")"
            },
            {
                id:date3,
                name:"后天"+"("+date3+day3+")"
            },
            {
                id:date4,
                name:"三天后"+"("+date4+day4+")"
            }
        ];
        return result;
    }
    regSingle(id,tip,isTip){//验证单个select
        let selectDom = document.getElementById(id);
        if(selectDom.selectedIndex==0){
            this.disbledButton();
            isTip && this.showReactTipPop(tip);
            return false;
        }
        return true;
    }
    regAll(isTip) {//验证表单
        let result = false;
        if(!this.regSingle("day","请选择日期",isTip)){
            return result;
        }
        if(!this.regSingle("time","请选择小时",isTip)){
            return result;
        }
        if(!this.regSingle("minute","请选择分钟",isTip)){
            return result;
        }
        if(!this.regSingle("city","请选择城市",isTip)){
            return result;
        }
        if(!this.regSingle("locations","请选择检测点",isTip)){
            return result;
        }
        if(!this.regSingle("masterWorker","请选择检测师",isTip)){
            return result;
        }
        if(!this.request.number){
            this.disbledButton();
            this.showReactTipPop('出错了');
            return result;
        }
        result = true;
        if(result){
            this.setState({
                disbled:''
            })
        }
        return result;
    }
    setDefaultDate(submitNumberResponse){//设置默认时间
        let timeStamp = submitNumberResponse?submitNumberResponse.timestamp:0;
        let cDate;
        let element = this.domElement;
        
        let setDomTime = ()=>{
            if(cDate.minute>=45){
                element.domTime.selectedIndex = cDate.hour-6;
            }else{
                element.domTime.selectedIndex = cDate.hour-7;
            }
        };
        let setDomMinute = ()=>{
            if(cDate.minute<15){
                element.domMinute.selectedIndex = 2;
            }else if(cDate.minute>=15 && cDate.minute<30){
                element.domMinute.selectedIndex = 3;
            }else if(cDate.minute>=30 && cDate.minute<45){
                element.domMinute.selectedIndex = 4;
            }else{
                element.domMinute.selectedIndex = 1;
            }
        };

        if(!timeStamp){
            return;
        }

        cDate = youyiche.formatTime(timeStamp,"object");
        if(cDate.hour<8){//8:00以前
            element.domDay.selectedIndex = element.domTime.selectedIndex = element.domMinute.selectedIndex = 1;
        }else if(cDate.hour>20 ||(cDate.hour==20 && cDate.minute>=45)){//20:45以后
            element.domDay.selectedIndex = 2;
            element.domTime.selectedIndex = element.domMinute.selectedIndex = 1;
        }else{//中间
            element.domDay.selectedIndex = 1;
            setDomTime();
            setDomMinute();
        }
        this.request.day = {
            id:element.domDay.value,
            name:element.domDay.options[element.domDay.selectedIndex].text
        }
        this.request.time=element.domTime.value;
        this.request.minute=element.domMinute.value;
        this.regAll(false);
    }
    setDefaultTest(){//设置默认检测(城市、检测点、检测师)
        let element = this.domElement;

        let city = this.submitNumberResponse.city;
        let shopId = this.submitNumberResponse.shopId;
        let examinantId = this.submitNumberResponse.examinantId;
        let self = this;

        if(!city){
            return;
        }

        let setFn = (domElement,id)=>{
            for(var j=0;j<domElement.length;j++){
                if((id=="locations"&&domElement[j].value==shopId)||(id=="masterWorker"&&domElement[j].value==examinantId)){
                    domElement[j].selected = true;
                    self.request[id] = {
                        id:domElement[j].value,
                        name:domElement[j].text
                    }
                }
            }
            self.regAll(false);
        }
        for(var i=0;i<element.domCity.length;i++){
            if(element.domCity[i].value==city){
                element.domCity[i].selected = true;
                self.request.city=element.domCity.value;

                self.getTest(element.domCity.value,(domElement,id)=>{
                    setFn(domElement,id);
                });
            }
        }
    }
    setOptions(id,options,callback){//设置各选择框options
        let stateArr = id=="city"?itemConfig.common.city:options
        let state = {
            [id]:[]
        };

        state[id].push(this.state[id][0]);
        Array.prototype.push.apply(state[id], stateArr);
        
        this.setState(state,()=>{
            callback && callback();
        })
    }
    getCity(){//获取城市
        let self = this;
        let callback = () => {
            self.props.params.type==1 && self.setDefaultTest();
        };
        itemConfig.ajaxGetCity(
            null,
            (data)=>{
                itemConfig.common.city = data;
                self.setOptions("city",null,callback);
            }
        )
    }
    getTest(city,callback){//获取检测师和检测点
        let self = this;
        let arr = [];
        if(self.domElement.domCity.selectedIndex==0){
            self.setOptions("locations",arr);
            self.setOptions("masterWorker",arr);
        }else{
            itemConfig.ajaxGetTest(
                {city},
                (data)=>{
                    self.setOptions("locations",data.shops,()=>{
                        if(callback){
                            callback(self.domElement.domLocations,"locations");
                        }else{
                            self.domElement.domLocations.selectedIndex = 0;
                        }
                    });
                    self.setOptions("masterWorker",data.examinants,()=>{
                        if(callback){
                            callback(self.domElement.domMasterWorker,"masterWorker");
                        }else{
                            self.domElement.domMasterWorker.selectedIndex = 0;
                        }
                    });
                }
            )
        }
    }
    eventSelect(event,id) {//切换选择
        let selectDom = event.target;
        if(id=="day"||id=="locations"||id=="masterWorker"){
            this.request[id]={
                id:selectDom.value,
                name:selectDom.options[selectDom.selectedIndex].text
            };
        }else{
            this.request[id]=event.target.value;
        }
        
        this.regAll(false);
        
        if(id=="city"){
            this.getTest(this.request[id]);
        }
    }
    eventInputRemarks(event){//输入备注
        this.request.remarks = event.target.value;
    }
    eventSubmit(event) {//提交
        let self = this;
        let dayArr = this.request.day.id.split("-");
        let timestamp = new Date(dayArr[0],dayArr[1]-1,dayArr[2],parseInt(this.request.time),parseInt(this.request.minute)).getTime();
        let request = {
            number:this.request.number,
            type:this.request.type,
            timestamp:timestamp,
            city:this.request.city,
            shopId:parseInt(this.request.locations.id),
            examinantId:parseInt(this.request.masterWorker.id),
            remark:this.request.remarks
        }

        if(!request.number){
            return false;
        }
        if(this.state.disbled!="disbled"){
            itemConfig.ajaxSubmitTaskDetail(
                request,
                (data)=>{
                    let to = '/success/'+self.props.params.type;
                    let submitTaskDetailResponse = youyiche.extend(self.request,data);
                    sessionStorage.setItem("submitTaskDetailResponse",JSON.stringify(submitTaskDetailResponse));
                    self.props.history.pushState(null,to);
                },
                (message)=>{
                    self.showReactTipPop(message);
                }
            )
        }else{
            this.regAll(true);
        }
    }
    render() {
        return  <div className="page-input-task-detail">
        			<div className="des">
        				{
        					this.state.des.map((item)=>{
        				        return <p>{item.name}:{item.value}</p>;
        				    })
        				}
        			</div>
        			<form action="" className="detail">
        				<SelectText id="day" options={this.state.day} change={this.eventSelect} />
        				<div className="group-select">
        					<SelectText id="time" childClass="group-select-item" options={this.state.time} change={this.eventSelect} />
        					<SelectText id="minute" childClass="group-select-item" options={this.state.minute} change={this.eventSelect} />	
        				</div>
        				<SelectText id="city" options={this.state.city} change={this.eventSelect} />
        				<SelectText id="locations" options={this.state.locations} change={this.eventSelect} />
        				<SelectText id="masterWorker" options={this.state.masterWorker} change={this.eventSelect} />
        				<div className="group-textarea">
        					<textarea className="textarea-text" id="remarks" placeholder="备注" onChange={this.eventInputRemarks}></textarea>
        				</div>
        				<FormTip type={this.props.params.type} />
        				<div className="group-btn">
                            <span className={"btn buttonDefault "+this.state.disbled} onClick={this.eventSubmit}>下一步</span>
        				</div>
        			</form>
                    <ReactTipPop ref="reactTipPop" />
        		</div>;
    }
}

export default RouteInputTaskDetail;
