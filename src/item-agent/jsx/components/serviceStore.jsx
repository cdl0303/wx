import React from 'react'

//ServiceStore
var ServiceStore = React.createClass({
  getInitialState(){
      return{
        stores:[]
      }
  },
  componentWillMount(){
    var scrolling={
          shopAddressData:[],
          getData:[],
          n:1
        }
    let self = this;
    if(this.props.shopAddress){
        scrolling.shopAddressData = this.props.shopAddress;
        scrolling.getData = scrolling.shopAddressData.slice(0,10);
        this.setState({
            stores:scrolling.shopAddressData.slice(0,10) //加载前10条数据
          });
          scrolling.n += 1;
      }
    //监听滚动  
    if(location.hash.indexOf('productDetail')>-1){
       document.addEventListener('scroll', function(){self.handleScroll(scrolling)});
    }
  },
  //滚动条在Y轴上的滚动距离  
  getScrollTop:function(){
　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
　　if(document.body){
　　　　bodyScrollTop = document.body.scrollTop;
　　}
　　if(document.documentElement){
　　　　documentScrollTop = document.documentElement.scrollTop;
　　}
　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
　　return scrollTop;
  } ,
  //文档的总高度 
  getScrollHeight:function(){
  　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
  　　if(document.body){
  　　　　bodyScrollHeight = document.body.scrollHeight;
  　　}
  　　if(document.documentElement){
  　　　　documentScrollHeight = document.documentElement.scrollHeight;
  　　}
  　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
  　　return scrollHeight;
  },
  //浏览器视口的高度 
  getWindowHeight:function(){
　　var windowHeight = 0;
　　if(document.compatMode == "CSS1Compat"){
　　　　windowHeight = document.documentElement.clientHeight;
　　}else{
　　　　windowHeight = document.body.clientHeight;
　　}
　　return windowHeight;
  },
  handleScroll:function(scrolling){
      if(!document.getElementById("storeMore")){
        return false; 
      }
      var num = 0,
        pages = 0; //页数
      if(this.getScrollTop() + this.getWindowHeight() > this.getScrollHeight() - 10){
        if(scrolling.shopAddressData.length > 0){
        num = scrolling.shopAddressData.length%10;
          pages = Math.ceil(scrolling.shopAddressData.length/10);
          if(scrolling.n <= pages){
            if((scrolling.shopAddressData.length-scrolling.getData.length) < 10){
              scrolling.getData = scrolling.getData.concat(scrolling.shopAddressData.slice(10*(scrolling.n-1),10*scrolling.n+num));
            }else {
              scrolling.getData = scrolling.getData.concat(scrolling.shopAddressData.slice(10*(scrolling.n-1),10*scrolling.n));
            }
            scrolling.n += 1;
            this.setState({
              
              stores:scrolling.getData
              
            });
            //console.log(getData);
            
          }else{
            document.getElementById("storeMore").innerText = "没有更多了......";
            return false;
          }
        }else{
        document.getElementById("storeMore").innerText = "没有更多了......";
        }
  　　}
  },
  render:function(){
    if(this.state.stores.length){
      return (
        <div className='service-store module-box clearfix'>
          <span className='box-icon'></span>
          <div className='box-title'>服务门店</div>
          <ul className='store-ul px-one-border px-one-border-top'>
            {
              this.state.stores.map((item,index)=>{
                return(
                  <li className='px-one-border px-one-border-bottom'>
                    <p>{item.name}</p>
                    <p>{item.address}</p>
                  </li>
                )
              })
            }
          </ul>
          <div className="storeMore" id="storeMore">下拉加载更多......</div>
        </div>
      )
    }
    else{
      return false;
    }
  }
});

export default ServiceStore