(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-activity-booking-activity-booking"],{"0158":function(i,t,e){"use strict";e.r(t);var n=e("2f27"),a=e("c711");for(var u in a)"default"!==u&&function(i){e.d(t,i,(function(){return a[i]}))}(u);e("55e0");var r,o=e("f0c5"),c=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"6301c97a",null,!1,n["a"],r);t["default"]=c.exports},"2f27":function(i,t,e){"use strict";var n;e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return u})),e.d(t,"a",(function(){return n}));var a=function(){var i=this,t=i.$createElement,e=i._self._c||t;return e("v-uni-view",i._l(i.activity_list.lists,(function(t,n){return e("v-uni-view",{staticClass:"venue-detail"},[e("v-uni-view",{staticClass:"venue-img"},[e("v-uni-image",{attrs:{src:t.cover}})],1),e("v-uni-view",{staticClass:"venue-cont",on:{click:function(e){arguments[0]=e=i.$handleEvent(e),i.detsil(t)}}},[e("v-uni-view",{staticClass:"venue-name"},[i._v(i._s(t.str))]),e("v-uni-view",[i._v("预约日期:2022-08-05")]),e("v-uni-view",[i._v("预约时段:"+i._s(t.time))])],1),e("v-uni-view",{staticClass:"ticket-checking"},[i._v("验票码")])],1)})),1)},u=[]},"55e0":function(i,t,e){"use strict";var n=e("d97e5"),a=e.n(n);a.a},"582b":function(i,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{qingxiangyuyuedanweizhanshigaima:"",yonghuyuyue:"",yibianruchang:"",yanpiaoma:"",yuyue:"",index:0,member_id:0,type:"activity",activity_list:[],idx:0}},methods:{lolo:function(){uni.navigateTo({url:"../venue-bokking-detail/venue-bokking-detail"})}},onLoad:function(i){var t=this;if(this.qingxiangyuyuedanweizhanshigaima=this.$lang.qingxiangyuyuedanweizhanshigaima[uni.getStorageSync("lang")],this.yonghuyuyue=this.$lang.yonghuyuyue[uni.getStorageSync("lang")],this.yibianruchang=this.$lang.yibianruchang[uni.getStorageSync("lang")],this.yanpiaoma=this.$lang.yanpiaoma[uni.getStorageSync("lang")],this.yuyue=this.$lang.yuyue[uni.getStorageSync("lang")],i.member_id&&(this.member_id=i.member_id),this.member_id){this.index=1;var e=JSON.stringify({type:this.type,member_id:this.member_id});this.$request("/api/member/check_qr",{data:e},"post",{},!0).then((function(i){1==i.code&&(t.activity_list=i.data)}))}else this.$request("/api/member/get_activity_list",{type:this.type},"post",{},!0).then((function(i){1==i.code&&(t.activity_list=i.data)}))}};t.default=n},bce4:function(i,t,e){var n=e("24fb");t=n(!1),t.push([i.i,".venue-detail[data-v-6301c97a]{display:flex;margin:%?30?%;padding-bottom:%?30?%;border-bottom:solid %?1?% #f7f7f7}.venue-img uni-image[data-v-6301c97a]{width:%?244?%;height:%?154?%;border-radius:%?10?%;margin-right:%?30?%}.venue-cont[data-v-6301c97a]{color:#999;font-size:%?26?%;font-family:PingFangSC-regular}.venue-name[data-v-6301c97a]{color:#101010;font-size:%?32?%;font-family:PingFangSC-regular;margin-bottom:%?26?%;margin-top:%?6?%}.ticket-checking[data-v-6301c97a]{width:%?110?%;height:%?66?%;line-height:%?66?%;border-radius:%?20?%;background-color:#1890ff;color:#fff;font-size:%?26?%;text-align:center;font-family:Arial;margin-top:%?44?%;margin-left:%?38?%}",""]),i.exports=t},c711:function(i,t,e){"use strict";e.r(t);var n=e("582b"),a=e.n(n);for(var u in n)"default"!==u&&function(i){e.d(t,i,(function(){return n[i]}))}(u);t["default"]=a.a},d97e5:function(i,t,e){var n=e("bce4");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[i.i,n,""]]),n.locals&&(i.exports=n.locals);var a=e("4f06").default;a("c150e3f8",n,!0,{sourceMap:!1,shadowMode:!1})}}]);