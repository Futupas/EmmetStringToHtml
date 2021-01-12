(()=>{"use strict";var t={797:function(t,r,e){var n,i=this&&this.__extends||(n=function(t,r){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&(t[e]=r[e])})(t,r)},function(t,r){function e(){this.constructor=t}n(t,r),t.prototype=null===r?Object.create(r):(e.prototype=r.prototype,new e)});Object.defineProperty(r,"__esModule",{value:!0}),r.makePseudoHtml=void 0;var o=e(314);function s(t){var r=function(t){for(var r=[],e="+",n=a(t);!1!==n&&t.length>0;){var i=e+t.substring(0,n);r.push(i),e=t.charAt(n),n=a(t=t.substring(n+1))}return r.push(e+t),r}(t),e=new o.PseudoHTML("PSEUDO_PARENT",void 0);e.parent=e;for(var n=e,i=0,c=r;i<c.length;i++){var h=c[i],f=n.parent;if(h.startsWith(">"))f=n,h="+"+h.substring(1);else if(h.startsWith("^")){for(;h.startsWith("^");)f=(n=n.parent).parent,h=h.substring(1);if(""===h)continue;h="+"+h}if(!h.startsWith("+"))throw new u("Incorrect first symbol");if("("===h.charAt(1)){var p=s(h.substring(2,h.length-1));if(p.length<1)throw new u("Error parsing with brackets (I guess, it's because of there are empty brackets)");n=p[0];for(var l=0,v=p;l<v.length;l++){var d=v[l];d.parent=f,f.children.push(d)}}else{var g=new o.PseudoHTML(h.substring(1),f);f.children.push(g),n=g}}for(var b=0,_=e.children;b<_.length;b++)_[b].parent=void 0;return e.children}function a(t){var r=0;if(t.startsWith("(")||t.startsWith("{"))for(var e=0,n=!1,i=0;i<t.length;i-=-1)if("{"===t.charAt(i)&&(n=!0),"}"===t.charAt(i)&&(n=!1),"("!==t.charAt(i)||n||e++,")"!==t.charAt(i)||n||e--,0===e){r=i+1,t=t.substring(i+1);break}var o=t.indexOf("+"),s=t.indexOf(">"),a=t.indexOf("^");return(-1!==o||-1!==s||-1!==a)&&(-1===o&&(o=Math.max(s,a)),-1===s&&(s=Math.max(o,a)),-1===a&&(a=Math.max(o,s)),Math.min(o,s,a)+r)}r.makePseudoHtml=function(t){return s(t)};var u=function(t){function r(){return null!==t&&t.apply(this,arguments)||this}return i(r,t),r}(Error)},105:(t,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.prepareString=void 0,r.prepareString=function(t){return t}},314:(t,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.PseudoHTML=void 0;r.PseudoHTML=function(t,r){this.tag=t,this.parent=r,this.children=[]}},607:(t,r,e)=>{e(797),e(105)}},r={};!function e(n){if(r[n])return r[n].exports;var i=r[n]={exports:{}};return t[n].call(i.exports,i,i.exports,e),i.exports}(607)})();