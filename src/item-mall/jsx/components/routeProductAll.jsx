import React from 'react'

//全部商品
var ProductAll = React.createClass({
	getInitialState:function(){
	    return {
	      product:[
	      	{
	      		img:require('../../img/homeBanner1.png'),
	      		des:'美车堂洗车券套餐',
	      		price:50.01
	      	},
	      	{
	      		img:require('../../img/homeBanner1.png'),
	      		des:'美车堂洗车券套餐，买一送二。',
	      		price:50.01
	      	},
	      	{
	      		img:require('../../img/homeBanner1.png'),
	      		des:'美车堂洗车券套餐，买一送二。3次50元，总共100份美车堂洗车券套餐，买一送二。3次50元，总共100份美车堂洗车券套餐，买一送二。3次50元', 
	      		price:50.01
	      	}
	      ]
	    }
    },
	render(){
		return(
			<div className='productAll'>
			{
				this.state.product.map((product)=>{
					return(
						<div className='product clearfix'>
							<div className='img'>
								<img src={product.img}/>
							</div>
							<div className='des'>
								<p className='title'>{product.des}</p>
								<p className='price'>￥{product.price}</p>
							</div>
						</div>
					)
				})
			}
			</div>
		)
	}
})

export default ProductAll