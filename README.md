# Mini-Mango
一个小程序的后端  
目前仍在开发中。。。。

使用教程：  
1、修改 src/main/rescources/application.ymnl  
   修改数据库名称，用户名  
   设置微信id和密钥。   

2、可直接部署到服务器上，开启防火墙和端口映射即可。  

3、小程序前端目前还在设计过程中。  

  
 遇到问题  
 1、A component required a bean of type 'work.likecu.share.model.CardVoting' that could not be found.  
   原因：在CardVotingService 中有  
   private CardVoting cardVoting;  
   直接将这一行注释掉即可。  
 2、自定义sql语句书写：  
  先修改两个Mapper，再在service中增加，最后再controller中加入。  
 3、新增加sql表：  
 先新建表，在model中增加类、在两个mapper中增加记录(必须保持名称一致）、service中加入、Controller中加入  
注意 ` 与'的区别！！！！
 4、Service上只能使用Mapper进行操作，加上@Service注解才能被正确注入
   