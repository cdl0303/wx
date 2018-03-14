import React from 'react'

//地址
var Address = React.createClass({

	render(){
		return(
	        <div>{this.props.children}</div>
		)
	}
})

export default Address