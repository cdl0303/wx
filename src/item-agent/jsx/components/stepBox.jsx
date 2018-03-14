import React from 'react'

//running stepBox 
var StepBox = React.createClass({
  getInitialState:function(){
    return {
      step1:'',
      step2:'',
      step3:'',
      step4:''
    }
  },
  componentDidMount:function(){
    switch(this.props.status){
      case "0" :
      break;
      case "1" :
        this.setState({
          step1:'fail',
        })
      break;
      case "2" :
        this.setState({
          step1:'light status2',
        })
      break;
      case "3" :
        this.setState({
          step1:'light',
          step2:'light',
        })
      break;
      case "4" :
        this.setState({
          step1:'light',
          step2:'light',
          step3:'light',
        })
      break;
      case "5" :
        this.setState({
          step1:'light',
          step2:'light',
          step3:'light',
          step4:'light'
        })
      break;
    }
  },
  render:function(){
    return (
      <dl className='step-box'>
        <dd className={ this.state.step1 }><i></i>已致电</dd>
        <dd className={ this.state.step2 }><i></i>验证车源</dd>
        <dd className={ this.state.step3 }><i></i>成功检测</dd>
        <dd className={ this.state.step4 }><i></i>交易成功</dd>
      </dl>
    )
  }
});


export default StepBox