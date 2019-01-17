const t=window.picto.h;import{a as e,b as s,c as n,d as i}from"./chunk-a05410b6.js";var r,o,a,l=n(function(t){!function(){var e={}.hasOwnProperty;function s(){for(var t=[],n=0;n<arguments.length;n++){var i=arguments[n];if(i){var r=typeof i;if("string"===r||"number"===r)t.push(i);else if(Array.isArray(i)&&i.length){var o=s.apply(null,i);o&&t.push(o)}else if("object"===r)for(var a in i)e.call(i,a)&&i[a]&&t.push(a)}}return t.join(" ")}t.exports?(s.default=s,t.exports=s):window.classNames=s}()});!function(t){var e,s;t.previewCard=l("card-content",i`
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      background-color: white;
      ${e=20,s="rgba(0, 0, 0, .05)",i`
    background-image: ${[`linear-gradient(45deg, ${s} 25%, transparent 25%, transparent 75%, ${s} 75%, ${s})`,`linear-gradient(45deg, ${s} 25%, transparent 25%, transparent 75%, ${s} 75%, ${s})`].join(", ")};
    background-size: ${e}px ${e}px;
    background-position: 0 0, ${e/2}px ${e/2}px;
  `};
    `),t.sourceCard=l("card-content",i`
      .hljs {
        margin: -1.5rem;
      }
    `),t.eventsCard=l("card-content",i`
      height: 200px;
      th {
        position: relative;
      }
      td {
        padding: '0';
        vertical-align: 'middle';
      }
      td:first-of-type {
        padding-left: 0.5rem;
        width: 25%;
      }
      .hljs {
        padding: 0.5rem !important;
      }
    `),t.footerItem=l("card-footer-item","is-size-7",i`
      font-weight: bold;
      padding: 0.3rem !important;
      &.is-selected {
        box-shadow: 0 1px inset;
      }
    `),t.footerTag=l("tag","is-link","is-rounded","is-outlined",i`
      margin-left: 0.5rem;
      font-size: 0.65rem;
      font-weight: bold;
      line-height: 1;
      &:empty {
        display: none !important;
      }
    `)}(r||(r={}));class c{constructor(){this.state="preview",this.events=[],this.viewedEventsCount=0}get eventCount(){return"events"===this.state||this.events.length<=this.viewedEventsCount?null:this.events.length-this.viewedEventsCount}setState(t,e){e.preventDefault(),"events"===t&&(this.viewedEventsCount=this.events.length),this.state=t}handleEvent(t){this.events=[...this.events,t]}componentWillLoad(){this.source=unescape(this.source)}render(){return[t("picto-styled",null,t("div",{class:"card"},t("div",{class:r.previewCard,style:{display:"preview"===this.state?null:"none"}},t("div",{innerHTML:this.source,"no-style":!0})),t("div",{class:r.sourceCard,style:{display:"source"===this.state?null:"none"}},t("picto-code",{source:this.source,lang:"html"})),t("picto-scrollarea",{class:r.eventsCard,style:{display:"events"===this.state?"block":"none"}},t("picto-preview-events",{events:[{name:"foo",value:{foo:"bar"}},{name:"bar",value:1},{name:"baz",value:!0},{name:"foo",value:{foo:"bar"}},{name:"bar",value:1},{name:"baz",value:!0},{name:"foo",value:{foo:"bar"}},{name:"bar",value:1},{name:"baz",value:!0}]})),t("footer",{class:"card-footer"},t("a",{class:{[r.footerItem]:!0,"is-selected":"preview"===this.state},href:"",onClick:this.setState.bind(this,"preview")},t("span",null,t("picto-icon",{name:"paint-roller"}),"Preview")),t("a",{class:{[r.footerItem]:!0,"is-selected":"source"===this.state},href:"",onClick:this.setState.bind(this,"source")},t("span",null,t("picto-icon",{name:"code"}),"Source")),t("a",{class:{[r.footerItem]:!0,"is-selected":"events"===this.state},href:"",onClick:this.setState.bind(this,"events")},t("span",null,t("picto-icon",{name:"broadcast-tower"}),"Events"),t("span",{class:r.footerTag},this.eventCount)))))]}static get is(){return"picto-preview"}static get properties(){return{el:{elementRef:!0},events:{state:!0},source:{type:String,attr:"source",mutable:!0},state:{state:!0}}}}!function(t){t.table=l("table",i`
      width: 100%;
      td {
        padding: 0;
        vertical-align: middle;
      }
      td:first-of-type {
        padding-left: 0.5rem;
        width: 25%;
      }
      .hljs {
        margin: -0.5rem;
      }
    `),t.tip=l("has-text-info","has-text-grey-light",i`
      position: absolute;
      margin-top: -0.5em;
    `)}(o||(o={}));class p{render(){return[t("picto-styled",null,t("table",{class:o.table},t("tr",null,t("th",null,"Event"),t("th",null,"Detail"," ",t("a",{title:"Check dev console for more info"},t("picto-icon",{class:o.tip,name:"info-circle"})))),this.events.map(e=>t("tr",null,t("td",null,e.name),t("td",null,t("picto-code",{source:JSON.stringify(e.value),lang:"js"}))))))]}static get is(){return"picto-preview-events"}static get properties(){return{events:{type:"Any",attr:"events"}}}}!function(t){const e=i`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  `,s=t=>i`
    content: '';
    opacity: 0;
    transition: opacity linear 100ms;
    position: absolute;
    width: 100%;
    height: 10px;
    ${t}: 0;
    background: linear-gradient(
      to ${t},
      transparent,
      rgba(0, 0, 0, 0.1)
    );
    [scroll-${t}] & {
      opacity: 1;
    }
  `;t.component=i`
    display: block;
    position: relative;
  `,t.content=i`
    ${e};
    overflow: auto;
  `,t.overlay=i`
    pointer-events: none;
    ${e};
    &:before {
      ${s("top")};
    }
    &:after {
      ${s("bottom")};
    }
  `}(a||(a={}));class d{constructor(){this.scrollListener=(()=>{requestAnimationFrame(this.trackScrolling)}),this.trackScrolling=(()=>{const t=this.scrollEl.scrollTop,e=this.scrollEl.clientHeight,s=this.scrollEl.scrollHeight;this.setAttr("scroll-top",t>0),this.setAttr("scroll-bottom",s-t!==e)})}setAttr(t,e){e?this.el.setAttribute(t,""):this.el.removeAttribute(t)}componentDidLoad(){this.trackScrolling()}hostData(){return{class:a.component}}render(){return[t("div",{ref:t=>this.scrollEl=t,onScroll:this.scrollListener,class:a.content},t("slot",null)),t("div",{class:a.overlay})]}static get is(){return"picto-scrollarea"}static get properties(){return{el:{elementRef:!0}}}}export{c as PictoPreview,p as PictoPreviewEvents,d as PictoScrollarea};