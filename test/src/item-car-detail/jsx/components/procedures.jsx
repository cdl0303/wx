/*
*手续
*
*/
import React from 'react'
var Procedures = React.createClass({
	getInitialState(){
	    return {
	      fixEight:[],
	      twoMore:[]
	    }
	},
	handelConfig(config){
	    let defaultConfig = [
	    	{name:'登记证书',value:'无'},
	    	{name:'行驶证',value:'无'},
	    	{name:'购置税',value:'无'},
	    	{name:'原始购车发票',value:'无'},
	    	{name:'随车工具',value:'无'},
	    	{name:'使用说明书',value:'无'},
	    	{name:'车辆备胎',value:'无'},
	    	{name:'保养手册',value:'无'}
	    ];
	    for(let i=0;i<config.length;i++){
	    	if(config[i].name.indexOf("钥匙") > -1){
	    		config[i].mark = "keys"
	    		this.state.twoMore.push(config[i]);
	    	}else if(config[i].name.indexOf("车牌") > -1){
	    		config[i].mark = "plate"
	    		this.state.twoMore.push(config[i]);
	    	}
	        for(let j=0;j<defaultConfig.length;j++){
	            if(config[i].name == defaultConfig[j].name){
	                if(config[i].value == "有"){
	                    defaultConfig[j].value = '有';
	                }
	                //console.log(defaultConfig[j]);

	            }
	        }
	        
	    }

	    this.setState({
	    	fixEight:defaultConfig
	    })
	},
    componentWillMount(){
		this.handelConfig(this.props.config);
	},

  	render:function(){
	    return (
	    	<div className="surveyItem configMenu px-one-border px-one-border-all">
	    		<div className="procedures">
			     	{
			     		this.state.fixEight.map((item)=>{
			     			return(
			     				<div className="configItem" key={item.name+"213"}>
					                <span className={item.value == '有' ? 'configTit hasConfig' : 'configTit noConfig'}></span>
					                <span className="configTxt">{item.name}</span>
						        </div>
			     			)
			     		})
			     	}
			       	
			     </div>
			     <div className="twoMoreProcedures">
			     	{
			     		this.state.twoMore.map((d)=>{
			     			return(
			     				<div className="twoMoreItem">
						     		<span className={d.mark == "keys" ? "icon icon1" : "icon icon2"}></span>
						     		{d.name}：{d.value}
						     	</div>
			     			)
			     		})
			     	}
			     </div>
	    	</div>
	    )
	}
})
export default Procedures