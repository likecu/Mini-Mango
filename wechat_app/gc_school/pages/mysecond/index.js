var t = getApp();

Page({
    data: {
        tab: [ {
            name: "正在交易",
            id: 0
        }, {
            name: "已经购买",
            id: 1
        }, {
            name: "已经卖出",
            id: 2
        }, {
            name: "取消订单",
            id: 3
        } ],
        tabid: 0,
        dataList: []
    },
    onLoad: function(t) {
        this.getMylist();
    },
    getMylist: function() {
        var n = this;
        t.util.request({
            url: "entry/wxapp/mySecond",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {
                n.setData({
                    dataList: t.data.data
                });
            }
        });
    },
    delorder: function(n) {
        var e = this;
        console.log(n.currentTarget.dataset.id), wx.showModal({
            title: "提示",
            content: "确认删除吗？",
            success: function(a) {
                a.confirm && t.util.request({
                    url: "entry/wxapp/delMyGoods",
                    data: {
                        id: n.currentTarget.dataset.id
                    },
                    success: function(t) {
                        e.getMylist();
                    }
                });
            }
        });
    },
    toDetail: function(t) {
        wx.navigateTo({
            url: "/gc_school/pages/seconddetail/index?id=" + t.currentTarget.dataset.id
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
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});