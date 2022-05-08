Component({
  properties: {
    group: Object,
  },

  methods: {
    onClick(event) {
      console.log("当前点击为：",event.target);
      const { url } = event.target.dataset;
      if (getCurrentPages().length > 9) {
        wx.redirectTo({ url });
      } else {
        wx.navigateTo({ url });
      }
    },
    onClick1() {
      wx.showModal({
        title: '提示',
        content: "该功能正在努力开发中",
        confirmText: '确定',
        showCancel: false,
      })
    },
    onClick2() {
      wx.showModal({
        title: '提示',
        content: "以后将会在这里显示关于身份卡的更多信息",
        confirmText: '确定',
        showCancel: false,
      })
    },
  },
});
