function ready(n){"loading"!=document.readyState?n():document.addEventListener?document.addEventListener("DOMContentLoaded",n):document.attachEvent("onreadystatechange",function(){"complete"==document.readyState&&n()})}function chargeA(){$(".swiper-container, .ecran0").removeClass("current"),$(".bandeA").addClass("current")}ready(function(){console.log("Page chargée"),chargeA(),initStripop("bandeA")}),$(".switch").on("click",function(n){var e=window.document,i=e.documentElement,t=i.requestFullscreen||i.mozRequestFullScreen||i.webkitRequestFullScreen||i.msRequestFullscreen,o=e.exitFullscreen||e.mozCancelFullScreen||e.webkitExitFullscreen||e.msExitFullscreen;e.fullscreenElement||e.webkitFullscreenElement||e.mozFullScreenElement||e.msFullscreenElement?o.call(e):t.call(i)});var btnMenu=$(".btn-menu"),menu=$(".menu"),closeMenu=$(".closeMenu"),AudioSwitcher=$(".slider"),menuClick=$(".chapter"),btnFinal=$(".boutonLLS");$(menuClick).click(function(){menu.removeClass("visible")}),$(btnFinal).click(function(){btnMenu.removeClass("scroll")}),$(".btn_play").click(function(){loadScreenAnim(),setTimeout("loadInterface(); chargeA(); initStripop('bandeA');",1500)});var choixA1=$(".choixA1"),choixA2=$(".choixA2"),choixA3=$(".choixA3"),choixB1=$(".choixB1"),choixB2=$(".choixB2"),choixC1=$(".choixC1"),choixC2=$(".choixC2"),choixC3=$(".choixC3"),choixD1=$(".choixD1"),choixD2=$(".choixD2"),choixD3=$(".choixD3"),tipA=$(".tipA"),nextBtn=$(".swiper-button-next");$(choixA1).click(function(){stripop.slideTo(14)}),$(choixA2).click(function(){stripop.slideTo(19)}),$(choixA3).click(function(){stripop.slideTo(24)}),$(choixB1).click(function(){stripop.slideTo(13)}),$(choixB2).click(function(){stripop.slideTo(31)}),$(choixC1).click(function(){stripop.slideTo(44)}),$(choixC2).click(function(){stripop.slideTo(38)}),$(choixC3).click(function(){stripop.slideTo(41)}),$(choixD1).click(function(){stripop.slideTo(47)}),$(choixD2).click(function(){stripop.slideTo(48)}),$(choixD3).click(function(){stripop.slideTo(10)}),$(tipA).click(function(){stripop.slideTo(29)});var initStripop=function(n){if("bandeA"==n){stripop=new Swiper(".bandeA",{effect:"fade",loop:!1,spaceBetween:0,hashNavigation:{replaceState:!1,watchState:!0},pagination:{el:".swiper-pagination",type:"progressbar"},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),stripop.on("slideChange",function(){var n=stripop.activeIndex,e=stripop.previousIndex,i=stripop.activeIndexSection,t=stripop.previousActiveIndexSection;!function(n){14==n?$(nextBtn).addClass("hidden"):19==n?$(nextBtn).click(function(){stripop.slideTo(30)}):24==n?$(nextBtn).click(function(){stripop.slideTo(30)}):29==n?$(nextBtn).click(function(){stripop.slideTo(30)}):31==n?($(nextBtn).unbind("click"),$(nextBtn).addClass("hidden")):38==n?$(nextBtn).addClass("hidden"):41==n?($(nextBtn).addClass("hidden"),$(nextBtn).click(function(){stripop.slideTo(47,0)})):44==n?($(nextBtn).addClass("hidden"),$(nextBtn).click(function(){stripop.slideTo(47,0)})):47==n&&($(nextBtn).addClass("hidden"),$(nextBtn).click(function(){stripop.slideTo(47,0)}))}(++n),function(n){14==n?$(nextBtn).removeClass("hidden"):19==n||(31==n?$(nextBtn).removeClass("hidden"):38==n?$(nextBtn).removeClass("hidden"):41==n?($(nextBtn).removeClass("hidden"),$(nextBtn).unbind("click")):44==n?($(nextBtn).removeClass("hidden"),$(nextBtn).unbind("click")):47==n&&($(nextBtn).removeClass("hidden"),$(nextBtn).unbind("click")))}(++e),function(n){var e=n;this.u==e||(this.u=e,this.u,console.log("SA+"+this.u))}(i),function(n){var e=n;this.v==e||(this.v=e,this.v,console.log("SA-"+this.v))}(t),console.log(n)});new Howl({src:["audio/A-02.mp3","audio/A-02.ogg"],preload:!0,loop:!1})}};