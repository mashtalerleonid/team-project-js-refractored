parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"clu1":[function(require,module,exports) {

},{"./../images/bg-image/mobile-fon@1x.jpg":[["mobile-fon@1x.6f3b1b7e.jpg","hVl9"],"hVl9"],"./../images/bg-image/tablet-fon@1x.jpg":[["tablet-fon@1x.f5bf4113.jpg","qbpy"],"qbpy"],"./../images/bg-image/desctop-fon@1x.jpg":[["desctop-fon@1x.b1dc7576.jpg","e1zw"],"e1zw"],"./../images/bg-image/libr-mobile-fon@1x.jpg":[["libr-mobile-fon@1x.35f70bfc.jpg","YUlm"],"YUlm"],"./../images/bg-image/libr-tablet-fon@1x.jpg":[["libr-tablet-fon@1x.04ee2d51.jpg","ApP8"],"ApP8"],"./../images/bg-image/libr-desctop-fon@1x.jpg":[["libr-desctop-fon@1x.518346b3.jpg","NRmL"],"NRmL"],"./../images/modal/close-white.png":[["close-white.a68d39a7.png","vJJX"],"vJJX"],"./../images/modal/close-hover.png":[["close-hover.7ebab2e4.png","is1Z"],"is1Z"]}],"VyiV":[function(require,module,exports) {
"use strict";function e(){return{siteLogo:document.querySelector(".site-nav__logo"),navBtnsContainer:document.querySelector(".site-nav__list"),navHomeBtn:document.querySelector(".home-js"),navLibBtn:document.querySelector(".library-js"),formContainer:document.querySelector(".form"),searchForm:document.querySelector("#search-form"),searchForminput:document.querySelector(".search-form__input"),searchFormTitle:document.querySelector(".search-form__title"),notification:document.querySelector(".notification"),libBtnsContainer:document.querySelector(".overlay"),header:document.querySelector(".header"),paginationContainer:document.querySelector("#tui-pagination-container"),cardsContainer:document.querySelector("#cards-container"),cardWatchedBtn:document.querySelector(".js-btn-watched"),cardQueueBtn:document.querySelector(".js-btn-queue"),sentinelContainer:document.querySelector(".sentinel__container"),sentinel:document.querySelector("#sentinel"),genreBtns:document.querySelectorAll(".genres__checkbox"),genreBtnsContainer:document.querySelector(".genres__container"),backdrop:document.querySelector(".backdrop"),modalCard:document.querySelector(".modal-card")}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"HxdU":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e={BASE_URL:"https://api.themoviedb.org/3",API_KEY:"b760a58e749aebdb345fb45ac26ad542",trendingUrl:"/trending/movies/day",queryUrl:"/search/movie",watchedBtnText:"watched",queuedBtnText:"queue",addText:"add to ",removeText:"remove from "};exports.default=e;
},{}],"Focm":[function(require,module,exports) {
"use strict";require("./sass/main.scss"),require("./js/refs"),require("./js/settings");
},{"./sass/main.scss":"clu1","./js/refs":"VyiV","./js/settings":"HxdU"}]},{},["Focm"], null)
//# sourceMappingURL=/team-project-js-refractored/src.6bb2d07e.js.map