import React from 'react'
import { Link } from 'react-router'
//running page   report page
var NoMessage = React.createClass({
  render:function(){
    return (
      <div className="no-message">
        <img src={ this.props.value.imgUrl } />
        <p>{ this.props.value.note }</p>
        <Link to='#/'>提交车源</Link>
      </div>
    )
  }
});

export default NoMessage