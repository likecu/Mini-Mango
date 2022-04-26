// pages/commitpage/testcomm.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    heightConfig: 0,
    navTop: 0,
    new_article: [], //最新的几篇文章
    new_end: false, //是否加载完成
    new_page: 1, //当前page页数
    themeMessage: [], //主题信息
    theme_title:"helo1201300",
    theme_intro:"123122313",
    theme_image:"https://s1.ax1x.com/2020/06/14/tzrtL6.png",
    motto: "",
    result_data:[],
    isReplay: false,
    notice: {
      userId: "",
      content: ""
    },
    userInfo: {
      "userId": 1,
      "userNickname": "",
      "userGender": 1,
      "userToken": "",
      "userAvatar": "/image/user.png",
      "userOther": "",
      "userCity": "",
      "userAge": "",
      "userProvince": "",
      "userCountry": "",
      "userMotto": "这个人很懒,什么也没有留下",
      "userPhone": "",
      "createTime": "2020-04-29 12:37"
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      navTop: getApp().globalData.navTop,
      heightConfig: getApp().globalData.windowHeight,
      themeMessage: wx.getStorageSync("themeMessage"),
      'notice.userId': options.id
    })
   
    
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
          that.setData({
            isShow: false,
            result_data:result.data.data,
          })
          console.log(that.data.result_data);
          wx.showToast({
            title: '保存成功',
          })
          that.setData({
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

    // wx.request({
    //   url: getApp().globalData.url + '/updateUserType',
    //   data: {
    //     themeId: "helo10",
    //     userId: 29,
    //     t:"00",
    //     userType: 4,
    //   },
    //   header: {
    //     "authorization": wx.getStorageSync("token")
    //   },
    //   method: 'POST',
    //   success: (result) => {
    //     if (result.data.code == 200) {
    //       that.setData({
    //         isShow: false,
    //         result_data:result.data.data,
    //       })
    //       console.log(that.data.result_data);
    //       wx.showToast({
    //         title: '保存成功',
    //       })
    //       that.setData({
    //         'userInfo.userMotto': that.data.motto
    //       })
    //     } else {
    //         wx.showModal({
    //           title: '提示',
    //           content: result.data.msg + '，错误码：' + result.data.code,
    //           confirmText: '确定',
    //           showCancel: false,
    //         })
    //     }
    //   }
    // });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})