import youyiche from 'youyiche'
import youyicheWX from 'youyicheWX'
import React from 'react'
import CarVN from './components/carVN.jsx'
import ReactTipPop from 'reactComponents/react-tip-pop/component.jsx'

require('../sass/index.scss')

function init(){
	class CarSource extends React.Component {
	    constructor(props) {
	        super(props);
	        this.state = {
	        	mobile:'',//手机号
	        	name:'',//姓名
	        	carVN:0,//是否有VN
	        	cid:'',//c端客户id
	        	origin:'',//来源
	        	agentOrigin:false,//是否是代理人页面来源
	        	agentIcon:''//代理人头像
	        }
	        this.common = {
	        	banner:require('../img/banner.png'),
	        	pic5:require('../img/pic5.png'),
	        	pic6:require('../img/pic6.png'),
	        	pic7:require('../img/pic7.png'),
	        	phone:require('../img/phone.png')
	        }
	        this.closeCarVN = this.closeCarVN.bind(this)
	        this.handInput = this.handInput.bind(this)
	        this.submitCar = this.submitCar.bind(this)
	    }

	    componentDidMount() {
	    	//获取url上参数origin的值
	    	var origin = youyiche.getParamByUrl('origin',false);
	    	var self = this;
	    	//代理人来源
	    	if(origin == 'vehicleagent'){
	    		//代理人页面来源
	    		self.setState({
	    			agentOrigin:true
	    		})
	    		//提交车源
		        youyiche.getData({
		            url:youyiche.publicParams.apiService.itemAgent + '/agentForWxApi/getRecommentAgentBySharePage?enAid='+youyiche.getParamByUrl('enAid',false)
		        }).then(function(data){
		            if(data.errcode != 0){
		                return;
		            }
		          	self.setState({
		   				origin:'vehicleagent_'+data.data.agentId+'_助手',
		   				agentIcon:data.data.headImg || require('../img/defaultHeadPic.png')
		   			})
		        })
	    	}
	    	//卖车动态分享
	    	else if(origin == 'car_status'){
	    		this.setState({
		    		carVN:parseInt(youyiche.getParamByUrl('carVN',false))||0,
		    		origin:'客户推荐_'+youyiche.getParamByUrl('cid',false)
		    	})
	    	}
	    	//我要卖车 && 用户没有v需求直接跳转
	    	else{
	    		this.setState({
		    		carVN:parseInt(youyiche.getParamByUrl('carVN',false))||0,
		    		origin:'m_weixin'
		    	})
	    	}
	    	//分享
            youyicheWX.wxShare({
                title:'我为大家推荐又一车二手车交易平台，卖车值得信赖！',
                desc: '又一车服务免费，千余家车商竞价，让您的爱车价更高！',
                link: window.location.href,
                imgUrl: 'http://' + window.location.host + '/WxWeb/item-car-source/img/copy/share.png'
            });
	    }

	    handInput(prop,event){
			let self = this;
		    this.setState({
		      [prop]:event.target.value
		    });
		}
		//关闭vn弹层
	    closeCarVN(){
	        this.setState({
	            carVN:0
	        })
	    }
		//提交车源
		submitCar(origin){
			var self = this;
			if(self.state.name == ''){
				self.showReactTipPop("请输入姓名");
			}
			else if(self.state.mobile =="" || !/^1[3,4,5,8]{1}(\d){9}$/i.test(self.state.mobile)){
				self.showReactTipPop("请输入11位有效手机号码！");
			}
			else{
				var header = {"content-type":"application/json;charset=utf-8"};
				//提交车源
		        youyiche.getData({
		            url:youyiche.publicParams.baseUrl+'/webapi/public/register_carneed',
		            data:{
		            	origin:self.state.origin,
		            	isSell:true,
		            	name:self.state.name,
		            	phone:self.state.mobile
		            },
		            method:'post',
		            headers:header
		        },false).then(function(data){
		            if(!data.success){
		                return;
		            }
		          	self.showReactTipPop("提交成功");
		            self.setState({
		              name:'',
		              mobile:''
		            });
		        })
				
				var element = document.querySelectorAll("input");
            	var fn = function(item,index,array){
                	item.value = '';
            	}
	            //关闭弹窗，清空input
	            setTimeout(() => {
            		Array.prototype.map.call(element,fn)
			    },2000);
			}
		}

		showReactTipPop(value){ //显示提示框
	        this.refs.reactTipPop.show(value);
	    }

	    render() {
	    	//提交车源
	        return <div>
	        {
	        	this.state.agentOrigin ? 
	        	<div className='agentOrigin clearfix'>
	        		<div className='divImg'>
	        			<img src={this.state.agentIcon}/>	
	        		</div>
	        		<div className='divP'>
	        			<span className='iconBack'></span>
	        			<p className='font0625'>我已经是又一车超级代理人啦，真的是个靠谱的平台，强烈推荐你也来赚钱~</p>   	
	        		</div>
    			</div>
	        	:''
	        }
        	<div className="page_banner">
        		<img src={this.common.banner}/>
			</div>
				<div className='car_source'>
					<div className='inputBox'>
		        		<div className='px-one-border px-one-border-bottom'>
		        			<input  type='text' placeholder="姓名"  onChange={ this.handInput.bind(this,'name')}/>
		        		</div>
		        		<div className='px-one-border px-one-border-bottom'>
		        			<input  type='tel' placeholder="手机号"  onChange={ this.handInput.bind(this,'mobile')}/>
		        		</div>
		        		
		        		<button className='enter buttonDefault' onClick={this.submitCar}>立即卖高价</button>
		        	</div>
			        <div className="four_step_pic px-one-border px-one-border-all">
			        	<p className='colorBlack title'>简单四步轻松卖车</p>
					    <ul className="step_pic clearfix">
					        <li>
					            <span></span>
					            <h4>预约卖车</h4>
					            <p dangerouslySetInnerHTML = {{__html:'电话预约＋在线预约＋微信预<br/>24小时内快速反馈'}}></p>
					        </li>
					        <li>
					            <span></span>
					            <h4>门店检测</h4>
					            <p dangerouslySetInnerHTML = {{__html:'300多家美车堂门店覆盖全国<br/>30分钟专业检测'}}></p>
					        </li>
					        <li>
					            <span></span>
					            <h4>网上竞拍</h4>
					            <p dangerouslySetInnerHTML = {{__html:'全国上千家商户线上竞拍<br/>保证最高报价'}}></p>
					        </li>
					        <li>
					            <span></span>
					            <h4>付款交车</h4>
					            <p dangerouslySetInnerHTML = {{__html:'又一车交易中心完成交车<br/>当场立即付款'}}></p>
					        </li>
					    </ul>
					</div>
					<div className="choice px-one-border px-one-border-all">
						<p className='colorBlack title'>为什么选择又一车</p>
					    <ul className="choice_pic clearfix">
					        <li>
					            <img src={this.common.pic5} />
					            <h4>高价</h4>
					            <p>全网最高收车价</p>
					        </li>
					        <li>
					            <img src={this.common.pic6} />
					            <h4>便捷</h4>
					            <p>全国300多家门店</p>
					        </li>
					        <li>
					            <img src={this.common.pic7} />
					            <h4>0费用</h4>
					            <p>全程免费 交易透明</p>
					        </li>
					    </ul>
					</div>
					
				</div>
				<div className="footer clearfix px-one-border px-one-border-top">
				    <div className="des">©&nbsp;2015&nbsp;youyiche.com<br/>上海麦拉汽车服务有限公司&nbsp;版权所有<br/>沪ICP备14041346号-1</div>
				    <div className="attention">
				        <p></p>
				        查找关注又一车
				    </div>
				</div>
				<a className='phone' href='tel:4008216161'>
					<img src={this.common.phone}/>
					<p className='font0625'>免费</p>
				</a>
				<CarVN carVN={this.state.carVN} closeCarVN = {this.closeCarVN}/>
				<ReactTipPop ref="reactTipPop"/>
        	</div>;
	    }
	}

  	ReactDOM.render(<CarSource/>,document.getElementById('carSource'));
}

//微信认证
youyiche.scriptConfig(function(){
	youyicheWX.wxAuth({
		type:"snsapi_base",
		itemName:"itemCarSource",
		success:init
	});
})
