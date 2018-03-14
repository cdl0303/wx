
import React from 'react'
var LineThree = React.createClass({
  	render:function(){
	    return (
	    	<div className="surveyItem lineThree px-one-border px-one-border-top">
	    		<ul>
		    		{
		    			this.props.value.map((item,k)=>{
			    			return(
			    				<li className="w33" key={item.title+"321"}>
					                <div className={k%3==2 ? "" : "br"}>
					                    
					                    <p>{item.value}</p>
					                    <p className="c9">{item.title}</p>
					                </div>
					            </li> 
			    			)
			    		})
		    		}
		          	   
		      	</ul>
	    	</div>	
	    )
	}
})
export default LineThree