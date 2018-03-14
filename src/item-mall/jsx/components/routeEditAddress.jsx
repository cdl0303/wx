import youyiche from 'youyiche'
import React from 'react'

var mapIcon = require('../../img/marker.png');

var editData = [
    {
        selectCounty:'方山县',
        selectCity:'吕梁',
        selectProvince:'山西',
        username:'测试123',
        mobile:'15891874563',
        specificAddress:'吴中路108号C座',
        postCode:'12012'
    }
]
//地址管理
var EditAddress = React.createClass({
    //json: source,
    getInitialState: function(){
        return ({
        	json:[],
        	mobile:editData[0].mobile || '',        //手机号
        	username:editData[0].username || '',      //姓名
            defaultCity: this.cityOption(),
            defaultCounty: this.countyOption(),
            selectProvince:'',  //选择省份
            selectCity:'',      //选择城市
            selectCounty:'',    //选择区
            specificAddress:editData[0].specificAddress || '',  //具体地址
            postCode:editData[0].postCode || '',          //邮政编码

            spanProvince:'选择省份', //显示选中省份
            spanCity:'选择城市',     //显示选中城市
            spanCounty:'选择地区',  //显示选中区
           
        });
    },
    index: {
        provinceIndex: -1,
        cityIndex: -1
    },
    componentDidMount(){
		var that = this;
		var url = "/quote/json.txt";
		youyiche.getData({
            url:url
        }).then(function(data){
			that.setState({
				json:data
			});
             that.getProviceSelect();
		});
        
		
	},
    provinceOption: function(){
        var that = this;
        var html = '';
        html =  this.state.json.map(function(array, index){
            if(array.name == editData[0].selectProvince){
                
                  return (<option selected="selected" key={index} data-index={index}>{array.name}</option>);
            }else{
                //console.log(editData[0].selectProvince);
                  return (<option key={index} data-index={index}>{array.name}</option>);
            }
            
        });
        return html;

    },
    cityOption: function(){

        if(this.index.provinceIndex == -1){
            return false;
        }else{
            
            return this.state.json[this.index.provinceIndex].city.map(function(array, index){
                if(array.name == editData[0].selectCity){
                    return (<option selected="selected" key={index} data-index={index}>{array.name}</option>);
                }else{
                    return (<option key={index} data-index={index}>{array.name}</option>);
                }
                
            });
        }
    },
    countyOption: function(){
       
        if(this.index.cityIndex == -1){
            return false;
        }else{
            return this.state.json[this.index.provinceIndex].city[this.index.cityIndex].area.map(function(array, index){
                if(array == editData[0].selectCounty){
                    return (<option selected="selected" key={index} data-index={index}>{array}</option>);
                }else{
                    return (<option key={index} data-index={index}>{array}</option>);
                }
                
            });
        }
    },
    //已选择省份  显示
   getProviceSelect:function(id,selectIndex){
        var that = this;
        var pSelect = document.getElementById("provinceId");
        var citySelect = document.getElementById("cityId");
        var countySelect = document.getElementById("countyId");
       // console.log(select.options.length);
        var isOption = false;
        for(let i=0; i<pSelect.options.length; i++){  
           
            if(pSelect.options[i].innerHTML == editData[0].selectProvince){  
                pSelect.options[i].selected = true;  
                that.index.provinceIndex = i-1;
                that.setState({
                    defaultCity: this.cityOption()
                })
                isOption = true;
                break;  
            }  
        }  
        for(let i=0; i<citySelect.options.length; i++){  
           
            
            if(citySelect.options[i].innerHTML == editData[0].selectCity){  
                citySelect.options[i].selected = true;  
                that.index.cityIndex = i-1;
               // console.log(that.index.cityIndex);
                break;  
            }  
        } 
        for(let i=0; i<countySelect.options.length; i++){  
           
            if(countySelect.options[i].innerHTML == editData[0].selectCounty){  
                countySelect.options[i].selected = true;  
                that.index.provinceIndex = i-1;
                break;  
            }  
        } 
        
       // console.log(that.index.provinceIndex);
        if(isOption){
            this.setState({
                spanProvince:editData[0].selectProvince,
                selectProvince:editData[0].selectProvince,

                spanCity:editData[0].selectCity,
                selectCity:editData[0].selectCity,

                

                //defaultCity: this.cityOption(),
                defaultCounty:this.countyOption(),
                spanCounty:editData[0].selectCounty,
                selectCounty:editData[0].selectCounty,
            })
            //console.log(this.state.selectCounty);
        }
   },
 
    provinceChange: function(event){
        var e = event.target;
        this.index.provinceIndex = e.options[e.selectedIndex].getAttribute("data-index");
        this.index.cityIndex = -1;
        this.setState({
            defaultCity: this.cityOption(),
            defaultCounty: this.countyOption()
        });

        if(e.value != -1){
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
                spanProvince:'选择省份'
	        });
            
        	
        }
        this.setState({
            spanCity:'选择城市',
            spanCounty:'选择地区'
        });
       
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
                spanCity:'选择城市'
	        });
	        
	       
        }
        this.setState({
            spanCounty:'选择地区'
        })
        
        this.refs.county.value = "-1";
        
        
    },
    countyChange:function(event){
    	var e = event.target;
    	if(e.value != '-1'){
        	this.setState({
	            selectCounty:e.value,
                spanCounty:e.value
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
            console.log(that.state.mobile);
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
		                			<input type="text" value= {this.state.username} placeholder="收货人姓名" onChange={this.getInfo.bind(this,'username')}/>
		                		</div>
		                	</div>
		                	<div className="addressItem">
		                		<span className="addressItemTit">联系电话</span>
		                		<div className="addressItemCont">
		                			<input type="tel" value= {this.state.mobile} placeholder="收货人手机号" onChange={this.getInfo.bind(this,'mobile')}/>
		                		</div>

		                	</div>
		                	<div className="addressItem">
		                		<span className="addressItemTit">选择地区</span>
		                		<div className="addressItemCont">
		                			<span className="selectSpan">
		                				<span className="positionSpan" id="provinceTxt">{this.state.spanProvince}</span>
		                				<select  onChange={this.provinceChange} id="provinceId">
					                        <option key="-1" value="-1" data-index="-1">选择省份</option>
					                        {this.provinceOption()}
					                    </select>
		                			</span>

			                		<span className="selectSpan">
			                			<span className="positionSpan" id="cityTxt">{this.state.spanCity}</span>
					                    <select  onChange={this.cityChange} ref="city" id="cityId">
					                        <option key="-1" value="-1" data-index="-1">选择城市</option>
					                        {this.state.defaultCity}
					                    </select>
					                </span>
					                <span className="selectSpan">
					                	<span className="positionSpan" id="countyTxt">{this.state.spanCounty}</span>
					                     <select onChange={this.countyChange} ref="county" id="countyId">
					                        <option key="-1" value="-1" data-index="-1">选择地区</option>
					                        {this.state.defaultCounty}
					                    </select>
					                </span>
			                    </div>

		                	</div>
		                    
		                    <div className="addressItem">
		                    	<span className="addressItemTit">详细地址</span>
		                    	<div className="addressItemCont">
		                    		<textarea value= {this.state.specificAddress} placeholder="街道门派地址" onChange={this.getInfo.bind(this,'specificAddress')}></textarea>
		                    		
		                    	</div>
		                    </div>
		                    <div className="addressItem">
		                    	<span className="addressItemTit">邮政编码</span>
		                    	<div className="addressItemCont">
		                    		<input type="tel" value= {this.state.postCode} placeholder="邮政编码（选填）" onChange={this.getInfo.bind(this,'postCode')}/>
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

export default EditAddress