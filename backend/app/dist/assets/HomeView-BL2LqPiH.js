import{B as F,R as K,s as M,a as B}from"./button.esm-CXC3oxQD.js";import{D as u,m as d,r as C,o as c,c as m,a as l,F as y,b as L,w as g,d as k,n as N,e as x,f as T,t as h,_ as $,g as A,h as O,i as _,j as v,k as w,l as P,p as E,q as H}from"./index-DckT6dBf.js";var U={root:"p-tabmenu p-component",menu:"p-tabmenu-nav p-reset",menuitem:function(e){var t=e.instance,r=e.index,o=e.item;return["p-tabmenuitem",{"p-highlight":t.d_activeIndex===r,"p-disabled":t.disabled(o)}]},action:"p-menuitem-link",icon:"p-menuitem-icon",label:"p-menuitem-text",inkbar:"p-tabmenu-ink-bar"},V=F.extend({name:"tabmenu",classes:U}),R={name:"BaseTabMenu",extends:M,props:{model:{type:Array,default:null},activeIndex:{type:Number,default:0},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:V,provide:function(){return{$parentInstance:this}}},S={name:"TabMenu",extends:R,inheritAttrs:!1,emits:["update:activeIndex","tab-change"],timeout:null,data:function(){return{d_activeIndex:this.activeIndex}},watch:{activeIndex:function(e){this.d_activeIndex=e}},mounted:function(){this.updateInkBar();var e=this.findActiveItem();e&&(e.tabIndex="0")},updated:function(){this.updateInkBar()},beforeUnmount:function(){clearTimeout(this.timeout)},methods:{getPTOptions:function(e,t,r){return this.ptm(e,{context:{item:t,index:r}})},onItemClick:function(e,t,r){if(this.disabled(t)){e.preventDefault();return}t.command&&t.command({originalEvent:e,item:t}),r!==this.d_activeIndex&&(this.d_activeIndex=r,this.$emit("update:activeIndex",this.d_activeIndex)),this.$emit("tab-change",{originalEvent:e,index:r})},onKeydownItem:function(e,t,r){switch(e.code){case"ArrowRight":{this.navigateToNextItem(e.target),e.preventDefault();break}case"ArrowLeft":{this.navigateToPrevItem(e.target),e.preventDefault();break}case"Home":{this.navigateToFirstItem(e.target),e.preventDefault();break}case"End":{this.navigateToLastItem(e.target),e.preventDefault();break}case"Space":case"NumpadEnter":case"Enter":{this.onItemClick(e,t,r),e.preventDefault();break}case"Tab":{this.onTabKey();break}}},navigateToNextItem:function(e){var t=this.findNextItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToPrevItem:function(e){var t=this.findPrevItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToFirstItem:function(e){var t=this.findFirstItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToLastItem:function(e){var t=this.findLastItem(e);t&&this.setFocusToMenuitem(e,t)},findNextItem:function(e){var t=e.parentElement.nextElementSibling;return t?u.getAttribute(t,"data-p-disabled")===!0?this.findNextItem(t.children[0]):t.children[0]:null},findPrevItem:function(e){var t=e.parentElement.previousElementSibling;return t?u.getAttribute(t,"data-p-disabled")===!0?this.findPrevItem(t.children[0]):t.children[0]:null},findFirstItem:function(){var e=u.findSingle(this.$refs.nav,'[data-pc-section="menuitem"][data-p-disabled="false"]');return e?e.children[0]:null},findLastItem:function(){var e=u.find(this.$refs.nav,'[data-pc-section="menuitem"][data-p-disabled="false"]');return e?e[e.length-1].children[0]:null},findActiveItem:function(){var e=u.findSingle(this.$refs.nav,'[data-pc-section="menuitem"][data-p-disabled="false"][data-p-highlight="true"]');return e?e.children[0]:null},setFocusToMenuitem:function(e,t){e.tabIndex="-1",t.tabIndex="0",t.focus()},onTabKey:function(){var e=u.findSingle(this.$refs.nav,'[data-pc-section="menuitem"][data-p-disabled="false"][data-p-highlight="true"]'),t=u.findSingle(this.$refs.nav,'[data-pc-section="action"][tabindex="0"]');t!==e.children[0]&&(e&&(e.children[0].tabIndex="0"),t.tabIndex="-1")},visible:function(e){return typeof e.visible=="function"?e.visible():e.visible!==!1},disabled:function(e){return typeof e.disabled=="function"?e.disabled():e.disabled===!0},label:function(e){return typeof e.label=="function"?e.label():e.label},updateInkBar:function(){for(var e=this.$refs.nav.children,t=!1,r=0;r<e.length;r++){var o=e[r];u.getAttribute(o,"data-p-highlight")&&(this.$refs.inkbar.style.width=u.getWidth(o)+"px",this.$refs.inkbar.style.left=u.getOffset(o).left-u.getOffset(this.$refs.nav).left+"px",t=!0)}t||(this.$refs.inkbar.style.width="0px",this.$refs.inkbar.style.left="0px")},getMenuItemProps:function(e,t){var r=this;return{action:d({class:this.cx("action"),tabindex:-1,onClick:function(i){return r.onItemClick(i,e,t)},onKeyDown:function(i){return r.onKeydownItem(i,e,t)}},this.getPTOptions("action",e,t)),icon:d({class:[this.cx("icon"),e.icon]},this.getPTOptions("icon",e,t)),label:d({class:this.cx("label")},this.getPTOptions("label",e,t))}}},directives:{ripple:K}},z=["aria-labelledby","aria-label"],j=["onClick","onKeydown","data-p-highlight","data-p-disabled"],q=["href","target","aria-label","aria-disabled"];function W(a,e,t,r,o,i){var I=C("ripple");return c(),m("div",d({class:a.cx("root")},a.ptmi("root")),[l("ul",d({ref:"nav",class:a.cx("menu"),role:"menubar","aria-labelledby":a.ariaLabelledby,"aria-label":a.ariaLabel},a.ptm("menu")),[(c(!0),m(y,null,L(a.model,function(n,s){return c(),m(y,{key:i.label(n)+"_"+s.toString()},[i.visible(n)?(c(),m("li",d({key:0,ref_for:!0,ref:"tab",class:[a.cx("menuitem",{item:n,index:s}),n.class],role:"presentation",onClick:function(p){return i.onItemClick(p,n,s)},onKeydown:function(p){return i.onKeydownItem(p,n,s)}},i.getPTOptions("menuitem",n,s),{"data-p-highlight":o.d_activeIndex===s,"data-p-disabled":i.disabled(n)}),[a.$slots.item?(c(),k(x(a.$slots.item),{key:1,item:n,index:s,active:s===o.d_activeIndex,label:i.label(n),props:i.getMenuItemProps(n,s)},null,8,["item","index","active","label","props"])):g((c(),m("a",d({key:0,ref_for:!0,ref:"tabLink",role:"menuitem",href:n.url,class:a.cx("action"),target:n.target,"aria-label":i.label(n),"aria-disabled":i.disabled(n),tabindex:-1},i.getPTOptions("action",n,s)),[a.$slots.itemicon?(c(),k(x(a.$slots.itemicon),{key:0,item:n,class:N(a.cx("icon"))},null,8,["item","class"])):n.icon?(c(),m("span",d({key:1,class:[a.cx("icon"),n.icon]},i.getPTOptions("icon",n,s)),null,16)):T("",!0),l("span",d({class:a.cx("label")},i.getPTOptions("label",n,s)),h(i.label(n)),17)],16,q)),[[I]])],16,j)):T("",!0)],64)}),128)),l("li",d({ref:"inkbar",role:"none",class:a.cx("inkbar")},a.ptm("inkbar")),null,16)],16,z)],16)}S.render=W;const b=a=>(E("data-v-87a633f1"),a=a(),H(),a),G={class:"title__section",id:"kenai"},J=b(()=>l("div",{class:"title-lights"},[l("figure",{id:"firt-light"})],-1)),Q={class:"title__container"},X=b(()=>l("h1",null,[l("span",{class:"animate__animated animate__fadeInUp first-title"},"Bienvenido a"),l("span",{class:"animate__animated animate__fadeInUp second-title",id:"kenai_title"},"Kenai")],-1)),Y={class:"get-started__container animate__animated animate__fadeInUp third-title"},Z=b(()=>l("span",{slot:"label"},"Comenzar",-1)),ee=b(()=>l("span",{class:"material-icons material-icons-right",slot:"icon"},"arrow_forward",-1)),te={class:"nav__container"},ae={class:"landing-navbar"},ne=["href","onClick"],ie={class:"material-icons-outlined"},se=["href","target"],le={class:"material-icons-outlined"},re=b(()=>l("section",{id:"proposito"},null,-1)),oe={__name:"HomeView",setup(a){const e=A([{route:"#kenai",label:"Kenai",materialIcon:"home"},{route:"#proposito",label:"Propósito",materialIcon:"adjust"},{route:"#modelo",label:"Modelo",materialIcon:"pets"},{route:"#aplicaciones",label:"Aplicaciones",materialIcon:"grid_view"},{route:"#contenido",label:"Contenido",materialIcon:"layers"}]);return(t,r)=>{const o=B,i=O("router-link"),I=S,n=C("ripple");return c(),m("main",null,[l("section",G,[J,l("div",Q,[X,l("div",Y,[_(i,{to:"/chat"},{default:v(()=>[_(o,{outlined:"",severity:"contrast",class:"get-started__btn"},{default:v(()=>[Z,ee]),_:1})]),_:1})])])]),l("div",te,[l("nav",ae,[_(I,{model:e.value,class:"nav-tab-menu"},{item:v(({item:s,props:f})=>[s.route?(c(),k(i,{key:0,to:s.route,custom:""},{default:v(({href:p,navigate:D})=>[g((c(),m("a",d({href:p},f.action,{onClick:D}),[l("span",ie,h(s.materialIcon),1),l("span",w(P(f.label)),h(s.label),17)],16,ne)),[[n]])]),_:2},1032,["to"])):g((c(),m("a",d({key:1,href:s.url,target:s.target},f.action),[l("span",le,h(s.materialIcon),1),l("span",w(P(f.label)),h(s.label),17)],16,se)),[[n]])]),_:1},8,["model"])])]),re])}}},ue=$(oe,[["__scopeId","data-v-87a633f1"]]);export{ue as default};
