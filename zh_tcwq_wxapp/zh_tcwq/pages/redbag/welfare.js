// zh_tcwq/pages/redbag/welfare.js
var imgArray = []
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    lunbo_len: 0,
    checked1: false,
    checked2: false,
    checked3: false,
    checked4n: false,
    disabled: false,
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
    var url = wx.getStorageSync("url2")
    var url1 = wx.getStorageSync("url")
    var procedures = wx.getStorageSync('System')
    that.setData({
      url: url,
      procedures: Number(procedures.hb_sxf) / 100,
      url1: url1
    })
    var users_info = wx.getStorageSync('users')
    var user_id = users_info.id
    app.util.request({
      'url': 'entry/wxapp/MyStore',
      'cachetime': '0',
      data: { user_id: options.user_id },
      success: function (res) {
        console.log(res)
        that.setData({
          store: res.data,
          user_id: '',
        })
      }
    })
  },
  // -----------------------------上传图片----------------------------
  choiseimg: function () {
    var that = this,
      imgArray = [];
    console.log(that.data)
    var uniacid = wx.getStorageSync('uniacid')
    var img_length = 9 - imgArray.length
    if (img_length > 0 && img_length <= 9) {
      // 选择图片
      wx.chooseImage({
        count: img_length,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          wx.showToast({
            icon: "loading",
            title: "正在上传"
          })
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          that.uploadimg({
            url: that.data.url + 'app/index.php?i=' + uniacid + '&c=entry&a=wxapp&do=Upload&m=zh_tcwq',
            path: tempFilePaths
          });
        }
      })
    } else {
      wxd: wx.showModal({
        title: '上传提示',
        content: '最多上传9张图片',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确定',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  uploadimg: function (data) {
    var that = this,
      i = data.i ? data.i : 0,
      success = data.success ? data.success : 0,
      fail = data.fail ? data.fail : 0;
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'upfile',
      formData: null,
      success: (resp) => {
        if (resp.data != '') {
          console.log(resp)
          success++;
          imgArray.push(resp.data)
          that.setData({
            imgArray: imgArray
          })
          console.log(i);
          console.log('上传商家轮播图时候提交的图片数组', imgArray)
        }
        else {
          wx.showToast({
            icon: "loading",
            title: "请重试"
          })
        }
      },
      fail: (res) => {
        fail++;
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        console.log(i);
        i++;
        if (i == data.path.length) {
          that.setData({
            images: data.path
          });
          wx.hideToast();
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
        } else {
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }

      }
    });
  },
  //  ----------------------------------删除商家上传的轮播图----------------------------------
  delete: function (e) {
    var that = this
    console.log(that.data)
    console.log(e)
    Array.prototype.indexOf = function (val) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
      }
      return -1;
    };
    Array.prototype.remove = function (val) {
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    };
    var inde = e.currentTarget.dataset.index
    imgArray.remove(imgArray[inde])
    that.setData({
      imgArray: imgArray
    })
  },
  switch1Change: function (e) {
    console.log(e)
    this.setData({
      checked1: e.detail.value
    })
  },
  switch2Change: function (e) {
    console.log(e)
    this.setData({
      checked2: e.detail.value
    })
  },
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^提交表单^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  formSubmit: function (e) {
    var that = this
    // 获取用户信息
    var users_info = wx.getStorageSync('users')
    var user_id = users_info.id
    var openid = users_info.openid
    var images = that.data.images
    var store = that.data.store
    // 手续费
    var procedures = that.data.procedures
    // -----获取到的提交的值集合
    var value = e.detail.value
    var hb_money = Number(value.money)
    var hb_num = Number(value.share)
    var details = value.details
    // --------------查看switch状态-----------
    var checked1 = that.data.checked1
    var checked2 = that.data.checked2
    if (checked1 == false) {
      var hb_random = 1
      var money = (hb_money + procedures * hb_money).toFixed(2)
      var beishu = hb_money / hb_num
    } else {
      var hb_random = 2
      var money = (hb_money * hb_num + hb_money * hb_num * procedures).toFixed(2)
    }
    if (checked2 == false) {
      var hb_keyword = ''
      var hb_type = 1
    } else {
      var hb_keyword = value.hb_keyword
      var hb_type = 2
    }
    console.log(imgArray)
    var img = ''
    console.log(img)
    console.log('红包总金额' + ' ' + ' ' + money)
    // 正则验证输入的是否为汉字
    var reg = new RegExp("^[\u4e00-\u9fa5]+$")
    var title = ''
    if (details == '') {
      title = '福利描述不能为空'
    } else if (hb_money == '') {
      title = '红包金额不能为空'
    } else if ((!that.data.checked1) && hb_money < 1) {
      title = '福利红包金额不能小于1元'
    } else if (hb_num == '') {
      title = '红包个数不能为空'
    } else if (beishu < 0.1) {
      title = '红包份数过大，请合理设置'
    } else if ((that.data.checked1) && hb_money < 0.1) {
      title = '单个红包最小金额不能小于0.1'
    } else if (checked2 == true) {
      if (hb_keyword == '') {
        title = '红包口令不能为空'
      } else if (!reg.test(hb_keyword)) {
        title = '口令只能输入汉字'
      }
    }
    if (title != '') {
      wx: wx.showModal({
        title: '提示',
        content: title,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      if (imgArray.length < images.length) {
        wx: wx.showModal({
          title: '提示',
          content: '图片正在上传，请稍候',
          showCancel: true,
          cancelText: '取消',
          confirmText: '确定',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      } else {
        img = imgArray.join(",");
        console.log(img)
        that.setData({
          disabled: true,
        })
        app.util.request({
          'url': 'entry/wxapp/Pay',
          'cachetime': '0',
          data: { openid: openid, money: money },
          success: function (res) {
            wx.requestPayment({
              'timeStamp': res.data.timeStamp,
              'nonceStr': res.data.nonceStr,
              'package': res.data.package,
              'signType': res.data.signType,
              'paySign': res.data.paySign,
              'success': function (res) {
                console.log('这里是支付成功')
                console.log(res)
                app.util.request({
                  'url': 'entry/wxapp/Posting',
                  'cachetime': '0',
                  data: {
                    store_id: store.id,
                    details: details,
                    img: img,
                    user_id: that.data.user_id,
                    user_name: store.store_name,
                    user_tel: store.tel,
                    type2_id: '',
                    type_id: '',
                    money: money,
                    type: '',
                    sz: store.logo,
                    address: store.address,
                    hb_money: hb_money,
                    hb_keyword: hb_keyword,
                    hb_num: hb_num,
                    hb_type: hb_type,
                    hb_random: hb_random
                  },
                  success: function (res) {
                    console.log(res)
                    // -----------------------------------发布成功跳转到首页-----------------------------------------
                    wx: wx.showToast({
                      title: '发布成功',
                      icon: '',
                      image: '',
                      duration: 2000,
                      mask: true,
                      success: function (res) { },
                      fail: function (res) { },
                      complete: function (res) { },
                    })
                    setTimeout(function () {
                      wx: wx.reLaunch({
                        url: '../index/index',
                        success: function (res) { },
                        fail: function (res) { },
                        complete: function (res) { },
                      })
                    }, 2000)
                  },
                })
              },
              'fail': function (res) {
                console.log('这里是支付失败')
                console.log(res)
                wx.showToast({
                  title: '支付失败',
                  duration: 1000
                })
                that.setData({
                  disabled: false,
                })
              },
            })
          },
        })
      }
    }
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
    imgArray.splice(0, imgArray.length)
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