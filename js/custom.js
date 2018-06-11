jQuery(document).ready(function( $ ) {
  // Load standard blocks
  $('#navigation').load('navigation.html',function() {
      var activePage = window.location.href.split('/').pop().split(/[-.]+/).shift(),
        activeSection = $(this).data('active') || activePage;
      if (activeSection) {
        var nav = $('[data-section^="' + activeSection + '"]');
        nav.addClass('main-active');
      }
  });
  $('#footer').load('footer.html');	
  $('#subscribe').load('subscribe.html', function() {
    initValidation($);
  });
  
  addItemsLabels($);
  // Add zoom to product images 
  $('img[src^="images/products"]').filter(function() {return !$(this).parent().is('a')}).attr('data-action', 'zoom');

 // Add zoom to services images 
  $('img[src^="images/services"]').filter(function() {return !$(this).parent().is('a')}).attr('data-action', 'zoom');

 // Add zoom to workshops images 
  $('img[src^="images/workshops"]').filter(function() {return !$(this).parent().is('a')}).attr('data-action', 'zoom');

  // Back to top button
  $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
          $('.back-to-top').fadeIn('slow');
      } else {
          $('.back-to-top').fadeOut('slow');
      }
  });
  
  $('.back-to-top').click(function(){
      $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
      return false;
  });
  var productInfo = $(".product-info");
  productInfo.stick_in_parent({offset_top: 163});
});

function addItemsLabels($) {
  var activePage = window.location.href.split('/').pop().split(/[-.]+/),
    section = activePage[0] || '',
    pageId = activePage[1] || '',
    items = [];
  $.getJSON('items.json', function(data) {
      if (section in data) {
        items = data[section] || [];
        var item = items.filter(function(v) { return v.id && v.id === pageId; }).shift();
        if (item) {
          showItemLabels($, item);
        }
      } else {
        var addIcon = function (item) {
          var image = $('a[href^="' + dataSection + '-' + item.id + '"]').parent('.img-prod-container');
          if (image.length && item.icon) {
            image.addClass(item.icon.trim().toLowerCase() + '-icon');
          }
        };
        for (var dataSection in data) {
          items = data[dataSection] || [];
          items.map(addIcon);
        }
      }
  });

  function showItemLabels($, item) {
    var caption = $('h1.caption-product');
    var labels = $('<div/>', { class: "labels" });
    if (item.icon) {
      labels.append($('<i/>', { class: 'icon icon-' + item.icon.trim().toLowerCase() }));
    }
    if (item.discount) {
      labels.append($('<span/>', { html: item.discount, class: 'label label-sale' }));
    }
    if (item.icon || item.discount) {
      labels.appendTo(caption);
    }
    var captionPrice = $('h1.caption-price');
    if (item.discounted_price && item.price) {
      captionPrice.html('<del>' + captionPrice.text() + '</del>' + item.discounted_price);
      captionPrice.addClass('sale');
    }
    
  }
}

//  Google analysis
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-105383658-1', 'auto');
  ga('send', 'pageview');

//  Google analysis
                                    
/**
 * zoom.js - It's the best way to zoom an image
 * @version v0.0.2
 * @link https://github.com/fat/zoom.js
 * @license MIT
 */

