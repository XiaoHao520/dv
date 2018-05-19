var city = require('../../utils/city.js');
var app = getApp()
Page({
  data: {
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    tHeight: 0,
    bHeight: 0,
    startPageY: 0,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0,
    city: "",
    activeIndex: 'A',
    index: 'A',
    result: [],
    hot_city: [
      {
        'name': '热门城市',
        'city': [
          {
            "name": "北京",
            "key": "热门"
          },
          {
            "name": "上海",
            "key": "热门"
          },
          {
            "name": "广州",
            "key": "热门"
          },
          {
            "name": "深圳",
            "key": "热门"
          },
          {
            "name": "成都",
            "key": "热门"
          },
          {
            "name": "重庆",
            "key": "热门"
          },
          {
            "name": "天津",
            "key": "热门"
          },
          {
            "name": "杭州",
            "key": "热门"
          },
          {
            "name": "南京",
            "key": "热门"
          },
          {
            "name": "苏州",
            "key": "热门"
          },
          {
            "name": "武汉",
            "key": "热门"
          },
          {
            "name": "西安",
            "key": "热门"
          }
        ]
      }
    ]
  },
  onLoad: function (options) {
    var that = this
    console.log(wx.getStorageSync('users').id)
    // 生命周期函数--监听页面加载


    app.util.request({
      'url': 'entry/wxapp/GetCity',
      'cachetime': '0',
      data: { user_id: wx.getStorageSync('users').id },
      success: function (res) {
        console.log(res)
        for (let i in res.data) {
          res.data[i].cityname = res.data[i].cityname.substr(0, res.data[i].cityname.length-1)
        }
        that.setData({
          search_ji: res.data
        })
        if (res.data.length != 0) {
          wx.getSystemInfo({
            success: function (res) {
              that.setData({
                windowHeight: res.windowHeight - 136,
                search_top:146
              })
            }
          })
        } else {
          wx.getSystemInfo({
            success: function (res) {
              that.setData({
                windowHeight: res.windowHeight - 70,
                search_top: 80
              })
            }
          })
        }
      },
    })
    var searchLetter = city.searchLetter;
    var cityList = city.City[0];
    console.log(cityList)
    var citys = []
    for (let i in cityList) {
      citys[i] = cityList[i][0].city
    }
    console.log(citys)
    var search = []
    for (let i in citys) {
      for (let j in citys[i]) {
        search.push(citys[i][j])
      }
    }
    console.log(search)
    var sz = []
    search.map(function (item) {
      var arr = {}
      arr = item.name
      sz.push(arr)
    })
    console.log(sz)
    that.setData({
      citys: cityList,
      sz: sz
    })
  },
  refresh: function (e) {
    var that = this
    var value = that.data.value
    var sz = that.data.sz
    if (value != '') {
      var result = sz.filter(item => item.indexOf(value) >= 0)
    } else {
      var result = []
    }
    that.setData({
      result: result
    })
  },
  selectMenu: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.itemIndex;
    this.setData({
      toView: index,
      index: index,
      activeIndex: index
    })
  },
  select_city: function (e) {
    var that = this
    var city = e.currentTarget.dataset.city + '市';
    wx.setStorageSync('city', city);
    //---------------------------------- 传入最新城市----------------------------------
    app.util.request({
      'url': 'entry/wxapp/SaveHotCity',
      'cachetime': '0',
      data: { cityname: city, user_id: wx.getStorageSync('users').id },
      success: function (res) {
        console.log(res)
      },
    })
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]
    var prevPage = pages[pages.length - 2]
    prevPage.setData({
      city: city,
      page: 1,
      seller: [],
    })
    prevPage.reload()
    prevPage.refresh()
    prevPage.seller()
    wx.setStorageSync('city_type', 1)
    wx: wx.navigateBack({
      url: 'index',
    })
  },
  select_citys: function (e) {
    var that = this
    var city = e.currentTarget.dataset.city + '市';
    wx.setStorageSync('city', city);
    //---------------------------------- 传入最新城市----------------------------------
    app.util.request({
      'url': 'entry/wxapp/SaveHotCity',
      'cachetime': '0',
      data: { cityname: city, user_id: wx.getStorageSync('users').id },
      success: function (res) {
        console.log(res)
      },
    })
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]
    var prevPage = pages[pages.length - 2]
    prevPage.setData({
      city: city,
      page: 1,
      seller: [],
    })
    prevPage.reload()
    prevPage.refresh()
    prevPage.seller()
    wx.setStorageSync('city_type', 1)
    wx: wx.navigateBack({
      url: 'index',
    })
  },
  search: function (e) {
    console.log(e)
    var value = e.detail.value
    // var city = value + '市'
    // wx.setStorageSync('city', city)
    // wx.setStorageSync('city_type', 1)
    this.setData({
      value: value
    })
    this.refresh()
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
      


  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
  
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})