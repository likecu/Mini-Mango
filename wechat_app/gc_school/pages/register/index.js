function t(t, e, a) {
  return e in t ? Object.defineProperty(t, e, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = a, t;
}

var e = Object.assign || function (t) {
    for (var e = 1; e < arguments.length; e++) {
      var a = arguments[e];
      for (var s in a) Object.prototype.hasOwnProperty.call(a, s) && (t[s] = a[s]);
    }
    return t;
  },
  a = (function (t) {
    t && t.__esModule;
  }(require("../../../we7/resource/js/common.js")), getApp());

Page({
  data: {
    numList: [{
      name: "第一步",
      id: "1"
    }, {
      name: "第二步",
      id: "2"
    }, {
      name: "第三步",
      id: "3"
    }, {
      name: "完成",
      id: "4"
    }],
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
    gender: [{
      name: "男",
      id: "0"
    }, {
      name: "女",
      id: "1"
    }],
    gender_index: 0,
    check: !1,
    is_show: 0,
    code: ""
  },
  change: function (t) {
    console.log(t);
    var a = t.currentTarget.dataset.type,
      s = this.data.form;
    s[a] = t.detail.value, this.setData({
      form: e({}, s)
    });
  },
  agreelink: function () {
    wx.navigateTo({
      url: "/gc_school/pages/privacy/index"
    });
  },
  agree: function () {
    var t = this.data.changeSexs;
    this.setData({
      changeSexs: 0 == t
    });
  },
  getPhoneNumber: function (t) {
    var s = this;
    wx.login({
      success: function (n) {
        a.util.request({
          url: "entry/wxapp/getPhone",
          data: {
            code: n.code,
            iv: t.detail.iv,
            encryptedData: t.detail.encryptedData
          },
          success: function (t) {
            console.log(t), s.setData({
              form: e({}, s.data.form, {
                phone: t.data.data
              })
            });
          }
        });
      }
    });
  },
  openview: function (t) {
    console.log(t), wx.previewImage({
      current: t.currentTarget.dataset.url,
      urls: [t.currentTarget.dataset.url]
    });
  },
  bindSexChange: function (t) {
    console.log(t), this.setData({
      gender_index: t.detail.value,
      t_sex: t.detail.value
    });
  },
  numSteps: function () {
    if (this.setData({
        err: ""
      }), 0 == this.data.num) {
      if (!this.data.check) return a.util.message("请勾选协议", "", "error"), !1;
      if (!this.data.form.t_name || "" == this.data.form.t_name.replace(/\s+/g, "")) return a.util.message("请输入姓名", "", "error"),
        this.setData({
          err: 0
        }), !1;
      console.log("打印", this.data.t_pic);
    }
    if (1 == this.data.num) {
      if (!this.data.form.college || "" == this.data.form.college.replace(/\s+/g, "")) return a.util.message("请输入院系", "", "error"),
        this.setData({
          err: 1
        }), !1;
      if (!this.data.form.major || "" == this.data.form.major.replace(/\s+/g, "")) return a.util.message("请输入专业", "", "error"),
        this.setData({
          err: 1
        }), !1;
      if (!this.data.form.student_num || "" == this.data.form.student_num.replace(/\s+/g, "")) return a.util.message("请输入学号", "", "error"),
        this.setData({
          err: 1
        }), !1;
      if (null == this.data.student_pic) return a.util.message("请上传证明", "", "error"),
        this.setData({
          err: 1
        }), !1;
    }
    var t = /^1[3456789]\d{9}$/;
    if (2 == this.data.num && !t.test(this.data.form.phone)) return a.util.message("手机格式有误", "", "error"),
      this.setData({
        err: 2
      }), !1;
    this.setData({
      num: this.data.num == this.data.numList.length - 1 ? 0 : this.data.num + 1
    });
  },
  formSubmit: function (t) {
    return console.log(t), this.data.check ? t.detail.value.t_name ? (console.log("表单", this.data.form),
      console.log(this.data.sindex), void a.util.request({
        url: "entry/wxapp/RegisterRuner",
        data: e({}, this.data.form, {
          t_sex: this.data.t_sex,
          s_id: this.data.school[this.data.sindex].s_id,
          openid: wx.getStorageSync("openid")
        }),
        success: function (t) {
          wx.navigateBack({});
        }
      })) : (a.util.message("请输入姓名", "", "error"), !1) : (a.util.message("请先勾选协议", "", "error"),
      !1);
  },
  sexChange: function (t) {
    this.setData({
      form: e({}, this.data.form, {
        t_sex: t.detail.value
      })
    });
  },
  checkagree: function () {
    this.setData({
      check: !this.data.check
    });
  },
  checked: function (t) {
    this.setData({
      ischeck: t.detail.value
    });
  },
  PickerChange: function (t) {
    console.log(t), this.setData({
      sindex: t.detail.value
    });
  },
  DateChange: function (e) {
    this.setData(t({}, e.currentTarget.dataset.type, e.detail.value));
  },
  upload: function (e, s) {
    var n = this;
    wx.showLoading();
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    var path = 'images/' + currentdate + '/' + new Date().getTime() + Math.floor(Math.random() * 150) + '.png';

    wx.cloud.uploadFile({
      cloudPath: path,
      filePath: e.tempFilePaths[0],
      config: {
        env: 'cloud-0ggabd9q9ceb4c32'
      }
    }).then(res1 => {
      var o = res1.fileID;
      console.log(o), wx.hideLoading(), n.setData(t({}, s, [o])),
        "t_pic" == s && n.setData({
          showsfzupload: !1
        });
    }).catch((e) => {
      console.log("======上传失败======", result);
      wx.hideLoading();
    });

    // wx.uploadFile({
    //   url: a.util.url() + "c=entry&a=wxapp&do=ImgPost&m=gc_school",
    //   filePath: e.tempFilePaths[0],
    //   header: {
    //     "content-type": "application/x-www-form-urlencoded"
    //   },
    //   name: "file",
    //   success: function (a) {
    //     console.log(e);
    //     var o = a.data;
    //     o = JSON.parse(o).data, console.log(o), wx.hideLoading(), n.setData(t({}, s, [o])),
    //       "t_pic" == s && n.setData({
    //         showsfzupload: !1
    //       });
    //   }
    // });
  },
  ChooseImage: function (t) {
    var e = this;
    console.log("1121212", t.currentTarget.dataset.type), wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album"],
      success: function (a) {
        console.log("path", a), e.upload(a, t.currentTarget.dataset.type);
      }
    });
  },
  ViewImage: function (t) {
    wx.previewImage({
      urls: [t.currentTarget.dataset.url],
      current: t.currentTarget.dataset.url
    });
  },
  DelImg: function (e) {
    var a = this;
    wx.showModal({
      title: "删除图片",
      content: "确定要删除？",
      cancelText: "取消",
      confirmText: "确定",
      success: function (s) {
        if (s.confirm) {
          var n;
          a.data[e.currentTarget.dataset.type].splice(e.currentTarget.dataset.index, 1), a.setData((n = {},
            t(n, e.currentTarget.dataset.type, a.data.imgList), t(n, "showsfzupload", !0), n));
        }
      }
    });
  },
  getData: function () {
    var t = this;
    a.util.request({
      url: "entry/wxapp/UserInfo",
      data: {
        openid: wx.getStorageSync("openid")
      },
      success: function (a) {
        t.setData({
          form: e({}, a.data.data.info),
          gender_index: a.data.data.info.t_sex
        });
        for (var s = 0; s < t.data.school.length; s++) t.data.school[s].s_id == a.data.data.info.regschool_id && t.setData({
          sindex: s
        });
        console.log("打印", t.data), null != t.data.card_pic && (console.log("不为空"), t.setData({
          showsfzupload: !1
        }));
      }
    });
  },
  getSchool: function () {
    var t = this;
    a.util.request({
      url: "entry/wxapp/SchoolList",
      data: {
        openid: wx.getStorageSync("openid")
      },
      success: function (e) {
        t.setData({
          school: e.data.data.list,
          index: 0
        }), t.getData();
      }
    });
  },
  onLoad: function (t) {
    var e = this;
    this.getSchool(), this.getconfig(), wx.login({
      success: function (t) {
        e.setData({
          code: t.code
        });
      }
    });
  },
  getconfig: function () {
    var t = this;
    a.util.request({
      url: "entry/wxapp/Sysparment",
      success: function (e) {
        console.log(e.data.data.sys), t.setData({
          is_show: e.data.data.sys.is_run_show,
          sysparment: e.data.data.sys
        });
      }
    });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {}
});