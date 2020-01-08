"# js-template" 1.全局操作
全局安装 mocha 进行测试
全局安装 vue/cli
全局安装 express-generator

2.数据库安装，此处用 mongodb
启动命令 mongod --dbpaht 你的数据路径

3.后端操作
先写 model 模型，
再写 dao 数据库到后端接口
然后通过 mocha 进行测试
测试通过后，进行相应路由的处理
通过 rest-client 进行 http 请求测试
然后连接前端
///本模板处理了 book 的实例

4.前端操作
通过 VUE，访问后端数据，进行交互。打包构建时，将输出文件，通过 vue.config.js 设置
输出结果到后端程序的 public 文件夹下。

5.服务器部署（linux）

申请服务器，后讲 ip 地址名统一叫{this.url}(例如 {this.url} = 39.98.70.116) #命令 表示命令行输入命令，实际输入不需要#
此处处理操作以百度云为例

首先通过 初始化磁盘 初始化后选则密码登录 来改变之前用秘钥的复杂处理

#ssh root@{this.url}
通过此命令访问服务器，可能提示 ssh 不是命令，则下载 ssh-open 插件
如果提示 WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!  
则在 C:\Users\admin\.ssh\known_hosts 文件 删除登录信息

然后执行以下命令，安装对应模块

//安装 git
#apt-get update
#apt-get install git

//安装 nodejs
#wget 地址 (nodejs.cn)
#xz -d node-v12.14.0-linux-x64.tar.xz
#tar xvf node-v12.14.0-linux-x64.tar
#export PATH=/root/node-v12.14.0-linux-x64/bin:\$PATH

//安装淘宝镜像
#vim .npmrc 按 i n registry=https://registry.npm.taobao.org

# pm install n -g

//如何用 n 来安装 node 版本
#n ls-remote //查看版本
#n 13.5.0 //安装版本

//安装 mongodb
找到 mongodb 官网下载，选 linux 版本 mongodb 的 server 和 shell，
在下载按钮下方复制下载地址
#wget 下载地址
//安装文件处理
#dpkg -i （deb 文件）：安装 deb 文件，server 可能需要安装组件（ #apt-get install libcurl3）
#service mongod start：把 mongodb 安装在后台运行
//运行后查看运行状况
#ps -e |grep mongod：查看 mongod 的进程
#lsof -i:27017：查看端口号的进程，确定 mongo 进程
//更改配置文件
#vim /etc/mongod.conf：编辑设置文件，将 bindIp 改为 0.0.0.0
//想直接操作 mongodb
#mongo --host （公网地址） --port 27017
然后
#mongo

//后台部署 全局安装 forever
#npm install forever -g
forever start -a bin/main.js（后台启动的文件入口）
