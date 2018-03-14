import React from 'react';

//是否有vn
class carVN extends React.Component {
    constructor(props) {
        super(props);
        this.common = {
        	hrefSvg:require('svgSymbol')
        }
    }
    render() {
        return <div className={this.props.carVN > 0 ?'carVN show':'carVN'}>
        	<div className='carVNTopBox '>
        		<p className='colorLightGray'>您有</p>
		        <p className='circle'>
			        <span>{this.props.carVN}</span>
			        <span className='colorLightGray'>条</span>
		        </p>
		        <p className='colorBlack'>卖车信息正在等待客服联系</p>
		        <svg onClick={this.props.closeCarVN}>
                    <use xlinkHref={ this.common.hrefSvg +'#shutDown'}></use>
                </svg>
        	</div>
	        <div className='carVNBottomBox font0750 '>
	        	<a href='tel:4008216161' className='font1000'>免费咨询400-821-6161</a>
	        	<p>客服工作时间：9：00-18：00</p>
	        	<p>在工作时间内，我们会在30分钟内与您联系，</p>
	        	<p>如果长时间没有接到我们的电话，</p>
	        	<p>您也可以直接拨打我们的400免费电话。</p>
	        </div>
        </div>;
    }
}

export default carVN;
