// pages/intoUs/intoUs.ts
Page({

  /**
   * Page initial data
   */
  data: {
    teamMembers: [
      {
        name: '夏德-卿',
        title: '天赋分析',
        image: '/miniprogram/images/intoUs/people1.png'
      },
      {
        name: '姚达',
        title: '天赋分析',
        image: '/miniprogram/images/intoUs/people2.png'
      },
      {
        name: '刘青-凯',
        title: '天赋分析',
        image: '/miniprogram/images/intoUs/people3.png'
      }
    ],
    processSteps: [
      { name: '信息收集' },
      { name: '专业评估' },
      { name: '专家建议' }
    ]
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
    return {
      title: '走进我们',
      path: '/pages/intoUs/intoUs'
    }
  },

  onShareTimeline() {
    return {
      title: '走进我们'
    }
  }
})