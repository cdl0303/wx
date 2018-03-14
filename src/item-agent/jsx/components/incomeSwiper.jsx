/**
* car source report
*/
import youyiche from '../../../base-common/js/youyiche.js'
import React from 'react'
import itemConfig from '../../js/itemConfig.js'
import { Link } from 'react-router'

var IncomeSwiper = React.createClass({
   getInitialState:function(){
    return {
      status:true,
      competence:false
    }
  },
  getDataFun(index){
    var mySwiper = new Swiper('.swiper-container', {
        roundLengths : true, 
        initialSlide :this.props.allData.length,
        speed:600,
        slidesPerView:"auto",
        centeredSlides : true,
        //followFinger : false,
        loop:false,
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
      })
  },
  componentDidMount(){
    if(this.props.allData && this.props.allData.length>0){
      this.getDataFun(this.props.allData.length);
    }
  },
  render:function(){
    return (
        <div className="swiper-container">
              
          <div className="swiper-wrapper">
            {
            this.props.allData.map(function(item,k){
              return(
                  <div className={k==1 ? "swiper-slide swiper-slide-active" : "swiper-slide"}>
                      <div className="incomeItem">
                        <div className="incomeTit">
                          <p className="titMonth">{item.date}</p>
                          <p className="titTotalIncome">{item.income.totalMoney}</p>
                          <p>总收入(元)</p>
                        </div>
                        <div className="incomeCont">
                          <ul className="clearfix">
                            <li className="borderB borderR">
                              <span className="incomeIcon jcIcon"></span>
                              <p>检测</p>
                              <p className="incomeNumP"><span className="incomeNum">{item.income.examNum}</span>&nbsp;台</p>
                            </li>
                            <li className="borderB">
                              <span className="incomeIcon cjIcon"></span>
                              <p>成交</p>
                              <p className="incomeNumP"><span className="incomeNum">{item.income.dealNum}</span>&nbsp;台</p>
                            </li>
                            <li className="borderR">
                              <span className="incomeIcon gxIcon"></span>
                              <p>下线贡献</p>
                              <p className="incomeNumP"><span className="incomeNum">{item.income.recommNum}</span>&nbsp;笔</p>
                            </li>
                            <li>
                              <span className="incomeIcon jlIcon"></span>
                              <p>活动奖励</p>
                              <p className="incomeNumP"><span className="incomeNum">{item.income.taskNum}</span>&nbsp;笔</p>
                            </li>
                          </ul>
                        </div>
                       
                      </div>
                  </div>
                )
                

            },this)
          }
          
          </div>
          <div className="swiper-button-prev">
              <span></span>
          </div>
          <div className="swiper-button-next">
              <span></span>
          </div>
        </div>
    )
  }
})
export default IncomeSwiper