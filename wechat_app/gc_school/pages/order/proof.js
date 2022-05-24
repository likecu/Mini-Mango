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
                console.log(n), wx.uploadFile({
                    url: o.util.url() + "c=entry&a=wxapp&do=ImgPost&m=gc_school",
                    filePath: n.tempFilePaths[0],
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    name: "file",
                    success: function(o) {
                        console.log(o);
                        var n = JSON.parse(o.data).data;
                        console.log(n), t.setData({
                            img: n
                        });
                    }
                });
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