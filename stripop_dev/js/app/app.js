function ready(callback){
// in case the document is already rendered
if (document.readyState!='loading') callback();
// modern browsers
else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
// IE <= 8
else document.attachEvent('onreadystatechange', function(){
  if (document.readyState=='complete') callback();
});
}

ready(function(){
  console.log('Ready !')
  // $(".swiper-button-next, .swiper-button-prev, .swiper-pagination, .swiper-scrollbar,.ADbutton,.btn-menu").removeClass("intro");
  chargeA();
  initStripop('strip-A');
});

//Bouton de passage fullscreen--normal
$('.switch').on('click', function(e){
  var doc = window.document;
  var docEl = doc.documentElement;
  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
  var isFullScreen  = doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement;
  if (isFullScreen) {
    cancelFullScreen.call(doc);
  }
  else {
    requestFullScreen.call(docEl);
  }
});


// MENU

function chargeA() {
  $(".swiper-container").removeClass("current");
  $(".strip-A").addClass( "current" );
};


// STORY  -  Strip-A

var initStripop = function(bande) {

  if (bande == 'strip-A') {

// Initialise swiper
stripop = new Swiper(".strip-A", {
  slidesPerView: 'auto',
  centeredSlides: true,
  spaceBetween: 0,
  parallax:true,
  freeMode: true,
  // // history: {
  // //   key: 'slide',
  // },
      hashNavigation: {
        replaceState: false,
        watchState: true,
      },
  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
    });




// STRIPOP A
// DECLANCHEMENT DES EVENEMENTS
// ECOUTEUR GLOBAL
stripop.on('slideChange', function () {
  caseIndex
  var caseIndex = stripop.activeIndex
  var casePrev = stripop.previousIndex
  var sectionIndex = stripop.activeIndexSection
  var sectionPrev = stripop.previousActiveIndexSection
  caseON(++caseIndex)
  caseOFF(++casePrev)
  sectionON(sectionIndex)
  sectionOFF(sectionPrev)
  console.log(caseIndex)
// DEBUGGER
document.getElementById('caseID').value="Case : " + caseIndex;
document.getElementById('sectionID').value="Section : " + sectionIndex;
})

// CONDITIONS
// liste des fonction ON
// STRIPOP A
function caseON(ca) {

  if (ca == 14){ // choix A
    $(nextBtn).addClass("hidden")

  } else if (ca == 19){ // fin branche choix A1
    $(nextBtn).click(function () {
      stripop.slideTo(30);
    })
  } else if (ca == 24){ // fin branche choix A2
    $(nextBtn).click(function () {
      stripop.slideTo(30);
    })
  } else if (ca == 29){ // fin branche choix A3
    $(nextBtn).click(function () {
      stripop.slideTo(30);
    })
  } else if (ca == 31){ // choix A => partie 2 et choix B
    $(nextBtn).unbind( "click" );
    $(nextBtn).addClass("hidden")

  } else if (ca == 38){ // choix C
    $(nextBtn).addClass("hidden")

  } else if (ca == 41){ // fin branche choix C1
    $(nextBtn).addClass("hidden")
    $(nextBtn).click(function () {
      stripop.slideTo(47,0);
    })

  } else if (ca == 44){ // fin branche choix C2
    $(nextBtn).addClass("hidden")
    $(nextBtn).click(function () {
      stripop.slideTo(47,0);
    })

  } else if (ca == 47){ // fin branche choix C3
    $(nextBtn).addClass("hidden")
    $(nextBtn).click(function () {
      stripop.slideTo(47,0);
    })

  } else if (ca == 48){ // quoi d'autre?

  }
}
// STRIPOP A
function caseOFF(cp) {

}
// LISTE DES FONCTIONS CASES, ON & OFF
// déclare les cases pour plus de rapidité

// écrire les actio pour chaque case ON et OFF

// STRIPOP A (cases)
function case02_ON() {
  if (audioD) { audioA01.play(); }
}

//
//
// ECOUTEUR > SECTIONS
//
// ne rien écrire
// STRIPOP A
function sectionON (sa) {
  var newVal = sa
  var etat
  var u = 0
  if (this.u == newVal) {
//console.log("u pareil que newVal, alors rien")
} else {
  this.u = newVal
  launchActiveSectionEv(this.u)
  console.log("SA+" + this.u)
}
return
}
function sectionOFF(sp) {
  var newVal = sp
  var etat
  var v = 0
  if (this.v == newVal) {
//console.log("v pareil que newVal, alors rien" + this.v)
} else {
  this.v = newVal
  launchPreviousSectionEv(this.v)
  console.log("SA-" + this.v)
}
return


}

// CONDITIONS
// déclarer les fonctions ON
function launchActiveSectionEv (newActiv) {

}

// déclarer les fonctions OFF
function launchPreviousSectionEv (newPrev) {

}



// STRIPOP A
// écrire les fonctio ON & OFF




// STRIPOP A
// LES SONS
var audioA01 = new Howl({
  src: ['audio/A-02.mp3', 'audio/A-02.ogg'],
  preload: true,
  loop: false,
});




}// end bande A
}//init
