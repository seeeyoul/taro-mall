export default {
  pages: [
    'pages/zhubajie/index',
    'pages/waimai/index',
    'pages/search/index',
    'pages/detail/index',
    'pages/sunwukong/index',
    'pages/shawujing/index',
    'pages/tangseng/index',
    'pages/index/index',
    'pages/order/order',
    'pages/userInfo/userInfo',
    'pages/myAddress/myAddress',
    'pages/editAddress/editAddress',
    'pages/integral/integral',
    'pages/code/code',
    'pages/customer-service/service',
    'pages/afterSale/afterSale',
    'pages/advice/advice',
    'pages/confirmOrder/confirmOrder',
    'pages/orderDetail/orderDetail',
    'pages/goods/index',
    'pages/waimai_detail/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '筋斗云',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: "#919191",
    selectedColor: "#fdb200",
    backgroundColor: "#FFFFFF",
    borderStyle: 'black',
    list: [{
      pagePath: 'pages/zhubajie/index',
      'iconPath': "./assets/images/zhubajie_0.png",
      'selectedIconPath': "./assets/images/zhubajie_1.png",
      text: "校园购"
    }, {
      pagePath: "pages/sunwukong/index",
      'iconPath': "./assets/images/sunwukong_0.png",
      'selectedIconPath': "./assets/images/sunwukong_1.png",
      text: "快递"
    }, {
      pagePath: "pages/shawujing/index",
      'iconPath': "./assets/images/shawujing_0.png",
      'selectedIconPath': "./assets/images/shawujing_1.png",
      text: "购物车"
    }, {
      pagePath: "pages/tangseng/index",
      'iconPath': "./assets/images/tangseng_0.png",
      'selectedIconPath': "./assets/images/tangseng_1.png",
      text: "我的"
    }]
  }
}
