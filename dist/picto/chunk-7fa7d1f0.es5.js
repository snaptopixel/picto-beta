picto.loadBundle("chunk-7fa7d1f0.js",["exports"],function(e){window;var n=!("undefined"==typeof window||!window.document||!window.document.createElement);e.storageAvailable=function(e){var n=window[e],t="__storage_test__";try{return n.setItem(t,t),n.removeItem(t),!0}catch(e){return e instanceof DOMException&&(22===e.code||1014===e.code||"QuotaExceededError"===e.name||"NS_ERROR_DOM_QUOTA_REACHED"===e.name)&&0!==n.length}},e.canUseDOM=n,e.addEventListener=function(e,n,t){return e.addEventListener?e.addEventListener(n,t,!1):e.attachEvent("on"+n,t)},e.removeEventListener=function(e,n,t){return e.removeEventListener?e.removeEventListener(n,t,!1):e.detachEvent("on"+n,t)},e.getConfirmation=function(e,n){return n(window.confirm(e))},e.supportsHistory=function(){var e=window.navigator.userAgent;return(-1===e.indexOf("Android 2.")&&-1===e.indexOf("Android 4.0")||-1===e.indexOf("Mobile Safari")||-1!==e.indexOf("Chrome")||-1!==e.indexOf("Windows Phone"))&&window.history&&"pushState"in window.history},e.supportsPopStateOnHashChange=function(){return-1===window.navigator.userAgent.indexOf("Trident")},e.isExtraneousPopstateEvent=function(e){return void 0===e.state&&-1===navigator.userAgent.indexOf("CriOS")},e.supportsGoWithoutReloadUsingHash=function(){return-1===window.navigator.userAgent.indexOf("Firefox")},e.isModifiedEvent=function(e){return e.metaKey||e.altKey||e.ctrlKey||e.shiftKey}});