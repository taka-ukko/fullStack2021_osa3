(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(14),c=t.n(u),o=t(4),l=t(2),i=function(e){var n=e.person,t=e.remove;return r.a.createElement("div",null,n.name," ",n.number," "," ",r.a.createElement("button",{onClick:t},"delete"))},m=function(e){return r.a.createElement(r.a.Fragment,null,e.persons.filter((function(n){return n.name.toLowerCase().includes(e.filterText.toLowerCase())})).map((function(n){return r.a.createElement(i,{person:n,key:n.id,remove:function(){return e.remove(n.id)}})})))},f=function(e){return r.a.createElement("div",null," filter shown with: ",r.a.createElement("input",{value:e.filter,onChange:e.handler})," ")},d=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",{onSubmit:e.addName},r.a.createElement("div",null," name: ",r.a.createElement("input",{value:e.newName,onChange:e.handleNameChange})," "),r.a.createElement("div",null," number: ",r.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange})),r.a.createElement("div",null," ",r.a.createElement("button",{type:"submit"},"add")," ")))},s=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:n.type},n.message)},h=t(3),b=t.n(h),v="/api/persons",p=function(){return b.a.get(v).then((function(e){return e.data}))},E=function(e){return b.a.post(v,e).then((function(e){return e.data}))},g=function(e){return b.a.delete("".concat(v,"/").concat(e))},w=function(e,n){return b.a.put("".concat(v,"/").concat(e),n).then((function(e){return e.data}))},j=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),i=Object(l.a)(c,2),h=i[0],b=i[1],v=Object(a.useState)(""),j=Object(l.a)(v,2),O=j[0],N=j[1],C=Object(a.useState)(""),y=Object(l.a)(C,2),k=y[0],S=y[1],x=Object(a.useState)(null),T=Object(l.a)(x,2),D=T[0],F=T[1];Object(a.useEffect)((function(){p().then((function(e){return u(e)}))}),[]);var I=function(e,n){F({message:n,type:e}),setTimeout((function(){F(null)}),4e3)},J=function(){E({name:h,number:O}).then((function(e){u(t.concat(e)),b(""),N(""),I("success","Added ".concat(e.name))}))},L=function(e,n){var a=t.find((function(n){return n.id===e})),r=Object(o.a)(Object(o.a)({},a),{},{number:n});w(e,r).then((function(n){u(t.map((function(t){return t.id!==e?t:n}))),b(""),N(""),I("success","Updated the number of ".concat(n.name))})).catch((function(n){I("error","Information of ".concat(a.name," has already been removed from the server")),u(t.filter((function(n){return n.id!==e})))}))};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(s,{message:D}),r.a.createElement(f,{filter:k,handler:function(e){S(e.target.value)}}),r.a.createElement("h3",null,"add a new"),r.a.createElement(d,{addName:function(e){e.preventDefault();var n=t.find((function(e){return e.name===h}));if(n){if(!window.confirm("".concat(h," is already added to phonebook, replace the old number with a new one?")))return;L(n.id,O)}else J()},newName:h,newNumber:O,handleNameChange:function(e){b(e.target.value)},handleNumberChange:function(e){N(e.target.value)}}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(m,{persons:t,filterText:k,remove:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name))&&g(e).then((function(n){var a=t.find((function(n){return n.id===e}));u(t.filter((function(n){return n.id!==e}))),I("success","Removed ".concat(a.name))}))}}))};t(37);c.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.9be3afa0.chunk.js.map