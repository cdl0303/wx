import youyiche from 'youyiche'
import itemConfig from 'itemConfig'
import React from 'react';
import { Link } from 'react-router'

class RouteSuccess extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'RouteSuccess';
        let success = JSON.parse(sessionStorage.getItem("submitTaskDetailResponse")) || {};
        let date = this.contactDate(success);
        this.state = {
        	icon:require("../../img/success.png"),
        	des:[
        		{
	    			name:"卖车需求编号",
	    			value:success.vnId || ""
	    		},
	    		{
	    			name:"车辆编号",
	    			value:success.vNumber || ''
	    		},
	    		{
	    			name:"来源",
	    			value:success.origin || ''
	    		},
	    		{
	    			name:"时间",
	    			value:date
	    		},
	    		{
	    			name:"城市",
	    			value:success.city||''
	    		},
	    		{
	    			name:"门店",
	    			value:success.shop||''
	    		},
	    		{
	    			name:"检测师",
	    			value:success.masterWorker?success.masterWorker.name:''
	    		},
	    		{
	    			name:"备注",
	    			value:success.remarks || ''
	    		}
        	]
        }
    }
    contactDate(success){ //拼接时间字符串
        let day = success.day || "";
        let time = success.time || "";
        let minute = success.minute || "";
        let date="";
        if(day.id && time && minute){
            date = day.id +" "+time+":"+minute;
        }
        return date;
    }
    componentDidMount(){
        sessionStorage.removeItem("submitNumberResponse");
        sessionStorage.removeItem("submitTaskDetailResponse");
    }
    render() {
        return  <div className="page-success">
    				<div className="success-icon"><img src={this.state.icon} /></div>
    				<div className="success-des">
        				{
        					this.state.des.map((item)=>{
        				        return <p>{item.name}:{item.value}</p>;
        				    })
        				}
        			</div>
    				<div className="group-btn">
    					<Link to={"/"} className="btn buttonDefault">确定</Link>
    				</div>
        		</div>;
    }
}

export default RouteSuccess;
