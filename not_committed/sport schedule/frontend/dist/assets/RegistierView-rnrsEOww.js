import{_ as n,i as c,c as p,a as s,e as _,f as d,v as l,k as m,o as f,p as u,h}from"./index-DXyJi94Y.js";const w="http://localhost:3000",v={setup(){const e=c({email:"",password:""});async function o(){try{await m.post(`${w}/auth/register`,{email:e.value.email,password:e.value.password,role:"admin"}),location.reload(),console.log("idk if it worked")}catch(r){console.error("Error fetching data:",r)}}return{registier:o,formData:e}}},i=e=>(u("data-v-09dd61e3"),e=e(),h(),e),g={class:"columns is-centered"},b={class:"column is-one-third"},x={class:"card"},D={class:"card-content"},k=i(()=>s("h1",{class:"title"},"Register New Account",-1)),y={class:"field"},I=i(()=>s("label",{class:"label",for:"email"},"Email:",-1)),R={class:"field"},S=i(()=>s("label",{class:"label",for:"password"},"Password:",-1)),V=i(()=>s("button",{type:"submit",class:"button"},"Register",-1));function B(e,o,r,t,E,U){return f(),p("div",g,[s("div",b,[s("div",x,[s("div",D,[k,s("form",{onSubmit:o[2]||(o[2]=_((...a)=>t.registier&&t.registier(...a),["prevent"]))},[s("div",y,[I,d(s("input",{class:"input",type:"email",id:"email","onUpdate:modelValue":o[0]||(o[0]=a=>t.formData.email=a),required:""},null,512),[[l,t.formData.email]])]),s("div",R,[S,d(s("input",{class:"input",type:"text",id:"password","onUpdate:modelValue":o[1]||(o[1]=a=>t.formData.password=a),required:""},null,512),[[l,t.formData.password]])]),V],32)])])])])}const A=n(v,[["render",B],["__scopeId","data-v-09dd61e3"]]);export{A as default};
