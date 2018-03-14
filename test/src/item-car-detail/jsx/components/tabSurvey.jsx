/*
*Tab概况
*
*/
import React from 'react'
import LineThree from './lineThree.jsx'
import Procedures from './procedures.jsx'
import Skeleton from './skeleton.jsx'
import License from './license.jsx'
import Configure from './configure.jsx'
import Consignment from './consignment.jsx'
import MyPrice from './myPrice.jsx'
import FixPrice from './fixPrice.jsx'
import AuctionPrice from './auctionPrice.jsx'

var Survey = React.createClass({
	getInitialState(){
	    return {
	      onlyPrice:"",
	      scoreDegree:'',
	      wg:'',
	      gj:'',
	      ns:'',
	      jx:'',
	      rank:'',
	      hasRecord:'',
	      showFixPrice:false,
	      showAuctionPrice:false,
	    }
	},
	surveyPam:{
		scoreDegree:''
	},
	lineThree:[
		{
			title:"注册地",
			value:info['app_label_9']
		},
		{
			title:"表显里程",
			value:info['app_label_7']
		},
		{
			title:"登记日期",
			value:info['app_label_17']
		},
		{
			title:"制造国别",
			value:info['app_label_4']
		},
		{
			title:"年款",
			value:info['app_label_6']
		},
		{
			title:"排放标准",
			value:info['app_label_19']
		},
		{
			title:"交易地",
			value:info['app_label_2']
		},
		{
			title:"事故记录",
			value:(info['app_label_34'] == "" || info['app_label_34'] == '无')?'无':'有'
		},
		{
			title:"新车参考价",
			value:info['app_label_3'] == "未查询到参考价" ? "未查询到参考价" : info['app_label_3']+"万"
		},

	],
	surface(){//外观
		var num = info['score1'];
        var start = "";
        if (num < 5 || num == 5) {
            start = 5;
        } else if (num > 5 && num <= 9) {
            start = 4;
        } else if (num > 9 && num <= 12) {
            start = 3;
        } else if (num > 12 && num <= 17) {
            start = 2;
        } else if (num > 17 && num < 20) {
            start = 1;
        } else if (num == 20) {
            start = 0;
        }
        return start;
	},
	skeletonTone(){//骨架 等级
		var num = info['score4'];
        var start = {};
        if (num < 14 || num == 14) {
            start = {
            	ab:"F",
            	sj:5
            };
        } else if (num > 14 && num <= 19) {
            start = {
            	ab:"E",
            	sj:4
            };
        } else if (num > 19 && num <= 23) {
            start = {
            	ab:"D",
            	sj:3
            };
        } else if (num > 23 && num <= 26) {
            start = {
            	ab:"C",
            	sj:2
            };
        } else if (num > 26 && num < 30) {
            start = {
            	ab:"B",
            	sj:1
            };
        } else if (num == 30) {
            start = {
            	ab:"A",
            	sj:0
            };
        }
        return start;
	},
	interior(){//内饰
		var num = info['score2'];
        var start = "";
        if (num < 5 || num == 5) {
            start = 5;
        } else if (num >= 6 && num <= 7) {
            start = 4;
        } else if (num > 7 && num <= 9) {
            start = 3;
        } else if (num > 9 && num <= 12) {
            start = 2;
        } else if (num > 12 && num < 15) {
            start = 1;
        } else if (num == 15) {
            start = 0;
        }
        return start;
	},
	appliance(){//机械电器
        var num = info['score3'];
        var start = ""
        if (num < 5 || num == 5) {
            start = 5;
        } else if (num > 5 && num <= 9) {
            start = 4;
        } else if (num > 9 && num <= 15) {
            start = 3;
        } else if (num > 15 && num <= 20) {
            start = 2;
        } else if (num > 20 && num < 25) {
            start = 1;
        } else if (num == 25) {
            start = 0;
        }
        return start;
    },
    fixPriceFun(){
    	if(info.aeType == 5){//一口价
    		this.setState({
				showFixPrice:true
			})
    	}else if(info.aeType == 99){//起拍价

    		if(info.auctionLightPrice > 0){
    			this.setState({
					showAuctionPrice:true
				})
    		}
    		
    	}
    },
	componentWillMount(){
		this.fixPriceFun();
		this.setState({
			scoreDegree:this.skeletonTone().ab,
			wg:this.surface(),
			gj:this.skeletonTone().sj,
			ns:this.interior(),
			jx:this.appliance(),
			rank:this.skeletonTone().ab
		})
		
	},
	

  	render:function(){
	    return (
	     <div className="surveyBox">
	     	
	        {
	        	!this.props.isAppOpen ? <MyPrice app={this.props.app}/> : ""
	        }
	        {
	        	this.props.isAppOpen ? "" : (this.state.showFixPrice ? <FixPrice price={info.fixedPrice}/> : "")
	        }
	        {
	        	this.state.showAuctionPrice ? <AuctionPrice price={info.auctionLightPrice}/> : ""
	        }
	        
	       	{
	       		info.is_consign ? <Consignment/> : ""
	       	}
	       	
	       	<div className="surveyItem surveyScore px-one-border px-one-border-all">
	       		<div className="surveyPost">
	       			<div className="scoreL">
		       			<p className="carName">{info.app_label_1}</p>
		       			<p className="carDate clearfix"><span>上牌日期 : </span>{info['app_label_17']}</p>
		       			<p className="carDate clearfix"><span>新车价格 : </span>{info['app_label_3'] == "未查询到参考价" ? "未查询到参考价" : "¥"+info['app_label_3']+"万"}</p>
		       		</div>
		       		<div className="scoreR">
		       			<div className="abDiv">
		       				<p className="scoreTit">评分</p>
			       			<p className="score">
			       				<span className="scorNum">{info.scoreSum}{this.state.scoreDegree}</span>
			       			</p>
		       			</div>
		       		</div>
	       		</div>
	       	</div>
	       	<Skeleton wg={this.state.wg} gj={this.state.gj} ns={this.state.ns} jx={this.state.jx} rank={this.state.rank} isAppOpen={this.props.isAppOpen}/>
	       	
	       	<LineThree value={this.lineThree}/>
	       	<Procedures config={info['app_label_60']} />
	       	<License/>
	       	<Configure value={info['app_label_50']}/>
	     </div>
	    )
	}
})
export default Survey