import React from 'react'

class Loading extends  React.Component{
	constructor(props) {
        super(props);
        this.common = {
        	loading:require('../../img/loading.gif')
        }
    }
    render(){
	    return <div className="loading no-ms">
	        <img src={this.common.loading} />
      	</div>
  	}
} 

export default Loading