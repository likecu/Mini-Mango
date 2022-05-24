var t = getApp();

Page({
    data: {
        list: []
    },
    onLoad: function(o) {
        var n = this;
        wx.getStorageSync("schoolId");
        t.util.request({
            url: "entry/wxapp/store",
            data: {
                rest_id: o.id
            },
            success: function(t) {
                console.log("12121", t), 0 == t.data.errno && n.setData({
                    list: t.data.data
                });
            }
        });
    },
    onShow: function(t) {},
    bank_content: function(t) {
        console.log(t), 1 == t.currentTarget.dataset.click ? wx.navigateTo({
            url: "../foold/foold?id=" + t.currentTarget.dataset.id
        }) : wx.showToast({
            title: "该商家下暂无商品",
            icon: "none"
        });
    },
    onReady: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});