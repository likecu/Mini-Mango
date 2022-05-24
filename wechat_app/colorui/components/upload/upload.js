Component({
    properties: {
        count: {
            type: Number,
            value: 3,
            observers: function(e, t) {}
        },
        images: {
            type: Array,
            value: []
        },
        addedCount: {
            type: Number,
            value: 0,
            observers: function(e, t) {
                console.log("--new--".newVal, "--old--", t);
            }
        },
        currentIndex: {
            type: Number,
            value: 0
        }
    },
    data: {},
    methods: {
        chooseImage: function() {
            this.triggerEvent("chooseImage");
        },
        previewImage: function(e) {
            wx.previewImage({
                urls: this.data.images,
                current: this.data.images[e.currentTarget.dataset.index]
            });
        },
        deleteImage: function(e) {
            this.triggerEvent("deleteImage", e.currentTarget.dataset.index);
        }
    }
});