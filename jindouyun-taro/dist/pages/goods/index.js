(wx["webpackJsonp"]=wx["webpackJsonp"]||[]).push([[21],{140:function(e,t,a){},162:function(e,t,a){"use strict";a.r(t);var n=a(4),o=a(7),c=a(0),s=a.n(c),i=a(2),r=a(9),d=a(1),l=a(6),g=a(52),u=a(53),b=a(29),m=a(24),h=(a(140),a(37)),j=function(e){var t=e.nowPage,a=e.maxPage,n=e.tablist,r=e.goodsList,m=e.secondCategory,j=e.dispatchFetchSecondCategory,p=e.dispatchFetchGoodsList,f=e.dispatchClearSecondCategory,w=Object(c["useState"])(!1),O=Object(o["a"])(w,2),C=O[0],_=O[1],y=Object(c["useState"])(!1),x=Object(o["a"])(y,2),E=x[0],S=x[1],P=Object(c["useState"])(0),L=Object(o["a"])(P,2),k=L[0],N=L[1],v=Object(c["useState"])(0),z=Object(o["a"])(v,2),B=z[0],T=z[1],F=function(e){N(e),T(m[e].id)};return Object(c["useEffect"])((function(){f(),j({id:Object(i["getCurrentInstance"])().router.params.id})}),[]),Object(i["useReachBottom"])((function(){t<a?(_(!0),S(!1),p({page:t+1,id:m[k].id,type:"goods",callback:function(e){return _(!1)}})):(_(!0),S(!0))})),s.a.createElement(d["View"],{className:"goods_wrap"},s.a.createElement(u["a"],{title:Object(i["getCurrentInstance"])().router.params.title}),s.a.createElement(d["View"],null,s.a.createElement(l["AtTabs"],{current:k,tabList:n,onClick:F,scroll:!0})),s.a.createElement(d["View"],{className:"padding_row_s padding_column_xxs"},s.a.createElement(g["a"],{type:"goods",id:B}),s.a.createElement(d["View"],{style:{display:0!==r.length&&"none"},className:"goods_list_none_wrap flex direction_column center"},s.a.createElement(d["Image"],{className:"goods_list_none_img",src:h["a"]}),s.a.createElement(d["Text"],{className:"fontS_24 fontC_gray_c6"},"\u8fd8\u6ca1\u6709\u76f8\u5173\u5546\u54c1\u54e6\uff5e")),s.a.createElement(b["a"],{showLoad:C,showNoMore:E})))},p=Object(r["b"])((function(e){return{goodsList:e.zhubajie.goodsList,secondCategory:e.zhubajie.secondCategory,tablist:e.zhubajie.tablist,nowPage:e.zhubajie.nowPage,maxPage:e.zhubajie.maxPage}}),(function(e){return{dispatchFetchSecondCategory:function(t){e(Object(m["h"])(t))},dispatchFetchGoodsList:function(t){e(Object(m["f"])(t))},dispatchClearSecondCategory:function(){e(Object(m["a"])())}}}))(j),f={navigationBarTitleText:"\u5546\u54c1\u5217\u8868",backgroundColor:"#fdb200",navigationBarTextStyle:"white",navigationBarBackgroundColor:"#fdb200"};Page(Object(n["createPageConfig"])(p,"pages/goods/index",{},f||{}))}},[[162,0,1,2,3]]]);