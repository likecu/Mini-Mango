Page({
    data: {},
    onLoad: function(n) {
        console.log(n);
    },
    onReady: function() {},
    onShow: function() {},
    jump: function(n) {
        console.log(n.currentTarget.dataset.url), n.currentTarget.dataset.url && wx.navigateTo({
            url: n.currentTarget.dataset.url
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});