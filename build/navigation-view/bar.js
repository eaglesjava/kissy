/*
Copyright 2014, KISSY v5.0.0
MIT Licensed
build time: Jun 17 21:57
*/
KISSY.add("navigation-view/bar",["component/control","button","./bar/bar-xtpl"],function(l,m,p,o){function h(a){var b;b=a.clone(!0);b[0].id=a[0].id+"-proxy";a.parent().append(b);var d=a.offset();b.css("position","absolute");b.offset(d);b.css({width:a.css("width"),height:a.css("height")});return b}function g(a,b,d){a.animate(b,{duration:0.25,easing:"ease-in-out",complete:d})}function q(a,b,d,c){var e=a.get("el"),g=a.get("titleEl"),a=Math.min(e[0].offsetWidth/3,200),f=b[0].offsetWidth,b=e[0].offsetWidth,
e=g.offset().left-e.offset().left,g=g[0].offsetWidth,i=d.width,h;c?(d=-i,i=Math.min(e-i,a)):(i=-i,d=Math.min(e,a));a={element:{from:{transform:"translateX("+d+"px) translateZ(0)"},to:{transform:"translateX(0) translateZ(0)",opacity:1}},ghost:{to:{transform:"translateX("+i+"px) translateZ(0)",opacity:0}}};f=-e+f;g>e&&(h=-e-g);c?(i=b-e-g,d=void 0!==h?h:f):(i=void 0!==h?h:f,d=Math.max(0,b-e-g));return{back:a,title:{element:{from:{transform:"translateX("+d+"px) translateZ(0)"},to:{transform:"translateX(0) translateZ(0)",
opacity:1}},ghost:{to:{transform:"translateX("+i+"px) translateZ(0)",opacity:0}}}}}function j(){this.fire("backward")}function r(){this.get("navigationView").pop()}function f(a){this.set("title",a.newView.get("title")||"")}function k(a){var b=a.newView,d=a.backward;if(a.oldView)this[d?"backward":"forward"](b.get("title")||"")}var l=m("component/control"),n=m("button"),m=m("./bar/bar-xtpl");o.exports=l.extend({initializer:function(){this._withTitle=this.get("withTitle");this._stack=[];this.publish("backward",
{defaultFn:r,defaultTargetOnly:!0})},renderUI:function(){var a=this.get("prefixCls");this._buttons={};this.get("withBackButton")&&(this._backBtn=(new n({prefixCls:a+"navigation-bar-",elCls:a+"navigation-bar-backward",elBefore:this.get("contentEl")[0].firstChild,visible:!1,content:this.get("backText")})).render())},bindUI:function(){if(this._backBtn)this._backBtn.on("click",j,this);var a=this.get("navigationView");a.on("afterInnerViewChange",f,this);a.on("beforeInnerViewChange",k,this)},addButton:function(a,
b){var d=this.get("prefixCls");b.prefixCls=d+"navigation-bar-";!b.elBefore&&!b.render&&(d=b.align=b.align||"left","left"===d?b.elBefore=this.get("centerEl"):"right"===d&&(b.render=this.get("contentEl")),delete b.align);this._buttons[a]=(new n(b)).render();return this._buttons[a]},insertButtonBefore:function(a,b,d){b.elBefore=d.get("el");return this.addButton(a,b)},removeButton:function(a){this._buttons[a].destroy();delete this._buttons[a]},getButton:function(a){return this._buttons[a]},forward:function(a){this._stack.push(a);
this.go(a,!0)},go:function(a,b,d){var c=this,e=c._backBtn;if(!e||!c._withTitle){if(c._withTitle&&c.get("titleEl").html(a),e)e[b?"show":"hide"]()}else{var f=e.get("el");f.stop(!0);c.ghostBackEl&&c.ghostBackEl.stop(!0);var k={width:f[0].offsetWidth},i=h(f);c.ghostBackEl=i;f.css("opacity",0);e[b?"show":"hide"]();c.ghostBackEl&&c.ghostBackEl.stop(!0);b=q(c,f,k,d);f.css(b.back.element.from);e.get("visible")&&g(f,b.back.element.to);"none"!==i.css("display")?g(i,b.back.ghost.to,function(){i.remove();c.ghostBackEl=
null}):(i.remove(),c.ghostBackEl=null);e=c.get("titleEl");e.stop(!0);var j=h(e.parent());c.ghostTitleEl=j;e.css("opacity",0);c.set("title",a);e.css(b.title.element.from);g(e,b.title.element.to);g(j,b.title.ghost.to,function(){j.remove();c.ghostTitleEl=null})}},backward:function(a){this._stack.length&&(this._stack.pop(),this.go(a,this._stack.length,!0))},_onSetTitle:function(a){var b=this.get("titleEl");b&&b.html(a)},_onSetBackText:function(a){this._backBtn&&this._backBtn.set("content",a)}},{xclass:"navigation-bar",
ATTRS:{contentTpl:{value:m},handleGestureEvents:{value:!1},focusable:{value:!1},centerEl:{selector:function(){return"."+this.getBaseCssClass("center")}},contentEl:{selector:function(){return"."+this.getBaseCssClass("content")}},titleEl:{selector:function(){return"."+this.getBaseCssClass("title")}},title:{value:"",render:1,sync:0},withBackButton:{value:1},withTitle:{value:1,render:1,sync:0},backText:{value:"Back",render:1,sync:0}}})});
KISSY.add("navigation-view/bar/bar-xtpl",[],function(l,m,p,o){l=function(h,g,l){var j=this,m=j.root.utils.callFn,f=j.root.nativeCommands["if"];g.write("",0);var k={escape:1},n=[],a=h.resolve(["withTitle"],0);n.push(a);k.params=n;k.fn=function(a,d){d.write('\r\n<div class="',0);var c={escape:1},e=[];e.push("title-wrap");c.params=e;if((c=m(j,a,c,d,["getBaseCssClasses"],0,2))&&c.isBuffer)d=c,c=l;d.write(c,!0);d.write('">\r\n    <div class="',0);c={escape:1};e=[];e.push("title");c.params=e;if((c=m(j,
a,c,d,["getBaseCssClasses"],0,3))&&c.isBuffer)d=c,c=l;d.write(c,!0);d.write('">',0);c=a.resolve(["title"],0);d.write(c,!0);d.write("</div>\r\n</div>\r\n",0);return d};g=f.call(j,h,k,g,1);g.write('\r\n<div class="',0);f={escape:1};k=[];k.push("content");f.params=k;if((f=m(j,h,f,g,["getBaseCssClasses"],0,6))&&f.isBuffer)g=f,f=l;g.write(f,!0);g.write('">\r\n    <div class="',0);f={escape:1};k=[];k.push("center");f.params=k;if((h=m(j,h,f,g,["getBaseCssClasses"],0,7))&&h.isBuffer)g=h,h=l;g.write(h,!0);
g.write('"></div>\r\n</div>',0);return g};l.TPL_NAME=o.name;l.version="5.0.0";o.exports=l});