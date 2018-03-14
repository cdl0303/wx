import React from 'react'

//loading
var Loading = React.createClass({
  render:function(){
  	let load = require('../../img/loading.gif');
    return (
      <div className="no-message loading">
        <img src={load} />
      </div>
    )
  }
});

export default Loading