// pages/story/story.ts
Page({
  data: {
    counselorList: [
      {
        id: 1,
        name: '李晓明',
        tag: '高级咨询师',
        title: '咨询师',
        image: '/images/story/people@1x.png',
        field: '心理学与咨询',
        description: '拥有心理学硕士学位，专注于天赋与个性心理学领域多年。他通过系统的培训和实践经验，熟练掌握了八卦和玄学等古老智慧的解读方法，能够准确分析用户的天赋潜能和个性特征。不仅具备丰富的理论知识，还善于与来访者沟通，帮助他们深入理解自己的特质。'
      },
      {
        id: 2,
        name: '冯世华',
        tag: '高级咨询师',
        title: '咨询师',
        image: '/images/story/people@1x.png',
        field: '心理学与咨询',
        description: '拥有心理学硕士学位，专注于天赋与个性心理学领域多年。他通过系统的培训和实践经验，熟练掌握了八卦和玄学等古老智慧的解读方法，能够准确分析用户的天赋潜能和个性特征。不仅具备丰富的理论知识，还善于与来访者沟通，帮助他们深入理解自己的特质。'
      },
      {
        id: 3,
        name: '胡文',
        tag: '高级咨询师',
        title: '咨询师',
        image: '/images/story/people@1x.png',
        field: '心理学与咨询',
        description: '拥有心理学硕士学位，专注于天赋与个性心理学领域多年。他通过系统的培训和实践经验，熟练掌握了八卦和玄学等古老智慧的解读方法，能够准确分析用户的天赋潜能和个性特征。不仅具备丰富的理论知识，还善于与来访者沟通，帮助他们深入理解自己的特质。'
      }
    ],
    currentIndex: 0,
    showIntro: true,
    currentCounselor: null as any
  },

  onLoad() {
    // Initialize with the first counselor
    this.setData({
      currentCounselor: this.data.counselorList[0]
    });
  },

  onScroll(e: any) {
    const { scrollLeft } = e.detail;
    const itemWidth = 320; // 240rpx + 80rpx margin (40rpx on each side)
    const index = Math.round(scrollLeft / itemWidth);
    const adjustedIndex = index % this.data.counselorList.length;
    
    if (this.data.currentIndex !== adjustedIndex) {
      this.setData({
        currentIndex: adjustedIndex,
        showIntro: false
      }, () => {
        setTimeout(() => {
          this.setData({
            currentCounselor: this.data.counselorList[adjustedIndex],
            showIntro: true
          });
        }, 300);
      });
    }
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

  }
})