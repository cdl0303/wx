import youyiche from '../../../base-common/js/youyiche.js'
import React from 'react'
import StepBox from './stepBox.jsx'
import RunningCarList from './RunningCarList.jsx'

var RunningCar = React.createClass({
  getInitialState:function(){
    return { 
      show :false,
      logs:this.props.log,
      runningCar:[],
    }
  },
  componentWillMount:function(){
    
  },
  render:function(){
    var that = this
    var items = this.props.value.map(function(item,i){
      return (
        <li className='running-li px-one-border px-one-border-all' key={ i }>
          <div className="runningTit px-one-border px-one-border-bottom">
             <p className='title'>{item.name}  {item.brand} {item.series}</p>
              <p>最新变更时间 { item.date } id:{item.need_id}</p>
          </div>
          <StepBox status= { item.status }/>
          <RunningCarList index = { i } value = { item } logs = {that.state.logs} nid={item.need_id} firstnid={that.props.value[0].need_id}></RunningCarList>
        </li>
      )
    });
    return (
      <ul className='running-car'>{ items }</ul>
    )
  }
})
export default RunningCar