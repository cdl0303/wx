import React from 'react'
import { Link } from 'react-router'
var c_img = require('../../img/banner.png');
var no_img = require('../../img/noPackage.png');
var fix_link = "/WxWeb/html/wash_car.html";
const PackageList = React.createClass({
	getInitialState(){
	    return{
	     qtype:0,     //卡券类型
	     qtext:'',    //卡券w文本
	     qstatus:0,  //卡券状态 0:不能使用   1:可用
	     qbg:'',       //背景颜色

	    }
  	},
  	
	componentDidMount(){
		
		this.setState({
  			lists:this.props.lists
  		});
  		
	},
	render(){
		if(this.props.lists.length > 0){
			return (
				<div>
					
					<ul>

						{

							this.props.lists.map(function(item){
								
								return(
									<Link to={item.isJump ? '/packageDetail/'+item.id : ''} activeClassName="active">
										<li>
										  
								          <div className='packAge_l'>
								              <div className="packAge_l_b">
								                <h3>{item.name}</h3>
								                <p>有效期：{item.start_date}-{item.validDate}</p>
								                <span className={item.jc + ' l_position'}></span>
								              </div>
								              <span className={item.ct ? item.ct : 'hide' }></span>
								          </div>

								          <div className={item.bg +' packAge_r'}>
								            <div className="packAge_r_b">
								              <span className="J_mark">电子券</span>
								              <p>{item.txt}</p>
								            </div>
								          </div>
								        </li>
							       </Link>
						        )
								
							},this)
						}
						
				        
					</ul>

					<div className="cardFixPic">
				     	<a href={fix_link}>
				     		<img src={c_img}/>
				     	</a>
				     </div>
				</div>
				
			)
		}else{
			return (
			<div className="noPackageData">
				<img src={no_img}/>
				<p>您还没有优惠券</p>
			</div>
			)
		}
		
	}
})

export default PackageList