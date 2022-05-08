//import list from '../config';
//import Page from '../page';

Page({
  data: {
    joinGroups:{
      groupName: '我的身份卡',
      list: [],
    },

    groupFun:{
      groupName: '身份卡获取',
      list: [
        {a:"as"},
      ],
    },


  
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
      url: getApp().globalData.url + '/getCards',
      data: {
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
