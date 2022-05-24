var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../wxParse/wxParse.js")), n = getApp();

Page({
    data: {
        data: {}
    },
    onLoad: function(e) {
        var a = this;
        n.util.request({
            url: "entry/wxapp/Sysparment",
            success: function(n) {
                a.setData({
                    data: n.data.data.sys
                }), t.default.wxParse("fee_content", "html", a.data.data.fee_content, a, 0), console.log(a.data.data.fee_content);
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