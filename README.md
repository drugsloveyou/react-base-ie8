这是一个在react可在ie8版本中运行的一个开发环境配置

react与react-dom采用0.14.8版本

```
git clone https://github.com/drugsloveyou/react-base-ie8.git
npm i

提取常用类库
npm run dll

正常启动服务
npm start

提取常用类库并启动服务
npm run start:dll

代理启动服务一边外网访问
npm run start:tunnel

启动在ie8上运行的服务器
npm run start:ie8

以下命令可能会被取消
npm run copy 
npm run build:copy

运行测试用例
npm run test

构建代码
npm run build

生产环境打包代码
npm run prod
```
