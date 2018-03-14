import youyiche from 'youyiche'
import itemConfig from 'itemConfig'
import React from 'react';
import { Link } from 'react-router'

class RouteIndex extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'RouteIndex';
        let list = [
        	{
	    		text:["代理人刚刚提交了一台车","还未安排检测，我要帮他安排检测"],
	    		type:0,
	    		btn:"安排检测",
	    		className:"btn buttonDefault"
	    	},
	    	{
	    		text:["客户有多台车要检测","但是客服给我派的单子不够多，我要再加一单"],
	    		type:1,
	    		btn:"再加一单",
	    		className:"btn buttonDefault once-again"
	    	}
        ];
        this.state = {
        	list:list
        };

        sessionStorage.removeItem("submitNumberResponse");
        sessionStorage.removeItem("submitTaskDetailResponse");
    }
    render() {
        return 	<div className="page-index flex horizontal-vertical-centering">
        			<div className="content">
	        			{
	        				this.state.list.map((item)=>{
	        					return(
	        						<div className="block">
	        							{
	        								item.text.map((txt)=>{
	        									return <p>{txt}</p>;
	        								})
	        							}
	        							<div className="group-btn">
					        				<Link ref="button" to={"/inputNumber/"+item.type} className={item.className}>{item.btn}</Link>
					        			</div>
				        			</div>
	        					)
	        				})
	        			}
        			</div>
        		</div>;
    }
}

export default RouteIndex;
