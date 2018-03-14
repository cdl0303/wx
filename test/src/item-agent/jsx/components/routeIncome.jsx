/**
* car source report
*/
import youyiche from '../../../base-common/js/youyiche.js'
import React from 'react'
import IncomeSwiper from './incomeSwiper.jsx'
import Loading from './loading.jsx'
import itemConfig from '../../js/itemConfig.js'

import { Link } from 'react-router'

var Income = React.createClass({
   getInitialState:function(){
    return {
      status:true,
      competence:false,
      allData:[],
      loading:true
      }
  },
  componentWillMount(){
    var that = this;
    youyiche.getData({
      url:itemConfig.api.getIncome
    }).then((data)=>{
      
      if(data.errcode != 0){
        that.setState({
          loading:true
        });
          return;
      }
      that.setState({
        allData:data.data,
        loading:false
      })
    })
  
  },
  render:function(){
    if(!this.state.loading){
      return (
        <div className="incomeBox">       
            <IncomeSwiper allData={this.state.allData}/>
            <p className="incomeDetailLink">
              <Link to="/incomeDetail" activeClassName="active">查看全部明细<em></em></Link>
            </p>
        </div>
      )
    }else{
      return(
          <Loading />
      )
    }
    
  }
})
export default Income