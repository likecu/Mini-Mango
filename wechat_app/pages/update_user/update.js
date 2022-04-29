// pages/update_user/update.js

Page({
  data: {
    a1:{
      userAvatar:''
  },
    userPic:'',
  },
  onShow(){

  },
  submit: function (e) {
    //console.log("表单携带的数据：",e.detail.value);
    let a3=e.detail.value;
    let a1=this.data.a1;
    //console.log("表单携带的数据：",a1);
    let arr3=Object.assign(a3,a1);
    console.log("修改个人信息",arr3);
    if(a3.userAvatar!=""){
      wx.setStorageSync("userPic", a3.userAvatar);
    }
    wx.request({
      url: getApp().globalData.url + '/changeUserMessage',
      data: arr3,
      header: {
        "authorization": wx.getStorageSync("token")
      },
      method: 'POST',
      success: (result) => {
        if (result.data.code == 200) {
          wx.showToast({
            title: '保存成功',
          })
          wx.reLaunch({
            url: '/pages/index/index',
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
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: path,
          // 指定要上传的文件的小程序临时文件路径
          filePath: res.tempFilePaths[0],
          config: {
            env: 'test1-0gv461zze3a93633'
          }
        }).then(res1 => {
          that.setData({
            'a1.userAvatar':res1.fileID,
          });
          wx.hideLoading();
        }).catch((e) => {
          console.log("======上传失败======", result);
          wx.hideLoading();
        });
        //插入编辑器结束
        //云文件上传结束
      }
    })
    //选择图片结束
  }
})