import React from 'react';

//底部说明
class bottomCaption extends React.Component {
    constructor(props) {
        super(props);
        //底部说明
        this.displayName = 'bottomCaption';
    }
    render() {
    	//底部说明
        return <div className='bottomCaption'>
        	<div className='content'>－·又一车竭诚为您服务·－</div>
        </div>;
    }
}

//部说明
export default bottomCaption;