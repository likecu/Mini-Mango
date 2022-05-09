//import list from '../config';
//import Page from '../page';

Page({
  data: {
    joinGroups:{
      groupName: '我的小组',
      list: [],
    },
    
    groupFun:{
      groupName: '小组功能',
      list: [
        {
          path: '/pages/group_fun/create_group/create_group',
          title: '创建小组',
        },
        {
          path: '/pages/card/card_list/index',
          title: '查看个人所有身份卡',
        },
      ],
    },

      not_ready:{
        groupName: '正在开发中的功能',
        list: [
          {
            path: '/pages/index/index',
            title: '通过用户名邀请小组成员',
          },
        ],
    },
  
  theme_title:"helo1201300",
  theme_intro:"123122313",
  theme_image:"https://s1.ax1x.com/2020/06/14/tzrtL6.png",
  isShow: false,
  heightConfig: 0,
  navTop: 0,
  themeMessage:"",
  },

  onLoad: function (options) {
    this.init();
  },
  
  init(){
    let that = this;
    this.setData({
      navTop: getApp().globalData.navTop,
      heightConfig: getApp().globalData.windowHeight,
    })
    console.log("小组列表页面加载 ：  Set is ok");
    wx.request({
      url: getApp().globalData.url + '/getUserGroups',
      data: {
        themeTitle: that.data.theme_title,
        themeIntro: that.data.theme_intro,
        themeUse: 0,
        themeImage: that.data.theme_image,
      },
      header: {
        "authorization": wx.getStorageSync("token")
      },
      method: 'POST',
      success: (result) => {
        if (result.data.code == 200) {
          console.log("小组列表request返回值",result.data.data);
          that.setData({
            'joinGroups.list':result.data.data,
            'userInfo.userMotto': that.data.motto
          })
        } else {
            wx.showModal({
              title: '提示',
              content: result.data.msg + '，错误码：' + result.data.code,
              confirmText: '确定',
              showCancel: false,
            })
        }
      }
    });
  }
});
