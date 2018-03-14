/*
*Tab内饰
*
*/
import React from 'react'
import PicPop from './picPop.jsx'
import ModelSvgNoodle from './modelSvgNoodle.jsx'
import ModelSvgPoint from './modelSvgPoint.jsx'
var Modules  = React.createClass({
	getInitialState(){
	    return {
	      index:0
	    }
	},
	
	appearanceParm:{
		
		okShow:require('../../images/configH.png'),
		degreeInfo:[
			
			{
				title:"现有问题",
				class:"existTroue",
				itemArr:[
					{
						emClass:"highter",
						value:"重度"
					},
					{
						emClass:"hight",
						value:"中度"
					},
					{
						emClass:"light",
						value:"轻微"
					}
				]
			}
		],

	},
	
	handelShow(data){
		//console.log(data);
		for(let i=0;i<data.length;i++){
			
			if(data[i].degree == 2){//轻微
				
				$("#Mpoint_"+data[i].field_name).attr("class","light");

			}else if(data[i].degree == 4){//中度

				$("#Mpoint_"+data[i].field_name).attr("class","hight");

			}else if(data[i].degree == 6){//重度

				$("#Mpoint_"+data[i].field_name).attr("class","highter");
			}
		}
	},
	componentDidMount(){
		
		this.handelShow(this.props.degreeInfo);
		var that = this;
		$(".modelEm em").each(function(i){
			$(this).click(function(){
				that.showPic(i)
			})
		})
		
	},
	//查看大图
	showPic(key){
		this.props.showPics(key,1,"查看损伤图片|_report_picture_waiguan",this.props.images);
	},
  	render:function(){
  		let itemHtml = null;
  		if(this.props.images.length > 0){
  			itemHtml = this.props.images.map((item,key)=>{
				return(
					<tr className={item.isRepeat ? "hide" : ""}>
						<td className="c9 tc brl">{item.degreeTxt}</td>
						<td className="c9 tc">{item.title}</td>
						<td className="brn">
							<div className="tdDecr modelEm">
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
  			itemHtml = <tr><td className="brn brl tc c9" colSpan="3"><div className="okShow">详见车况总结</div></td></tr>
  		}
	    return (
	     	<div className="appearance">
	     		<div className="appearanceItem">
	     			<div className="appearanceSvg">
		     			<span className="appearancePic">
		     				<ModelSvgNoodle/>
		     			</span>
		     			<span className="appearancePic point">
		     				<ModelSvgPoint/>
		     			</span>
		     		</div>
	     			<div className="degree">
	     				{
	     					this.appearanceParm.degreeInfo.map((item)=>{
	     						return(
	     							<div className={"degreeItem "+item.class}>
				     					<span className="tit">{item.title}</span>
				     					{
				     						item.itemArr.map((it)=>{
				     							return(
				     								<span className="txt">
							     						<span className="goldSe"><em className={it.emClass}></em></span>
							     						{it.value}
							     					</span>
				     							)
				     						})
				     					}
				     					
				     					
				     				</div>
	     						)
	     					})
	     				}
	     				
	     			</div>
	     		</div>
	     		<div className="appearanceInfo">
	     			
	     			<table>
     					<tbody>
     						<tr>
	     						<td className="brl tc w20">等级</td>
	     						<td className="tc w30">位置</td>
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
export default Modules