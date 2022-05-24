var t = getApp();

Page({
    data: {
        data: {
            today_count: 0,
            total_count: 0,
            total_sum: 0
        },
        id: ""
    },
    onLoad: function(t) {
        console.log(t), t.id && this.setData({
            id: t.id
        }), this.getStore();
    },
    getStore: function() {
        var a = this;
        t.util.request({
            url: "entry/wxapp/storeOrdertj",
            data: {
                id: this.data.id
            },
            success: function(t) {
                a.setData({
                    data: t.data.data
                });
            }
        });
    },
    jump: function(t) {
        console.log(t.currentTarget.dataset.url), t.currentTarget.dataset.url && wx.navigateTo({
            url: t.currentTarget.dataset.url
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});