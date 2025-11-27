System.register("chunks:///_virtual/Arrange.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, UITransform, CCInteger, instantiate, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UITransform = module.UITransform;
      CCInteger = module.CCInteger;
      instantiate = module.instantiate;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "2eb2eiIty1LSJeemBrfUJ+D", "Arrange", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Arrange = exports('Arrange', (_dec = ccclass('Arrange'), _dec2 = property(UITransform), _dec3 = property(UITransform), _dec4 = property({
        min: 1,
        step: 1,
        type: CCInteger
      }), _dec5 = property({
        min: 1,
        step: 1,
        type: CCInteger
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Arrange, _Component);
        function Arrange() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "container", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "proto", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "row", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "col", _descriptor4, _assertThisInitialized(_this));
          _this._cache = [];
          _this._blocks = [];
          return _this;
        }
        var _proto = Arrange.prototype;
        _proto.onLoad = function onLoad() {
          this.proto.node.active = false;
        };
        _proto.onDestroy = function onDestroy() {
          this._cache.forEach(function (v) {
            return v.node.destroy();
          });
          this._cache.length = 0;
        };
        _proto.start = function start() {
          this.arrangeBlocks();
        };
        _proto.getBlock = function getBlock() {
          if (this._cache.length > 0) {
            return this._cache.pop();
          }
          var node = instantiate(this.proto.node);
          return node.getComponent(UITransform) || node.addComponent(UITransform);
        };
        _proto.clearBlocks = function clearBlocks() {
          var _this$_cache;
          (_this$_cache = this._cache).push.apply(_this$_cache, this._blocks);
          this._blocks.forEach(function (v) {
            return v.node.active = false;
          });
          this._blocks.length = 0;
          this.container.node.removeAllChildren();
        };
        _proto.arrangeBlocks = function arrangeBlocks() {
          this.clearBlocks();
          var blockSize = this.proto.contentSize.clone();
          var top = this.container.height * (1 - this.container.anchorY);
          var left = this.container.width * -this.container.anchorX;
          console.log("col:" + this.col + ", row:" + this.row);
          for (var y = 0; y < this.row; ++y) {
            for (var x = 0; x < this.col; ++x) {
              var block = this.getBlock();
              console.log(block);
              block.node.active = true;
              block.node.parent = this.container.node;
              block.node.setPosition(left + (x + 0.5) * blockSize.width, top - (y + 0.5) * blockSize.height);
              console.log(block.node.position);
            }
          }
        };
        return Arrange;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "container", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "proto", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "row", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "col", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./Arrange.ts'], function () {
  return {
    setters: [null],
    execute: function () {}
  };
});

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
//# sourceMappingURL=index.js.map