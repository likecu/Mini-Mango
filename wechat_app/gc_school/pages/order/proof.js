var o = getApp();

Page({
    data: {
        id: "",
        img: ""
    },
    onLoad: function(o) {
        console.log(o), this.setData({
            id: o.id
        });
    },
    choose: function() {
        var t = this;
        wx.chooseImage({
            count: 1,
            success: function(n) {
                console.log(n);
                var date = new Date();
                var seperator1 = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                var currentdate = year + seperator1 + month + seperator1 + strDate;
                var path = 'images/' + currentdate + '/' + new Date().getTime() + Math.floor(Math.random() * 150) + '.png';
          
                wx.cloud.uploadFile({
                  cloudPath: path,
                  filePath: n.tempFilePaths[0],
                  config: {
                    env: 'cloud-0ggabd9q9ceb4c32'
                  }
                }).then(res1 => {
                        console.log(n), t.setData({
                            img: res1.fileID
                        });
                }).catch((e) => {
                  console.log("======上传失败======", result);
                  wx.hideLoading();
                });


                // wx.uploadFile({
                //     url: o.util.url() + "c=entry&a=wxapp&do=ImgPost&m=gc_school",
                //     filePath: n.tempFilePaths[0],
                //     header: {
                //         "content-type": "application/x-www-form-urlencoded"
                //     },
                //     name: "file",
                //     success: function(o) {
                //         console.log(o);
                //         var n = JSON.parse(o.data).data;
                //         console.log(n), t.setData({
                //             img: n
                //         });
                //     }
                // });
            }
        });
    },
    submit: function() {
        if ("" == this.data.img) return o.util.message("请上传凭证", "", "error"), !1;
        o.util.request({
            url: "entry/wxapp/submitProof",
            data: {
                o_id: this.data.id,
                proof: this.data.img
            },
            success: function(o) {
                console.log(o), 0 == o.data.errno && (wx.showToast({
                    title: "提交成功"
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1e3));
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});