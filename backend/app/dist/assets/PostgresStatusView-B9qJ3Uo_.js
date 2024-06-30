import{B as S,s as w}from"./baseicon.esm-DmdQ3XWk.js";import{o as s,c as n,m as f,s as x,f as l,_ as $,g as v,M as k,E as D,i as r,j as g,a,y as _,t as E,p as b,q as I}from"./index-DCE9E-lw.js";import{a as P,b as z}from"./progressspinner.esm-0yUKRTPd.js";var B={root:function(o){var e=o.props;return{justifyContent:e.layout==="horizontal"?e.align==="center"||e.align===null?"center":e.align==="left"?"flex-start":e.align==="right"?"flex-end":null:null,alignItems:e.layout==="vertical"?e.align==="center"||e.align===null?"center":e.align==="top"?"flex-start":e.align==="bottom"?"flex-end":null:null}}},C={root:function(o){var e=o.props;return["p-divider p-component","p-divider-"+e.layout,"p-divider-"+e.type,{"p-divider-left":e.layout==="horizontal"&&(!e.align||e.align==="left")},{"p-divider-center":e.layout==="horizontal"&&e.align==="center"},{"p-divider-right":e.layout==="horizontal"&&e.align==="right"},{"p-divider-top":e.layout==="vertical"&&e.align==="top"},{"p-divider-center":e.layout==="vertical"&&(!e.align||e.align==="center")},{"p-divider-bottom":e.layout==="vertical"&&e.align==="bottom"}]},content:"p-divider-content"},V=S.extend({name:"divider",classes:C,inlineStyles:B}),j={name:"BaseDivider",extends:w,props:{align:{type:String,default:null},layout:{type:String,default:"horizontal"},type:{type:String,default:"solid"}},style:V,provide:function(){return{$parentInstance:this}}},h={name:"Divider",extends:j,inheritAttrs:!1},L=["aria-orientation"];function M(t,o,e,c,d,p){return s(),n("div",f({class:t.cx("root"),style:t.sx("root"),role:"separator","aria-orientation":t.layout},t.ptmi("root")),[t.$slots.default?(s(),n("div",f({key:0,class:t.cx("content")},t.ptm("content")),[x(t.$slots,"default")],16)):l("",!0)],16,L)}h.render=M;async function N(){try{const t=await fetch("/postgres/status",{method:"GET",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error("Error en la petición");const o=await t.json();if(o.success)return o.data;throw new Error(o.error.message)}catch(t){throw new Error(t.message)}}const i=t=>(b("data-v-f946fb6d"),t=t(),I(),t),G={style:{padding:"15px"}},T=i(()=>a("h1",null,"Estatus de conexión con PostgreSQL",-1)),q={key:0},A={key:1,class:"conection-successfully"},O=i(()=>a("p",{class:"m-0"},null,-1)),Q=i(()=>a("p",{class:"m-0"},null,-1)),F=i(()=>a("p",{class:"m-0"},null,-1)),H={key:2,class:"conection-error"},J=i(()=>a("span",{style:{"font-size":"1.3rem","font-weight":"600"}},"¡Conexión fallida!",-1)),K=i(()=>a("h3",{style:{margin:"0"}},"Detalles del error",-1)),R={__name:"PostgresStatusView",setup(t){const o=v(!0),e=v(!0),c=v(""),d=k({});return D(async()=>{try{d=await N(),console.log(d),o.value=!0}catch(p){o.value=!1,c.value=p.message}finally{e.value=!1}}),(p,U)=>{const m=z,u=P,y=h;return s(),n("div",G,[T,e.value?(s(),n("div",q,[r(m,{"aria-label":"Loading"})])):l("",!0),o.value&&!e.value?(s(),n("div",A,[r(u,{severity:"success"},{default:g(()=>[_("¡Conexión exitosa!")]),_:1}),a("div",null,[O,r(y,{layout:"vertical"}),Q,r(y,{layout:"vertical"}),F])])):l("",!0),!o.value&&!e.value?(s(),n("div",H,[r(u,{severity:"error",style:{padding:"20px"}},{default:g(()=>[J]),_:1}),r(u,{severity:"secondary"},{default:g(()=>[K,_(" "+E(c.value),1)]),_:1})])):l("",!0)])}}},Z=$(R,[["__scopeId","data-v-f946fb6d"]]);export{Z as default};
