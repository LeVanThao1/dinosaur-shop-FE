(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[25,63],{144:function(s,e,t){"use strict";t.r(e);var r=t(29),a=t.n(r),n=t(58),c=t(178),o=t(6),d=t(61),u=t(1),i=t(0),p=t(25),b=t(119),j=t(433),l=t(22),w=t.n(l),f=t(410),h=t(190);t(396);e.default=function(s){var e=Object(p.i)().token,t=Object(p.g)(),r=Object(i.useState)({password:"",cf_password:""}),l=Object(d.a)(r,2),O=l[0],v=l[1],m=function(s){var e,t=s.target,r=t.name,a=t.value;v(Object(o.a)(Object(o.a)({},O),{},(e={},Object(c.a)(e,r,a),Object(c.a)(e,"err",""),Object(c.a)(e,"success",""),e)))},x=function(){var s=Object(n.a)(a.a.mark((function s(){var r;return a.a.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:if(!Object(j.c)(O.password)){s.next=2;break}return s.abrupt("return",Object(b.a)("Password must be at least 6 characters."));case 2:if(Object(j.d)(O.password,O.cf_password)){s.next=4;break}return s.abrupt("return",Object(b.a)("Password did not match."));case 4:return s.prev=4,s.next=7,w.a.post("http://localhost:3001/user/resetpw",{password:O.password},{headers:{Authorization:e}});case 7:r=s.sent,Object(b.b)(r.data.msg),t.push("/login"),s.next=15;break;case 12:s.prev=12,s.t0=s.catch(4),Object(b.a)(s.t0.response.data.msg);case 15:case"end":return s.stop()}}),s,null,[[4,12]])})));return function(){return s.apply(this,arguments)}}();return Object(u.jsxs)("div",{className:"fg_pass",children:[Object(u.jsx)("h2",{children:"Reset Your Password"}),Object(u.jsxs)("div",{className:"row-password",children:[Object(u.jsxs)("div",{className:"password",children:[Object(u.jsx)("label",{htmlFor:"password",children:"Password"}),Object(u.jsx)(f.a,{type:"password",name:"password",id:"password",value:O.password,onChange:m})]}),Object(u.jsxs)("div",{className:"cf-password",children:[Object(u.jsx)("label",{htmlFor:"cf_password",children:"Confirm Password"}),Object(u.jsx)(f.a,{type:"password",name:"cf_password",id:"cf_password",value:O.cf_password,onChange:m})]}),Object(u.jsx)("div",{className:"button-pw",children:Object(u.jsx)(h.a,{onClick:x,children:"Reset Password"})})]})]})}},396:function(s,e,t){},433:function(s,e,t){"use strict";t.d(e,"b",(function(){return r})),t.d(e,"a",(function(){return a})),t.d(e,"c",(function(){return n})),t.d(e,"d",(function(){return c}));var r=function(s){return!s},a=function(s){return/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(s)},n=function(s){return s.length<8},c=function(s,e){return s===e}}}]);
//# sourceMappingURL=25.7cd82094.chunk.js.map