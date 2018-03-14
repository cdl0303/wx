/*
*行驶证、产证
*
*/
import React from 'react'
var License4Td = React.createClass({
	render:function(){
		return(
			<tr>
				<td className="bln" width="100">
					<span className="c9">{this.props.name[0]}</span>
				</td>
				<td>
					<span>{this.props.value[0]}</span>
				</td>
				<td>
					<span className="c9">{this.props.name[1]}</span>
				</td>
				<td className="blr">
					<span>{this.props.value[1]}</span>
				</td>
			</tr>
		)
	}
})
var License2Td = React.createClass({
	render:function(){
		return(
			<tr>
				<td className="bln">
					<span className="c9">{this.props.name}</span>
				</td>
				
				<td className="blr" colSpan="3">
					<span>{this.props.value}</span>
				</td>
			</tr>
		)
	}
})
var License = React.createClass({
  	render:function(){
	    return (
	 		<div className="surveyItem px-one-border px-one-border-all">
	       		<div className="surveyTit">
	       			<div className="sDiv">行驶证、产证信息</div>
	       		</div>
	       		<div className="license">
	       			<table>
	       				<tbody>
	       					<License4Td name={["车牌号码","注册地"]} value={[info['app_label_8'], info['app_label_9']]}/>
		       				<License4Td name={["车辆类型","车辆颜色"]} value={[info['app_label_10'], info['app_label_11']]}/>
		       				<License4Td name={["所有人","使用性质"]} value={[info['app_label_12'], info['app_label_13']]}/>
		       				<License2Td name='车辆型号' value={info['app_label_14']}/>
				            <License2Td name='车辆识别号' value={info['app_label_15']}/>
				            <License2Td name='发动机号' value={info['app_label_16']}/>
				            <License2Td name='登记日期' value={info['app_label_17']}/>
				            <License2Td name='出厂日期' value={info['app_label_18']}/>
				            <License2Td name='排放标准' value={info['app_label_19']}/>
				            <License2Td name='年审有效期' value={info['app_label_20']}/>
				            <License2Td name='产证曾归属' value={info['app_label_22']}/>
				            <License4Td name={['过户纪录', '交强险']} value={[info['app_label_21'], info['app_label_23']]}/>
	       				</tbody>
	       			</table>
	       		</div>
	       	</div>
	    )
	}
})
export default License