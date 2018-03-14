
//import { NICE, SUPER_NICE } from './colors';
import PackageList from './components/packageList.jsx'
import PackageDetail from './components/packageDetail.jsx'
import Warning from './components/warning.jsx'
import youyiche from '../../base-common/js/common.js'
import Loading from './components/loading.jsx'
require('../sass/index.scss')
var ReactRouter = require('react-router');
var Tappable = require('react-tappable');
 function inint(){

	var Router = ReactRouter.Router;
	var Route = ReactRouter.Route;
	var hashHistory = ReactRouter.hashHistory;
	var PackBox = React.createClass({

		getInitialState:function(){
		    return{
		     bar:false,
		     lists:[],
		     warning:false,
		     loading:true
		    }
	  	},
	  
	  	componentDidMount:function(){
	  		//获取数据
	  
	  		var that = this;
	  		youyiche.getJson("/wash_car/getUserWashCard").then(function(data){
	  			var compare = function(value1,value2){
			        if(value1.status!=4 && value1.isValid){
			            return -1;
			        }else if((value1.status==4 || !value1.isValid)&&(value2.status==4 || !value2.isValid)){
			            return 0;
			        }else{
			            return 1;
			        }
			    }

	  			if(!data.success && !data.token_invalid){
					return;
				}
				that.setState({
					loading:false
				});
				if(data.ret && data.ret.length !=0 ){
					for(var i=0;i<data.ret.length;i++){
						data.ret[i].validDate = data.ret[i].validDate.replace(/-/g,'.');
						data.ret[i].jc = 'l_position_now'; 
						//packData.ret[i].type = 'type'+packData.ret[i].type;
						if(!data.ret[i].isValid && data.ret[i].status != '4' ){  //已过期
							//packData.ret[i].type = 'type5';
							data.ret[i].bg = 'packGrey'; 
							data.ret[i].ct = 'overTime'; 
							data.ret[i].jc = 'l_position_done'; 
							data.ret[i].isJump = false; 
						}else if(data.ret[i].status == '4'){ //已使用
							data.ret[i].bg = 'packGrey'; 
							data.ret[i].ct = 'hasUsed'; 
							data.ret[i].jc = 'l_position_done'; 
							data.ret[i].isJump = false;    
						}else{
							data.ret[i].bg = ''; 
							data.ret[i].isJump = true; 
						}
						if(data.ret[i].validType == 0){
							data.ret[i].start_date = data.ret[i].create_date.match(/\d+-\d+-\d+/)[0].replace(/-/g,'.'); //创建时间
						}else if(data.ret[i].validType == 1){
							data.ret[i].start_date = data.ret[i].receive_date.match(/\d+-\d+-\d+/)[0].replace(/-/g,'.'); //领取时间
						}

						if(data.ret[i].type == '1'){
							data.ret[i].txt = '洗车';
						}else if(data.ret[i].type == '2'){
							data.ret[i].txt = '保养';
						}else if(data.ret[i].type == '3'){
							data.ret[i].txt = '洗车';  //赠送
						}else if(data.ret[i].type == '4'){
							data.ret[i].txt = '镀膜';
						}else if(data.ret[i].type == '5'){
							data.ret[i].txt = '洗车'; //镀晶
						}else if(data.ret[i].type == '6'){
							data.ret[i].txt = '贴膜';
						}

					}
				
					
				}

				data.ret.sort(compare);
		  		
		  		that.setState({
					lists: data.ret || []
				})

	  		});
	  		
	        
	  	},
	 
	  	render:function(){
	  		if(!this.state.loading){
	  			return(
		  			<div className="cardPackage_box">
		  				<PackageList lists={this.state.lists}/>
		  			</div>
		  		)
	  		}else{
	  			return (<Loading />)
	  		}
	  		
	  	}
	});

	// 定义页面上的路由
	var routes = (  
	  <Router history={ hashHistory }>
	    <Route path="/" component={ PackBox }></Route>
	    <Route path="packageList" component={ PackageList } />
	    <Route path="packageDetail/:id" component={ PackageDetail } /> 
	  </Router>
	);
	ReactDOM.render(routes,document.getElementById('card_package'));
	
 }
 youyiche.wauth(inint,"snsapi_base");
 