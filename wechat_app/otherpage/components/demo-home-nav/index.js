Component({
  properties: {
    group: Object,
  },

  methods: {
    onClick(event) {
      const { url } = event.target.dataset;
      if (getCurrentPages().length > 9) {
        wx.redirectTo({ url });
      } else {
        wx.navigateTo({ url });
      }
    },
    onClick1(event) {
      wx.showModal({
        title: '提示',
        content: "该功能正在努力开发中",
        confirmText: '确定',
        showCancel: false,
      })
    },
  },
});
