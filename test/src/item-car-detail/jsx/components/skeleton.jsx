/*
*骨架
*
*/
import React from 'react'
var SkeletonTab = React.createClass({
	getInitialState(){
	    return {
	      hideRecord:false,
	      
	    }
	},
	componentWillMount(){
		if(!this.props.isAppOpen){
			this.setState({
				hideRecord:true,

			})
		}
	},
	sendAppUrl(){
		var url = "/exam_app_h5/yycreport/"+info['examtask_id'];
        if(typeof AppParam != "undefined"){
        	AppParam.repairRecord(url);
            AppParam.talkingDataCollect('维修记录|_report_maintenance_record');
        }
	},
	recordPic(){
		info['app_label_90']['num'] = 0;
        info['app_label_90']['index'] = 0;
        AppParam.showCarPic(JSON.stringify(info['app_label_90']));
        AppParam.talkingDataCollect('维修记录icon|_report_picture_weixiu');
	},
	render:function(){
		let recordItem = null,recordLink = null,damage = null;
		if(this.props.isPoint != '0'){//0时没有损伤点
			damage = this.state.hideRecord ? "" : (info.checkyyc ? "" : <span className="recordSpan" onClick={this.recordPic}></span>)
		}
		if(this.props.name == "维修记录"){
			if(info.app_label_36.value != ""){
				recordItem = <p><span className="recordVal">{info.app_label_36.value}</span></p>
			}
			recordLink = this.state.hideRecord ? "" : (info.checkyyc ? <a onClick={this.sendAppUrl}>查看详情</a> : "")
		}
		
		return(
			<tr>
				<td width="100" className="tdTit">
					<div className="titDiv">
						<span>{this.props.name}</span>
						{
							this.props.rank==="" ? "" : <em className={"tonIcon"+this.props.rank}></em>
						}
					</div>
				</td>
				<td className="tdTxt">
					<div className="record">
						<div className="clearfix">
							<span className="recordTxt">{this.props.descrInfo}</span>
							{recordLink}
							{damage}
						</div>
						{recordItem}
					</div>
				</td>
			</tr>
		)
	}
})

var Skeleton = React.createClass({
	getInitialState(){
	    return {
	      explain:false,
	    }
	},
	showExplain(parm){
		this.setState({
			explain:!parm
		})
	},
  	render:function(){
	    return (
	 		<div className="surveyItem px-one-border px-one-border-all">
	       		<div className="surveyTit">
	       			<div className="sDiv clearfix">
	       				<div className="fl">
	       					车况总结（{info.scoreSum}分 骨架{this.props.rank}）
	       				</div>
	       				<div className="fr explain">
	       					<span className="explainIcon" onClick={this.showExplain.bind(this,this.state.explain)}></span>
	       					
	       					<div className={this.state.explain ? "explainPop show" : "explainPop hide"}>
	       						<span className="drow"></span>
	       						<span className="explainImg"></span>
	       						<p>问题指数</p>
	       						<p className="c9">指数越低表明问题越少</p>
	       					</div>
	       				</div>
	       			</div>
	       		</div>
	       		<div className="skeleton">
	       			<table>
	       				<tbody>
	       					<SkeletonTab  name="外观" rank={this.props.wg} descrInfo={info.app_label_30} isPoint="0" isAppOpen={this.props.isAppOpen}/>
		       				<SkeletonTab  name="骨架" rank={this.props.gj} descrInfo={info.app_label_32} isPoint="0" isAppOpen={this.props.isAppOpen}/>
		       				<SkeletonTab  name="内饰" rank={this.props.ns} descrInfo={info.app_label_31} isPoint="0" isAppOpen={this.props.isAppOpen}/>
		       				<SkeletonTab  name="机械" rank={this.props.jx} descrInfo={info.app_label_33} isPoint="0" isAppOpen={this.props.isAppOpen}/>
		       				<SkeletonTab  name="事故总结" rank="" descrInfo={info.app_label_34} isPoint="0" isAppOpen={this.props.isAppOpen}/>
		       				<SkeletonTab  name="补充总结" rank="" descrInfo={info.app_label_35} isPoint="0" isAppOpen={this.props.isAppOpen}/>
		       				<SkeletonTab  name="维修记录" rank="" descrInfo={info.app_label_36.key} isPoint={info['app_label_41'][4]} isAppOpen={this.props.isAppOpen}/>
	       				</tbody>
	       				
	       			</table>
	       		</div>
	       	</div>
	    )
	}
})
export default Skeleton