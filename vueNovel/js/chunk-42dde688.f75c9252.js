(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-42dde688"],{1148:function(t,e,o){"use strict";var a=o("a691"),n=o("1d80");t.exports="".repeat||function(t){var e=String(n(this)),o="",i=a(t);if(i<0||i==1/0)throw RangeError("Wrong number of repetitions");for(;i>0;(i>>>=1)&&(e+=e))1&i&&(o+=e);return o}},1253:function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"BookDetail"},[a("div",{staticClass:"top"},[a("van-icon",{staticClass:"vicc",attrs:{name:"arrow-left"},on:{click:t.goBack}}),a("span",[t._v("书籍详情")])],1),a("div",{staticClass:"bookTop"},[a("div",{staticClass:"left"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.unescape(t.bookDetail.cover),expression:"unescape(bookDetail.cover)"}]})]),a("div",{staticClass:"right"},[a("h3",[t._v(t._s(t.bookDetail.title))]),a("div",{staticClass:"bookInfo"},[a("img",{staticClass:"userIcon",attrs:{src:o("ba97"),alt:""}}),a("div",{staticClass:"user"},[t._v(t._s(t.bookDetail.author))])]),a("span",{staticClass:"vtype"},[t._v(t._s(t.bookDetail.minorCate))]),t._v(" · "),a("span",{staticClass:"count"},[t._v(t._s(t.dealCount(t.bookDetail.wordCount)))]),a("div",{staticClass:"copyright"},[t._v("来源："+t._s(t.bookDetail.copyright))])])]),a("div",{staticClass:"desc"},[a("h5",{class:{showMore:t.isShowMore,showLess:!t.isShowMore}},[t._v(t._s(t.bookDetail.longIntro))]),a("span",{ref:"isShow",on:{click:function(e){return t.showMore()}}},[t._v("展开")])]),a("div",{staticClass:"catalog",on:{click:function(e){return t.goCatalog(t.bookDetail.title)}}},[a("div",[t._v("目录")]),a("div",[t._v(t._s(t.bookDetail.lastChapter))]),a("div",[t._v(t._s(t.dealTime(t.bookDetail.updated)))])]),a("div",{staticClass:"recommend"},[a("div",{staticClass:"recommend-top"},[a("h3",[t._v("推荐好书")]),a("div",{staticClass:"vicon"},[a("van-icon",{attrs:{name:"replay"}}),a("span",{on:{click:t.toggleRecommend}},[t._v("换一换")])],1)]),a("van-grid",{attrs:{"icon-size":"72",replace:""}},t._l(t.tempRecommend,(function(e,o){return a("van-grid-item",{key:o,attrs:{icon:t.unescape(e.cover),text:e.title,id:e._id},on:{click:function(o){t.bookId=e._id}}})})),1)],1),a("Operation",{attrs:{name:t.bookDetail.title,cover:t.unescape(t.bookDetail.cover)}})],1)},n=[];o("fb6a"),o("a434"),o("b680"),o("d3b7"),o("ac1f"),o("25f0"),o("5319");function i(t){if(Array.isArray(t))return t}var r=o("db90"),c=o("06c5");function s(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(t){return i(t)||Object(r["a"])(t)||Object(c["a"])(t)||s()}var u=o("5530");o("4d63");function f(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function d(t,e){for(var o=0;o<e.length;o++){var a=e[o];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function h(t,e,o){return e&&d(t.prototype,e),o&&d(t,o),t}var m=function(){function t(){f(this,t)}return h(t,[{key:"formatDate",value:function(t,e){var o=t.getFullYear().toString();if(/(y+)/.test(e)){var a=RegExp.$1;e=e.replace(a,o.slice(o.length-a.length))}var n={M:t.getMonth()+1,d:t.getDate(),h:t.getHours(),m:t.getMinutes(),s:t.getSeconds()};for(var i in n){var r=new RegExp("(".concat(i,"{1,2})"));if(r.test(e)){var c=RegExp.$1,s=n[i]>=10||1==c.length?n[i]:"0"+n[i];e=e.replace(c,s)}}return e}},{key:"parseTimeDay",value:function(t){var e,o,a=t,n=Math.floor(parseInt(Date.now()-a)/1e3/60/60/24);if(0==n)return e=Math.floor(parseInt(Date.now()-a)/1e3/60/60),0!=e?e+"小时前":Math.floor(parseInt(Date.now()-a)/1e3/60%60)+"分钟前";if(n>30){if(o=Math.floor(parseInt(Date.now()-a)/1e3/60/60/24/30),o>11){var i=Math.floor(o/12);return i+"年前"}return o+"月前"}return n+"天前"}}]),t}(),p=new m,g=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"Operation"},[t.exitBook?o("div",{on:{click:function(e){return t.addBook(t.name)}}},[t._v("已加入书架")]):o("div",{on:{click:function(e){return t.addBook(t.name)}}},[t._v("加入书架")]),o("div",{on:{click:function(e){return t.goRead(t.name)}}},[o("span",[t._v("开始阅读")])])])},v=[],b=(o("45fc"),o("b0c0"),o("2f62")),k=o("6380"),x=o("d399"),D={name:"Operation",props:{name:String,cover:String},data:function(){return{copyright:!1,exitBook:!1}},computed:Object(u["a"])({},Object(b["b"])({bookCatalog:function(t){return t.bookCatalog},loading:function(t){return t.loading}})),methods:{goRead:function(t){var e=this,o="";this.$store.commit(k["a"].LOADING,{data:!0}),this.axios.get("/https://api.pingcc.cn/?xsname=".concat(t)).then((function(t){if(1==t.data.code)return setTimeout((function(){e.$store.commit(k["a"].LOADING,{data:!1})}),300),void x["a"].fail("暂无版权");0==t.data.code&&(o=t.data.list[t.data.list.length-1].url,e.$store.commit(k["a"].LOADING,{data:!1}),e.copyright=!0)})).catch((function(t){console.error(t),setTimeout((function(){e.$store.commit(k["a"].LOADING,{data:!1})}),3e3)})).then((function(){e.copyright&&e.axios.get("/https://api.pingcc.cn",{params:{xsurl1:o}}).then((function(o){e.$store.commit(k["a"].BOOK,{data:{name:t,cover:e.cover,catalog:o.data.list}}),localStorage.setItem("_book",JSON.stringify({name:e.name,cover:e.cover,catalog:o.data.list})),e.$router.push({name:"BookRead",params:{url:o.data.list[0].url}})})).catch((function(t){console.error(t)})).then((function(){e.$store.commit(k["a"].LOADING,{data:!1})}))}))},isExisBook:function(t){var e=[];if(e=JSON.parse(localStorage.getItem("_booksCollection")),e){var o=e.some((function(e){return e.name==t}));if(o)return void(this.exitBook=!0);this.exitBook=!1}else this.exitBook=!1},addBook:function(t){var e=this,o="",a=[];this.exitBook||(this.$store.commit(k["a"].LOADING,{data:!0}),this.axios.get("/https://api.pingcc.cn/?xsname=".concat(this.name)).then((function(t){if(1==t.data.code)return setTimeout((function(){e.$store.commit(k["a"].LOADING,{data:!1})}),300),void x["a"].fail("暂无版权");0==t.data.code&&(o=t.data.list[t.data.list.length-1].url,e.$store.commit(k["a"].LOADING,{data:!1}),e.copyright=!0)})).catch((function(t){console.error(t),setTimeout((function(){e.$store.commit(k["a"].LOADING,{data:!1})}),3e3)})).then((function(){e.copyright&&e.axios.get("/https://api.pingcc.cn",{params:{xsurl1:o}}).then((function(o){if(e.$store.commit(k["a"].BOOK,{data:o.data.list}),a=JSON.parse(localStorage.getItem("_booksCollection")),a){var n=a.some((function(e){return e.name==t}));if(n)return;e.exitBook=!0,a.unshift({name:e.name,cover:e.cover,currentCatalog:o.data.list[0],catalog:o.data.list}),localStorage.setItem("_booksCollection",JSON.stringify(a))}else e.exitBook=!0,a=[],a.push({name:e.name,cover:e.cover,currentCatalog:o.data.list[0],catalog:o.data.list}),localStorage.setItem("_booksCollection",JSON.stringify(a))})).catch((function(t){console.error(t)})).then((function(){e.$store.commit(k["a"].LOADING,{data:!1})}))})))}},watch:{name:function(t,e){this.isExisBook(t)},exitBook:function(){}},created:function(){},mounted:function(){}},w=D,y=(o("2d0c"),o("2877")),O=Object(y["a"])(w,g,v,!1,null,"6fdda24a",null),I=O.exports,_={name:"BookDetail",data:function(){return{bookId:"",isShowMore:!1,recommendBook:[],tempRecommend:[],copyright:!1}},components:{Operation:I},computed:Object(u["a"])({},Object(b["b"])({bookDetail:function(t){return t.bookDetail},loading:function(t){return t.loading}})),methods:{goBack:function(){this.$router.go(-1)},getBookDetail:function(t){var e=this;this.$store.commit(k["a"].LOADING,{data:!0}),this.axios.get("https://novel.kele8.cn/book-info/".concat(t)).then((function(t){e.$store.commit(k["a"].BOOK_DETAIL,{data:t.data}),localStorage.setItem("_bookDetail",JSON.stringify(t.data))})).catch((function(t){console.error(t)})).then((function(){e.$store.commit(k["a"].LOADING,{data:!1})}))},unescape:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(t){return unescape(t).replace("/agent/","")})),dealCount:function(t){return t>9999?(t/1e4).toFixed(1)+"万字":t>999?(t/1e3).toFixed(1)+"千字":t+"字"},showMore:function(){this.isShowMore=!this.isShowMore,this.isShowMore?this.$refs.isShow.textContent="收回":this.$refs.isShow.textContent="展开"},dealTime:function(t){var e=p.formatDate(new Date(t),"yyyy-MM-dd hh:mm:ss");e=e.replace(/-/g,"/");var o=new Date(e).getTime(),a=p.parseTimeDay(o);return a},recommend:function(t){var e=this;this.axios.get("https://novel.kele8.cn/recommend/".concat(t)).then((function(t){e.recommendBook=t.data.books,e.tempRecommend=e.recommendBook.slice(0,8)})).catch((function(t){console.error(t)}))},toggleRecommend:function(){for(var t=l(this.recommendBook),e=t.slice(0),o=[],a=0;a<8;a++){var n=Math.floor(Math.random()*e.length);o.push(e[n]),e.splice(n,1)}this.tempRecommend=o},goCatalog:function(t){var e=this,o="";this.$store.commit(k["a"].LOADING,{data:!0}),this.axios.get("/https://api.pingcc.cn/?xsname=".concat(t)).then((function(t){if(1==t.data.code)return setTimeout((function(){e.$store.commit(k["a"].LOADING,{data:!1})}),300),void x["a"].fail("暂无版权");0==t.data.code&&(o=t.data.list[t.data.list.length-1].url,e.$store.commit(k["a"].LOADING,{data:!1}),e.copyright=!0)})).catch((function(t){console.error(t),setTimeout((function(){e.$store.commit(k["a"].LOADING,{data:!1})}),3e3)})).then((function(){e.copyright&&e.axios.get("/https://api.pingcc.cn",{params:{xsurl1:o}}).then((function(o){e.$store.commit(k["a"].BOOK,{data:{name:t,cover:e.unescape(e.bookDetail.cover),catalog:o.data.list}}),localStorage.setItem("_book",JSON.stringify({name:t,cover:e.unescape(e.bookDetail.cover),catalog:o.data.list})),e.$router.push({path:"/book/catalog"})})).catch((function(t){console.error(t)})).then((function(){e.$store.commit(k["a"].LOADING,{data:!1})}))}))}},watch:{bookId:function(){this.getBookDetail(this.bookId),this.recommend(this.bookId)}},created:function(){this.bookId=this.$route.params.id,this.getBookDetail(this.bookId),this.recommend(this.bookId)}},C=_,S=(o("a819"),Object(y["a"])(C,a,n,!1,null,"455edef8",null));e["default"]=S.exports},"2d0c":function(t,e,o){"use strict";var a=o("f0c5"),n=o.n(a);n.a},"39e1":function(t,e,o){},"408a":function(t,e,o){var a=o("c6b6");t.exports=function(t){if("number"!=typeof t&&"Number"!=a(t))throw TypeError("Incorrect invocation");return+t}},"44e7":function(t,e,o){var a=o("861d"),n=o("c6b6"),i=o("b622"),r=i("match");t.exports=function(t){var e;return a(t)&&(void 0!==(e=t[r])?!!e:"RegExp"==n(t))}},"45fc":function(t,e,o){"use strict";var a=o("23e7"),n=o("b727").some,i=o("a640"),r=o("ae40"),c=i("some"),s=r("some");a({target:"Array",proto:!0,forced:!c||!s},{some:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}})},"4d63":function(t,e,o){var a=o("83ab"),n=o("da84"),i=o("94ca"),r=o("7156"),c=o("9bf2").f,s=o("241c").f,l=o("44e7"),u=o("ad6d"),f=o("9f7f"),d=o("6eeb"),h=o("d039"),m=o("69f3").set,p=o("2626"),g=o("b622"),v=g("match"),b=n.RegExp,k=b.prototype,x=/a/g,D=/a/g,w=new b(x)!==x,y=f.UNSUPPORTED_Y,O=a&&i("RegExp",!w||y||h((function(){return D[v]=!1,b(x)!=x||b(D)==D||"/a/i"!=b(x,"i")})));if(O){var I=function(t,e){var o,a=this instanceof I,n=l(t),i=void 0===e;if(!a&&n&&t.constructor===I&&i)return t;w?n&&!i&&(t=t.source):t instanceof I&&(i&&(e=u.call(t)),t=t.source),y&&(o=!!e&&e.indexOf("y")>-1,o&&(e=e.replace(/y/g,"")));var c=r(w?new b(t,e):b(t,e),a?this:k,I);return y&&o&&m(c,{sticky:o}),c},_=function(t){t in I||c(I,t,{configurable:!0,get:function(){return b[t]},set:function(e){b[t]=e}})},C=s(b),S=0;while(C.length>S)_(C[S++]);k.constructor=I,I.prototype=k,d(n,"RegExp",I)}p("RegExp")},7156:function(t,e,o){var a=o("861d"),n=o("d2bb");t.exports=function(t,e,o){var i,r;return n&&"function"==typeof(i=e.constructor)&&i!==o&&a(r=i.prototype)&&r!==o.prototype&&n(t,r),t}},a434:function(t,e,o){"use strict";var a=o("23e7"),n=o("23cb"),i=o("a691"),r=o("50c4"),c=o("7b0b"),s=o("65f0"),l=o("8418"),u=o("1dde"),f=o("ae40"),d=u("splice"),h=f("splice",{ACCESSORS:!0,0:0,1:2}),m=Math.max,p=Math.min,g=9007199254740991,v="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!d||!h},{splice:function(t,e){var o,a,u,f,d,h,b=c(this),k=r(b.length),x=n(t,k),D=arguments.length;if(0===D?o=a=0:1===D?(o=0,a=k-x):(o=D-2,a=p(m(i(e),0),k-x)),k+o-a>g)throw TypeError(v);for(u=s(b,a),f=0;f<a;f++)d=x+f,d in b&&l(u,f,b[d]);if(u.length=a,o<a){for(f=x;f<k-a;f++)d=f+a,h=f+o,d in b?b[h]=b[d]:delete b[h];for(f=k;f>k-a+o;f--)delete b[f-1]}else if(o>a)for(f=k-a;f>x;f--)d=f+a-1,h=f+o-1,d in b?b[h]=b[d]:delete b[h];for(f=0;f<o;f++)b[f+x]=arguments[f+2];return b.length=k-a+o,u}})},a819:function(t,e,o){"use strict";var a=o("39e1"),n=o.n(a);n.a},b680:function(t,e,o){"use strict";var a=o("23e7"),n=o("a691"),i=o("408a"),r=o("1148"),c=o("d039"),s=1..toFixed,l=Math.floor,u=function(t,e,o){return 0===e?o:e%2===1?u(t,e-1,o*t):u(t*t,e/2,o)},f=function(t){var e=0,o=t;while(o>=4096)e+=12,o/=4096;while(o>=2)e+=1,o/=2;return e},d=s&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!c((function(){s.call({})}));a({target:"Number",proto:!0,forced:d},{toFixed:function(t){var e,o,a,c,s=i(this),d=n(t),h=[0,0,0,0,0,0],m="",p="0",g=function(t,e){var o=-1,a=e;while(++o<6)a+=t*h[o],h[o]=a%1e7,a=l(a/1e7)},v=function(t){var e=6,o=0;while(--e>=0)o+=h[e],h[e]=l(o/t),o=o%t*1e7},b=function(){var t=6,e="";while(--t>=0)if(""!==e||0===t||0!==h[t]){var o=String(h[t]);e=""===e?o:e+r.call("0",7-o.length)+o}return e};if(d<0||d>20)throw RangeError("Incorrect fraction digits");if(s!=s)return"NaN";if(s<=-1e21||s>=1e21)return String(s);if(s<0&&(m="-",s=-s),s>1e-21)if(e=f(s*u(2,69,1))-69,o=e<0?s*u(2,-e,1):s/u(2,e,1),o*=4503599627370496,e=52-e,e>0){g(0,o),a=d;while(a>=7)g(1e7,0),a-=7;g(u(10,a,1),0),a=e-1;while(a>=23)v(1<<23),a-=23;v(1<<a),g(1,1),v(2),p=b()}else g(0,o),g(1<<-e,0),p=b()+r.call("0",d);return d>0?(c=p.length,p=m+(c<=d?"0."+r.call("0",d-c)+p:p.slice(0,c-d)+"."+p.slice(c-d))):p=m+p,p}})},f0c5:function(t,e,o){}}]);
//# sourceMappingURL=chunk-42dde688.f75c9252.js.map