// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showdata: {},
  },

  jumplogs: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  delete: function (e) {
    console.log("delete id:", e.target.id)
    var that = this
    wx.request({
      url: getApp().globalData.server + '/treehole/index.php/Home/Message/delete_message',
      data: {
        message_id: e.target.id,
        user_id: getApp().globalData.user.user_id,
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.error_code != 0) {
          wx.showModal({
            title: '哎呀～',
            content: '删除失败！' + res.data.msg,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else if (res.data.error_code == 0) {
          wx.showModal({
            title: '提示！',
            showCancel: false,
            content: '删除成功',
            success(res) {},
          })
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '哎呀～',
          content: '网络不在状态呢！',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
    this.onLoad()
  },

  first_select: function () {
    wx.redirectTo({
      url: '../square/square'
    })
  },

  second_select: function () {
    if (getApp().globalData.haslogin) {
      wx.navigateTo({
        url: '../commit/commit'
      })
    } else {
      getApp().confirmlogin()
    }
  },

  third_select: function () {
    // wx.redirectTo({
    //   url: '/pages/mine/mine'
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: getApp().globalData.server + '/treehole/index.php/Home/Message/get_one_user_all_messages',
      data: {
        user_id: getApp().globalData.user.user_id
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.error_code != 0) {
          wx.showModal({
            title: '哎呀～',
            content: '出错了呢！' + res.data.msg,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else if (res.data.error_code == 0) {
          that.setData({
            showdata: res.data.data
          })
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '哎呀～',
          content: '网络不在状态呢！',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })

    setTimeout(() => {
      wx.hideLoading()
    }, 2000);
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
    wx.hideHomeButton()
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