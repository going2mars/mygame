System.register("chunks:///_virtual/main",["./TelegramAuth.ts"],(function(){return{setters:[null],execute:function(){}}}));

System.register("chunks:///_virtual/TelegramAuth.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(e){var t,i,a,n,r,o,s,l,g,c;return{setters:[function(e){t=e.applyDecoratedDescriptor,i=e.inheritsLoose,a=e.initializerDefineProperty,n=e.assertThisInitialized},function(e){r=e.cclegacy,o=e._decorator,s=e.Label,l=e.Layout,g=e.instantiate,c=e.Component}],execute:function(){var u,p,d,h,f,b,m;r._RF.push({},"d3be8HHXg9ChY6VJQ/o2g8o","TelegramAuth",void 0);var v=o.ccclass,T=o.property;e("TelegramAuth",(u=v("TelegramAuth"),p=T(s),d=T(l),u((b=t((f=function(e){function t(){for(var t,i=arguments.length,r=new Array(i),o=0;o<i;o++)r[o]=arguments[o];return t=e.call.apply(e,[this].concat(r))||this,a(t,"labelProto",b,n(t)),a(t,"list",m,n(t)),t}i(t,e);var r=t.prototype;return r.start=function(){this.addMsg("call tgLogin"),this.tgLogin()||(this.addMsg("call tgLogin failed, try again in 3 seconds"),this.scheduleOnce(this.tgLogin,3))},r.addMsg=function(e){var t=g(this.labelProto.node);t.active=!0,t.parent=this.list.node,t.getComponent(s).string=e},r.tgLogin=function(){if(window.Telegram&&window.Telegram.WebApp){this.addMsg("exist Telegram.WebApp");var e=window.Telegram.WebApp;if(e.ready(),e.initDataUnsafe){this.addMsg("exist Telegram.WebApp.initDataUnsafe");var t=e.initDataUnsafe.user;if(t){this.addMsg("exist Telegram.WebApp.initDataUnsafe.user"),console.log("欢迎, "+t.first_name+"!");var i=e.initData;this.addMsg("exist Telegram.WebApp.initData:"+i),this.sendToServer(i)}}return!0}return!1},r.sendToServer=function(e){console.log("sendToServer",e)},t}(c)).prototype,"labelProto",[p],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),m=t(f.prototype,"list",[d],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),h=f))||h));r._RF.pop()}}}));

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