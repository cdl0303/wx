
//  item-notice项目配置文件（包括api的url以及在本项目中用到的方法）
import youyiche from 'youyiche'
import youyicheWX from 'youyicheWX'

var itemConfig = {
	getQueryStringByName:(name)=> {
	    var search = !!location.search ? location.search : location.hash;
	    var result = search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
	    if (result == null || result.length < 1) {
	        return "";
	    }
	    return result[1];
	}
}

export default itemConfig