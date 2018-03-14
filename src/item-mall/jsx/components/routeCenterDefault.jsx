import youyiche from '../../../base-common/js/youyiche.js'
import React from 'react'
import {Link} from 'react-router'

var head_img = require('../../img/defaultHeadPic.png');
//个人中心默认显示
var CenterDefault = React.createClass({
	getInitialState:function(){
	    return {
	      status:true,
	      orderModule:[
	      	{
	      		name:'待付款',
	      		value:19,
	      		className:'payBehalf',
	      		icon:require('../../img/order01.png'),
	      		link:""
	      	},
	      	{
	      		name:'待发货',
	      		value:3,
	      		className:'deliveryBehalf',
	      		icon:require('../../img/order02.png'),
	      		link:""
	      	},
	      	{
	      		name:'待收货',
	      		value:1,
	      		className:'receiptBehalf',
	      		icon:require('../../img/order03.png'),
	      		link:""
	      	},
	      	{
	      		name:'已完成',
	      		value:2,
	      		className:'HadBehalf',
	      		icon:require('../../img/order04.png'),
	      		link:""
	      	}
	      ],
	      infoModule:[
	      	{
	      		name:'地址管理',
	      		link:''
	      	},
	      	{
	      		name:'我的优惠券',
	      		link:''
	      	}
	      ]
	    }
	},
	componentDidMount(){
		
	},

	replace(){
		let url = location.href.replace(/#\/[^?]+/,"#/productAll");
		youyiche.locationChange(url,'replace')
	},
	render(){
		return(
			<div className="myCenter">
				<div className="centerHead">
					<div className="headPicMenu">
						<div className="headPic">
							<img src={head_img}/>
						</div>
					</div>
					<p className="headName">测试123</p>
				</div>
				<div className="centerItemCont">
					<div className="centerItem">
						<Link to="" activeClassName="active" className="centerItemA">
							<span>全部订单</span>
							<em></em>
						</Link>
						
					</div>
					<div className="centerItem centerItemExport">
						{
							this.state.orderModule.map((item)=>{
								return (
								item.value > 0 ?
									<div className="orderExport">
										<Link to={item.link}>
											<span className={item.className + ' payStyleIcon'}><i>{item.value}</i></span>
											<p>{item.name}</p>
										</Link>
									</div>
									: <div className="orderExport">
										<Link to={item.link}>
											<span className={item.className + ' payStyleIcon'}></span>
											<p>{item.name}</p>
										</Link>
									</div>
								)
							})
						}
					</div>
				</div>
				<div className="centerItemCont" >
					{
						this.state.infoModule.map((item)=>{
							return (
								<div className="centerItem">
									<Link to={item.link} className="centerItemA">
										<span>{item.name}</span>
										<em></em>
									</Link>
								</div>
							)
						})
					}
				</div>
			</div>
	    )
	}
})

export default CenterDefault