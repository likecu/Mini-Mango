function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, o = Array(t.length); a < t.length; a++) o[a] = t[a];
        return o;
    }
    return Array.from(t);
}

var a = getApp();

Page({
    data: {
        tab_index: 0,
        page: 1,
        is_loadmore: [ !0, !0, !0 ],
        goods: []
    },
    onLoad: function(t) {
        this.getGoods();
    },
    getGoods: function() {
        var o = this;
        a.util.request({
            url: "entry/wxapp/storegoods",
            data: {
                openid: wx.getStorageSync("openid"),
                page: this.data.page,
                type: this.data.tab_index
            },
            success: function(a) {
                if (console.log(a.data.data), console.log("长度", a.data.data.length), a.data.data.length < 5) {
                    var e = o.data.is_loadmore;
                    e[o.data.tab_index] = !1, console.log("loadmore", e), o.setData({
                        is_loadmore: e
                    });
                }
                var n = [].concat(t(o.data.goods), t(a.data.data));
                o.setData({
                    goods: n
                });
            }
        });
    },
    changeTab: function(t) {
        console.log(t.currentTarget.dataset), this.setData({
            tab_index: t.currentTarget.dataset.index,
            page: 1,
            goods: [],
            is_loadmore: [ !0, !0, !0 ]
        }), this.getGoods();
    },
    jump: function(t) {
        console.log(t.currentTarget.dataset.url), wx.navigateTo({
            url: t.currentTarget.dataset.url
        });
    },
    changeStatus: function(t) {
        var o = this;
        console.log(t.currentTarget.dataset), wx.showModal({
            title: "温馨提示",
            content: "确定执行该操作吗？",
            success: function(e) {
                e.confirm ? (a.util.request({
                    url: "entry/wxapp/goodsChangeStatus",
                    data: {
                        id: t.currentTarget.dataset.id,
                        status: t.currentTarget.dataset.status,
                        openid: wx.getStorageSync("openid")
                    },
                    success: function(t) {
                        o.setData({
                            page: 1,
                            goods: [],
                            is_loadmore: [ !0, !0, !0 ]
                        }), o.getGoods();
                    }
                }), console.log("用户点了确认")) : console.log("用户点了取消");
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        if (this.data.is_loadmore[this.data.tab_index]) {
            var t = this.data.page + 1;
            this.setData({
                page: t
            }), console.log("页码", this.data.page), this.getGoods();
        }
    }
});