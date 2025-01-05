// index.ts
// 获取应用实例
const app = getApp<IAppOption>();
const defaultAvatarUrl =
  "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";

Component({
  data: {
    motto: "Hello World",
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: "",
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse("getUserProfile"),
    canIUseNicknameComp: wx.canIUse("input.type.nickname"),
    name: "",
    birthdate: "",
    gender: "",
    canSubmit: false,
    showPicker: false,
    yearList: [] as string[],
    monthList: [] as string[],
    dayList: [] as string[],
    hourList: [] as string[],
    minuteList: [] as string[],
    yearOffset: 0,
    monthOffset: 0,
    dayOffset: 0,
    hourOffset: 0,
    minuteOffset: 0,
    currentYear: 0,
    currentMonth: 0,
    currentDay: 0,
    currentHour: 0,
    currentMinute: 0,
    touchStartY: 0,
    lastOffset: 0,
    currentColumn: '',
  },
  lifetimes: {
    attached() {
      const lists = this.initDateLists();
      
      // 计算初始偏移量
      const yearIndex = lists.yearList.findIndex(y => parseInt(y) === this.data.currentYear);
      const monthIndex = this.data.currentMonth - 1;
      const dayIndex = this.data.currentDay - 1;
      const hourIndex = this.data.currentHour;
      const minuteIndex = this.data.currentMinute;
      
      this.setData({
        ...lists,
        yearOffset: -yearIndex * 88,
        monthOffset: -monthIndex * 88,
        dayOffset: -dayIndex * 88,
        hourOffset: -hourIndex * 88,
        minuteOffset: -minuteIndex * 88,
      });
    },
  },
  methods: {
    // 事件处理函数
    bindViewTap() {
      wx.navigateTo({
        url: "../logs/logs",
      });
    },
    onChooseAvatar(e: any) {
      const { avatarUrl } = e.detail;
      const { nickName } = this.data.userInfo;
      this.setData({
        "userInfo.avatarUrl": avatarUrl,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      });
    },
    onInputChange(e: any) {
      const nickName = e.detail.value;
      const { avatarUrl } = this.data.userInfo;
      this.setData({
        "userInfo.nickName": nickName,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      });
    },
    getUserProfile() {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: "展示用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res);
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          });
        },
      });
    },
    initDateLists() {
      const yearList: string[] = [];
      const monthList: string[] = [];
      const dayList: string[] = [];
      const hourList: string[] = [];
      const minuteList: string[] = [];
      
      const now = Date.now();
      const currentYear = new Date(now).getFullYear();
      
      // 生成年份列表（前后100年）
      for (let i = currentYear - 100; i <= currentYear + 100; i++) {
        yearList.push(i.toString().padStart(4, "0") + "年");
      }
      
      // 生成月份列表
      for (let i = 1; i <= 12; i++) {
        monthList.push(i.toString().padStart(2, "0") + "月");
      }
      
      // 生成日期列表
      const currentMonth = new Date(now).getMonth() + 1;
      const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        dayList.push(i.toString().padStart(2, "0") + "日");
      }
      
      // 生成小时列表
      for (let i = 0; i <= 23; i++) {
        hourList.push(i.toString().padStart(2, "0") + "时");
      }
      
      // 生成分钟列表
      for (let i = 0; i <= 59; i++) {
        minuteList.push(i.toString().padStart(2, "0") + "分");
      }
      
      return { yearList, monthList, dayList, hourList, minuteList };
    },
    preventBubble() {
      // 阻止冒泡
    },
    showDatePicker() {
      const now = Date.now();
      const date = new Date(now);
      
      // 计算偏移量，注意年份需要考虑起始年份的偏移
      const yearStartIndex = this.data.yearList.findIndex(y => parseInt(y) === date.getFullYear());
      const monthIndex = date.getMonth();
      const dayIndex = date.getDate() - 1;
      const hourIndex = date.getHours();
      const minuteIndex = date.getMinutes();
      
      this.setData({
        showPicker: true,
        currentYear: date.getFullYear(),
        currentMonth: date.getMonth() + 1,
        currentDay: date.getDate(),
        currentHour: date.getHours(),
        currentMinute: date.getMinutes(),
        yearOffset: -yearStartIndex * 88,
        monthOffset: -monthIndex * 88,
        dayOffset: -dayIndex * 88,
        hourOffset: -hourIndex * 88,
        minuteOffset: -minuteIndex * 88,
      });
    },
    onTouchStart(e: any) {
      const column = e.currentTarget.dataset.column;
      this.setData({
        touchStartY: e.touches[0].clientY,
        lastOffset: this.data[`${column}Offset`],
        currentColumn: column,
      });
    },
    onTouchMove(e: any) {
      const { touchStartY, lastOffset, currentColumn } = this.data;
      const moveY = e.touches[0].clientY - touchStartY;
      const newOffset = lastOffset + moveY;
      
      this.setData({
        [`${currentColumn}Offset`]: newOffset,
      });
    },
    onTouchEnd(e: any) {
      const { currentColumn, lastOffset } = this.data;
      const itemHeight = 88;
      const moveY = e.changedTouches[0].clientY - this.data.touchStartY;
      let offset = lastOffset + moveY;
      
      // 计算最接近的位置
      const roundOffset = Math.round(offset / itemHeight) * itemHeight;
      const maxOffset = 0;
      let minOffset = 0;
      let value = 0;
      
      // 根据不同列计算最小偏移和当前值
      switch (currentColumn) {
        case 'year':
          minOffset = -(this.data.yearList.length - 1) * itemHeight;
          offset = Math.max(Math.min(roundOffset, maxOffset), minOffset);
          value = parseInt(this.data.yearList[Math.abs(Math.round(offset / itemHeight))].replace('年', ''));
          break;
        case 'month':
          minOffset = -(this.data.monthList.length - 1) * itemHeight;
          offset = Math.max(Math.min(roundOffset, maxOffset), minOffset);
          value = Math.abs(Math.round(offset / itemHeight)) + 1;
          // 更新日期列表
          this.updateDayList(this.data.currentYear, value);
          break;
        case 'day':
          minOffset = -(this.data.dayList.length - 1) * itemHeight;
          offset = Math.max(Math.min(roundOffset, maxOffset), minOffset);
          value = Math.abs(Math.round(offset / itemHeight)) + 1;
          break;
        case 'hour':
          minOffset = -(this.data.hourList.length - 1) * itemHeight;
          offset = Math.max(Math.min(roundOffset, maxOffset), minOffset);
          value = Math.abs(Math.round(offset / itemHeight));
          break;
        case 'minute':
          minOffset = -(this.data.minuteList.length - 1) * itemHeight;
          offset = Math.max(Math.min(roundOffset, maxOffset), minOffset);
          value = Math.abs(Math.round(offset / itemHeight));
          break;
      }
      
      this.setData({
        [`${currentColumn}Offset`]: offset,
        [`current${currentColumn.charAt(0).toUpperCase() + currentColumn.slice(1)}`]: value
      });
    },
    
    updateDayList(year: number, month: number) {
      const daysInMonth = new Date(year, month, 0).getDate();
      const dayList: string[] = [];
      
      for (let i = 1; i <= daysInMonth; i++) {
        dayList.push(`${i.toString().padStart(2, "0")}日`);
      }
      
      // 如果当前选中的日期超过了新月份的最大天数，则调整为最后一天
      if (this.data.currentDay > daysInMonth) {
        this.setData({
          currentDay: daysInMonth,
          dayOffset: -(daysInMonth - 1) * 88
        });
      }
      
      this.setData({
        dayList
      });
    },
    onCloseClick() {
      this.setData({
        showPicker: false,
      });
    },
    onConfirmClick() {
      const { currentYear, currentMonth, currentDay, currentHour, currentMinute } = this.data;
      const birthdate = `${currentYear}年${currentMonth.toString().padStart(2, "0")}月${currentDay.toString().padStart(2, "0")}日 ${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;
      
      this.setData({
        birthdate,
        showPicker: false,
        canSubmit: !!(this.data.name && birthdate && this.data.gender),
      });
    },
    onNameInput(e: any) {
      const name = e.detail.value;
      this.setData({
        name,
        canSubmit: !!(name && this.data.birthdate && this.data.gender),
      });
    },
    onGenderSelect(e: any) {
      const gender = e.detail.value;
      this.setData({
        gender,
        canSubmit: !!(this.data.name && this.data.birthdate && gender),
      });
    },
    startEvaluation() {
      if (this.data.canSubmit) {
        wx.showToast({
          title: "开始测评",
          icon: "success",
        });
      }
    },
  },
});
