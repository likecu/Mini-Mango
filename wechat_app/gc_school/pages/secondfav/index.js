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
        tabid: 0,
        dataList: [],
        page: 1,
        loadmore: !0
    },
    onLoad: function(t) {
        this.getMylist();
    },
    getMylist: function() {
        var e = this;
        a.util.request({
            url: "entry/wxapp/myFav",
            data: {
                openid: wx.getStorageSync("openid"),
                page: e.data.page,
                type: 1,
                psize: 8
            },
            success: function(a) {
                if (a.data.data.length < 7 && e.setData({
                    loadmore: !1
                }), 1 == this.data.page) e.setData({
                    dataList: a.data.data
                }); else for (var n = 0; n < a.data.data.length; n++) e.setData({
                    dataList: [].concat(t(e.data.dataList), [ a.data.data[n] ])
                });
            }
        });
    },
    cancelFav: function(t) {
        var e = this;
        console.log(t.currentTarget.dataset.id), wx.showModal({
            title: "提示",
            content: "确认取消收藏吗？",
            success: function(n) {
                n.confirm && a.util.request({
                    url: "entry/wxapp/goodsFav",
                    data: {
                        id: t.currentTarget.dataset.id,
                        openid: wx.getStorageSync("openid"),
                        type: 1
                    },
                    success: function(t) {
                        e.setData({
                            page: 1,
                            loadmore: !0
                        }), e.getMylist();
                    }
                });
            }
        });
    },
    toDetail: function(t) {
        wx.navigateTo({
            url: "/gc_school/pages/secondhand/detail?id=" + t.currentTarget.dataset.id
        });
    },
    changeTab: function(t) {
        this.setData({
            tabid: t.currentTarget.dataset.id
        }), this.getlist();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.setData({
            page: this.data.page + 1
        }), this.data.loadmore && this.getMylist();
    }
});