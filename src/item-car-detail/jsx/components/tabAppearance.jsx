/*
*Tab外观
*
*/
import React from 'react'
import PicPop from './picPop.jsx'
import AppearanceSvgPoint from './appearanceSvgPoint.jsx'
import AppearanceSvgNoodle from './appearanceSvgNoodle.jsx'


var Appearance = React.createClass({
	getInitialState(){
	    return {
	      onlyPrice:"",
	      isConsign:false,//是否为寄售 默认不是
	      index:0,
	      images:[],
	      isOk:false,//是否有问题
	    }
	},
	appearanceParm:{
		hrefSvg :require('../../../base-common/svg/symbol.svg'),

		okShow:require('../../images/configH.png'),
		color:{
			paleYellow:"paleYellow",//浅黄色
			paleRed:"paleRed" //浅红色
		},
		degreeInfo:[
			{
				title:"历史修复",
				class:"repair",
				itemArr:[
					{
						emClass:"paint",
						value:"曾做漆   "
					},
					{
						emClass:"repaired",
						value:"曾修复"
					}
				]
			},
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
			if(data[i].degree_paint != 0){//曾做漆
				$("#"+data[i].field_name).css({"fill":"#fff9ec","stroke":"#e8d6b3"});
				//console.log($("#"+data[i].field_name))
			}
			if(data[i].degree_repair != 0){//曾修复
				$("#"+data[i].field_name).css({"fill":"#fad3d7","stroke":"#f57280"})
			}
			if(data[i].degree == 2){//轻微
				$("#point_"+data[i].field_name).attr("class","light");
			}else if(data[i].degree == 4){//中度
				$("#point_"+data[i].field_name).attr("class","hight");
			}else if(data[i].degree == 6){//重度
				$("#point_"+data[i].field_name).attr("class","highter");
			}
		}

	},

	componentDidMount(){	
		this.handelShow(this.props.degreeInfo);	
		var that = this;
		$(".appearanceEm em").each(function(i){
			$(this).click(function(){
				that.showPic(i)
			})
		})
	},
	showPic(key){
		this.props.showPics(key,0,"查看损伤图片|_report_picture_waiguan",this.props.images);
	},

  	render:function(){
  		let itemHtml = null;
  		if(this.props.images.length > 0){
  			itemHtml = this.props.images.map((item,key)=>{
				return(
					<tr className={item.isRepeat ? "hide" : ''}>
						<td className="c9 tc brl">{item.degreeTxt}</td>
						<td className="c9 tc">{item.position}</td>
						<td className="brn">
							<div className="tdDecr appearanceEm">
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
		     				<AppearanceSvgNoodle/>
		     			</span>
		     			<span className="appearancePic point">
		     				<AppearanceSvgPoint/>
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
export default Appearance