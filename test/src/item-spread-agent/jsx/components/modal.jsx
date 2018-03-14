import React from 'react'

//modal
var Modal = React.createClass({
  render:function(){
    var className = this.props.text ? 'modal show' : 'modal';
    return (
      <div className={ className }>{this.props.text}</div>
    )
  }
});

export default Modal