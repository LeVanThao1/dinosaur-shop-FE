(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[23,52],{125:function(e,c,t){"use strict";t.r(c);var n=t(6),s=t(61),a=t(1),r=t(0),i=(t(379),t(190)),j=t(410),l=t(25),o=t(10),d=t(120),b=t(119),u=t(172),O=t(427),p=t(412);c.default=function(e){var c=e.total,t=Object(p.a)().t,h=Object(l.g)(),m=Object(r.useState)(""),v=Object(s.a)(m,2),x=v[0],f=v[1],N=Object(r.useState)(null),_=Object(s.a)(N,2),g=_[0],y=_[1],C=Object(r.useState)(null),k=Object(s.a)(C,2),D=k[0],S=k[1],P=Object(o.b)(),V=Object(o.c)((function(e){return e.cart}));return Object(a.jsxs)("div",{className:"info__pay .col-6 .col-sm-4",children:[Object(a.jsx)("div",{className:"header",children:t("carts.order")}),Object(a.jsxs)("div",{className:"info__content",children:[Object(a.jsxs)("div",{className:"promotion",children:[Object(a.jsx)("div",{className:"id_Promotion",children:t("carts.enterCode")}),Object(a.jsxs)("div",{className:"promotion__content",children:[Object(a.jsx)(j.a,{type:"text",value:x,onChange:function(e){f(e.target.value)}}),Object(a.jsx)(i.a,{className:"btn btnOK",onClick:function(){Object(d.a)("api/check/promotions/"+x,"GET").then((function(e){S(null),y(e.data)})).catch((function(e){return S(e.response.data.msg)}))},children:t("carts.apply")})]}),D&&Object(b.c)(D)]}),Object(a.jsxs)("div",{className:"orderDetail",children:[Object(a.jsxs)("div",{className:"cost",children:[Object(a.jsx)("span",{children:t("carts.order")}),Object(a.jsxs)("span",{children:[Object(O.a)(c)," VND"]})]}),Object(a.jsxs)("div",{className:"reduction",children:[Object(a.jsxs)("p",{children:[t("carts.reduction")," ",g?g.percent:0,"%"]}),Object(a.jsxs)("p",{children:[Object(O.a)(c*(g?null===g||void 0===g?void 0:g.percent:0)/100),"VND"]})]})]}),Object(a.jsxs)("div",{className:"tempCacul",children:[Object(a.jsxs)("div",{className:"child__tempCacul",children:[Object(a.jsx)("span",{children:t("carts.provisional")}),Object(a.jsxs)("span",{children:[Object(O.a)(g?c*(1-g.percent/100):c),"VND"]})]}),Object(a.jsx)(i.a,{type:"primary",onClick:function(){var e=V.map((function(e){var c=Object(n.a)({},e);return c.price=e.productId.salePrice,c}));P(Object(u.d)({promotion:g,products:e})),h.push("/shipping")},children:t("carts.continuePayment")})]})]})]})}},379:function(e,c,t){},427:function(e,c,t){"use strict";t.d(c,"a",(function(){return n}));var n=function(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")}}}]);
//# sourceMappingURL=23.afdd8933.chunk.js.map