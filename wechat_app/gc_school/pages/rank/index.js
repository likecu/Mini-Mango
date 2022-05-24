function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

var a = getApp();

Page({
    data: {
        page: 1,
        showNodata: !1,
        erranderId: 2,
        address: {
            available: []
        },
        my: []
    },
    onLoad: function(t) {
        console.log(wx.getStorageSync("openid")), this.getData();
    },
    getData: function() {
        var e = this;
        a.util.request({
            url: "entry/wxapp/RankList",
            data: {
                page: this.data.page,
                s_id: wx.getStorageSync("schoolId"),
                openid: wx.getStorageSync("openid")
            },
            success: function(a) {
                if (console.log("1111", a.data.data.my), 1 == this.data.page) e.setData({
                    list: a.data.data.list,
                    my: a.data.data.my
                }); else for (var n = 0; n < a.data.data.list.length; n++) e.setData({
                    list: [].concat(t(e.data.list), [ a.data.data.list[n] ])
                });
            }
        });
    },
    handleGet: function(t) {
        var e = this;
        a.util.request({
            url: "entry/wxapp/CouponGet",
            data: {
                co_id: t.currentTarget.dataset.id,
                openid: wx.getStorageSync("openid"),
                lon: wx.getStorageSync("city").location.lng,
                lat: wx.getStorageSync("city").location.lat
            },
            success: function(t) {
                e.getData();
            }
        });
    },
    handleUser: function(t) {
        var a = getCurrentPages();
        "gc_school/pages/public/index" == a[a.length - 2].route ? wx.navigateBack({
            cupon: t.currentTarget.dataset.id
        }) : wx.navigateBack();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.setData({
            page: this.data.page + 1
        }), this.getData();
    },
    onShareAppMessage: function() {}
});