// zh_tcwq/pages/sellerinfo/good_info.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    index: 0,
    tabs2: ["商品信息", "商品推荐"],
    select_spec:false,
    spec_index_one:0,
    spec_index:0,
    spec_index_two:0,
    money_one:0,
    money_two:0,
    money_three:0,
    num:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var id = options.id
    var store_id = options.store_id
    var url = wx.getStorageSync('url')
    this.setData({
      id: id,
      url: url,
      store_id: store_id
    })
    this.refresh()
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: wx.getStorageSync('color'),
      animation: {
        duration: 0,
        timingFunc: 'easeIn'
      }
    })
  },
  refresh: function (e) {
    var that = this
    var id = that.data.id
    app.util.request({
      'url': 'entry/wxapp/GoodInfo',
      'cachetime': '0',
      data: { id: id },
      success: function (res) {
        console.log(res)
        res.data.good.imgs = res.data.good.imgs.split(",")
        res.data.good.lb_imgs = res.data.good.lb_imgs.split(",")
        if(res.data.spec.length==0){
          var result = []

          that.setData({
            goods_cost: res.data.good.goods_cost,
            store_good: res.data.good,
            result: result,
          })
        }else{
          var spec = res.data.spec
          var jmap = {};
          var result = [];
          spec.forEach(function (al) {
            var key = al.spec_id + '_' + al.spec_name;
            if (typeof jmap[key] === 'undefined') {
              jmap[key] = [];
            }
            jmap[key].push(al);
          })

          var keys = Object.keys(jmap);
          for (var i = 0; i < keys.length; i++) {
            var rs = keys[i].split('_');
            result.push({ spec_id: rs[0], spec_name: rs[1], value: jmap[keys[i]] });
          }
          console.log(result)
          var goods_cost = Number(res.data.good.goods_cost)
          var price = 0
          if (result.length == 1) {
            var money1 = Number(result[0].value[0].money)
            var money2 = 0
            var money3 = 0
            that.setData({
              money1: money1,
              money2: money2,
              money3: money3
            })
          } else if (result.length == 2) {
            var money1 = Number(result[0].value[0].money)
            var money2 = Number(result[1].value[0].money)
            var money3 = 0
            that.setData({
              money1: money1,
              money2: money2,
              money3: money3
            })
          } else if (result.length == 3) {
            var money1 = Number(result[0].value[0].money)
            var money2 = Number(result[1].value[0].money)
            var money3 = Number(result[2].value[0].money)
            that.setData({
              money1: money1,
              money2: money2,
              money3: money3
            })
          }
          price = money1 + money2 + money3
          console.log(price)
          var goods_cost1 = (goods_cost + price).toFixed(2)
          console.log(goods_cost1)
          that.setData({
            result: result,
            goods_cost: goods_cost1 ,
            price: goods_cost,
            store_good: res.data.good,
          })
        }
       
      },
    })
  },
  add: function (e) {
    wx: wx.switchTab({
      url: '../logs/logs',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // ---------规格选择
  liji:function(e){
    this.setData({
      select_spec:true
    })
  },
  // 添加商品数量
  add_num: function (e) {
    var that = this  
    var num = that.data.num + 1
    var good_num = that.data.store_good.goods_num
    if (num < good_num){
      that.setData({
        num: num,
      })
    }else{
      that.setData({
        num: good_num,
      })
    }
    
  },
  // 减去商品数量
  subtraction: function (e) {
    var that = this
    var num = that.data.num
    num = num - 1
    if(num>1){
      that.setData({
        num: num,
      })
    }else{
      that.setData({
        num: 1,
      })
    }
    
  },
  // 商家详情和评论切换时间
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  
  order:function(e){
    var that = this
    var result = that.data.result
    var store_good = that.data.store_good
    var store_id = that.data.store_id
    var price = that.data.goods_cost
    var num = that.data.num
    console.log(store_id)
    if(result.length==0){
      wx: wx.redirectTo({
        url: 'place_order?id=' + store_good.id + '&store_id=' + store_id + '&price=' + price + '&num=' + num ,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else{
      if (result.length == 1) {
        var name1 = result[0].value[that.data.spec_index].name
        var name2 = 0
        var name3 = 0
      } else if (result.length == 2) {
        var name1 = result[0].value[that.data.spec_index].name
        var name2 = result[1].value[that.data.spec_index_one].name
        var name3 = 0
      } else if (result.length == 3) {
        var name1 = result[0].value[that.data.spec_index].name
        var name2 = result[1].value[that.data.spec_index_one].name
        var name3 = result[2].value[that.data.spec_index_two].name
      }
      wx: wx.redirectTo({
        url: 'place_order?id=' + store_good.id + '&store_id=' + store_id + '&price=' + price + '&num=' + num + '&name1=' + name1 + '&name2=' + name2 + '&name3=' + name3,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    
  },
  // 选择商品规格
  select_spec:function(e){
    var select_spec = this.data.select_spec
    if (select_spec==false){
      this.setData({
        select_spec:true
      })
    }else{
      this.setData({
        select_spec: false
      })
    }
  },
  spec_index:function(e){
    var price = this.data.price
    var index = e.currentTarget.dataset.index
    var money = Number(e.currentTarget.dataset.price)
    var goods_cost = price + this.data.money2 + this.data.money3 + money
    this.setData({
      spec_index:index,
      money1: Number(money),
      goods_cost: goods_cost.toFixed(2)
    })
  },
  spec_index_one: function (e) {
    console.log(e)
    var price = this.data.price
    var index = e.currentTarget.dataset.index
    var money = Number(e.currentTarget.dataset.price)
    var goods_cost = price + this.data.money1 + this.data.money3 + money
    this.setData({
      spec_index_one: index,
      money2: Number(money),
      goods_cost: goods_cost.toFixed(2)
    })
  },
  spec_index_two: function (e) {
    console.log(e)
    var price = this.data.price
    var index = e.currentTarget.dataset.index
    var money = Number(e.currentTarget.dataset.price)
    var goods_cost = price + this.data.money2 + this.data.money1 + money
    this.setData({
      spec_index_two: index,
      money3: money,
      goods_cost: goods_cost.toFixed(2)
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