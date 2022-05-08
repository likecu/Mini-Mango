// pages/group_fun/create_group/create_group.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
  },
  submit(e){
    //console.log("表单携带的数据：",e.detail.value);
    let that=this;
    let a3=e.detail.value;
    let a1=this.data.a1;
    //console.log("表单携带的数据：",a1);
    let arr3=Object.assign(a3,a1);
    console.log("创建卡片",arr3);
     wx.request({
      url: getApp().globalData.url + '/createCard',
      data: arr3,
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

})