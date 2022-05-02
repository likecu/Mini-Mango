Page({
  data: {
    joinGroups:{
      groupName: '小组成员列表',
      list: [
        {
          path: '/pages/group_fun/create_group/create_group',
          title: '创建小组',
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
      group_id:options.id
    })
    console.log("小组成员页面加载");
    wx.request({
      url: getApp().globalData.url + '/getGroupMembers/'+this.data.group_id,
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