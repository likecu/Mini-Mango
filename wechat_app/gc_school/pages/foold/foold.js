function t(t, e, o) {
    return e in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t;
}

var e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
    }
    return t;
}, o = getApp(), a = void 0;

Page({
    data: {
        viewTo: "",
        viewToLeft: "",
        listHeight: 650,
        activeIndex: 0,
        tabIndex: 0,
        showModal: !1,
        showCart: !1,
        heigthArr: [],
        cart: [],
        result: [],
        totalMoney: 0,
        storeInfo: {
            storeId: 1,
            storeName: "竹林香米线",
            storeImgUrl: "/images/store.png",
            score: 4.4,
            saleMonth: 835,
            minDelPrice: 0,
            delPrice: 5,
            averagePrice: 15,
            delTime: 30,
            distance: 3.2,
            service: [ "支持自取" ],
            actives: [ {
                activeId: 1,
                acticeText: "满20减10；满200减20；满1000减50；满1000减50；满1000减50"
            }, {
                activeId: 2,
                acticeText: "本店新用户立减1元"
            }, {
                activeId: 3,
                acticeText: "折扣商品9折起"
            } ]
        },
        foodss: [ {
            titleId: "title1",
            title: "热销",
            foodCount: 0,
            items: [ {
                foodId: 1,
                name: "糖醋里脊",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: []
            }, {
                foodId: 2,
                name: "回锅肉",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: []
            }, {
                foodId: 3,
                name: "东坡肉",
                price: 23,
                monthNum: 34,
                note: "味道很好,欢迎品尝",
                zan: 34,
                count: 0,
                classify: [ {
                    describe: "大份",
                    price: 30
                }, {
                    describe: "中份",
                    price: 23
                }, {
                    describe: "小份",
                    price: 15
                } ]
            } ],
            status: 0
        }, {
            titleId: "title2",
            title: "大菜",
            foodCount: 0,
            items: [ {
                foodId: 4,
                name: "水煮牛肉",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: []
            }, {
                foodId: 5,
                name: "红烧肉",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: []
            }, {
                foodId: 6,
                name: "清蒸鱼",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: [ {
                    describe: "大份",
                    price: 30
                }, {
                    describe: "中份",
                    price: 23
                }, {
                    describe: "小份",
                    price: 15
                } ]
            } ]
        }, {
            titleId: "title3",
            title: "小菜",
            foodCount: 0,
            items: [ {
                foodId: 7,
                name: "鱼香肉丝",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: []
            }, {
                foodId: 8,
                name: "土豆丝",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: []
            }, {
                foodId: 9,
                name: "拍黄瓜",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: []
            } ]
        }, {
            titleId: "title4",
            title: "饮料",
            foodCount: 0,
            items: [ {
                foodId: 10,
                name: "可乐",
                price: 3,
                monthNum: 34,
                note: "",
                zan: 34,
                count: 0,
                classify: []
            }, {
                foodId: 11,
                name: "雪碧",
                price: 1,
                monthNum: 34,
                note: "",
                zan: 34,
                count: 0,
                classify: []
            }, {
                foodId: 12,
                name: "美年达",
                price: 3,
                monthNum: 34,
                note: "",
                zan: 34,
                count: 0,
                classify: []
            } ]
        }, {
            titleId: "title5",
            title: "主食",
            foodCount: 0,
            items: [ {
                foodId: 13,
                name: "馒头",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: []
            }, {
                foodId: 14,
                name: "米饭",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: []
            }, {
                foodId: 15,
                name: "煎饼",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: [ {
                    describe: "大份",
                    price: 30
                }, {
                    describe: "中份",
                    price: 23
                }, {
                    describe: "小份",
                    price: 15
                } ]
            } ]
        }, {
            titleId: "title6",
            title: "凉菜",
            foodCount: 0,
            items: [ {
                foodId: 16,
                name: "馒头",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: []
            }, {
                foodId: 17,
                name: "米饭",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: []
            }, {
                foodId: 18,
                name: "煎饼",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: [ {
                    describe: "大份",
                    price: 30
                }, {
                    describe: "中份",
                    price: 23
                }, {
                    describe: "小份",
                    price: 15
                } ]
            } ]
        }, {
            titleId: "title7",
            title: "凉拌菜",
            foodCount: 0,
            items: [ {
                foodId: 19,
                name: "馒头",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: []
            }, {
                foodId: 20,
                name: "米饭",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: []
            }, {
                foodId: 21,
                name: "煎饼",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: [ {
                    describe: "大份",
                    price: 30
                }, {
                    describe: "中份",
                    price: 23
                }, {
                    describe: "小份",
                    price: 15
                } ]
            } ]
        }, {
            titleId: "title8",
            title: "黄焖鸡",
            foodCount: 0,
            items: [ {
                foodId: 22,
                name: "馒头",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: []
            }, {
                foodId: 23,
                name: "米饭",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: []
            }, {
                foodId: 24,
                name: "煎饼",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: [ {
                    describe: "大份",
                    price: 30
                }, {
                    describe: "中份",
                    price: 23
                }, {
                    describe: "小份",
                    price: 15
                } ]
            } ]
        }, {
            titleId: "title9",
            title: "糕点",
            foodCount: 0,
            items: [ {
                foodId: 25,
                name: "馒头",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: []
            }, {
                foodId: 26,
                name: "米饭",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: []
            }, {
                foodId: 27,
                name: "煎饼",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: [ {
                    describe: "大份",
                    price: 30
                }, {
                    describe: "中份",
                    price: 23
                }, {
                    describe: "小份",
                    price: 15
                } ]
            } ]
        }, {
            titleId: "title10",
            title: "零食甜点",
            foodCount: 0,
            items: [ {
                foodId: 28,
                name: "馒头",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: []
            }, {
                foodId: 29,
                name: "米饭",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: []
            }, {
                foodId: 30,
                name: "煎饼",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: [ {
                    describe: "大份",
                    price: 30
                }, {
                    describe: "中份",
                    price: 23
                }, {
                    describe: "小份",
                    price: 15
                } ]
            } ]
        }, {
            titleId: "title11",
            title: "美丽的鲜花",
            foodCount: 0,
            items: [ {
                foodId: 31,
                name: "馒头",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: []
            }, {
                foodId: 32,
                name: "米饭",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: []
            }, {
                foodId: 33,
                name: "煎饼",
                price: 23,
                monthNum: 34,
                note: "狠辣",
                zan: 34,
                count: 0,
                classify: [ {
                    describe: "大份",
                    price: 30
                }, {
                    describe: "中份",
                    price: 23
                }, {
                    describe: "小份",
                    price: 15
                } ]
            } ]
        } ]
    },
    onLoad: function(t) {
        var e = this;
        console.log(e.data.foodss), wx.setStorageSync("store_id", t.id), o.util.request({
            url: "entry/wxapp/categoods",
            data: {
                store_id: t.id,
                type: 2
            },
            success: function(t) {
                console.log(t.data.data), e.setData({
                    food: t.data.data.data,
                    status: t.data.data.status
                });
            }
        });
    },
    preview: function(t) {
        var e = [];
        e.push(t.target.dataset.url);
        var o = t.target.dataset.url;
        wx.previewImage({
            current: o,
            urls: e
        });
    },
    onReady: function() {
        var t = wx.getSystemInfoSync().windowHeight, e = wx.createSelectorQuery();
        e.select(".cu-custom").boundingClientRect(), console.log("这里", e.select(".cu-custom").boundingClientRect()), 
        this.setData({
            listHeight: t - wx.getStorageSync("CustomBar")
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    selectFood: function(t) {
        console.log("ji", t.target), this.setData({
            activeIndex: t.target.dataset.index,
            viewTo: t.target.dataset.titleid
        });
    },
    calculateHeight: function() {
        var t = this, e = [], o = 0;
        e.push(o);
        var a = wx.createSelectorQuery();
        a.selectAll(".title-group").boundingClientRect(), a.exec(function(a) {
            for (var i = 0; i < a[0].length; i++) console.log(a[0][i]), o += parseInt(a[0][i].height), 
            e.push(o);
            t.setData({
                heigthArr: e
            });
        });
    },
    scroll: function(t) {
        var e = this;
        clearTimeout(a), a = setTimeout(function() {
            for (var o = t.detail.scrollTop, a = 0; a < e.data.heigthArr.length; a++) if (o >= e.data.heigthArr[a] && o < e.data.heigthArr[a + 1] && e.data.activeIndex != a) return e.setData({
                activeIndex: a
            }), void (a < 3 ? e.setData({
                viewToLeft: "title1left"
            }) : e.setData({
                viewToLeft: "title" + (a - 2) + "left"
            }));
        }, 100);
    },
    add: function(o) {
        var a, i = o.target.dataset.groupindex, n = o.target.dataset.index, s = "food[" + i + "].items[" + n + "].count", c = this.data.food[i].items[n].count, d = "food[" + i + "].foodCount", r = this.data.food[i].foodCount, u = this.data.food[i].items[n].foodId;
        c += 1, r += 1, this.setData((a = {}, t(a, s, c), t(a, d, r), a));
        var l = this.data.cart;
        console.log("购物车", l);
        for (var f = !1, m = {}, h = this.data.result, p = 0; p < l.length; p++) if (l[p].foodId == u) {
            f = !0;
            break;
        }
        f ? (l[p].count++, h[p].nums++) : (l.push(e({}, this.data.food[i].items[n], {
            groupindex: i,
            index: n
        })), m.ids = this.data.food[i].items[n].id, m.nums = this.data.food[i].items[n].count, 
        h.push(m));
        var I = this.data.totalMoney;
        I = (I = parseFloat(I) + parseFloat(this.data.food[i].items[n].price)).toFixed(2), 
        console.log("商品", l), console.log(h), this.setData({
            cart: l,
            totalMoney: I
        });
    },
    reduce: function(e) {
        var o, a = e.target.dataset.groupindex, i = e.target.dataset.index, n = this.data.result, s = "food[" + a + "].items[" + i + "].count", c = this.data.food[a].items[i].count, d = "food[" + a + "].foodCount", r = this.data.food[a].foodCount, u = this.data.food[a].items[i].foodId;
        c -= 1, r -= 1, this.setData((o = {}, t(o, s, c), t(o, d, r), o));
        for (var l = this.data.cart, f = 0; f < l.length; f++) if (l[f].foodId == u) {
            1 == l[f].count ? (l.splice(f, 1), n.splice(f, 1)) : (l[f].count--, n[f].nums--);
            break;
        }
        0 == l.length && this.setData({
            showCart: !this.data.showCart
        });
        var m = this.data.totalMoney;
        m = (m - this.data.food[a].items[i].price).toFixed(2), this.setData({
            cart: l,
            totalMoney: m
        }), console.log("减后", n);
    },
    check: function() {
        var t = this;
        wx.setStorageSync("json", t.data.result), wx.navigateBack({
            delta: 2
        }), console.log("结算商品", t.data.result);
    },
    listCart: function() {
        this.data.cart.length > 0 && this.setData({
            showCart: !this.data.showCart
        });
    },
    selectTabItem: function(t) {
        t.target.dataset.index && this.setData({
            tabIndex: t.target.dataset.index
        });
    },
    preventScrollSwiper: function() {
        return !1;
    },
    showStoreDetail: function() {
        this.setData({
            showModal: !0
        });
    },
    closeModal: function(t) {
        this.setData({
            showModal: !1
        });
    }
});