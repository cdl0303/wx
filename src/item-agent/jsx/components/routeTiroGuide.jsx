import React from 'react'

//新手指引
var TiroGuide = React.createClass({
  render(){
    let point1 = require('../../img/point1.png');
    let point2 = require('../../img/point2.png');
    let point3 = require('../../img/point3.png');
    let point4 = require('../../img/point4.png');
    let point5 = require('../../img/point5.png');
    let point6 = require('../../img/point6.png');
    let point7 = require('../../img/point7.png');
    TDAPP.onEvent ("新手指南","合伙人"); 
    return(
      <div className='novice-guide'>
        <img src={point1}/>
        <img src={point2}/>
        <img src={point3}/>
        <img src={point4}/>
        <img src={point5}/>
        <img src={point6}/>
        <img src={point7}/>
      </div>
    )
  }
})

export default TiroGuide