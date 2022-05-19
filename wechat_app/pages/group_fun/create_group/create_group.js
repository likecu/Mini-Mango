// pages/group_fun/create_group/create_group.js
var uploadImage = require('../../../utils/uploadFile');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    a1:{
      themeImage:''
  },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  submit(e){
    //console.log("表单携带的数据：",e.detail.value);
    let that=this;
    let a3=e.detail.value;
    let a1=this.data.a1;
    //console.log("表单携带的数据：",a1);
    let arr3=Object.assign(a3,a1);
    console.log("创建小组",arr3);
     wx.request({
      url: getApp().globalData.url + '/addGroup',
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

  
  insertImage() {
    let that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        //把图片上传到云空间
        wx.showLoading({
          title: '正在上传图片',
        })

        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        //上传图片
        //你的域名下的/images/文件下的/当前年月日文件下的/图片.png
        //图片路径可自行修改
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        var path ='images/' + currentdate + '/' + new Date().getTime() + Math.floor(Math.random() * 150) + '.png';

        console.log("path",path,"file_path",res.tempFilePaths[0]);

        uploadImage(res.tempFilePaths[0], path,
        function (result) {
          console.log("======上传成功图片地址为：", getApp().globalData.photoUrl+ '/file/'+path);
          that.setData({
                'a1.themeImage':getApp().globalData.photoUrl+ '/file/'+path,
              });
          wx.hideLoading();
        },
        function (result) {
          console.log("======上传失败======", result);
          wx.hideLoading()
        }
      )
        // wx.cloud.uploadFile({
        //   // 指定上传到的云路径
        //   cloudPath: path,
        //   // 指定要上传的文件的小程序临时文件路径
        //   filePath: res.tempFilePaths[0],
        //   config: {
        //     env: 'test1-0gv461zze3a93633'
        //   }
        // }).then(res1 => {
        //   that.setData({
        //     'a1.themeImage':res1.fileID,
        //   });
        //   wx.hideLoading();
        // }).catch((e) => {
        //   console.log("======上传失败======", result);
        //   wx.hideLoading();
        // });
        //插入编辑器结束
        //云文件上传结束
      }
    })
    //选择图片结束
  }
})