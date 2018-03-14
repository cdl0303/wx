import youyiche from '../../../base-common/js/youyiche.js'
import React from 'react'
import itemConfig from '../../js/itemConfig.js'

var RunningCarList = React.createClass({
  getInitialState:function(){
    return { 
      show :false,
      info:[],
      showSpeed:false,
      hasPush:false,//催一催
    }
  },
  componentDidMount:function(){
    this.props.index == 0 ?  this.setState({ show : !this.state.show , info:this.props.logs}) : '';
  },
  componentWillMount:function(){

    if(this.props.index == 0){
      this.setState({
        show:true,
        showSpeed:true
      })
      this.showDetail(this.props.firstnid,this.props.index);
    }

  },
  showDetail:function(vnId,index){

    var that = this;
    if(!this.state.show){
      youyiche.getData({
        url:itemConfig.api.getRecordLogByNeedid+"?nid="+that.props.nid
      })
        .then(
          (data)=>{
            if(data.errcode != 0){
              return;
            }
            if(data.data.length > 0){
              for(var i=0;i<data.data.length;i++){
                data.data[i].date = data.data[i].date.replace(/-/g,'.'); 
              }
              that.setState({
                show : !that.state.show,
                info:data.data
              })
            }
            
          }
        )
    }else{
       this.setState({ show : !this.state.show })
    }
  },
  render:function(){
    var showClass = this.state.show ? 'schedule-list show' : 'schedule-list' ;
    var items = null;
   
      items = this.state.info.map(function(item,i){
        return (
          <li key={ i }>
            <div className="px-one-border px-one-border-bottom">
              <span></span>
              <span className='schedule-circle'></span>
              <p>{item.title}
              </p>
              <p>{item.date}</p>
             
            </div>
          </li>
        )
      },this)
     
     
    return (
      <div className={ showClass + " px-one-border px-one-border-top"}>
        <div onClick={ this.showDetail.bind(this,this.props.value.vnId,this.props.index)}>
            <div className="px-one-border px-one-border-bottom">进度跟踪</div>
        </div>
        <ul className='schedule-details'>{ items }</ul>
        
      </div>
    )
  }
});
export default RunningCarList