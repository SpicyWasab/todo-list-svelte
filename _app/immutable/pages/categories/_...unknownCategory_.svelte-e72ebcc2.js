import{S as _,i as g,s as d,l as h,w as i,m as b,n as v,x as l,h as c,p as k,b as u,y as $,f as m,t as f,B as p,a5 as w,r as x,u as B}from"../../chunks/index-f7c1fb44.js";import{B as y,s as C,L,r as S,q}from"../../chunks/navigation-da1e81ae.js";import"../../chunks/singletons-3371444f.js";function A(r){let t;return{c(){t=x("Retour \xE0 la cat\xE9gorie Actives")},l(e){t=B(e,"Retour \xE0 la cat\xE9gorie Actives")},m(e,a){u(e,t,a)},d(e){e&&c(t)}}}function D(r){let t,e;return t=new L({props:{$$slots:{default:[A]},$$scope:{ctx:r}}}),t.$on("click",r[0]),{c(){i(t.$$.fragment)},l(a){l(t.$$.fragment,a)},m(a,n){$(t,a,n),e=!0},p(a,n){const s={};n&8&&(s.$$scope={dirty:n,ctx:a}),t.$set(s)},i(a){e||(m(t.$$.fragment,a),e=!0)},o(a){f(t.$$.fragment,a),e=!1},d(a){p(t,a)}}}function R(r){let t,e,a;return e=new y({props:{variant:"outlined",$$slots:{default:[D]},$$scope:{ctx:r}}}),{c(){t=h("div"),i(e.$$.fragment),this.h()},l(n){t=b(n,"DIV",{class:!0});var s=v(t);l(e.$$.fragment,s),s.forEach(c),this.h()},h(){k(t,"class","center-items")},m(n,s){u(n,t,s),$(e,t,null),a=!0},p(n,[s]){const o={};s&8&&(o.$$scope={dirty:s,ctx:n}),e.$set(o)},i(n){a||(m(e.$$.fragment,n),a=!0)},o(n){f(e.$$.fragment,n),a=!1},d(n){n&&c(t),p(e)}}}function E(r,t,e){let a;w(r,q,o=>e(1,a=o));const{unknownCategory:n}=a.params;return C(`La cat\xE9gorie ${n} n'existe pas.`),[()=>S("/categories/actives")]}class j extends _{constructor(t){super(),g(this,t,E,R,d,{})}}export{j as default};