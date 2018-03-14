import React from 'react'
import { Link } from 'react-router'
//MallSwiper
var MallSwiper = React.createClass({
  	componentDidMount(){
  		// swiperInit
  		let imgs = this.props.imgs;
  		if(this.props.topBanner){
  			//先生成dom，后插入。
  			let type = '';
  			for(var i=0;i<imgs.length;i++){
  				type  = type + '<div class="swiper-slide "><div><a><img src=' + imgs[i].url + ' /></a></div></div>'
  			}

  			$('#bannerSwiper1 .swiper-wrapper').append(type)
  			var bannerSwiper1 = new Swiper ('#bannerSwiper1 .swiper-container', {
			  direction: 'horizontal',
			  autoplay: 5000,
			  pagination: '.swiper-pagination',
			  observer:true,
			  preventClicks : false,
			  loop:true
			})
  		}
  		else{
  			//先生成dom，后插入。
  			let type = '';
  			for(var i=0;i<imgs.length;i++){
  				type = type + '<div class="swiper-slide "><div><a><img src=' + imgs[i].url + ' /></a>';
  				type = type + '<div><p class="title">限时438！全合成保养+检测+工时！嘉实多极护/美孚金1号/力魔嘉实多极护/美孚金1号/力魔</p><p class="price"><span>￥</span><span>588.00</span>'
  				type = type + '<span class="delete">988</span><span class="label">仅限上海</span>'
  				type = type + '</p></div></div></div>'
  			}
 			$('#bannerSwiper2 .swiper-wrapper').append(type)

  			var bannerSwiper2 = new Swiper ('#bannerSwiper2 .swiper-container', {
			  direction: 'horizontal',
			  autoplay: 15000,
			  observer:true,
			  preventClicks : false,
			  slidesPerView:'auto',
			  spaceBetween:10,
			  paginationClickable:true,
			  loop:true
			})
  		}
  	},
	render(){
		let imgs = this.props.imgs;
        let topBanner = this.props.topBanner;
		if(this.props.topBanner){
			return (
	          	<div className='swiperBanner' id='bannerSwiper1' >
			        <div className="swiper-container">
			        	<div className="swiper-wrapper">
				        </div>
			          <div className='swiper-pagination'></div>
			        </div>
			    </div>
	    	)
		}
		else{
			return (
			    <div className='swiperBanner' id='bannerSwiper2' >
			        <div className="swiper-container">
				        <div className="swiper-wrapper">
	          			
				        </div>
		        	</div>
	      		</div>
	    	)
		}
	}
});

export default MallSwiper