var t = getApp();

Page({
    data: {
        money: .01,
        data: {},
        type: 1,
        userInfo: {}
    },
    onLoad: function(a) {
        var n = this;
        t.util.request({
            url: "entry/wxapp/Sysparment",
            success: function(t) {
                n.setData({
                    data: t.data.data.sys,
                    money: t.data.data.sys.month_fee
                });
            }
        }), this.getuserInfo();
    },
    getuserInfo: function() {
        var a = this;
        t.util.request({
            url: "entry/wxapp/UserInfo",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {
                a.setData({
                    userInfo: t.data.data.info
                });
            }
        });
    },
    current: function(t) {
        this.setData({
            type: t.currentTarget.dataset.type,
            money: t.currentTarget.dataset.money
        });
    },
    submit: function() {
        t.util.request({
            url: "entry/wxapp/vipPay",
            data: {
                money: this.data.money,
                openid: wx.getStorageSync("openid"),
                type: this.data.type
            },
            success: function(t) {
                wx.requestPayment({
                    timeStamp: t.data.data.wdata.timeStamp.toString(),
                    nonceStr: t.data.data.wdata.nonceStr,
                    package: t.data.data.wdata.package,
                    signType: "MD5",
                    paySign: t.data.data.wdata.sign,
                    success: function(t) {
                        console.log("success"), wx.navigateTo({
                            url: "/gc_school/pages/user/index"
                        });
                    },
                    fail: function(t) {
                        console.log("fail");
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});