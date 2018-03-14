import React from 'react';
import youyiche from 'youyiche'
import itemConfig from 'itemConfig'
import CommentSuccess from './commentSuccess.jsx'

//车辆检测中
class CarDetection extends React.Component {
    constructor(props) {
        super(props);
        //车辆检测中
        this.state = {
            rate1:0,
            rate2:0,
            rate3:0,
            commentSuccess:false, //评论成功弹层
            rate:false,//false 表示未打分
            rate_count:this.props.carStatusInfo.examinant.rate_count//多少人打分
        }
        this.common = {
            scoreProject:['工作认真','服务态度','穿着整齐'],//打分的项目
            allStarNum:[0,1,2,3,4],//星星的总数目
            detectionImg:require('../../img/detection.png'),
            searchImg:require('../../img/search.png'),
        }
        this.choseStarNum = this.choseStarNum.bind(this);
        this.submitComment = this.submitComment.bind(this)
        this.closeComment = this.closeComment.bind(this)
    }
    componentDidMount() {
        this.setState({
            rate:this.props.carStatusInfo.examinant.your_rate1 == -1 ? false:true
        })
        this.starNum(this.props.carStatusInfo.examinant.rate);
    }

    starNum(rate){
        //评论得分
        for(var i = 0; i < 5; i++){
            document.getElementsByClassName('starNum')[i].style.backgroundPosition = '0 0px';
        }
        var starNum = rate;
        for(var i = 0; i < 5; i++){
            if(i<starNum){
                document.getElementsByClassName('starNum')[i].style.backgroundPosition = '0 -14px';
            }
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            rate:nextProps.carStatusInfo.examinant.your_rate1 == -1 ? false:true,
            rate_count:nextProps.carStatusInfo.examinant.rate_count
        })
        this.starNum(nextProps.carStatusInfo.examinant.rate);
    }
    //选择星星个数
    choseStarNum(productIndex,starNum){
        var lis = document.getElementsByClassName("choseStarNum");
        var rate = 'rate' + (productIndex + 1);
        //清除星星个数
        for(var j = 0; j<5 ; j++){
             lis[productIndex*5+j].className = 'choseStarNum'
        }
        //星星打分
        for(var i = 0; i<starNum ; i++){
             lis[productIndex*5+i].className = 'choseStarNum light'
        }
        this.setState({
            [rate]:starNum
        }) 
    }
    //提交评论
    submitComment(){
        //投票
        var self = this;
        youyiche.getData({
            url:itemConfig.api.rate,
            data:{
                etid:self.props.carStatusInfo.etid,
                rate1:self.state.rate1,
                rate2:self.state.rate2,
                rate3:self.state.rate3,
            },
            method:'POST'
        }).then(function(data){
            if(!data.success){
                return;
            }
            self.setState({
                commentSuccess:true,
                rate:true,
                rate1:0,
                rate2:0,
                rate3:0,
                rate_count:data.ret.rate_count
            })
            self.starNum(data.ret.rate)
        })  
    }

    //关闭评论弹窗
    closeComment(){
        this.setState({
            commentSuccess:false
        })
    }

    render() {
        let self = this;
    	//车辆检测中
        return <div className='carDetection'>
        	<div className='detectionImgBox'>
        		<div className='imgAdaptive detectionImg'>
        			<img src={this.common.detectionImg}/>
        		</div>
                <div className='avatar'>
                    <img className='searchImg' src={this.common.searchImg}/>
                </div>  
        		<p className='word colorLightGray'>检测师卖力检测中...</p>
        	</div>
            <div className='testEngineer'>
                <p className='colorBlack'>您的专属检测师</p>
                <div className='line'></div>
                <div className={this.state.rate ? 'titlePart' : 'titlePart px-one-border px-one-border-bottom'}>
                    <div className='leftPic'>
                        <div className='centerPicMenu imgAdaptive'>
                            <img src={this.props.carStatusInfo.examinant.head||require('../../img/defaultHeadPic.png')}/>
                        </div>
                    </div>
                    <div className='rightWord'>
                        <p className='centerName colorBlack'>{this.props.carStatusInfo.examinant.name}</p>
                        <ul className='starNumUl'>
                            <li className='starNum'></li>
                            <li className='starNum'></li>
                            <li className='starNum'></li>
                            <li className='starNum'></li>
                            <li className='starNum'></li>
                        </ul>
                        <p className='centerName colorLightGray font0750'>已检测{this.props.carStatusInfo.examinant.count}台车，{this.state.rate_count}名客户评价过</p>
                    </div>  
                </div>
                {
                    !this.state.rate?
                    <div id = 'rateBox'>
                        <div className='rateLine font0625 colorLightGray'>
                            <span>请为TA打分</span>
                        </div>
                        <div className='score'>
                            {
                                //打分项
                                this.common.scoreProject.map((productName,productIndex)=>{
                                    return(
                                        <div className='scoreDiv'>
                                            <lable className='colorBlack'>{productName}</lable>
                                            <ul className='choseStarUl'>
                                                {
                                                    //星星
                                                    self.common.allStarNum.map((star,starNum)=>{
                                                        return(
                                                            <li className='choseStarNum' onClick={self.choseStarNum.bind(this,productIndex,starNum+1)}><a href="javascript:;">{starNum}</a></li>
                                                        )
                                                    })
                                                }
                                            </ul> 
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <button className='buttonDefault' onClick={this.submitComment}>提交评价</button>
                    </div>
                    :''
                }
            </div>
            <CommentSuccess commentSuccess = {this.state.commentSuccess} closeComment = {this.closeComment}/>
        </div>
    }
}

//车辆检测中
export default CarDetection;
