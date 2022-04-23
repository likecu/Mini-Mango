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
          path: '/pages/index/index',
          title: '邀请',
        },
        {
          path: '/pages/index/index',
          title: '修改小组属性',
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
          console.log("小组列表request返回值");
          console.log(result.data.data);
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
