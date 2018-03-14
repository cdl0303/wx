import React from 'react'

//ErrorModal
var ErrorModal = React.createClass({
  render:function(){
    return (
      <div className={ this.props.txt ? 'modal show' : 'modal'} onClick={this.props.closeErrorModal}>
      {this.props.txt}
      </div>
    )
  }
});

export default ErrorModal