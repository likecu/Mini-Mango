Page({
  data: {
    joinGroups:{
      groupName: '投票列表',
      group_id:null,
      list: [
        {
        },
      ],
    },

  isShow: false,
  heightConfig: 0,
  navTop: 0,
  themeMessage:"",
  },

  onLoad: function (options) {
    this.init(options);
  },
  
  init(options){
    let that = this;
    this.setData({
      navTop: getApp().globalData.navTop,
      heightConfig: getApp().globalData.windowHeight,
      card_id:options.id,
    })
    console.log("投票列表页面加载");
    wx.request({
      url: getApp().globalData.url + '/getPublicVote',
      header: {
        "authorization": wx.getStorageSync("token")
      },
      method: 'POST',
      success: (result) => {
        if (result.data.code == 200) {
          console.log("投票列表页面request返回值",result.data.data);
          that.setData({
            "joinGroups.list":result.data.data,
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
})
