import youyiche from '../../../base-common/js/common.js'
import React from 'react'
var noOrder =  require('../../img/noOrderPic.png');
var OrderList = React.createClass({
    //json: source,
    getInitialState: function(){
        return ({
       
        });
    },
    componentDidMount(){
	
	},
  
	

    render: function(){
        return (
                <div className="orderMenu">
                    <ul className="clearfix orderSelect px-one-border px-one-border-bottom">
                        <li className="cur">
                            <a>全部
                                <i></i>
                            </a>
                            
                        </li>
                        <li>
                            <a>待付款
                                <i></i>
                            </a>
                            
                        </li>
                        <li>
                            <a>待发货<i></i></a>
                            
                        </li>
                        <li>
                            <a>待收货<i></i></a>
                            
                        </li>
                        <li>
                            <a>已完成<i></i></a>
                            
                        </li>

                    </ul>
                    <div className="orderList">
                        <div className="orderItem">
                            <div className="orderMark">
                                <img src={noOrder}/>
                                <p>没有待付款的订单！</p>
                            </div>
                        </div>

                    </div>
                </div>
           );
        }
});

export default OrderList