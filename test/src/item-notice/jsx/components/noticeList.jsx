
import React from 'react'
import youyiche from 'youyiche'
import itemConfig from 'itemConfig'
import Loading from './loading.jsx'
import { Link } from 'react-router'

class NoticeList extends  React.Component{
	constructor(props) {
        super(props);
        this.state = {
        	list:null,
			loading:true
        }
        this.common = {
        	icon4:require('../../img/icon4.png'),
        	noms:require('../../img/noms.png')
        }
    }
	componentDidMount(){
        TDAPP.onEvent ("打开次数","通知中心");
		var that = this;
		youyiche.getData({
            url:'/wxapp/api/message/getMessageListByUser?group_id='+itemConfig.getQueryStringByName('group_id')
        }).then(function(data){
        	if(!data.success){
        		return
        	}
            that.setState({
                loading:false
            })
			if(data.ret.length != 0){
				for(var i=0;i<data.ret.length;i++){
		            var now = data.ret[i].nowDate;
		            var time = new Date(data.ret[i].date).getTime();
		            var timeGap = now - time;
		            if(timeGap < 60){
		                data.ret[i].date = parseInt(timeGap) + '秒前';
		            }
		            else if(timeGap > 60 && timeGap < 3600 ){ 
		                data.ret[i].date = parseInt(timeGap/60) + '分钟前';
		            }
		            else if( timeGap > 3600 && timeGap < 3600*24){
		                data.ret[i].date = parseInt(timeGap/3600) + '小时前';
		            }
		            else{
		                data.ret[i].date = new Date(data.ret[i].date*1000).getFullYear()+'.'+
	                                       (new Date(data.ret[i].date*1000).getMonth()+1)+'.'+
	                                       new Date(data.ret[i].date*1000).getDate();
		            }
		        }
				that.setState({
					list: data.ret
				})
			}
        })
	}
	render(){
		var that =this;
		if(!this.state.loading){
			if(this.state.list){
				var items = this.state.list.map(function(item,i){
					var style = item.isRead == 0 ? '' : 'read';
					return( 
						<li key={ i } className={ style }>
							<Link to={`/detail/${item.m_id}`} >
								<img src={that.common.icon4} />
								<h5>{ item.title }</h5>
								<p>{ item.subTitle }</p>
								<span>{ item.date }</span>
							</Link>
						</li>
					)
				});
				return <div>
					<ul className='notice-list'>{ items }</ul>
				</div>
					
			}else{
				return <div>
					<img className='no-ms' src={this.common.noms} />
				</div>
			}
		}else{
			return <Loading />
		}
	}
};

export default NoticeList