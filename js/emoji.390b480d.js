(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["emoji"],{"0396":function(e,t,a){"use strict";var i=a("235d"),s=a.n(i);s.a},"235d":function(e,t,a){},8805:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("SlideAnimation",{staticClass:"answer-emoji",attrs:{isGroup:!0}},[e._l(e.answers,function(t,i){return["one"===e.select?a("b-radio",{key:t.id,staticClass:"answer-emoji__item-wrapper",class:e.getVerifyingState(t.id),attrs:{"native-value":t.title,"data-element-index":i,checked:e.isChecked(t.title)},model:{value:e.val,callback:function(t){e.val=t},expression:"val"}},[t.hint?a("hint",{staticClass:"answer-emoji__hint",attrs:{answer:t}}):e._e(),a("ImageWithLoader",{attrs:{src:e.staticPath+"/images/emoji/"+e.getEmoji(t)+".png"}}),a("div",{staticClass:"answer-emoji__item-text"},[e._v(e._s(t.title))])],1):e._e(),"many"===e.select?a("b-checkbox",{key:t.id,ref:"checkbox",refInFor:!0,staticClass:"answer-emoji__item-wrapper",class:e.getVerifyingState(t.id),attrs:{"native-value":t.title,"data-element-index":i,checked:e.isChecked(t.title)},model:{value:e.val,callback:function(t){e.val=t},expression:"val"}},[a("ImageWithLoader",{attrs:{src:e.staticPath+"/images/emoji/"+e.getEmoji(t)+".png"}}),t.hint?a("hint",{staticClass:"answer-emoji__hint",attrs:{answer:t}}):e._e(),a("div",{staticClass:"answer-emoji__item-text"},[e._v(e._s(t.title))])],1):e._e()]}),e.hasOther?[a("div",{key:"other",staticClass:"answer-emoji__item-wrapper",class:{"answer_verifying-end":e.isVerifyingEnd},attrs:{checked:!!e.other,"data-element-index":e.answers.length}},[a("ImageWithLoader",{attrs:{src:e.staticPath+"/images/emoji/1f449-1f3fb.png"}}),a("OtherInput",{staticClass:"answer-emoji__other",attrs:{select:e.select,maxlength:"80"},model:{value:e.other,callback:function(t){e.other=t},expression:"other"}})],1)]:e._e(),a("i",{key:"layout-fix",staticClass:"answer-emoji__item-wrapper answer-emoji__item-wrapper_layout-fix",attrs:{"aria-hidden":""}})],2)},s=[],n=a("9b02"),r=a.n(n),c=a("ba84"),l=a.n(c),o=a("e555"),h=a("5b79"),u=a("d66b"),m=a("8e28"),_=a("6a85"),d=a("7b7c"),p=function(){return a.e("popover").then(a.bind(null,"2cc6"))},f={extends:d["a"],mixins:[o["a"],m["a"]],components:{Hint:p,OtherInput:h["a"],ImageWithLoader:u["a"],SlideAnimation:_["a"]},activated:function(){this.val=this.$store.getters["quiz/getAnswerValue"]},props:{answers:Array,select:String},data:function(){return{val:"many"===this.select?[]:null,staticPath:Object({VUE_APP_API_URL_US:"https://api.us.marquiz.io",VUE_APP_PRIVATE_FILE_UPLOAD_URL:"https://files.marquiz.ru/upload",VUE_APP_API_URL:"https://api.marquiz.ru",VUE_APP_MARQUIZ_ANALYTICS_URL:"",NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_STATIC_URL||"https://static.marquiz.ru"}},methods:{isChecked:function(e){var t=!1;return this.val&&(t="one"===this.select?this.val===e:l()(this.val,e)>=0),t},getEmoji:function(e){return r()(e,"emoji.unified","1f449-1f3fb")}},watch:{val:function(e){this.blurCheckbox("checkbox"),e&&this.other&&"one"===this.select&&e!==this.other&&(this.other=null),this.$store.dispatch("quiz/setAnswer",e)}}},v=f,w=(a("0396"),a("2877")),g=Object(w["a"])(v,i,s,!1,null,null,null);t["default"]=g.exports}}]);