+function(t){"use strict";function o(){this._activeZoom=this._initialScrollPosition=this._initialTouchPosition=this._touchMoveListener=null,this._$document=t(document),this._$window=t(window),this._$body=t(document.body),this._boundClick=t.proxy(this._clickHandler,this)}function i(o){this._fullHeight=this._fullWidth=this._overlay=this._targetImageWrap=null,this._targetImage=o,this._$body=t(document.body)}o.prototype.listen=function(){this._$body.on("click",'[data-action="zoom"]',t.proxy(this._zoom,this))},o.prototype._zoom=function(o){var e=o.target;if(e&&"IMG"==e.tagName&&!this._$body.hasClass("zoom-overlay-open"))return o.metaKey||o.ctrlKey?window.open(o.target.getAttribute("data-original")||o.target.src,"_blank"):void(e.width>=t(window).width()-i.OFFSET||(this._activeZoomClose(!0),this._activeZoom=new i(e),this._activeZoom.zoomImage(),this._$window.on("scroll.zoom",t.proxy(this._scrollHandler,this)),this._$document.on("keyup.zoom",t.proxy(this._keyHandler,this)),this._$document.on("touchstart.zoom",t.proxy(this._touchStart,this)),document.addEventListener?document.addEventListener("click",this._boundClick,!0):document.attachEvent("onclick",this._boundClick,!0),"bubbles"in o?o.bubbles&&o.stopPropagation():o.cancelBubble=!0))},o.prototype._activeZoomClose=function(t){this._activeZoom&&(t?this._activeZoom.dispose():this._activeZoom.close(),this._$window.off(".zoom"),this._$document.off(".zoom"),document.removeEventListener("click",this._boundClick,!0),this._activeZoom=null)},o.prototype._scrollHandler=function(o){null===this._initialScrollPosition&&(this._initialScrollPosition=t(window).scrollTop());var i=this._initialScrollPosition-t(window).scrollTop();Math.abs(i)>=40&&this._activeZoomClose()},o.prototype._keyHandler=function(t){27==t.keyCode&&this._activeZoomClose()},o.prototype._clickHandler=function(t){t.preventDefault?t.preventDefault():event.returnValue=!1,"bubbles"in t?t.bubbles&&t.stopPropagation():t.cancelBubble=!0,this._activeZoomClose()},o.prototype._touchStart=function(o){this._initialTouchPosition=o.touches[0].pageY,t(o.target).on("touchmove.zoom",t.proxy(this._touchMove,this))},o.prototype._touchMove=function(o){Math.abs(o.touches[0].pageY-this._initialTouchPosition)>10&&(this._activeZoomClose(),t(o.target).off("touchmove.zoom"))},i.OFFSET=80,i._MAX_WIDTH=2560,i._MAX_HEIGHT=4096,i.prototype.zoomImage=function(){var o=document.createElement("img");o.onload=t.proxy(function(){this._fullHeight=Number(o.height),this._fullWidth=Number(o.width),this._zoomOriginal()},this),o.src=this._targetImage.src},i.prototype._zoomOriginal=function(){this._targetImageWrap=document.createElement("div"),this._targetImageWrap.className="zoom-img-wrap",this._targetImage.parentNode.insertBefore(this._targetImageWrap,this._targetImage),this._targetImageWrap.appendChild(this._targetImage),t(this._targetImage).addClass("zoom-img").attr("data-action","zoom-out"),this._overlay=document.createElement("div"),this._overlay.className="zoom-overlay",document.body.appendChild(this._overlay),this._calculateZoom(),this._triggerAnimation()},i.prototype._calculateZoom=function(){this._targetImage.offsetWidth;var o=this._fullWidth,e=this._fullHeight,a=(t(window).scrollTop(),o/this._targetImage.width),s=t(window).height()-i.OFFSET,r=t(window).width()-i.OFFSET,n=o/e,h=r/s;this._imgScaleFactor=r>o&&s>e?a:h>n?s/e*a:r/o*a},i.prototype._triggerAnimation=function(){this._targetImage.offsetWidth;var o=t(this._targetImage).offset(),i=t(window).scrollTop(),e=i+t(window).height()/2,a=t(window).width()/2,s=o.top+this._targetImage.height/2,r=o.left+this._targetImage.width/2;this._translateY=e-s,this._translateX=a-r;var n="scale("+this._imgScaleFactor+")",h="translate("+this._translateX+"px, "+this._translateY+"px)";t.support.transition&&(h+=" translateZ(0)"),t(this._targetImage).css({"-webkit-transform":n,"-ms-transform":n,transform:n}),t(this._targetImageWrap).css({"-webkit-transform":h,"-ms-transform":h,transform:h}),this._$body.addClass("zoom-overlay-open")},i.prototype.close=function(){return this._$body.removeClass("zoom-overlay-open").addClass("zoom-overlay-transitioning"),t(this._targetImage).css({"-webkit-transform":"","-ms-transform":"",transform:""}),t(this._targetImageWrap).css({"-webkit-transform":"","-ms-transform":"",transform:""}),t.support.transition?void t(this._targetImage).one(t.support.transition.end,t.proxy(this.dispose,this)).emulateTransitionEnd(300):this.dispose()},i.prototype.dispose=function(){this._targetImageWrap&&this._targetImageWrap.parentNode&&(t(this._targetImage).removeClass("zoom-img").attr("data-action","zoom"),this._targetImageWrap.parentNode.replaceChild(this._targetImage,this._targetImageWrap),this._overlay.parentNode.removeChild(this._overlay),this._$body.removeClass("zoom-overlay-transitioning"))},t(function(){(new o).listen()})}(jQuery);

