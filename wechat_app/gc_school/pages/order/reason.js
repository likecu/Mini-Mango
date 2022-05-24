var t = getApp();

Page({
    data: {
        placeholder: "请在此填写理由"
    },
    onLoad: function(t) {
        console.log(t), this.setData({
            o_id: t.id,
            type: t.type
        }), 1 == t.type && this.setData({
            placeholder: "请填写申请取消订单的理由，并等待对方是否同意，如果对方1小时内未操作，系统将自动取消"
        });
    },
    getVal: function(t) {
        this.setData({
            input: t.detail.value.replace(/\s+/g, "")
        });
    },
    submit: function() {
        var o = this;
        this.data.input ? (t.util.request({
            url: "entry/wxapp/cancelGet",
            data: {
                o_id: o.data.o_id,
                type: o.data.type,
                reason: o.data.input,
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {
                0 == t.data.errno && (wx.showToast({
                    title: t.data.message
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "/gc_school/pages/order/detail?id=" + o.data.o_id
                    });
                }, 2e3));
            }
        }), console.log(this.data.input)) : wx.showToast({
            title: "请输入内容",
            icon: "none"
        });
    },
    cancel: function(t) {
        wx.showModal({
            title: "温馨提示",
            content: "如若取消抢单，订单将恢复到待接单状态，如需取消订单请在订单列表操作",
            success: function(t) {
                t.confirm ? (console.log("确认"), wx.navigateTo({
                    url: "/gc_school/pages/order/reason"
                })) : console.log("取消");
            }
        });
    },
    onReady: function() {},
    onShow: function(t) {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});