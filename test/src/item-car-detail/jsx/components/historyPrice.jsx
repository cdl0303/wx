/*
*历史价格查询
*
*/
import React from 'react'

var historyPriceItem = null;

var I = React.createClass({
    render: function() {
        var colors = this.props.colors;
        return (
            <div>
               {
                    this.props.labels.map(function (label, i) {
                        return <i className={colors[i]}>{label}</i>
                    })
               }
            </div>
        );
    }
});


var HistoryPrice = React.createClass({
    getInitialState(){
        return {
         hadCar:true,
         dataArr:[],
         noData:false,
        }
    },
    carsHandle(carList) {
        
        for (var i = 0; i < carList.length; i++) {
            if (carList[i].labels && carList[i].labels.length > 0) {
                carList[i].colors = [];
                var num = parseFloat(carList[i].labels[0].split('分')[0]);
                var frame = carList[i].labels[1].split('骨架')[1];
                var country = carList[i].labels[2] ? carList[i].labels[2].split('国')[1] : 'no';
                carList[i].colors[0] = (num > 80 ?  'bdblue' : 'default');
                carList[i].colors[1] = (frame == 'A' || frame == 'B') ? 'bdblue' : 'default';
                carList[i].colors[2] = (country == '四' || country == '五' ? 'bdblue' : 'default');
            }
        };

        this.setState({
            dataArr:carList,
            noData:false
        })
    },
    componentWillMount(){
        historyPriceItem = this;
        this.setState({
            noData:true
        })
    },
    componentDidMount(){
        if(typeof AppParam != "undefined"){
            AppParam.enterPriceSearch();
        }
        //window.setLikelyDeals(historyPrice);
    },
    appClick: function() {
        AppParam.enterAuctionList();
    },
    aClick: function(url) {
        AppParam.enterPriceCarDetailWithURL(url);
    },
    render: function() {
        let priceHtml = null;
        if(this.state.noData){
            priceHtml = <div></div>
        }else{
            if (this.state.dataArr.length == 0) {
                priceHtml = <div onClick={this.appClick} className="no-price"></div>;
            } else {
                    priceHtml = this.state.dataArr.map((item)=>{
                    return(
                        <div className="price-list" onClick={this.aClick.bind(this, item.url)}>
                                <div className="price-title text-point">{item.title}</div>
                                   <div className="price-info">
                                       <div className="info-img" style={{backgroundImage: 'url('+item.img+')'}}></div>
                                       <div className="info-car">
                                           <div className="text-point">{item.series}</div>
                                           <div className="text-point">{item.apm}</div>
                                           <I labels={item.labels} colors={item.colors ? item.colors : '' }/>
                                       <div className="text-point">{item.sale}</div>
                                   </div>
                                </div>
                                <div className="price-bottom">
                                    <b>{item.mprice}</b>
                                    <b>{item.vs}</b>
                                    <b>{item.sprice}</b>
                                </div>
                        </div>
                    )
                })
            }
        }
        
        return <div className="more-price">{priceHtml}</div>;
    }
})

var setLikelyDeals = function(carList) {
    HistoryPrice.prototype.carsHandle.call(historyPriceItem,carList);
};

window.setLikelyDeals = setLikelyDeals;


export default HistoryPrice