import youyiche from '../../../base-common/js/youyiche.js'
import React from 'react'

import itemConfig from '../../js/itemConfig.js'

//失效车源log
var FailureLog = React.createClass({
  getInitialState(){
    return { 
      failureLog:[]
    }
  },
  showLog:function(nid){
    youyiche.getData({
      url:itemConfig.api.getRecordLogByNeedid+"?nid="+nid
    }).then((data)=>{
        if(data.errcode != 0){
          return;
        }
        if(data.data.length > 0){
              for(var i=0;i<data.data.length;i++){
                data.data[i].date = data.data[i].date.replace(/-/g,'.'); 
              }
        }
        this.setState({
          failureLog:data.data
        })
    })
  },
  render:function(){
      
      return(
        <ul className="invalidCase px-one-border px-one-border-top">
          {
            this.state.failureLog.map(function(item,k){
              return(
                <li>
                  {k == 0 ? <span className="hideLine"></span> : ''}
                  
                  <span className="speedCase">
                    <span></span>
                  </span>
                  <div className="caseTxt px-one-border px-one-border-bottom">
                    <p>{item.title}</p>
                    <p>{item.date}</p>
                  </div>
                </li>
              )
            })
          }
        </ul>
      )
  }
});
export default FailureLog