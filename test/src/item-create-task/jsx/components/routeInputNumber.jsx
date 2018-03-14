import youyiche from 'youyiche'
import itemConfig from 'itemConfig'
import React from 'react'
import ReactTipPop from 'reactComponents/react-tip-pop/component.jsx'

class RouteInputNumber extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'RouteInputNumber';
        this.eventInput = this.eventInput.bind(this);
        this.eventSubmit = this.eventSubmit.bind(this);

        let list = [
        	{
	    		placeholder : "请输入卖车需求编号或车辆编号",
	    		text:["卖车需求编号可以在ERP的潜客详情页中获得，也可以在代理人微信公众号中查看","注意：填写车辆编号时，请务必填写完整的车辆编号，例如SH006260"]
	    	},
	    	{
	    		placeholder : "请输入检测任务号或车辆编号",
	    		text:["在上方填写你今天刚做完的那台车的车辆编号或者检测任务编号","注意：填写车辆编号时，请务必填写完整的车辆编号，例如SH006260"]
	    	}
        ];

    	const type = this.props.params.type;

        this.request = {
            number:'',
            type:parseInt(this.props.params.type)
        };

        this.state = {
        	placeholder:list[type].placeholder,
        	text:list[type].text,
            disbled:"disbled"
        };
    }
    showReactTipPop(value){ //显示提示框
        this.refs.reactTipPop.show(value);
    }
    regNumber(value) { //验证编号
        let reg = /^([a-zA-Z]+\d+|\d+)$/;
        return reg.test(value);
    }
    eventInput(event) { //输入编号
        let regResult;
        const value = event.target.value.trim();
        this.request.number = value.toLocaleUpperCase();
        regResult = this.regNumber(value);
        if(regResult){
            this.setState({
                disbled:''
            }) 
        }else{
            this.setState({
                disbled:'disbled'
            })
        }
    }
    eventSubmit(event) { //提交
        let self = this;
        let numberText = "卖车需求编号";
        let right = '';

        this.regNumber(this.request.number);

        if(this.props.params.type==1){
            numberText = "检测任务号";
        }
        if(this.state.disbled!="disbled"){
            itemConfig.ajaxSubmitNumber(
                this.request,
                (data)=>{
                    let to = '/inputTaskDetail/'+self.props.params.type;
                    data.number = self.request.number;
                    sessionStorage.setItem("submitNumberResponse",JSON.stringify(data));
                    self.props.history.pushState(null,to);
                },
                (message)=>{
                    self.showReactTipPop(message);
                }
            )
        }else{
            right += this.request.number?'正确格式的':'';
            this.showReactTipPop('请输入'+right+numberText+'或车辆编号');
        }
    }
    render() {
        return 	<div className="page-input-number">
        			<div className="group-input">
        				<input type="text" className="input-text inputDefault" onInput={this.eventInput} placeholder={this.state.placeholder} />
        			</div>
        			<div className="group-item tip">
        				{
		        			this.state.text.map((item)=>{
		        				return <p>{item}</p>;
		        			})
	        			}
        			</div>
        			<div className="group-btn">
        				<span className={"btn buttonDefault "+this.state.disbled} onClick={this.eventSubmit}>下一步</span>
        			</div>
                    <ReactTipPop ref="reactTipPop" />
        		</div>;
    }
}

export default RouteInputNumber;
