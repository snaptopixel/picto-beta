const t=window.picto.h;import{a as e,b as o}from"./chunk-5ce30e48.js";import{a as n}from"./chunk-5f7fd877.js";var s=function(t,e,o,n){return new(o||(o=Promise))(function(s,r){function i(t){try{a(n.next(t))}catch(t){r(t)}}function c(t){try{a(n.throw(t))}catch(t){r(t)}}function a(t){t.done?s(t.value):new o(function(e){e(t.value)}).then(i,c)}a((n=n.apply(t,e||[])).next())})};class r{constructor(){this.group=null,this.match=null,this.componentProps={},this.exact=!1,this.scrollOnNextRender=!1,this.previousMatch=null}computeMatch(t){const o=null!=this.group||null!=this.el.parentElement&&"stencil-route-switch"===this.el.parentElement.tagName.toLowerCase();if(t&&!o)return this.previousMatch=this.match,this.match=e(t.pathname,{path:this.url,exact:this.exact,strict:!0})}loadCompleted(){return s(this,void 0,void 0,function*(){let t={};this.history&&this.history.location.hash?t={scrollToId:this.history.location.hash.substr(1)}:this.scrollTopOffset&&(t={scrollTopOffset:this.scrollTopOffset}),"function"==typeof this.componentUpdated?this.componentUpdated(t):this.match&&!o(this.match,this.previousMatch)&&this.routeViewsUpdated&&this.routeViewsUpdated(t)})}componentDidUpdate(){return s(this,void 0,void 0,function*(){yield this.loadCompleted()})}componentDidLoad(){return s(this,void 0,void 0,function*(){yield this.loadCompleted()})}render(){if(!this.match||!this.history)return null;const e=Object.assign({},this.componentProps,{history:this.history,match:this.match});return this.routeRender?this.routeRender(Object.assign({},e,{component:this.component})):this.component?t(this.component,Object.assign({},e)):void 0}static get is(){return"stencil-route"}static get properties(){return{component:{type:String,attr:"component"},componentProps:{type:"Any",attr:"component-props"},componentUpdated:{type:"Any",attr:"component-updated"},el:{elementRef:!0},exact:{type:Boolean,attr:"exact"},group:{type:String,attr:"group",reflectToAttr:!0},history:{type:"Any",attr:"history"},historyType:{type:String,attr:"history-type"},location:{type:"Any",attr:"location",watchCallbacks:["computeMatch"]},match:{type:"Any",attr:"match",mutable:!0},routeRender:{type:"Any",attr:"route-render"},routeViewsUpdated:{type:"Any",attr:"route-views-updated"},scrollTopOffset:{type:Number,attr:"scroll-top-offset"},url:{type:String,attr:"url"}}}static get style(){return"stencil-route.inactive{display:none}"}}n.injectProps(r,["location","history","historyType","routeViewsUpdated"]);export{r as StencilRoute};