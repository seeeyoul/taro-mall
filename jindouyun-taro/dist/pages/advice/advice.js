(wx["webpackJsonp"]=wx["webpackJsonp"]||[]).push([[7],{135:function(e,n,t){},159:function(e,n,t){"use strict";t.r(n);var a=t(4),c=t(7),o=t(0),r=t.n(o),u=(t(2),t(9)),i=t(1),l=t(6),s=t(10),f=(t(135),function(e){var n=e.submitAdvice,t=e.userInfo;console.log(t);var a=Object(o["useState"])(""),u=Object(c["a"])(a,2),s=u[0],f=u[1],b=Object(o["useState"])(""),v=Object(c["a"])(b,2),m=v[0],d=v[1];return r.a.createElement(i["View"],{className:"advice-container"},r.a.createElement(l["AtTextarea"],{count:!1,value:s,onChange:function(e){return f(e)},placeholder:"\u8bf7\u63cf\u8ff0\u4f60\u7684\u95ee\u9898\u6216\u5efa\u8bae"}),r.a.createElement(l["AtInput"],{name:"value",title:"\u624b\u673a\u53f7",type:"phone",placeholder:"\u8bf7\u8f93\u5165\u624b\u673a\u53f7",value:m,onChange:function(e){return d(e)}}),r.a.createElement(i["Button"],{className:"submit",onClick:function(){n({username:t.nickName,mobile:m,feedType:"niu",content:s})}},"\u63d0\u4ea4"))}),b=Object(u["b"])((function(e){return{userInfo:e.userInfo.userInfo}}),(function(e){return{submitAdvice:function(n){e(s["o"](n))}}}))(f),v={navigationBarTitleText:"\u5efa\u8bae\u53cd\u9988",backgroundColor:"#fdb200",navigationBarTextStyle:"white",navigationBarBackgroundColor:"#fdb200"};Page(Object(a["createPageConfig"])(b,"pages/advice/advice",{},v||{}))}},[[159,0,1,2,3]]]);