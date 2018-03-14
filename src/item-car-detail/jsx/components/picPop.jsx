/**
*查看图片弹出
*
*/
import React from 'react'
var PicPop = React.createClass({
	getInitialState(){
	    return {
	      name:'',
	      detail:'',
	      images:[]
	    }
	 },
	PopParm:{
		noimg:require('../../images/noimg.jpg')
	},
	inintPic(index){
		var that = this;
		var mySwiper = new Swiper('#popContainer .swiper-container', {
			pagination: '#popContainer .swiper-pagination',
			preloadImages:false,
			lazyLoading:true,
			initialSlide:index || 0,
			paginationType : 'fraction',
			observer:true,//修改swiper自己或子元素时，自动初始化swiper
			observeParents:true, //修改swiper的父元素时，自动初始化swiper
			onSlideNextStart:function(swiper){
				swiper.activeIndex < swiper.slides.length - 1 ? swiper.activeIndex+1 : swiper.activeIndex;
				that.handelInfo(swiper.activeIndex);
			},
			onSlidePrevStart:function(swiper){
				swiper.activeIndex > 0 ? swiper.activeIndex-1 : 0;
				that.handelInfo(swiper.activeIndex);
			},
			paginationFractionRender: function (swiper, currentClassName, totalClassName) {
			    return '<span class="' + currentClassName + '"></span>' +
			             '/' +
			             '<span class="' + totalClassName + '"></span>';
			}
		});
	},
	handelInfo(index){
		this.setState({
			name:this.state.images[index].name,
			detail:this.state.images[index].detail
		})
	},
	componentWillMount(){
		var image = this.props.images.filter(function(item){
          return item.img != "noimg";
      	});
      	this.setState({
      		images:image
      	})
	},
	componentDidMount(){
		this.inintPic(this.props.num);
		
	},
	hide(){
		this.props.hidePoP();
	},
  	render:function(){

  		
	    return (
	    	<div className="mainPics" id="popContainer">
	    		<span className="closeIcon" onClick={this.hide}></span>
    			<div className="swiper-container">
    				<div className="swiper-wrapper">

		       			{
		       				this.state.images.map((item,key)=>{
		       					return(
									<div className="swiper-slide">
										<div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
										{
											item.img == "noimg" 
												? 
												<div className="slideBgPic swiper-lazy" style={{backgroundImage:'url('+this.PopParm.noimg+')'}}></div>
												:   
												<div className="slideBgPic swiper-lazy" data-background={item.img}></div>
										}
		                            </div>
		       					)
		       				})
		       			}
		     		</div>
		     		<div className="swiper-pagination"></div>
		     		
    			</div>
    			<div className="swiperOut">
					<div className="itemInfo">
	                	<p>{this.state.name}</p>
	                   	<p>{this.state.detail}</p>
	                </div>	
    			</div>
    		</div>
	    	
	    )
	}
})
export default PicPop