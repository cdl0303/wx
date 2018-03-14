import React from 'react';

//提交评论成功
class commentSuccess extends React.Component {
    constructor(props) {
        super(props);
        //提交评论成功
        this.common = {
        	successImg:require('../../img/commentSuccess.png')
        }
    }
    render() {
    	//提交评论成功
        return <div className={this.props.commentSuccess?'commentSuccess show':'commentSuccess'}>
        	<div className='successBox'>
        		<img src={this.common.successImg}/>
        		<p className='colorBlack'>感谢您对检测师的评价，</p>
        		<p className='colorBlack'>我们会做到更好！</p>
        		<p className='colorBlue font1000 px-one-border px-one-border-top' onClick={this.props.closeComment}>确定</p>
        	</div>
        </div>;
    }
}

//提交评论成功
export default commentSuccess;
