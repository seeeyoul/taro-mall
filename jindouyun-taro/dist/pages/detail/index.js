(wx["webpackJsonp"]=wx["webpackJsonp"]||[]).push([[17],{116:function(e,a,t){},150:function(e,a,t){"use strict";t.r(a);var n=t(4),c=t(27),o=t(7),r=t(0),i=t.n(r),l=t(2),s=t(9),d=t(1),m=(t(116),t(50)),f=t(47),_=t(30),u=t(11),g=function(e){e.goodsDetail;var a=e.goodsGallery,t=e.goodsInfo,n=e.dispatchFetchGoodsDetail,s=Object(r["useState"])(!1),f=Object(o["a"])(s,2),g=f[0],w=f[1],b=Object(r["useState"])({}),p=Object(o["a"])(b,2),E=p[0],x=p[1],N=Object(r["useState"])([]),h=Object(o["a"])(N,2),j=h[0],O=h[1];Object(r["useEffect"])((function(){Object(u["b"])(!0),n({id:Object(l["getCurrentInstance"])().router.params.id})}),[]),Object(r["useEffect"])((function(){O(Object(c["a"])(a))}),[a]);var V=function(e,a){x({type:e,info:a,page:"other"}),w(!0)},y=function(e){w(e)};return i.a.createElement(d["View"],{className:"flex direction_column detail_wrap"},i.a.createElement(d["Swiper"],{className:"margin_row_s",indicatorDots:!0,indicatorActiveColor:"#fdb200"},a.map((function(e,a){return i.a.createElement(d["SwiperItem"],{style:{width:"100%",height:"100%",transform:"translate(0%, 0%)"},key:e},i.a.createElement(d["Image"],{lazyLoad:!0,className:"detail_banner",src:e}))}))),i.a.createElement(d["View"],{className:"flex between bgc_white padding_column_xxs padding_row_xs  margin_row_s"},i.a.createElement(d["View"],null,i.a.createElement(d["View"],{className:"fontS_36"},t.name),i.a.createElement(d["View"],{className:"fontS_20 fontC_gray_c6"},t.brief)),i.a.createElement(d["View"],{className:"fontC_orange fontS_36"},"\xa5",t.nowPrice)),i.a.createElement(d["View"],{className:"margin_row_s padding_xs border_10 margin_column_xxs bgc_white"},i.a.createElement(d["View"],{className:"fontS_36 padding_column_xs"},"\u56fe\u6587\u8be6\u60c5"),i.a.createElement(d["View"],{className:"flex direction_column center_row"},j.map((function(e){return i.a.createElement(d["Image"],{className:"detail_img",key:e,src:e})})))),i.a.createElement(d["View"],{className:"detail_footer fixed full_width"},i.a.createElement(d["View"],{className:"flex"},i.a.createElement(d["View"],{className:"detail_footer_item detail_icon_wrap flex center bgc_yellow"},i.a.createElement(d["Image"],{onClick:function(){return V("add",t)},className:"detail_icon",src:m["a"]})),i.a.createElement(d["View"],{onClick:function(){return V("purchase",t)},className:"detail_footer_item fontS_36 fontC_white bgc_orange flex center flex_grow"},"\u76f4\u63a5\u8d2d\u4e70"))),i.a.createElement(_["a"],{openAdd:g,callback:function(e){return y(e)},addInfo:E}))},w=Object(s["b"])((function(e){return{goodsDetail:e.detail.goodsDetail,goodsInfo:e.detail.goodsInfo,goodsGallery:e.detail.goodsGallery}}),(function(e){return{dispatchFetchGoodsDetail:function(a){e(Object(f["a"])(a))}}}))(g),b={navigationBarTitleText:"\u8be6\u60c5",backgroundColor:"#fdb200",navigationBarTextStyle:"white",navigationBarBackgroundColor:"#fdb200"};Page(Object(n["createPageConfig"])(w,"pages/detail/index",{},b||{}))}},[[150,0,1,2,3]]]);