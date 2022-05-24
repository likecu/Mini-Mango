var t = getApp();

Page({
    data: {
        cate: [],
        modal_show: !1,
        id: 0,
        type: 0
    },
    onLoad: function(t) {
        this.getCate();
    },
    getCate: function() {
        var a = this;
        t.util.request({
            url: "entry/wxapp/cate",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {
                console.log(t.data.data), a.setData({
                    cate: t.data.data
                });
            }
        });
    },
    add: function(t) {
        this.setData({
            type: t.currentTarget.dataset.type,
            modal_show: !0
        });
    },
    edit: function(a) {
        var e = this;
        console.log(a.currentTarget.dataset), this.setData({
            id: a.currentTarget.dataset.id,
            type: a.currentTarget.dataset.type
        }), t.util.request({
            url: "entry/wxapp/cateInfo",
            data: {
                id: a.currentTarget.dataset.id
            },
            success: function(t) {
                console.log(t.data.data), e.setData({
                    modal_show: !0,
                    name: t.data.data.name
                });
            }
        });
    },
    del: function(a) {
        var e = this;
        wx.showModal({
            title: "温馨提示",
            content: "确认删除该分类吗？",
            success: function(n) {
                n.confirm && t.util.request({
                    url: "entry/wxapp/catedel",
                    data: {
                        id: a.currentTarget.dataset.id
                    },
                    success: function(t) {
                        console.log(t.data.data), wx.showToast({
                            title: "删除成功"
                        }), setTimeout(function() {
                            e.getCate();
                        }, 1e3);
                    }
                });
            }
        });
    },
    submit: function() {
        var a = this;
        if (!a.data.name) return t.util.message("请输入名称", "", "error"), !1;
        t.util.request({
            url: "entry/wxapp/cateOperate",
            data: {
                id: a.data.id,
                name: a.data.name,
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {
                0 == t.data.errno && (wx.showToast({
                    title: "操作成功"
                }), a.setData({
                    modal_show: !1,
                    name: ""
                }), a.getCate()), console.log(t.data);
            }
        });
    },
    close: function() {
        this.setData({
            modal_show: !1,
            id: 0
        });
    },
    getName: function(t) {
        this.setData({
            name: t.detail.value.replace(/\s+/g, "")
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});