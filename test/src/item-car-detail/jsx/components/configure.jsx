/*
*配置
*
*/
import React from 'react'
var Configure = React.createClass({

  	render:function(){
	    return (
	 		<div className="surveyItem px-one-border px-one-border-all">
	       		<div className="surveyTit">
	       			<div className="sDiv">车辆配置</div>
	       		</div>
	       		<div className="configure">
	       			<table>
	       				<tbody>
		       				{
		       					this.props.value.map((item,key)=>{
		       						return(
		       							<tr key={item.name+"213"}>
					       					<td className="bln" width="100">
					       						<span className="c9">{item.name}</span>
					       					</td>
					       					<td className="blr">
					       						<div className="configureOn">
					       							{item.value == "on" ? <span className="onIcon"></span> : <span>{item.value}</span>}
					       						</div>
					       					</td>
					       				</tr>
		       						)
		       					})
		       				}
	       				</tbody>
	       			</table>
	       		</div>
	       	</div>
	    )
	}
})
export default Configure