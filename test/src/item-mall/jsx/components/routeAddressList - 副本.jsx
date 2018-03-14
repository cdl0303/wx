import youyiche from '../../../base-common/js/common.js'
import React from 'react'

var mapIcon = require('../../img/marker.png');
var addressList = [
		{
			name:"测试1",
			mobile:'13456789098',
			address:'上海市徐汇区吴中路108号C1',
			isDefault:false
		},
		{
			name:"测试2",
			mobile:'18456789098',
			address:'上海市徐汇区吴中路108号C2',
			isDefault:true
		},
		{
			name:"测试3",
			mobile:'17456789098',
			address:'上海市徐汇区吴中路108号C3',
			isDefault:false
		}
	];
//地址管理
var AddressList = React.createClass({
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
            showLists:true,     //显示地址列表 true:显示  false:隐藏
            showEdit:false,    //显示编辑、添加模块  true:显示  false:隐藏
            isDefaultAddress:false, //默认地址    true:是  false:否
            addressLists:[],       //地址数组
            setIndex:''
        });
    },
    componentDidMount(){
		var that = this;
		var url = "/json.txt";
		youyiche.getJson(url).then(function(data){
			that.setState({
				json:data
			})
		});
		that.setState({
			addressLists:addressList
		})
		console.log(this.state.setIndex);
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
        if(e.value != '-1'){
        	this.setState({
	            selectProvince:e.value,
	            selectCity:'',
	            selectCounty:''
	        });
        }else{
        	this.setState({
	            selectProvince:'',
	            selectCity:'',
	            selectCounty:''
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
	            selectCounty:''
	        });
        }else{
        	this.setState({
	            selectCity:'',
	            selectCounty:''
	        });
        }
        this.refs.county.value = "-1";
    },
    countyChange:function(event){
    	var e = event.target;
    	//console.log(e.value);
    	if(e.value != '-1'){
        	this.setState({
	            selectCounty:e.value
	        });
        }else{
        	this.setState({
	            selectCounty:''
	        });
        }
    },
    getInfo:function(prop,event){
	    this.setState({
	      [prop]:event.target.value
	    })
	},
	
		
	//保存地址
    save:function(){
    	//if(this.state.selectProvince && this.state.selectCity && this.state.selectCounty && this.state.specificAddress){
    		var parm = {
    			username:this.state.username,
    			mobile:this.state.mobile,
    			province:this.state.selectProvince,
    			city:this.state.selectCity,
    			county:this.state.selectCounty,
    			specificAddress:this.state.specificAddress
    		}
    		console.log(parm);
    	//}
    	//console.log(this.state.selectCity);
    },

    //设为默认地址
    setDefault:function(index){
    	this.setState({
    		setIndex:index
    	})
    },
    //编辑 地址
    editAddress:function(){

    },
    //删除地址
    delAddress:function(){

    },
    add:function(){
    	this.setState({
    		showEdit:true,
    		showLists:false
    	})
    },
    render: function(){
        return (
                <div className="addressBox">
            
                	{this.state.showLists ? 
	                	<div className="addressList">
	                	{
	                		this.state.addressLists.map(function(item,key){
	                			return(
	                				<div className="addressListItem">
			            				<div className="addressInfo">
			            					<p>
			            						<span className="addInfoName">{item.name}</span>
			            						<span>{item.mobile}</span>
			            					</p>
			            					<p>
			            						<span>{item.address}</span>
			            					</p>
			            				</div>
			            				<div className="addressOptions">
			            					<div className="setDefault">
			            						<span onClick={this.setDefault.bind(this,key)} className={this.state.setIndex == key ? "setedIocn spanIcon" : "spanIcon"}><em></em>设为默认</span>
			            					</div>
			            					<div className="editDel">
			            						<span className="editIcon spanIcon" onClick={this.editAddress}><em></em>编辑</span>
			            						<span className="delIcon spanIcon" onClick={this.delAddress}><em></em>删除</span>
			            					</div>
			            				</div>
			                		</div>
	                			)
	                		},this)
	                	}
	                		<div className="addNews">
		                   		<div className="addNewsBtn">
		                   			<span onClick={this.add}>新增地址</span>
		                   		</div>
		                   </div>
	                	</div>
                	: ''}
                
                	
                	{this.state.showEdit ?
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
		                			<input type="text" placeholder="收货人手机号" onChange={this.getInfo.bind(this,'mobile')}/>
		                		</div>

		                	</div>
		                	<div className="addressItem">
		                		<span className="addressItemTit">选择地区</span>
		                		<div className="addressItemCont">
			                		<select  onChange={this.provinceChange}>
				                        <option key="-1" value="-1" data-index="-1">选择省份</option>
				                        {this.provinceOption()}
				                    </select>
				                    <select  onChange={this.cityChange} ref="city">
				                        <option key="-1" value="-1" data-index="-1">选择城市</option>
				                        {this.state.defaultCity}
				                    </select>
				                     <select onChange={this.countyChange} ref="county">
				                        <option key="-1" value="-1" data-index="-1">选择地区</option>
				                        {this.state.defaultCounty}
				                    </select>
			                    </div>

		                	</div>
		                    
		                    <div className="addressItem">
		                    	<span className="addressItemTit">详细地址</span>
		                    	<div className="addressItemCont">
		                    		<input type="text" placeholder="街道门派地址" onChange={this.getInfo.bind(this,'specificAddress')}/>
		                    	</div>
		                    </div>
		                    <div className="addressItem">
		                    	<span className="addressItemTit">邮政编码</span>
		                    	<div className="addressItemCont">
		                    		<input type="text" placeholder="邮政编码（选填）" onChange={this.getInfo.bind(this,'specificAddress')}/>
		                    	</div>
		                    </div>
		                   <div className="addressfixed">
		                   		<div className="addressBtn">
		                   			<span onClick={this.save}>保存</span>
		                   		</div>
		                   </div>
	                	</div>
	                	: ''
                	}
                	
                	
                </div>
           );
        }
});

export default AddressList