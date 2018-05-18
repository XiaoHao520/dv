// pages/tongcheng/tongcheng.js
var app = getApp();
var Data = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    currentTab: 0,
    swiperCurrent: 0,
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    averdr: false,
    hotels: false,
    refresh_top: false,
    scroll_top: true,
    index_class: false,
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  swiperChange1: function (e) {
    this.setData({
      swiperCurrent1: e.detail.current
    })
  },
  jumps: function (e) {
    var that = this
    var name = e.currentTarget.dataset.name
    var appid = e.currentTarget.dataset.appid
    var src = e.currentTarget.dataset.src
    var ggid = e.currentTarget.dataset.id
    console.log(ggid)
    var type = e.currentTarget.dataset.type
    if (type == 1) {
      var s1 = src.replace(/[^0-9]/ig, "");
      src = src.replace(/(\d+|\s+)/g, "");
      src = src
      console.log(src)
      console.log(s1)
      console.log()
      wx: wx.navigateTo({
        url: src + Number(s1),
        success: function (res) {
          that.setData({
            averdr: true
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (type == 2) {
      wx: wx.navigateTo({
        url: '../car/car?vr=' + ggid,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (type == 3) {
      wx.navigateToMiniProgram({
        appId: appid,
        path: '',
        extraData: {
          foo: 'bar'
        },
        // envVersion: 'develop',
        success(res) {
          // 打开成功
          that.setData({
            averdr: true
          })
        }
      })
    }
  },
  city_select: function (e) {
    wx: wx.navigateTo({
      url: 'city',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  delete: function (e) {
    this.setData({
      averdr: true
    })
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })

  },
  seller: function (e) {
    wx: wx.navigateTo({
      url: '../sellerinfo/sellerinfo',
    })
  },
  settled: function (e) {
    wx: wx.navigateTo({
      url: '../settled/settled',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    })
    //---------------------------------- 异步保存上传图片需要的网址----------------------------------
    app.util.request({
      'url': 'entry/wxapp/Url2',
      'cachetime': '0',
      success: function (res) {
        wx.setStorageSync('url2', res.data)
      },
    })


    //---------------------------------- 获取帖子总浏览量----------------------------------


    //---------------------------------- 获取网址----------------------------------
    app.util.request({
      'url': 'entry/wxapp/Url',
      'cachetime': '0',
      success: function (res) {
        // ---------------------------------- 异步保存网址前缀----------------------------------
        wx.setStorageSync('url', res.data)
        that.setData({
          url: res.data
        })
      },
    })


    that.reload()
  },
  reload: function (e) {
    var that = this
    // ----------------------------------获取用户登录信息----------------------------------
    wx.login({
      success: function (res) {
        console.log("***************")
        var code = res.code
        wx.setStorageSync("code", code)
        wx.getUserInfo({
          success: function (res) {

            console.log("888888888888888888888888888888")
            console.log(res)
            wx.setStorageSync("user_info", res.userInfo)
            var nickName = res.userInfo.nickName
            var avatarUrl = res.userInfo.avatarUrl
            app.util.request({
              'url': 'entry/wxapp/openid',
              'cachetime': '0',
              data: { code: code },
              success: function (res) {
                console.log(res)
                wx.setStorageSync("key", res.data.session_key)
                wx.setStorageSync("openid", res.data.openid)
                var openid = res.data.openid
                app.util.request({
                  'url': 'entry/wxapp/Login',
                  'cachetime': '0',
                  data: { openid: openid, img: avatarUrl, name: nickName },
                  success: function (res) {
                    console.log(res)
                    wx.setStorageSync('users', res.data)
                    wx.setStorageSync('uniacid', res.data.uniacid)
                  },
                })
              },
            })
          },
          fail: function (res) {
            console.log("****************************************")
            console.log(res);
            wx.getSetting({
              success: (res) => {
                var authSetting = res.authSetting
                if (authSetting['scope.userInfo'] == false) {
                  wx.openSetting({
                    success: function success(res) {
                    }
                  });
                }
              }
            })
          }
        })
      }
    })
    //---------------------------------- 获取用户的地理位置----------------------------------
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        wx.setStorageSync('Location', res)
        let latitude = res.latitude
        let longitude = res.longitude
        let op = latitude + ',' + longitude;
        app.util.request({
          'url': 'entry/wxapp/map',
          'cachetime': '0',
          data: { op: op },
          success: res => {
            console.log(res)
            that.setData({
              dwcity: res.data.result.address_component.city
            })
            app.util.request({
              'url': 'entry/wxapp/System',
              'cachetime': '0',
              success: function (res) {
                console.log(res)
                wx.setStorageSync('System', res.data)
                // 是否开启多城市
                if (res.data.many_city == 1) {
                  wx.setStorageSync('city', res.data.cityname)
                  that.setData({
                    city: res.data.cityname
                  })
                }
                 else {
                  console.log(wx.getStorageSync('city_type'))
                  if (wx.getStorageSync('city_type')!= 1){
                  wx.setStorageSync('city', that.data.dwcity)
                  that.setData({
                    city: that.data.dwcity
                  })
                  }
                  else{
                    that.setData({
                      city: wx.getStorageSync('city')
                    })
                    console.log('choosecity')
                  }
                }
                var city = wx.getStorageSync('city')
                console.log(city)
                app.util.request({
                  'url': 'entry/wxapp/SaveHotCity',
                  'cachetime': '0',
                  data: { cityname: city, user_id: wx.getStorageSync('users').id },
                  success: function (res) {
                    console.log(res)
                  },
                })
                //---------------------------------- 传入最新城市----------------------------------
                // if (res.data.result.ad_info.city != null) {

                // }





                // var city_type = wx.getStorageSync('city_type')
                // if (city_type == 1) {
                //   if (res.data.many_city == 1) {
                //     that.setData({
                //       city: wx.getStorageSync('city')
                //     })
                //   } else {
                //     that.setData({
                //       city: wx.getStorageSync('city')
                //     })
                //   }

                // } else {
                //   wx.setStorageSync('city', res.data.cityname)
                //   that.setData({
                //     city: res.data.cityname
                //   })
                // }
                wx.setNavigationBarTitle({
                  title: res.data.pt_name
                })
                wx.setStorageSync('color', res.data.color),
                  wx.setNavigationBarColor({
                    frontColor: 'black',
                    backgroundColor: wx.getStorageSync('color'),
                    animation: {
                      duration: 0,
                      timingFunc: 'easeIn'
                    }
                  })
                var city = wx.getStorageSync('city')
                that.setData({
                  System: res.data
                })
                that.refresh()
                that.seller()
              },
            })
             //wx.setStorageSync('city', res.data.result.address_component.city)
            //---------------------------------- 获取平台信息----------------------------------

            var gd_key = wx.getStorageSync('System').gd_key
            if (gd_key == '') {
              wx: wx.showModal({
                title: '配置提示',
                content: '请在后台配置高德地图的key',
                showCancel: true,
                cancelText: '取消',
                confirmText: '确定',
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
            }
            var amapFile = require('../amap-wx.js')
            var myAmapFun = new amapFile.AMapWX({ key: gd_key });
            myAmapFun.getWeather({
              success: function (data) {
                function getMyDay(date) {
                  var week;
                  if (date.getDay() == 0) week = "星期日"
                  if (date.getDay() == 1) week = "星期一"
                  if (date.getDay() == 2) week = "星期二"
                  if (date.getDay() == 3) week = "星期三"
                  if (date.getDay() == 4) week = "星期四"
                  if (date.getDay() == 5) week = "星期五"
                  if (date.getDay() == 6) week = "星期六"
                  return week;
                }
                var city = data.liveData.city
                var weather = data.liveData.weather
                var reporttime = data.liveData.reporttime.slice(0, 10)
                var w1 = getMyDay(new Date(reporttime))
                var temperature = data.temperature.data
                that.setData({
                  area: city,
                  reporttime: reporttime,
                  weather: weather,
                  w1: w1,
                  temperature: temperature
                })
                //成功回调
              },
              fail: function (info) {
                //失败回调
              }
            })
          }
        })
      },
      fail: function (res) {
        wx.getSetting({
          success: (res) => {
            var authSetting = res.authSetting
            if (authSetting['scope.userLocation'] == false) {
              wx.openSetting({
                success: function success(res) {
                }
              });
            }
          }
        })
      }
    })

    //---------------------------------- 获取浏览量----------------------------------
    app.util.request({
      'url': 'entry/wxapp/Views',
      'cachetime': '0',
      success: function (res) {
        var views = res.data
        if (views = '') {
          views = 0
        } else {
          views = res.data
        }
        that.setData({
          views: views
        })
      },
    })
    //---------------------------------- 获取帖子数量----------------------------------
    app.util.request({
      'url': 'entry/wxapp/Num',
      'cachetime': '0',
      success: function (res) {
        that.setData({
          Num: res.data
        })
      },
    })

  },
  refresh: function (e) {
    var that = this
    var city = wx.getStorageSync('city')

    //---------------------------------- 获取最新入驻----------------------------------
    app.util.request({
      'url': 'entry/wxapp/Storelist',
      'cachetime': '0',
      data: { cityname: city },
      success: function (res) {
        if (res.data.length <= 5) {
          that.setData({
            store: res.data
          })
        } else {
          that.setData({
            store: res.data.slice(0, 6)
          })
        }

      },
    })
    // -----------------------------------轮播图和公告--------------------------------
    app.util.request({
      'url': 'entry/wxapp/Ad',
      'cachetime': '0',
      data: { cityname: city },
      success: function (res) {
        console.log(res)
        var slide = []
        var advert = []
        var ggslide=[]
        for (let i in res.data) {
          if (res.data[i].type == 1) {
            slide.push(res.data[i])
          }
          if (res.data[i].type == 5) {
            advert.push(res.data[i])
          }
          if (res.data[i].type == 7) {
            ggslide.push(res.data[i])
          }
        }
        that.setData({
          slide: slide,
          advert: advert,
          ggslide: ggslide,
        })
      },
    })
    //---------------------------------- 首页公告----------------------------------
    app.util.request({
      'url': 'entry/wxapp/news',
      'cachetime': '0',
      data: { cityname: city },
      success: function (res) {
        var msgList = []
        var msgList1 = []
        for (let i in res.data) {
          if (res.data[i].type == 1) {
            msgList.push(res.data[i])
          }
        }
        that.setData({
          msgList: msgList
        })
      },
    })
    app.util.request({
      'url': 'entry/wxapp/type',
      'cachetime': '0',
      success: function (res) {
        // ----------------------------------获取分类的集合----------------------------------
        var navs = res.data

        // ----------------------------------高度随分类的数量去改变----------------------------------
        if (navs.length <= 5) {
          that.setData({
            height: 140
          })
        } else if (navs.length > 5) {
          that.setData({
            height: 280
          })
        }
        // ----------------------------------把分类以10个位一组分隔开----------------------------------
        var nav = []
        for (var i = 0, len = navs.length; i < len; i += 10) {
          nav.push(navs.slice(i, i + 10))
        }
        that.setData({
          nav: nav,
          navs: navs
        })
      },
    })

  },
  // -----------------------------------帖子信息--------------------------------
  seller: function (e) {
    var that = this
    var index_class = that.data.index_class
    var city = wx.getStorageSync('city')
    var index = wx.getStorageSync('index')
    var page = that.data.page
    var seller = that.data.seller
    console.log(city)
    function getLocalTime(nS) {
      return new Date(parseInt(nS) * 1000)
    }
    // 判断用户点击的是全部还是分类
    if (index_class == true) {
      if (page == null || page == '') {
        page = 1
      }
      if (seller == null || seller == '') {
        seller = []
      }
      var type_id = that.data.navs[index].id
      app.util.request({
        'url': 'entry/wxapp/list2',
        'cachetime': '0',
        data: { type_id: type_id, page: that.data.page, cityname: city },
        success: function (res) {
          console.log(res.data)
          if (res.data.length == 0) {
            that.setData({
              refresh_top: true
            })
          } else {
            that.setData({
              refresh_top: false,
              page: page + 1
            })
            seller = seller.concat(res.data)
            function unrepeat(arr) {
              var newarr = [];
              for (var i = 0; i < arr.length; i++) {
                if (newarr.indexOf(arr[i]) == -1) {
                  newarr.push(arr[i]);
                }
              }
              return newarr;
            }
            seller = unrepeat(seller)
          }
          if (res.data.length > 0) {
            for (let i in res.data) {
              var time1 = app.ormatDate(res.data[i].tz.sh_time);
              res.data[i].tz.img = res.data[i].tz.img.split(",")
              if (res.data[i].tz.img.length > 4) {
                res.data[i].tz.img_length = Number(res.data[i].tz.img.length) - 4
              }
              if (res.data[i].tz.img.length >= 4) {
                res.data[i].tz.img1 = res.data[i].tz.img.slice(0, 4)
              } else {
                res.data[i].tz.img1 = res.data[i].tz.img
              }
              res.data[i].tz.time = time1.slice(0, 16)

            }
            function rgb() {
              var r = Math.floor(Math.random() * 255);
              var g = Math.floor(Math.random() * 255);
              var b = Math.floor(Math.random() * 255);
              var rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
              return rgb;
            }
            for (let i in seller) {
              for (let j in seller[i].label) {
                seller[i].label[j].number = rgb()
              }

              that.setData({
                seller: seller
              })
            }
          } else {
            that.setData({
              seller: seller
            })
          }


        },
      })
    } else {
      if (page == null) {
        page = 1
      }
      if (seller == null) {
        seller = []
      }
      app.util.request({
        'url': 'entry/wxapp/list2',
        'cachetime': '0',
        data: { page: that.data.page, cityname: city },
        success: function (res) {
          console.log(res.data)
          if (res.data.length == 0) {
            that.setData({
              refresh_top: true
            })
          } else {
            that.setData({
              refresh_top: false,
              page: page + 1
            })
            seller = seller.concat(res.data)
            function unrepeat(arr) {
              var newarr = [];
              for (var i = 0; i < arr.length; i++) {
                if (newarr.indexOf(arr[i]) == -1) {
                  newarr.push(arr[i]);
                }
              }
              return newarr;
            }
            seller = unrepeat(seller)
          }
          if (res.data.length > 0) {
            for (let i in res.data) {
              var time1 = app.ormatDate(res.data[i].tz.sh_time);
              res.data[i].tz.img = res.data[i].tz.img.split(",")
              if (res.data[i].tz.img.length > 4) {
                res.data[i].tz.img_length = Number(res.data[i].tz.img.length) - 4
              }
              if (res.data[i].tz.img.length >= 4) {
                res.data[i].tz.img1 = res.data[i].tz.img.slice(0, 4)
              } else {
                res.data[i].tz.img1 = res.data[i].tz.img
              }
              res.data[i].tz.time = time1.slice(0, 16)

            }
            function rgb() {
              var r = Math.floor(Math.random() * 255);
              var g = Math.floor(Math.random() * 255);
              var b = Math.floor(Math.random() * 255);
              var rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
              return rgb;
            }
            for (let i in seller) {
              for (let j in seller[i].label) {
                seller[i].label[j].number = rgb()
              }

              that.setData({
                seller: seller
              })
            }
          } else {
            that.setData({
              seller: seller
            })
          }


        },
      })
    }



  },
  commend: function (e) {
    var that = this
    var activeIndex = e.currentTarget.id
    function getLocalTime(nS) {
      return new Date(parseInt(nS) * 1000)
    }
    var index = e.currentTarget.dataset.index
    wx.setStorageSync("index", index)
    that.setData({
      page: '',
      seller: '',
      index: index,
      index_class: true,
      activeIndex: activeIndex
    })
    that.seller()

  },
  // 选择全部
  whole: function (e) {
    wx.removeStorage({
      key: 'index',
      success: function (res) {
      }
    })
    this.setData({
      page: 1,
      seller: [],
      index_class: false
    })
    this.seller()
  },
  bindinput: function (e) {
    var that = this
    var value = e.detail.value
    if (value != '') {
      app.util.request({
        'url': 'entry/wxapp/list2',
        'cachetime': '0',
        data: { keywords: value },
        success: function (res) {
          if (res.data.length == 0) {
            wx: wx.showModal({
              title: '提示',
              content: '没有这个帖子',
              showCancel: true,
              cancelText: '取消',
              confirmText: '确定',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          } else {
            wx: wx.navigateTo({
              url: "../infodetial/infodetial?id=" + res.data[0].tz.id,
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          }

        }
      })
    }

  },
  // -----------------------------时间戳转换日期时分秒--------------------------------
  ormatDate: function (dateNum) {
    var date = new Date(dateNum * 1000);
    return date.getFullYear() + "-" + fixZero(date.getMonth() + 1, 2) + "-" + fixZero(date.getDate(), 2) + " " + fixZero(date.getHours(), 2) + ":" + fixZero(date.getMinutes(), 2) + ":" + fixZero(date.getSeconds(), 2);
    function fixZero(num, length) {
      var str = "" + num;
      var len = str.length;
      var s = "";
      for (var i = length; i-- > len;) {
        s += "0";
      }
      return s + str;
    }
  },
  // -----------------------------------------------点赞-----------------------------------------------
  thumbs_up: function (e) {
    var that = this
    var seller = that.data.seller
    var post_info_id = e.currentTarget.dataset.id
    var user_id = wx.getStorageSync('users').id
    var thumbs_up = Number(e.currentTarget.dataset.num)
    for (let i in seller) {
      if (seller[i].tz.id == post_info_id) {
        seller[i].thumbs_up = true
        app.util.request({
          'url': 'entry/wxapp/Like',
          'cachetime': '0',
          data: { information_id: post_info_id, user_id: user_id },
          success: function (res) {
            if (res.data != 1) {
              wx: wx.showModal({
                title: '提示',
                content: '不能重复点赞',
                showCancel: true,
                cancelText: '取消',
                confirmText: '确认',
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
            } else {
              seller[i].tz.givelike = Number(seller[i].tz.givelike) + 1
              that.setData({
                seller: seller,
              })

            }
          },
        })
      }
    }


  },
  // ---------------------------获取需要预览的帖子id--------------------------
  // previewimg: function (e) {
  //   var seller_id = e.currentTarget.dataset.id
  //   this.setData({
  //     seller_id: seller_id
  //   })
  // },
  // --------------------------------------------图片预览
  previewImage: function (e) {
    console.log(e)
    var seller_id = e.currentTarget.dataset.id
    // this.setData({
    //   seller_id: seller_id
    // })
    var that = this
    var url = that.data.url
    var urls = []
    var inde = e.currentTarget.dataset.inde
    var seller = that.data.seller
    // var seller_id = that.data.seller_id
    for (let i in seller) {
      if (seller[i].tz.id == seller_id) {
        var pictures = seller[i].tz.img
        for (let i in pictures) {
          urls.push(url + pictures[i]);
        }
        wx.previewImage({
          current: url + pictures[inde],
          urls: urls
        })
      }
    }


  },
  // ----------------------------------红包福利----------------------------------
  red: function (e) {
    wx.navigateTo({
      url: '../redbag/redbag',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // ----------------------------------同城合伙人----------------------------------
  redinfo: function (e) {
    wx: wx.showModal({
      title: '温馨提示',
      content: '功能暂未开放,敬请期待',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  yellow_page: function (e) {
    wx.reLaunch({
      url: '../yellow_page/yellow',
    })
  },
  post1: function (e) {
    wx.switchTab({
      url: '../fabu/fabu/fabu'
    })
  },
  // ---------------------获取商家详情------------------
  store_info: function (e) {
    var id = e.currentTarget.id
    wx: wx.navigateTo({
      url: '../sellerinfo/sellerinfo?id=' + id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // ----------------------------------发帖----------------------------------
  notice: function (e) {
    var id = e.currentTarget.dataset.id
    wx: wx.navigateTo({
      url: '../notice/notice?id=' + id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // ----------------------------------发帖----------------------------------
  post: function (e) {
    wx, wx.reLaunch({
      url: '../shun/shun',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // ----------------------------------拨打热门推荐电话----------------------------------
  phone: function (e) {
    var id = e.currentTarget.dataset.id
    wx.makePhoneCall({
      phoneNumber: id
    })
  },
  // ----------------------------------跳转到商家----------------------------------
  more: function (e) {
    wx: wx.switchTab({
      url: '../store/store',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // ----------------------------------跳转到分类页----------------------------------
  jump: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    wx: wx.navigateTo({
      url: '../marry/marry?id=' + id + '&name=' + name,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // ---------------------------------------查看详情
  see: function (e) {
    var that = this
    var seller = that.data.seller
    var id = e.currentTarget.dataset.id
    wx: wx.navigateTo({
      url: "../infodetial/infodetial?id=" + id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 搜集formid
  formid_one: function (e) {
    console.log('搜集第一个formid')
    console.log(e)
    app.util.request({
      'url': 'entry/wxapp/SaveFormid',
      'cachetime': '0',
      data: {
        user_id: wx.getStorageSync('users').id,
        form_id: e.detail.formId,
        openid: wx.getStorageSync('openid')
      },
      success: function (res) {

      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      first: 1
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // var city_type = wx.getStorageSync('city_type')
    // if (city_type == 1) {
    //   this.setData({
    //     page: 1,
    //     seller: []
    //   })
    //   this.reload()
    //   this.refresh()
    //   this.seller()
    // }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // wx.removeStorage({
    //   key: 'city_type',
    //   success: function (res) {
    //   }
    // })
  },

   detail:function(e){
      wx.navigateTo({
        url: 'detail',
      })
   },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.removeStorageSync('city_type')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this
    this.setData({
      page: 1,
      seller: [],
      refresh_top: false,
    })
    that.reload()
    that.refresh()
    that.seller()
    wx: wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.refresh_top == false) {
      this.seller()
    } else {

    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})