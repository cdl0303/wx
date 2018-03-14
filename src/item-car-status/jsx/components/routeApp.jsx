import React from 'react'
import youyiche from 'youyiche'
import youyicheWX from 'youyicheWX'
import itemConfig from 'itemConfig'
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          vehicles:true//是否有提交车源
        }
    }

    componentWillMount(){
      //获取gps 作用于  当状态为车辆进度为待预约时确定默认城市
      youyicheWX.wxGetLocation(function(position){
        itemConfig.position = position;
      })
              
      //当前微信用户是否绑定
      youyiche.getData({
          url:itemConfig.api.wxBind
      }).then(function(data){
          if(!data.success){
              return;
          }
          //判断是否绑定
          if(data.ret){
            window.location.href = '#/carStatus'
          }
          else{
            window.location.href = '#/login'
          } 
      })
      
    }
    render() {
        return null;
    }
}

export default App;