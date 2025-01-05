// pages/talent/talent.ts
type ImageKeys = 'wuxing' | 'bagua' | 'baofo' | 'yijing';

Page({

  /**
   * Page initial data
   */
  data: {
    images: {
      wuxing: '../../images/talent/wuxing.png',
      bagua: '../../images/talent/bagua.png',
      baofo: '../../images/talent/baofo.png',
      yijing: '../../images/talent/yijing.png'
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad() {
    // Page load logic if needed
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  },

  /**
   * Called when user tap on an image
   */
  onImageTap(e: WechatMiniprogram.TouchEvent) {
    const image = e.currentTarget.dataset.image as ImageKeys;
    wx.previewImage({
      current: this.data.images[image],
      urls: Object.values(this.data.images)
    });
  }
})