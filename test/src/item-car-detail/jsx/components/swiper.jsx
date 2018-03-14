/*
*轮播图
*
*/
import React from 'react'
var SwiperPic = React.createClass({
	inintPic(){
        var that =this;
		var swiper = new Swiper ('#carSwiper .swiper-container', {
            direction: 'horizontal',
            lazyLoading:true,
            pagination: '#carSwiper .swiper-pagination',
            initialSlide:0,
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true, //修改swiper的父元素时，自动初始化swiper
            onClick: function(swiper, event) {
                that.handeShowCar(swiper.activeIndex);
            }
        });
	},
    handeShowCar(index){
        if(typeof AppParam != "undefined"){
            info['app_label_70']['index'] = index;
            info['app_label_70']['num'] = 0;
            AppParam.showCarPic(JSON.stringify(info['app_label_70']));
        }
        
    },
	componentDidMount(){
        $('#carSwiper .swiper-wrapper .swiper-slide img').css({'height':(document.documentElement.clientWidth * 3 / 4) + 'px'});
		this.inintPic();
	},
  	render:function(){
  		var images = this.props.images;
    	return (
    		<div className="carSwiper" id="carSwiper">
    			<div className="swiper-container">
    				<div className="swiper-wrapper">
		       			{
		       				images.map((img)=>{
		       					return(
									<div className="swiper-slide">
                                        <div className="swiper-lazy-preloader"></div>
		                                <img data-src={img} className="swiper-lazy"/>
		                            </div>
		       					)
		       				})
		       			}
		     		</div>
		     		<div className="swiper-pagination"></div>
		     		<div className="fixCarNumber">{info['app_label_5']}</div>
    			</div>
    		</div>
    	)
 	}
})
export default SwiperPic