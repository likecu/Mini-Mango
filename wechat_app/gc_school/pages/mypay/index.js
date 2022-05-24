function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, n = Array(t.length); a < t.length; a++) n[a] = t[a];
        return n;
    }
    return Array.from(t);
}

var a = getApp();

Page({
    data: {
        list: [],
        page: 1
    },
    onLoad: function(t) {
        this.getList();
    },
    detail: function(t) {
        wx.navigateTo({
            url: "/wx_tx/pages/detail/index?id=" + this.data.list[t.currentTarget.dataset.index].id
        });
    },
    getList: function() {
        var n = this;
        a.util.request({
            url: "entry/wxapp/MyFb",
            data: {
                page: this.data.page,
                openid: wx.getStorageSync("openid"),
                lon: wx.getStorageSync("city").location.lng,
                lat: wx.getStorageSync("city").location.lat
            },
            success: function(a) {
                if (1 == this.data.page) n.setData({
                    list: a.data.data.list
                }); else for (var e = 0; e < a.data.data.list.length; e++) n.setData({
                    list: [].concat(t(n.data.list), [ a.data.data.list[e] ])
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.getList();
    },
    onShareAppMessage: function() {}
});