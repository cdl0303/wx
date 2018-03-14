/*
*Tab骨架
*
*/
import React from 'react'
import PicPop from './picPop.jsx'
import CytoskeleonSvgNoodle from './cytoskeleonSvgNoodle.jsx'
import CytoskeleonSvgPoint from './cytoskeleonSvgPoint.jsx'

var Cytoskeleton  = React.createClass({
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
		
		for(let i=0;i<data.length;i++){
		
			if(data[i].degree == 2 || data[i].degree == 1){//轻微
				$("#Cpoint_"+data[i].field_name).attr("class","light");
			}else if(data[i].degree == 4 || data[i].degree == 3){//中度
				$("#Cpoint_"+data[i].field_name).attr("class","hight");
			}else if(data[i].degree == 6 || data[i].degree == 5){//重度
				$("#Cpoint_"+data[i].field_name).attr("class","highter");
			}
		}

	},
	componentDidMount(){
		this.handelShow(this.props.degreeInfo);
		var that = this;
		$(".cytEm em").each(function(i){
			$(this).click(function(){
				that.showPic(i)
			})
		})
	},

	showPic(key){
		this.props.showPics(key,2,"查看损伤图片|_report_picture_gujia",this.props.images);
	},

  	render:function(){
  		var itemHtml = null;
  		if(this.props.images.length > 0){
  			itemHtml = this.props.images.map((item,key)=>{
				return(
					<tr className={item.isRepeat ? "hide" : ""}>
						<td className="c9 tc brl">{item.degreeTxt}</td>
						<td className="c9 tc">{item.title}</td>
						<td className="brn">
							<div className="tdDecr cytEm">
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
		     		<div className="appearanceSvg cytoskeleonSvg">
		     			<span className="appearancePic">
		     				<CytoskeleonSvgNoodle/>
		     			</span>
		     			<span className="appearancePic point">
		     				<CytoskeleonSvgPoint/>
		     			</span>
		     			
		     		</div>
		     		<div className="skeletonHideDes">
		     			骨架图仅标注各重要骨架部位<br/>
		     			如支架、内板及翼子板等问题将会在下方列表中呈现
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
export default Cytoskeleton