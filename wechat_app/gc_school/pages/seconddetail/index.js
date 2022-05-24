var t = getApp();

Page({
    data: {
        data: {},
        indicatorDots: !0
    },
    onLoad: function(t) {
        console.log(t), this.getDetail(t.id);
    },
    getDetail: function(n) {
        var o = this;
        t.util.request({
            url: "entry/wxapp/goodsDetail",
            data: {
                id: n,
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {
                console.log(t.data.data), o.setData({
                    data: t.data.data
                });
            }
        });
    },
    previewImage: function(t) {
        var n = this.data.data.img, o = t.target.dataset.index;
        wx.previewImage({
            urls: n,
            current: n[o],
            fail: function(t) {
                wx.showToast({
                    title: "出错啦，请重试！",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    makecall: function(t) {
        console.log(t), "" != wx.getStorageSync("openid") ? wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.phone,
            success: function() {
                console.log("成功拨打电话");
            }
        }) : wx.showToast({
            title: "请先登录",
            icon: "none"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});