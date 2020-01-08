1.全局操作
全局安装mocha进行测试
全局安装vue/cli
全局安装express-generator

2.数据库安装，此处用mongodb
启动命令 mongod --dbpaht 你的数据路径

3.后端操作
先写model模型，
再写dao 数据库到后端接口
然后通过mocha进行测试
测试通过后，进行相应路由的处理
通过rest-client进行http请求测试
然后连接前端
///本模板处理了book的实例
后端启动经常无故报模块缺失，先确认数据库已启动，再删除删除node_modules，然后重新npm install

4.前端操作
通过VUE，访问后端数据，进行交互。打包构建时，将输出文件，通过vue.config.js设置
输出结果到后端程序的public文件夹下。
express 的设置静态文件夹，默认缺省index.html为/路由下的执行文件，如果存在，则之后的router.get('/')将不执行（被短路）

5.服务器部署（linux）

申请服务器，后讲ip地址名统一叫{this.url}(例如 {this.url} = 39.98.70.116)
#命令 表示命令行输入命令，实际输入不需要#
此处处理操作以百度云为例

首先通过 初始化磁盘 初始化后选则密码登录 来改变之前用秘钥的复杂处理

#ssh root@{this.url}
通过此命令访问服务器，可能提示ssh不是命令，则下载ssh-open插件
如果提示WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!  
则在C:\Users\admin\.ssh\known_hosts文件  删除登录信息

然后执行以下命令，安装对应模块

//安装git
#apt-get update
#apt-get install git

//安装nodejs
#wget  地址 (nodejs.cn)
#xz -d node-v12.14.0-linux-x64.tar.xz
#tar xvf node-v12.14.0-linux-x64.tar
#export PATH=/root/node-v12.14.0-linux-x64/bin:$PATH

//安装淘宝镜像
#vim .npmrc  按i   n registry=https://registry.npm.taobao.org
# pm install n -g

//如何用n来安装node版本
#n ls-remote //查看版本
#n 13.5.0    //安装版本

//安装mongodb
找到mongodb官网下载，选linux版本mongodb的server和shell，
在下载按钮下方复制下载地址
#wget 下载地址 
//安装文件处理
#dpkg -i （deb文件）：安装deb文件，server可能需要安装组件（ #apt-get install libcurl3）
#service mongod start：把mongodb安装在后台运行
//运行后查看运行状况
#ps -e |grep mongod：查看mongod的进程
#lsof -i:27017：查看端口号的进程，确定mongo进程
//更改配置文件
#vim /etc/mongod.conf：编辑设置文件，将bindIp改为0.0.0.0
//想直接操作mongodb
#mongo  --host （公网地址）  --port 27017
然后
#mongo

//后台部署 全局安装forever
#npm install forever -g
forever start -a bin/main.js（后台启动的文件入口）







