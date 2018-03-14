/*
*Tab机械
*
*/
import React from 'react'
import PicPop from './picPop.jsx'
var Mechanics  = React.createClass({
	getInitialState(){
	    return {
	      index:0
	    }
	},
	
	mechanicsParm:{
		okShow:require('../../images/configH.png'),

	},
	componentDidMount(){	
		var that = this;
		$(".meEm em").each(function(i){
			$(this).click(function(){
				that.showPic(i)
			})
		})

	},

	showPic(key){
		this.props.showPics(key,3,"查看损伤图片|_report_picture_jixiejidianqi",this.props.images);
	},
  	render:function(){
  		let itemHtml = null;
  		if(this.props.images.length > 0){
  			itemHtml = this.props.images.map((item,key)=>{
				return(
					<tr className={item.isRepeat ? "hide" : ""}>
						
						<td className="c9 tc brl">{item.title}</td>
						<td className="brn">
							<div className="tdDecr meEm">
								{item.value}
								{
									item.img == "noimg" ? "" :<em></em>
								}
							</div>
						</td>
					</tr>
				)
			})
  		}else{
  			itemHtml = <tr><td className="brn brl tc c9" colSpan="2"><div className="okShow">详见车况总结</div></td></tr>
  		}
	    return (
	     	<div className="appearance mechanics">
	     		
	     		<div className="appearanceInfo">
	     			
	     			<table>
     					<tbody>
     						<tr>
     						
	     						<td className="tc w25 brl">位置</td>
	     						<td className="brn tc w50">描述</td>
	     					</tr>
	     					{itemHtml}
     					</tbody>
	     			</table>
	     		</div>
	     		<div className="reserveRoom"></div>
	     	</div>
	    )
	}
})
export default Mechanics