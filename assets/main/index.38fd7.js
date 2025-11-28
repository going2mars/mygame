System.register("chunks:///_virtual/Arrange.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(e){var t,o,n,r,i,c,a,l,s,h;return{setters:[function(e){t=e.applyDecoratedDescriptor,o=e.inheritsLoose,n=e.initializerDefineProperty,r=e.assertThisInitialized},function(e){i=e.cclegacy,c=e._decorator,a=e.UITransform,l=e.CCInteger,s=e.instantiate,h=e.Component}],execute:function(){var p,u,f,g,d,b,y,v,_,m,w;i._RF.push({},"2eb2eiIty1LSJeemBrfUJ+D","Arrange",void 0);var k=c.ccclass,B=c.property;e("Arrange",(p=k("Arrange"),u=B(a),f=B(a),g=B({min:1,step:1,type:l}),d=B({min:1,step:1,type:l}),p((v=t((y=function(e){function t(){for(var t,o=arguments.length,i=new Array(o),c=0;c<o;c++)i[c]=arguments[c];return t=e.call.apply(e,[this].concat(i))||this,n(t,"container",v,r(t)),n(t,"proto",_,r(t)),n(t,"row",m,r(t)),n(t,"col",w,r(t)),t._cache=[],t._blocks=[],t}o(t,e);var i=t.prototype;return i.onLoad=function(){this.proto.node.active=!1},i.onDestroy=function(){this._cache.forEach((function(e){return e.node.destroy()})),this._cache.length=0},i.start=function(){this.arrangeBlocks()},i.getBlock=function(){if(this._cache.length>0)return this._cache.pop();var e=s(this.proto.node);return e.getComponent(a)||e.addComponent(a)},i.clearBlocks=function(){var e;(e=this._cache).push.apply(e,this._blocks),this._blocks.forEach((function(e){return e.node.active=!1})),this._blocks.length=0,this.container.node.removeAllChildren()},i.arrangeBlocks=function(){this.clearBlocks();var e=this.proto.contentSize.clone(),t=this.container.height*(1-this.container.anchorY),o=this.container.width*-this.container.anchorX;console.log("col:"+this.col+", row:"+this.row);for(var n=0;n<this.row;++n)for(var r=0;r<this.col;++r){var i=this.getBlock();console.log(i),i.node.active=!0,i.node.parent=this.container.node,i.node.setPosition(o+(r+.5)*e.width,t-(n+.5)*e.height),console.log(i.node.position)}},t}(h)).prototype,"container",[u],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),_=t(y.prototype,"proto",[f],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),m=t(y.prototype,"row",[g],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 1}}),w=t(y.prototype,"col",[d],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 1}}),b=y))||b));i._RF.pop()}}}));

System.register("chunks:///_virtual/main",["./Arrange.ts"],(function(){return{setters:[null],execute:function(){}}}));

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