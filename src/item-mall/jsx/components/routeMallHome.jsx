import React from 'react'
import MallSwiper from './mallSwiper.jsx'
//商城

//introduction-imageList
var imageList=[
  {
    path:'/tiroGuide',
    url:require('../../img/homeBanner1.png')
  },
  {
    path:'/plan',
    url:require('../../img/homeBanner2.png')
  },
  {
    path:'/tiroGuide',
    url:require('../../img/homeBanner1.png')
  },
  {
    path:'/plan',
    url:require('../../img/homeBanner2.png')
  }
];
var MallHome = React.createClass({
	getInitialState:function(){
	    return {
	      topBanner:false, //是否是顶部banner
	      product:[
	      	{
	      		img:require('../../img/homeBanner1.png'),
	      		des:'美车堂洗车券套餐',
	      		price:50.01
	      	},
	      	{
	      		img:require('../../img/homeBanner1.png'),
	      		des:'美车堂洗车券套餐，买一送二。3次50元，总共100',
	      		price:50.01
	      	},
	      	{
	      		img:require('../../img/homeBanner1.png'),
	      		des:'美车堂洗车券套餐，买一送二。3次50元，总共100买一送二。3次50元，总共100',
	      		price:50.01
	      	}
	      ]
	    }
    },
	render(){
		let self = this;
		return(
			<div className='mallHome'>
				<MallSwiper  topBanner={true} imgs={imageList}/>
				<div className='official mallBox'>
					<p className='boxTitle'>官方特供服务</p>
					<MallSwiper topBanner={false} imgs={imageList}/>
				</div>
				<div className='onsellProduct mallBox'>
					<p className='boxTitle '>最热产品</p>
					{
						this.state.product.map((product)=>{
							return(
								<div className='product'>
									<img src={product.img}/>
									<p>{product.des}</p>
									<p>￥{product.price} <span className='label'>仅限上海</span></p>
								</div>
							)
						})
					}
				</div>
				<div className='recommend mallBox'>
					<p className='boxTitle '>更多推荐</p>
					{
						this.state.product.map((product)=>{
							return(
								<div className={self.state.product.length % 2 == 0 ? 'productOdd':'productEven'}>
									<div className='img'>
										<img src={product.img}/>
									</div>
									<p>{product.des}</p>
									<p>￥{product.price}</p>
								</div>
							)
						})
					}
				</div>
			</div>
		)
	}
})

export default MallHome