// zh_tcwq/pages/merchant/merchant.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: wx.getStorageSync('color'),
      animation: {
        duration: 0,
        timingFunc: 'easeIn'
      }
    })
    var money = wx.getStorageSync('users').money
    if (money == null) {
      var money = 0
    }
    var url = wx.getStorageSync('url')
    that.setData({
      url: url
    })
    var formatDate = function (date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
    };
    app.util.request({
      'url': 'entry/wxapp/StoreInfo',
      'cachetime': '0',
      data: { id: options.id },
      success: function (res) {
        console.log(res)
        that.setData({
          seller:res.data.store[0]
        })
        that.refresh()
      
      },
    })
    // app.util.request({
    //   'url': 'entry/wxapp/MyStore',
    //   'cachetime': '0',
    //   data: { user_id: user_id },
    //   success: function (res) {
    //     console.log(res)
    //     res.data.sh_time = app.ormatDate(res.data.sh_time)
    //     res.data.dq_time = app.ormatDate(res.data.dq_time).slice(0,10)
    //     var seller = res.data
    //     console.log(seller)
    //     if (res.data == false) {
    //       wx: wx.showModal({
    //         title: '提示',
    //         content: '您还没有入驻，入驻之后再来吧',
    //         showCancel: true,
    //         cancelText: '我不要',
    //         cancelColor: '',
    //         confirmText: '马上入驻',
    //         confirmColor: '',
    //         success: function (res) {
    //           if (res.confirm) {
    //             wx: wx.navigateTo({
    //               url: '../settled/settled',
    //               success: function (res) { },
    //               fail: function (res) { },
    //               complete: function (res) { },
    //             })
    //           } else if (res.cancel) {
    //             wx: wx.switchTab({
    //               url: '../logs/logs',
    //               success: function (res) { },
    //               fail: function (res) { },
    //               complete: function (res) { },
    //             })
    //           }
    //         },
    //         fail: function (res) { },
    //         complete: function (res) { },
    //       })
    //     } else {
    //       if (res.data.time_over == 1) {
    //         wx: wx.showModal({
    //           title: '提示',
    //           content: '您的入驻已到期',
    //           showCancel: true,
    //           cancelText: '取消',
    //           cancelColor: '',
    //           confirmText: '确定',
    //           confirmColor: '',
    //           success: function (res) {
    //             if (res.confirm) {
    //               wx: wx.navigateTo({
    //                 url: '../logs/index',
    //                 success: function (res) { },
    //                 fail: function (res) { },
    //                 complete: function (res) { },
    //               })
    //             } else if (res.cancel) {
    //               wx: wx.switchTab({
    //                 url: '../logs/logs',
    //                 success: function (res) { },
    //                 fail: function (res) { },
    //                 complete: function (res) { },
    //               })
    //             }
    //           },
    //           fail: function (res) { },
    //           complete: function (res) { },
    //         })
    //       } else {
    //         app.util.request({
    //           'url': 'entry/wxapp/InMoney',
    //           'cachetime': '0',
    //           success: res => {
    //             console.log(res);
    //             var stick = res.data
    //             var type = seller.type
    //             if(type ==1){
    //               var date2 = 24 * 60 * 60 * 1000*7
    //             }else if(type==2){
    //               var date2 = 24 * 60 * 60 * 1000 * 30
    //             }else if(type==3){
    //               var date2 = 24 * 60 * 60 * 1000 * 365
    //             }
    //             // date2 = new Date(date2)
    //             for(let i in stick){
    //               if (stick[i].type==type){
    //                 var date1 = new Date(seller.sh_time)
    //                 // console.log(stick[i])
    //                 // var date = new Date(date1.getTime() + date2.getTime())
    //                 var date = new Date(date1.getTime() + date2);
    //                 // console.log(date1)
    //                 console.log(formatDate(date))
    //               }
    //             }
    //             that.setData({
    //               stick: stick,
    //             })
    //           }
    //         })
    //         that.setData({
    //           seller: res.data
    //         })
    //         that.refresh()
    //       }
    //     }
    //   }
    // })
  },
  refresh: function (e) {
    var that = this
    console.log(that.data.seller)
    function getNowFormatDate() {
      var date = new Date();
      var seperator1 = "/";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
      return currentdate;
    }
    var time = getNowFormatDate().slice(0, 10)
    var store_id = that.data.seller.id
    app.util.request({
      'url': 'entry/wxapp/StoreWallet',
      'cachetime': '0',
      data: {
        store_id: store_id
      },
      success: function (res) {
        console.log(res)
        var day1 = new Date();
        day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
        var s1 = day1.getFullYear() + "/" + (day1.getMonth() + 1) + "/" + day1.getDate()
        if (res.data.length != 0) {
          var store_money = res.data
          var profit = 0
          var yestoday = []
          var today = []
          for (let i in store_money) {
            profit += Number(store_money[i].money)
            store_money[i].time = store_money[i].time.slice(0, 10).replace(/-/g, "/")
            if (s1 == store_money[i].time) {
              console.log('有昨天的订单')
              yestoday.push(store_money[i])
            }
            if (time == store_money[i].time) {
              console.log('有今天的订单')
              console.log(store_money[i])
              today.push(store_money[i])
            }
          }
          var yes_profit = 0
          for (let i in yestoday) {
            yes_profit += Number(yestoday[i].money)
          }
          var toady_profit = 0
          for (let i in today) {
            toady_profit += Number(today[i].money)
          }
          app.util.request({
            'url': 'entry/wxapp/StoreTiXian',
            'cachetime': '0',
            data: {
              store_id: store_id
            },
            success: function (res) {
              var order = res.data
              var tixian = 0
              for (let i in order) {
                tixian += Number(order[i].tx_cost)
              }
              that.setData({
                tixian: tixian.toFixed(2)
              })
              that.setData({
                profit: (profit-tixian).toFixed(2),
                yes_profit: yes_profit,
                toady_profit: toady_profit
              })
            }
          })
          
        } else {
          that.setData({
            profit: 0,
            yes_profit: 0,
            toady_profit: 0
          })
        }

      }
    })
    app.util.request({
      'url': 'entry/wxapp/StoreOrder',
      'cachetime': '0',
      data: {
        store_id: store_id
      },
      success: function (res) {
        console.log(res)
        var order = res.data
        var order_num = []
        for (let i in order) {
          order[i].time = app.ormatDate(order[i].time).slice(0, 10)
          order[i].time = order[i].time.replace(/-/g, "/")
          if (time == order[i].time) {
            order_num.push(order[i])
          }
        }
        that.setData({
          order_num: order_num.length
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 我的店铺
  more: function (e) {
    console.log(e)
    var store_id = this.data.seller.id
    wx: wx.navigateTo({
      url: '../sellerinfo/sellerinfo?id=' + store_id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  cash: function (e) {
    wx: wx.navigateTo({
      url: '../logs/cash?&state=' + 2 + '&store_id=' + this.data.seller.id + '&profit=' + this.data.profit,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // ---------------------代发货----------------
  activeIndex_one: function (e) {
    wx: wx.navigateTo({
      url: 'mine_order?activeIndex=' + 1 + '&store_id=' + this.data.seller.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // ---------------------待收货----------------
  activeIndex_two: function (e) {
    wx: wx.navigateTo({
      url: 'mine_order?activeIndex=' + 0 + '&store_id=' + this.data.seller.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // ---------------------已完成----------------
  activeIndex_three: function (e) {
    wx: wx.navigateTo({
      url: 'mine_order?activeIndex=' + 3 + '&store_id=' + this.data.seller.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // ---------------------售后----------------
  activeIndex_four: function (e) {
    wx: wx.navigateTo({
      url: 'mine_order?activeIndex=' + 4 + '&store_id=' + this.data.seller.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  fuck: function (e) {
    wx: wx.navigateTo({
      url: '../logs/publish?store_id=' + this.data.seller.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // ——————————————
  customer: function (e) {
    wx: wx.navigateTo({
      url: 'customer/customer?user_id=' + this.data.seller.id,
    })
  },
  welfare: function (e) {
    wx: wx.navigateTo({
      url: 'welfare?user_id=' + this.data.seller.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  sent: function (e) {
    wx: wx.navigateTo({
      url: 'sent?user_id=' + this.data.seller.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  mechat: function (e) {
    wx: wx.navigateTo({
      url: '../logs/index?user_id=' + this.data.seller.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  mine_shop: function (e) {
    wx: wx.navigateTo({
      url: 'commodity?store_id=' + this.data.seller.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  interests: function (e) {
    wx: wx.showModal({
      title: '提示',
      content: '此功能暂未开放',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '',
      confirmText: '确定',
      confirmColor: '',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  vip: function (e) {
    wx: wx.showModal({
      title: '提示',
      content: '此功能暂未开放',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '',
      confirmText: '确定',
      confirmColor: '',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  tuichu:function(e){
    wx.removeStorage({
      key: 'store_info',
      success: function (res) {
        wx.showToast({
          title: '退出登陆',
        })
        setTimeout(function(){
          wx:wx.navigateBack({
            delta: 1,
          })
        },2000)
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.onLoad()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})