/*
 Sticky-kit v1.1.3 | MIT | Leaf Corcoran 2015 | http://leafo.net
*/
(function(){var c,f;c=window.jQuery;f=c(window);c.fn.stick_in_parent=function(b){var A,w,J,n,B,K,p,q,L,k,E,t;null==b&&(b={});t=b.sticky_class;B=b.inner_scrolling;E=b.recalc_every;k=b.parent;q=b.offset_top;p=b.spacer;w=b.bottoming;null==q&&(q=0);null==k&&(k=void 0);null==B&&(B=!0);null==t&&(t="is_stuck");A=c(document);null==w&&(w=!0);L=function(a){var b;return window.getComputedStyle?(a=window.getComputedStyle(a[0]),b=parseFloat(a.getPropertyValue("width"))+parseFloat(a.getPropertyValue("margin-left"))+
parseFloat(a.getPropertyValue("margin-right")),"border-box"!==a.getPropertyValue("box-sizing")&&(b+=parseFloat(a.getPropertyValue("border-left-width"))+parseFloat(a.getPropertyValue("border-right-width"))+parseFloat(a.getPropertyValue("padding-left"))+parseFloat(a.getPropertyValue("padding-right"))),b):a.outerWidth(!0)};J=function(a,b,n,C,F,u,r,G){var v,H,m,D,I,d,g,x,y,z,h,l;if(!a.data("sticky_kit")){a.data("sticky_kit",!0);I=A.height();g=a.parent();null!=k&&(g=g.closest(k));if(!g.length)throw"failed to find stick parent";
v=m=!1;(h=null!=p?p&&a.closest(p):c("<div />"))&&h.css("position",a.css("position"));x=function(){var d,f,e;if(!G&&(I=A.height(),d=parseInt(g.css("border-top-width"),10),f=parseInt(g.css("padding-top"),10),b=parseInt(g.css("padding-bottom"),10),n=g.offset().top+d+f,C=g.height(),m&&(v=m=!1,null==p&&(a.insertAfter(h),h.detach()),a.css({position:"",top:"",width:"",bottom:""}).removeClass(t),e=!0),F=a.offset().top-(parseInt(a.css("margin-top"),10)||0)-q,u=a.outerHeight(!0),r=a.css("float"),h&&h.css({width:L(a),
height:u,display:a.css("display"),"vertical-align":a.css("vertical-align"),"float":r}),e))return l()};x();if(u!==C)return D=void 0,d=q,z=E,l=function(){var c,l,e,k;if(!G&&(e=!1,null!=z&&(--z,0>=z&&(z=E,x(),e=!0)),e||A.height()===I||x(),e=f.scrollTop(),null!=D&&(l=e-D),D=e,m?(w&&(k=e+u+d>C+n,v&&!k&&(v=!1,a.css({position:"fixed",bottom:"",top:d}).trigger("sticky_kit:unbottom"))),e<F&&(m=!1,d=q,null==p&&("left"!==r&&"right"!==r||a.insertAfter(h),h.detach()),c={position:"",width:"",top:""},a.css(c).removeClass(t).trigger("sticky_kit:unstick")),
B&&(c=f.height(),u+q>c&&!v&&(d-=l,d=Math.max(c-u,d),d=Math.min(q,d),m&&a.css({top:d+"px"})))):e>F&&(m=!0,c={position:"fixed",top:d},c.width="border-box"===a.css("box-sizing")?a.outerWidth()+"px":a.width()+"px",a.css(c).addClass(t),null==p&&(a.after(h),"left"!==r&&"right"!==r||h.append(a)),a.trigger("sticky_kit:stick")),m&&w&&(null==k&&(k=e+u+d>C+n),!v&&k)))return v=!0,"static"===g.css("position")&&g.css({position:"relative"}),a.css({position:"absolute",bottom:b,top:"auto"}).trigger("sticky_kit:bottom")},
y=function(){x();return l()},H=function(){G=!0;f.off("touchmove",l);f.off("scroll",l);f.off("resize",y);c(document.body).off("sticky_kit:recalc",y);a.off("sticky_kit:detach",H);a.removeData("sticky_kit");a.css({position:"",bottom:"",top:"",width:""});g.position("position","");if(m)return null==p&&("left"!==r&&"right"!==r||a.insertAfter(h),h.remove()),a.removeClass(t)},f.on("touchmove",l),f.on("scroll",l),f.on("resize",y),c(document.body).on("sticky_kit:recalc",y),a.on("sticky_kit:detach",H),setTimeout(l,
0)}};n=0;for(K=this.length;n<K;n++)b=this[n],J(c(b));return this}}).call(this);
