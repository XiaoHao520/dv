// zh_tcwq/pages/redbag/redbag.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  redinfo:function(e){
    console.log(e)
    var store_id = e.currentTarget.dataset.id
    var logo = e.currentTarget.dataset.logo
    wx:wx.navigateTo({
      url: 'redinfo/redinfo?store_id=' + store_id + '&logo=' + logo,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: wx.getStorageSync('color'),
      animation: {
        duration: 0,
        timingFunc: 'easeIn'
      }
    })
    var url = wx.getStorageSync('url')
    that.setData({
      url: url
    })
    that.reload()
  },
  reload:function(e){
    var that =this
    function trimLeft(s) {
      if (s == null) {
        return "";
      }
      var whitespace = new String(" \t\n\r");
      var str = new String(s);
      if (whitespace.indexOf(str.charAt(0)) != -1) {
        var j = 0, i = str.length;
        while (j < i && whitespace.indexOf(str.charAt(j)) != -1) {
          j++;
        }
        str = str.substring(j, i);
      }
      return str;
    }
    // 商家发的红包列表
    app.util.request({
      'url': 'entry/wxapp/RedPaperList',
      'cachetime': '0',
      success: function (res) {
        console.log(res)
        var store = res.data
        var price = 0
        var views = 0
        var givelike = 0
        for (let i in store) {
          views += Number(store[i].views)
          givelike += Number(store[i].hbfx_num)
          console.log(store[i].details)
          store[i].img = store[i].img.split(",")
          if (store[i].img.length >= 4) {
            store[i].img = store[i].img.splice(0, 4)
          } else {
            store[i].img = store[i].img
          }
          if (store[i].hb_random == 1) {
            store[i].hb_money = Number(store[i].hb_money)
          } else {
            store[i].hb_money = Number(store[i].hb_money) * Number(store[i].hb_num)
          }
          price += Number(store[i].hb_money)
          app.util.request({
            'url': 'entry/wxapp/HongList',
            'cachetime': '0',
            data: { id: store[i].id },
            success: function (res) {
              console.log(res)
              if (Number(store[i].hb_num) <= res.data.length) {
                store[i].rob = false
              } else {
                store[i].rob = true
              }
              console.log(store)
              that.setData({
                store: store,
                Congratulations:res.data,
                price: price.toFixed(2),
                views: views,
                givelike: givelike
              })
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
    var that = this
    that.reload()
    wx: wx.stopPullDownRefresh()
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