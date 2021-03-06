Page({
  data: {
    members: [
      {
        userName:"123",
        userId:"id1"
      },
      {
        userName:"12113",
        userId:"id2"
      }
    ],

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
    console.log("投票页面加载");
    wx.request({
      url: getApp().globalData.url + '/getVoteListById/'+that.data.card_id,
      header: {
        "authorization": wx.getStorageSync("token")
      },
      method: 'POST',
      success: (result) => {
        if (result.data.code == 200) {
          console.log("投票页面request返回值",result.data.data);
          that.setData({
            members:result.data.data,
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
  },
  join1(e){
    let that = this;
    wx.request({
      url: getApp().globalData.url + '/joinVoting/'+that.data.card_id,
      header: {
        "authorization": wx.getStorageSync("token")
      },
      method: 'POST',
      success: (result) => {
        if (result.data.code == 200) {
          console.log(that.data.result_data);
          wx.showToast({
            title: '加入成功',
            icon:'success',
            duration: 2000
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
  },
  submit(e){
    //console.log("表单携带的数据：",e.detail.value);
    let that=this;
    let a3=e.detail.value.vote;
    console.log("表单携带的数据：",a3);
     wx.request({
      url: getApp().globalData.url + '/voteOthers/'+a3+'/'+that.data.card_id,
      header: {
        "authorization": wx.getStorageSync("token")
      },
      method: 'POST',
      success: (result) => {
        if (result.data.code == 200) {
          console.log(that.data.result_data);
          wx.showToast({
            title: '投票成功',
            icon:'success',
            duration: 2000
          }),
          wx.redirectTo({
            url:"/otherpage/dashboard/index"})
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
  },

});