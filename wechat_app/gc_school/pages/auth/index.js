function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
    }
    return t;
}, e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../we7/resource/js/common.js")), s = getApp();

Page({
    data: {
        numList: [ {
            name: "实名认证",
            id: "1"
        }, {
            name: "学生认证",
            id: "2"
        }, {
            name: "绑定手机",
            id: "3"
        }, {
            name: "完成",
            id: "4"
        } ],
        num: 0,
        err: "",
        card_pic: [],
        sindex: "",
        t_pic: [],
        student_pic: [],
        ischeck: !0,
        imgList: [],
        imgList1: [],
        form: {},
        showsfzupload: !0,
        gender: [ {
            name: "男",
            id: "0"
        }, {
            name: "女",
            id: "1"
        } ],
        gender_index: 0,
        check: !0,
        is_show: 0
    },
    change: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.type, s = this.data.form;
        s[e] = t.detail.value, this.setData({
            form: a({}, s)
        });
    },
    agreelink: function() {
        wx.navigateTo({
            url: "/gc_school/pages/privacy/index"
        });
    },
    agree: function() {
        var t = this.data.changeSexs;
        this.setData({
            changeSexs: 0 == t
        });
    },
    openview: function(t) {
        console.log(t), wx.previewImage({
            current: t.currentTarget.dataset.url,
            urls: [ t.currentTarget.dataset.url ]
        });
    },
    bindSexChange: function(t) {
        console.log(t), this.setData({
            gender_index: t.detail.value,
            t_sex: t.detail.value
        });
    },
    numSteps: function() {
        if (this.setData({
            err: ""
        }), 0 == this.data.num) {
            if (!this.data.check) return s.util.message("请勾选协议", "", "error"), !1;
            if (!this.data.form.t_name || "" == this.data.form.t_name.replace(/\s+/g, "")) return s.util.message("请输入真实姓名", "", "error"), 
            this.setData({
                err: 0
            }), !1;
            if (!this.data.form.card_num || "" == this.data.form.card_num.replace(/\s+/g, "")) return s.util.message("请输入身份证号", "", "error"), 
            this.setData({
                err: 0
            }), !1;
            if (!e.default.IdentityIDCard(this.data.form.card_num).isPass) return s.util.message("身份证号有误", "", "error"), 
            this.setData({
                err: 0
            }), !1;
            if (console.log("打印", this.data.t_pic), (null == this.data.t_pic || 0 == this.data.t_pic.length) && 1 == this.data.is_show) return s.util.message("请上传本人照片", "", "error"), 
            this.setData({
                err: 0
            }), !1;
        }
        if (1 == this.data.num) {
            if (!this.data.form.college || "" == this.data.form.college.replace(/\s+/g, "")) return s.util.message("请输入院系", "", "error"), 
            this.setData({
                err: 1
            }), !1;
            if (!this.data.form.major || "" == this.data.form.major.replace(/\s+/g, "")) return s.util.message("请输入专业", "", "error"), 
            this.setData({
                err: 1
            }), !1;
            if (!this.data.form.student_num || "" == this.data.form.student_num.replace(/\s+/g, "")) return s.util.message("请输入学号", "", "error"), 
            this.setData({
                err: 1
            }), !1;
            if (console.log("学生证长度", this.data.student_pic), null == this.data.student_pic) return s.util.message("请上传学生证照片", "", "error"), 
            this.setData({
                err: 1
            }), !1;
        }
        var t = /^1[3456789]\d{9}$/;
        if (2 == this.data.num && !t.test(this.data.form.phone)) return s.util.message("手机格式有误", "", "error"), 
        this.setData({
            err: 2
        }), !1;
        this.setData({
            num: this.data.num == this.data.numList.length - 1 ? 0 : this.data.num + 1
        });
    },
    formSubmit: function(t) {
        console.log(t), console.log("表单", this.data.form), s.util.request({
            url: "entry/wxapp/RegisterRuner",
            data: a({}, this.data.form, {
                t_sex: this.data.t_sex,
                s_id: this.data.school[this.data.sindex].s_id,
                cg_getcard_end: this.data.cg_getcard_end,
                card_pic: JSON.stringify(this.data.card_pic),
                t_pic: JSON.stringify(this.data.t_pic),
                student_pic: JSON.stringify(this.data.student_pic),
                openid: wx.getStorageSync("openid")
            }),
            success: function(t) {
                wx.navigateBack({});
            }
        });
    },
    sexChange: function(t) {
        this.setData({
            form: a({}, this.data.form, {
                t_sex: t.detail.value
            })
        });
    },
    checkagree: function() {
        this.setData({
            check: !this.data.check
        });
    },
    checked: function(t) {
        this.setData({
            ischeck: t.detail.value
        });
    },
    PickerChange: function(t) {
        console.log(t), this.setData({
            sindex: t.detail.value
        });
    },
    DateChange: function(a) {
        this.setData(t({}, a.currentTarget.dataset.type, a.detail.value));
    },
    upload: function(a, e) {
        var i = this;
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        var path = 'images/' + currentdate + '/' + new Date().getTime() + Math.floor(Math.random() * 150) + '.png';

        wx.showLoading();
        // wx.uploadFile({
        //     url: s.util.url() + "c=entry&a=wxapp&do=ImgPost&m=gc_school",
        //     filePath: a.tempFilePaths[0],
        //     header: {
        //         "content-type": "application/x-www-form-urlencoded"
        //     },
        //     name: "file",
        //     success: function(s) {
        //         console.log(a);
        //         var n = s.data;
        //         n = JSON.parse(n).data, console.log(n), wx.hideLoading(), i.setData(t({}, e, [ n ])), 
        //         "t_pic" == e && i.setData({
        //             showsfzupload: !1
        //         });
        //     }
        // });

        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: path,
          // 指定要上传的文件的小程序临时文件路径
          filePath: a.tempFilePaths[0],
          config: {
            env: 'cloud-0ggabd9q9ceb4c32'
          }
        }).then(res1 => {
          wx.hideLoading(),
          i.setData(t({}, e, [ res1.fileID ]));
          "t_pic" == e && i.setData({
            showsfzupload: !1
        });
        }).catch((e) => {
          console.log("======上传失败======", result);
          wx.hideLoading();
        });
    },
    ChooseImage: function(t) {
        var a = this;
        console.log("1121212", t.currentTarget.dataset.type), wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album" ],
            success: function(e) {
                console.log("path", e), a.upload(e, t.currentTarget.dataset.type);
            }
        });
    },
    ViewImage: function(t) {
        wx.previewImage({
            urls: [ t.currentTarget.dataset.url ],
            current: t.currentTarget.dataset.url
        });
    },
    DelImg: function(a) {
        var e = this;
        wx.showModal({
            title: "删除图片",
            content: "确定要删除？",
            cancelText: "取消",
            confirmText: "确定",
            success: function(s) {
                if (s.confirm) {
                    var i;
                    e.data[a.currentTarget.dataset.type].splice(a.currentTarget.dataset.index, 1), e.setData((i = {}, 
                    t(i, a.currentTarget.dataset.type, e.data.imgList), t(i, "showsfzupload", !0), i));
                }
            }
        });
    },
    getData: function() {
        var t = this;
        s.util.request({
            url: "entry/wxapp/UserInfo",
            data: {
                openid: wx.getStorageSync("openid")
            },
            success: function(e) {
                t.setData({
                    form: a({}, e.data.data.info),
                    card_pic: JSON.parse(e.data.data.info.card_pic),
                    student_pic: JSON.parse(e.data.data.info.student_pic),
                    t_pic: "null" != e.data.data.info.t_pic ? JSON.parse(e.data.data.info.t_pic) : [],
                    gender_index: e.data.data.info.t_sex
                });
                for (var s = 0; s < t.data.school.length; s++) t.data.school[s].s_id == e.data.data.info.regschool_id && t.setData({
                    sindex: s
                });
                console.log("打印", t.data), null != t.data.card_pic && (console.log("不为空"), t.setData({
                    showsfzupload: !1
                }));
            }
        });
    },
    getSchool: function() {
        var t = this;
        s.util.request({
            url: "entry/wxapp/SchoolList",
            data: {
                openid: wx.getStorageSync("openid"),
                lon: wx.getStorageSync("city").location.lng,
                lat: wx.getStorageSync("city").location.lat
            },
            success: function(a) {
                t.setData({
                    school: a.data.data.list,
                    index: 0
                }), t.getData();
            }
        });
    },
    onLoad: function(t) {
        this.getSchool(), this.getconfig();
    },
    getconfig: function() {
        var t = this;
        s.util.request({
            url: "entry/wxapp/Sysparment",
            success: function(a) {
                console.log(a.data.data.sys), t.setData({
                    is_show: a.data.data.sys.is_run_show,
                    sysparment: a.data.data.sys
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});