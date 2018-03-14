#youyiche_front_wx

(一)目录说明
	1、开发目录 "/src"
	   *子目录以"base-"开头的文件夹内容为通用库，包括第三方和自定义的，例："/src/base-common"
	   *子目录以"item"-开头的文件夹为具体项目，例："/src/item-agent"

	2、打包目录 "/dist/WxWeb"
	   *子目录均以"item-"开头，例"/dist/WxWeb/item-agent"
	   *注："/dist/WxWeb"下的 "environmentConfig.js"为配置文件,生产环境需单独配置

(二)安装依赖模块
	1、全局安装webpack,执行命令  npm install webpack -g (已安装可忽略)
	2、全局安装gulp,执行命令  npm install gulp -g (已安装可忽略)
	3、安装项目依赖插件，根目录执行命令  npm install (请确保依赖模块都安装成功)

	注：若遇网络原因安装失败，可使用淘宝cnpm(自行百度)或翻墙


(三)开发和打包
	1、本项目混合使用gulp和webpack进行开发和打包，以gulp为启动入口，具体配置可查看"gulpfile.js"以及"webpack.config.js"
	2、"package.json"内建了"babel"默认插件["react","es2015"]
	3、每个项目的开发环境和打包都需设置node script脚本来启动。

	example:

    "mall.test.dev": "gulp dev --ITEM_NAME=item-mall",
    "mall.test.build": "gulp build --ITEM_NAME=item-mall"

	参数'--ITEM_NAME'必填


待补充...






