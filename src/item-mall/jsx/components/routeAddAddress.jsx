import youyiche from 'youyiche'
import React from 'react'

var mapIcon = require('../../img/marker.png');

//地址管理
var Address = React.createClass({
    //json: source,
    getInitialState: function(){
        return ({
        	json:[],
        	mobile:'',        //手机号
        	username:'',      //姓名
            defaultCity: this.cityOption(),
            defaultCounty: this.countyOption(),
            selectProvince:'',  //选择省份
            selectCity:'',      //选择城市
            selectCounty:'',    //选择区
            specificAddress:'',  //具体地址
            postCode:'',          //邮政编码

            spanProvince:'选择省份', //显示选中省份
            spanCity:'选择城市',     //显示选中城市
            spanCounty:'选择地区',  //显示选中区
           
        });
    },
    componentDidMount(){
		var that = this;
		var url = "/quote/json.txt";
		youyiche.getJson(url).then(function(data){
			that.setState({
				json:data
			})
		});
		
	},
    provinceOption: function(){
        return this.state.json.map(function(array, index){
            return (<option key={index} data-index={index}>{array.name}</option>);
        });
    },
    cityOption: function(){
        if(this.index.provinceIndex == -1){
            return false;
        }else{
        	
            return this.state.json[this.index.provinceIndex].city.map(function(array, index){
                return (<option key={index} data-index={index}>{array.name}</option>);
            });
        }
    },
    countyOption: function(){
        if(this.index.cityIndex == -1){
            return false;
        }else{
            return this.state.json[this.index.provinceIndex].city[this.index.cityIndex].area.map(function(array, index){
                return (<option key={index} data-index={index}>{array}</option>);
            });
        }
    },
    index: {
        provinceIndex: -1,
        cityIndex: -1
    },
    
    provinceChange: function(event){

        var e = event.target;
        this.index.provinceIndex = e.options[e.selectedIndex].getAttribute("data-index");
        this.index.cityIndex = -1;
        this.setState({
            defaultCity: this.cityOption(),
            defaultCounty: this.countyOption()
        });
       // console.log(e.value);
        if(e.value != '-1'){

        	this.setState({
	            selectProvince:e.value,
	            selectCity:'',
	            selectCounty:'',
	            spanProvince:e.value
	        });
	        
        }else{
        	this.setState({
	            selectProvince:'',
	            selectCity:'',
	            selectCounty:'',
	            spanProvince:'选择省份',
	            spanCity:'选择城市',
        		spanCounty:'选择地区'
	        });
        }
        this.refs.city.value = "-1";
        this.refs.county.value = "-1";

    },
    cityChange: function(event){
        var e = event.target;
        this.index.cityIndex = e.options[e.selectedIndex].getAttribute("data-index");
        this.setState({
            defaultCounty: this.countyOption()
        });
        if(e.value != '-1'){
        	this.setState({
	            selectCity:e.value,
	            selectCounty:'',
	            spanCity:e.value
	        });
	       
        }else{
        	this.setState({
	            selectCity:'',
	            selectCounty:'',
	            spanCity:'选择城市',
	            spanCounty:'选择地区'
	        });
	       
	        
        }
       
        this.refs.county.value = "-1";
        
        
    },
    countyChange:function(event){
    	var e = event.target;
    	//console.log(e.value);
    	if(e.value != '-1'){
        	this.setState({
	            selectCounty:e.value,
	            spanCounty:e.value
	        });
	        
        }else{
        	this.setState({
	            selectCounty:'',
	            spanCounty:'选择地区'
	        });
        }

    },
    getInfo:function(prop,event){
	    this.setState({
	      [prop]:event.target.value
	    })
	},
	
	//删除左右两端的空格
	 getTrim:function(str){
	 	return str.replace(/(^\s*)|(\s*$)/g, "");
	 },
	//保存地址
    save:function(){
    	var that = this;
    	if(that.state.username == ""){
    		alert("收货人姓名不能为空！");
    	}else if(that.state.mobile == "" || !/^1[3,4,5,8]{1}(\d){9}$/i.test(that.state.mobile)){
    		alert("输入正确的手机号码");
    	}else if(that.state.selectProvince == ""){
    		alert("请选择省份！");
    	}else if(that.state.selectCity == ""){
    		alert("请选择城市！");
    	}else if(that.state.selectCounty == ""){
    		alert("请选择地区！");
    	}else if(that.state.specificAddress == ""){
    		alert("请填写详细地址！");
    	}else{
    		var parm = {
	    			username:that.getTrim(that.state.username),
	    			mobile:that.getTrim(that.state.mobile),
	    			province:that.state.selectProvince,
	    			city:that.state.selectCity,
	    			county:that.state.selectCounty,
	    			specificAddress:that.getTrim(that.state.specificAddress),
	    			postCode:that.getTrim(that.state.postCode)
	    		}
	    	console.log(parm);
    	}
    
    },


    
    render: function(){
        return (
                <div className="addressBox">
                	
                		<div className="addressMenu">
	                		<div className="addressItem">
	                			<span className="addressItemTit">收货人</span>
		                		<div className="addressItemCont">
		                			<input type="text" placeholder="收货人姓名" onChange={this.getInfo.bind(this,'username')}/>
		                		</div>
		                	</div>
		                	<div className="addressItem">
		                		<span className="addressItemTit">联系电话</span>
		                		<div className="addressItemCont">
		                			<input type="tel" maxLength="11" placeholder="收货人手机号" onChange={this.getInfo.bind(this,'mobile')}/>
		                		</div>

		                	</div>
		                	<div className="addressItem">
		                		<span className="addressItemTit">选择地区</span>
		                		<div className="addressItemCont">
		                			<span className="selectSpan">
		                				<span className="positionSpan" id="provinceTxt">{this.state.spanProvince}</span>
		                				<select  onChange={this.provinceChange}>
					                        <option key="-1" value="-1" data-index="-1">选择省份</option>
					                        {this.provinceOption()}
					                    </select>
		                			</span>

			                		<span className="selectSpan">
			                			<span className="positionSpan" id="cityTxt">{this.state.spanCity}</span>
					                    <select  onChange={this.cityChange} ref="city">
					                        <option key="-1" value="-1" data-index="-1">选择城市</option>
					                        {this.state.defaultCity}
					                    </select>
					                </span>
					                <span className="selectSpan">
					                	<span className="positionSpan" id="countyTxt">{this.state.spanCounty}</span>
					                     <select onChange={this.countyChange} ref="county">
					                        <option key="-1" value="-1" data-index="-1">选择地区</option>
					                        {this.state.defaultCounty}
					                    </select>
					                </span>
			                    </div>

		                	</div>
		                    
		                    <div className="addressItem">
		                    	<span className="addressItemTit">详细地址</span>
		                    	<div className="addressItemCont">
		                    		<textarea placeholder="街道门派地址" onChange={this.getInfo.bind(this,'specificAddress')}></textarea>
		                    		
		                    	</div>
		                    </div>
		                    <div className="addressItem">
		                    	<span className="addressItemTit">邮政编码</span>
		                    	<div className="addressItemCont">
		                    		<input type="text" placeholder="邮政编码（选填）" onChange={this.getInfo.bind(this,'postCode')}/>
		                    	</div>
		                    </div>
		                   <div className="addressfixed">
		                   		<div className="addressBtn">
		                   			<span onClick={this.save}>保存</span>
		                   		</div>
		                   </div>
	                	</div>
	                
                	
                	
                </div>
           );
        }
});

export default Address