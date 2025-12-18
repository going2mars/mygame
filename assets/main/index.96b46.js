System.register("chunks:///_virtual/main",["./TelegramAuth.ts"],(function(){return{setters:[null],execute:function(){}}}));

System.register("chunks:///_virtual/TelegramAuth.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(e){var t,i,n,o,r,s,a,l,p,g,u,c,h,d,y,f;return{setters:[function(e){t=e.applyDecoratedDescriptor,i=e.inheritsLoose,n=e.createClass,o=e.initializerDefineProperty,r=e.assertThisInitialized},function(e){s=e.cclegacy,a=e._decorator,l=e.Node,p=e.Label,g=e.Layout,u=e.UITransform,c=e.Vec3,h=e.screen,d=e.view,y=e.instantiate,f=e.Component}],execute:function(){var b,m,_,v,w,T,P,D,A,x,z;s._RF.push({},"d3be8HHXg9ChY6VJQ/o2g8o","TelegramAuth",void 0);var B=a.ccclass,M=a.property;e("TelegramAuth",(b=B("TelegramAuth"),m=M(l),_=M(p),v=M(g),b((P=t((T=function(e){function t(){for(var t,i=arguments.length,n=new Array(i),s=0;s<i;s++)n[s]=arguments[s];return t=e.call.apply(e,[this].concat(n))||this,o(t,"loginBtn",P,r(t)),o(t,"labelProto",D,r(t)),o(t,"list",A,r(t)),o(t,"_speed",x,r(t)),o(t,"_span",z,r(t)),t._originPos=void 0,t._newPos=void 0,t._time=0,t}i(t,e);var s=t.prototype;return s.start2=function(){this._originPos=this.loginBtn.position.clone(),this._newPos=this._originPos.clone();var e=document.createElement("div");e.id="google_btn_root",e.style.position="absolute",e.style.zIndex="99",e.style.opacity="0",e.style.width="100px",e.style.height="100px",document.body.appendChild(e)},s.update2=function(e){this._time+=e;var t=Math.sin(this._time*this._speed*2*Math.PI)*this._span;this._newPos.y=this._originPos.y+t,this.loginBtn.position=this._newPos;var i=this.loginBtn.getComponent(u).convertToWorldSpaceAR(c.ZERO),n=h.windowSize,o=d.getVisibleSize(),r=i.x/o.width*n.width,s=(o.height-i.y)/o.height*n.height,a=document.getElementById("google_btn_root");a&&(a.style.left=r-100+"px",a.style.top=s-20+"px")},s.onClickButton=function(){console.log("onClickButton"),this.tgLogin()},s.addMsg=function(e){var t=y(this.labelProto.node);t.active=!0,t.parent=this.list.node,t.getComponent(p).string=e},s.isTelegramEnv=function(){var e;return(Number(null==(e=window.Telegram)||null==(e=e.WebApp)||null==(e=e.initData)?void 0:e.length)||0)>0},s.tgLogin=function(){if(this.isTelegramEnv()){this.addMsg("tgLogin");var e=window.Telegram.WebApp;if(e.initDataUnsafe){this.addMsg("exist Telegram.WebApp.initDataUnsafe");var t=e.initDataUnsafe.user;if(t){this.addMsg("exist Telegram.WebApp.initDataUnsafe.user"),console.log("欢迎, "+t.first_name+"!");var i=e.initData;this.addMsg("exist Telegram.WebApp.initData:"+i),this.sendToServer(i)}}}else this.addMsg("not tg env")},s.sendToServer=function(e){console.log("sendToServer",e)},n(t,[{key:"speed",get:function(){return this._speed},set:function(e){this._speed=e}},{key:"span",get:function(){return this._span},set:function(e){this._span=e}}]),t}(f)).prototype,"loginBtn",[m],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),D=t(T.prototype,"labelProto",[_],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),A=t(T.prototype,"list",[v],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),x=t(T.prototype,"_speed",[M],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 1}}),t(T.prototype,"speed",[M],Object.getOwnPropertyDescriptor(T.prototype,"speed"),T.prototype),z=t(T.prototype,"_span",[M],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 200}}),t(T.prototype,"span",[M],Object.getOwnPropertyDescriptor(T.prototype,"span"),T.prototype),w=T))||w));s._RF.pop()}}}));

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});