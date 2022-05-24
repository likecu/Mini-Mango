require("../../../siteinfo").uniacid;

var e = getApp();

module.exports = {
    judge: function(t, a) {
        console.log("缓存用户信息", wx.getStorageSync("userinfo"));
        var t = !1;
        if (wx.getStorageSync("userinfo")) return e.util.request({
            url: "entry/wxapp/judgeIdentity",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(a) {
                if (console.log("身份", a.data.data), 1 != a.data.data) return t = !0;
                e.util.request({
                    url: "entry/wxapp/Sysparment",
                    success: function(e) {
                        console.log("配置返回值", e.data.data.sys), wx.requestSubscribeMessage({
                            tmplIds: [ e.data.data.sys.template_id, e.data.data.sys.cancel_template_id ],
                            success: function(e) {
                                console.log("已授权接收订阅消息");
                            },
                            complete: function() {}
                        });
                    }
                });
            }
        }), {
            status: t
        };
    }
};