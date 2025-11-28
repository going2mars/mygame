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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2ZpbGU6L0M6L1VzZXJzL0FkbWluaXN0cmF0b3IvTmV3UHJvamVjdF8zL2Fzc2V0cy9maWxlOi9DOi9Vc2Vycy9BZG1pbmlzdHJhdG9yL05ld1Byb2plY3RfMy9hc3NldHMvQXJyYW5nZS50cyJdLCJuYW1lcyI6WyJjY2NsYXNzIiwiX2RlY29yYXRvciIsInByb3BlcnR5IiwiQXJyYW5nZSIsIl9kZWMiLCJfZGVjMiIsIlVJVHJhbnNmb3JtIiwiX2RlYzMiLCJfZGVjNCIsIm1pbiIsInN0ZXAiLCJ0eXBlIiwiQ0NJbnRlZ2VyIiwiX2RlYzUiLCJfY2xhc3MiLCJfY2xhc3MyIiwiX0NvbXBvbmVudCIsIl9pbmhlcml0c0xvb3NlIiwiX3RoaXMiLCJfbGVuIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiYXJncyIsIkFycmF5IiwiX2tleSIsImNhbGwiLCJhcHBseSIsImNvbmNhdCIsIl9pbml0aWFsaXplckRlZmluZVByb3BlcnR5IiwiX2Rlc2NyaXB0b3IiLCJfYXNzZXJ0VGhpc0luaXRpYWxpemVkIiwiX2Rlc2NyaXB0b3IyIiwiX2Rlc2NyaXB0b3IzIiwiX2Rlc2NyaXB0b3I0IiwiX2NhY2hlIiwiX2Jsb2NrcyIsIl9wcm90byIsInByb3RvdHlwZSIsIm9uTG9hZCIsInByb3RvIiwibm9kZSIsImFjdGl2ZSIsIm9uRGVzdHJveSIsImZvckVhY2giLCJ2IiwiZGVzdHJveSIsInN0YXJ0IiwiYXJyYW5nZUJsb2NrcyIsImdldEJsb2NrIiwicG9wIiwiaW5zdGFudGlhdGUiLCJnZXRDb21wb25lbnQiLCJhZGRDb21wb25lbnQiLCJjbGVhckJsb2NrcyIsIl90aGlzJF9jYWNoZSIsInB1c2giLCJjb250YWluZXIiLCJyZW1vdmVBbGxDaGlsZHJlbiIsImJsb2NrU2l6ZSIsImNvbnRlbnRTaXplIiwiY2xvbmUiLCJ0b3AiLCJoZWlnaHQiLCJhbmNob3JZIiwibGVmdCIsIndpZHRoIiwiYW5jaG9yWCIsImNvbnNvbGUiLCJsb2ciLCJjb2wiLCJyb3ciLCJ5IiwieCIsImJsb2NrIiwicGFyZW50Iiwic2V0UG9zaXRpb24iLCJwb3NpdGlvbiIsIkNvbXBvbmVudCIsIl9hcHBseURlY29yYXRlZERlc2NyaXB0b3IiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwid3JpdGFibGUiLCJpbml0aWFsaXplciIsIl9SRiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQUNBLElBQVFBLE9BQU8sR0FBZUMsVUFBVSxDQUFoQ0QsT0FBTztRQUFFRSxRQUFRLEdBQUtELFVBQVUsQ0FBdkJDLFFBQVE7VUFHWkMsT0FBTyx1QkFBQUMsSUFBQSxHQURuQkosT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFBSyxLQUFBLEdBRWRILFFBQVEsQ0FBQ0ksV0FBVyxDQUFDLEVBQUFDLEtBQUEsR0FFckJMLFFBQVEsQ0FBQ0ksV0FBVyxDQUFDLEVBQUFFLEtBQUEsR0FFckJOLFFBQVEsQ0FBQztRQUFFTyxHQUFHLEVBQUMsQ0FBQztRQUFFQyxJQUFJLEVBQUMsQ0FBQztRQUFFQyxJQUFJLEVBQUNDO01BQVUsQ0FBQyxDQUFDLEVBQUFDLEtBQUEsR0FFM0NYLFFBQVEsQ0FBQztRQUFFTyxHQUFHLEVBQUMsQ0FBQztRQUFFQyxJQUFJLEVBQUMsQ0FBQztRQUFFQyxJQUFJLEVBQUNDO01BQVUsQ0FBQyxDQUFDLEVBQUFSLElBQUEsQ0FBQVUsTUFBQSxJQUFBQyxPQUFBLDBCQUFBQyxVQUFBO1FBQUFDLGNBQUEsQ0FBQWQsT0FBQSxFQUFBYSxVQUFBO1FBQUEsU0FBQWI7VUFBQSxJQUFBZSxLQUFBO1VBQUEsU0FBQUMsSUFBQSxHQUFBQyxTQUFBLENBQUFDLE1BQUEsRUFBQUMsSUFBQSxPQUFBQyxLQUFBLENBQUFKLElBQUEsR0FBQUssSUFBQSxNQUFBQSxJQUFBLEdBQUFMLElBQUEsRUFBQUssSUFBQTtZQUFBRixJQUFBLENBQUFFLElBQUEsSUFBQUosU0FBQSxDQUFBSSxJQUFBOztVQUFBTixLQUFBLEdBQUFGLFVBQUEsQ0FBQVMsSUFBQSxDQUFBQyxLQUFBLENBQUFWLFVBQUEsU0FBQVcsTUFBQSxDQUFBTCxJQUFBO1VBQUFNLDBCQUFBLENBQUFWLEtBQUEsZUFBQVcsV0FBQSxFQUFBQyxzQkFBQSxDQUFBWixLQUFBO1VBQUFVLDBCQUFBLENBQUFWLEtBQUEsV0FBQWEsWUFBQSxFQUFBRCxzQkFBQSxDQUFBWixLQUFBO1VBQUFVLDBCQUFBLENBQUFWLEtBQUEsU0FBQWMsWUFBQSxFQUFBRixzQkFBQSxDQUFBWixLQUFBO1VBQUFVLDBCQUFBLENBQUFWLEtBQUEsU0FBQWUsWUFBQSxFQUFBSCxzQkFBQSxDQUFBWixLQUFBO1VBQUFBLEtBQUEsQ0FHcENnQixNQUFNLEdBQUcsRUFBRTtVQUFBaEIsS0FBQSxDQUNYaUIsT0FBTyxHQUFHLEVBQUU7VUFBQSxPQUFBakIsS0FBQTs7UUFBQSxJQUFBa0IsTUFBQSxHQUFBakMsT0FBQSxDQUFBa0MsU0FBQTtRQUFBRCxNQUFBLENBRVZFLE1BQU0sR0FBaEIsU0FBQUEsU0FBeUI7VUFDckIsSUFBSSxDQUFDQyxLQUFLLENBQUNDLElBQUksQ0FBQ0MsTUFBTSxHQUFHLEtBQUs7U0FDakM7UUFBQUwsTUFBQSxDQUVTTSxTQUFTLEdBQW5CLFNBQUFBLFlBQTRCO1VBQ3hCLElBQUksQ0FBQ1IsTUFBTSxDQUFDUyxPQUFPLENBQUMsVUFBQUMsQ0FBQztZQUFBLE9BQUlBLENBQUMsQ0FBQ0osSUFBSSxDQUFDSyxPQUFPLEVBQUU7WUFBQztVQUMxQyxJQUFJLENBQUNYLE1BQU0sQ0FBQ2IsTUFBTSxHQUFHLENBQUM7U0FDekI7UUFBQWUsTUFBQSxDQUVTVSxLQUFLLEdBQWYsU0FBQUEsUUFBd0I7VUFDcEIsSUFBSSxDQUFDQyxhQUFhLEVBQUU7U0FDdkI7UUFBQVgsTUFBQSxDQUVTWSxRQUFRLEdBQWxCLFNBQUFBLFdBQW1DO1VBQy9CLElBQUksSUFBSSxDQUFDZCxNQUFNLENBQUNiLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxJQUFJLENBQUNhLE1BQU0sQ0FBQ2UsR0FBRyxFQUFFOztVQUU1QixJQUFNVCxJQUFJLEdBQUdVLFdBQVcsQ0FBQyxJQUFJLENBQUNYLEtBQUssQ0FBQ0MsSUFBSSxDQUFDO1VBQ3pDLE9BQU9BLElBQUksQ0FBQ1csWUFBWSxDQUFDN0MsV0FBVyxDQUFDLElBQUlrQyxJQUFJLENBQUNZLFlBQVksQ0FBQzlDLFdBQVcsQ0FBQztTQUMxRTtRQUFBOEIsTUFBQSxDQUVTaUIsV0FBVyxHQUFyQixTQUFBQSxjQUF3QjtVQUFBLElBQUFDLFlBQUE7VUFDcEIsQ0FBQUEsWUFBQSxPQUFJLENBQUNwQixNQUFNLEVBQUNxQixJQUFJLENBQUE3QixLQUFBLENBQUE0QixZQUFBLEVBQUksSUFBSSxDQUFDbkIsT0FBTyxDQUFDO1VBQ2pDLElBQUksQ0FBQ0EsT0FBTyxDQUFDUSxPQUFPLENBQUMsVUFBQUMsQ0FBQztZQUFBLE9BQUlBLENBQUMsQ0FBQ0osSUFBSSxDQUFDQyxNQUFNLEdBQUcsS0FBSztZQUFDO1VBQ2hELElBQUksQ0FBQ04sT0FBTyxDQUFDZCxNQUFNLEdBQUcsQ0FBQztVQUN2QixJQUFJLENBQUNtQyxTQUFTLENBQUNoQixJQUFJLENBQUNpQixpQkFBaUIsRUFBRTtTQUMxQztRQUFBckIsTUFBQSxDQUVEVyxhQUFhLEdBQWIsU0FBQUEsZ0JBQWdCO1VBQ1osSUFBSSxDQUFDTSxXQUFXLEVBQUU7VUFFbEIsSUFBTUssU0FBUyxHQUFHLElBQUksQ0FBQ25CLEtBQUssQ0FBQ29CLFdBQVcsQ0FBQ0MsS0FBSyxFQUFFO1VBQ2hELElBQU1DLEdBQUcsR0FBRyxJQUFJLENBQUNMLFNBQVMsQ0FBQ00sTUFBTSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUNOLFNBQVMsQ0FBQ08sT0FBTyxDQUFDO1VBQ2hFLElBQU1DLElBQUksR0FBRyxJQUFJLENBQUNSLFNBQVMsQ0FBQ1MsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDVCxTQUFTLENBQUNVLE9BQU87VUFFM0RDLE9BQU8sQ0FBQ0MsR0FBRyxVQUFRLElBQUksQ0FBQ0MsR0FBRyxjQUFTLElBQUksQ0FBQ0MsR0FBSyxDQUFDO1VBRS9DLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLElBQUksQ0FBQ0QsR0FBRyxFQUFFLEVBQUVDLENBQUMsRUFBRTtZQUMvQixLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxJQUFJLENBQUNILEdBQUcsRUFBRSxFQUFFRyxDQUFDLEVBQUU7Y0FDL0IsSUFBTUMsS0FBSyxHQUFHLElBQUksQ0FBQ3pCLFFBQVEsRUFBRTtjQUM3Qm1CLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDSyxLQUFLLENBQUM7Y0FDbEJBLEtBQUssQ0FBQ2pDLElBQUksQ0FBQ0MsTUFBTSxHQUFHLElBQUk7Y0FDeEJnQyxLQUFLLENBQUNqQyxJQUFJLENBQUNrQyxNQUFNLEdBQUcsSUFBSSxDQUFDbEIsU0FBUyxDQUFDaEIsSUFBSTtjQUN2Q2lDLEtBQUssQ0FBQ2pDLElBQUksQ0FBQ21DLFdBQVcsQ0FDbEJYLElBQUksR0FBRyxDQUFDUSxDQUFDLEdBQUcsR0FBRyxJQUFJZCxTQUFTLENBQUNPLEtBQUssRUFDbENKLEdBQUcsR0FBRyxDQUFDVSxDQUFDLEdBQUcsR0FBRyxJQUFJYixTQUFTLENBQUNJLE1BQ2hDLENBQUM7Y0FDREssT0FBTyxDQUFDQyxHQUFHLENBQUNLLEtBQUssQ0FBQ2pDLElBQUksQ0FBQ29DLFFBQVEsQ0FBQzs7O1NBRzNDO1FBQUEsT0FBQXpFLE9BQUE7TUFBQSxFQS9Ed0IwRSxTQUFTLElBQUFoRCxXQUFBLEdBQUFpRCx5QkFBQSxDQUFBL0QsT0FBQSxDQUFBc0IsU0FBQSxnQkFBQWhDLEtBQUE7UUFBQTBFLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxRQUFBO1FBQUFDLFdBQUE7TUFBQSxJQUFBbkQsWUFBQSxHQUFBK0MseUJBQUEsQ0FBQS9ELE9BQUEsQ0FBQXNCLFNBQUEsWUFBQTlCLEtBQUE7UUFBQXdFLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxRQUFBO1FBQUFDLFdBQUE7TUFBQSxJQUFBbEQsWUFBQSxHQUFBOEMseUJBQUEsQ0FBQS9ELE9BQUEsQ0FBQXNCLFNBQUEsVUFBQTdCLEtBQUE7UUFBQXVFLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxRQUFBO1FBQUFDLFdBQUEsV0FBQUE7VUFBQSxPQU1YLENBQUM7O01BQUEsSUFBQWpELFlBQUEsR0FBQTZDLHlCQUFBLENBQUEvRCxPQUFBLENBQUFzQixTQUFBLFVBQUF4QixLQUFBO1FBQUFrRSxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsUUFBQTtRQUFBQyxXQUFBLFdBQUFBO1VBQUEsT0FFRCxDQUFDOztNQUFBLEtBQUFuRSxPQUFBLE1BQUFELE1BQUE7Y0F3RDNCLENBQUFxRSxHQUFBLENBQUFsQyxHQUFBIiwiZmlsZSI6ImFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IF9kZWNvcmF0b3IsIGFzc2VydCwgQ0NJbnRlZ2VyLCBDb21wb25lbnQsIGluc3RhbnRpYXRlLCBOb2RlLCBQcmVmYWIsIFNwcml0ZSwgU3ByaXRlRnJhbWUsIFVJVHJhbnNmb3JtIH0gZnJvbSAnY2MnO1xyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBfZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3MoJ0FycmFuZ2UnKVxyXG5leHBvcnQgY2xhc3MgQXJyYW5nZSBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoVUlUcmFuc2Zvcm0pXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbnRhaW5lciA6IFVJVHJhbnNmb3JtO1xyXG4gICAgQHByb3BlcnR5KFVJVHJhbnNmb3JtKVxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBwcm90byA6IFVJVHJhbnNmb3JtO1xyXG4gICAgQHByb3BlcnR5KHsgbWluOjEsIHN0ZXA6MSwgdHlwZTpDQ0ludGVnZXIgfSlcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgcm93ID0gMTtcclxuICAgIEBwcm9wZXJ0eSh7IG1pbjoxLCBzdGVwOjEsIHR5cGU6Q0NJbnRlZ2VyIH0pXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbCA9IDE7XHJcblxyXG4gICAgcHJpdmF0ZSBfY2FjaGUgPSBbXSBhcyBVSVRyYW5zZm9ybVtdO1xyXG4gICAgcHJpdmF0ZSBfYmxvY2tzID0gW10gYXMgVUlUcmFuc2Zvcm1bXTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucHJvdG8ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NhY2hlLmZvckVhY2godiA9PiB2Lm5vZGUuZGVzdHJveSgpKTtcclxuICAgICAgICB0aGlzLl9jYWNoZS5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFycmFuZ2VCbG9ja3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0QmxvY2soKSA6IFVJVHJhbnNmb3JtIHtcclxuICAgICAgICBpZiAodGhpcy5fY2FjaGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGUucG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG5vZGUgPSBpbnN0YW50aWF0ZSh0aGlzLnByb3RvLm5vZGUpO1xyXG4gICAgICAgIHJldHVybiBub2RlLmdldENvbXBvbmVudChVSVRyYW5zZm9ybSkgfHwgbm9kZS5hZGRDb21wb25lbnQoVUlUcmFuc2Zvcm0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBjbGVhckJsb2NrcygpIHtcclxuICAgICAgICB0aGlzLl9jYWNoZS5wdXNoKC4uLnRoaXMuX2Jsb2Nrcyk7XHJcbiAgICAgICAgdGhpcy5fYmxvY2tzLmZvckVhY2godiA9PiB2Lm5vZGUuYWN0aXZlID0gZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuX2Jsb2Nrcy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLm5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBhcnJhbmdlQmxvY2tzKCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJCbG9ja3MoKTtcclxuXHJcbiAgICAgICAgY29uc3QgYmxvY2tTaXplID0gdGhpcy5wcm90by5jb250ZW50U2l6ZS5jbG9uZSgpO1xyXG4gICAgICAgIGNvbnN0IHRvcCA9IHRoaXMuY29udGFpbmVyLmhlaWdodCAqICgxIC0gdGhpcy5jb250YWluZXIuYW5jaG9yWSk7XHJcbiAgICAgICAgY29uc3QgbGVmdCA9IHRoaXMuY29udGFpbmVyLndpZHRoICogLXRoaXMuY29udGFpbmVyLmFuY2hvclg7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGBjb2w6JHt0aGlzLmNvbH0sIHJvdzoke3RoaXMucm93fWApO1xyXG5cclxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMucm93OyArK3kpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmNvbDsgKyt4KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBibG9jayA9IHRoaXMuZ2V0QmxvY2soKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJsb2NrKTtcclxuICAgICAgICAgICAgICAgIGJsb2NrLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJsb2NrLm5vZGUucGFyZW50ID0gdGhpcy5jb250YWluZXIubm9kZTtcclxuICAgICAgICAgICAgICAgIGJsb2NrLm5vZGUuc2V0UG9zaXRpb24oXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdCArICh4ICsgMC41KSAqIGJsb2NrU2l6ZS53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICB0b3AgLSAoeSArIDAuNSkgKiBibG9ja1NpemUuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJsb2NrLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIl19