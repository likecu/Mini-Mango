var e = Object.assign || function(e) {
    for (var n = 1; n < arguments.length; n++) {
        var t = arguments[n];
        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
}, n = getApp();

Page({
    data: {
        openid: "",
        usernick: "",
        img: "",
        longitude: "",
        latitude: "",
        address: "",
        category: [ {
            id: "1",
            name: "服务中心"
        }, {
            id: "2",
            name: "飞手"
        }, {
            id: "3",
            name: "农场主"
        }, {
            id: "4",
            name: "合作社"
        }, {
            id: "5",
            name: "作业中介"
        }, {
            id: "6",
            name: "其它"
        } ],
        index: "",
        serverList: [],
        serverIndex: "",
        isWorker: !1
    },
    formSubmit: function(t) {
        console.log(t.detail.value), n.util.request({
            url: "entry/wxapp/OrderPost",
            data: e({}, t.detail.value),
            success: function(e) {
                wx.showToast({
                    title: "提交成功",
                    icon: "success",
                    duration: 2e3
                }), wx.redirectTo({
                    url: "/wx_tx/pages/mypublic/index"
                });
            }
        });
    },
    onLoad: function(e) {},
    onReady: function() {
        this.setData({
            openid: wx.getStorageSync("openid"),
            usernick: wx.getStorageSync("userinfo").nickName,
            img: wx.getStorageSync("userinfo").avatarUrl
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});