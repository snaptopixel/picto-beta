function t(t,e){return new RegExp("^"+e+"(\\/|\\?|#|$)","i").test(t)}function e(e,n){return t(e,n)?e.substr(n.length):e}function n(t){return"/"===t.charAt(t.length-1)?t.slice(0,-1):t}function r(t){return"/"===t.charAt(0)?t:"/"+t}function a(t){return"/"===t.charAt(0)?t.substr(1):t}function o(t){const{pathname:e,search:n,hash:r}=t;let a=e||"/";return n&&"?"!==n&&(a+="?"===n.charAt(0)?n:`?${n}`),r&&"#"!==r&&(a+="#"===r.charAt(0)?r:`#${r}`),a}function s(t){return"/"===t.charAt(0)}function i(t){return Math.random().toString(36).substr(2,t)}function c(t,e){for(let n=e,r=n+1,a=t.length;r<a;n+=1,r+=1)t[n]=t[r];t.pop()}function u(t,e){if(t===e)return!0;if(null==t||null==e)return!1;if(Array.isArray(t))return Array.isArray(e)&&t.length===e.length&&t.every(function(t,n){return u(t,e[n])});const n=typeof t;if(n!==typeof e)return!1;if("object"===n){const n=t.valueOf(),r=e.valueOf();if(n!==t||r!==e)return u(n,r);const a=Object.keys(t),o=Object.keys(e);return a.length===o.length&&a.every(function(n){return u(t[n],e[n])})}return!1}function h(t,e){return t.pathname===e.pathname&&t.search===e.search&&t.hash===e.hash&&t.key===e.key&&u(t.state,e.state)}function l(t,e,n,r){let a;"string"==typeof t?void 0!==(a=function(t){let e=t||"/",n="",r="";const a=e.indexOf("#");-1!==a&&(r=e.substr(a),e=e.substr(0,a));const o=e.indexOf("?");return-1!==o&&(n=e.substr(o),e=e.substr(0,o)),{pathname:e,search:"?"===n?"":n,hash:"#"===r?"":r,query:{},key:""}}(t)).state&&(a.state=e):((a=Object.assign({pathname:""},t)).search&&"?"!==a.search.charAt(0)&&(a.search="?"+a.search),a.hash&&"#"!==a.hash.charAt(0)&&(a.hash="#"+a.hash),void 0!==e&&void 0===a.state&&(a.state=e));try{a.pathname=decodeURI(a.pathname)}catch(t){throw t instanceof URIError?new URIError('Pathname "'+a.pathname+'" could not be decoded. This is likely caused by an invalid percent-encoding.'):t}var o;return a.key=n,r?a.pathname?"/"!==a.pathname.charAt(0)&&(a.pathname=function(t,e=""){const n=t&&t.split("/")||[];let r=e&&e.split("/")||[];const a=t&&s(t),o=e&&s(e),i=a||o;if(t&&s(t)?r=n:n.length&&(r.pop(),r=r.concat(n)),!r.length)return"/";let u;if(r.length){const t=r[r.length-1];u="."===t||".."===t||""===t}else u=!1;let h=0;for(let t=r.length;t>=0;t--){const e=r[t];"."===e?c(r,t):".."===e?(c(r,t),h++):h&&(c(r,t),h--)}if(!i)for(;h--;h)r.unshift("..");!i||""===r[0]||r[0]&&s(r[0])||r.unshift("");let l=r.join("/");return u&&"/"!==l.substr(-1)&&(l+="/"),l}(a.pathname,r.pathname)):a.pathname=r.pathname:a.pathname||(a.pathname="/"),a.query=(o=a.search||"")?(/^[?#]/.test(o)?o.slice(1):o).split("&").reduce((t,e)=>{let[n,r]=e.split("=");return t[n]=r?decodeURIComponent(r.replace(/\+/g," ")):"",t},{}):{},a}function f(t,e){for(var n,r,a=null,o=!1,s=!1,i=arguments.length;i-- >2;)v.push(arguments[i]);for(;v.length>0;){var c=v.pop();if(c&&void 0!==c.pop)for(i=c.length;i--;)v.push(c[i]);else"boolean"==typeof c&&(c=null),(s="function"!=typeof t)&&(null==c?c="":"number"==typeof c?c=String(c):"string"!=typeof c&&(s=!1)),s&&o?a[a.length-1].vtext+=c:null===a?a=[s?{vtext:c}:c]:a.push(s?{vtext:c}:c),o=s}if(null!=e){if(e.className&&(e.class=e.className),"object"==typeof e.class){for(i in e.class)e.class[i]&&v.push(i);e.class=v.join(" "),v.length=0}null!=e.key&&(n=e.key),null!=e.name&&(r=e.name)}return"function"==typeof t?t(e,a||[],y):{vtag:t,vchildren:a,vtext:void 0,vattrs:e,vkey:n,vname:r,w:void 0,g:!1}}function p(t){return{vtag:t.vtag,vchildren:t.vchildren,vtext:t.vtext,vattrs:t.vattrs,vkey:t.vkey,vname:t.vname}}window,Object.setPrototypeOf||Array;var v=[],y={forEach:function(t,e){t.forEach(function(t,n,r){return e(p(t),n,r)})},map:function(t,e){return t.map(function(t,n,r){return function(t){return{vtag:t.vtag,vchildren:t.vchildren,vtext:t.vtext,vattrs:t.vattrs,vkey:t.vkey,vname:t.vname}}(e(p(t),n,r))})}};function d(t,e){return f("context-consumer",{subscribe:t,renderer:e})}var m=function(t,e){void 0===e&&(e=d);var n=new Map,r={historyType:"browser",location:{pathname:"",query:{},key:""},titleSuffix:"",root:"/",routeViewsUpdated:()=>{}};function a(t,e){Array.isArray(t)?t.slice().forEach(function(t){e[t]=r[t]}):e[t]=Object.assign({},r),e.forceUpdate()}function o(t){return function(e){n.has(e)||(n.set(e,t),a(t,e))}}function s(t,e){return o(e)(t),function(){n.delete(t)}}return{Provider:function(t,e){return r=t.state,n.forEach(a),e},Consumer:function(t,n){return e(s,n[0])},wrapConsumer:function(t,e){var n=t.is;return function(t){var r=t.children,a=function(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(t);a<r.length;a++)e.indexOf(r[a])<0&&(n[r[a]]=t[r[a]])}return n}(t,["children"]);return f(n,Object.assign({ref:o(e)},a),r)}},injectProps:function(t,e){var n=null,r=Object.keys(t.properties).find(function(e){return 1==t.properties[e].elementRef});if(null==r)throw new Error("Please ensure that your Component "+t.is+' has an attribute with an "@Element" decorator. This is required to be able to inject properties.');var a=t.prototype.componentWillLoad;t.prototype.componentWillLoad=function(){if(n=s(this[r],e),a)return a.bind(this)()};var o=t.prototype.componentDidUnload;t.prototype.componentDidUnload=function(){if(n(),o)return o.bind(this)()}}}}();export{l as a,i as b,r as c,n as d,t as e,e as f,o as g,h,a as i,m as j,u as k};