import React from 'react'

const Warning = React.createClass({
	render(){
		return(
			<div className={ this.props.warning ? 'warning' : 'warning none' }>
				<i></i>
				<p>{this.props.value}</p>
			</div>
		)
	}
})

export default Warning