var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../wxParse/wxParse.js")), n = getApp();

Page({
    data: {
        data: {}
    },
    onLoad: function(a) {
        var e = this;
        n.util.request({
            url: "entry/wxapp/Sysparment",
            success: function(n) {
                e.setData({
                    data: n.data.data.sys
                }), t.default.wxParse("fee_content", "html", e.data.data.privacy_settings, e, 0), 
                console.log(e.data.data.fee_content);
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});