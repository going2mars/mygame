System.register(['./virtual_cc-737126c3.js'], (function (exports) {
  'use strict';
  var _createForOfIteratorHelperLoose;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module._;
    }],
    execute: (function () {

      var spineWasm = exports('default', function () {
        var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
        return function (spineWasm) {
          if (spineWasm === void 0) {
            spineWasm = {};
          }
          var Module = typeof spineWasm != "undefined" ? spineWasm : {};
          var readyPromiseResolve, readyPromiseReject;
          Module["ready"] = new Promise(function (resolve, reject) {
            readyPromiseResolve = resolve;
            readyPromiseReject = reject;
          });
          var moduleOverrides = Object.assign({}, Module);
          var ENVIRONMENT_IS_WEB = true;
          var scriptDirectory = "";
          function locateFile(path) {
            if (Module["locateFile"]) {
              return Module["locateFile"](path, scriptDirectory);
            }
            return scriptDirectory + path;
          }
          var readBinary;
          {
            if (typeof document != "undefined" && document.currentScript) {
              scriptDirectory = document.currentScript.src;
            }
            if (_scriptDir) {
              scriptDirectory = _scriptDir;
            }
            if (scriptDirectory.indexOf("blob:") !== 0) {
              scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
            } else {
              scriptDirectory = "";
            }
          }
          var out = Module["print"] || console.log.bind(console);
          var err = Module["printErr"] || console.error.bind(console);
          Object.assign(Module, moduleOverrides);
          moduleOverrides = null;
          if (Module["arguments"]) Module["arguments"];
          if (Module["thisProgram"]) Module["thisProgram"];
          if (Module["quit"]) Module["quit"];
          var wasmBinary;
          if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
          Module["noExitRuntime"] || true;
          if (typeof WebAssembly != "object") {
            abort("no native wasm support detected");
          }
          var wasmMemory;
          var ABORT = false;
          function assert(condition, text) {
            if (!condition) {
              abort(text);
            }
          }
          var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
          function updateMemoryViews() {
            var b = wasmMemory.buffer;
            Module["HEAP8"] = HEAP8 = new Int8Array(b);
            Module["HEAP16"] = HEAP16 = new Int16Array(b);
            Module["HEAP32"] = HEAP32 = new Int32Array(b);
            Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
            Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
            Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
            Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
            Module["HEAPF64"] = HEAPF64 = new Float64Array(b);
          }
          var wasmTable;
          var __ATPRERUN__ = [];
          var __ATINIT__ = [];
          var __ATPOSTRUN__ = [];
          function preRun() {
            if (Module["preRun"]) {
              if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
              while (Module["preRun"].length) {
                addOnPreRun(Module["preRun"].shift());
              }
            }
            callRuntimeCallbacks(__ATPRERUN__);
          }
          function initRuntime() {
            callRuntimeCallbacks(__ATINIT__);
          }
          function postRun() {
            if (Module["postRun"]) {
              if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
              while (Module["postRun"].length) {
                addOnPostRun(Module["postRun"].shift());
              }
            }
            callRuntimeCallbacks(__ATPOSTRUN__);
          }
          function addOnPreRun(cb) {
            __ATPRERUN__.unshift(cb);
          }
          function addOnInit(cb) {
            __ATINIT__.unshift(cb);
          }
          function addOnPostRun(cb) {
            __ATPOSTRUN__.unshift(cb);
          }
          var runDependencies = 0;
          var dependenciesFulfilled = null;
          function addRunDependency(id) {
            runDependencies++;
            if (Module["monitorRunDependencies"]) {
              Module["monitorRunDependencies"](runDependencies);
            }
          }
          function removeRunDependency(id) {
            runDependencies--;
            if (Module["monitorRunDependencies"]) {
              Module["monitorRunDependencies"](runDependencies);
            }
            if (runDependencies == 0) {
              if (dependenciesFulfilled) {
                var callback = dependenciesFulfilled;
                dependenciesFulfilled = null;
                callback();
              }
            }
          }
          function abort(what) {
            if (Module["onAbort"]) {
              Module["onAbort"](what);
            }
            what = "Aborted(" + what + ")";
            err(what);
            ABORT = true;
            what += ". Build with -sASSERTIONS for more info.";
            var e = new WebAssembly.RuntimeError(what);
            readyPromiseReject(e);
            throw e;
          }
          var dataURIPrefix = "data:application/octet-stream;base64,";
          function isDataURI(filename) {
            return filename.startsWith(dataURIPrefix);
          }
          var wasmBinaryFile;
          wasmBinaryFile = "spine.wasm";
          if (!isDataURI(wasmBinaryFile)) {
            wasmBinaryFile = locateFile(wasmBinaryFile);
          }
          function getBinary(file) {
            try {
              if (file == wasmBinaryFile && wasmBinary) {
                return new Uint8Array(wasmBinary);
              }
              if (readBinary) ;
              throw "both async and sync fetching of the wasm failed";
            } catch (err) {
              abort(err);
            }
          }
          function getBinaryPromise(binaryFile) {
            if (!wasmBinary && (ENVIRONMENT_IS_WEB )) {
              if (typeof fetch == "function") {
                return fetch(binaryFile, {
                  credentials: "same-origin"
                }).then(function (response) {
                  if (!response["ok"]) {
                    throw "failed to load wasm binary file at '" + binaryFile + "'";
                  }
                  return response["arrayBuffer"]();
                })["catch"](function () {
                  return getBinary(binaryFile);
                });
              }
            }
            return Promise.resolve().then(function () {
              return getBinary(binaryFile);
            });
          }
          function instantiateArrayBuffer(binaryFile, imports, receiver) {
            return getBinaryPromise(binaryFile).then(function (binary) {
              return WebAssembly.instantiate(binary, imports);
            }).then(function (instance) {
              return instance;
            }).then(receiver, function (reason) {
              err("failed to asynchronously prepare wasm: " + reason);
              abort(reason);
            });
          }
          function instantiateAsync(binary, binaryFile, imports, callback) {
            if (!binary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(binaryFile) && typeof fetch == "function") {
              return fetch(binaryFile, {
                credentials: "same-origin"
              }).then(function (response) {
                var result = WebAssembly.instantiateStreaming(response, imports);
                return result.then(callback, function (reason) {
                  err("wasm streaming compile failed: " + reason);
                  err("falling back to ArrayBuffer instantiation");
                  return instantiateArrayBuffer(binaryFile, imports, callback);
                });
              });
            } else {
              return instantiateArrayBuffer(binaryFile, imports, callback);
            }
          }
          function createWasm() {
            var info = {
              "a": wasmImports
            };
            function receiveInstance(instance, module) {
              var exports = instance.exports;
              Module["asm"] = exports;
              wasmMemory = Module["asm"]["I"];
              updateMemoryViews();
              wasmTable = Module["asm"]["K"];
              addOnInit(Module["asm"]["J"]);
              removeRunDependency();
              return exports;
            }
            addRunDependency();
            function receiveInstantiationResult(result) {
              receiveInstance(result["instance"]);
            }
            if (Module["instantiateWasm"]) {
              try {
                return Module["instantiateWasm"](info, receiveInstance);
              } catch (e) {
                err("Module.instantiateWasm callback failed with error: " + e);
                readyPromiseReject(e);
              }
            }
            instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult)["catch"](readyPromiseReject);
            return {};
          }
          function callRuntimeCallbacks(callbacks) {
            while (callbacks.length > 0) {
              callbacks.shift()(Module);
            }
          }
          var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : undefined;
          function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead) {
            var endIdx = idx + maxBytesToRead;
            var endPtr = idx;
            while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
            if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
              return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
            }
            var str = "";
            while (idx < endPtr) {
              var u0 = heapOrArray[idx++];
              if (!(u0 & 128)) {
                str += String.fromCharCode(u0);
                continue;
              }
              var u1 = heapOrArray[idx++] & 63;
              if ((u0 & 224) == 192) {
                str += String.fromCharCode((u0 & 31) << 6 | u1);
                continue;
              }
              var u2 = heapOrArray[idx++] & 63;
              if ((u0 & 240) == 224) {
                u0 = (u0 & 15) << 12 | u1 << 6 | u2;
              } else {
                u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
              }
              if (u0 < 65536) {
                str += String.fromCharCode(u0);
              } else {
                var ch = u0 - 65536;
                str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
              }
            }
            return str;
          }
          function UTF8ToString(ptr, maxBytesToRead) {
            return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
          }
          function ___syscall_fcntl64(fd, cmd, varargs) {
            return 0;
          }
          function ___syscall_ioctl(fd, op, varargs) {
            return 0;
          }
          function ___syscall_openat(dirfd, path, flags, varargs) {
          }
          function __embind_register_bigint(primitiveType, name, size, minRange, maxRange) {}
          function getShiftFromSize(size) {
            switch (size) {
              case 1:
                return 0;
              case 2:
                return 1;
              case 4:
                return 2;
              case 8:
                return 3;
              default:
                throw new TypeError("Unknown type size: " + size);
            }
          }
          function embind_init_charCodes() {
            var codes = new Array(256);
            for (var i = 0; i < 256; ++i) {
              codes[i] = String.fromCharCode(i);
            }
            embind_charCodes = codes;
          }
          var embind_charCodes = undefined;
          function readLatin1String(ptr) {
            var ret = "";
            var c = ptr;
            while (HEAPU8[c]) {
              ret += embind_charCodes[HEAPU8[c++]];
            }
            return ret;
          }
          var awaitingDependencies = {};
          var registeredTypes = {};
          var typeDependencies = {};
          var char_0 = 48;
          var char_9 = 57;
          function makeLegalFunctionName(name) {
            if (undefined === name) {
              return "_unknown";
            }
            name = name.replace(/[^a-zA-Z0-9_]/g, "$");
            var f = name.charCodeAt(0);
            if (f >= char_0 && f <= char_9) {
              return "_" + name;
            }
            return name;
          }
          function createNamedFunction(name, body) {
            var _name$name;
            name = makeLegalFunctionName(name);
            return (_name$name = {}, _name$name[name] = function () {
              return body.apply(this, arguments);
            }, _name$name)[name];
          }
          function extendError(baseErrorType, errorName) {
            var errorClass = createNamedFunction(errorName, function (message) {
              this.name = errorName;
              this.message = message;
              var stack = new Error(message).stack;
              if (stack !== undefined) {
                this.stack = this.toString() + "\n" + stack.replace(/^Error(:[^\n]*)?\n/, "");
              }
            });
            errorClass.prototype = Object.create(baseErrorType.prototype);
            errorClass.prototype.constructor = errorClass;
            errorClass.prototype.toString = function () {
              if (this.message === undefined) {
                return this.name;
              } else {
                return this.name + ": " + this.message;
              }
            };
            return errorClass;
          }
          var BindingError = undefined;
          function throwBindingError(message) {
            throw new BindingError(message);
          }
          var InternalError = undefined;
          function throwInternalError(message) {
            throw new InternalError(message);
          }
          function whenDependentTypesAreResolved(myTypes, dependentTypes, getTypeConverters) {
            myTypes.forEach(function (type) {
              typeDependencies[type] = dependentTypes;
            });
            function onComplete(typeConverters) {
              var myTypeConverters = getTypeConverters(typeConverters);
              if (myTypeConverters.length !== myTypes.length) {
                throwInternalError("Mismatched type converter count");
              }
              for (var i = 0; i < myTypes.length; ++i) {
                registerType(myTypes[i], myTypeConverters[i]);
              }
            }
            var typeConverters = new Array(dependentTypes.length);
            var unregisteredTypes = [];
            var registered = 0;
            dependentTypes.forEach(function (dt, i) {
              if (registeredTypes.hasOwnProperty(dt)) {
                typeConverters[i] = registeredTypes[dt];
              } else {
                unregisteredTypes.push(dt);
                if (!awaitingDependencies.hasOwnProperty(dt)) {
                  awaitingDependencies[dt] = [];
                }
                awaitingDependencies[dt].push(function () {
                  typeConverters[i] = registeredTypes[dt];
                  ++registered;
                  if (registered === unregisteredTypes.length) {
                    onComplete(typeConverters);
                  }
                });
              }
            });
            if (0 === unregisteredTypes.length) {
              onComplete(typeConverters);
            }
          }
          function registerType(rawType, registeredInstance, options) {
            if (options === void 0) {
              options = {};
            }
            if (!("argPackAdvance" in registeredInstance)) {
              throw new TypeError("registerType registeredInstance requires argPackAdvance");
            }
            var name = registeredInstance.name;
            if (!rawType) {
              throwBindingError("type \"" + name + "\" must have a positive integer typeid pointer");
            }
            if (registeredTypes.hasOwnProperty(rawType)) {
              if (options.ignoreDuplicateRegistrations) {
                return;
              } else {
                throwBindingError("Cannot register type '" + name + "' twice");
              }
            }
            registeredTypes[rawType] = registeredInstance;
            delete typeDependencies[rawType];
            if (awaitingDependencies.hasOwnProperty(rawType)) {
              var callbacks = awaitingDependencies[rawType];
              delete awaitingDependencies[rawType];
              callbacks.forEach(function (cb) {
                return cb();
              });
            }
          }
          function __embind_register_bool(rawType, name, size, trueValue, falseValue) {
            var shift = getShiftFromSize(size);
            name = readLatin1String(name);
            registerType(rawType, {
              name: name,
              "fromWireType": function fromWireType(wt) {
                return !!wt;
              },
              "toWireType": function toWireType(destructors, o) {
                return o ? trueValue : falseValue;
              },
              "argPackAdvance": 8,
              "readValueFromPointer": function readValueFromPointer(pointer) {
                var heap;
                if (size === 1) {
                  heap = HEAP8;
                } else if (size === 2) {
                  heap = HEAP16;
                } else if (size === 4) {
                  heap = HEAP32;
                } else {
                  throw new TypeError("Unknown boolean type size: " + name);
                }
                return this["fromWireType"](heap[pointer >> shift]);
              },
              destructorFunction: null
            });
          }
          function ClassHandle_isAliasOf(other) {
            if (!(this instanceof ClassHandle)) {
              return false;
            }
            if (!(other instanceof ClassHandle)) {
              return false;
            }
            var leftClass = this.$$.ptrType.registeredClass;
            var left = this.$$.ptr;
            var rightClass = other.$$.ptrType.registeredClass;
            var right = other.$$.ptr;
            while (leftClass.baseClass) {
              left = leftClass.upcast(left);
              leftClass = leftClass.baseClass;
            }
            while (rightClass.baseClass) {
              right = rightClass.upcast(right);
              rightClass = rightClass.baseClass;
            }
            return leftClass === rightClass && left === right;
          }
          function shallowCopyInternalPointer(o) {
            return {
              count: o.count,
              deleteScheduled: o.deleteScheduled,
              preservePointerOnDelete: o.preservePointerOnDelete,
              ptr: o.ptr,
              ptrType: o.ptrType,
              smartPtr: o.smartPtr,
              smartPtrType: o.smartPtrType
            };
          }
          function throwInstanceAlreadyDeleted(obj) {
            function getInstanceTypeName(handle) {
              return handle.$$.ptrType.registeredClass.name;
            }
            throwBindingError(getInstanceTypeName(obj) + " instance already deleted");
          }
          var finalizationRegistry = false;
          function detachFinalizer(handle) {}
          function runDestructor($$) {
            if ($$.smartPtr) {
              $$.smartPtrType.rawDestructor($$.smartPtr);
            } else {
              $$.ptrType.registeredClass.rawDestructor($$.ptr);
            }
          }
          function releaseClassHandle($$) {
            $$.count.value -= 1;
            var toDelete = 0 === $$.count.value;
            if (toDelete) {
              runDestructor($$);
            }
          }
          function downcastPointer(ptr, ptrClass, desiredClass) {
            if (ptrClass === desiredClass) {
              return ptr;
            }
            if (undefined === desiredClass.baseClass) {
              return null;
            }
            var rv = downcastPointer(ptr, ptrClass, desiredClass.baseClass);
            if (rv === null) {
              return null;
            }
            return desiredClass.downcast(rv);
          }
          var registeredPointers = {};
          function getInheritedInstanceCount() {
            return Object.keys(registeredInstances).length;
          }
          function getLiveInheritedInstances() {
            var rv = [];
            for (var k in registeredInstances) {
              if (registeredInstances.hasOwnProperty(k)) {
                rv.push(registeredInstances[k]);
              }
            }
            return rv;
          }
          var deletionQueue = [];
          function flushPendingDeletes() {
            while (deletionQueue.length) {
              var obj = deletionQueue.pop();
              obj.$$.deleteScheduled = false;
              obj["delete"]();
            }
          }
          var delayFunction = undefined;
          function setDelayFunction(fn) {
            delayFunction = fn;
            if (deletionQueue.length && delayFunction) {
              delayFunction(flushPendingDeletes);
            }
          }
          function init_embind() {
            Module["getInheritedInstanceCount"] = getInheritedInstanceCount;
            Module["getLiveInheritedInstances"] = getLiveInheritedInstances;
            Module["flushPendingDeletes"] = flushPendingDeletes;
            Module["setDelayFunction"] = setDelayFunction;
          }
          var registeredInstances = {};
          function getBasestPointer(class_, ptr) {
            if (ptr === undefined) {
              throwBindingError("ptr should not be undefined");
            }
            while (class_.baseClass) {
              ptr = class_.upcast(ptr);
              class_ = class_.baseClass;
            }
            return ptr;
          }
          function getInheritedInstance(class_, ptr) {
            ptr = getBasestPointer(class_, ptr);
            return registeredInstances[ptr];
          }
          function makeClassHandle(prototype, record) {
            if (!record.ptrType || !record.ptr) {
              throwInternalError("makeClassHandle requires ptr and ptrType");
            }
            var hasSmartPtrType = !!record.smartPtrType;
            var hasSmartPtr = !!record.smartPtr;
            if (hasSmartPtrType !== hasSmartPtr) {
              throwInternalError("Both smartPtrType and smartPtr must be specified");
            }
            record.count = {
              value: 1
            };
            return attachFinalizer(Object.create(prototype, {
              $$: {
                value: record
              }
            }));
          }
          function RegisteredPointer_fromWireType(ptr) {
            var rawPointer = this.getPointee(ptr);
            if (!rawPointer) {
              this.destructor(ptr);
              return null;
            }
            var registeredInstance = getInheritedInstance(this.registeredClass, rawPointer);
            if (undefined !== registeredInstance) {
              if (0 === registeredInstance.$$.count.value) {
                registeredInstance.$$.ptr = rawPointer;
                registeredInstance.$$.smartPtr = ptr;
                return registeredInstance["clone"]();
              } else {
                var rv = registeredInstance["clone"]();
                this.destructor(ptr);
                return rv;
              }
            }
            function makeDefaultHandle() {
              if (this.isSmartPointer) {
                return makeClassHandle(this.registeredClass.instancePrototype, {
                  ptrType: this.pointeeType,
                  ptr: rawPointer,
                  smartPtrType: this,
                  smartPtr: ptr
                });
              } else {
                return makeClassHandle(this.registeredClass.instancePrototype, {
                  ptrType: this,
                  ptr: ptr
                });
              }
            }
            var actualType = this.registeredClass.getActualType(rawPointer);
            var registeredPointerRecord = registeredPointers[actualType];
            if (!registeredPointerRecord) {
              return makeDefaultHandle.call(this);
            }
            var toType;
            if (this.isConst) {
              toType = registeredPointerRecord.constPointerType;
            } else {
              toType = registeredPointerRecord.pointerType;
            }
            var dp = downcastPointer(rawPointer, this.registeredClass, toType.registeredClass);
            if (dp === null) {
              return makeDefaultHandle.call(this);
            }
            if (this.isSmartPointer) {
              return makeClassHandle(toType.registeredClass.instancePrototype, {
                ptrType: toType,
                ptr: dp,
                smartPtrType: this,
                smartPtr: ptr
              });
            } else {
              return makeClassHandle(toType.registeredClass.instancePrototype, {
                ptrType: toType,
                ptr: dp
              });
            }
          }
          function attachFinalizer(handle) {
            if ("undefined" === typeof FinalizationRegistry) {
              attachFinalizer = function attachFinalizer(handle) {
                return handle;
              };
              return handle;
            }
            finalizationRegistry = new FinalizationRegistry(function (info) {
              releaseClassHandle(info.$$);
            });
            attachFinalizer = function attachFinalizer(handle) {
              var $$ = handle.$$;
              var hasSmartPtr = !!$$.smartPtr;
              if (hasSmartPtr) {
                var info = {
                  $$: $$
                };
                finalizationRegistry.register(handle, info, handle);
              }
              return handle;
            };
            detachFinalizer = function detachFinalizer(handle) {
              return finalizationRegistry.unregister(handle);
            };
            return attachFinalizer(handle);
          }
          function ClassHandle_clone() {
            if (!this.$$.ptr) {
              throwInstanceAlreadyDeleted(this);
            }
            if (this.$$.preservePointerOnDelete) {
              this.$$.count.value += 1;
              return this;
            } else {
              var clone = attachFinalizer(Object.create(Object.getPrototypeOf(this), {
                $$: {
                  value: shallowCopyInternalPointer(this.$$)
                }
              }));
              clone.$$.count.value += 1;
              clone.$$.deleteScheduled = false;
              return clone;
            }
          }
          function ClassHandle_delete() {
            if (!this.$$.ptr) {
              throwInstanceAlreadyDeleted(this);
            }
            if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
              throwBindingError("Object already scheduled for deletion");
            }
            detachFinalizer(this);
            releaseClassHandle(this.$$);
            if (!this.$$.preservePointerOnDelete) {
              this.$$.smartPtr = undefined;
              this.$$.ptr = undefined;
            }
          }
          function ClassHandle_isDeleted() {
            return !this.$$.ptr;
          }
          function ClassHandle_deleteLater() {
            if (!this.$$.ptr) {
              throwInstanceAlreadyDeleted(this);
            }
            if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
              throwBindingError("Object already scheduled for deletion");
            }
            deletionQueue.push(this);
            if (deletionQueue.length === 1 && delayFunction) {
              delayFunction(flushPendingDeletes);
            }
            this.$$.deleteScheduled = true;
            return this;
          }
          function init_ClassHandle() {
            ClassHandle.prototype["isAliasOf"] = ClassHandle_isAliasOf;
            ClassHandle.prototype["clone"] = ClassHandle_clone;
            ClassHandle.prototype["delete"] = ClassHandle_delete;
            ClassHandle.prototype["isDeleted"] = ClassHandle_isDeleted;
            ClassHandle.prototype["deleteLater"] = ClassHandle_deleteLater;
          }
          function ClassHandle() {}
          function ensureOverloadTable(proto, methodName, humanName) {
            if (undefined === proto[methodName].overloadTable) {
              var prevFunc = proto[methodName];
              proto[methodName] = function () {
                if (!proto[methodName].overloadTable.hasOwnProperty(arguments.length)) {
                  throwBindingError("Function '" + humanName + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + proto[methodName].overloadTable + ")!");
                }
                return proto[methodName].overloadTable[arguments.length].apply(this, arguments);
              };
              proto[methodName].overloadTable = [];
              proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
            }
          }
          function exposePublicSymbol(name, value, numArguments) {
            if (Module.hasOwnProperty(name)) {
              if (undefined === numArguments || undefined !== Module[name].overloadTable && undefined !== Module[name].overloadTable[numArguments]) {
                throwBindingError("Cannot register public name '" + name + "' twice");
              }
              ensureOverloadTable(Module, name, name);
              if (Module.hasOwnProperty(numArguments)) {
                throwBindingError("Cannot register multiple overloads of a function with the same number of arguments (" + numArguments + ")!");
              }
              Module[name].overloadTable[numArguments] = value;
            } else {
              Module[name] = value;
              if (undefined !== numArguments) {
                Module[name].numArguments = numArguments;
              }
            }
          }
          function RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast) {
            this.name = name;
            this.constructor = constructor;
            this.instancePrototype = instancePrototype;
            this.rawDestructor = rawDestructor;
            this.baseClass = baseClass;
            this.getActualType = getActualType;
            this.upcast = upcast;
            this.downcast = downcast;
            this.pureVirtualFunctions = [];
          }
          function upcastPointer(ptr, ptrClass, desiredClass) {
            while (ptrClass !== desiredClass) {
              if (!ptrClass.upcast) {
                throwBindingError("Expected null or instance of " + desiredClass.name + ", got an instance of " + ptrClass.name);
              }
              ptr = ptrClass.upcast(ptr);
              ptrClass = ptrClass.baseClass;
            }
            return ptr;
          }
          function constNoSmartPtrRawPointerToWireType(destructors, handle) {
            if (handle === null) {
              if (this.isReference) {
                throwBindingError("null is not a valid " + this.name);
              }
              return 0;
            }
            if (!handle.$$) {
              throwBindingError("Cannot pass \"" + embindRepr(handle) + "\" as a " + this.name);
            }
            if (!handle.$$.ptr) {
              throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
            }
            var handleClass = handle.$$.ptrType.registeredClass;
            var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
            return ptr;
          }
          function genericPointerToWireType(destructors, handle) {
            var ptr;
            if (handle === null) {
              if (this.isReference) {
                throwBindingError("null is not a valid " + this.name);
              }
              if (this.isSmartPointer) {
                ptr = this.rawConstructor();
                if (destructors !== null) {
                  destructors.push(this.rawDestructor, ptr);
                }
                return ptr;
              } else {
                return 0;
              }
            }
            if (!handle.$$) {
              throwBindingError("Cannot pass \"" + embindRepr(handle) + "\" as a " + this.name);
            }
            if (!handle.$$.ptr) {
              throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
            }
            if (!this.isConst && handle.$$.ptrType.isConst) {
              throwBindingError("Cannot convert argument of type " + (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) + " to parameter type " + this.name);
            }
            var handleClass = handle.$$.ptrType.registeredClass;
            ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
            if (this.isSmartPointer) {
              if (undefined === handle.$$.smartPtr) {
                throwBindingError("Passing raw pointer to smart pointer is illegal");
              }
              switch (this.sharingPolicy) {
                case 0:
                  if (handle.$$.smartPtrType === this) {
                    ptr = handle.$$.smartPtr;
                  } else {
                    throwBindingError("Cannot convert argument of type " + (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) + " to parameter type " + this.name);
                  }
                  break;
                case 1:
                  ptr = handle.$$.smartPtr;
                  break;
                case 2:
                  if (handle.$$.smartPtrType === this) {
                    ptr = handle.$$.smartPtr;
                  } else {
                    var clonedHandle = handle["clone"]();
                    ptr = this.rawShare(ptr, Emval.toHandle(function () {
                      clonedHandle["delete"]();
                    }));
                    if (destructors !== null) {
                      destructors.push(this.rawDestructor, ptr);
                    }
                  }
                  break;
                default:
                  throwBindingError("Unsupporting sharing policy");
              }
            }
            return ptr;
          }
          function nonConstNoSmartPtrRawPointerToWireType(destructors, handle) {
            if (handle === null) {
              if (this.isReference) {
                throwBindingError("null is not a valid " + this.name);
              }
              return 0;
            }
            if (!handle.$$) {
              throwBindingError("Cannot pass \"" + embindRepr(handle) + "\" as a " + this.name);
            }
            if (!handle.$$.ptr) {
              throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
            }
            if (handle.$$.ptrType.isConst) {
              throwBindingError("Cannot convert argument of type " + handle.$$.ptrType.name + " to parameter type " + this.name);
            }
            var handleClass = handle.$$.ptrType.registeredClass;
            var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
            return ptr;
          }
          function simpleReadValueFromPointer(pointer) {
            return this["fromWireType"](HEAP32[pointer >> 2]);
          }
          function RegisteredPointer_getPointee(ptr) {
            if (this.rawGetPointee) {
              ptr = this.rawGetPointee(ptr);
            }
            return ptr;
          }
          function RegisteredPointer_destructor(ptr) {
            if (this.rawDestructor) {
              this.rawDestructor(ptr);
            }
          }
          function RegisteredPointer_deleteObject(handle) {
            if (handle !== null) {
              handle["delete"]();
            }
          }
          function init_RegisteredPointer() {
            RegisteredPointer.prototype.getPointee = RegisteredPointer_getPointee;
            RegisteredPointer.prototype.destructor = RegisteredPointer_destructor;
            RegisteredPointer.prototype["argPackAdvance"] = 8;
            RegisteredPointer.prototype["readValueFromPointer"] = simpleReadValueFromPointer;
            RegisteredPointer.prototype["deleteObject"] = RegisteredPointer_deleteObject;
            RegisteredPointer.prototype["fromWireType"] = RegisteredPointer_fromWireType;
          }
          function RegisteredPointer(name, registeredClass, isReference, isConst, isSmartPointer, pointeeType, sharingPolicy, rawGetPointee, rawConstructor, rawShare, rawDestructor) {
            this.name = name;
            this.registeredClass = registeredClass;
            this.isReference = isReference;
            this.isConst = isConst;
            this.isSmartPointer = isSmartPointer;
            this.pointeeType = pointeeType;
            this.sharingPolicy = sharingPolicy;
            this.rawGetPointee = rawGetPointee;
            this.rawConstructor = rawConstructor;
            this.rawShare = rawShare;
            this.rawDestructor = rawDestructor;
            if (!isSmartPointer && registeredClass.baseClass === undefined) {
              if (isConst) {
                this["toWireType"] = constNoSmartPtrRawPointerToWireType;
                this.destructorFunction = null;
              } else {
                this["toWireType"] = nonConstNoSmartPtrRawPointerToWireType;
                this.destructorFunction = null;
              }
            } else {
              this["toWireType"] = genericPointerToWireType;
            }
          }
          function replacePublicSymbol(name, value, numArguments) {
            if (!Module.hasOwnProperty(name)) {
              throwInternalError("Replacing nonexistant public symbol");
            }
            if (undefined !== Module[name].overloadTable && undefined !== numArguments) {
              Module[name].overloadTable[numArguments] = value;
            } else {
              Module[name] = value;
              Module[name].argCount = numArguments;
            }
          }
          function dynCallLegacy(sig, ptr, args) {
            var f = Module["dynCall_" + sig];
            return args && args.length ? f.apply(null, [ptr].concat(args)) : f.call(null, ptr);
          }
          var wasmTableMirror = [];
          function getWasmTableEntry(funcPtr) {
            var func = wasmTableMirror[funcPtr];
            if (!func) {
              if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
              wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
            }
            return func;
          }
          function dynCall(sig, ptr, args) {
            if (sig.includes("j")) {
              return dynCallLegacy(sig, ptr, args);
            }
            var rtn = getWasmTableEntry(ptr).apply(null, args);
            return rtn;
          }
          function getDynCaller(sig, ptr) {
            var argCache = [];
            return function () {
              argCache.length = 0;
              Object.assign(argCache, arguments);
              return dynCall(sig, ptr, argCache);
            };
          }
          function embind__requireFunction(signature, rawFunction) {
            signature = readLatin1String(signature);
            function makeDynCaller() {
              if (signature.includes("j")) {
                return getDynCaller(signature, rawFunction);
              }
              return getWasmTableEntry(rawFunction);
            }
            var fp = makeDynCaller();
            if (typeof fp != "function") {
              throwBindingError("unknown function pointer with signature " + signature + ": " + rawFunction);
            }
            return fp;
          }
          var UnboundTypeError = undefined;
          function getTypeName(type) {
            var ptr = _getTypeName(type);
            var rv = readLatin1String(ptr);
            _free2(ptr);
            return rv;
          }
          function throwUnboundTypeError(message, types) {
            var unboundTypes = [];
            var seen = {};
            function visit(type) {
              if (seen[type]) {
                return;
              }
              if (registeredTypes[type]) {
                return;
              }
              if (typeDependencies[type]) {
                typeDependencies[type].forEach(visit);
                return;
              }
              unboundTypes.push(type);
              seen[type] = true;
            }
            types.forEach(visit);
            throw new UnboundTypeError(message + ": " + unboundTypes.map(getTypeName).join([", "]));
          }
          function __embind_register_class(rawType, rawPointerType, rawConstPointerType, baseClassRawType, getActualTypeSignature, getActualType, upcastSignature, upcast, downcastSignature, downcast, name, destructorSignature, rawDestructor) {
            name = readLatin1String(name);
            getActualType = embind__requireFunction(getActualTypeSignature, getActualType);
            if (upcast) {
              upcast = embind__requireFunction(upcastSignature, upcast);
            }
            if (downcast) {
              downcast = embind__requireFunction(downcastSignature, downcast);
            }
            rawDestructor = embind__requireFunction(destructorSignature, rawDestructor);
            var legalFunctionName = makeLegalFunctionName(name);
            exposePublicSymbol(legalFunctionName, function () {
              throwUnboundTypeError("Cannot construct " + name + " due to unbound types", [baseClassRawType]);
            });
            whenDependentTypesAreResolved([rawType, rawPointerType, rawConstPointerType], baseClassRawType ? [baseClassRawType] : [], function (base) {
              base = base[0];
              var baseClass;
              var basePrototype;
              if (baseClassRawType) {
                baseClass = base.registeredClass;
                basePrototype = baseClass.instancePrototype;
              } else {
                basePrototype = ClassHandle.prototype;
              }
              var constructor = createNamedFunction(legalFunctionName, function () {
                if (Object.getPrototypeOf(this) !== instancePrototype) {
                  throw new BindingError("Use 'new' to construct " + name);
                }
                if (undefined === registeredClass.constructor_body) {
                  throw new BindingError(name + " has no accessible constructor");
                }
                var body = registeredClass.constructor_body[arguments.length];
                if (undefined === body) {
                  throw new BindingError("Tried to invoke ctor of " + name + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(registeredClass.constructor_body).toString() + ") parameters instead!");
                }
                return body.apply(this, arguments);
              });
              var instancePrototype = Object.create(basePrototype, {
                constructor: {
                  value: constructor
                }
              });
              constructor.prototype = instancePrototype;
              var registeredClass = new RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast);
              if (registeredClass.baseClass) {
                if (registeredClass.baseClass.__derivedClasses === undefined) {
                  registeredClass.baseClass.__derivedClasses = [];
                }
                registeredClass.baseClass.__derivedClasses.push(registeredClass);
              }
              var referenceConverter = new RegisteredPointer(name, registeredClass, true, false, false);
              var pointerConverter = new RegisteredPointer(name + "*", registeredClass, false, false, false);
              var constPointerConverter = new RegisteredPointer(name + " const*", registeredClass, false, true, false);
              registeredPointers[rawType] = {
                pointerType: pointerConverter,
                constPointerType: constPointerConverter
              };
              replacePublicSymbol(legalFunctionName, constructor);
              return [referenceConverter, pointerConverter, constPointerConverter];
            });
          }
          function runDestructors(destructors) {
            while (destructors.length) {
              var ptr = destructors.pop();
              var del = destructors.pop();
              del(ptr);
            }
          }
          function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc, isAsync) {
            var argCount = argTypes.length;
            if (argCount < 2) {
              throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
            }
            var isClassMethodFunc = argTypes[1] !== null && classType !== null;
            var needsDestructorStack = false;
            for (var i = 1; i < argTypes.length; ++i) {
              if (argTypes[i] !== null && argTypes[i].destructorFunction === undefined) {
                needsDestructorStack = true;
                break;
              }
            }
            var returns = argTypes[0].name !== "void";
            var expectedArgCount = argCount - 2;
            var argsWired = new Array(expectedArgCount);
            var invokerFuncArgs = [];
            var destructors = [];
            return function () {
              if (arguments.length !== expectedArgCount) {
                throwBindingError("function " + humanName + " called with " + arguments.length + " arguments, expected " + expectedArgCount + " args!");
              }
              destructors.length = 0;
              var thisWired;
              invokerFuncArgs.length = isClassMethodFunc ? 2 : 1;
              invokerFuncArgs[0] = cppTargetFunc;
              if (isClassMethodFunc) {
                thisWired = argTypes[1]["toWireType"](destructors, this);
                invokerFuncArgs[1] = thisWired;
              }
              for (var i = 0; i < expectedArgCount; ++i) {
                argsWired[i] = argTypes[i + 2]["toWireType"](destructors, arguments[i]);
                invokerFuncArgs.push(argsWired[i]);
              }
              var rv = cppInvokerFunc.apply(null, invokerFuncArgs);
              function onDone(rv) {
                if (needsDestructorStack) {
                  runDestructors(destructors);
                } else {
                  for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; i++) {
                    var param = i === 1 ? thisWired : argsWired[i - 2];
                    if (argTypes[i].destructorFunction !== null) {
                      argTypes[i].destructorFunction(param);
                    }
                  }
                }
                if (returns) {
                  return argTypes[0]["fromWireType"](rv);
                }
              }
              return onDone(rv);
            };
          }
          function heap32VectorToArray(count, firstElement) {
            var array = [];
            for (var i = 0; i < count; i++) {
              array.push(HEAPU32[firstElement + i * 4 >> 2]);
            }
            return array;
          }
          function __embind_register_class_class_function(rawClassType, methodName, argCount, rawArgTypesAddr, invokerSignature, rawInvoker, fn, isAsync) {
            var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
            methodName = readLatin1String(methodName);
            rawInvoker = embind__requireFunction(invokerSignature, rawInvoker);
            whenDependentTypesAreResolved([], [rawClassType], function (classType) {
              classType = classType[0];
              var humanName = classType.name + "." + methodName;
              function unboundTypesHandler() {
                throwUnboundTypeError("Cannot call " + humanName + " due to unbound types", rawArgTypes);
              }
              if (methodName.startsWith("@@")) {
                methodName = Symbol[methodName.substring(2)];
              }
              var proto = classType.registeredClass.constructor;
              if (undefined === proto[methodName]) {
                unboundTypesHandler.argCount = argCount - 1;
                proto[methodName] = unboundTypesHandler;
              } else {
                ensureOverloadTable(proto, methodName, humanName);
                proto[methodName].overloadTable[argCount - 1] = unboundTypesHandler;
              }
              whenDependentTypesAreResolved([], rawArgTypes, function (argTypes) {
                var invokerArgsArray = [argTypes[0], null].concat(argTypes.slice(1));
                var func = craftInvokerFunction(humanName, invokerArgsArray, null, rawInvoker, fn);
                if (undefined === proto[methodName].overloadTable) {
                  func.argCount = argCount - 1;
                  proto[methodName] = func;
                } else {
                  proto[methodName].overloadTable[argCount - 1] = func;
                }
                if (classType.registeredClass.__derivedClasses) {
                  for (var _iterator = _createForOfIteratorHelperLoose(classType.registeredClass.__derivedClasses), _step; !(_step = _iterator()).done;) {
                    var derivedClass = _step.value;
                    if (!derivedClass.constructor.hasOwnProperty(methodName)) {
                      derivedClass.constructor[methodName] = func;
                    }
                  }
                }
                return [];
              });
              return [];
            });
          }
          function validateThis(this_, classType, humanName) {
            if (!(this_ instanceof Object)) {
              throwBindingError(humanName + " with invalid \"this\": " + this_);
            }
            if (!(this_ instanceof classType.registeredClass.constructor)) {
              throwBindingError(humanName + " incompatible with \"this\" of type " + this_.constructor.name);
            }
            if (!this_.$$.ptr) {
              throwBindingError("cannot call emscripten binding method " + humanName + " on deleted object");
            }
            return upcastPointer(this_.$$.ptr, this_.$$.ptrType.registeredClass, classType.registeredClass);
          }
          function __embind_register_class_class_property(rawClassType, fieldName, rawFieldType, rawFieldPtr, getterSignature, getter, setterSignature, setter) {
            fieldName = readLatin1String(fieldName);
            getter = embind__requireFunction(getterSignature, getter);
            whenDependentTypesAreResolved([], [rawClassType], function (classType) {
              classType = classType[0];
              var humanName = classType.name + "." + fieldName;
              var desc = {
                get: function get() {
                  throwUnboundTypeError("Cannot access " + humanName + " due to unbound types", [rawFieldType]);
                },
                enumerable: true,
                configurable: true
              };
              if (setter) {
                desc.set = function () {
                  throwUnboundTypeError("Cannot access " + humanName + " due to unbound types", [rawFieldType]);
                };
              } else {
                desc.set = function (v) {
                  throwBindingError(humanName + " is a read-only property");
                };
              }
              Object.defineProperty(classType.registeredClass.constructor, fieldName, desc);
              whenDependentTypesAreResolved([], [rawFieldType], function (fieldType) {
                fieldType = fieldType[0];
                var desc = {
                  get: function get() {
                    return fieldType["fromWireType"](getter(rawFieldPtr));
                  },
                  enumerable: true
                };
                if (setter) {
                  setter = embind__requireFunction(setterSignature, setter);
                  desc.set = function (v) {
                    var destructors = [];
                    setter(rawFieldPtr, fieldType["toWireType"](destructors, v));
                    runDestructors(destructors);
                  };
                }
                Object.defineProperty(classType.registeredClass.constructor, fieldName, desc);
                return [];
              });
              return [];
            });
          }
          function __embind_register_class_constructor(rawClassType, argCount, rawArgTypesAddr, invokerSignature, invoker, rawConstructor) {
            assert(argCount > 0);
            var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
            invoker = embind__requireFunction(invokerSignature, invoker);
            whenDependentTypesAreResolved([], [rawClassType], function (classType) {
              classType = classType[0];
              var humanName = "constructor " + classType.name;
              if (undefined === classType.registeredClass.constructor_body) {
                classType.registeredClass.constructor_body = [];
              }
              if (undefined !== classType.registeredClass.constructor_body[argCount - 1]) {
                throw new BindingError("Cannot register multiple constructors with identical number of parameters (" + (argCount - 1) + ") for class '" + classType.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
              }
              classType.registeredClass.constructor_body[argCount - 1] = function () {
                throwUnboundTypeError("Cannot construct " + classType.name + " due to unbound types", rawArgTypes);
              };
              whenDependentTypesAreResolved([], rawArgTypes, function (argTypes) {
                argTypes.splice(1, 0, null);
                classType.registeredClass.constructor_body[argCount - 1] = craftInvokerFunction(humanName, argTypes, null, invoker, rawConstructor);
                return [];
              });
              return [];
            });
          }
          function __embind_register_class_function(rawClassType, methodName, argCount, rawArgTypesAddr, invokerSignature, rawInvoker, context, isPureVirtual, isAsync) {
            var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
            methodName = readLatin1String(methodName);
            rawInvoker = embind__requireFunction(invokerSignature, rawInvoker);
            whenDependentTypesAreResolved([], [rawClassType], function (classType) {
              classType = classType[0];
              var humanName = classType.name + "." + methodName;
              if (methodName.startsWith("@@")) {
                methodName = Symbol[methodName.substring(2)];
              }
              if (isPureVirtual) {
                classType.registeredClass.pureVirtualFunctions.push(methodName);
              }
              function unboundTypesHandler() {
                throwUnboundTypeError("Cannot call " + humanName + " due to unbound types", rawArgTypes);
              }
              var proto = classType.registeredClass.instancePrototype;
              var method = proto[methodName];
              if (undefined === method || undefined === method.overloadTable && method.className !== classType.name && method.argCount === argCount - 2) {
                unboundTypesHandler.argCount = argCount - 2;
                unboundTypesHandler.className = classType.name;
                proto[methodName] = unboundTypesHandler;
              } else {
                ensureOverloadTable(proto, methodName, humanName);
                proto[methodName].overloadTable[argCount - 2] = unboundTypesHandler;
              }
              whenDependentTypesAreResolved([], rawArgTypes, function (argTypes) {
                var memberFunction = craftInvokerFunction(humanName, argTypes, classType, rawInvoker, context);
                if (undefined === proto[methodName].overloadTable) {
                  memberFunction.argCount = argCount - 2;
                  proto[methodName] = memberFunction;
                } else {
                  proto[methodName].overloadTable[argCount - 2] = memberFunction;
                }
                return [];
              });
              return [];
            });
          }
          function __embind_register_class_property(classType, fieldName, getterReturnType, getterSignature, getter, getterContext, setterArgumentType, setterSignature, setter, setterContext) {
            fieldName = readLatin1String(fieldName);
            getter = embind__requireFunction(getterSignature, getter);
            whenDependentTypesAreResolved([], [classType], function (classType) {
              classType = classType[0];
              var humanName = classType.name + "." + fieldName;
              var desc = {
                get: function get() {
                  throwUnboundTypeError("Cannot access " + humanName + " due to unbound types", [getterReturnType, setterArgumentType]);
                },
                enumerable: true,
                configurable: true
              };
              if (setter) {
                desc.set = function () {
                  throwUnboundTypeError("Cannot access " + humanName + " due to unbound types", [getterReturnType, setterArgumentType]);
                };
              } else {
                desc.set = function (v) {
                  throwBindingError(humanName + " is a read-only property");
                };
              }
              Object.defineProperty(classType.registeredClass.instancePrototype, fieldName, desc);
              whenDependentTypesAreResolved([], setter ? [getterReturnType, setterArgumentType] : [getterReturnType], function (types) {
                var getterReturnType = types[0];
                var desc = {
                  get: function get() {
                    var ptr = validateThis(this, classType, humanName + " getter");
                    return getterReturnType["fromWireType"](getter(getterContext, ptr));
                  },
                  enumerable: true
                };
                if (setter) {
                  setter = embind__requireFunction(setterSignature, setter);
                  var setterArgumentType = types[1];
                  desc.set = function (v) {
                    var ptr = validateThis(this, classType, humanName + " setter");
                    var destructors = [];
                    setter(setterContext, ptr, setterArgumentType["toWireType"](destructors, v));
                    runDestructors(destructors);
                  };
                }
                Object.defineProperty(classType.registeredClass.instancePrototype, fieldName, desc);
                return [];
              });
              return [];
            });
          }
          function HandleAllocator() {
            this.allocated = [undefined];
            this.freelist = [];
            this.get = function (id) {
              return this.allocated[id];
            };
            this.has = function (id) {
              return this.allocated[id] !== undefined;
            };
            this.allocate = function (handle) {
              var id = this.freelist.pop() || this.allocated.length;
              this.allocated[id] = handle;
              return id;
            };
            this.free = function (id) {
              this.allocated[id] = undefined;
              this.freelist.push(id);
            };
          }
          var emval_handles = new HandleAllocator();
          function __emval_decref(handle) {
            if (handle >= emval_handles.reserved && 0 === --emval_handles.get(handle).refcount) {
              emval_handles.free(handle);
            }
          }
          function count_emval_handles() {
            var count = 0;
            for (var i = emval_handles.reserved; i < emval_handles.allocated.length; ++i) {
              if (emval_handles.allocated[i] !== undefined) {
                ++count;
              }
            }
            return count;
          }
          function init_emval() {
            emval_handles.allocated.push({
              value: undefined
            }, {
              value: null
            }, {
              value: true
            }, {
              value: false
            });
            emval_handles.reserved = emval_handles.allocated.length;
            Module["count_emval_handles"] = count_emval_handles;
          }
          var Emval = {
            toValue: function toValue(handle) {
              if (!handle) {
                throwBindingError("Cannot use deleted val. handle = " + handle);
              }
              return emval_handles.get(handle).value;
            },
            toHandle: function toHandle(value) {
              switch (value) {
                case undefined:
                  return 1;
                case null:
                  return 2;
                case true:
                  return 3;
                case false:
                  return 4;
                default:
                  {
                    return emval_handles.allocate({
                      refcount: 1,
                      value: value
                    });
                  }
              }
            }
          };
          function __embind_register_emval(rawType, name) {
            name = readLatin1String(name);
            registerType(rawType, {
              name: name,
              "fromWireType": function fromWireType(handle) {
                var rv = Emval.toValue(handle);
                __emval_decref(handle);
                return rv;
              },
              "toWireType": function toWireType(destructors, value) {
                return Emval.toHandle(value);
              },
              "argPackAdvance": 8,
              "readValueFromPointer": simpleReadValueFromPointer,
              destructorFunction: null
            });
          }
          function enumReadValueFromPointer(name, shift, signed) {
            switch (shift) {
              case 0:
                return function (pointer) {
                  var heap = signed ? HEAP8 : HEAPU8;
                  return this["fromWireType"](heap[pointer]);
                };
              case 1:
                return function (pointer) {
                  var heap = signed ? HEAP16 : HEAPU16;
                  return this["fromWireType"](heap[pointer >> 1]);
                };
              case 2:
                return function (pointer) {
                  var heap = signed ? HEAP32 : HEAPU32;
                  return this["fromWireType"](heap[pointer >> 2]);
                };
              default:
                throw new TypeError("Unknown integer type: " + name);
            }
          }
          function __embind_register_enum(rawType, name, size, isSigned) {
            var shift = getShiftFromSize(size);
            name = readLatin1String(name);
            function ctor() {}
            ctor.values = {};
            registerType(rawType, {
              name: name,
              constructor: ctor,
              "fromWireType": function fromWireType(c) {
                return this.constructor.values[c];
              },
              "toWireType": function toWireType(destructors, c) {
                return c.value;
              },
              "argPackAdvance": 8,
              "readValueFromPointer": enumReadValueFromPointer(name, shift, isSigned),
              destructorFunction: null
            });
            exposePublicSymbol(name, ctor);
          }
          function requireRegisteredType(rawType, humanName) {
            var impl = registeredTypes[rawType];
            if (undefined === impl) {
              throwBindingError(humanName + " has unknown type " + getTypeName(rawType));
            }
            return impl;
          }
          function __embind_register_enum_value(rawEnumType, name, enumValue) {
            var enumType = requireRegisteredType(rawEnumType, "enum");
            name = readLatin1String(name);
            var Enum = enumType.constructor;
            var Value = Object.create(enumType.constructor.prototype, {
              value: {
                value: enumValue
              },
              constructor: {
                value: createNamedFunction(enumType.name + "_" + name, function () {})
              }
            });
            Enum.values[enumValue] = Value;
            Enum[name] = Value;
          }
          function embindRepr(v) {
            if (v === null) {
              return "null";
            }
            var t = typeof v;
            if (t === "object" || t === "array" || t === "function") {
              return v.toString();
            } else {
              return "" + v;
            }
          }
          function floatReadValueFromPointer(name, shift) {
            switch (shift) {
              case 2:
                return function (pointer) {
                  return this["fromWireType"](HEAPF32[pointer >> 2]);
                };
              case 3:
                return function (pointer) {
                  return this["fromWireType"](HEAPF64[pointer >> 3]);
                };
              default:
                throw new TypeError("Unknown float type: " + name);
            }
          }
          function __embind_register_float(rawType, name, size) {
            var shift = getShiftFromSize(size);
            name = readLatin1String(name);
            registerType(rawType, {
              name: name,
              "fromWireType": function fromWireType(value) {
                return value;
              },
              "toWireType": function toWireType(destructors, value) {
                return value;
              },
              "argPackAdvance": 8,
              "readValueFromPointer": floatReadValueFromPointer(name, shift),
              destructorFunction: null
            });
          }
          function integerReadValueFromPointer(name, shift, signed) {
            switch (shift) {
              case 0:
                return signed ? function readS8FromPointer(pointer) {
                  return HEAP8[pointer];
                } : function readU8FromPointer(pointer) {
                  return HEAPU8[pointer];
                };
              case 1:
                return signed ? function readS16FromPointer(pointer) {
                  return HEAP16[pointer >> 1];
                } : function readU16FromPointer(pointer) {
                  return HEAPU16[pointer >> 1];
                };
              case 2:
                return signed ? function readS32FromPointer(pointer) {
                  return HEAP32[pointer >> 2];
                } : function readU32FromPointer(pointer) {
                  return HEAPU32[pointer >> 2];
                };
              default:
                throw new TypeError("Unknown integer type: " + name);
            }
          }
          function __embind_register_integer(primitiveType, name, size, minRange, maxRange) {
            name = readLatin1String(name);
            var shift = getShiftFromSize(size);
            var fromWireType = function fromWireType(value) {
              return value;
            };
            if (minRange === 0) {
              var bitshift = 32 - 8 * size;
              fromWireType = function fromWireType(value) {
                return value << bitshift >>> bitshift;
              };
            }
            var isUnsignedType = name.includes("unsigned");
            var checkAssertions = function checkAssertions(value, toTypeName) {};
            var toWireType;
            if (isUnsignedType) {
              toWireType = function toWireType(destructors, value) {
                checkAssertions(value, this.name);
                return value >>> 0;
              };
            } else {
              toWireType = function toWireType(destructors, value) {
                checkAssertions(value, this.name);
                return value;
              };
            }
            registerType(primitiveType, {
              name: name,
              "fromWireType": fromWireType,
              "toWireType": toWireType,
              "argPackAdvance": 8,
              "readValueFromPointer": integerReadValueFromPointer(name, shift, minRange !== 0),
              destructorFunction: null
            });
          }
          function __embind_register_memory_view(rawType, dataTypeIndex, name) {
            var typeMapping = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array];
            var TA = typeMapping[dataTypeIndex];
            function decodeMemoryView(handle) {
              handle = handle >> 2;
              var heap = HEAPU32;
              var size = heap[handle];
              var data = heap[handle + 1];
              return new TA(heap.buffer, data, size);
            }
            name = readLatin1String(name);
            registerType(rawType, {
              name: name,
              "fromWireType": decodeMemoryView,
              "argPackAdvance": 8,
              "readValueFromPointer": decodeMemoryView
            }, {
              ignoreDuplicateRegistrations: true
            });
          }
          function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
            if (!(maxBytesToWrite > 0)) return 0;
            var startIdx = outIdx;
            var endIdx = outIdx + maxBytesToWrite - 1;
            for (var i = 0; i < str.length; ++i) {
              var u = str.charCodeAt(i);
              if (u >= 55296 && u <= 57343) {
                var u1 = str.charCodeAt(++i);
                u = 65536 + ((u & 1023) << 10) | u1 & 1023;
              }
              if (u <= 127) {
                if (outIdx >= endIdx) break;
                heap[outIdx++] = u;
              } else if (u <= 2047) {
                if (outIdx + 1 >= endIdx) break;
                heap[outIdx++] = 192 | u >> 6;
                heap[outIdx++] = 128 | u & 63;
              } else if (u <= 65535) {
                if (outIdx + 2 >= endIdx) break;
                heap[outIdx++] = 224 | u >> 12;
                heap[outIdx++] = 128 | u >> 6 & 63;
                heap[outIdx++] = 128 | u & 63;
              } else {
                if (outIdx + 3 >= endIdx) break;
                heap[outIdx++] = 240 | u >> 18;
                heap[outIdx++] = 128 | u >> 12 & 63;
                heap[outIdx++] = 128 | u >> 6 & 63;
                heap[outIdx++] = 128 | u & 63;
              }
            }
            heap[outIdx] = 0;
            return outIdx - startIdx;
          }
          function stringToUTF8(str, outPtr, maxBytesToWrite) {
            return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
          }
          function lengthBytesUTF8(str) {
            var len = 0;
            for (var i = 0; i < str.length; ++i) {
              var c = str.charCodeAt(i);
              if (c <= 127) {
                len++;
              } else if (c <= 2047) {
                len += 2;
              } else if (c >= 55296 && c <= 57343) {
                len += 4;
                ++i;
              } else {
                len += 3;
              }
            }
            return len;
          }
          function __embind_register_std_string(rawType, name) {
            name = readLatin1String(name);
            var stdStringIsUTF8 = name === "std::string";
            registerType(rawType, {
              name: name,
              "fromWireType": function fromWireType(value) {
                var length = HEAPU32[value >> 2];
                var payload = value + 4;
                var str;
                if (stdStringIsUTF8) {
                  var decodeStartPtr = payload;
                  for (var i = 0; i <= length; ++i) {
                    var currentBytePtr = payload + i;
                    if (i == length || HEAPU8[currentBytePtr] == 0) {
                      var maxRead = currentBytePtr - decodeStartPtr;
                      var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
                      if (str === undefined) {
                        str = stringSegment;
                      } else {
                        str += String.fromCharCode(0);
                        str += stringSegment;
                      }
                      decodeStartPtr = currentBytePtr + 1;
                    }
                  }
                } else {
                  var a = new Array(length);
                  for (var i = 0; i < length; ++i) {
                    a[i] = String.fromCharCode(HEAPU8[payload + i]);
                  }
                  str = a.join("");
                }
                _free2(value);
                return str;
              },
              "toWireType": function toWireType(destructors, value) {
                if (value instanceof ArrayBuffer) {
                  value = new Uint8Array(value);
                }
                var length;
                var valueIsOfTypeString = typeof value == "string";
                if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
                  throwBindingError("Cannot pass non-string to std::string");
                }
                if (stdStringIsUTF8 && valueIsOfTypeString) {
                  length = lengthBytesUTF8(value);
                } else {
                  length = value.length;
                }
                var base = _malloc2(4 + length + 1);
                var ptr = base + 4;
                HEAPU32[base >> 2] = length;
                if (stdStringIsUTF8 && valueIsOfTypeString) {
                  stringToUTF8(value, ptr, length + 1);
                } else {
                  if (valueIsOfTypeString) {
                    for (var i = 0; i < length; ++i) {
                      var charCode = value.charCodeAt(i);
                      if (charCode > 255) {
                        _free2(ptr);
                        throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
                      }
                      HEAPU8[ptr + i] = charCode;
                    }
                  } else {
                    for (var i = 0; i < length; ++i) {
                      HEAPU8[ptr + i] = value[i];
                    }
                  }
                }
                if (destructors !== null) {
                  destructors.push(_free2, base);
                }
                return base;
              },
              "argPackAdvance": 8,
              "readValueFromPointer": simpleReadValueFromPointer,
              destructorFunction: function destructorFunction(ptr) {
                _free2(ptr);
              }
            });
          }
          var UTF16Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf-16le") : undefined;
          function UTF16ToString(ptr, maxBytesToRead) {
            var endPtr = ptr;
            var idx = endPtr >> 1;
            var maxIdx = idx + maxBytesToRead / 2;
            while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;
            endPtr = idx << 1;
            if (endPtr - ptr > 32 && UTF16Decoder) return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
            var str = "";
            for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
              var codeUnit = HEAP16[ptr + i * 2 >> 1];
              if (codeUnit == 0) break;
              str += String.fromCharCode(codeUnit);
            }
            return str;
          }
          function stringToUTF16(str, outPtr, maxBytesToWrite) {
            if (maxBytesToWrite === undefined) {
              maxBytesToWrite = 2147483647;
            }
            if (maxBytesToWrite < 2) return 0;
            maxBytesToWrite -= 2;
            var startPtr = outPtr;
            var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
            for (var i = 0; i < numCharsToWrite; ++i) {
              var codeUnit = str.charCodeAt(i);
              HEAP16[outPtr >> 1] = codeUnit;
              outPtr += 2;
            }
            HEAP16[outPtr >> 1] = 0;
            return outPtr - startPtr;
          }
          function lengthBytesUTF16(str) {
            return str.length * 2;
          }
          function UTF32ToString(ptr, maxBytesToRead) {
            var i = 0;
            var str = "";
            while (!(i >= maxBytesToRead / 4)) {
              var utf32 = HEAP32[ptr + i * 4 >> 2];
              if (utf32 == 0) break;
              ++i;
              if (utf32 >= 65536) {
                var ch = utf32 - 65536;
                str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
              } else {
                str += String.fromCharCode(utf32);
              }
            }
            return str;
          }
          function stringToUTF32(str, outPtr, maxBytesToWrite) {
            if (maxBytesToWrite === undefined) {
              maxBytesToWrite = 2147483647;
            }
            if (maxBytesToWrite < 4) return 0;
            var startPtr = outPtr;
            var endPtr = startPtr + maxBytesToWrite - 4;
            for (var i = 0; i < str.length; ++i) {
              var codeUnit = str.charCodeAt(i);
              if (codeUnit >= 55296 && codeUnit <= 57343) {
                var trailSurrogate = str.charCodeAt(++i);
                codeUnit = 65536 + ((codeUnit & 1023) << 10) | trailSurrogate & 1023;
              }
              HEAP32[outPtr >> 2] = codeUnit;
              outPtr += 4;
              if (outPtr + 4 > endPtr) break;
            }
            HEAP32[outPtr >> 2] = 0;
            return outPtr - startPtr;
          }
          function lengthBytesUTF32(str) {
            var len = 0;
            for (var i = 0; i < str.length; ++i) {
              var codeUnit = str.charCodeAt(i);
              if (codeUnit >= 55296 && codeUnit <= 57343) ++i;
              len += 4;
            }
            return len;
          }
          function __embind_register_std_wstring(rawType, charSize, name) {
            name = readLatin1String(name);
            var decodeString, encodeString, getHeap, lengthBytesUTF, shift;
            if (charSize === 2) {
              decodeString = UTF16ToString;
              encodeString = stringToUTF16;
              lengthBytesUTF = lengthBytesUTF16;
              getHeap = function getHeap() {
                return HEAPU16;
              };
              shift = 1;
            } else if (charSize === 4) {
              decodeString = UTF32ToString;
              encodeString = stringToUTF32;
              lengthBytesUTF = lengthBytesUTF32;
              getHeap = function getHeap() {
                return HEAPU32;
              };
              shift = 2;
            }
            registerType(rawType, {
              name: name,
              "fromWireType": function fromWireType(value) {
                var length = HEAPU32[value >> 2];
                var HEAP = getHeap();
                var str;
                var decodeStartPtr = value + 4;
                for (var i = 0; i <= length; ++i) {
                  var currentBytePtr = value + 4 + i * charSize;
                  if (i == length || HEAP[currentBytePtr >> shift] == 0) {
                    var maxReadBytes = currentBytePtr - decodeStartPtr;
                    var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
                    if (str === undefined) {
                      str = stringSegment;
                    } else {
                      str += String.fromCharCode(0);
                      str += stringSegment;
                    }
                    decodeStartPtr = currentBytePtr + charSize;
                  }
                }
                _free2(value);
                return str;
              },
              "toWireType": function toWireType(destructors, value) {
                if (!(typeof value == "string")) {
                  throwBindingError("Cannot pass non-string to C++ string type " + name);
                }
                var length = lengthBytesUTF(value);
                var ptr = _malloc2(4 + length + charSize);
                HEAPU32[ptr >> 2] = length >> shift;
                encodeString(value, ptr + 4, length + charSize);
                if (destructors !== null) {
                  destructors.push(_free2, ptr);
                }
                return ptr;
              },
              "argPackAdvance": 8,
              "readValueFromPointer": simpleReadValueFromPointer,
              destructorFunction: function destructorFunction(ptr) {
                _free2(ptr);
              }
            });
          }
          function __embind_register_void(rawType, name) {
            name = readLatin1String(name);
            registerType(rawType, {
              isVoid: true,
              name: name,
              "argPackAdvance": 0,
              "fromWireType": function fromWireType() {
                return undefined;
              },
              "toWireType": function toWireType(destructors, o) {
                return undefined;
              }
            });
          }
          function __emval_as(handle, returnType, destructorsRef) {
            handle = Emval.toValue(handle);
            returnType = requireRegisteredType(returnType, "emval::as");
            var destructors = [];
            var rd = Emval.toHandle(destructors);
            HEAPU32[destructorsRef >> 2] = rd;
            return returnType["toWireType"](destructors, handle);
          }
          function __emval_incref(handle) {
            if (handle > 4) {
              emval_handles.get(handle).refcount += 1;
            }
          }
          function __emval_run_destructors(handle) {
            var destructors = Emval.toValue(handle);
            runDestructors(destructors);
            __emval_decref(handle);
          }
          function __emval_take_value(type, arg) {
            type = requireRegisteredType(type, "_emval_take_value");
            var v = type["readValueFromPointer"](arg);
            return Emval.toHandle(v);
          }
          function _abort() {
            abort("");
          }
          function _emscripten_memcpy_big(dest, src, num) {
            HEAPU8.copyWithin(dest, src, src + num);
          }
          function getHeapMax() {
            return 2147483648;
          }
          function emscripten_realloc_buffer(size) {
            var b = wasmMemory.buffer;
            var pages = size - b.byteLength + 65535 >>> 16;
            try {
              wasmMemory.grow(pages);
              updateMemoryViews();
              return 1;
            } catch (e) {}
          }
          function _emscripten_resize_heap(requestedSize) {
            var oldSize = HEAPU8.length;
            requestedSize = requestedSize >>> 0;
            var maxHeapSize = getHeapMax();
            if (requestedSize > maxHeapSize) {
              return false;
            }
            var alignUp = function alignUp(x, multiple) {
              return x + (multiple - x % multiple) % multiple;
            };
            for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
              var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
              overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
              var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
              var replacement = emscripten_realloc_buffer(newSize);
              if (replacement) {
                return true;
              }
            }
            return false;
          }
          function _fd_close(fd) {
            return 52;
          }
          function _fd_read(fd, iov, iovcnt, pnum) {
            return 52;
          }
          function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
            return 70;
          }
          var printCharBuffers = [null, [], []];
          function printChar(stream, curr) {
            var buffer = printCharBuffers[stream];
            if (curr === 0 || curr === 10) {
              (stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
              buffer.length = 0;
            } else {
              buffer.push(curr);
            }
          }
          function _fd_write(fd, iov, iovcnt, pnum) {
            var num = 0;
            for (var i = 0; i < iovcnt; i++) {
              var ptr = HEAPU32[iov >> 2];
              var len = HEAPU32[iov + 4 >> 2];
              iov += 8;
              for (var j = 0; j < len; j++) {
                printChar(fd, HEAPU8[ptr + j]);
              }
              num += len;
            }
            HEAPU32[pnum >> 2] = num;
            return 0;
          }
          function _spineListenerCallBackFromJS() {
            var wasmUtil = Module["SpineWasmUtil"];
            var listenerID = wasmUtil.getCurrentListenerID();
            var trackEntry = wasmUtil.getCurrentTrackEntry();
            var event = wasmUtil.getCurrentEvent();
            var eventType = wasmUtil.getCurrentEventType();
            globalThis.TrackEntryListeners.emitListener(listenerID, trackEntry, event, eventType.value);
          }
          function _spineTrackListenerCallback() {
            var wasmUtil = Module["SpineWasmUtil"];
            var listenerID = wasmUtil.getCurrentListenerID();
            var eventType = wasmUtil.getCurrentEventType();
            var trackEntry = wasmUtil.getCurrentTrackEntry();
            var event = wasmUtil.getCurrentEvent();
            globalThis.TrackEntryListeners.emitTrackEntryListener(listenerID, trackEntry, event, eventType.value);
          }
          embind_init_charCodes();
          BindingError = Module["BindingError"] = extendError(Error, "BindingError");
          InternalError = Module["InternalError"] = extendError(Error, "InternalError");
          init_ClassHandle();
          init_embind();
          init_RegisteredPointer();
          UnboundTypeError = Module["UnboundTypeError"] = extendError(Error, "UnboundTypeError");
          init_emval();
          var wasmImports = {
            "o": ___syscall_fcntl64,
            "x": ___syscall_ioctl,
            "y": ___syscall_openat,
            "t": __embind_register_bigint,
            "C": __embind_register_bool,
            "b": __embind_register_class,
            "f": __embind_register_class_class_function,
            "j": __embind_register_class_class_property,
            "c": __embind_register_class_constructor,
            "a": __embind_register_class_function,
            "e": __embind_register_class_property,
            "A": __embind_register_emval,
            "k": __embind_register_enum,
            "d": __embind_register_enum_value,
            "p": __embind_register_float,
            "l": __embind_register_integer,
            "i": __embind_register_memory_view,
            "q": __embind_register_std_string,
            "m": __embind_register_std_wstring,
            "D": __embind_register_void,
            "F": __emval_as,
            "r": __emval_decref,
            "G": __emval_incref,
            "E": __emval_run_destructors,
            "h": __emval_take_value,
            "g": _abort,
            "z": _emscripten_memcpy_big,
            "u": _emscripten_resize_heap,
            "n": _fd_close,
            "w": _fd_read,
            "s": _fd_seek,
            "v": _fd_write,
            "H": _spineListenerCallBackFromJS,
            "B": _spineTrackListenerCallback
          };
          createWasm();
          var _malloc2 = function _malloc() {
            return (_malloc2 = Module["asm"]["L"]).apply(null, arguments);
          };
          var _free2 = function _free() {
            return (_free2 = Module["asm"]["M"]).apply(null, arguments);
          };
          var _getTypeName = function ___getTypeName() {
            return (_getTypeName = Module["asm"]["N"]).apply(null, arguments);
          };
          Module["__embind_initialize_bindings"] = function () {
            return (Module["__embind_initialize_bindings"] = Module["asm"]["O"]).apply(null, arguments);
          };
          Module["dynCall_jiji"] = function () {
            return (Module["dynCall_jiji"] = Module["asm"]["P"]).apply(null, arguments);
          };
          var calledRun;
          dependenciesFulfilled = function runCaller() {
            if (!calledRun) run();
            if (!calledRun) dependenciesFulfilled = runCaller;
          };
          function run() {
            if (runDependencies > 0) {
              return;
            }
            preRun();
            if (runDependencies > 0) {
              return;
            }
            function doRun() {
              if (calledRun) return;
              calledRun = true;
              Module["calledRun"] = true;
              if (ABORT) return;
              initRuntime();
              readyPromiseResolve(Module);
              if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
              postRun();
            }
            if (Module["setStatus"]) {
              Module["setStatus"]("Running...");
              setTimeout(function () {
                setTimeout(function () {
                  Module["setStatus"]("");
                }, 1);
                doRun();
              }, 1);
            } else {
              doRun();
            }
          }
          if (Module["preInit"]) {
            if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
            while (Module["preInit"].length > 0) {
              Module["preInit"].pop()();
            }
          }
          run();
          return spineWasm.ready;
        };
      }());

    })
  };
}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BpbmUud2FzbS01M2YyYThhYy5qcyIsInNvdXJjZXMiOlsiRDovQ29jb3NFZGl0b3JzL0NyZWF0b3IvMy44LjQvZXh0ZXJuYWw6ZW1zY3JpcHRlbi9zcGluZS9zcGluZS53YXNtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxudmFyIHNwaW5lV2FzbSA9ICgoKSA9PiB7XG4gIHZhciBfc2NyaXB0RGlyID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5jdXJyZW50U2NyaXB0ID8gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmMgOiB1bmRlZmluZWQ7XG4gIFxuICByZXR1cm4gKFxuZnVuY3Rpb24oc3BpbmVXYXNtID0ge30pICB7XG5cbnZhciBNb2R1bGU9dHlwZW9mIHNwaW5lV2FzbSE9XCJ1bmRlZmluZWRcIj9zcGluZVdhc206e307dmFyIHJlYWR5UHJvbWlzZVJlc29sdmUscmVhZHlQcm9taXNlUmVqZWN0O01vZHVsZVtcInJlYWR5XCJdPW5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntyZWFkeVByb21pc2VSZXNvbHZlPXJlc29sdmU7cmVhZHlQcm9taXNlUmVqZWN0PXJlamVjdH0pO3ZhciBtb2R1bGVPdmVycmlkZXM9T2JqZWN0LmFzc2lnbih7fSxNb2R1bGUpO3ZhciBhcmd1bWVudHNfPVtdO3ZhciB0aGlzUHJvZ3JhbT1cIi4vdGhpcy5wcm9ncmFtXCI7dmFyIHF1aXRfPShzdGF0dXMsdG9UaHJvdyk9Pnt0aHJvdyB0b1Rocm93fTt2YXIgRU5WSVJPTk1FTlRfSVNfV0VCPXRydWU7dmFyIEVOVklST05NRU5UX0lTX1dPUktFUj1mYWxzZTt2YXIgc2NyaXB0RGlyZWN0b3J5PVwiXCI7ZnVuY3Rpb24gbG9jYXRlRmlsZShwYXRoKXtpZihNb2R1bGVbXCJsb2NhdGVGaWxlXCJdKXtyZXR1cm4gTW9kdWxlW1wibG9jYXRlRmlsZVwiXShwYXRoLHNjcmlwdERpcmVjdG9yeSl9cmV0dXJuIHNjcmlwdERpcmVjdG9yeStwYXRofXZhciByZWFkXyxyZWFkQXN5bmMscmVhZEJpbmFyeSxzZXRXaW5kb3dUaXRsZTtpZihFTlZJUk9OTUVOVF9JU19XRUJ8fEVOVklST05NRU5UX0lTX1dPUktFUil7aWYoRU5WSVJPTk1FTlRfSVNfV09SS0VSKXtzY3JpcHREaXJlY3Rvcnk9c2VsZi5sb2NhdGlvbi5ocmVmfWVsc2UgaWYodHlwZW9mIGRvY3VtZW50IT1cInVuZGVmaW5lZFwiJiZkb2N1bWVudC5jdXJyZW50U2NyaXB0KXtzY3JpcHREaXJlY3Rvcnk9ZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmN9aWYoX3NjcmlwdERpcil7c2NyaXB0RGlyZWN0b3J5PV9zY3JpcHREaXJ9aWYoc2NyaXB0RGlyZWN0b3J5LmluZGV4T2YoXCJibG9iOlwiKSE9PTApe3NjcmlwdERpcmVjdG9yeT1zY3JpcHREaXJlY3Rvcnkuc3Vic3RyKDAsc2NyaXB0RGlyZWN0b3J5LnJlcGxhY2UoL1s/I10uKi8sXCJcIikubGFzdEluZGV4T2YoXCIvXCIpKzEpfWVsc2V7c2NyaXB0RGlyZWN0b3J5PVwiXCJ9e3JlYWRfPXVybD0+e3ZhciB4aHI9bmV3IFhNTEh0dHBSZXF1ZXN0O3hoci5vcGVuKFwiR0VUXCIsdXJsLGZhbHNlKTt4aHIuc2VuZChudWxsKTtyZXR1cm4geGhyLnJlc3BvbnNlVGV4dH07aWYoRU5WSVJPTk1FTlRfSVNfV09SS0VSKXtyZWFkQmluYXJ5PXVybD0+e3ZhciB4aHI9bmV3IFhNTEh0dHBSZXF1ZXN0O3hoci5vcGVuKFwiR0VUXCIsdXJsLGZhbHNlKTt4aHIucmVzcG9uc2VUeXBlPVwiYXJyYXlidWZmZXJcIjt4aHIuc2VuZChudWxsKTtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoeGhyLnJlc3BvbnNlKX19cmVhZEFzeW5jPSh1cmwsb25sb2FkLG9uZXJyb3IpPT57dmFyIHhocj1uZXcgWE1MSHR0cFJlcXVlc3Q7eGhyLm9wZW4oXCJHRVRcIix1cmwsdHJ1ZSk7eGhyLnJlc3BvbnNlVHlwZT1cImFycmF5YnVmZmVyXCI7eGhyLm9ubG9hZD0oKT0+e2lmKHhoci5zdGF0dXM9PTIwMHx8eGhyLnN0YXR1cz09MCYmeGhyLnJlc3BvbnNlKXtvbmxvYWQoeGhyLnJlc3BvbnNlKTtyZXR1cm59b25lcnJvcigpfTt4aHIub25lcnJvcj1vbmVycm9yO3hoci5zZW5kKG51bGwpfX1zZXRXaW5kb3dUaXRsZT10aXRsZT0+ZG9jdW1lbnQudGl0bGU9dGl0bGV9ZWxzZXt9dmFyIG91dD1Nb2R1bGVbXCJwcmludFwiXXx8Y29uc29sZS5sb2cuYmluZChjb25zb2xlKTt2YXIgZXJyPU1vZHVsZVtcInByaW50RXJyXCJdfHxjb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSk7T2JqZWN0LmFzc2lnbihNb2R1bGUsbW9kdWxlT3ZlcnJpZGVzKTttb2R1bGVPdmVycmlkZXM9bnVsbDtpZihNb2R1bGVbXCJhcmd1bWVudHNcIl0pYXJndW1lbnRzXz1Nb2R1bGVbXCJhcmd1bWVudHNcIl07aWYoTW9kdWxlW1widGhpc1Byb2dyYW1cIl0pdGhpc1Byb2dyYW09TW9kdWxlW1widGhpc1Byb2dyYW1cIl07aWYoTW9kdWxlW1wicXVpdFwiXSlxdWl0Xz1Nb2R1bGVbXCJxdWl0XCJdO3ZhciB3YXNtQmluYXJ5O2lmKE1vZHVsZVtcIndhc21CaW5hcnlcIl0pd2FzbUJpbmFyeT1Nb2R1bGVbXCJ3YXNtQmluYXJ5XCJdO3ZhciBub0V4aXRSdW50aW1lPU1vZHVsZVtcIm5vRXhpdFJ1bnRpbWVcIl18fHRydWU7aWYodHlwZW9mIFdlYkFzc2VtYmx5IT1cIm9iamVjdFwiKXthYm9ydChcIm5vIG5hdGl2ZSB3YXNtIHN1cHBvcnQgZGV0ZWN0ZWRcIil9dmFyIHdhc21NZW1vcnk7dmFyIEFCT1JUPWZhbHNlO3ZhciBFWElUU1RBVFVTO2Z1bmN0aW9uIGFzc2VydChjb25kaXRpb24sdGV4dCl7aWYoIWNvbmRpdGlvbil7YWJvcnQodGV4dCl9fXZhciBIRUFQOCxIRUFQVTgsSEVBUDE2LEhFQVBVMTYsSEVBUDMyLEhFQVBVMzIsSEVBUEYzMixIRUFQRjY0O2Z1bmN0aW9uIHVwZGF0ZU1lbW9yeVZpZXdzKCl7dmFyIGI9d2FzbU1lbW9yeS5idWZmZXI7TW9kdWxlW1wiSEVBUDhcIl09SEVBUDg9bmV3IEludDhBcnJheShiKTtNb2R1bGVbXCJIRUFQMTZcIl09SEVBUDE2PW5ldyBJbnQxNkFycmF5KGIpO01vZHVsZVtcIkhFQVAzMlwiXT1IRUFQMzI9bmV3IEludDMyQXJyYXkoYik7TW9kdWxlW1wiSEVBUFU4XCJdPUhFQVBVOD1uZXcgVWludDhBcnJheShiKTtNb2R1bGVbXCJIRUFQVTE2XCJdPUhFQVBVMTY9bmV3IFVpbnQxNkFycmF5KGIpO01vZHVsZVtcIkhFQVBVMzJcIl09SEVBUFUzMj1uZXcgVWludDMyQXJyYXkoYik7TW9kdWxlW1wiSEVBUEYzMlwiXT1IRUFQRjMyPW5ldyBGbG9hdDMyQXJyYXkoYik7TW9kdWxlW1wiSEVBUEY2NFwiXT1IRUFQRjY0PW5ldyBGbG9hdDY0QXJyYXkoYil9dmFyIHdhc21UYWJsZTt2YXIgX19BVFBSRVJVTl9fPVtdO3ZhciBfX0FUSU5JVF9fPVtdO3ZhciBfX0FUUE9TVFJVTl9fPVtdO3ZhciBydW50aW1lSW5pdGlhbGl6ZWQ9ZmFsc2U7ZnVuY3Rpb24gcHJlUnVuKCl7aWYoTW9kdWxlW1wicHJlUnVuXCJdKXtpZih0eXBlb2YgTW9kdWxlW1wicHJlUnVuXCJdPT1cImZ1bmN0aW9uXCIpTW9kdWxlW1wicHJlUnVuXCJdPVtNb2R1bGVbXCJwcmVSdW5cIl1dO3doaWxlKE1vZHVsZVtcInByZVJ1blwiXS5sZW5ndGgpe2FkZE9uUHJlUnVuKE1vZHVsZVtcInByZVJ1blwiXS5zaGlmdCgpKX19Y2FsbFJ1bnRpbWVDYWxsYmFja3MoX19BVFBSRVJVTl9fKX1mdW5jdGlvbiBpbml0UnVudGltZSgpe3J1bnRpbWVJbml0aWFsaXplZD10cnVlO2NhbGxSdW50aW1lQ2FsbGJhY2tzKF9fQVRJTklUX18pfWZ1bmN0aW9uIHBvc3RSdW4oKXtpZihNb2R1bGVbXCJwb3N0UnVuXCJdKXtpZih0eXBlb2YgTW9kdWxlW1wicG9zdFJ1blwiXT09XCJmdW5jdGlvblwiKU1vZHVsZVtcInBvc3RSdW5cIl09W01vZHVsZVtcInBvc3RSdW5cIl1dO3doaWxlKE1vZHVsZVtcInBvc3RSdW5cIl0ubGVuZ3RoKXthZGRPblBvc3RSdW4oTW9kdWxlW1wicG9zdFJ1blwiXS5zaGlmdCgpKX19Y2FsbFJ1bnRpbWVDYWxsYmFja3MoX19BVFBPU1RSVU5fXyl9ZnVuY3Rpb24gYWRkT25QcmVSdW4oY2Ipe19fQVRQUkVSVU5fXy51bnNoaWZ0KGNiKX1mdW5jdGlvbiBhZGRPbkluaXQoY2Ipe19fQVRJTklUX18udW5zaGlmdChjYil9ZnVuY3Rpb24gYWRkT25Qb3N0UnVuKGNiKXtfX0FUUE9TVFJVTl9fLnVuc2hpZnQoY2IpfXZhciBydW5EZXBlbmRlbmNpZXM9MDt2YXIgcnVuRGVwZW5kZW5jeVdhdGNoZXI9bnVsbDt2YXIgZGVwZW5kZW5jaWVzRnVsZmlsbGVkPW51bGw7ZnVuY3Rpb24gYWRkUnVuRGVwZW5kZW5jeShpZCl7cnVuRGVwZW5kZW5jaWVzKys7aWYoTW9kdWxlW1wibW9uaXRvclJ1bkRlcGVuZGVuY2llc1wiXSl7TW9kdWxlW1wibW9uaXRvclJ1bkRlcGVuZGVuY2llc1wiXShydW5EZXBlbmRlbmNpZXMpfX1mdW5jdGlvbiByZW1vdmVSdW5EZXBlbmRlbmN5KGlkKXtydW5EZXBlbmRlbmNpZXMtLTtpZihNb2R1bGVbXCJtb25pdG9yUnVuRGVwZW5kZW5jaWVzXCJdKXtNb2R1bGVbXCJtb25pdG9yUnVuRGVwZW5kZW5jaWVzXCJdKHJ1bkRlcGVuZGVuY2llcyl9aWYocnVuRGVwZW5kZW5jaWVzPT0wKXtpZihydW5EZXBlbmRlbmN5V2F0Y2hlciE9PW51bGwpe2NsZWFySW50ZXJ2YWwocnVuRGVwZW5kZW5jeVdhdGNoZXIpO3J1bkRlcGVuZGVuY3lXYXRjaGVyPW51bGx9aWYoZGVwZW5kZW5jaWVzRnVsZmlsbGVkKXt2YXIgY2FsbGJhY2s9ZGVwZW5kZW5jaWVzRnVsZmlsbGVkO2RlcGVuZGVuY2llc0Z1bGZpbGxlZD1udWxsO2NhbGxiYWNrKCl9fX1mdW5jdGlvbiBhYm9ydCh3aGF0KXtpZihNb2R1bGVbXCJvbkFib3J0XCJdKXtNb2R1bGVbXCJvbkFib3J0XCJdKHdoYXQpfXdoYXQ9XCJBYm9ydGVkKFwiK3doYXQrXCIpXCI7ZXJyKHdoYXQpO0FCT1JUPXRydWU7RVhJVFNUQVRVUz0xO3doYXQrPVwiLiBCdWlsZCB3aXRoIC1zQVNTRVJUSU9OUyBmb3IgbW9yZSBpbmZvLlwiO3ZhciBlPW5ldyBXZWJBc3NlbWJseS5SdW50aW1lRXJyb3Iod2hhdCk7cmVhZHlQcm9taXNlUmVqZWN0KGUpO3Rocm93IGV9dmFyIGRhdGFVUklQcmVmaXg9XCJkYXRhOmFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbTtiYXNlNjQsXCI7ZnVuY3Rpb24gaXNEYXRhVVJJKGZpbGVuYW1lKXtyZXR1cm4gZmlsZW5hbWUuc3RhcnRzV2l0aChkYXRhVVJJUHJlZml4KX12YXIgd2FzbUJpbmFyeUZpbGU7d2FzbUJpbmFyeUZpbGU9XCJzcGluZS53YXNtXCI7aWYoIWlzRGF0YVVSSSh3YXNtQmluYXJ5RmlsZSkpe3dhc21CaW5hcnlGaWxlPWxvY2F0ZUZpbGUod2FzbUJpbmFyeUZpbGUpfWZ1bmN0aW9uIGdldEJpbmFyeShmaWxlKXt0cnl7aWYoZmlsZT09d2FzbUJpbmFyeUZpbGUmJndhc21CaW5hcnkpe3JldHVybiBuZXcgVWludDhBcnJheSh3YXNtQmluYXJ5KX1pZihyZWFkQmluYXJ5KXtyZXR1cm4gcmVhZEJpbmFyeShmaWxlKX10aHJvd1wiYm90aCBhc3luYyBhbmQgc3luYyBmZXRjaGluZyBvZiB0aGUgd2FzbSBmYWlsZWRcIn1jYXRjaChlcnIpe2Fib3J0KGVycil9fWZ1bmN0aW9uIGdldEJpbmFyeVByb21pc2UoYmluYXJ5RmlsZSl7aWYoIXdhc21CaW5hcnkmJihFTlZJUk9OTUVOVF9JU19XRUJ8fEVOVklST05NRU5UX0lTX1dPUktFUikpe2lmKHR5cGVvZiBmZXRjaD09XCJmdW5jdGlvblwiKXtyZXR1cm4gZmV0Y2goYmluYXJ5RmlsZSx7Y3JlZGVudGlhbHM6XCJzYW1lLW9yaWdpblwifSkudGhlbihyZXNwb25zZT0+e2lmKCFyZXNwb25zZVtcIm9rXCJdKXt0aHJvd1wiZmFpbGVkIHRvIGxvYWQgd2FzbSBiaW5hcnkgZmlsZSBhdCAnXCIrYmluYXJ5RmlsZStcIidcIn1yZXR1cm4gcmVzcG9uc2VbXCJhcnJheUJ1ZmZlclwiXSgpfSkuY2F0Y2goKCk9PmdldEJpbmFyeShiaW5hcnlGaWxlKSl9fXJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpPT5nZXRCaW5hcnkoYmluYXJ5RmlsZSkpfWZ1bmN0aW9uIGluc3RhbnRpYXRlQXJyYXlCdWZmZXIoYmluYXJ5RmlsZSxpbXBvcnRzLHJlY2VpdmVyKXtyZXR1cm4gZ2V0QmluYXJ5UHJvbWlzZShiaW5hcnlGaWxlKS50aGVuKGJpbmFyeT0+e3JldHVybiBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZShiaW5hcnksaW1wb3J0cyl9KS50aGVuKGluc3RhbmNlPT57cmV0dXJuIGluc3RhbmNlfSkudGhlbihyZWNlaXZlcixyZWFzb249PntlcnIoXCJmYWlsZWQgdG8gYXN5bmNocm9ub3VzbHkgcHJlcGFyZSB3YXNtOiBcIityZWFzb24pO2Fib3J0KHJlYXNvbil9KX1mdW5jdGlvbiBpbnN0YW50aWF0ZUFzeW5jKGJpbmFyeSxiaW5hcnlGaWxlLGltcG9ydHMsY2FsbGJhY2spe2lmKCFiaW5hcnkmJnR5cGVvZiBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZVN0cmVhbWluZz09XCJmdW5jdGlvblwiJiYhaXNEYXRhVVJJKGJpbmFyeUZpbGUpJiZ0eXBlb2YgZmV0Y2g9PVwiZnVuY3Rpb25cIil7cmV0dXJuIGZldGNoKGJpbmFyeUZpbGUse2NyZWRlbnRpYWxzOlwic2FtZS1vcmlnaW5cIn0pLnRoZW4ocmVzcG9uc2U9Pnt2YXIgcmVzdWx0PVdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlU3RyZWFtaW5nKHJlc3BvbnNlLGltcG9ydHMpO3JldHVybiByZXN1bHQudGhlbihjYWxsYmFjayxmdW5jdGlvbihyZWFzb24pe2VycihcIndhc20gc3RyZWFtaW5nIGNvbXBpbGUgZmFpbGVkOiBcIityZWFzb24pO2VycihcImZhbGxpbmcgYmFjayB0byBBcnJheUJ1ZmZlciBpbnN0YW50aWF0aW9uXCIpO3JldHVybiBpbnN0YW50aWF0ZUFycmF5QnVmZmVyKGJpbmFyeUZpbGUsaW1wb3J0cyxjYWxsYmFjayl9KX0pfWVsc2V7cmV0dXJuIGluc3RhbnRpYXRlQXJyYXlCdWZmZXIoYmluYXJ5RmlsZSxpbXBvcnRzLGNhbGxiYWNrKX19ZnVuY3Rpb24gY3JlYXRlV2FzbSgpe3ZhciBpbmZvPXtcImFcIjp3YXNtSW1wb3J0c307ZnVuY3Rpb24gcmVjZWl2ZUluc3RhbmNlKGluc3RhbmNlLG1vZHVsZSl7dmFyIGV4cG9ydHM9aW5zdGFuY2UuZXhwb3J0cztNb2R1bGVbXCJhc21cIl09ZXhwb3J0czt3YXNtTWVtb3J5PU1vZHVsZVtcImFzbVwiXVtcIklcIl07dXBkYXRlTWVtb3J5Vmlld3MoKTt3YXNtVGFibGU9TW9kdWxlW1wiYXNtXCJdW1wiS1wiXTthZGRPbkluaXQoTW9kdWxlW1wiYXNtXCJdW1wiSlwiXSk7cmVtb3ZlUnVuRGVwZW5kZW5jeShcIndhc20taW5zdGFudGlhdGVcIik7cmV0dXJuIGV4cG9ydHN9YWRkUnVuRGVwZW5kZW5jeShcIndhc20taW5zdGFudGlhdGVcIik7ZnVuY3Rpb24gcmVjZWl2ZUluc3RhbnRpYXRpb25SZXN1bHQocmVzdWx0KXtyZWNlaXZlSW5zdGFuY2UocmVzdWx0W1wiaW5zdGFuY2VcIl0pfWlmKE1vZHVsZVtcImluc3RhbnRpYXRlV2FzbVwiXSl7dHJ5e3JldHVybiBNb2R1bGVbXCJpbnN0YW50aWF0ZVdhc21cIl0oaW5mbyxyZWNlaXZlSW5zdGFuY2UpfWNhdGNoKGUpe2VycihcIk1vZHVsZS5pbnN0YW50aWF0ZVdhc20gY2FsbGJhY2sgZmFpbGVkIHdpdGggZXJyb3I6IFwiK2UpO3JlYWR5UHJvbWlzZVJlamVjdChlKX19aW5zdGFudGlhdGVBc3luYyh3YXNtQmluYXJ5LHdhc21CaW5hcnlGaWxlLGluZm8scmVjZWl2ZUluc3RhbnRpYXRpb25SZXN1bHQpLmNhdGNoKHJlYWR5UHJvbWlzZVJlamVjdCk7cmV0dXJue319ZnVuY3Rpb24gY2FsbFJ1bnRpbWVDYWxsYmFja3MoY2FsbGJhY2tzKXt3aGlsZShjYWxsYmFja3MubGVuZ3RoPjApe2NhbGxiYWNrcy5zaGlmdCgpKE1vZHVsZSl9fXZhciBVVEY4RGVjb2Rlcj10eXBlb2YgVGV4dERlY29kZXIhPVwidW5kZWZpbmVkXCI/bmV3IFRleHREZWNvZGVyKFwidXRmOFwiKTp1bmRlZmluZWQ7ZnVuY3Rpb24gVVRGOEFycmF5VG9TdHJpbmcoaGVhcE9yQXJyYXksaWR4LG1heEJ5dGVzVG9SZWFkKXt2YXIgZW5kSWR4PWlkeCttYXhCeXRlc1RvUmVhZDt2YXIgZW5kUHRyPWlkeDt3aGlsZShoZWFwT3JBcnJheVtlbmRQdHJdJiYhKGVuZFB0cj49ZW5kSWR4KSkrK2VuZFB0cjtpZihlbmRQdHItaWR4PjE2JiZoZWFwT3JBcnJheS5idWZmZXImJlVURjhEZWNvZGVyKXtyZXR1cm4gVVRGOERlY29kZXIuZGVjb2RlKGhlYXBPckFycmF5LnN1YmFycmF5KGlkeCxlbmRQdHIpKX12YXIgc3RyPVwiXCI7d2hpbGUoaWR4PGVuZFB0cil7dmFyIHUwPWhlYXBPckFycmF5W2lkeCsrXTtpZighKHUwJjEyOCkpe3N0cis9U3RyaW5nLmZyb21DaGFyQ29kZSh1MCk7Y29udGludWV9dmFyIHUxPWhlYXBPckFycmF5W2lkeCsrXSY2MztpZigodTAmMjI0KT09MTkyKXtzdHIrPVN0cmluZy5mcm9tQ2hhckNvZGUoKHUwJjMxKTw8Nnx1MSk7Y29udGludWV9dmFyIHUyPWhlYXBPckFycmF5W2lkeCsrXSY2MztpZigodTAmMjQwKT09MjI0KXt1MD0odTAmMTUpPDwxMnx1MTw8Nnx1Mn1lbHNle3UwPSh1MCY3KTw8MTh8dTE8PDEyfHUyPDw2fGhlYXBPckFycmF5W2lkeCsrXSY2M31pZih1MDw2NTUzNil7c3RyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKHUwKX1lbHNle3ZhciBjaD11MC02NTUzNjtzdHIrPVN0cmluZy5mcm9tQ2hhckNvZGUoNTUyOTZ8Y2g+PjEwLDU2MzIwfGNoJjEwMjMpfX1yZXR1cm4gc3RyfWZ1bmN0aW9uIFVURjhUb1N0cmluZyhwdHIsbWF4Qnl0ZXNUb1JlYWQpe3JldHVybiBwdHI/VVRGOEFycmF5VG9TdHJpbmcoSEVBUFU4LHB0cixtYXhCeXRlc1RvUmVhZCk6XCJcIn12YXIgU1lTQ0FMTFM9e3ZhcmFyZ3M6dW5kZWZpbmVkLGdldDpmdW5jdGlvbigpe1NZU0NBTExTLnZhcmFyZ3MrPTQ7dmFyIHJldD1IRUFQMzJbU1lTQ0FMTFMudmFyYXJncy00Pj4yXTtyZXR1cm4gcmV0fSxnZXRTdHI6ZnVuY3Rpb24ocHRyKXt2YXIgcmV0PVVURjhUb1N0cmluZyhwdHIpO3JldHVybiByZXR9fTtmdW5jdGlvbiBfX19zeXNjYWxsX2ZjbnRsNjQoZmQsY21kLHZhcmFyZ3Mpe1NZU0NBTExTLnZhcmFyZ3M9dmFyYXJncztyZXR1cm4gMH1mdW5jdGlvbiBfX19zeXNjYWxsX2lvY3RsKGZkLG9wLHZhcmFyZ3Mpe1NZU0NBTExTLnZhcmFyZ3M9dmFyYXJncztyZXR1cm4gMH1mdW5jdGlvbiBfX19zeXNjYWxsX29wZW5hdChkaXJmZCxwYXRoLGZsYWdzLHZhcmFyZ3Mpe1NZU0NBTExTLnZhcmFyZ3M9dmFyYXJnc31mdW5jdGlvbiBfX2VtYmluZF9yZWdpc3Rlcl9iaWdpbnQocHJpbWl0aXZlVHlwZSxuYW1lLHNpemUsbWluUmFuZ2UsbWF4UmFuZ2Upe31mdW5jdGlvbiBnZXRTaGlmdEZyb21TaXplKHNpemUpe3N3aXRjaChzaXplKXtjYXNlIDE6cmV0dXJuIDA7Y2FzZSAyOnJldHVybiAxO2Nhc2UgNDpyZXR1cm4gMjtjYXNlIDg6cmV0dXJuIDM7ZGVmYXVsdDp0aHJvdyBuZXcgVHlwZUVycm9yKGBVbmtub3duIHR5cGUgc2l6ZTogJHtzaXplfWApfX1mdW5jdGlvbiBlbWJpbmRfaW5pdF9jaGFyQ29kZXMoKXt2YXIgY29kZXM9bmV3IEFycmF5KDI1Nik7Zm9yKHZhciBpPTA7aTwyNTY7KytpKXtjb2Rlc1tpXT1TdHJpbmcuZnJvbUNoYXJDb2RlKGkpfWVtYmluZF9jaGFyQ29kZXM9Y29kZXN9dmFyIGVtYmluZF9jaGFyQ29kZXM9dW5kZWZpbmVkO2Z1bmN0aW9uIHJlYWRMYXRpbjFTdHJpbmcocHRyKXt2YXIgcmV0PVwiXCI7dmFyIGM9cHRyO3doaWxlKEhFQVBVOFtjXSl7cmV0Kz1lbWJpbmRfY2hhckNvZGVzW0hFQVBVOFtjKytdXX1yZXR1cm4gcmV0fXZhciBhd2FpdGluZ0RlcGVuZGVuY2llcz17fTt2YXIgcmVnaXN0ZXJlZFR5cGVzPXt9O3ZhciB0eXBlRGVwZW5kZW5jaWVzPXt9O3ZhciBjaGFyXzA9NDg7dmFyIGNoYXJfOT01NztmdW5jdGlvbiBtYWtlTGVnYWxGdW5jdGlvbk5hbWUobmFtZSl7aWYodW5kZWZpbmVkPT09bmFtZSl7cmV0dXJuXCJfdW5rbm93blwifW5hbWU9bmFtZS5yZXBsYWNlKC9bXmEtekEtWjAtOV9dL2csXCIkXCIpO3ZhciBmPW5hbWUuY2hhckNvZGVBdCgwKTtpZihmPj1jaGFyXzAmJmY8PWNoYXJfOSl7cmV0dXJuYF8ke25hbWV9YH1yZXR1cm4gbmFtZX1mdW5jdGlvbiBjcmVhdGVOYW1lZEZ1bmN0aW9uKG5hbWUsYm9keSl7bmFtZT1tYWtlTGVnYWxGdW5jdGlvbk5hbWUobmFtZSk7cmV0dXJue1tuYW1lXTpmdW5jdGlvbigpe3JldHVybiBib2R5LmFwcGx5KHRoaXMsYXJndW1lbnRzKX19W25hbWVdfWZ1bmN0aW9uIGV4dGVuZEVycm9yKGJhc2VFcnJvclR5cGUsZXJyb3JOYW1lKXt2YXIgZXJyb3JDbGFzcz1jcmVhdGVOYW1lZEZ1bmN0aW9uKGVycm9yTmFtZSxmdW5jdGlvbihtZXNzYWdlKXt0aGlzLm5hbWU9ZXJyb3JOYW1lO3RoaXMubWVzc2FnZT1tZXNzYWdlO3ZhciBzdGFjaz1uZXcgRXJyb3IobWVzc2FnZSkuc3RhY2s7aWYoc3RhY2shPT11bmRlZmluZWQpe3RoaXMuc3RhY2s9dGhpcy50b1N0cmluZygpK1wiXFxuXCIrc3RhY2sucmVwbGFjZSgvXkVycm9yKDpbXlxcbl0qKT9cXG4vLFwiXCIpfX0pO2Vycm9yQ2xhc3MucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoYmFzZUVycm9yVHlwZS5wcm90b3R5cGUpO2Vycm9yQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yPWVycm9yQ2xhc3M7ZXJyb3JDbGFzcy5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtpZih0aGlzLm1lc3NhZ2U9PT11bmRlZmluZWQpe3JldHVybiB0aGlzLm5hbWV9ZWxzZXtyZXR1cm5gJHt0aGlzLm5hbWV9OiAke3RoaXMubWVzc2FnZX1gfX07cmV0dXJuIGVycm9yQ2xhc3N9dmFyIEJpbmRpbmdFcnJvcj11bmRlZmluZWQ7ZnVuY3Rpb24gdGhyb3dCaW5kaW5nRXJyb3IobWVzc2FnZSl7dGhyb3cgbmV3IEJpbmRpbmdFcnJvcihtZXNzYWdlKX12YXIgSW50ZXJuYWxFcnJvcj11bmRlZmluZWQ7ZnVuY3Rpb24gdGhyb3dJbnRlcm5hbEVycm9yKG1lc3NhZ2Upe3Rocm93IG5ldyBJbnRlcm5hbEVycm9yKG1lc3NhZ2UpfWZ1bmN0aW9uIHdoZW5EZXBlbmRlbnRUeXBlc0FyZVJlc29sdmVkKG15VHlwZXMsZGVwZW5kZW50VHlwZXMsZ2V0VHlwZUNvbnZlcnRlcnMpe215VHlwZXMuZm9yRWFjaChmdW5jdGlvbih0eXBlKXt0eXBlRGVwZW5kZW5jaWVzW3R5cGVdPWRlcGVuZGVudFR5cGVzfSk7ZnVuY3Rpb24gb25Db21wbGV0ZSh0eXBlQ29udmVydGVycyl7dmFyIG15VHlwZUNvbnZlcnRlcnM9Z2V0VHlwZUNvbnZlcnRlcnModHlwZUNvbnZlcnRlcnMpO2lmKG15VHlwZUNvbnZlcnRlcnMubGVuZ3RoIT09bXlUeXBlcy5sZW5ndGgpe3Rocm93SW50ZXJuYWxFcnJvcihcIk1pc21hdGNoZWQgdHlwZSBjb252ZXJ0ZXIgY291bnRcIil9Zm9yKHZhciBpPTA7aTxteVR5cGVzLmxlbmd0aDsrK2kpe3JlZ2lzdGVyVHlwZShteVR5cGVzW2ldLG15VHlwZUNvbnZlcnRlcnNbaV0pfX12YXIgdHlwZUNvbnZlcnRlcnM9bmV3IEFycmF5KGRlcGVuZGVudFR5cGVzLmxlbmd0aCk7dmFyIHVucmVnaXN0ZXJlZFR5cGVzPVtdO3ZhciByZWdpc3RlcmVkPTA7ZGVwZW5kZW50VHlwZXMuZm9yRWFjaCgoZHQsaSk9PntpZihyZWdpc3RlcmVkVHlwZXMuaGFzT3duUHJvcGVydHkoZHQpKXt0eXBlQ29udmVydGVyc1tpXT1yZWdpc3RlcmVkVHlwZXNbZHRdfWVsc2V7dW5yZWdpc3RlcmVkVHlwZXMucHVzaChkdCk7aWYoIWF3YWl0aW5nRGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KGR0KSl7YXdhaXRpbmdEZXBlbmRlbmNpZXNbZHRdPVtdfWF3YWl0aW5nRGVwZW5kZW5jaWVzW2R0XS5wdXNoKCgpPT57dHlwZUNvbnZlcnRlcnNbaV09cmVnaXN0ZXJlZFR5cGVzW2R0XTsrK3JlZ2lzdGVyZWQ7aWYocmVnaXN0ZXJlZD09PXVucmVnaXN0ZXJlZFR5cGVzLmxlbmd0aCl7b25Db21wbGV0ZSh0eXBlQ29udmVydGVycyl9fSl9fSk7aWYoMD09PXVucmVnaXN0ZXJlZFR5cGVzLmxlbmd0aCl7b25Db21wbGV0ZSh0eXBlQ29udmVydGVycyl9fWZ1bmN0aW9uIHJlZ2lzdGVyVHlwZShyYXdUeXBlLHJlZ2lzdGVyZWRJbnN0YW5jZSxvcHRpb25zPXt9KXtpZighKFwiYXJnUGFja0FkdmFuY2VcImluIHJlZ2lzdGVyZWRJbnN0YW5jZSkpe3Rocm93IG5ldyBUeXBlRXJyb3IoXCJyZWdpc3RlclR5cGUgcmVnaXN0ZXJlZEluc3RhbmNlIHJlcXVpcmVzIGFyZ1BhY2tBZHZhbmNlXCIpfXZhciBuYW1lPXJlZ2lzdGVyZWRJbnN0YW5jZS5uYW1lO2lmKCFyYXdUeXBlKXt0aHJvd0JpbmRpbmdFcnJvcihgdHlwZSBcIiR7bmFtZX1cIiBtdXN0IGhhdmUgYSBwb3NpdGl2ZSBpbnRlZ2VyIHR5cGVpZCBwb2ludGVyYCl9aWYocmVnaXN0ZXJlZFR5cGVzLmhhc093blByb3BlcnR5KHJhd1R5cGUpKXtpZihvcHRpb25zLmlnbm9yZUR1cGxpY2F0ZVJlZ2lzdHJhdGlvbnMpe3JldHVybn1lbHNle3Rocm93QmluZGluZ0Vycm9yKGBDYW5ub3QgcmVnaXN0ZXIgdHlwZSAnJHtuYW1lfScgdHdpY2VgKX19cmVnaXN0ZXJlZFR5cGVzW3Jhd1R5cGVdPXJlZ2lzdGVyZWRJbnN0YW5jZTtkZWxldGUgdHlwZURlcGVuZGVuY2llc1tyYXdUeXBlXTtpZihhd2FpdGluZ0RlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShyYXdUeXBlKSl7dmFyIGNhbGxiYWNrcz1hd2FpdGluZ0RlcGVuZGVuY2llc1tyYXdUeXBlXTtkZWxldGUgYXdhaXRpbmdEZXBlbmRlbmNpZXNbcmF3VHlwZV07Y2FsbGJhY2tzLmZvckVhY2goY2I9PmNiKCkpfX1mdW5jdGlvbiBfX2VtYmluZF9yZWdpc3Rlcl9ib29sKHJhd1R5cGUsbmFtZSxzaXplLHRydWVWYWx1ZSxmYWxzZVZhbHVlKXt2YXIgc2hpZnQ9Z2V0U2hpZnRGcm9tU2l6ZShzaXplKTtuYW1lPXJlYWRMYXRpbjFTdHJpbmcobmFtZSk7cmVnaXN0ZXJUeXBlKHJhd1R5cGUse25hbWU6bmFtZSxcImZyb21XaXJlVHlwZVwiOmZ1bmN0aW9uKHd0KXtyZXR1cm4hIXd0fSxcInRvV2lyZVR5cGVcIjpmdW5jdGlvbihkZXN0cnVjdG9ycyxvKXtyZXR1cm4gbz90cnVlVmFsdWU6ZmFsc2VWYWx1ZX0sXCJhcmdQYWNrQWR2YW5jZVwiOjgsXCJyZWFkVmFsdWVGcm9tUG9pbnRlclwiOmZ1bmN0aW9uKHBvaW50ZXIpe3ZhciBoZWFwO2lmKHNpemU9PT0xKXtoZWFwPUhFQVA4fWVsc2UgaWYoc2l6ZT09PTIpe2hlYXA9SEVBUDE2fWVsc2UgaWYoc2l6ZT09PTQpe2hlYXA9SEVBUDMyfWVsc2V7dGhyb3cgbmV3IFR5cGVFcnJvcihcIlVua25vd24gYm9vbGVhbiB0eXBlIHNpemU6IFwiK25hbWUpfXJldHVybiB0aGlzW1wiZnJvbVdpcmVUeXBlXCJdKGhlYXBbcG9pbnRlcj4+c2hpZnRdKX0sZGVzdHJ1Y3RvckZ1bmN0aW9uOm51bGx9KX1mdW5jdGlvbiBDbGFzc0hhbmRsZV9pc0FsaWFzT2Yob3RoZXIpe2lmKCEodGhpcyBpbnN0YW5jZW9mIENsYXNzSGFuZGxlKSl7cmV0dXJuIGZhbHNlfWlmKCEob3RoZXIgaW5zdGFuY2VvZiBDbGFzc0hhbmRsZSkpe3JldHVybiBmYWxzZX12YXIgbGVmdENsYXNzPXRoaXMuJCQucHRyVHlwZS5yZWdpc3RlcmVkQ2xhc3M7dmFyIGxlZnQ9dGhpcy4kJC5wdHI7dmFyIHJpZ2h0Q2xhc3M9b3RoZXIuJCQucHRyVHlwZS5yZWdpc3RlcmVkQ2xhc3M7dmFyIHJpZ2h0PW90aGVyLiQkLnB0cjt3aGlsZShsZWZ0Q2xhc3MuYmFzZUNsYXNzKXtsZWZ0PWxlZnRDbGFzcy51cGNhc3QobGVmdCk7bGVmdENsYXNzPWxlZnRDbGFzcy5iYXNlQ2xhc3N9d2hpbGUocmlnaHRDbGFzcy5iYXNlQ2xhc3Mpe3JpZ2h0PXJpZ2h0Q2xhc3MudXBjYXN0KHJpZ2h0KTtyaWdodENsYXNzPXJpZ2h0Q2xhc3MuYmFzZUNsYXNzfXJldHVybiBsZWZ0Q2xhc3M9PT1yaWdodENsYXNzJiZsZWZ0PT09cmlnaHR9ZnVuY3Rpb24gc2hhbGxvd0NvcHlJbnRlcm5hbFBvaW50ZXIobyl7cmV0dXJue2NvdW50Om8uY291bnQsZGVsZXRlU2NoZWR1bGVkOm8uZGVsZXRlU2NoZWR1bGVkLHByZXNlcnZlUG9pbnRlck9uRGVsZXRlOm8ucHJlc2VydmVQb2ludGVyT25EZWxldGUscHRyOm8ucHRyLHB0clR5cGU6by5wdHJUeXBlLHNtYXJ0UHRyOm8uc21hcnRQdHIsc21hcnRQdHJUeXBlOm8uc21hcnRQdHJUeXBlfX1mdW5jdGlvbiB0aHJvd0luc3RhbmNlQWxyZWFkeURlbGV0ZWQob2JqKXtmdW5jdGlvbiBnZXRJbnN0YW5jZVR5cGVOYW1lKGhhbmRsZSl7cmV0dXJuIGhhbmRsZS4kJC5wdHJUeXBlLnJlZ2lzdGVyZWRDbGFzcy5uYW1lfXRocm93QmluZGluZ0Vycm9yKGdldEluc3RhbmNlVHlwZU5hbWUob2JqKStcIiBpbnN0YW5jZSBhbHJlYWR5IGRlbGV0ZWRcIil9dmFyIGZpbmFsaXphdGlvblJlZ2lzdHJ5PWZhbHNlO2Z1bmN0aW9uIGRldGFjaEZpbmFsaXplcihoYW5kbGUpe31mdW5jdGlvbiBydW5EZXN0cnVjdG9yKCQkKXtpZigkJC5zbWFydFB0cil7JCQuc21hcnRQdHJUeXBlLnJhd0Rlc3RydWN0b3IoJCQuc21hcnRQdHIpfWVsc2V7JCQucHRyVHlwZS5yZWdpc3RlcmVkQ2xhc3MucmF3RGVzdHJ1Y3RvcigkJC5wdHIpfX1mdW5jdGlvbiByZWxlYXNlQ2xhc3NIYW5kbGUoJCQpeyQkLmNvdW50LnZhbHVlLT0xO3ZhciB0b0RlbGV0ZT0wPT09JCQuY291bnQudmFsdWU7aWYodG9EZWxldGUpe3J1bkRlc3RydWN0b3IoJCQpfX1mdW5jdGlvbiBkb3duY2FzdFBvaW50ZXIocHRyLHB0ckNsYXNzLGRlc2lyZWRDbGFzcyl7aWYocHRyQ2xhc3M9PT1kZXNpcmVkQ2xhc3Mpe3JldHVybiBwdHJ9aWYodW5kZWZpbmVkPT09ZGVzaXJlZENsYXNzLmJhc2VDbGFzcyl7cmV0dXJuIG51bGx9dmFyIHJ2PWRvd25jYXN0UG9pbnRlcihwdHIscHRyQ2xhc3MsZGVzaXJlZENsYXNzLmJhc2VDbGFzcyk7aWYocnY9PT1udWxsKXtyZXR1cm4gbnVsbH1yZXR1cm4gZGVzaXJlZENsYXNzLmRvd25jYXN0KHJ2KX12YXIgcmVnaXN0ZXJlZFBvaW50ZXJzPXt9O2Z1bmN0aW9uIGdldEluaGVyaXRlZEluc3RhbmNlQ291bnQoKXtyZXR1cm4gT2JqZWN0LmtleXMocmVnaXN0ZXJlZEluc3RhbmNlcykubGVuZ3RofWZ1bmN0aW9uIGdldExpdmVJbmhlcml0ZWRJbnN0YW5jZXMoKXt2YXIgcnY9W107Zm9yKHZhciBrIGluIHJlZ2lzdGVyZWRJbnN0YW5jZXMpe2lmKHJlZ2lzdGVyZWRJbnN0YW5jZXMuaGFzT3duUHJvcGVydHkoaykpe3J2LnB1c2gocmVnaXN0ZXJlZEluc3RhbmNlc1trXSl9fXJldHVybiBydn12YXIgZGVsZXRpb25RdWV1ZT1bXTtmdW5jdGlvbiBmbHVzaFBlbmRpbmdEZWxldGVzKCl7d2hpbGUoZGVsZXRpb25RdWV1ZS5sZW5ndGgpe3ZhciBvYmo9ZGVsZXRpb25RdWV1ZS5wb3AoKTtvYmouJCQuZGVsZXRlU2NoZWR1bGVkPWZhbHNlO29ialtcImRlbGV0ZVwiXSgpfX12YXIgZGVsYXlGdW5jdGlvbj11bmRlZmluZWQ7ZnVuY3Rpb24gc2V0RGVsYXlGdW5jdGlvbihmbil7ZGVsYXlGdW5jdGlvbj1mbjtpZihkZWxldGlvblF1ZXVlLmxlbmd0aCYmZGVsYXlGdW5jdGlvbil7ZGVsYXlGdW5jdGlvbihmbHVzaFBlbmRpbmdEZWxldGVzKX19ZnVuY3Rpb24gaW5pdF9lbWJpbmQoKXtNb2R1bGVbXCJnZXRJbmhlcml0ZWRJbnN0YW5jZUNvdW50XCJdPWdldEluaGVyaXRlZEluc3RhbmNlQ291bnQ7TW9kdWxlW1wiZ2V0TGl2ZUluaGVyaXRlZEluc3RhbmNlc1wiXT1nZXRMaXZlSW5oZXJpdGVkSW5zdGFuY2VzO01vZHVsZVtcImZsdXNoUGVuZGluZ0RlbGV0ZXNcIl09Zmx1c2hQZW5kaW5nRGVsZXRlcztNb2R1bGVbXCJzZXREZWxheUZ1bmN0aW9uXCJdPXNldERlbGF5RnVuY3Rpb259dmFyIHJlZ2lzdGVyZWRJbnN0YW5jZXM9e307ZnVuY3Rpb24gZ2V0QmFzZXN0UG9pbnRlcihjbGFzc18scHRyKXtpZihwdHI9PT11bmRlZmluZWQpe3Rocm93QmluZGluZ0Vycm9yKFwicHRyIHNob3VsZCBub3QgYmUgdW5kZWZpbmVkXCIpfXdoaWxlKGNsYXNzXy5iYXNlQ2xhc3Mpe3B0cj1jbGFzc18udXBjYXN0KHB0cik7Y2xhc3NfPWNsYXNzXy5iYXNlQ2xhc3N9cmV0dXJuIHB0cn1mdW5jdGlvbiBnZXRJbmhlcml0ZWRJbnN0YW5jZShjbGFzc18scHRyKXtwdHI9Z2V0QmFzZXN0UG9pbnRlcihjbGFzc18scHRyKTtyZXR1cm4gcmVnaXN0ZXJlZEluc3RhbmNlc1twdHJdfWZ1bmN0aW9uIG1ha2VDbGFzc0hhbmRsZShwcm90b3R5cGUscmVjb3JkKXtpZighcmVjb3JkLnB0clR5cGV8fCFyZWNvcmQucHRyKXt0aHJvd0ludGVybmFsRXJyb3IoXCJtYWtlQ2xhc3NIYW5kbGUgcmVxdWlyZXMgcHRyIGFuZCBwdHJUeXBlXCIpfXZhciBoYXNTbWFydFB0clR5cGU9ISFyZWNvcmQuc21hcnRQdHJUeXBlO3ZhciBoYXNTbWFydFB0cj0hIXJlY29yZC5zbWFydFB0cjtpZihoYXNTbWFydFB0clR5cGUhPT1oYXNTbWFydFB0cil7dGhyb3dJbnRlcm5hbEVycm9yKFwiQm90aCBzbWFydFB0clR5cGUgYW5kIHNtYXJ0UHRyIG11c3QgYmUgc3BlY2lmaWVkXCIpfXJlY29yZC5jb3VudD17dmFsdWU6MX07cmV0dXJuIGF0dGFjaEZpbmFsaXplcihPYmplY3QuY3JlYXRlKHByb3RvdHlwZSx7JCQ6e3ZhbHVlOnJlY29yZH19KSl9ZnVuY3Rpb24gUmVnaXN0ZXJlZFBvaW50ZXJfZnJvbVdpcmVUeXBlKHB0cil7dmFyIHJhd1BvaW50ZXI9dGhpcy5nZXRQb2ludGVlKHB0cik7aWYoIXJhd1BvaW50ZXIpe3RoaXMuZGVzdHJ1Y3RvcihwdHIpO3JldHVybiBudWxsfXZhciByZWdpc3RlcmVkSW5zdGFuY2U9Z2V0SW5oZXJpdGVkSW5zdGFuY2UodGhpcy5yZWdpc3RlcmVkQ2xhc3MscmF3UG9pbnRlcik7aWYodW5kZWZpbmVkIT09cmVnaXN0ZXJlZEluc3RhbmNlKXtpZigwPT09cmVnaXN0ZXJlZEluc3RhbmNlLiQkLmNvdW50LnZhbHVlKXtyZWdpc3RlcmVkSW5zdGFuY2UuJCQucHRyPXJhd1BvaW50ZXI7cmVnaXN0ZXJlZEluc3RhbmNlLiQkLnNtYXJ0UHRyPXB0cjtyZXR1cm4gcmVnaXN0ZXJlZEluc3RhbmNlW1wiY2xvbmVcIl0oKX1lbHNle3ZhciBydj1yZWdpc3RlcmVkSW5zdGFuY2VbXCJjbG9uZVwiXSgpO3RoaXMuZGVzdHJ1Y3RvcihwdHIpO3JldHVybiBydn19ZnVuY3Rpb24gbWFrZURlZmF1bHRIYW5kbGUoKXtpZih0aGlzLmlzU21hcnRQb2ludGVyKXtyZXR1cm4gbWFrZUNsYXNzSGFuZGxlKHRoaXMucmVnaXN0ZXJlZENsYXNzLmluc3RhbmNlUHJvdG90eXBlLHtwdHJUeXBlOnRoaXMucG9pbnRlZVR5cGUscHRyOnJhd1BvaW50ZXIsc21hcnRQdHJUeXBlOnRoaXMsc21hcnRQdHI6cHRyfSl9ZWxzZXtyZXR1cm4gbWFrZUNsYXNzSGFuZGxlKHRoaXMucmVnaXN0ZXJlZENsYXNzLmluc3RhbmNlUHJvdG90eXBlLHtwdHJUeXBlOnRoaXMscHRyOnB0cn0pfX12YXIgYWN0dWFsVHlwZT10aGlzLnJlZ2lzdGVyZWRDbGFzcy5nZXRBY3R1YWxUeXBlKHJhd1BvaW50ZXIpO3ZhciByZWdpc3RlcmVkUG9pbnRlclJlY29yZD1yZWdpc3RlcmVkUG9pbnRlcnNbYWN0dWFsVHlwZV07aWYoIXJlZ2lzdGVyZWRQb2ludGVyUmVjb3JkKXtyZXR1cm4gbWFrZURlZmF1bHRIYW5kbGUuY2FsbCh0aGlzKX12YXIgdG9UeXBlO2lmKHRoaXMuaXNDb25zdCl7dG9UeXBlPXJlZ2lzdGVyZWRQb2ludGVyUmVjb3JkLmNvbnN0UG9pbnRlclR5cGV9ZWxzZXt0b1R5cGU9cmVnaXN0ZXJlZFBvaW50ZXJSZWNvcmQucG9pbnRlclR5cGV9dmFyIGRwPWRvd25jYXN0UG9pbnRlcihyYXdQb2ludGVyLHRoaXMucmVnaXN0ZXJlZENsYXNzLHRvVHlwZS5yZWdpc3RlcmVkQ2xhc3MpO2lmKGRwPT09bnVsbCl7cmV0dXJuIG1ha2VEZWZhdWx0SGFuZGxlLmNhbGwodGhpcyl9aWYodGhpcy5pc1NtYXJ0UG9pbnRlcil7cmV0dXJuIG1ha2VDbGFzc0hhbmRsZSh0b1R5cGUucmVnaXN0ZXJlZENsYXNzLmluc3RhbmNlUHJvdG90eXBlLHtwdHJUeXBlOnRvVHlwZSxwdHI6ZHAsc21hcnRQdHJUeXBlOnRoaXMsc21hcnRQdHI6cHRyfSl9ZWxzZXtyZXR1cm4gbWFrZUNsYXNzSGFuZGxlKHRvVHlwZS5yZWdpc3RlcmVkQ2xhc3MuaW5zdGFuY2VQcm90b3R5cGUse3B0clR5cGU6dG9UeXBlLHB0cjpkcH0pfX1mdW5jdGlvbiBhdHRhY2hGaW5hbGl6ZXIoaGFuZGxlKXtpZihcInVuZGVmaW5lZFwiPT09dHlwZW9mIEZpbmFsaXphdGlvblJlZ2lzdHJ5KXthdHRhY2hGaW5hbGl6ZXI9aGFuZGxlPT5oYW5kbGU7cmV0dXJuIGhhbmRsZX1maW5hbGl6YXRpb25SZWdpc3RyeT1uZXcgRmluYWxpemF0aW9uUmVnaXN0cnkoaW5mbz0+e3JlbGVhc2VDbGFzc0hhbmRsZShpbmZvLiQkKX0pO2F0dGFjaEZpbmFsaXplcj1oYW5kbGU9Pnt2YXIgJCQ9aGFuZGxlLiQkO3ZhciBoYXNTbWFydFB0cj0hISQkLnNtYXJ0UHRyO2lmKGhhc1NtYXJ0UHRyKXt2YXIgaW5mbz17JCQ6JCR9O2ZpbmFsaXphdGlvblJlZ2lzdHJ5LnJlZ2lzdGVyKGhhbmRsZSxpbmZvLGhhbmRsZSl9cmV0dXJuIGhhbmRsZX07ZGV0YWNoRmluYWxpemVyPWhhbmRsZT0+ZmluYWxpemF0aW9uUmVnaXN0cnkudW5yZWdpc3RlcihoYW5kbGUpO3JldHVybiBhdHRhY2hGaW5hbGl6ZXIoaGFuZGxlKX1mdW5jdGlvbiBDbGFzc0hhbmRsZV9jbG9uZSgpe2lmKCF0aGlzLiQkLnB0cil7dGhyb3dJbnN0YW5jZUFscmVhZHlEZWxldGVkKHRoaXMpfWlmKHRoaXMuJCQucHJlc2VydmVQb2ludGVyT25EZWxldGUpe3RoaXMuJCQuY291bnQudmFsdWUrPTE7cmV0dXJuIHRoaXN9ZWxzZXt2YXIgY2xvbmU9YXR0YWNoRmluYWxpemVyKE9iamVjdC5jcmVhdGUoT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLHskJDp7dmFsdWU6c2hhbGxvd0NvcHlJbnRlcm5hbFBvaW50ZXIodGhpcy4kJCl9fSkpO2Nsb25lLiQkLmNvdW50LnZhbHVlKz0xO2Nsb25lLiQkLmRlbGV0ZVNjaGVkdWxlZD1mYWxzZTtyZXR1cm4gY2xvbmV9fWZ1bmN0aW9uIENsYXNzSGFuZGxlX2RlbGV0ZSgpe2lmKCF0aGlzLiQkLnB0cil7dGhyb3dJbnN0YW5jZUFscmVhZHlEZWxldGVkKHRoaXMpfWlmKHRoaXMuJCQuZGVsZXRlU2NoZWR1bGVkJiYhdGhpcy4kJC5wcmVzZXJ2ZVBvaW50ZXJPbkRlbGV0ZSl7dGhyb3dCaW5kaW5nRXJyb3IoXCJPYmplY3QgYWxyZWFkeSBzY2hlZHVsZWQgZm9yIGRlbGV0aW9uXCIpfWRldGFjaEZpbmFsaXplcih0aGlzKTtyZWxlYXNlQ2xhc3NIYW5kbGUodGhpcy4kJCk7aWYoIXRoaXMuJCQucHJlc2VydmVQb2ludGVyT25EZWxldGUpe3RoaXMuJCQuc21hcnRQdHI9dW5kZWZpbmVkO3RoaXMuJCQucHRyPXVuZGVmaW5lZH19ZnVuY3Rpb24gQ2xhc3NIYW5kbGVfaXNEZWxldGVkKCl7cmV0dXJuIXRoaXMuJCQucHRyfWZ1bmN0aW9uIENsYXNzSGFuZGxlX2RlbGV0ZUxhdGVyKCl7aWYoIXRoaXMuJCQucHRyKXt0aHJvd0luc3RhbmNlQWxyZWFkeURlbGV0ZWQodGhpcyl9aWYodGhpcy4kJC5kZWxldGVTY2hlZHVsZWQmJiF0aGlzLiQkLnByZXNlcnZlUG9pbnRlck9uRGVsZXRlKXt0aHJvd0JpbmRpbmdFcnJvcihcIk9iamVjdCBhbHJlYWR5IHNjaGVkdWxlZCBmb3IgZGVsZXRpb25cIil9ZGVsZXRpb25RdWV1ZS5wdXNoKHRoaXMpO2lmKGRlbGV0aW9uUXVldWUubGVuZ3RoPT09MSYmZGVsYXlGdW5jdGlvbil7ZGVsYXlGdW5jdGlvbihmbHVzaFBlbmRpbmdEZWxldGVzKX10aGlzLiQkLmRlbGV0ZVNjaGVkdWxlZD10cnVlO3JldHVybiB0aGlzfWZ1bmN0aW9uIGluaXRfQ2xhc3NIYW5kbGUoKXtDbGFzc0hhbmRsZS5wcm90b3R5cGVbXCJpc0FsaWFzT2ZcIl09Q2xhc3NIYW5kbGVfaXNBbGlhc09mO0NsYXNzSGFuZGxlLnByb3RvdHlwZVtcImNsb25lXCJdPUNsYXNzSGFuZGxlX2Nsb25lO0NsYXNzSGFuZGxlLnByb3RvdHlwZVtcImRlbGV0ZVwiXT1DbGFzc0hhbmRsZV9kZWxldGU7Q2xhc3NIYW5kbGUucHJvdG90eXBlW1wiaXNEZWxldGVkXCJdPUNsYXNzSGFuZGxlX2lzRGVsZXRlZDtDbGFzc0hhbmRsZS5wcm90b3R5cGVbXCJkZWxldGVMYXRlclwiXT1DbGFzc0hhbmRsZV9kZWxldGVMYXRlcn1mdW5jdGlvbiBDbGFzc0hhbmRsZSgpe31mdW5jdGlvbiBlbnN1cmVPdmVybG9hZFRhYmxlKHByb3RvLG1ldGhvZE5hbWUsaHVtYW5OYW1lKXtpZih1bmRlZmluZWQ9PT1wcm90b1ttZXRob2ROYW1lXS5vdmVybG9hZFRhYmxlKXt2YXIgcHJldkZ1bmM9cHJvdG9bbWV0aG9kTmFtZV07cHJvdG9bbWV0aG9kTmFtZV09ZnVuY3Rpb24oKXtpZighcHJvdG9bbWV0aG9kTmFtZV0ub3ZlcmxvYWRUYWJsZS5oYXNPd25Qcm9wZXJ0eShhcmd1bWVudHMubGVuZ3RoKSl7dGhyb3dCaW5kaW5nRXJyb3IoYEZ1bmN0aW9uICcke2h1bWFuTmFtZX0nIGNhbGxlZCB3aXRoIGFuIGludmFsaWQgbnVtYmVyIG9mIGFyZ3VtZW50cyAoJHthcmd1bWVudHMubGVuZ3RofSkgLSBleHBlY3RzIG9uZSBvZiAoJHtwcm90b1ttZXRob2ROYW1lXS5vdmVybG9hZFRhYmxlfSkhYCl9cmV0dXJuIHByb3RvW21ldGhvZE5hbWVdLm92ZXJsb2FkVGFibGVbYXJndW1lbnRzLmxlbmd0aF0uYXBwbHkodGhpcyxhcmd1bWVudHMpfTtwcm90b1ttZXRob2ROYW1lXS5vdmVybG9hZFRhYmxlPVtdO3Byb3RvW21ldGhvZE5hbWVdLm92ZXJsb2FkVGFibGVbcHJldkZ1bmMuYXJnQ291bnRdPXByZXZGdW5jfX1mdW5jdGlvbiBleHBvc2VQdWJsaWNTeW1ib2wobmFtZSx2YWx1ZSxudW1Bcmd1bWVudHMpe2lmKE1vZHVsZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSl7aWYodW5kZWZpbmVkPT09bnVtQXJndW1lbnRzfHx1bmRlZmluZWQhPT1Nb2R1bGVbbmFtZV0ub3ZlcmxvYWRUYWJsZSYmdW5kZWZpbmVkIT09TW9kdWxlW25hbWVdLm92ZXJsb2FkVGFibGVbbnVtQXJndW1lbnRzXSl7dGhyb3dCaW5kaW5nRXJyb3IoYENhbm5vdCByZWdpc3RlciBwdWJsaWMgbmFtZSAnJHtuYW1lfScgdHdpY2VgKX1lbnN1cmVPdmVybG9hZFRhYmxlKE1vZHVsZSxuYW1lLG5hbWUpO2lmKE1vZHVsZS5oYXNPd25Qcm9wZXJ0eShudW1Bcmd1bWVudHMpKXt0aHJvd0JpbmRpbmdFcnJvcihgQ2Fubm90IHJlZ2lzdGVyIG11bHRpcGxlIG92ZXJsb2FkcyBvZiBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgbnVtYmVyIG9mIGFyZ3VtZW50cyAoJHtudW1Bcmd1bWVudHN9KSFgKX1Nb2R1bGVbbmFtZV0ub3ZlcmxvYWRUYWJsZVtudW1Bcmd1bWVudHNdPXZhbHVlfWVsc2V7TW9kdWxlW25hbWVdPXZhbHVlO2lmKHVuZGVmaW5lZCE9PW51bUFyZ3VtZW50cyl7TW9kdWxlW25hbWVdLm51bUFyZ3VtZW50cz1udW1Bcmd1bWVudHN9fX1mdW5jdGlvbiBSZWdpc3RlcmVkQ2xhc3MobmFtZSxjb25zdHJ1Y3RvcixpbnN0YW5jZVByb3RvdHlwZSxyYXdEZXN0cnVjdG9yLGJhc2VDbGFzcyxnZXRBY3R1YWxUeXBlLHVwY2FzdCxkb3duY2FzdCl7dGhpcy5uYW1lPW5hbWU7dGhpcy5jb25zdHJ1Y3Rvcj1jb25zdHJ1Y3Rvcjt0aGlzLmluc3RhbmNlUHJvdG90eXBlPWluc3RhbmNlUHJvdG90eXBlO3RoaXMucmF3RGVzdHJ1Y3Rvcj1yYXdEZXN0cnVjdG9yO3RoaXMuYmFzZUNsYXNzPWJhc2VDbGFzczt0aGlzLmdldEFjdHVhbFR5cGU9Z2V0QWN0dWFsVHlwZTt0aGlzLnVwY2FzdD11cGNhc3Q7dGhpcy5kb3duY2FzdD1kb3duY2FzdDt0aGlzLnB1cmVWaXJ0dWFsRnVuY3Rpb25zPVtdfWZ1bmN0aW9uIHVwY2FzdFBvaW50ZXIocHRyLHB0ckNsYXNzLGRlc2lyZWRDbGFzcyl7d2hpbGUocHRyQ2xhc3MhPT1kZXNpcmVkQ2xhc3Mpe2lmKCFwdHJDbGFzcy51cGNhc3Qpe3Rocm93QmluZGluZ0Vycm9yKGBFeHBlY3RlZCBudWxsIG9yIGluc3RhbmNlIG9mICR7ZGVzaXJlZENsYXNzLm5hbWV9LCBnb3QgYW4gaW5zdGFuY2Ugb2YgJHtwdHJDbGFzcy5uYW1lfWApfXB0cj1wdHJDbGFzcy51cGNhc3QocHRyKTtwdHJDbGFzcz1wdHJDbGFzcy5iYXNlQ2xhc3N9cmV0dXJuIHB0cn1mdW5jdGlvbiBjb25zdE5vU21hcnRQdHJSYXdQb2ludGVyVG9XaXJlVHlwZShkZXN0cnVjdG9ycyxoYW5kbGUpe2lmKGhhbmRsZT09PW51bGwpe2lmKHRoaXMuaXNSZWZlcmVuY2Upe3Rocm93QmluZGluZ0Vycm9yKGBudWxsIGlzIG5vdCBhIHZhbGlkICR7dGhpcy5uYW1lfWApfXJldHVybiAwfWlmKCFoYW5kbGUuJCQpe3Rocm93QmluZGluZ0Vycm9yKGBDYW5ub3QgcGFzcyBcIiR7ZW1iaW5kUmVwcihoYW5kbGUpfVwiIGFzIGEgJHt0aGlzLm5hbWV9YCl9aWYoIWhhbmRsZS4kJC5wdHIpe3Rocm93QmluZGluZ0Vycm9yKGBDYW5ub3QgcGFzcyBkZWxldGVkIG9iamVjdCBhcyBhIHBvaW50ZXIgb2YgdHlwZSAke3RoaXMubmFtZX1gKX12YXIgaGFuZGxlQ2xhc3M9aGFuZGxlLiQkLnB0clR5cGUucmVnaXN0ZXJlZENsYXNzO3ZhciBwdHI9dXBjYXN0UG9pbnRlcihoYW5kbGUuJCQucHRyLGhhbmRsZUNsYXNzLHRoaXMucmVnaXN0ZXJlZENsYXNzKTtyZXR1cm4gcHRyfWZ1bmN0aW9uIGdlbmVyaWNQb2ludGVyVG9XaXJlVHlwZShkZXN0cnVjdG9ycyxoYW5kbGUpe3ZhciBwdHI7aWYoaGFuZGxlPT09bnVsbCl7aWYodGhpcy5pc1JlZmVyZW5jZSl7dGhyb3dCaW5kaW5nRXJyb3IoYG51bGwgaXMgbm90IGEgdmFsaWQgJHt0aGlzLm5hbWV9YCl9aWYodGhpcy5pc1NtYXJ0UG9pbnRlcil7cHRyPXRoaXMucmF3Q29uc3RydWN0b3IoKTtpZihkZXN0cnVjdG9ycyE9PW51bGwpe2Rlc3RydWN0b3JzLnB1c2godGhpcy5yYXdEZXN0cnVjdG9yLHB0cil9cmV0dXJuIHB0cn1lbHNle3JldHVybiAwfX1pZighaGFuZGxlLiQkKXt0aHJvd0JpbmRpbmdFcnJvcihgQ2Fubm90IHBhc3MgXCIke2VtYmluZFJlcHIoaGFuZGxlKX1cIiBhcyBhICR7dGhpcy5uYW1lfWApfWlmKCFoYW5kbGUuJCQucHRyKXt0aHJvd0JpbmRpbmdFcnJvcihgQ2Fubm90IHBhc3MgZGVsZXRlZCBvYmplY3QgYXMgYSBwb2ludGVyIG9mIHR5cGUgJHt0aGlzLm5hbWV9YCl9aWYoIXRoaXMuaXNDb25zdCYmaGFuZGxlLiQkLnB0clR5cGUuaXNDb25zdCl7dGhyb3dCaW5kaW5nRXJyb3IoYENhbm5vdCBjb252ZXJ0IGFyZ3VtZW50IG9mIHR5cGUgJHtoYW5kbGUuJCQuc21hcnRQdHJUeXBlP2hhbmRsZS4kJC5zbWFydFB0clR5cGUubmFtZTpoYW5kbGUuJCQucHRyVHlwZS5uYW1lfSB0byBwYXJhbWV0ZXIgdHlwZSAke3RoaXMubmFtZX1gKX12YXIgaGFuZGxlQ2xhc3M9aGFuZGxlLiQkLnB0clR5cGUucmVnaXN0ZXJlZENsYXNzO3B0cj11cGNhc3RQb2ludGVyKGhhbmRsZS4kJC5wdHIsaGFuZGxlQ2xhc3MsdGhpcy5yZWdpc3RlcmVkQ2xhc3MpO2lmKHRoaXMuaXNTbWFydFBvaW50ZXIpe2lmKHVuZGVmaW5lZD09PWhhbmRsZS4kJC5zbWFydFB0cil7dGhyb3dCaW5kaW5nRXJyb3IoXCJQYXNzaW5nIHJhdyBwb2ludGVyIHRvIHNtYXJ0IHBvaW50ZXIgaXMgaWxsZWdhbFwiKX1zd2l0Y2godGhpcy5zaGFyaW5nUG9saWN5KXtjYXNlIDA6aWYoaGFuZGxlLiQkLnNtYXJ0UHRyVHlwZT09PXRoaXMpe3B0cj1oYW5kbGUuJCQuc21hcnRQdHJ9ZWxzZXt0aHJvd0JpbmRpbmdFcnJvcihgQ2Fubm90IGNvbnZlcnQgYXJndW1lbnQgb2YgdHlwZSAke2hhbmRsZS4kJC5zbWFydFB0clR5cGU/aGFuZGxlLiQkLnNtYXJ0UHRyVHlwZS5uYW1lOmhhbmRsZS4kJC5wdHJUeXBlLm5hbWV9IHRvIHBhcmFtZXRlciB0eXBlICR7dGhpcy5uYW1lfWApfWJyZWFrO2Nhc2UgMTpwdHI9aGFuZGxlLiQkLnNtYXJ0UHRyO2JyZWFrO2Nhc2UgMjppZihoYW5kbGUuJCQuc21hcnRQdHJUeXBlPT09dGhpcyl7cHRyPWhhbmRsZS4kJC5zbWFydFB0cn1lbHNle3ZhciBjbG9uZWRIYW5kbGU9aGFuZGxlW1wiY2xvbmVcIl0oKTtwdHI9dGhpcy5yYXdTaGFyZShwdHIsRW12YWwudG9IYW5kbGUoZnVuY3Rpb24oKXtjbG9uZWRIYW5kbGVbXCJkZWxldGVcIl0oKX0pKTtpZihkZXN0cnVjdG9ycyE9PW51bGwpe2Rlc3RydWN0b3JzLnB1c2godGhpcy5yYXdEZXN0cnVjdG9yLHB0cil9fWJyZWFrO2RlZmF1bHQ6dGhyb3dCaW5kaW5nRXJyb3IoXCJVbnN1cHBvcnRpbmcgc2hhcmluZyBwb2xpY3lcIil9fXJldHVybiBwdHJ9ZnVuY3Rpb24gbm9uQ29uc3ROb1NtYXJ0UHRyUmF3UG9pbnRlclRvV2lyZVR5cGUoZGVzdHJ1Y3RvcnMsaGFuZGxlKXtpZihoYW5kbGU9PT1udWxsKXtpZih0aGlzLmlzUmVmZXJlbmNlKXt0aHJvd0JpbmRpbmdFcnJvcihgbnVsbCBpcyBub3QgYSB2YWxpZCAke3RoaXMubmFtZX1gKX1yZXR1cm4gMH1pZighaGFuZGxlLiQkKXt0aHJvd0JpbmRpbmdFcnJvcihgQ2Fubm90IHBhc3MgXCIke2VtYmluZFJlcHIoaGFuZGxlKX1cIiBhcyBhICR7dGhpcy5uYW1lfWApfWlmKCFoYW5kbGUuJCQucHRyKXt0aHJvd0JpbmRpbmdFcnJvcihgQ2Fubm90IHBhc3MgZGVsZXRlZCBvYmplY3QgYXMgYSBwb2ludGVyIG9mIHR5cGUgJHt0aGlzLm5hbWV9YCl9aWYoaGFuZGxlLiQkLnB0clR5cGUuaXNDb25zdCl7dGhyb3dCaW5kaW5nRXJyb3IoYENhbm5vdCBjb252ZXJ0IGFyZ3VtZW50IG9mIHR5cGUgJHtoYW5kbGUuJCQucHRyVHlwZS5uYW1lfSB0byBwYXJhbWV0ZXIgdHlwZSAke3RoaXMubmFtZX1gKX12YXIgaGFuZGxlQ2xhc3M9aGFuZGxlLiQkLnB0clR5cGUucmVnaXN0ZXJlZENsYXNzO3ZhciBwdHI9dXBjYXN0UG9pbnRlcihoYW5kbGUuJCQucHRyLGhhbmRsZUNsYXNzLHRoaXMucmVnaXN0ZXJlZENsYXNzKTtyZXR1cm4gcHRyfWZ1bmN0aW9uIHNpbXBsZVJlYWRWYWx1ZUZyb21Qb2ludGVyKHBvaW50ZXIpe3JldHVybiB0aGlzW1wiZnJvbVdpcmVUeXBlXCJdKEhFQVAzMltwb2ludGVyPj4yXSl9ZnVuY3Rpb24gUmVnaXN0ZXJlZFBvaW50ZXJfZ2V0UG9pbnRlZShwdHIpe2lmKHRoaXMucmF3R2V0UG9pbnRlZSl7cHRyPXRoaXMucmF3R2V0UG9pbnRlZShwdHIpfXJldHVybiBwdHJ9ZnVuY3Rpb24gUmVnaXN0ZXJlZFBvaW50ZXJfZGVzdHJ1Y3RvcihwdHIpe2lmKHRoaXMucmF3RGVzdHJ1Y3Rvcil7dGhpcy5yYXdEZXN0cnVjdG9yKHB0cil9fWZ1bmN0aW9uIFJlZ2lzdGVyZWRQb2ludGVyX2RlbGV0ZU9iamVjdChoYW5kbGUpe2lmKGhhbmRsZSE9PW51bGwpe2hhbmRsZVtcImRlbGV0ZVwiXSgpfX1mdW5jdGlvbiBpbml0X1JlZ2lzdGVyZWRQb2ludGVyKCl7UmVnaXN0ZXJlZFBvaW50ZXIucHJvdG90eXBlLmdldFBvaW50ZWU9UmVnaXN0ZXJlZFBvaW50ZXJfZ2V0UG9pbnRlZTtSZWdpc3RlcmVkUG9pbnRlci5wcm90b3R5cGUuZGVzdHJ1Y3Rvcj1SZWdpc3RlcmVkUG9pbnRlcl9kZXN0cnVjdG9yO1JlZ2lzdGVyZWRQb2ludGVyLnByb3RvdHlwZVtcImFyZ1BhY2tBZHZhbmNlXCJdPTg7UmVnaXN0ZXJlZFBvaW50ZXIucHJvdG90eXBlW1wicmVhZFZhbHVlRnJvbVBvaW50ZXJcIl09c2ltcGxlUmVhZFZhbHVlRnJvbVBvaW50ZXI7UmVnaXN0ZXJlZFBvaW50ZXIucHJvdG90eXBlW1wiZGVsZXRlT2JqZWN0XCJdPVJlZ2lzdGVyZWRQb2ludGVyX2RlbGV0ZU9iamVjdDtSZWdpc3RlcmVkUG9pbnRlci5wcm90b3R5cGVbXCJmcm9tV2lyZVR5cGVcIl09UmVnaXN0ZXJlZFBvaW50ZXJfZnJvbVdpcmVUeXBlfWZ1bmN0aW9uIFJlZ2lzdGVyZWRQb2ludGVyKG5hbWUscmVnaXN0ZXJlZENsYXNzLGlzUmVmZXJlbmNlLGlzQ29uc3QsaXNTbWFydFBvaW50ZXIscG9pbnRlZVR5cGUsc2hhcmluZ1BvbGljeSxyYXdHZXRQb2ludGVlLHJhd0NvbnN0cnVjdG9yLHJhd1NoYXJlLHJhd0Rlc3RydWN0b3Ipe3RoaXMubmFtZT1uYW1lO3RoaXMucmVnaXN0ZXJlZENsYXNzPXJlZ2lzdGVyZWRDbGFzczt0aGlzLmlzUmVmZXJlbmNlPWlzUmVmZXJlbmNlO3RoaXMuaXNDb25zdD1pc0NvbnN0O3RoaXMuaXNTbWFydFBvaW50ZXI9aXNTbWFydFBvaW50ZXI7dGhpcy5wb2ludGVlVHlwZT1wb2ludGVlVHlwZTt0aGlzLnNoYXJpbmdQb2xpY3k9c2hhcmluZ1BvbGljeTt0aGlzLnJhd0dldFBvaW50ZWU9cmF3R2V0UG9pbnRlZTt0aGlzLnJhd0NvbnN0cnVjdG9yPXJhd0NvbnN0cnVjdG9yO3RoaXMucmF3U2hhcmU9cmF3U2hhcmU7dGhpcy5yYXdEZXN0cnVjdG9yPXJhd0Rlc3RydWN0b3I7aWYoIWlzU21hcnRQb2ludGVyJiZyZWdpc3RlcmVkQ2xhc3MuYmFzZUNsYXNzPT09dW5kZWZpbmVkKXtpZihpc0NvbnN0KXt0aGlzW1widG9XaXJlVHlwZVwiXT1jb25zdE5vU21hcnRQdHJSYXdQb2ludGVyVG9XaXJlVHlwZTt0aGlzLmRlc3RydWN0b3JGdW5jdGlvbj1udWxsfWVsc2V7dGhpc1tcInRvV2lyZVR5cGVcIl09bm9uQ29uc3ROb1NtYXJ0UHRyUmF3UG9pbnRlclRvV2lyZVR5cGU7dGhpcy5kZXN0cnVjdG9yRnVuY3Rpb249bnVsbH19ZWxzZXt0aGlzW1widG9XaXJlVHlwZVwiXT1nZW5lcmljUG9pbnRlclRvV2lyZVR5cGV9fWZ1bmN0aW9uIHJlcGxhY2VQdWJsaWNTeW1ib2wobmFtZSx2YWx1ZSxudW1Bcmd1bWVudHMpe2lmKCFNb2R1bGUuaGFzT3duUHJvcGVydHkobmFtZSkpe3Rocm93SW50ZXJuYWxFcnJvcihcIlJlcGxhY2luZyBub25leGlzdGFudCBwdWJsaWMgc3ltYm9sXCIpfWlmKHVuZGVmaW5lZCE9PU1vZHVsZVtuYW1lXS5vdmVybG9hZFRhYmxlJiZ1bmRlZmluZWQhPT1udW1Bcmd1bWVudHMpe01vZHVsZVtuYW1lXS5vdmVybG9hZFRhYmxlW251bUFyZ3VtZW50c109dmFsdWV9ZWxzZXtNb2R1bGVbbmFtZV09dmFsdWU7TW9kdWxlW25hbWVdLmFyZ0NvdW50PW51bUFyZ3VtZW50c319ZnVuY3Rpb24gZHluQ2FsbExlZ2FjeShzaWcscHRyLGFyZ3Mpe3ZhciBmPU1vZHVsZVtcImR5bkNhbGxfXCIrc2lnXTtyZXR1cm4gYXJncyYmYXJncy5sZW5ndGg/Zi5hcHBseShudWxsLFtwdHJdLmNvbmNhdChhcmdzKSk6Zi5jYWxsKG51bGwscHRyKX12YXIgd2FzbVRhYmxlTWlycm9yPVtdO2Z1bmN0aW9uIGdldFdhc21UYWJsZUVudHJ5KGZ1bmNQdHIpe3ZhciBmdW5jPXdhc21UYWJsZU1pcnJvcltmdW5jUHRyXTtpZighZnVuYyl7aWYoZnVuY1B0cj49d2FzbVRhYmxlTWlycm9yLmxlbmd0aCl3YXNtVGFibGVNaXJyb3IubGVuZ3RoPWZ1bmNQdHIrMTt3YXNtVGFibGVNaXJyb3JbZnVuY1B0cl09ZnVuYz13YXNtVGFibGUuZ2V0KGZ1bmNQdHIpfXJldHVybiBmdW5jfWZ1bmN0aW9uIGR5bkNhbGwoc2lnLHB0cixhcmdzKXtpZihzaWcuaW5jbHVkZXMoXCJqXCIpKXtyZXR1cm4gZHluQ2FsbExlZ2FjeShzaWcscHRyLGFyZ3MpfXZhciBydG49Z2V0V2FzbVRhYmxlRW50cnkocHRyKS5hcHBseShudWxsLGFyZ3MpO3JldHVybiBydG59ZnVuY3Rpb24gZ2V0RHluQ2FsbGVyKHNpZyxwdHIpe3ZhciBhcmdDYWNoZT1bXTtyZXR1cm4gZnVuY3Rpb24oKXthcmdDYWNoZS5sZW5ndGg9MDtPYmplY3QuYXNzaWduKGFyZ0NhY2hlLGFyZ3VtZW50cyk7cmV0dXJuIGR5bkNhbGwoc2lnLHB0cixhcmdDYWNoZSl9fWZ1bmN0aW9uIGVtYmluZF9fcmVxdWlyZUZ1bmN0aW9uKHNpZ25hdHVyZSxyYXdGdW5jdGlvbil7c2lnbmF0dXJlPXJlYWRMYXRpbjFTdHJpbmcoc2lnbmF0dXJlKTtmdW5jdGlvbiBtYWtlRHluQ2FsbGVyKCl7aWYoc2lnbmF0dXJlLmluY2x1ZGVzKFwialwiKSl7cmV0dXJuIGdldER5bkNhbGxlcihzaWduYXR1cmUscmF3RnVuY3Rpb24pfXJldHVybiBnZXRXYXNtVGFibGVFbnRyeShyYXdGdW5jdGlvbil9dmFyIGZwPW1ha2VEeW5DYWxsZXIoKTtpZih0eXBlb2YgZnAhPVwiZnVuY3Rpb25cIil7dGhyb3dCaW5kaW5nRXJyb3IoYHVua25vd24gZnVuY3Rpb24gcG9pbnRlciB3aXRoIHNpZ25hdHVyZSAke3NpZ25hdHVyZX06ICR7cmF3RnVuY3Rpb259YCl9cmV0dXJuIGZwfXZhciBVbmJvdW5kVHlwZUVycm9yPXVuZGVmaW5lZDtmdW5jdGlvbiBnZXRUeXBlTmFtZSh0eXBlKXt2YXIgcHRyPV9fX2dldFR5cGVOYW1lKHR5cGUpO3ZhciBydj1yZWFkTGF0aW4xU3RyaW5nKHB0cik7X2ZyZWUocHRyKTtyZXR1cm4gcnZ9ZnVuY3Rpb24gdGhyb3dVbmJvdW5kVHlwZUVycm9yKG1lc3NhZ2UsdHlwZXMpe3ZhciB1bmJvdW5kVHlwZXM9W107dmFyIHNlZW49e307ZnVuY3Rpb24gdmlzaXQodHlwZSl7aWYoc2Vlblt0eXBlXSl7cmV0dXJufWlmKHJlZ2lzdGVyZWRUeXBlc1t0eXBlXSl7cmV0dXJufWlmKHR5cGVEZXBlbmRlbmNpZXNbdHlwZV0pe3R5cGVEZXBlbmRlbmNpZXNbdHlwZV0uZm9yRWFjaCh2aXNpdCk7cmV0dXJufXVuYm91bmRUeXBlcy5wdXNoKHR5cGUpO3NlZW5bdHlwZV09dHJ1ZX10eXBlcy5mb3JFYWNoKHZpc2l0KTt0aHJvdyBuZXcgVW5ib3VuZFR5cGVFcnJvcihgJHttZXNzYWdlfTogYCt1bmJvdW5kVHlwZXMubWFwKGdldFR5cGVOYW1lKS5qb2luKFtcIiwgXCJdKSl9ZnVuY3Rpb24gX19lbWJpbmRfcmVnaXN0ZXJfY2xhc3MocmF3VHlwZSxyYXdQb2ludGVyVHlwZSxyYXdDb25zdFBvaW50ZXJUeXBlLGJhc2VDbGFzc1Jhd1R5cGUsZ2V0QWN0dWFsVHlwZVNpZ25hdHVyZSxnZXRBY3R1YWxUeXBlLHVwY2FzdFNpZ25hdHVyZSx1cGNhc3QsZG93bmNhc3RTaWduYXR1cmUsZG93bmNhc3QsbmFtZSxkZXN0cnVjdG9yU2lnbmF0dXJlLHJhd0Rlc3RydWN0b3Ipe25hbWU9cmVhZExhdGluMVN0cmluZyhuYW1lKTtnZXRBY3R1YWxUeXBlPWVtYmluZF9fcmVxdWlyZUZ1bmN0aW9uKGdldEFjdHVhbFR5cGVTaWduYXR1cmUsZ2V0QWN0dWFsVHlwZSk7aWYodXBjYXN0KXt1cGNhc3Q9ZW1iaW5kX19yZXF1aXJlRnVuY3Rpb24odXBjYXN0U2lnbmF0dXJlLHVwY2FzdCl9aWYoZG93bmNhc3Qpe2Rvd25jYXN0PWVtYmluZF9fcmVxdWlyZUZ1bmN0aW9uKGRvd25jYXN0U2lnbmF0dXJlLGRvd25jYXN0KX1yYXdEZXN0cnVjdG9yPWVtYmluZF9fcmVxdWlyZUZ1bmN0aW9uKGRlc3RydWN0b3JTaWduYXR1cmUscmF3RGVzdHJ1Y3Rvcik7dmFyIGxlZ2FsRnVuY3Rpb25OYW1lPW1ha2VMZWdhbEZ1bmN0aW9uTmFtZShuYW1lKTtleHBvc2VQdWJsaWNTeW1ib2wobGVnYWxGdW5jdGlvbk5hbWUsZnVuY3Rpb24oKXt0aHJvd1VuYm91bmRUeXBlRXJyb3IoYENhbm5vdCBjb25zdHJ1Y3QgJHtuYW1lfSBkdWUgdG8gdW5ib3VuZCB0eXBlc2AsW2Jhc2VDbGFzc1Jhd1R5cGVdKX0pO3doZW5EZXBlbmRlbnRUeXBlc0FyZVJlc29sdmVkKFtyYXdUeXBlLHJhd1BvaW50ZXJUeXBlLHJhd0NvbnN0UG9pbnRlclR5cGVdLGJhc2VDbGFzc1Jhd1R5cGU/W2Jhc2VDbGFzc1Jhd1R5cGVdOltdLGZ1bmN0aW9uKGJhc2Upe2Jhc2U9YmFzZVswXTt2YXIgYmFzZUNsYXNzO3ZhciBiYXNlUHJvdG90eXBlO2lmKGJhc2VDbGFzc1Jhd1R5cGUpe2Jhc2VDbGFzcz1iYXNlLnJlZ2lzdGVyZWRDbGFzcztiYXNlUHJvdG90eXBlPWJhc2VDbGFzcy5pbnN0YW5jZVByb3RvdHlwZX1lbHNle2Jhc2VQcm90b3R5cGU9Q2xhc3NIYW5kbGUucHJvdG90eXBlfXZhciBjb25zdHJ1Y3Rvcj1jcmVhdGVOYW1lZEZ1bmN0aW9uKGxlZ2FsRnVuY3Rpb25OYW1lLGZ1bmN0aW9uKCl7aWYoT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpIT09aW5zdGFuY2VQcm90b3R5cGUpe3Rocm93IG5ldyBCaW5kaW5nRXJyb3IoXCJVc2UgJ25ldycgdG8gY29uc3RydWN0IFwiK25hbWUpfWlmKHVuZGVmaW5lZD09PXJlZ2lzdGVyZWRDbGFzcy5jb25zdHJ1Y3Rvcl9ib2R5KXt0aHJvdyBuZXcgQmluZGluZ0Vycm9yKG5hbWUrXCIgaGFzIG5vIGFjY2Vzc2libGUgY29uc3RydWN0b3JcIil9dmFyIGJvZHk9cmVnaXN0ZXJlZENsYXNzLmNvbnN0cnVjdG9yX2JvZHlbYXJndW1lbnRzLmxlbmd0aF07aWYodW5kZWZpbmVkPT09Ym9keSl7dGhyb3cgbmV3IEJpbmRpbmdFcnJvcihgVHJpZWQgdG8gaW52b2tlIGN0b3Igb2YgJHtuYW1lfSB3aXRoIGludmFsaWQgbnVtYmVyIG9mIHBhcmFtZXRlcnMgKCR7YXJndW1lbnRzLmxlbmd0aH0pIC0gZXhwZWN0ZWQgKCR7T2JqZWN0LmtleXMocmVnaXN0ZXJlZENsYXNzLmNvbnN0cnVjdG9yX2JvZHkpLnRvU3RyaW5nKCl9KSBwYXJhbWV0ZXJzIGluc3RlYWQhYCl9cmV0dXJuIGJvZHkuYXBwbHkodGhpcyxhcmd1bWVudHMpfSk7dmFyIGluc3RhbmNlUHJvdG90eXBlPU9iamVjdC5jcmVhdGUoYmFzZVByb3RvdHlwZSx7Y29uc3RydWN0b3I6e3ZhbHVlOmNvbnN0cnVjdG9yfX0pO2NvbnN0cnVjdG9yLnByb3RvdHlwZT1pbnN0YW5jZVByb3RvdHlwZTt2YXIgcmVnaXN0ZXJlZENsYXNzPW5ldyBSZWdpc3RlcmVkQ2xhc3MobmFtZSxjb25zdHJ1Y3RvcixpbnN0YW5jZVByb3RvdHlwZSxyYXdEZXN0cnVjdG9yLGJhc2VDbGFzcyxnZXRBY3R1YWxUeXBlLHVwY2FzdCxkb3duY2FzdCk7aWYocmVnaXN0ZXJlZENsYXNzLmJhc2VDbGFzcyl7aWYocmVnaXN0ZXJlZENsYXNzLmJhc2VDbGFzcy5fX2Rlcml2ZWRDbGFzc2VzPT09dW5kZWZpbmVkKXtyZWdpc3RlcmVkQ2xhc3MuYmFzZUNsYXNzLl9fZGVyaXZlZENsYXNzZXM9W119cmVnaXN0ZXJlZENsYXNzLmJhc2VDbGFzcy5fX2Rlcml2ZWRDbGFzc2VzLnB1c2gocmVnaXN0ZXJlZENsYXNzKX12YXIgcmVmZXJlbmNlQ29udmVydGVyPW5ldyBSZWdpc3RlcmVkUG9pbnRlcihuYW1lLHJlZ2lzdGVyZWRDbGFzcyx0cnVlLGZhbHNlLGZhbHNlKTt2YXIgcG9pbnRlckNvbnZlcnRlcj1uZXcgUmVnaXN0ZXJlZFBvaW50ZXIobmFtZStcIipcIixyZWdpc3RlcmVkQ2xhc3MsZmFsc2UsZmFsc2UsZmFsc2UpO3ZhciBjb25zdFBvaW50ZXJDb252ZXJ0ZXI9bmV3IFJlZ2lzdGVyZWRQb2ludGVyKG5hbWUrXCIgY29uc3QqXCIscmVnaXN0ZXJlZENsYXNzLGZhbHNlLHRydWUsZmFsc2UpO3JlZ2lzdGVyZWRQb2ludGVyc1tyYXdUeXBlXT17cG9pbnRlclR5cGU6cG9pbnRlckNvbnZlcnRlcixjb25zdFBvaW50ZXJUeXBlOmNvbnN0UG9pbnRlckNvbnZlcnRlcn07cmVwbGFjZVB1YmxpY1N5bWJvbChsZWdhbEZ1bmN0aW9uTmFtZSxjb25zdHJ1Y3Rvcik7cmV0dXJuW3JlZmVyZW5jZUNvbnZlcnRlcixwb2ludGVyQ29udmVydGVyLGNvbnN0UG9pbnRlckNvbnZlcnRlcl19KX1mdW5jdGlvbiBydW5EZXN0cnVjdG9ycyhkZXN0cnVjdG9ycyl7d2hpbGUoZGVzdHJ1Y3RvcnMubGVuZ3RoKXt2YXIgcHRyPWRlc3RydWN0b3JzLnBvcCgpO3ZhciBkZWw9ZGVzdHJ1Y3RvcnMucG9wKCk7ZGVsKHB0cil9fWZ1bmN0aW9uIGNyYWZ0SW52b2tlckZ1bmN0aW9uKGh1bWFuTmFtZSxhcmdUeXBlcyxjbGFzc1R5cGUsY3BwSW52b2tlckZ1bmMsY3BwVGFyZ2V0RnVuYyxpc0FzeW5jKXt2YXIgYXJnQ291bnQ9YXJnVHlwZXMubGVuZ3RoO2lmKGFyZ0NvdW50PDIpe3Rocm93QmluZGluZ0Vycm9yKFwiYXJnVHlwZXMgYXJyYXkgc2l6ZSBtaXNtYXRjaCEgTXVzdCBhdCBsZWFzdCBnZXQgcmV0dXJuIHZhbHVlIGFuZCAndGhpcycgdHlwZXMhXCIpfXZhciBpc0NsYXNzTWV0aG9kRnVuYz1hcmdUeXBlc1sxXSE9PW51bGwmJmNsYXNzVHlwZSE9PW51bGw7dmFyIG5lZWRzRGVzdHJ1Y3RvclN0YWNrPWZhbHNlO2Zvcih2YXIgaT0xO2k8YXJnVHlwZXMubGVuZ3RoOysraSl7aWYoYXJnVHlwZXNbaV0hPT1udWxsJiZhcmdUeXBlc1tpXS5kZXN0cnVjdG9yRnVuY3Rpb249PT11bmRlZmluZWQpe25lZWRzRGVzdHJ1Y3RvclN0YWNrPXRydWU7YnJlYWt9fXZhciByZXR1cm5zPWFyZ1R5cGVzWzBdLm5hbWUhPT1cInZvaWRcIjt2YXIgZXhwZWN0ZWRBcmdDb3VudD1hcmdDb3VudC0yO3ZhciBhcmdzV2lyZWQ9bmV3IEFycmF5KGV4cGVjdGVkQXJnQ291bnQpO3ZhciBpbnZva2VyRnVuY0FyZ3M9W107dmFyIGRlc3RydWN0b3JzPVtdO3JldHVybiBmdW5jdGlvbigpe2lmKGFyZ3VtZW50cy5sZW5ndGghPT1leHBlY3RlZEFyZ0NvdW50KXt0aHJvd0JpbmRpbmdFcnJvcihgZnVuY3Rpb24gJHtodW1hbk5hbWV9IGNhbGxlZCB3aXRoICR7YXJndW1lbnRzLmxlbmd0aH0gYXJndW1lbnRzLCBleHBlY3RlZCAke2V4cGVjdGVkQXJnQ291bnR9IGFyZ3MhYCl9ZGVzdHJ1Y3RvcnMubGVuZ3RoPTA7dmFyIHRoaXNXaXJlZDtpbnZva2VyRnVuY0FyZ3MubGVuZ3RoPWlzQ2xhc3NNZXRob2RGdW5jPzI6MTtpbnZva2VyRnVuY0FyZ3NbMF09Y3BwVGFyZ2V0RnVuYztpZihpc0NsYXNzTWV0aG9kRnVuYyl7dGhpc1dpcmVkPWFyZ1R5cGVzWzFdW1widG9XaXJlVHlwZVwiXShkZXN0cnVjdG9ycyx0aGlzKTtpbnZva2VyRnVuY0FyZ3NbMV09dGhpc1dpcmVkfWZvcih2YXIgaT0wO2k8ZXhwZWN0ZWRBcmdDb3VudDsrK2kpe2FyZ3NXaXJlZFtpXT1hcmdUeXBlc1tpKzJdW1widG9XaXJlVHlwZVwiXShkZXN0cnVjdG9ycyxhcmd1bWVudHNbaV0pO2ludm9rZXJGdW5jQXJncy5wdXNoKGFyZ3NXaXJlZFtpXSl9dmFyIHJ2PWNwcEludm9rZXJGdW5jLmFwcGx5KG51bGwsaW52b2tlckZ1bmNBcmdzKTtmdW5jdGlvbiBvbkRvbmUocnYpe2lmKG5lZWRzRGVzdHJ1Y3RvclN0YWNrKXtydW5EZXN0cnVjdG9ycyhkZXN0cnVjdG9ycyl9ZWxzZXtmb3IodmFyIGk9aXNDbGFzc01ldGhvZEZ1bmM/MToyO2k8YXJnVHlwZXMubGVuZ3RoO2krKyl7dmFyIHBhcmFtPWk9PT0xP3RoaXNXaXJlZDphcmdzV2lyZWRbaS0yXTtpZihhcmdUeXBlc1tpXS5kZXN0cnVjdG9yRnVuY3Rpb24hPT1udWxsKXthcmdUeXBlc1tpXS5kZXN0cnVjdG9yRnVuY3Rpb24ocGFyYW0pfX19aWYocmV0dXJucyl7cmV0dXJuIGFyZ1R5cGVzWzBdW1wiZnJvbVdpcmVUeXBlXCJdKHJ2KX19cmV0dXJuIG9uRG9uZShydil9fWZ1bmN0aW9uIGhlYXAzMlZlY3RvclRvQXJyYXkoY291bnQsZmlyc3RFbGVtZW50KXt2YXIgYXJyYXk9W107Zm9yKHZhciBpPTA7aTxjb3VudDtpKyspe2FycmF5LnB1c2goSEVBUFUzMltmaXJzdEVsZW1lbnQraSo0Pj4yXSl9cmV0dXJuIGFycmF5fWZ1bmN0aW9uIF9fZW1iaW5kX3JlZ2lzdGVyX2NsYXNzX2NsYXNzX2Z1bmN0aW9uKHJhd0NsYXNzVHlwZSxtZXRob2ROYW1lLGFyZ0NvdW50LHJhd0FyZ1R5cGVzQWRkcixpbnZva2VyU2lnbmF0dXJlLHJhd0ludm9rZXIsZm4saXNBc3luYyl7dmFyIHJhd0FyZ1R5cGVzPWhlYXAzMlZlY3RvclRvQXJyYXkoYXJnQ291bnQscmF3QXJnVHlwZXNBZGRyKTttZXRob2ROYW1lPXJlYWRMYXRpbjFTdHJpbmcobWV0aG9kTmFtZSk7cmF3SW52b2tlcj1lbWJpbmRfX3JlcXVpcmVGdW5jdGlvbihpbnZva2VyU2lnbmF0dXJlLHJhd0ludm9rZXIpO3doZW5EZXBlbmRlbnRUeXBlc0FyZVJlc29sdmVkKFtdLFtyYXdDbGFzc1R5cGVdLGZ1bmN0aW9uKGNsYXNzVHlwZSl7Y2xhc3NUeXBlPWNsYXNzVHlwZVswXTt2YXIgaHVtYW5OYW1lPWAke2NsYXNzVHlwZS5uYW1lfS4ke21ldGhvZE5hbWV9YDtmdW5jdGlvbiB1bmJvdW5kVHlwZXNIYW5kbGVyKCl7dGhyb3dVbmJvdW5kVHlwZUVycm9yKGBDYW5ub3QgY2FsbCAke2h1bWFuTmFtZX0gZHVlIHRvIHVuYm91bmQgdHlwZXNgLHJhd0FyZ1R5cGVzKX1pZihtZXRob2ROYW1lLnN0YXJ0c1dpdGgoXCJAQFwiKSl7bWV0aG9kTmFtZT1TeW1ib2xbbWV0aG9kTmFtZS5zdWJzdHJpbmcoMildfXZhciBwcm90bz1jbGFzc1R5cGUucmVnaXN0ZXJlZENsYXNzLmNvbnN0cnVjdG9yO2lmKHVuZGVmaW5lZD09PXByb3RvW21ldGhvZE5hbWVdKXt1bmJvdW5kVHlwZXNIYW5kbGVyLmFyZ0NvdW50PWFyZ0NvdW50LTE7cHJvdG9bbWV0aG9kTmFtZV09dW5ib3VuZFR5cGVzSGFuZGxlcn1lbHNle2Vuc3VyZU92ZXJsb2FkVGFibGUocHJvdG8sbWV0aG9kTmFtZSxodW1hbk5hbWUpO3Byb3RvW21ldGhvZE5hbWVdLm92ZXJsb2FkVGFibGVbYXJnQ291bnQtMV09dW5ib3VuZFR5cGVzSGFuZGxlcn13aGVuRGVwZW5kZW50VHlwZXNBcmVSZXNvbHZlZChbXSxyYXdBcmdUeXBlcyxmdW5jdGlvbihhcmdUeXBlcyl7dmFyIGludm9rZXJBcmdzQXJyYXk9W2FyZ1R5cGVzWzBdLG51bGxdLmNvbmNhdChhcmdUeXBlcy5zbGljZSgxKSk7dmFyIGZ1bmM9Y3JhZnRJbnZva2VyRnVuY3Rpb24oaHVtYW5OYW1lLGludm9rZXJBcmdzQXJyYXksbnVsbCxyYXdJbnZva2VyLGZuLGlzQXN5bmMpO2lmKHVuZGVmaW5lZD09PXByb3RvW21ldGhvZE5hbWVdLm92ZXJsb2FkVGFibGUpe2Z1bmMuYXJnQ291bnQ9YXJnQ291bnQtMTtwcm90b1ttZXRob2ROYW1lXT1mdW5jfWVsc2V7cHJvdG9bbWV0aG9kTmFtZV0ub3ZlcmxvYWRUYWJsZVthcmdDb3VudC0xXT1mdW5jfWlmKGNsYXNzVHlwZS5yZWdpc3RlcmVkQ2xhc3MuX19kZXJpdmVkQ2xhc3Nlcyl7Zm9yKGNvbnN0IGRlcml2ZWRDbGFzcyBvZiBjbGFzc1R5cGUucmVnaXN0ZXJlZENsYXNzLl9fZGVyaXZlZENsYXNzZXMpe2lmKCFkZXJpdmVkQ2xhc3MuY29uc3RydWN0b3IuaGFzT3duUHJvcGVydHkobWV0aG9kTmFtZSkpe2Rlcml2ZWRDbGFzcy5jb25zdHJ1Y3RvclttZXRob2ROYW1lXT1mdW5jfX19cmV0dXJuW119KTtyZXR1cm5bXX0pfWZ1bmN0aW9uIHZhbGlkYXRlVGhpcyh0aGlzXyxjbGFzc1R5cGUsaHVtYW5OYW1lKXtpZighKHRoaXNfIGluc3RhbmNlb2YgT2JqZWN0KSl7dGhyb3dCaW5kaW5nRXJyb3IoYCR7aHVtYW5OYW1lfSB3aXRoIGludmFsaWQgXCJ0aGlzXCI6ICR7dGhpc199YCl9aWYoISh0aGlzXyBpbnN0YW5jZW9mIGNsYXNzVHlwZS5yZWdpc3RlcmVkQ2xhc3MuY29uc3RydWN0b3IpKXt0aHJvd0JpbmRpbmdFcnJvcihgJHtodW1hbk5hbWV9IGluY29tcGF0aWJsZSB3aXRoIFwidGhpc1wiIG9mIHR5cGUgJHt0aGlzXy5jb25zdHJ1Y3Rvci5uYW1lfWApfWlmKCF0aGlzXy4kJC5wdHIpe3Rocm93QmluZGluZ0Vycm9yKGBjYW5ub3QgY2FsbCBlbXNjcmlwdGVuIGJpbmRpbmcgbWV0aG9kICR7aHVtYW5OYW1lfSBvbiBkZWxldGVkIG9iamVjdGApfXJldHVybiB1cGNhc3RQb2ludGVyKHRoaXNfLiQkLnB0cix0aGlzXy4kJC5wdHJUeXBlLnJlZ2lzdGVyZWRDbGFzcyxjbGFzc1R5cGUucmVnaXN0ZXJlZENsYXNzKX1mdW5jdGlvbiBfX2VtYmluZF9yZWdpc3Rlcl9jbGFzc19jbGFzc19wcm9wZXJ0eShyYXdDbGFzc1R5cGUsZmllbGROYW1lLHJhd0ZpZWxkVHlwZSxyYXdGaWVsZFB0cixnZXR0ZXJTaWduYXR1cmUsZ2V0dGVyLHNldHRlclNpZ25hdHVyZSxzZXR0ZXIpe2ZpZWxkTmFtZT1yZWFkTGF0aW4xU3RyaW5nKGZpZWxkTmFtZSk7Z2V0dGVyPWVtYmluZF9fcmVxdWlyZUZ1bmN0aW9uKGdldHRlclNpZ25hdHVyZSxnZXR0ZXIpO3doZW5EZXBlbmRlbnRUeXBlc0FyZVJlc29sdmVkKFtdLFtyYXdDbGFzc1R5cGVdLGZ1bmN0aW9uKGNsYXNzVHlwZSl7Y2xhc3NUeXBlPWNsYXNzVHlwZVswXTt2YXIgaHVtYW5OYW1lPWAke2NsYXNzVHlwZS5uYW1lfS4ke2ZpZWxkTmFtZX1gO3ZhciBkZXNjPXtnZXQ6ZnVuY3Rpb24oKXt0aHJvd1VuYm91bmRUeXBlRXJyb3IoYENhbm5vdCBhY2Nlc3MgJHtodW1hbk5hbWV9IGR1ZSB0byB1bmJvdW5kIHR5cGVzYCxbcmF3RmllbGRUeXBlXSl9LGVudW1lcmFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZX07aWYoc2V0dGVyKXtkZXNjLnNldD0oKT0+e3Rocm93VW5ib3VuZFR5cGVFcnJvcihgQ2Fubm90IGFjY2VzcyAke2h1bWFuTmFtZX0gZHVlIHRvIHVuYm91bmQgdHlwZXNgLFtyYXdGaWVsZFR5cGVdKX19ZWxzZXtkZXNjLnNldD12PT57dGhyb3dCaW5kaW5nRXJyb3IoYCR7aHVtYW5OYW1lfSBpcyBhIHJlYWQtb25seSBwcm9wZXJ0eWApfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoY2xhc3NUeXBlLnJlZ2lzdGVyZWRDbGFzcy5jb25zdHJ1Y3RvcixmaWVsZE5hbWUsZGVzYyk7d2hlbkRlcGVuZGVudFR5cGVzQXJlUmVzb2x2ZWQoW10sW3Jhd0ZpZWxkVHlwZV0sZnVuY3Rpb24oZmllbGRUeXBlKXtmaWVsZFR5cGU9ZmllbGRUeXBlWzBdO3ZhciBkZXNjPXtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gZmllbGRUeXBlW1wiZnJvbVdpcmVUeXBlXCJdKGdldHRlcihyYXdGaWVsZFB0cikpfSxlbnVtZXJhYmxlOnRydWV9O2lmKHNldHRlcil7c2V0dGVyPWVtYmluZF9fcmVxdWlyZUZ1bmN0aW9uKHNldHRlclNpZ25hdHVyZSxzZXR0ZXIpO2Rlc2Muc2V0PXY9Pnt2YXIgZGVzdHJ1Y3RvcnM9W107c2V0dGVyKHJhd0ZpZWxkUHRyLGZpZWxkVHlwZVtcInRvV2lyZVR5cGVcIl0oZGVzdHJ1Y3RvcnMsdikpO3J1bkRlc3RydWN0b3JzKGRlc3RydWN0b3JzKX19T2JqZWN0LmRlZmluZVByb3BlcnR5KGNsYXNzVHlwZS5yZWdpc3RlcmVkQ2xhc3MuY29uc3RydWN0b3IsZmllbGROYW1lLGRlc2MpO3JldHVybltdfSk7cmV0dXJuW119KX1mdW5jdGlvbiBfX2VtYmluZF9yZWdpc3Rlcl9jbGFzc19jb25zdHJ1Y3RvcihyYXdDbGFzc1R5cGUsYXJnQ291bnQscmF3QXJnVHlwZXNBZGRyLGludm9rZXJTaWduYXR1cmUsaW52b2tlcixyYXdDb25zdHJ1Y3Rvcil7YXNzZXJ0KGFyZ0NvdW50PjApO3ZhciByYXdBcmdUeXBlcz1oZWFwMzJWZWN0b3JUb0FycmF5KGFyZ0NvdW50LHJhd0FyZ1R5cGVzQWRkcik7aW52b2tlcj1lbWJpbmRfX3JlcXVpcmVGdW5jdGlvbihpbnZva2VyU2lnbmF0dXJlLGludm9rZXIpO3doZW5EZXBlbmRlbnRUeXBlc0FyZVJlc29sdmVkKFtdLFtyYXdDbGFzc1R5cGVdLGZ1bmN0aW9uKGNsYXNzVHlwZSl7Y2xhc3NUeXBlPWNsYXNzVHlwZVswXTt2YXIgaHVtYW5OYW1lPWBjb25zdHJ1Y3RvciAke2NsYXNzVHlwZS5uYW1lfWA7aWYodW5kZWZpbmVkPT09Y2xhc3NUeXBlLnJlZ2lzdGVyZWRDbGFzcy5jb25zdHJ1Y3Rvcl9ib2R5KXtjbGFzc1R5cGUucmVnaXN0ZXJlZENsYXNzLmNvbnN0cnVjdG9yX2JvZHk9W119aWYodW5kZWZpbmVkIT09Y2xhc3NUeXBlLnJlZ2lzdGVyZWRDbGFzcy5jb25zdHJ1Y3Rvcl9ib2R5W2FyZ0NvdW50LTFdKXt0aHJvdyBuZXcgQmluZGluZ0Vycm9yKGBDYW5ub3QgcmVnaXN0ZXIgbXVsdGlwbGUgY29uc3RydWN0b3JzIHdpdGggaWRlbnRpY2FsIG51bWJlciBvZiBwYXJhbWV0ZXJzICgke2FyZ0NvdW50LTF9KSBmb3IgY2xhc3MgJyR7Y2xhc3NUeXBlLm5hbWV9JyEgT3ZlcmxvYWQgcmVzb2x1dGlvbiBpcyBjdXJyZW50bHkgb25seSBwZXJmb3JtZWQgdXNpbmcgdGhlIHBhcmFtZXRlciBjb3VudCwgbm90IGFjdHVhbCB0eXBlIGluZm8hYCl9Y2xhc3NUeXBlLnJlZ2lzdGVyZWRDbGFzcy5jb25zdHJ1Y3Rvcl9ib2R5W2FyZ0NvdW50LTFdPSgpPT57dGhyb3dVbmJvdW5kVHlwZUVycm9yKGBDYW5ub3QgY29uc3RydWN0ICR7Y2xhc3NUeXBlLm5hbWV9IGR1ZSB0byB1bmJvdW5kIHR5cGVzYCxyYXdBcmdUeXBlcyl9O3doZW5EZXBlbmRlbnRUeXBlc0FyZVJlc29sdmVkKFtdLHJhd0FyZ1R5cGVzLGZ1bmN0aW9uKGFyZ1R5cGVzKXthcmdUeXBlcy5zcGxpY2UoMSwwLG51bGwpO2NsYXNzVHlwZS5yZWdpc3RlcmVkQ2xhc3MuY29uc3RydWN0b3JfYm9keVthcmdDb3VudC0xXT1jcmFmdEludm9rZXJGdW5jdGlvbihodW1hbk5hbWUsYXJnVHlwZXMsbnVsbCxpbnZva2VyLHJhd0NvbnN0cnVjdG9yKTtyZXR1cm5bXX0pO3JldHVybltdfSl9ZnVuY3Rpb24gX19lbWJpbmRfcmVnaXN0ZXJfY2xhc3NfZnVuY3Rpb24ocmF3Q2xhc3NUeXBlLG1ldGhvZE5hbWUsYXJnQ291bnQscmF3QXJnVHlwZXNBZGRyLGludm9rZXJTaWduYXR1cmUscmF3SW52b2tlcixjb250ZXh0LGlzUHVyZVZpcnR1YWwsaXNBc3luYyl7dmFyIHJhd0FyZ1R5cGVzPWhlYXAzMlZlY3RvclRvQXJyYXkoYXJnQ291bnQscmF3QXJnVHlwZXNBZGRyKTttZXRob2ROYW1lPXJlYWRMYXRpbjFTdHJpbmcobWV0aG9kTmFtZSk7cmF3SW52b2tlcj1lbWJpbmRfX3JlcXVpcmVGdW5jdGlvbihpbnZva2VyU2lnbmF0dXJlLHJhd0ludm9rZXIpO3doZW5EZXBlbmRlbnRUeXBlc0FyZVJlc29sdmVkKFtdLFtyYXdDbGFzc1R5cGVdLGZ1bmN0aW9uKGNsYXNzVHlwZSl7Y2xhc3NUeXBlPWNsYXNzVHlwZVswXTt2YXIgaHVtYW5OYW1lPWAke2NsYXNzVHlwZS5uYW1lfS4ke21ldGhvZE5hbWV9YDtpZihtZXRob2ROYW1lLnN0YXJ0c1dpdGgoXCJAQFwiKSl7bWV0aG9kTmFtZT1TeW1ib2xbbWV0aG9kTmFtZS5zdWJzdHJpbmcoMildfWlmKGlzUHVyZVZpcnR1YWwpe2NsYXNzVHlwZS5yZWdpc3RlcmVkQ2xhc3MucHVyZVZpcnR1YWxGdW5jdGlvbnMucHVzaChtZXRob2ROYW1lKX1mdW5jdGlvbiB1bmJvdW5kVHlwZXNIYW5kbGVyKCl7dGhyb3dVbmJvdW5kVHlwZUVycm9yKGBDYW5ub3QgY2FsbCAke2h1bWFuTmFtZX0gZHVlIHRvIHVuYm91bmQgdHlwZXNgLHJhd0FyZ1R5cGVzKX12YXIgcHJvdG89Y2xhc3NUeXBlLnJlZ2lzdGVyZWRDbGFzcy5pbnN0YW5jZVByb3RvdHlwZTt2YXIgbWV0aG9kPXByb3RvW21ldGhvZE5hbWVdO2lmKHVuZGVmaW5lZD09PW1ldGhvZHx8dW5kZWZpbmVkPT09bWV0aG9kLm92ZXJsb2FkVGFibGUmJm1ldGhvZC5jbGFzc05hbWUhPT1jbGFzc1R5cGUubmFtZSYmbWV0aG9kLmFyZ0NvdW50PT09YXJnQ291bnQtMil7dW5ib3VuZFR5cGVzSGFuZGxlci5hcmdDb3VudD1hcmdDb3VudC0yO3VuYm91bmRUeXBlc0hhbmRsZXIuY2xhc3NOYW1lPWNsYXNzVHlwZS5uYW1lO3Byb3RvW21ldGhvZE5hbWVdPXVuYm91bmRUeXBlc0hhbmRsZXJ9ZWxzZXtlbnN1cmVPdmVybG9hZFRhYmxlKHByb3RvLG1ldGhvZE5hbWUsaHVtYW5OYW1lKTtwcm90b1ttZXRob2ROYW1lXS5vdmVybG9hZFRhYmxlW2FyZ0NvdW50LTJdPXVuYm91bmRUeXBlc0hhbmRsZXJ9d2hlbkRlcGVuZGVudFR5cGVzQXJlUmVzb2x2ZWQoW10scmF3QXJnVHlwZXMsZnVuY3Rpb24oYXJnVHlwZXMpe3ZhciBtZW1iZXJGdW5jdGlvbj1jcmFmdEludm9rZXJGdW5jdGlvbihodW1hbk5hbWUsYXJnVHlwZXMsY2xhc3NUeXBlLHJhd0ludm9rZXIsY29udGV4dCxpc0FzeW5jKTtpZih1bmRlZmluZWQ9PT1wcm90b1ttZXRob2ROYW1lXS5vdmVybG9hZFRhYmxlKXttZW1iZXJGdW5jdGlvbi5hcmdDb3VudD1hcmdDb3VudC0yO3Byb3RvW21ldGhvZE5hbWVdPW1lbWJlckZ1bmN0aW9ufWVsc2V7cHJvdG9bbWV0aG9kTmFtZV0ub3ZlcmxvYWRUYWJsZVthcmdDb3VudC0yXT1tZW1iZXJGdW5jdGlvbn1yZXR1cm5bXX0pO3JldHVybltdfSl9ZnVuY3Rpb24gX19lbWJpbmRfcmVnaXN0ZXJfY2xhc3NfcHJvcGVydHkoY2xhc3NUeXBlLGZpZWxkTmFtZSxnZXR0ZXJSZXR1cm5UeXBlLGdldHRlclNpZ25hdHVyZSxnZXR0ZXIsZ2V0dGVyQ29udGV4dCxzZXR0ZXJBcmd1bWVudFR5cGUsc2V0dGVyU2lnbmF0dXJlLHNldHRlcixzZXR0ZXJDb250ZXh0KXtmaWVsZE5hbWU9cmVhZExhdGluMVN0cmluZyhmaWVsZE5hbWUpO2dldHRlcj1lbWJpbmRfX3JlcXVpcmVGdW5jdGlvbihnZXR0ZXJTaWduYXR1cmUsZ2V0dGVyKTt3aGVuRGVwZW5kZW50VHlwZXNBcmVSZXNvbHZlZChbXSxbY2xhc3NUeXBlXSxmdW5jdGlvbihjbGFzc1R5cGUpe2NsYXNzVHlwZT1jbGFzc1R5cGVbMF07dmFyIGh1bWFuTmFtZT1gJHtjbGFzc1R5cGUubmFtZX0uJHtmaWVsZE5hbWV9YDt2YXIgZGVzYz17Z2V0OmZ1bmN0aW9uKCl7dGhyb3dVbmJvdW5kVHlwZUVycm9yKGBDYW5ub3QgYWNjZXNzICR7aHVtYW5OYW1lfSBkdWUgdG8gdW5ib3VuZCB0eXBlc2AsW2dldHRlclJldHVyblR5cGUsc2V0dGVyQXJndW1lbnRUeXBlXSl9LGVudW1lcmFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZX07aWYoc2V0dGVyKXtkZXNjLnNldD0oKT0+e3Rocm93VW5ib3VuZFR5cGVFcnJvcihgQ2Fubm90IGFjY2VzcyAke2h1bWFuTmFtZX0gZHVlIHRvIHVuYm91bmQgdHlwZXNgLFtnZXR0ZXJSZXR1cm5UeXBlLHNldHRlckFyZ3VtZW50VHlwZV0pfX1lbHNle2Rlc2Muc2V0PXY9Pnt0aHJvd0JpbmRpbmdFcnJvcihodW1hbk5hbWUrXCIgaXMgYSByZWFkLW9ubHkgcHJvcGVydHlcIil9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShjbGFzc1R5cGUucmVnaXN0ZXJlZENsYXNzLmluc3RhbmNlUHJvdG90eXBlLGZpZWxkTmFtZSxkZXNjKTt3aGVuRGVwZW5kZW50VHlwZXNBcmVSZXNvbHZlZChbXSxzZXR0ZXI/W2dldHRlclJldHVyblR5cGUsc2V0dGVyQXJndW1lbnRUeXBlXTpbZ2V0dGVyUmV0dXJuVHlwZV0sZnVuY3Rpb24odHlwZXMpe3ZhciBnZXR0ZXJSZXR1cm5UeXBlPXR5cGVzWzBdO3ZhciBkZXNjPXtnZXQ6ZnVuY3Rpb24oKXt2YXIgcHRyPXZhbGlkYXRlVGhpcyh0aGlzLGNsYXNzVHlwZSxodW1hbk5hbWUrXCIgZ2V0dGVyXCIpO3JldHVybiBnZXR0ZXJSZXR1cm5UeXBlW1wiZnJvbVdpcmVUeXBlXCJdKGdldHRlcihnZXR0ZXJDb250ZXh0LHB0cikpfSxlbnVtZXJhYmxlOnRydWV9O2lmKHNldHRlcil7c2V0dGVyPWVtYmluZF9fcmVxdWlyZUZ1bmN0aW9uKHNldHRlclNpZ25hdHVyZSxzZXR0ZXIpO3ZhciBzZXR0ZXJBcmd1bWVudFR5cGU9dHlwZXNbMV07ZGVzYy5zZXQ9ZnVuY3Rpb24odil7dmFyIHB0cj12YWxpZGF0ZVRoaXModGhpcyxjbGFzc1R5cGUsaHVtYW5OYW1lK1wiIHNldHRlclwiKTt2YXIgZGVzdHJ1Y3RvcnM9W107c2V0dGVyKHNldHRlckNvbnRleHQscHRyLHNldHRlckFyZ3VtZW50VHlwZVtcInRvV2lyZVR5cGVcIl0oZGVzdHJ1Y3RvcnMsdikpO3J1bkRlc3RydWN0b3JzKGRlc3RydWN0b3JzKX19T2JqZWN0LmRlZmluZVByb3BlcnR5KGNsYXNzVHlwZS5yZWdpc3RlcmVkQ2xhc3MuaW5zdGFuY2VQcm90b3R5cGUsZmllbGROYW1lLGRlc2MpO3JldHVybltdfSk7cmV0dXJuW119KX1mdW5jdGlvbiBIYW5kbGVBbGxvY2F0b3IoKXt0aGlzLmFsbG9jYXRlZD1bdW5kZWZpbmVkXTt0aGlzLmZyZWVsaXN0PVtdO3RoaXMuZ2V0PWZ1bmN0aW9uKGlkKXtyZXR1cm4gdGhpcy5hbGxvY2F0ZWRbaWRdfTt0aGlzLmhhcz1mdW5jdGlvbihpZCl7cmV0dXJuIHRoaXMuYWxsb2NhdGVkW2lkXSE9PXVuZGVmaW5lZH07dGhpcy5hbGxvY2F0ZT1mdW5jdGlvbihoYW5kbGUpe3ZhciBpZD10aGlzLmZyZWVsaXN0LnBvcCgpfHx0aGlzLmFsbG9jYXRlZC5sZW5ndGg7dGhpcy5hbGxvY2F0ZWRbaWRdPWhhbmRsZTtyZXR1cm4gaWR9O3RoaXMuZnJlZT1mdW5jdGlvbihpZCl7dGhpcy5hbGxvY2F0ZWRbaWRdPXVuZGVmaW5lZDt0aGlzLmZyZWVsaXN0LnB1c2goaWQpfX12YXIgZW12YWxfaGFuZGxlcz1uZXcgSGFuZGxlQWxsb2NhdG9yO2Z1bmN0aW9uIF9fZW12YWxfZGVjcmVmKGhhbmRsZSl7aWYoaGFuZGxlPj1lbXZhbF9oYW5kbGVzLnJlc2VydmVkJiYwPT09LS1lbXZhbF9oYW5kbGVzLmdldChoYW5kbGUpLnJlZmNvdW50KXtlbXZhbF9oYW5kbGVzLmZyZWUoaGFuZGxlKX19ZnVuY3Rpb24gY291bnRfZW12YWxfaGFuZGxlcygpe3ZhciBjb3VudD0wO2Zvcih2YXIgaT1lbXZhbF9oYW5kbGVzLnJlc2VydmVkO2k8ZW12YWxfaGFuZGxlcy5hbGxvY2F0ZWQubGVuZ3RoOysraSl7aWYoZW12YWxfaGFuZGxlcy5hbGxvY2F0ZWRbaV0hPT11bmRlZmluZWQpeysrY291bnR9fXJldHVybiBjb3VudH1mdW5jdGlvbiBpbml0X2VtdmFsKCl7ZW12YWxfaGFuZGxlcy5hbGxvY2F0ZWQucHVzaCh7dmFsdWU6dW5kZWZpbmVkfSx7dmFsdWU6bnVsbH0se3ZhbHVlOnRydWV9LHt2YWx1ZTpmYWxzZX0pO2VtdmFsX2hhbmRsZXMucmVzZXJ2ZWQ9ZW12YWxfaGFuZGxlcy5hbGxvY2F0ZWQubGVuZ3RoO01vZHVsZVtcImNvdW50X2VtdmFsX2hhbmRsZXNcIl09Y291bnRfZW12YWxfaGFuZGxlc312YXIgRW12YWw9e3RvVmFsdWU6aGFuZGxlPT57aWYoIWhhbmRsZSl7dGhyb3dCaW5kaW5nRXJyb3IoXCJDYW5ub3QgdXNlIGRlbGV0ZWQgdmFsLiBoYW5kbGUgPSBcIitoYW5kbGUpfXJldHVybiBlbXZhbF9oYW5kbGVzLmdldChoYW5kbGUpLnZhbHVlfSx0b0hhbmRsZTp2YWx1ZT0+e3N3aXRjaCh2YWx1ZSl7Y2FzZSB1bmRlZmluZWQ6cmV0dXJuIDE7Y2FzZSBudWxsOnJldHVybiAyO2Nhc2UgdHJ1ZTpyZXR1cm4gMztjYXNlIGZhbHNlOnJldHVybiA0O2RlZmF1bHQ6e3JldHVybiBlbXZhbF9oYW5kbGVzLmFsbG9jYXRlKHtyZWZjb3VudDoxLHZhbHVlOnZhbHVlfSl9fX19O2Z1bmN0aW9uIF9fZW1iaW5kX3JlZ2lzdGVyX2VtdmFsKHJhd1R5cGUsbmFtZSl7bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO3JlZ2lzdGVyVHlwZShyYXdUeXBlLHtuYW1lOm5hbWUsXCJmcm9tV2lyZVR5cGVcIjpmdW5jdGlvbihoYW5kbGUpe3ZhciBydj1FbXZhbC50b1ZhbHVlKGhhbmRsZSk7X19lbXZhbF9kZWNyZWYoaGFuZGxlKTtyZXR1cm4gcnZ9LFwidG9XaXJlVHlwZVwiOmZ1bmN0aW9uKGRlc3RydWN0b3JzLHZhbHVlKXtyZXR1cm4gRW12YWwudG9IYW5kbGUodmFsdWUpfSxcImFyZ1BhY2tBZHZhbmNlXCI6OCxcInJlYWRWYWx1ZUZyb21Qb2ludGVyXCI6c2ltcGxlUmVhZFZhbHVlRnJvbVBvaW50ZXIsZGVzdHJ1Y3RvckZ1bmN0aW9uOm51bGx9KX1mdW5jdGlvbiBlbnVtUmVhZFZhbHVlRnJvbVBvaW50ZXIobmFtZSxzaGlmdCxzaWduZWQpe3N3aXRjaChzaGlmdCl7Y2FzZSAwOnJldHVybiBmdW5jdGlvbihwb2ludGVyKXt2YXIgaGVhcD1zaWduZWQ/SEVBUDg6SEVBUFU4O3JldHVybiB0aGlzW1wiZnJvbVdpcmVUeXBlXCJdKGhlYXBbcG9pbnRlcl0pfTtjYXNlIDE6cmV0dXJuIGZ1bmN0aW9uKHBvaW50ZXIpe3ZhciBoZWFwPXNpZ25lZD9IRUFQMTY6SEVBUFUxNjtyZXR1cm4gdGhpc1tcImZyb21XaXJlVHlwZVwiXShoZWFwW3BvaW50ZXI+PjFdKX07Y2FzZSAyOnJldHVybiBmdW5jdGlvbihwb2ludGVyKXt2YXIgaGVhcD1zaWduZWQ/SEVBUDMyOkhFQVBVMzI7cmV0dXJuIHRoaXNbXCJmcm9tV2lyZVR5cGVcIl0oaGVhcFtwb2ludGVyPj4yXSl9O2RlZmF1bHQ6dGhyb3cgbmV3IFR5cGVFcnJvcihcIlVua25vd24gaW50ZWdlciB0eXBlOiBcIituYW1lKX19ZnVuY3Rpb24gX19lbWJpbmRfcmVnaXN0ZXJfZW51bShyYXdUeXBlLG5hbWUsc2l6ZSxpc1NpZ25lZCl7dmFyIHNoaWZ0PWdldFNoaWZ0RnJvbVNpemUoc2l6ZSk7bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO2Z1bmN0aW9uIGN0b3IoKXt9Y3Rvci52YWx1ZXM9e307cmVnaXN0ZXJUeXBlKHJhd1R5cGUse25hbWU6bmFtZSxjb25zdHJ1Y3RvcjpjdG9yLFwiZnJvbVdpcmVUeXBlXCI6ZnVuY3Rpb24oYyl7cmV0dXJuIHRoaXMuY29uc3RydWN0b3IudmFsdWVzW2NdfSxcInRvV2lyZVR5cGVcIjpmdW5jdGlvbihkZXN0cnVjdG9ycyxjKXtyZXR1cm4gYy52YWx1ZX0sXCJhcmdQYWNrQWR2YW5jZVwiOjgsXCJyZWFkVmFsdWVGcm9tUG9pbnRlclwiOmVudW1SZWFkVmFsdWVGcm9tUG9pbnRlcihuYW1lLHNoaWZ0LGlzU2lnbmVkKSxkZXN0cnVjdG9yRnVuY3Rpb246bnVsbH0pO2V4cG9zZVB1YmxpY1N5bWJvbChuYW1lLGN0b3IpfWZ1bmN0aW9uIHJlcXVpcmVSZWdpc3RlcmVkVHlwZShyYXdUeXBlLGh1bWFuTmFtZSl7dmFyIGltcGw9cmVnaXN0ZXJlZFR5cGVzW3Jhd1R5cGVdO2lmKHVuZGVmaW5lZD09PWltcGwpe3Rocm93QmluZGluZ0Vycm9yKGh1bWFuTmFtZStcIiBoYXMgdW5rbm93biB0eXBlIFwiK2dldFR5cGVOYW1lKHJhd1R5cGUpKX1yZXR1cm4gaW1wbH1mdW5jdGlvbiBfX2VtYmluZF9yZWdpc3Rlcl9lbnVtX3ZhbHVlKHJhd0VudW1UeXBlLG5hbWUsZW51bVZhbHVlKXt2YXIgZW51bVR5cGU9cmVxdWlyZVJlZ2lzdGVyZWRUeXBlKHJhd0VudW1UeXBlLFwiZW51bVwiKTtuYW1lPXJlYWRMYXRpbjFTdHJpbmcobmFtZSk7dmFyIEVudW09ZW51bVR5cGUuY29uc3RydWN0b3I7dmFyIFZhbHVlPU9iamVjdC5jcmVhdGUoZW51bVR5cGUuY29uc3RydWN0b3IucHJvdG90eXBlLHt2YWx1ZTp7dmFsdWU6ZW51bVZhbHVlfSxjb25zdHJ1Y3Rvcjp7dmFsdWU6Y3JlYXRlTmFtZWRGdW5jdGlvbihgJHtlbnVtVHlwZS5uYW1lfV8ke25hbWV9YCxmdW5jdGlvbigpe30pfX0pO0VudW0udmFsdWVzW2VudW1WYWx1ZV09VmFsdWU7RW51bVtuYW1lXT1WYWx1ZX1mdW5jdGlvbiBlbWJpbmRSZXByKHYpe2lmKHY9PT1udWxsKXtyZXR1cm5cIm51bGxcIn12YXIgdD10eXBlb2YgdjtpZih0PT09XCJvYmplY3RcInx8dD09PVwiYXJyYXlcInx8dD09PVwiZnVuY3Rpb25cIil7cmV0dXJuIHYudG9TdHJpbmcoKX1lbHNle3JldHVyblwiXCIrdn19ZnVuY3Rpb24gZmxvYXRSZWFkVmFsdWVGcm9tUG9pbnRlcihuYW1lLHNoaWZ0KXtzd2l0Y2goc2hpZnQpe2Nhc2UgMjpyZXR1cm4gZnVuY3Rpb24ocG9pbnRlcil7cmV0dXJuIHRoaXNbXCJmcm9tV2lyZVR5cGVcIl0oSEVBUEYzMltwb2ludGVyPj4yXSl9O2Nhc2UgMzpyZXR1cm4gZnVuY3Rpb24ocG9pbnRlcil7cmV0dXJuIHRoaXNbXCJmcm9tV2lyZVR5cGVcIl0oSEVBUEY2NFtwb2ludGVyPj4zXSl9O2RlZmF1bHQ6dGhyb3cgbmV3IFR5cGVFcnJvcihcIlVua25vd24gZmxvYXQgdHlwZTogXCIrbmFtZSl9fWZ1bmN0aW9uIF9fZW1iaW5kX3JlZ2lzdGVyX2Zsb2F0KHJhd1R5cGUsbmFtZSxzaXplKXt2YXIgc2hpZnQ9Z2V0U2hpZnRGcm9tU2l6ZShzaXplKTtuYW1lPXJlYWRMYXRpbjFTdHJpbmcobmFtZSk7cmVnaXN0ZXJUeXBlKHJhd1R5cGUse25hbWU6bmFtZSxcImZyb21XaXJlVHlwZVwiOmZ1bmN0aW9uKHZhbHVlKXtyZXR1cm4gdmFsdWV9LFwidG9XaXJlVHlwZVwiOmZ1bmN0aW9uKGRlc3RydWN0b3JzLHZhbHVlKXtyZXR1cm4gdmFsdWV9LFwiYXJnUGFja0FkdmFuY2VcIjo4LFwicmVhZFZhbHVlRnJvbVBvaW50ZXJcIjpmbG9hdFJlYWRWYWx1ZUZyb21Qb2ludGVyKG5hbWUsc2hpZnQpLGRlc3RydWN0b3JGdW5jdGlvbjpudWxsfSl9ZnVuY3Rpb24gaW50ZWdlclJlYWRWYWx1ZUZyb21Qb2ludGVyKG5hbWUsc2hpZnQsc2lnbmVkKXtzd2l0Y2goc2hpZnQpe2Nhc2UgMDpyZXR1cm4gc2lnbmVkP2Z1bmN0aW9uIHJlYWRTOEZyb21Qb2ludGVyKHBvaW50ZXIpe3JldHVybiBIRUFQOFtwb2ludGVyXX06ZnVuY3Rpb24gcmVhZFU4RnJvbVBvaW50ZXIocG9pbnRlcil7cmV0dXJuIEhFQVBVOFtwb2ludGVyXX07Y2FzZSAxOnJldHVybiBzaWduZWQ/ZnVuY3Rpb24gcmVhZFMxNkZyb21Qb2ludGVyKHBvaW50ZXIpe3JldHVybiBIRUFQMTZbcG9pbnRlcj4+MV19OmZ1bmN0aW9uIHJlYWRVMTZGcm9tUG9pbnRlcihwb2ludGVyKXtyZXR1cm4gSEVBUFUxNltwb2ludGVyPj4xXX07Y2FzZSAyOnJldHVybiBzaWduZWQ/ZnVuY3Rpb24gcmVhZFMzMkZyb21Qb2ludGVyKHBvaW50ZXIpe3JldHVybiBIRUFQMzJbcG9pbnRlcj4+Ml19OmZ1bmN0aW9uIHJlYWRVMzJGcm9tUG9pbnRlcihwb2ludGVyKXtyZXR1cm4gSEVBUFUzMltwb2ludGVyPj4yXX07ZGVmYXVsdDp0aHJvdyBuZXcgVHlwZUVycm9yKFwiVW5rbm93biBpbnRlZ2VyIHR5cGU6IFwiK25hbWUpfX1mdW5jdGlvbiBfX2VtYmluZF9yZWdpc3Rlcl9pbnRlZ2VyKHByaW1pdGl2ZVR5cGUsbmFtZSxzaXplLG1pblJhbmdlLG1heFJhbmdlKXtuYW1lPXJlYWRMYXRpbjFTdHJpbmcobmFtZSk7aWYobWF4UmFuZ2U9PT0tMSl7bWF4UmFuZ2U9NDI5NDk2NzI5NX12YXIgc2hpZnQ9Z2V0U2hpZnRGcm9tU2l6ZShzaXplKTt2YXIgZnJvbVdpcmVUeXBlPXZhbHVlPT52YWx1ZTtpZihtaW5SYW5nZT09PTApe3ZhciBiaXRzaGlmdD0zMi04KnNpemU7ZnJvbVdpcmVUeXBlPXZhbHVlPT52YWx1ZTw8Yml0c2hpZnQ+Pj5iaXRzaGlmdH12YXIgaXNVbnNpZ25lZFR5cGU9bmFtZS5pbmNsdWRlcyhcInVuc2lnbmVkXCIpO3ZhciBjaGVja0Fzc2VydGlvbnM9KHZhbHVlLHRvVHlwZU5hbWUpPT57fTt2YXIgdG9XaXJlVHlwZTtpZihpc1Vuc2lnbmVkVHlwZSl7dG9XaXJlVHlwZT1mdW5jdGlvbihkZXN0cnVjdG9ycyx2YWx1ZSl7Y2hlY2tBc3NlcnRpb25zKHZhbHVlLHRoaXMubmFtZSk7cmV0dXJuIHZhbHVlPj4+MH19ZWxzZXt0b1dpcmVUeXBlPWZ1bmN0aW9uKGRlc3RydWN0b3JzLHZhbHVlKXtjaGVja0Fzc2VydGlvbnModmFsdWUsdGhpcy5uYW1lKTtyZXR1cm4gdmFsdWV9fXJlZ2lzdGVyVHlwZShwcmltaXRpdmVUeXBlLHtuYW1lOm5hbWUsXCJmcm9tV2lyZVR5cGVcIjpmcm9tV2lyZVR5cGUsXCJ0b1dpcmVUeXBlXCI6dG9XaXJlVHlwZSxcImFyZ1BhY2tBZHZhbmNlXCI6OCxcInJlYWRWYWx1ZUZyb21Qb2ludGVyXCI6aW50ZWdlclJlYWRWYWx1ZUZyb21Qb2ludGVyKG5hbWUsc2hpZnQsbWluUmFuZ2UhPT0wKSxkZXN0cnVjdG9yRnVuY3Rpb246bnVsbH0pfWZ1bmN0aW9uIF9fZW1iaW5kX3JlZ2lzdGVyX21lbW9yeV92aWV3KHJhd1R5cGUsZGF0YVR5cGVJbmRleCxuYW1lKXt2YXIgdHlwZU1hcHBpbmc9W0ludDhBcnJheSxVaW50OEFycmF5LEludDE2QXJyYXksVWludDE2QXJyYXksSW50MzJBcnJheSxVaW50MzJBcnJheSxGbG9hdDMyQXJyYXksRmxvYXQ2NEFycmF5XTt2YXIgVEE9dHlwZU1hcHBpbmdbZGF0YVR5cGVJbmRleF07ZnVuY3Rpb24gZGVjb2RlTWVtb3J5VmlldyhoYW5kbGUpe2hhbmRsZT1oYW5kbGU+PjI7dmFyIGhlYXA9SEVBUFUzMjt2YXIgc2l6ZT1oZWFwW2hhbmRsZV07dmFyIGRhdGE9aGVhcFtoYW5kbGUrMV07cmV0dXJuIG5ldyBUQShoZWFwLmJ1ZmZlcixkYXRhLHNpemUpfW5hbWU9cmVhZExhdGluMVN0cmluZyhuYW1lKTtyZWdpc3RlclR5cGUocmF3VHlwZSx7bmFtZTpuYW1lLFwiZnJvbVdpcmVUeXBlXCI6ZGVjb2RlTWVtb3J5VmlldyxcImFyZ1BhY2tBZHZhbmNlXCI6OCxcInJlYWRWYWx1ZUZyb21Qb2ludGVyXCI6ZGVjb2RlTWVtb3J5Vmlld30se2lnbm9yZUR1cGxpY2F0ZVJlZ2lzdHJhdGlvbnM6dHJ1ZX0pfWZ1bmN0aW9uIHN0cmluZ1RvVVRGOEFycmF5KHN0cixoZWFwLG91dElkeCxtYXhCeXRlc1RvV3JpdGUpe2lmKCEobWF4Qnl0ZXNUb1dyaXRlPjApKXJldHVybiAwO3ZhciBzdGFydElkeD1vdXRJZHg7dmFyIGVuZElkeD1vdXRJZHgrbWF4Qnl0ZXNUb1dyaXRlLTE7Zm9yKHZhciBpPTA7aTxzdHIubGVuZ3RoOysraSl7dmFyIHU9c3RyLmNoYXJDb2RlQXQoaSk7aWYodT49NTUyOTYmJnU8PTU3MzQzKXt2YXIgdTE9c3RyLmNoYXJDb2RlQXQoKytpKTt1PTY1NTM2KygodSYxMDIzKTw8MTApfHUxJjEwMjN9aWYodTw9MTI3KXtpZihvdXRJZHg+PWVuZElkeClicmVhaztoZWFwW291dElkeCsrXT11fWVsc2UgaWYodTw9MjA0Nyl7aWYob3V0SWR4KzE+PWVuZElkeClicmVhaztoZWFwW291dElkeCsrXT0xOTJ8dT4+NjtoZWFwW291dElkeCsrXT0xMjh8dSY2M31lbHNlIGlmKHU8PTY1NTM1KXtpZihvdXRJZHgrMj49ZW5kSWR4KWJyZWFrO2hlYXBbb3V0SWR4KytdPTIyNHx1Pj4xMjtoZWFwW291dElkeCsrXT0xMjh8dT4+NiY2MztoZWFwW291dElkeCsrXT0xMjh8dSY2M31lbHNle2lmKG91dElkeCszPj1lbmRJZHgpYnJlYWs7aGVhcFtvdXRJZHgrK109MjQwfHU+PjE4O2hlYXBbb3V0SWR4KytdPTEyOHx1Pj4xMiY2MztoZWFwW291dElkeCsrXT0xMjh8dT4+NiY2MztoZWFwW291dElkeCsrXT0xMjh8dSY2M319aGVhcFtvdXRJZHhdPTA7cmV0dXJuIG91dElkeC1zdGFydElkeH1mdW5jdGlvbiBzdHJpbmdUb1VURjgoc3RyLG91dFB0cixtYXhCeXRlc1RvV3JpdGUpe3JldHVybiBzdHJpbmdUb1VURjhBcnJheShzdHIsSEVBUFU4LG91dFB0cixtYXhCeXRlc1RvV3JpdGUpfWZ1bmN0aW9uIGxlbmd0aEJ5dGVzVVRGOChzdHIpe3ZhciBsZW49MDtmb3IodmFyIGk9MDtpPHN0ci5sZW5ndGg7KytpKXt2YXIgYz1zdHIuY2hhckNvZGVBdChpKTtpZihjPD0xMjcpe2xlbisrfWVsc2UgaWYoYzw9MjA0Nyl7bGVuKz0yfWVsc2UgaWYoYz49NTUyOTYmJmM8PTU3MzQzKXtsZW4rPTQ7KytpfWVsc2V7bGVuKz0zfX1yZXR1cm4gbGVufWZ1bmN0aW9uIF9fZW1iaW5kX3JlZ2lzdGVyX3N0ZF9zdHJpbmcocmF3VHlwZSxuYW1lKXtuYW1lPXJlYWRMYXRpbjFTdHJpbmcobmFtZSk7dmFyIHN0ZFN0cmluZ0lzVVRGOD1uYW1lPT09XCJzdGQ6OnN0cmluZ1wiO3JlZ2lzdGVyVHlwZShyYXdUeXBlLHtuYW1lOm5hbWUsXCJmcm9tV2lyZVR5cGVcIjpmdW5jdGlvbih2YWx1ZSl7dmFyIGxlbmd0aD1IRUFQVTMyW3ZhbHVlPj4yXTt2YXIgcGF5bG9hZD12YWx1ZSs0O3ZhciBzdHI7aWYoc3RkU3RyaW5nSXNVVEY4KXt2YXIgZGVjb2RlU3RhcnRQdHI9cGF5bG9hZDtmb3IodmFyIGk9MDtpPD1sZW5ndGg7KytpKXt2YXIgY3VycmVudEJ5dGVQdHI9cGF5bG9hZCtpO2lmKGk9PWxlbmd0aHx8SEVBUFU4W2N1cnJlbnRCeXRlUHRyXT09MCl7dmFyIG1heFJlYWQ9Y3VycmVudEJ5dGVQdHItZGVjb2RlU3RhcnRQdHI7dmFyIHN0cmluZ1NlZ21lbnQ9VVRGOFRvU3RyaW5nKGRlY29kZVN0YXJ0UHRyLG1heFJlYWQpO2lmKHN0cj09PXVuZGVmaW5lZCl7c3RyPXN0cmluZ1NlZ21lbnR9ZWxzZXtzdHIrPVN0cmluZy5mcm9tQ2hhckNvZGUoMCk7c3RyKz1zdHJpbmdTZWdtZW50fWRlY29kZVN0YXJ0UHRyPWN1cnJlbnRCeXRlUHRyKzF9fX1lbHNle3ZhciBhPW5ldyBBcnJheShsZW5ndGgpO2Zvcih2YXIgaT0wO2k8bGVuZ3RoOysraSl7YVtpXT1TdHJpbmcuZnJvbUNoYXJDb2RlKEhFQVBVOFtwYXlsb2FkK2ldKX1zdHI9YS5qb2luKFwiXCIpfV9mcmVlKHZhbHVlKTtyZXR1cm4gc3RyfSxcInRvV2lyZVR5cGVcIjpmdW5jdGlvbihkZXN0cnVjdG9ycyx2YWx1ZSl7aWYodmFsdWUgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcil7dmFsdWU9bmV3IFVpbnQ4QXJyYXkodmFsdWUpfXZhciBsZW5ndGg7dmFyIHZhbHVlSXNPZlR5cGVTdHJpbmc9dHlwZW9mIHZhbHVlPT1cInN0cmluZ1wiO2lmKCEodmFsdWVJc09mVHlwZVN0cmluZ3x8dmFsdWUgaW5zdGFuY2VvZiBVaW50OEFycmF5fHx2YWx1ZSBpbnN0YW5jZW9mIFVpbnQ4Q2xhbXBlZEFycmF5fHx2YWx1ZSBpbnN0YW5jZW9mIEludDhBcnJheSkpe3Rocm93QmluZGluZ0Vycm9yKFwiQ2Fubm90IHBhc3Mgbm9uLXN0cmluZyB0byBzdGQ6OnN0cmluZ1wiKX1pZihzdGRTdHJpbmdJc1VURjgmJnZhbHVlSXNPZlR5cGVTdHJpbmcpe2xlbmd0aD1sZW5ndGhCeXRlc1VURjgodmFsdWUpfWVsc2V7bGVuZ3RoPXZhbHVlLmxlbmd0aH12YXIgYmFzZT1fbWFsbG9jKDQrbGVuZ3RoKzEpO3ZhciBwdHI9YmFzZSs0O0hFQVBVMzJbYmFzZT4+Ml09bGVuZ3RoO2lmKHN0ZFN0cmluZ0lzVVRGOCYmdmFsdWVJc09mVHlwZVN0cmluZyl7c3RyaW5nVG9VVEY4KHZhbHVlLHB0cixsZW5ndGgrMSl9ZWxzZXtpZih2YWx1ZUlzT2ZUeXBlU3RyaW5nKXtmb3IodmFyIGk9MDtpPGxlbmd0aDsrK2kpe3ZhciBjaGFyQ29kZT12YWx1ZS5jaGFyQ29kZUF0KGkpO2lmKGNoYXJDb2RlPjI1NSl7X2ZyZWUocHRyKTt0aHJvd0JpbmRpbmdFcnJvcihcIlN0cmluZyBoYXMgVVRGLTE2IGNvZGUgdW5pdHMgdGhhdCBkbyBub3QgZml0IGluIDggYml0c1wiKX1IRUFQVThbcHRyK2ldPWNoYXJDb2RlfX1lbHNle2Zvcih2YXIgaT0wO2k8bGVuZ3RoOysraSl7SEVBUFU4W3B0citpXT12YWx1ZVtpXX19fWlmKGRlc3RydWN0b3JzIT09bnVsbCl7ZGVzdHJ1Y3RvcnMucHVzaChfZnJlZSxiYXNlKX1yZXR1cm4gYmFzZX0sXCJhcmdQYWNrQWR2YW5jZVwiOjgsXCJyZWFkVmFsdWVGcm9tUG9pbnRlclwiOnNpbXBsZVJlYWRWYWx1ZUZyb21Qb2ludGVyLGRlc3RydWN0b3JGdW5jdGlvbjpmdW5jdGlvbihwdHIpe19mcmVlKHB0cil9fSl9dmFyIFVURjE2RGVjb2Rlcj10eXBlb2YgVGV4dERlY29kZXIhPVwidW5kZWZpbmVkXCI/bmV3IFRleHREZWNvZGVyKFwidXRmLTE2bGVcIik6dW5kZWZpbmVkO2Z1bmN0aW9uIFVURjE2VG9TdHJpbmcocHRyLG1heEJ5dGVzVG9SZWFkKXt2YXIgZW5kUHRyPXB0cjt2YXIgaWR4PWVuZFB0cj4+MTt2YXIgbWF4SWR4PWlkeCttYXhCeXRlc1RvUmVhZC8yO3doaWxlKCEoaWR4Pj1tYXhJZHgpJiZIRUFQVTE2W2lkeF0pKytpZHg7ZW5kUHRyPWlkeDw8MTtpZihlbmRQdHItcHRyPjMyJiZVVEYxNkRlY29kZXIpcmV0dXJuIFVURjE2RGVjb2Rlci5kZWNvZGUoSEVBUFU4LnN1YmFycmF5KHB0cixlbmRQdHIpKTt2YXIgc3RyPVwiXCI7Zm9yKHZhciBpPTA7IShpPj1tYXhCeXRlc1RvUmVhZC8yKTsrK2kpe3ZhciBjb2RlVW5pdD1IRUFQMTZbcHRyK2kqMj4+MV07aWYoY29kZVVuaXQ9PTApYnJlYWs7c3RyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGVVbml0KX1yZXR1cm4gc3RyfWZ1bmN0aW9uIHN0cmluZ1RvVVRGMTYoc3RyLG91dFB0cixtYXhCeXRlc1RvV3JpdGUpe2lmKG1heEJ5dGVzVG9Xcml0ZT09PXVuZGVmaW5lZCl7bWF4Qnl0ZXNUb1dyaXRlPTIxNDc0ODM2NDd9aWYobWF4Qnl0ZXNUb1dyaXRlPDIpcmV0dXJuIDA7bWF4Qnl0ZXNUb1dyaXRlLT0yO3ZhciBzdGFydFB0cj1vdXRQdHI7dmFyIG51bUNoYXJzVG9Xcml0ZT1tYXhCeXRlc1RvV3JpdGU8c3RyLmxlbmd0aCoyP21heEJ5dGVzVG9Xcml0ZS8yOnN0ci5sZW5ndGg7Zm9yKHZhciBpPTA7aTxudW1DaGFyc1RvV3JpdGU7KytpKXt2YXIgY29kZVVuaXQ9c3RyLmNoYXJDb2RlQXQoaSk7SEVBUDE2W291dFB0cj4+MV09Y29kZVVuaXQ7b3V0UHRyKz0yfUhFQVAxNltvdXRQdHI+PjFdPTA7cmV0dXJuIG91dFB0ci1zdGFydFB0cn1mdW5jdGlvbiBsZW5ndGhCeXRlc1VURjE2KHN0cil7cmV0dXJuIHN0ci5sZW5ndGgqMn1mdW5jdGlvbiBVVEYzMlRvU3RyaW5nKHB0cixtYXhCeXRlc1RvUmVhZCl7dmFyIGk9MDt2YXIgc3RyPVwiXCI7d2hpbGUoIShpPj1tYXhCeXRlc1RvUmVhZC80KSl7dmFyIHV0ZjMyPUhFQVAzMltwdHIraSo0Pj4yXTtpZih1dGYzMj09MClicmVhazsrK2k7aWYodXRmMzI+PTY1NTM2KXt2YXIgY2g9dXRmMzItNjU1MzY7c3RyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1Mjk2fGNoPj4xMCw1NjMyMHxjaCYxMDIzKX1lbHNle3N0cis9U3RyaW5nLmZyb21DaGFyQ29kZSh1dGYzMil9fXJldHVybiBzdHJ9ZnVuY3Rpb24gc3RyaW5nVG9VVEYzMihzdHIsb3V0UHRyLG1heEJ5dGVzVG9Xcml0ZSl7aWYobWF4Qnl0ZXNUb1dyaXRlPT09dW5kZWZpbmVkKXttYXhCeXRlc1RvV3JpdGU9MjE0NzQ4MzY0N31pZihtYXhCeXRlc1RvV3JpdGU8NClyZXR1cm4gMDt2YXIgc3RhcnRQdHI9b3V0UHRyO3ZhciBlbmRQdHI9c3RhcnRQdHIrbWF4Qnl0ZXNUb1dyaXRlLTQ7Zm9yKHZhciBpPTA7aTxzdHIubGVuZ3RoOysraSl7dmFyIGNvZGVVbml0PXN0ci5jaGFyQ29kZUF0KGkpO2lmKGNvZGVVbml0Pj01NTI5NiYmY29kZVVuaXQ8PTU3MzQzKXt2YXIgdHJhaWxTdXJyb2dhdGU9c3RyLmNoYXJDb2RlQXQoKytpKTtjb2RlVW5pdD02NTUzNisoKGNvZGVVbml0JjEwMjMpPDwxMCl8dHJhaWxTdXJyb2dhdGUmMTAyM31IRUFQMzJbb3V0UHRyPj4yXT1jb2RlVW5pdDtvdXRQdHIrPTQ7aWYob3V0UHRyKzQ+ZW5kUHRyKWJyZWFrfUhFQVAzMltvdXRQdHI+PjJdPTA7cmV0dXJuIG91dFB0ci1zdGFydFB0cn1mdW5jdGlvbiBsZW5ndGhCeXRlc1VURjMyKHN0cil7dmFyIGxlbj0wO2Zvcih2YXIgaT0wO2k8c3RyLmxlbmd0aDsrK2kpe3ZhciBjb2RlVW5pdD1zdHIuY2hhckNvZGVBdChpKTtpZihjb2RlVW5pdD49NTUyOTYmJmNvZGVVbml0PD01NzM0MykrK2k7bGVuKz00fXJldHVybiBsZW59ZnVuY3Rpb24gX19lbWJpbmRfcmVnaXN0ZXJfc3RkX3dzdHJpbmcocmF3VHlwZSxjaGFyU2l6ZSxuYW1lKXtuYW1lPXJlYWRMYXRpbjFTdHJpbmcobmFtZSk7dmFyIGRlY29kZVN0cmluZyxlbmNvZGVTdHJpbmcsZ2V0SGVhcCxsZW5ndGhCeXRlc1VURixzaGlmdDtpZihjaGFyU2l6ZT09PTIpe2RlY29kZVN0cmluZz1VVEYxNlRvU3RyaW5nO2VuY29kZVN0cmluZz1zdHJpbmdUb1VURjE2O2xlbmd0aEJ5dGVzVVRGPWxlbmd0aEJ5dGVzVVRGMTY7Z2V0SGVhcD0oKT0+SEVBUFUxNjtzaGlmdD0xfWVsc2UgaWYoY2hhclNpemU9PT00KXtkZWNvZGVTdHJpbmc9VVRGMzJUb1N0cmluZztlbmNvZGVTdHJpbmc9c3RyaW5nVG9VVEYzMjtsZW5ndGhCeXRlc1VURj1sZW5ndGhCeXRlc1VURjMyO2dldEhlYXA9KCk9PkhFQVBVMzI7c2hpZnQ9Mn1yZWdpc3RlclR5cGUocmF3VHlwZSx7bmFtZTpuYW1lLFwiZnJvbVdpcmVUeXBlXCI6ZnVuY3Rpb24odmFsdWUpe3ZhciBsZW5ndGg9SEVBUFUzMlt2YWx1ZT4+Ml07dmFyIEhFQVA9Z2V0SGVhcCgpO3ZhciBzdHI7dmFyIGRlY29kZVN0YXJ0UHRyPXZhbHVlKzQ7Zm9yKHZhciBpPTA7aTw9bGVuZ3RoOysraSl7dmFyIGN1cnJlbnRCeXRlUHRyPXZhbHVlKzQraSpjaGFyU2l6ZTtpZihpPT1sZW5ndGh8fEhFQVBbY3VycmVudEJ5dGVQdHI+PnNoaWZ0XT09MCl7dmFyIG1heFJlYWRCeXRlcz1jdXJyZW50Qnl0ZVB0ci1kZWNvZGVTdGFydFB0cjt2YXIgc3RyaW5nU2VnbWVudD1kZWNvZGVTdHJpbmcoZGVjb2RlU3RhcnRQdHIsbWF4UmVhZEJ5dGVzKTtpZihzdHI9PT11bmRlZmluZWQpe3N0cj1zdHJpbmdTZWdtZW50fWVsc2V7c3RyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKDApO3N0cis9c3RyaW5nU2VnbWVudH1kZWNvZGVTdGFydFB0cj1jdXJyZW50Qnl0ZVB0citjaGFyU2l6ZX19X2ZyZWUodmFsdWUpO3JldHVybiBzdHJ9LFwidG9XaXJlVHlwZVwiOmZ1bmN0aW9uKGRlc3RydWN0b3JzLHZhbHVlKXtpZighKHR5cGVvZiB2YWx1ZT09XCJzdHJpbmdcIikpe3Rocm93QmluZGluZ0Vycm9yKGBDYW5ub3QgcGFzcyBub24tc3RyaW5nIHRvIEMrKyBzdHJpbmcgdHlwZSAke25hbWV9YCl9dmFyIGxlbmd0aD1sZW5ndGhCeXRlc1VURih2YWx1ZSk7dmFyIHB0cj1fbWFsbG9jKDQrbGVuZ3RoK2NoYXJTaXplKTtIRUFQVTMyW3B0cj4+Ml09bGVuZ3RoPj5zaGlmdDtlbmNvZGVTdHJpbmcodmFsdWUscHRyKzQsbGVuZ3RoK2NoYXJTaXplKTtpZihkZXN0cnVjdG9ycyE9PW51bGwpe2Rlc3RydWN0b3JzLnB1c2goX2ZyZWUscHRyKX1yZXR1cm4gcHRyfSxcImFyZ1BhY2tBZHZhbmNlXCI6OCxcInJlYWRWYWx1ZUZyb21Qb2ludGVyXCI6c2ltcGxlUmVhZFZhbHVlRnJvbVBvaW50ZXIsZGVzdHJ1Y3RvckZ1bmN0aW9uOmZ1bmN0aW9uKHB0cil7X2ZyZWUocHRyKX19KX1mdW5jdGlvbiBfX2VtYmluZF9yZWdpc3Rlcl92b2lkKHJhd1R5cGUsbmFtZSl7bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO3JlZ2lzdGVyVHlwZShyYXdUeXBlLHtpc1ZvaWQ6dHJ1ZSxuYW1lOm5hbWUsXCJhcmdQYWNrQWR2YW5jZVwiOjAsXCJmcm9tV2lyZVR5cGVcIjpmdW5jdGlvbigpe3JldHVybiB1bmRlZmluZWR9LFwidG9XaXJlVHlwZVwiOmZ1bmN0aW9uKGRlc3RydWN0b3JzLG8pe3JldHVybiB1bmRlZmluZWR9fSl9ZnVuY3Rpb24gX19lbXZhbF9hcyhoYW5kbGUscmV0dXJuVHlwZSxkZXN0cnVjdG9yc1JlZil7aGFuZGxlPUVtdmFsLnRvVmFsdWUoaGFuZGxlKTtyZXR1cm5UeXBlPXJlcXVpcmVSZWdpc3RlcmVkVHlwZShyZXR1cm5UeXBlLFwiZW12YWw6OmFzXCIpO3ZhciBkZXN0cnVjdG9ycz1bXTt2YXIgcmQ9RW12YWwudG9IYW5kbGUoZGVzdHJ1Y3RvcnMpO0hFQVBVMzJbZGVzdHJ1Y3RvcnNSZWY+PjJdPXJkO3JldHVybiByZXR1cm5UeXBlW1widG9XaXJlVHlwZVwiXShkZXN0cnVjdG9ycyxoYW5kbGUpfWZ1bmN0aW9uIF9fZW12YWxfaW5jcmVmKGhhbmRsZSl7aWYoaGFuZGxlPjQpe2VtdmFsX2hhbmRsZXMuZ2V0KGhhbmRsZSkucmVmY291bnQrPTF9fWZ1bmN0aW9uIF9fZW12YWxfcnVuX2Rlc3RydWN0b3JzKGhhbmRsZSl7dmFyIGRlc3RydWN0b3JzPUVtdmFsLnRvVmFsdWUoaGFuZGxlKTtydW5EZXN0cnVjdG9ycyhkZXN0cnVjdG9ycyk7X19lbXZhbF9kZWNyZWYoaGFuZGxlKX1mdW5jdGlvbiBfX2VtdmFsX3Rha2VfdmFsdWUodHlwZSxhcmcpe3R5cGU9cmVxdWlyZVJlZ2lzdGVyZWRUeXBlKHR5cGUsXCJfZW12YWxfdGFrZV92YWx1ZVwiKTt2YXIgdj10eXBlW1wicmVhZFZhbHVlRnJvbVBvaW50ZXJcIl0oYXJnKTtyZXR1cm4gRW12YWwudG9IYW5kbGUodil9ZnVuY3Rpb24gX2Fib3J0KCl7YWJvcnQoXCJcIil9ZnVuY3Rpb24gX2Vtc2NyaXB0ZW5fbWVtY3B5X2JpZyhkZXN0LHNyYyxudW0pe0hFQVBVOC5jb3B5V2l0aGluKGRlc3Qsc3JjLHNyYytudW0pfWZ1bmN0aW9uIGdldEhlYXBNYXgoKXtyZXR1cm4gMjE0NzQ4MzY0OH1mdW5jdGlvbiBlbXNjcmlwdGVuX3JlYWxsb2NfYnVmZmVyKHNpemUpe3ZhciBiPXdhc21NZW1vcnkuYnVmZmVyO3ZhciBwYWdlcz1zaXplLWIuYnl0ZUxlbmd0aCs2NTUzNT4+PjE2O3RyeXt3YXNtTWVtb3J5Lmdyb3cocGFnZXMpO3VwZGF0ZU1lbW9yeVZpZXdzKCk7cmV0dXJuIDF9Y2F0Y2goZSl7fX1mdW5jdGlvbiBfZW1zY3JpcHRlbl9yZXNpemVfaGVhcChyZXF1ZXN0ZWRTaXplKXt2YXIgb2xkU2l6ZT1IRUFQVTgubGVuZ3RoO3JlcXVlc3RlZFNpemU9cmVxdWVzdGVkU2l6ZT4+PjA7dmFyIG1heEhlYXBTaXplPWdldEhlYXBNYXgoKTtpZihyZXF1ZXN0ZWRTaXplPm1heEhlYXBTaXplKXtyZXR1cm4gZmFsc2V9dmFyIGFsaWduVXA9KHgsbXVsdGlwbGUpPT54KyhtdWx0aXBsZS14JW11bHRpcGxlKSVtdWx0aXBsZTtmb3IodmFyIGN1dERvd249MTtjdXREb3duPD00O2N1dERvd24qPTIpe3ZhciBvdmVyR3Jvd25IZWFwU2l6ZT1vbGRTaXplKigxKy4yL2N1dERvd24pO292ZXJHcm93bkhlYXBTaXplPU1hdGgubWluKG92ZXJHcm93bkhlYXBTaXplLHJlcXVlc3RlZFNpemUrMTAwNjYzMjk2KTt2YXIgbmV3U2l6ZT1NYXRoLm1pbihtYXhIZWFwU2l6ZSxhbGlnblVwKE1hdGgubWF4KHJlcXVlc3RlZFNpemUsb3Zlckdyb3duSGVhcFNpemUpLDY1NTM2KSk7dmFyIHJlcGxhY2VtZW50PWVtc2NyaXB0ZW5fcmVhbGxvY19idWZmZXIobmV3U2l6ZSk7aWYocmVwbGFjZW1lbnQpe3JldHVybiB0cnVlfX1yZXR1cm4gZmFsc2V9ZnVuY3Rpb24gX2ZkX2Nsb3NlKGZkKXtyZXR1cm4gNTJ9ZnVuY3Rpb24gX2ZkX3JlYWQoZmQsaW92LGlvdmNudCxwbnVtKXtyZXR1cm4gNTJ9ZnVuY3Rpb24gX2ZkX3NlZWsoZmQsb2Zmc2V0X2xvdyxvZmZzZXRfaGlnaCx3aGVuY2UsbmV3T2Zmc2V0KXtyZXR1cm4gNzB9dmFyIHByaW50Q2hhckJ1ZmZlcnM9W251bGwsW10sW11dO2Z1bmN0aW9uIHByaW50Q2hhcihzdHJlYW0sY3Vycil7dmFyIGJ1ZmZlcj1wcmludENoYXJCdWZmZXJzW3N0cmVhbV07aWYoY3Vycj09PTB8fGN1cnI9PT0xMCl7KHN0cmVhbT09PTE/b3V0OmVycikoVVRGOEFycmF5VG9TdHJpbmcoYnVmZmVyLDApKTtidWZmZXIubGVuZ3RoPTB9ZWxzZXtidWZmZXIucHVzaChjdXJyKX19ZnVuY3Rpb24gX2ZkX3dyaXRlKGZkLGlvdixpb3ZjbnQscG51bSl7dmFyIG51bT0wO2Zvcih2YXIgaT0wO2k8aW92Y250O2krKyl7dmFyIHB0cj1IRUFQVTMyW2lvdj4+Ml07dmFyIGxlbj1IRUFQVTMyW2lvdis0Pj4yXTtpb3YrPTg7Zm9yKHZhciBqPTA7ajxsZW47aisrKXtwcmludENoYXIoZmQsSEVBUFU4W3B0citqXSl9bnVtKz1sZW59SEVBUFUzMltwbnVtPj4yXT1udW07cmV0dXJuIDB9ZnVuY3Rpb24gX3NwaW5lTGlzdGVuZXJDYWxsQmFja0Zyb21KUygpe3ZhciB3YXNtVXRpbD1Nb2R1bGVbXCJTcGluZVdhc21VdGlsXCJdO3ZhciBsaXN0ZW5lcklEPXdhc21VdGlsLmdldEN1cnJlbnRMaXN0ZW5lcklEKCk7dmFyIHRyYWNrRW50cnk9d2FzbVV0aWwuZ2V0Q3VycmVudFRyYWNrRW50cnkoKTt2YXIgZXZlbnQ9d2FzbVV0aWwuZ2V0Q3VycmVudEV2ZW50KCk7dmFyIGV2ZW50VHlwZT13YXNtVXRpbC5nZXRDdXJyZW50RXZlbnRUeXBlKCk7Z2xvYmFsVGhpcy5UcmFja0VudHJ5TGlzdGVuZXJzLmVtaXRMaXN0ZW5lcihsaXN0ZW5lcklELHRyYWNrRW50cnksZXZlbnQsZXZlbnRUeXBlLnZhbHVlKX1mdW5jdGlvbiBfc3BpbmVUcmFja0xpc3RlbmVyQ2FsbGJhY2soKXt2YXIgd2FzbVV0aWw9TW9kdWxlW1wiU3BpbmVXYXNtVXRpbFwiXTt2YXIgbGlzdGVuZXJJRD13YXNtVXRpbC5nZXRDdXJyZW50TGlzdGVuZXJJRCgpO3ZhciBldmVudFR5cGU9d2FzbVV0aWwuZ2V0Q3VycmVudEV2ZW50VHlwZSgpO3ZhciB0cmFja0VudHJ5PXdhc21VdGlsLmdldEN1cnJlbnRUcmFja0VudHJ5KCk7dmFyIGV2ZW50PXdhc21VdGlsLmdldEN1cnJlbnRFdmVudCgpO2dsb2JhbFRoaXMuVHJhY2tFbnRyeUxpc3RlbmVycy5lbWl0VHJhY2tFbnRyeUxpc3RlbmVyKGxpc3RlbmVySUQsdHJhY2tFbnRyeSxldmVudCxldmVudFR5cGUudmFsdWUpfWVtYmluZF9pbml0X2NoYXJDb2RlcygpO0JpbmRpbmdFcnJvcj1Nb2R1bGVbXCJCaW5kaW5nRXJyb3JcIl09ZXh0ZW5kRXJyb3IoRXJyb3IsXCJCaW5kaW5nRXJyb3JcIik7SW50ZXJuYWxFcnJvcj1Nb2R1bGVbXCJJbnRlcm5hbEVycm9yXCJdPWV4dGVuZEVycm9yKEVycm9yLFwiSW50ZXJuYWxFcnJvclwiKTtpbml0X0NsYXNzSGFuZGxlKCk7aW5pdF9lbWJpbmQoKTtpbml0X1JlZ2lzdGVyZWRQb2ludGVyKCk7VW5ib3VuZFR5cGVFcnJvcj1Nb2R1bGVbXCJVbmJvdW5kVHlwZUVycm9yXCJdPWV4dGVuZEVycm9yKEVycm9yLFwiVW5ib3VuZFR5cGVFcnJvclwiKTtpbml0X2VtdmFsKCk7dmFyIHdhc21JbXBvcnRzPXtcIm9cIjpfX19zeXNjYWxsX2ZjbnRsNjQsXCJ4XCI6X19fc3lzY2FsbF9pb2N0bCxcInlcIjpfX19zeXNjYWxsX29wZW5hdCxcInRcIjpfX2VtYmluZF9yZWdpc3Rlcl9iaWdpbnQsXCJDXCI6X19lbWJpbmRfcmVnaXN0ZXJfYm9vbCxcImJcIjpfX2VtYmluZF9yZWdpc3Rlcl9jbGFzcyxcImZcIjpfX2VtYmluZF9yZWdpc3Rlcl9jbGFzc19jbGFzc19mdW5jdGlvbixcImpcIjpfX2VtYmluZF9yZWdpc3Rlcl9jbGFzc19jbGFzc19wcm9wZXJ0eSxcImNcIjpfX2VtYmluZF9yZWdpc3Rlcl9jbGFzc19jb25zdHJ1Y3RvcixcImFcIjpfX2VtYmluZF9yZWdpc3Rlcl9jbGFzc19mdW5jdGlvbixcImVcIjpfX2VtYmluZF9yZWdpc3Rlcl9jbGFzc19wcm9wZXJ0eSxcIkFcIjpfX2VtYmluZF9yZWdpc3Rlcl9lbXZhbCxcImtcIjpfX2VtYmluZF9yZWdpc3Rlcl9lbnVtLFwiZFwiOl9fZW1iaW5kX3JlZ2lzdGVyX2VudW1fdmFsdWUsXCJwXCI6X19lbWJpbmRfcmVnaXN0ZXJfZmxvYXQsXCJsXCI6X19lbWJpbmRfcmVnaXN0ZXJfaW50ZWdlcixcImlcIjpfX2VtYmluZF9yZWdpc3Rlcl9tZW1vcnlfdmlldyxcInFcIjpfX2VtYmluZF9yZWdpc3Rlcl9zdGRfc3RyaW5nLFwibVwiOl9fZW1iaW5kX3JlZ2lzdGVyX3N0ZF93c3RyaW5nLFwiRFwiOl9fZW1iaW5kX3JlZ2lzdGVyX3ZvaWQsXCJGXCI6X19lbXZhbF9hcyxcInJcIjpfX2VtdmFsX2RlY3JlZixcIkdcIjpfX2VtdmFsX2luY3JlZixcIkVcIjpfX2VtdmFsX3J1bl9kZXN0cnVjdG9ycyxcImhcIjpfX2VtdmFsX3Rha2VfdmFsdWUsXCJnXCI6X2Fib3J0LFwielwiOl9lbXNjcmlwdGVuX21lbWNweV9iaWcsXCJ1XCI6X2Vtc2NyaXB0ZW5fcmVzaXplX2hlYXAsXCJuXCI6X2ZkX2Nsb3NlLFwid1wiOl9mZF9yZWFkLFwic1wiOl9mZF9zZWVrLFwidlwiOl9mZF93cml0ZSxcIkhcIjpfc3BpbmVMaXN0ZW5lckNhbGxCYWNrRnJvbUpTLFwiQlwiOl9zcGluZVRyYWNrTGlzdGVuZXJDYWxsYmFja307dmFyIGFzbT1jcmVhdGVXYXNtKCk7dmFyIF9fX3dhc21fY2FsbF9jdG9ycz1mdW5jdGlvbigpe3JldHVybihfX193YXNtX2NhbGxfY3RvcnM9TW9kdWxlW1wiYXNtXCJdW1wiSlwiXSkuYXBwbHkobnVsbCxhcmd1bWVudHMpfTt2YXIgX21hbGxvYz1mdW5jdGlvbigpe3JldHVybihfbWFsbG9jPU1vZHVsZVtcImFzbVwiXVtcIkxcIl0pLmFwcGx5KG51bGwsYXJndW1lbnRzKX07dmFyIF9mcmVlPWZ1bmN0aW9uKCl7cmV0dXJuKF9mcmVlPU1vZHVsZVtcImFzbVwiXVtcIk1cIl0pLmFwcGx5KG51bGwsYXJndW1lbnRzKX07dmFyIF9fX2dldFR5cGVOYW1lPWZ1bmN0aW9uKCl7cmV0dXJuKF9fX2dldFR5cGVOYW1lPU1vZHVsZVtcImFzbVwiXVtcIk5cIl0pLmFwcGx5KG51bGwsYXJndW1lbnRzKX07dmFyIF9fZW1iaW5kX2luaXRpYWxpemVfYmluZGluZ3M9TW9kdWxlW1wiX19lbWJpbmRfaW5pdGlhbGl6ZV9iaW5kaW5nc1wiXT1mdW5jdGlvbigpe3JldHVybihfX2VtYmluZF9pbml0aWFsaXplX2JpbmRpbmdzPU1vZHVsZVtcIl9fZW1iaW5kX2luaXRpYWxpemVfYmluZGluZ3NcIl09TW9kdWxlW1wiYXNtXCJdW1wiT1wiXSkuYXBwbHkobnVsbCxhcmd1bWVudHMpfTt2YXIgX19fZXJybm9fbG9jYXRpb249ZnVuY3Rpb24oKXtyZXR1cm4oX19fZXJybm9fbG9jYXRpb249TW9kdWxlW1wiYXNtXCJdW1wiX19lcnJub19sb2NhdGlvblwiXSkuYXBwbHkobnVsbCxhcmd1bWVudHMpfTt2YXIgZHluQ2FsbF9qaWppPU1vZHVsZVtcImR5bkNhbGxfamlqaVwiXT1mdW5jdGlvbigpe3JldHVybihkeW5DYWxsX2ppamk9TW9kdWxlW1wiZHluQ2FsbF9qaWppXCJdPU1vZHVsZVtcImFzbVwiXVtcIlBcIl0pLmFwcGx5KG51bGwsYXJndW1lbnRzKX07dmFyIGNhbGxlZFJ1bjtkZXBlbmRlbmNpZXNGdWxmaWxsZWQ9ZnVuY3Rpb24gcnVuQ2FsbGVyKCl7aWYoIWNhbGxlZFJ1bilydW4oKTtpZighY2FsbGVkUnVuKWRlcGVuZGVuY2llc0Z1bGZpbGxlZD1ydW5DYWxsZXJ9O2Z1bmN0aW9uIHJ1bigpe2lmKHJ1bkRlcGVuZGVuY2llcz4wKXtyZXR1cm59cHJlUnVuKCk7aWYocnVuRGVwZW5kZW5jaWVzPjApe3JldHVybn1mdW5jdGlvbiBkb1J1bigpe2lmKGNhbGxlZFJ1bilyZXR1cm47Y2FsbGVkUnVuPXRydWU7TW9kdWxlW1wiY2FsbGVkUnVuXCJdPXRydWU7aWYoQUJPUlQpcmV0dXJuO2luaXRSdW50aW1lKCk7cmVhZHlQcm9taXNlUmVzb2x2ZShNb2R1bGUpO2lmKE1vZHVsZVtcIm9uUnVudGltZUluaXRpYWxpemVkXCJdKU1vZHVsZVtcIm9uUnVudGltZUluaXRpYWxpemVkXCJdKCk7cG9zdFJ1bigpfWlmKE1vZHVsZVtcInNldFN0YXR1c1wiXSl7TW9kdWxlW1wic2V0U3RhdHVzXCJdKFwiUnVubmluZy4uLlwiKTtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7c2V0VGltZW91dChmdW5jdGlvbigpe01vZHVsZVtcInNldFN0YXR1c1wiXShcIlwiKX0sMSk7ZG9SdW4oKX0sMSl9ZWxzZXtkb1J1bigpfX1pZihNb2R1bGVbXCJwcmVJbml0XCJdKXtpZih0eXBlb2YgTW9kdWxlW1wicHJlSW5pdFwiXT09XCJmdW5jdGlvblwiKU1vZHVsZVtcInByZUluaXRcIl09W01vZHVsZVtcInByZUluaXRcIl1dO3doaWxlKE1vZHVsZVtcInByZUluaXRcIl0ubGVuZ3RoPjApe01vZHVsZVtcInByZUluaXRcIl0ucG9wKCkoKX19cnVuKCk7XG5cblxuICByZXR1cm4gc3BpbmVXYXNtLnJlYWR5XG59XG5cbik7XG59KSgpO1xuZXhwb3J0IGRlZmF1bHQgc3BpbmVXYXNtOyJdLCJuYW1lcyI6WyJzcGluZVdhc20iLCJfc2NyaXB0RGlyIiwiZG9jdW1lbnQiLCJjdXJyZW50U2NyaXB0Iiwic3JjIiwidW5kZWZpbmVkIiwiTW9kdWxlIiwicmVhZHlQcm9taXNlUmVzb2x2ZSIsInJlYWR5UHJvbWlzZVJlamVjdCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibW9kdWxlT3ZlcnJpZGVzIiwiT2JqZWN0IiwiYXNzaWduIiwiRU5WSVJPTk1FTlRfSVNfV0VCIiwic2NyaXB0RGlyZWN0b3J5IiwibG9jYXRlRmlsZSIsInBhdGgiLCJyZWFkQmluYXJ5IiwiaW5kZXhPZiIsInN1YnN0ciIsInJlcGxhY2UiLCJsYXN0SW5kZXhPZiIsIm91dCIsImNvbnNvbGUiLCJsb2ciLCJiaW5kIiwiZXJyIiwiZXJyb3IiLCJ3YXNtQmluYXJ5IiwiV2ViQXNzZW1ibHkiLCJhYm9ydCIsIndhc21NZW1vcnkiLCJBQk9SVCIsImFzc2VydCIsImNvbmRpdGlvbiIsInRleHQiLCJIRUFQOCIsIkhFQVBVOCIsIkhFQVAxNiIsIkhFQVBVMTYiLCJIRUFQMzIiLCJIRUFQVTMyIiwiSEVBUEYzMiIsIkhFQVBGNjQiLCJ1cGRhdGVNZW1vcnlWaWV3cyIsImIiLCJidWZmZXIiLCJJbnQ4QXJyYXkiLCJJbnQxNkFycmF5IiwiSW50MzJBcnJheSIsIlVpbnQ4QXJyYXkiLCJVaW50MTZBcnJheSIsIlVpbnQzMkFycmF5IiwiRmxvYXQzMkFycmF5IiwiRmxvYXQ2NEFycmF5Iiwid2FzbVRhYmxlIiwiX19BVFBSRVJVTl9fIiwiX19BVElOSVRfXyIsIl9fQVRQT1NUUlVOX18iLCJwcmVSdW4iLCJsZW5ndGgiLCJhZGRPblByZVJ1biIsInNoaWZ0IiwiY2FsbFJ1bnRpbWVDYWxsYmFja3MiLCJpbml0UnVudGltZSIsInBvc3RSdW4iLCJhZGRPblBvc3RSdW4iLCJjYiIsInVuc2hpZnQiLCJhZGRPbkluaXQiLCJydW5EZXBlbmRlbmNpZXMiLCJkZXBlbmRlbmNpZXNGdWxmaWxsZWQiLCJhZGRSdW5EZXBlbmRlbmN5IiwiaWQiLCJyZW1vdmVSdW5EZXBlbmRlbmN5IiwiY2FsbGJhY2siLCJ3aGF0IiwiZSIsIlJ1bnRpbWVFcnJvciIsImRhdGFVUklQcmVmaXgiLCJpc0RhdGFVUkkiLCJmaWxlbmFtZSIsInN0YXJ0c1dpdGgiLCJ3YXNtQmluYXJ5RmlsZSIsImdldEJpbmFyeSIsImZpbGUiLCJnZXRCaW5hcnlQcm9taXNlIiwiYmluYXJ5RmlsZSIsImZldGNoIiwiY3JlZGVudGlhbHMiLCJ0aGVuIiwicmVzcG9uc2UiLCJpbnN0YW50aWF0ZUFycmF5QnVmZmVyIiwiaW1wb3J0cyIsInJlY2VpdmVyIiwiYmluYXJ5IiwiaW5zdGFudGlhdGUiLCJpbnN0YW5jZSIsInJlYXNvbiIsImluc3RhbnRpYXRlQXN5bmMiLCJpbnN0YW50aWF0ZVN0cmVhbWluZyIsInJlc3VsdCIsImNyZWF0ZVdhc20iLCJpbmZvIiwid2FzbUltcG9ydHMiLCJyZWNlaXZlSW5zdGFuY2UiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVjZWl2ZUluc3RhbnRpYXRpb25SZXN1bHQiLCJjYWxsYmFja3MiLCJVVEY4RGVjb2RlciIsIlRleHREZWNvZGVyIiwiVVRGOEFycmF5VG9TdHJpbmciLCJoZWFwT3JBcnJheSIsImlkeCIsIm1heEJ5dGVzVG9SZWFkIiwiZW5kSWR4IiwiZW5kUHRyIiwiZGVjb2RlIiwic3ViYXJyYXkiLCJzdHIiLCJ1MCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsInUxIiwidTIiLCJjaCIsIlVURjhUb1N0cmluZyIsInB0ciIsIl9fX3N5c2NhbGxfZmNudGw2NCIsImZkIiwiY21kIiwidmFyYXJncyIsIl9fX3N5c2NhbGxfaW9jdGwiLCJvcCIsIl9fX3N5c2NhbGxfb3BlbmF0IiwiZGlyZmQiLCJmbGFncyIsIl9fZW1iaW5kX3JlZ2lzdGVyX2JpZ2ludCIsInByaW1pdGl2ZVR5cGUiLCJuYW1lIiwic2l6ZSIsIm1pblJhbmdlIiwibWF4UmFuZ2UiLCJnZXRTaGlmdEZyb21TaXplIiwiVHlwZUVycm9yIiwiZW1iaW5kX2luaXRfY2hhckNvZGVzIiwiY29kZXMiLCJBcnJheSIsImkiLCJlbWJpbmRfY2hhckNvZGVzIiwicmVhZExhdGluMVN0cmluZyIsInJldCIsImMiLCJhd2FpdGluZ0RlcGVuZGVuY2llcyIsInJlZ2lzdGVyZWRUeXBlcyIsInR5cGVEZXBlbmRlbmNpZXMiLCJjaGFyXzAiLCJjaGFyXzkiLCJtYWtlTGVnYWxGdW5jdGlvbk5hbWUiLCJmIiwiY2hhckNvZGVBdCIsImNyZWF0ZU5hbWVkRnVuY3Rpb24iLCJib2R5IiwiX25hbWUkbmFtZSIsImFwcGx5IiwiYXJndW1lbnRzIiwiZXh0ZW5kRXJyb3IiLCJiYXNlRXJyb3JUeXBlIiwiZXJyb3JOYW1lIiwiZXJyb3JDbGFzcyIsIm1lc3NhZ2UiLCJzdGFjayIsIkVycm9yIiwidG9TdHJpbmciLCJwcm90b3R5cGUiLCJjcmVhdGUiLCJjb25zdHJ1Y3RvciIsIkJpbmRpbmdFcnJvciIsInRocm93QmluZGluZ0Vycm9yIiwiSW50ZXJuYWxFcnJvciIsInRocm93SW50ZXJuYWxFcnJvciIsIndoZW5EZXBlbmRlbnRUeXBlc0FyZVJlc29sdmVkIiwibXlUeXBlcyIsImRlcGVuZGVudFR5cGVzIiwiZ2V0VHlwZUNvbnZlcnRlcnMiLCJmb3JFYWNoIiwidHlwZSIsIm9uQ29tcGxldGUiLCJ0eXBlQ29udmVydGVycyIsIm15VHlwZUNvbnZlcnRlcnMiLCJyZWdpc3RlclR5cGUiLCJ1bnJlZ2lzdGVyZWRUeXBlcyIsInJlZ2lzdGVyZWQiLCJkdCIsImhhc093blByb3BlcnR5IiwicHVzaCIsInJhd1R5cGUiLCJyZWdpc3RlcmVkSW5zdGFuY2UiLCJvcHRpb25zIiwiaWdub3JlRHVwbGljYXRlUmVnaXN0cmF0aW9ucyIsIl9fZW1iaW5kX3JlZ2lzdGVyX2Jvb2wiLCJ0cnVlVmFsdWUiLCJmYWxzZVZhbHVlIiwiZnJvbVdpcmVUeXBlIiwid3QiLCJ0b1dpcmVUeXBlIiwiZGVzdHJ1Y3RvcnMiLCJvIiwicmVhZFZhbHVlRnJvbVBvaW50ZXIiLCJwb2ludGVyIiwiaGVhcCIsImRlc3RydWN0b3JGdW5jdGlvbiIsIkNsYXNzSGFuZGxlX2lzQWxpYXNPZiIsIm90aGVyIiwiQ2xhc3NIYW5kbGUiLCJsZWZ0Q2xhc3MiLCIkJCIsInB0clR5cGUiLCJyZWdpc3RlcmVkQ2xhc3MiLCJsZWZ0IiwicmlnaHRDbGFzcyIsInJpZ2h0IiwiYmFzZUNsYXNzIiwidXBjYXN0Iiwic2hhbGxvd0NvcHlJbnRlcm5hbFBvaW50ZXIiLCJjb3VudCIsImRlbGV0ZVNjaGVkdWxlZCIsInByZXNlcnZlUG9pbnRlck9uRGVsZXRlIiwic21hcnRQdHIiLCJzbWFydFB0clR5cGUiLCJ0aHJvd0luc3RhbmNlQWxyZWFkeURlbGV0ZWQiLCJvYmoiLCJnZXRJbnN0YW5jZVR5cGVOYW1lIiwiaGFuZGxlIiwiZmluYWxpemF0aW9uUmVnaXN0cnkiLCJkZXRhY2hGaW5hbGl6ZXIiLCJydW5EZXN0cnVjdG9yIiwicmF3RGVzdHJ1Y3RvciIsInJlbGVhc2VDbGFzc0hhbmRsZSIsInZhbHVlIiwidG9EZWxldGUiLCJkb3duY2FzdFBvaW50ZXIiLCJwdHJDbGFzcyIsImRlc2lyZWRDbGFzcyIsInJ2IiwiZG93bmNhc3QiLCJyZWdpc3RlcmVkUG9pbnRlcnMiLCJnZXRJbmhlcml0ZWRJbnN0YW5jZUNvdW50Iiwia2V5cyIsInJlZ2lzdGVyZWRJbnN0YW5jZXMiLCJnZXRMaXZlSW5oZXJpdGVkSW5zdGFuY2VzIiwiayIsImRlbGV0aW9uUXVldWUiLCJmbHVzaFBlbmRpbmdEZWxldGVzIiwicG9wIiwiZGVsYXlGdW5jdGlvbiIsInNldERlbGF5RnVuY3Rpb24iLCJmbiIsImluaXRfZW1iaW5kIiwiZ2V0QmFzZXN0UG9pbnRlciIsImNsYXNzXyIsImdldEluaGVyaXRlZEluc3RhbmNlIiwibWFrZUNsYXNzSGFuZGxlIiwicmVjb3JkIiwiaGFzU21hcnRQdHJUeXBlIiwiaGFzU21hcnRQdHIiLCJhdHRhY2hGaW5hbGl6ZXIiLCJSZWdpc3RlcmVkUG9pbnRlcl9mcm9tV2lyZVR5cGUiLCJyYXdQb2ludGVyIiwiZ2V0UG9pbnRlZSIsImRlc3RydWN0b3IiLCJtYWtlRGVmYXVsdEhhbmRsZSIsImlzU21hcnRQb2ludGVyIiwiaW5zdGFuY2VQcm90b3R5cGUiLCJwb2ludGVlVHlwZSIsImFjdHVhbFR5cGUiLCJnZXRBY3R1YWxUeXBlIiwicmVnaXN0ZXJlZFBvaW50ZXJSZWNvcmQiLCJjYWxsIiwidG9UeXBlIiwiaXNDb25zdCIsImNvbnN0UG9pbnRlclR5cGUiLCJwb2ludGVyVHlwZSIsImRwIiwiRmluYWxpemF0aW9uUmVnaXN0cnkiLCJyZWdpc3RlciIsInVucmVnaXN0ZXIiLCJDbGFzc0hhbmRsZV9jbG9uZSIsImNsb25lIiwiZ2V0UHJvdG90eXBlT2YiLCJDbGFzc0hhbmRsZV9kZWxldGUiLCJDbGFzc0hhbmRsZV9pc0RlbGV0ZWQiLCJDbGFzc0hhbmRsZV9kZWxldGVMYXRlciIsImluaXRfQ2xhc3NIYW5kbGUiLCJlbnN1cmVPdmVybG9hZFRhYmxlIiwicHJvdG8iLCJtZXRob2ROYW1lIiwiaHVtYW5OYW1lIiwib3ZlcmxvYWRUYWJsZSIsInByZXZGdW5jIiwiYXJnQ291bnQiLCJleHBvc2VQdWJsaWNTeW1ib2wiLCJudW1Bcmd1bWVudHMiLCJSZWdpc3RlcmVkQ2xhc3MiLCJwdXJlVmlydHVhbEZ1bmN0aW9ucyIsInVwY2FzdFBvaW50ZXIiLCJjb25zdE5vU21hcnRQdHJSYXdQb2ludGVyVG9XaXJlVHlwZSIsImlzUmVmZXJlbmNlIiwiZW1iaW5kUmVwciIsImhhbmRsZUNsYXNzIiwiZ2VuZXJpY1BvaW50ZXJUb1dpcmVUeXBlIiwicmF3Q29uc3RydWN0b3IiLCJzaGFyaW5nUG9saWN5IiwiY2xvbmVkSGFuZGxlIiwicmF3U2hhcmUiLCJFbXZhbCIsInRvSGFuZGxlIiwibm9uQ29uc3ROb1NtYXJ0UHRyUmF3UG9pbnRlclRvV2lyZVR5cGUiLCJzaW1wbGVSZWFkVmFsdWVGcm9tUG9pbnRlciIsIlJlZ2lzdGVyZWRQb2ludGVyX2dldFBvaW50ZWUiLCJyYXdHZXRQb2ludGVlIiwiUmVnaXN0ZXJlZFBvaW50ZXJfZGVzdHJ1Y3RvciIsIlJlZ2lzdGVyZWRQb2ludGVyX2RlbGV0ZU9iamVjdCIsImluaXRfUmVnaXN0ZXJlZFBvaW50ZXIiLCJSZWdpc3RlcmVkUG9pbnRlciIsInJlcGxhY2VQdWJsaWNTeW1ib2wiLCJkeW5DYWxsTGVnYWN5Iiwic2lnIiwiYXJncyIsImNvbmNhdCIsIndhc21UYWJsZU1pcnJvciIsImdldFdhc21UYWJsZUVudHJ5IiwiZnVuY1B0ciIsImZ1bmMiLCJnZXQiLCJkeW5DYWxsIiwiaW5jbHVkZXMiLCJydG4iLCJnZXREeW5DYWxsZXIiLCJhcmdDYWNoZSIsImVtYmluZF9fcmVxdWlyZUZ1bmN0aW9uIiwic2lnbmF0dXJlIiwicmF3RnVuY3Rpb24iLCJtYWtlRHluQ2FsbGVyIiwiZnAiLCJVbmJvdW5kVHlwZUVycm9yIiwiZ2V0VHlwZU5hbWUiLCJfX19nZXRUeXBlTmFtZSIsIl9mcmVlIiwidGhyb3dVbmJvdW5kVHlwZUVycm9yIiwidHlwZXMiLCJ1bmJvdW5kVHlwZXMiLCJzZWVuIiwidmlzaXQiLCJtYXAiLCJqb2luIiwiX19lbWJpbmRfcmVnaXN0ZXJfY2xhc3MiLCJyYXdQb2ludGVyVHlwZSIsInJhd0NvbnN0UG9pbnRlclR5cGUiLCJiYXNlQ2xhc3NSYXdUeXBlIiwiZ2V0QWN0dWFsVHlwZVNpZ25hdHVyZSIsInVwY2FzdFNpZ25hdHVyZSIsImRvd25jYXN0U2lnbmF0dXJlIiwiZGVzdHJ1Y3RvclNpZ25hdHVyZSIsImxlZ2FsRnVuY3Rpb25OYW1lIiwiYmFzZSIsImJhc2VQcm90b3R5cGUiLCJjb25zdHJ1Y3Rvcl9ib2R5IiwiX19kZXJpdmVkQ2xhc3NlcyIsInJlZmVyZW5jZUNvbnZlcnRlciIsInBvaW50ZXJDb252ZXJ0ZXIiLCJjb25zdFBvaW50ZXJDb252ZXJ0ZXIiLCJydW5EZXN0cnVjdG9ycyIsImRlbCIsImNyYWZ0SW52b2tlckZ1bmN0aW9uIiwiYXJnVHlwZXMiLCJjbGFzc1R5cGUiLCJjcHBJbnZva2VyRnVuYyIsImNwcFRhcmdldEZ1bmMiLCJpc0FzeW5jIiwiaXNDbGFzc01ldGhvZEZ1bmMiLCJuZWVkc0Rlc3RydWN0b3JTdGFjayIsInJldHVybnMiLCJleHBlY3RlZEFyZ0NvdW50IiwiYXJnc1dpcmVkIiwiaW52b2tlckZ1bmNBcmdzIiwidGhpc1dpcmVkIiwib25Eb25lIiwicGFyYW0iLCJoZWFwMzJWZWN0b3JUb0FycmF5IiwiZmlyc3RFbGVtZW50IiwiYXJyYXkiLCJfX2VtYmluZF9yZWdpc3Rlcl9jbGFzc19jbGFzc19mdW5jdGlvbiIsInJhd0NsYXNzVHlwZSIsInJhd0FyZ1R5cGVzQWRkciIsImludm9rZXJTaWduYXR1cmUiLCJyYXdJbnZva2VyIiwicmF3QXJnVHlwZXMiLCJ1bmJvdW5kVHlwZXNIYW5kbGVyIiwiU3ltYm9sIiwic3Vic3RyaW5nIiwiaW52b2tlckFyZ3NBcnJheSIsInNsaWNlIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZSIsIl9zdGVwIiwiZG9uZSIsImRlcml2ZWRDbGFzcyIsInZhbGlkYXRlVGhpcyIsInRoaXNfIiwiX19lbWJpbmRfcmVnaXN0ZXJfY2xhc3NfY2xhc3NfcHJvcGVydHkiLCJmaWVsZE5hbWUiLCJyYXdGaWVsZFR5cGUiLCJyYXdGaWVsZFB0ciIsImdldHRlclNpZ25hdHVyZSIsImdldHRlciIsInNldHRlclNpZ25hdHVyZSIsInNldHRlciIsImRlc2MiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwic2V0IiwidiIsImRlZmluZVByb3BlcnR5IiwiZmllbGRUeXBlIiwiX19lbWJpbmRfcmVnaXN0ZXJfY2xhc3NfY29uc3RydWN0b3IiLCJpbnZva2VyIiwic3BsaWNlIiwiX19lbWJpbmRfcmVnaXN0ZXJfY2xhc3NfZnVuY3Rpb24iLCJjb250ZXh0IiwiaXNQdXJlVmlydHVhbCIsIm1ldGhvZCIsImNsYXNzTmFtZSIsIm1lbWJlckZ1bmN0aW9uIiwiX19lbWJpbmRfcmVnaXN0ZXJfY2xhc3NfcHJvcGVydHkiLCJnZXR0ZXJSZXR1cm5UeXBlIiwiZ2V0dGVyQ29udGV4dCIsInNldHRlckFyZ3VtZW50VHlwZSIsInNldHRlckNvbnRleHQiLCJIYW5kbGVBbGxvY2F0b3IiLCJhbGxvY2F0ZWQiLCJmcmVlbGlzdCIsImhhcyIsImFsbG9jYXRlIiwiZnJlZSIsImVtdmFsX2hhbmRsZXMiLCJfX2VtdmFsX2RlY3JlZiIsInJlc2VydmVkIiwicmVmY291bnQiLCJjb3VudF9lbXZhbF9oYW5kbGVzIiwiaW5pdF9lbXZhbCIsInRvVmFsdWUiLCJfX2VtYmluZF9yZWdpc3Rlcl9lbXZhbCIsImVudW1SZWFkVmFsdWVGcm9tUG9pbnRlciIsInNpZ25lZCIsIl9fZW1iaW5kX3JlZ2lzdGVyX2VudW0iLCJpc1NpZ25lZCIsImN0b3IiLCJ2YWx1ZXMiLCJyZXF1aXJlUmVnaXN0ZXJlZFR5cGUiLCJpbXBsIiwiX19lbWJpbmRfcmVnaXN0ZXJfZW51bV92YWx1ZSIsInJhd0VudW1UeXBlIiwiZW51bVZhbHVlIiwiZW51bVR5cGUiLCJFbnVtIiwiVmFsdWUiLCJ0IiwiZmxvYXRSZWFkVmFsdWVGcm9tUG9pbnRlciIsIl9fZW1iaW5kX3JlZ2lzdGVyX2Zsb2F0IiwiaW50ZWdlclJlYWRWYWx1ZUZyb21Qb2ludGVyIiwicmVhZFM4RnJvbVBvaW50ZXIiLCJyZWFkVThGcm9tUG9pbnRlciIsInJlYWRTMTZGcm9tUG9pbnRlciIsInJlYWRVMTZGcm9tUG9pbnRlciIsInJlYWRTMzJGcm9tUG9pbnRlciIsInJlYWRVMzJGcm9tUG9pbnRlciIsIl9fZW1iaW5kX3JlZ2lzdGVyX2ludGVnZXIiLCJiaXRzaGlmdCIsImlzVW5zaWduZWRUeXBlIiwiY2hlY2tBc3NlcnRpb25zIiwidG9UeXBlTmFtZSIsIl9fZW1iaW5kX3JlZ2lzdGVyX21lbW9yeV92aWV3IiwiZGF0YVR5cGVJbmRleCIsInR5cGVNYXBwaW5nIiwiVEEiLCJkZWNvZGVNZW1vcnlWaWV3IiwiZGF0YSIsInN0cmluZ1RvVVRGOEFycmF5Iiwib3V0SWR4IiwibWF4Qnl0ZXNUb1dyaXRlIiwic3RhcnRJZHgiLCJ1Iiwic3RyaW5nVG9VVEY4Iiwib3V0UHRyIiwibGVuZ3RoQnl0ZXNVVEY4IiwibGVuIiwiX19lbWJpbmRfcmVnaXN0ZXJfc3RkX3N0cmluZyIsInN0ZFN0cmluZ0lzVVRGOCIsInBheWxvYWQiLCJkZWNvZGVTdGFydFB0ciIsImN1cnJlbnRCeXRlUHRyIiwibWF4UmVhZCIsInN0cmluZ1NlZ21lbnQiLCJhIiwiQXJyYXlCdWZmZXIiLCJ2YWx1ZUlzT2ZUeXBlU3RyaW5nIiwiVWludDhDbGFtcGVkQXJyYXkiLCJfbWFsbG9jIiwiY2hhckNvZGUiLCJVVEYxNkRlY29kZXIiLCJVVEYxNlRvU3RyaW5nIiwibWF4SWR4IiwiY29kZVVuaXQiLCJzdHJpbmdUb1VURjE2Iiwic3RhcnRQdHIiLCJudW1DaGFyc1RvV3JpdGUiLCJsZW5ndGhCeXRlc1VURjE2IiwiVVRGMzJUb1N0cmluZyIsInV0ZjMyIiwic3RyaW5nVG9VVEYzMiIsInRyYWlsU3Vycm9nYXRlIiwibGVuZ3RoQnl0ZXNVVEYzMiIsIl9fZW1iaW5kX3JlZ2lzdGVyX3N0ZF93c3RyaW5nIiwiY2hhclNpemUiLCJkZWNvZGVTdHJpbmciLCJlbmNvZGVTdHJpbmciLCJnZXRIZWFwIiwibGVuZ3RoQnl0ZXNVVEYiLCJIRUFQIiwibWF4UmVhZEJ5dGVzIiwiX19lbWJpbmRfcmVnaXN0ZXJfdm9pZCIsImlzVm9pZCIsIl9fZW12YWxfYXMiLCJyZXR1cm5UeXBlIiwiZGVzdHJ1Y3RvcnNSZWYiLCJyZCIsIl9fZW12YWxfaW5jcmVmIiwiX19lbXZhbF9ydW5fZGVzdHJ1Y3RvcnMiLCJfX2VtdmFsX3Rha2VfdmFsdWUiLCJhcmciLCJfYWJvcnQiLCJfZW1zY3JpcHRlbl9tZW1jcHlfYmlnIiwiZGVzdCIsIm51bSIsImNvcHlXaXRoaW4iLCJnZXRIZWFwTWF4IiwiZW1zY3JpcHRlbl9yZWFsbG9jX2J1ZmZlciIsInBhZ2VzIiwiYnl0ZUxlbmd0aCIsImdyb3ciLCJfZW1zY3JpcHRlbl9yZXNpemVfaGVhcCIsInJlcXVlc3RlZFNpemUiLCJvbGRTaXplIiwibWF4SGVhcFNpemUiLCJhbGlnblVwIiwieCIsIm11bHRpcGxlIiwiY3V0RG93biIsIm92ZXJHcm93bkhlYXBTaXplIiwiTWF0aCIsIm1pbiIsIm5ld1NpemUiLCJtYXgiLCJyZXBsYWNlbWVudCIsIl9mZF9jbG9zZSIsIl9mZF9yZWFkIiwiaW92IiwiaW92Y250IiwicG51bSIsIl9mZF9zZWVrIiwib2Zmc2V0X2xvdyIsIm9mZnNldF9oaWdoIiwid2hlbmNlIiwibmV3T2Zmc2V0IiwicHJpbnRDaGFyQnVmZmVycyIsInByaW50Q2hhciIsInN0cmVhbSIsImN1cnIiLCJfZmRfd3JpdGUiLCJqIiwiX3NwaW5lTGlzdGVuZXJDYWxsQmFja0Zyb21KUyIsIndhc21VdGlsIiwibGlzdGVuZXJJRCIsImdldEN1cnJlbnRMaXN0ZW5lcklEIiwidHJhY2tFbnRyeSIsImdldEN1cnJlbnRUcmFja0VudHJ5IiwiZXZlbnQiLCJnZXRDdXJyZW50RXZlbnQiLCJldmVudFR5cGUiLCJnZXRDdXJyZW50RXZlbnRUeXBlIiwiZ2xvYmFsVGhpcyIsIlRyYWNrRW50cnlMaXN0ZW5lcnMiLCJlbWl0TGlzdGVuZXIiLCJfc3BpbmVUcmFja0xpc3RlbmVyQ2FsbGJhY2siLCJlbWl0VHJhY2tFbnRyeUxpc3RlbmVyIiwiY2FsbGVkUnVuIiwicnVuQ2FsbGVyIiwicnVuIiwiZG9SdW4iLCJzZXRUaW1lb3V0IiwicmVhZHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNJQSxVQUFBQSxTQUFTLHNCQUFJLFlBQU07TUFDckIsRUFBQSxJQUFJQyxVQUFVLEdBQUcsT0FBT0MsUUFBUSxLQUFLLFdBQVcsSUFBSUEsUUFBUSxDQUFDQyxhQUFhLEdBQUdELFFBQVEsQ0FBQ0MsYUFBYSxDQUFDQyxHQUFHLEdBQUdDLFNBQVMsQ0FBQTtRQUVuSCxPQUNGLFVBQVNMLFNBQVMsRUFBUTtNQUFBLElBQUEsSUFBakJBLFNBQVMsS0FBQSxLQUFBLENBQUEsRUFBQTtZQUFUQSxTQUFTLEdBQUcsRUFBRSxDQUFBO01BQUEsS0FBQTtVQUV2QixJQUFJTSxNQUFNLEdBQUMsT0FBT04sU0FBUyxJQUFFLFdBQVcsR0FBQ0EsU0FBUyxHQUFDLEVBQUUsQ0FBQTtVQUFDLElBQUlPLG1CQUFtQixFQUFDQyxrQkFBa0IsQ0FBQTtVQUFDRixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUMsSUFBSUcsT0FBTyxDQUFDLFVBQUNDLE9BQU8sRUFBQ0MsTUFBTSxFQUFHO01BQUNKLE1BQUFBLG1CQUFtQixHQUFDRyxPQUFPLENBQUE7TUFBQ0YsTUFBQUEsa0JBQWtCLEdBQUNHLE1BQU0sQ0FBQTtNQUFBLEtBQUMsQ0FBQyxDQUFBO1VBQUMsSUFBSUMsZUFBZSxHQUFDQyxNQUFNLENBQUNDLE1BQU0sQ0FBQyxFQUFFLEVBQUNSLE1BQU0sQ0FBQyxDQUFBO1VBQWdHLElBQUlTLGtCQUFrQixHQUFDLElBQUksQ0FBQTtVQUFpQyxJQUFJQyxlQUFlLEdBQUMsRUFBRSxDQUFBO1VBQUMsU0FBU0MsVUFBVUEsQ0FBQ0MsSUFBSSxFQUFDO01BQUMsTUFBQSxJQUFHWixNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUM7Y0FBQyxPQUFPQSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUNZLElBQUksRUFBQ0YsZUFBZSxDQUFDLENBQUE7TUFBQSxPQUFBO1lBQUMsT0FBT0EsZUFBZSxHQUFDRSxJQUFJLENBQUE7TUFBQSxLQUFBO01BQUMsSUFBQSxJQUFvQkMsVUFBVSxDQUFlO1VBQThDO01BQUMsTUFBa0UsSUFBRyxPQUFPakIsUUFBUSxJQUFFLFdBQVcsSUFBRUEsUUFBUSxDQUFDQyxhQUFhLEVBQUM7TUFBQ2EsUUFBQUEsZUFBZSxHQUFDZCxRQUFRLENBQUNDLGFBQWEsQ0FBQ0MsR0FBRyxDQUFBO01BQUEsT0FBQTtNQUFDLE1BQUEsSUFBR0gsVUFBVSxFQUFDO01BQUNlLFFBQUFBLGVBQWUsR0FBQ2YsVUFBVSxDQUFBO01BQUEsT0FBQTtZQUFDLElBQUdlLGVBQWUsQ0FBQ0ksT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFHLENBQUMsRUFBQztjQUFDSixlQUFlLEdBQUNBLGVBQWUsQ0FBQ0ssTUFBTSxDQUFDLENBQUMsRUFBQ0wsZUFBZSxDQUFDTSxPQUFPLENBQUMsUUFBUSxFQUFDLEVBQUUsQ0FBQyxDQUFDQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUE7TUFBQSxPQUFDLE1BQUk7TUFBQ1AsUUFBQUEsZUFBZSxHQUFDLEVBQUUsQ0FBQTtNQUFBLE9BQUE7TUFBd2tCLEtBQU07TUFBQyxJQUFBLElBQUlRLEdBQUcsR0FBQ2xCLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBRW1CLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxJQUFJLENBQUNGLE9BQU8sQ0FBQyxDQUFBO01BQUMsSUFBQSxJQUFJRyxHQUFHLEdBQUN0QixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUVtQixPQUFPLENBQUNJLEtBQUssQ0FBQ0YsSUFBSSxDQUFDRixPQUFPLENBQUMsQ0FBQTtNQUFDWixJQUFBQSxNQUFNLENBQUNDLE1BQU0sQ0FBQ1IsTUFBTSxFQUFDTSxlQUFlLENBQUMsQ0FBQTtNQUFDQSxJQUFBQSxlQUFlLEdBQUMsSUFBSSxDQUFBO1VBQUMsSUFBR04sTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFZQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7VUFBQyxJQUFHQSxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQWFBLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQTtVQUFDLElBQUdBLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBT0EsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO01BQUMsSUFBQSxJQUFJd0IsVUFBVSxDQUFBO1VBQUMsSUFBR3hCLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBQ3dCLFVBQVUsR0FBQ3hCLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtNQUFDLElBQWtCQSxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUUsS0FBSTtNQUFDLElBQUEsSUFBRyxPQUFPeUIsV0FBVyxJQUFFLFFBQVEsRUFBQztZQUFDQyxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQTtNQUFBLEtBQUE7TUFBQyxJQUFBLElBQUlDLFVBQVUsQ0FBQTtVQUFDLElBQUlDLEtBQUssR0FBQyxLQUFLLENBQUE7TUFBZ0IsSUFBQSxTQUFTQyxNQUFNQSxDQUFDQyxTQUFTLEVBQUNDLElBQUksRUFBQztZQUFDLElBQUcsQ0FBQ0QsU0FBUyxFQUFDO2NBQUNKLEtBQUssQ0FBQ0ssSUFBSSxDQUFDLENBQUE7TUFBQSxPQUFBO01BQUMsS0FBQTtNQUFDLElBQUEsSUFBSUMsS0FBSyxFQUFDQyxNQUFNLEVBQUNDLE1BQU0sRUFBQ0MsT0FBTyxFQUFDQyxNQUFNLEVBQUNDLE9BQU8sRUFBQ0MsT0FBTyxFQUFDQyxPQUFPLENBQUE7VUFBQyxTQUFTQyxpQkFBaUJBLEdBQUU7TUFBQyxNQUFBLElBQUlDLENBQUMsR0FBQ2QsVUFBVSxDQUFDZSxNQUFNLENBQUE7WUFBQzFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBQ2dDLEtBQUssR0FBQyxJQUFJVyxTQUFTLENBQUNGLENBQUMsQ0FBQyxDQUFBO1lBQUN6QyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUNrQyxNQUFNLEdBQUMsSUFBSVUsVUFBVSxDQUFDSCxDQUFDLENBQUMsQ0FBQTtZQUFDekMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFDb0MsTUFBTSxHQUFDLElBQUlTLFVBQVUsQ0FBQ0osQ0FBQyxDQUFDLENBQUE7WUFBQ3pDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBQ2lDLE1BQU0sR0FBQyxJQUFJYSxVQUFVLENBQUNMLENBQUMsQ0FBQyxDQUFBO1lBQUN6QyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUNtQyxPQUFPLEdBQUMsSUFBSVksV0FBVyxDQUFDTixDQUFDLENBQUMsQ0FBQTtZQUFDekMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFDcUMsT0FBTyxHQUFDLElBQUlXLFdBQVcsQ0FBQ1AsQ0FBQyxDQUFDLENBQUE7WUFBQ3pDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBQ3NDLE9BQU8sR0FBQyxJQUFJVyxZQUFZLENBQUNSLENBQUMsQ0FBQyxDQUFBO1lBQUN6QyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUN1QyxPQUFPLEdBQUMsSUFBSVcsWUFBWSxDQUFDVCxDQUFDLENBQUMsQ0FBQTtNQUFBLEtBQUE7TUFBQyxJQUFBLElBQUlVLFNBQVMsQ0FBQTtVQUFDLElBQUlDLFlBQVksR0FBQyxFQUFFLENBQUE7VUFBQyxJQUFJQyxVQUFVLEdBQUMsRUFBRSxDQUFBO1VBQUMsSUFBSUMsYUFBYSxHQUFDLEVBQUUsQ0FBQTtVQUE4QixTQUFTQyxNQUFNQSxHQUFFO01BQUMsTUFBQSxJQUFHdkQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFDO01BQUMsUUFBQSxJQUFHLE9BQU9BLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBRSxVQUFVLEVBQUNBLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBQyxDQUFDQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtNQUFDLFFBQUEsT0FBTUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDd0QsTUFBTSxFQUFDO2dCQUFDQyxXQUFXLENBQUN6RCxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMwRCxLQUFLLEVBQUUsQ0FBQyxDQUFBO01BQUEsU0FBQTtNQUFDLE9BQUE7WUFBQ0Msb0JBQW9CLENBQUNQLFlBQVksQ0FBQyxDQUFBO01BQUEsS0FBQTtVQUFDLFNBQVNRLFdBQVdBLEdBQUU7WUFBeUJELG9CQUFvQixDQUFDTixVQUFVLENBQUMsQ0FBQTtNQUFBLEtBQUE7VUFBQyxTQUFTUSxPQUFPQSxHQUFFO01BQUMsTUFBQSxJQUFHN0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFDO01BQUMsUUFBQSxJQUFHLE9BQU9BLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBRSxVQUFVLEVBQUNBLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBQyxDQUFDQSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtNQUFDLFFBQUEsT0FBTUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDd0QsTUFBTSxFQUFDO2dCQUFDTSxZQUFZLENBQUM5RCxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMwRCxLQUFLLEVBQUUsQ0FBQyxDQUFBO01BQUEsU0FBQTtNQUFDLE9BQUE7WUFBQ0Msb0JBQW9CLENBQUNMLGFBQWEsQ0FBQyxDQUFBO01BQUEsS0FBQTtVQUFDLFNBQVNHLFdBQVdBLENBQUNNLEVBQUUsRUFBQztNQUFDWCxNQUFBQSxZQUFZLENBQUNZLE9BQU8sQ0FBQ0QsRUFBRSxDQUFDLENBQUE7TUFBQSxLQUFBO1VBQUMsU0FBU0UsU0FBU0EsQ0FBQ0YsRUFBRSxFQUFDO01BQUNWLE1BQUFBLFVBQVUsQ0FBQ1csT0FBTyxDQUFDRCxFQUFFLENBQUMsQ0FBQTtNQUFBLEtBQUE7VUFBQyxTQUFTRCxZQUFZQSxDQUFDQyxFQUFFLEVBQUM7TUFBQ1QsTUFBQUEsYUFBYSxDQUFDVSxPQUFPLENBQUNELEVBQUUsQ0FBQyxDQUFBO01BQUEsS0FBQTtVQUFDLElBQUlHLGVBQWUsR0FBQyxDQUFDLENBQUE7VUFBK0IsSUFBSUMscUJBQXFCLEdBQUMsSUFBSSxDQUFBO1VBQUMsU0FBU0MsZ0JBQWdCQSxDQUFDQyxFQUFFLEVBQUM7TUFBQ0gsTUFBQUEsZUFBZSxFQUFFLENBQUE7TUFBQyxNQUFBLElBQUdsRSxNQUFNLENBQUMsd0JBQXdCLENBQUMsRUFBQztNQUFDQSxRQUFBQSxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQ2tFLGVBQWUsQ0FBQyxDQUFBO01BQUEsT0FBQTtNQUFDLEtBQUE7VUFBQyxTQUFTSSxtQkFBbUJBLENBQUNELEVBQUUsRUFBQztNQUFDSCxNQUFBQSxlQUFlLEVBQUUsQ0FBQTtNQUFDLE1BQUEsSUFBR2xFLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxFQUFDO01BQUNBLFFBQUFBLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDa0UsZUFBZSxDQUFDLENBQUE7TUFBQSxPQUFBO1lBQUMsSUFBR0EsZUFBZSxJQUFFLENBQUMsRUFBQztNQUErRixRQUFBLElBQUdDLHFCQUFxQixFQUFDO2dCQUFDLElBQUlJLFFBQVEsR0FBQ0oscUJBQXFCLENBQUE7TUFBQ0EsVUFBQUEscUJBQXFCLEdBQUMsSUFBSSxDQUFBO01BQUNJLFVBQUFBLFFBQVEsRUFBRSxDQUFBO01BQUEsU0FBQTtNQUFDLE9BQUE7TUFBQyxLQUFBO1VBQUMsU0FBUzdDLEtBQUtBLENBQUM4QyxJQUFJLEVBQUM7TUFBQyxNQUFBLElBQUd4RSxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUM7TUFBQ0EsUUFBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDd0UsSUFBSSxDQUFDLENBQUE7TUFBQSxPQUFBO01BQUNBLE1BQUFBLElBQUksR0FBQyxVQUFVLEdBQUNBLElBQUksR0FBQyxHQUFHLENBQUE7WUFBQ2xELEdBQUcsQ0FBQ2tELElBQUksQ0FBQyxDQUFBO01BQUM1QyxNQUFBQSxLQUFLLEdBQUMsSUFBSSxDQUFBO01BQWM0QyxNQUFBQSxJQUFJLElBQUUsMENBQTBDLENBQUE7WUFBQyxJQUFJQyxDQUFDLEdBQUMsSUFBSWhELFdBQVcsQ0FBQ2lELFlBQVksQ0FBQ0YsSUFBSSxDQUFDLENBQUE7WUFBQ3RFLGtCQUFrQixDQUFDdUUsQ0FBQyxDQUFDLENBQUE7TUFBQyxNQUFBLE1BQU1BLENBQUMsQ0FBQTtNQUFBLEtBQUE7VUFBQyxJQUFJRSxhQUFhLEdBQUMsdUNBQXVDLENBQUE7VUFBQyxTQUFTQyxTQUFTQSxDQUFDQyxRQUFRLEVBQUM7TUFBQyxNQUFBLE9BQU9BLFFBQVEsQ0FBQ0MsVUFBVSxDQUFDSCxhQUFhLENBQUMsQ0FBQTtNQUFBLEtBQUE7TUFBQyxJQUFBLElBQUlJLGNBQWMsQ0FBQTtNQUFDQSxJQUFBQSxjQUFjLEdBQUMsWUFBWSxDQUFBO01BQUMsSUFBQSxJQUFHLENBQUNILFNBQVMsQ0FBQ0csY0FBYyxDQUFDLEVBQUM7TUFBQ0EsTUFBQUEsY0FBYyxHQUFDcEUsVUFBVSxDQUFDb0UsY0FBYyxDQUFDLENBQUE7TUFBQSxLQUFBO1VBQUMsU0FBU0MsU0FBU0EsQ0FBQ0MsSUFBSSxFQUFDO1lBQUMsSUFBRztNQUFDLFFBQUEsSUFBR0EsSUFBSSxJQUFFRixjQUFjLElBQUV2RCxVQUFVLEVBQUM7TUFBQyxVQUFBLE9BQU8sSUFBSXNCLFVBQVUsQ0FBQ3RCLFVBQVUsQ0FBQyxDQUFBO01BQUEsU0FBQTtNQUFDLFFBQUEsSUFBR1gsVUFBVSxFQUFDLENBQXdCO01BQUMsUUFBQSxNQUFLLGlEQUFpRCxDQUFBO2FBQUMsQ0FBQSxPQUFNUyxHQUFHLEVBQUM7Y0FBQ0ksS0FBSyxDQUFDSixHQUFHLENBQUMsQ0FBQTtNQUFBLE9BQUE7TUFBQyxLQUFBO1VBQUMsU0FBUzRELGdCQUFnQkEsQ0FBQ0MsVUFBVSxFQUFDO01BQUMsTUFBQSxJQUFHLENBQUMzRCxVQUFVLEtBQUdmLGtCQUFrQixDQUF1QixDQUFDLEVBQUM7TUFBQyxRQUFBLElBQUcsT0FBTzJFLEtBQUssSUFBRSxVQUFVLEVBQUM7Z0JBQUMsT0FBT0EsS0FBSyxDQUFDRCxVQUFVLEVBQUM7TUFBQ0UsWUFBQUEsV0FBVyxFQUFDLGFBQUE7TUFBYSxXQUFDLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLFVBQUFDLFFBQVEsRUFBRTtNQUFDLFlBQUEsSUFBRyxDQUFDQSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUM7TUFBQyxjQUFBLE1BQUssc0NBQXNDLEdBQUNKLFVBQVUsR0FBQyxHQUFHLENBQUE7TUFBQSxhQUFBO01BQUMsWUFBQSxPQUFPSSxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQTtpQkFBQyxDQUFDLFNBQU0sQ0FBQyxZQUFBO2tCQUFBLE9BQUlQLFNBQVMsQ0FBQ0csVUFBVSxDQUFDLENBQUE7aUJBQUMsQ0FBQSxDQUFBO01BQUEsU0FBQTtNQUFDLE9BQUE7TUFBQyxNQUFBLE9BQU9oRixPQUFPLENBQUNDLE9BQU8sRUFBRSxDQUFDa0YsSUFBSSxDQUFDLFlBQUE7Y0FBQSxPQUFJTixTQUFTLENBQUNHLFVBQVUsQ0FBQyxDQUFBO2FBQUMsQ0FBQSxDQUFBO01BQUEsS0FBQTtNQUFDLElBQUEsU0FBU0ssc0JBQXNCQSxDQUFDTCxVQUFVLEVBQUNNLE9BQU8sRUFBQ0MsUUFBUSxFQUFDO1lBQUMsT0FBT1IsZ0JBQWdCLENBQUNDLFVBQVUsQ0FBQyxDQUFDRyxJQUFJLENBQUMsVUFBQUssTUFBTSxFQUFFO01BQUMsUUFBQSxPQUFPbEUsV0FBVyxDQUFDbUUsV0FBVyxDQUFDRCxNQUFNLEVBQUNGLE9BQU8sQ0FBQyxDQUFBO01BQUEsT0FBQyxDQUFDLENBQUNILElBQUksQ0FBQyxVQUFBTyxRQUFRLEVBQUU7TUFBQyxRQUFBLE9BQU9BLFFBQVEsQ0FBQTthQUFDLENBQUMsQ0FBQ1AsSUFBSSxDQUFDSSxRQUFRLEVBQUMsVUFBQUksTUFBTSxFQUFFO01BQUN4RSxRQUFBQSxHQUFHLENBQUMseUNBQXlDLEdBQUN3RSxNQUFNLENBQUMsQ0FBQTtjQUFDcEUsS0FBSyxDQUFDb0UsTUFBTSxDQUFDLENBQUE7TUFBQSxPQUFDLENBQUMsQ0FBQTtNQUFBLEtBQUE7VUFBQyxTQUFTQyxnQkFBZ0JBLENBQUNKLE1BQU0sRUFBQ1IsVUFBVSxFQUFDTSxPQUFPLEVBQUNsQixRQUFRLEVBQUM7WUFBQyxJQUFHLENBQUNvQixNQUFNLElBQUUsT0FBT2xFLFdBQVcsQ0FBQ3VFLG9CQUFvQixJQUFFLFVBQVUsSUFBRSxDQUFDcEIsU0FBUyxDQUFDTyxVQUFVLENBQUMsSUFBRSxPQUFPQyxLQUFLLElBQUUsVUFBVSxFQUFDO2NBQUMsT0FBT0EsS0FBSyxDQUFDRCxVQUFVLEVBQUM7TUFBQ0UsVUFBQUEsV0FBVyxFQUFDLGFBQUE7TUFBYSxTQUFDLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLFVBQUFDLFFBQVEsRUFBRTtnQkFBQyxJQUFJVSxNQUFNLEdBQUN4RSxXQUFXLENBQUN1RSxvQkFBb0IsQ0FBQ1QsUUFBUSxFQUFDRSxPQUFPLENBQUMsQ0FBQTtnQkFBQyxPQUFPUSxNQUFNLENBQUNYLElBQUksQ0FBQ2YsUUFBUSxFQUFDLFVBQVN1QixNQUFNLEVBQUM7TUFBQ3hFLFlBQUFBLEdBQUcsQ0FBQyxpQ0FBaUMsR0FBQ3dFLE1BQU0sQ0FBQyxDQUFBO2tCQUFDeEUsR0FBRyxDQUFDLDJDQUEyQyxDQUFDLENBQUE7TUFBQyxZQUFBLE9BQU9rRSxzQkFBc0IsQ0FBQ0wsVUFBVSxFQUFDTSxPQUFPLEVBQUNsQixRQUFRLENBQUMsQ0FBQTtNQUFBLFdBQUMsQ0FBQyxDQUFBO01BQUEsU0FBQyxDQUFDLENBQUE7TUFBQSxPQUFDLE1BQUk7TUFBQyxRQUFBLE9BQU9pQixzQkFBc0IsQ0FBQ0wsVUFBVSxFQUFDTSxPQUFPLEVBQUNsQixRQUFRLENBQUMsQ0FBQTtNQUFBLE9BQUE7TUFBQyxLQUFBO1VBQUMsU0FBUzJCLFVBQVVBLEdBQUU7TUFBQyxNQUFBLElBQUlDLElBQUksR0FBQztNQUFDLFFBQUEsR0FBRyxFQUFDQyxXQUFBQTthQUFZLENBQUE7TUFBQyxNQUFBLFNBQVNDLGVBQWVBLENBQUNSLFFBQVEsRUFBQ1MsTUFBTSxFQUFDO01BQUMsUUFBQSxJQUFJQyxPQUFPLEdBQUNWLFFBQVEsQ0FBQ1UsT0FBTyxDQUFBO01BQUN2RyxRQUFBQSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUN1RyxPQUFPLENBQUE7TUFBQzVFLFFBQUFBLFVBQVUsR0FBQzNCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtNQUFDd0MsUUFBQUEsaUJBQWlCLEVBQUUsQ0FBQTtNQUFDVyxRQUFBQSxTQUFTLEdBQUNuRCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7Y0FBQ2lFLFNBQVMsQ0FBQ2pFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO2NBQUNzRSxtQkFBbUIsQ0FBbUIsQ0FBQyxDQUFBO01BQUMsUUFBQSxPQUFPaUMsT0FBTyxDQUFBO01BQUEsT0FBQTtZQUFDbkMsZ0JBQWdCLENBQW1CLENBQUMsQ0FBQTtZQUFDLFNBQVNvQywwQkFBMEJBLENBQUNQLE1BQU0sRUFBQztNQUFDSSxRQUFBQSxlQUFlLENBQUNKLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFBO01BQUEsT0FBQTtNQUFDLE1BQUEsSUFBR2pHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFDO2NBQUMsSUFBRztnQkFBQyxPQUFPQSxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQ21HLElBQUksRUFBQ0UsZUFBZSxDQUFDLENBQUE7ZUFBQyxDQUFBLE9BQU01QixDQUFDLEVBQUM7TUFBQ25ELFVBQUFBLEdBQUcsQ0FBQyxxREFBcUQsR0FBQ21ELENBQUMsQ0FBQyxDQUFBO2dCQUFDdkUsa0JBQWtCLENBQUN1RSxDQUFDLENBQUMsQ0FBQTtNQUFBLFNBQUE7TUFBQyxPQUFBO01BQUNzQixNQUFBQSxnQkFBZ0IsQ0FBQ3ZFLFVBQVUsRUFBQ3VELGNBQWMsRUFBQ29CLElBQUksRUFBQ0ssMEJBQTBCLENBQUMsQ0FBQSxPQUFBLENBQU0sQ0FBQ3RHLGtCQUFrQixDQUFDLENBQUE7TUFBQyxNQUFBLE9BQU0sRUFBRSxDQUFBO01BQUEsS0FBQTtVQUFDLFNBQVN5RCxvQkFBb0JBLENBQUM4QyxTQUFTLEVBQUM7TUFBQyxNQUFBLE9BQU1BLFNBQVMsQ0FBQ2pELE1BQU0sR0FBQyxDQUFDLEVBQUM7TUFBQ2lELFFBQUFBLFNBQVMsQ0FBQy9DLEtBQUssRUFBRSxDQUFDMUQsTUFBTSxDQUFDLENBQUE7TUFBQSxPQUFBO01BQUMsS0FBQTtNQUFDLElBQUEsSUFBSTBHLFdBQVcsR0FBQyxPQUFPQyxXQUFXLElBQUUsV0FBVyxHQUFDLElBQUlBLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBQzVHLFNBQVMsQ0FBQTtNQUFDLElBQUEsU0FBUzZHLGlCQUFpQkEsQ0FBQ0MsV0FBVyxFQUFDQyxHQUFHLEVBQUNDLGNBQWMsRUFBQztNQUFDLE1BQUEsSUFBSUMsTUFBTSxHQUFDRixHQUFHLEdBQUNDLGNBQWMsQ0FBQTtZQUFDLElBQUlFLE1BQU0sR0FBQ0gsR0FBRyxDQUFBO01BQUMsTUFBQSxPQUFNRCxXQUFXLENBQUNJLE1BQU0sQ0FBQyxJQUFFLEVBQUVBLE1BQU0sSUFBRUQsTUFBTSxDQUFDLEVBQUMsRUFBRUMsTUFBTSxDQUFBO1lBQUMsSUFBR0EsTUFBTSxHQUFDSCxHQUFHLEdBQUMsRUFBRSxJQUFFRCxXQUFXLENBQUNuRSxNQUFNLElBQUVnRSxXQUFXLEVBQUM7TUFBQyxRQUFBLE9BQU9BLFdBQVcsQ0FBQ1EsTUFBTSxDQUFDTCxXQUFXLENBQUNNLFFBQVEsQ0FBQ0wsR0FBRyxFQUFDRyxNQUFNLENBQUMsQ0FBQyxDQUFBO01BQUEsT0FBQTtZQUFDLElBQUlHLEdBQUcsR0FBQyxFQUFFLENBQUE7WUFBQyxPQUFNTixHQUFHLEdBQUNHLE1BQU0sRUFBQztNQUFDLFFBQUEsSUFBSUksRUFBRSxHQUFDUixXQUFXLENBQUNDLEdBQUcsRUFBRSxDQUFDLENBQUE7TUFBQyxRQUFBLElBQUcsRUFBRU8sRUFBRSxHQUFDLEdBQUcsQ0FBQyxFQUFDO01BQUNELFVBQUFBLEdBQUcsSUFBRUUsTUFBTSxDQUFDQyxZQUFZLENBQUNGLEVBQUUsQ0FBQyxDQUFBO01BQUMsVUFBQSxTQUFBO01BQVEsU0FBQTtjQUFDLElBQUlHLEVBQUUsR0FBQ1gsV0FBVyxDQUFDQyxHQUFHLEVBQUUsQ0FBQyxHQUFDLEVBQUUsQ0FBQTtNQUFDLFFBQUEsSUFBRyxDQUFDTyxFQUFFLEdBQUMsR0FBRyxLQUFHLEdBQUcsRUFBQztNQUFDRCxVQUFBQSxHQUFHLElBQUVFLE1BQU0sQ0FBQ0MsWUFBWSxDQUFDLENBQUNGLEVBQUUsR0FBQyxFQUFFLEtBQUcsQ0FBQyxHQUFDRyxFQUFFLENBQUMsQ0FBQTtNQUFDLFVBQUEsU0FBQTtNQUFRLFNBQUE7Y0FBQyxJQUFJQyxFQUFFLEdBQUNaLFdBQVcsQ0FBQ0MsR0FBRyxFQUFFLENBQUMsR0FBQyxFQUFFLENBQUE7TUFBQyxRQUFBLElBQUcsQ0FBQ08sRUFBRSxHQUFDLEdBQUcsS0FBRyxHQUFHLEVBQUM7TUFBQ0EsVUFBQUEsRUFBRSxHQUFDLENBQUNBLEVBQUUsR0FBQyxFQUFFLEtBQUcsRUFBRSxHQUFDRyxFQUFFLElBQUUsQ0FBQyxHQUFDQyxFQUFFLENBQUE7TUFBQSxTQUFDLE1BQUk7Z0JBQUNKLEVBQUUsR0FBQyxDQUFDQSxFQUFFLEdBQUMsQ0FBQyxLQUFHLEVBQUUsR0FBQ0csRUFBRSxJQUFFLEVBQUUsR0FBQ0MsRUFBRSxJQUFFLENBQUMsR0FBQ1osV0FBVyxDQUFDQyxHQUFHLEVBQUUsQ0FBQyxHQUFDLEVBQUUsQ0FBQTtNQUFBLFNBQUE7Y0FBQyxJQUFHTyxFQUFFLEdBQUMsS0FBSyxFQUFDO01BQUNELFVBQUFBLEdBQUcsSUFBRUUsTUFBTSxDQUFDQyxZQUFZLENBQUNGLEVBQUUsQ0FBQyxDQUFBO01BQUEsU0FBQyxNQUFJO01BQUMsVUFBQSxJQUFJSyxFQUFFLEdBQUNMLEVBQUUsR0FBQyxLQUFLLENBQUE7TUFBQ0QsVUFBQUEsR0FBRyxJQUFFRSxNQUFNLENBQUNDLFlBQVksQ0FBQyxLQUFLLEdBQUNHLEVBQUUsSUFBRSxFQUFFLEVBQUMsS0FBSyxHQUFDQSxFQUFFLEdBQUMsSUFBSSxDQUFDLENBQUE7TUFBQSxTQUFBO01BQUMsT0FBQTtNQUFDLE1BQUEsT0FBT04sR0FBRyxDQUFBO01BQUEsS0FBQTtNQUFDLElBQUEsU0FBU08sWUFBWUEsQ0FBQ0MsR0FBRyxFQUFDYixjQUFjLEVBQUM7WUFBQyxPQUFPYSxHQUFHLEdBQUNoQixpQkFBaUIsQ0FBQzNFLE1BQU0sRUFBQzJGLEdBQUcsRUFBQ2IsY0FBYyxDQUFDLEdBQUMsRUFBRSxDQUFBO01BQUEsS0FBQTtNQUFrTCxJQUFBLFNBQVNjLGtCQUFrQkEsQ0FBQ0MsRUFBRSxFQUFDQyxHQUFHLEVBQUNDLE9BQU8sRUFBQztNQUEwQixNQUFBLE9BQU8sQ0FBQyxDQUFBO01BQUEsS0FBQTtNQUFDLElBQUEsU0FBU0MsZ0JBQWdCQSxDQUFDSCxFQUFFLEVBQUNJLEVBQUUsRUFBQ0YsT0FBTyxFQUFDO01BQTBCLE1BQUEsT0FBTyxDQUFDLENBQUE7TUFBQSxLQUFBO1VBQUMsU0FBU0csaUJBQWlCQSxDQUFDQyxLQUFLLEVBQUN4SCxJQUFJLEVBQUN5SCxLQUFLLEVBQUNMLE9BQU8sRUFBQztNQUF5QixLQUFBO01BQUMsSUFBQSxTQUFTTSx3QkFBd0JBLENBQUNDLGFBQWEsRUFBQ0MsSUFBSSxFQUFDQyxJQUFJLEVBQUNDLFFBQVEsRUFBQ0MsUUFBUSxFQUFDLEVBQUM7VUFBQyxTQUFTQyxnQkFBZ0JBLENBQUNILElBQUksRUFBQztNQUFDLE1BQUEsUUFBT0EsSUFBSTtNQUFFLFFBQUEsS0FBSyxDQUFDO01BQUMsVUFBQSxPQUFPLENBQUMsQ0FBQTtNQUFDLFFBQUEsS0FBSyxDQUFDO01BQUMsVUFBQSxPQUFPLENBQUMsQ0FBQTtNQUFDLFFBQUEsS0FBSyxDQUFDO01BQUMsVUFBQSxPQUFPLENBQUMsQ0FBQTtNQUFDLFFBQUEsS0FBSyxDQUFDO01BQUMsVUFBQSxPQUFPLENBQUMsQ0FBQTtNQUFDLFFBQUE7TUFBUSxVQUFBLE1BQU0sSUFBSUksU0FBUyxDQUF1QkoscUJBQUFBLEdBQUFBLElBQU0sQ0FBQyxDQUFBO01BQUEsT0FBQTtNQUFDLEtBQUE7VUFBQyxTQUFTSyxxQkFBcUJBLEdBQUU7TUFBQyxNQUFBLElBQUlDLEtBQUssR0FBQyxJQUFJQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7WUFBQyxLQUFJLElBQUlDLENBQUMsR0FBQyxDQUFDLEVBQUNBLENBQUMsR0FBQyxHQUFHLEVBQUMsRUFBRUEsQ0FBQyxFQUFDO2NBQUNGLEtBQUssQ0FBQ0UsQ0FBQyxDQUFDLEdBQUMzQixNQUFNLENBQUNDLFlBQVksQ0FBQzBCLENBQUMsQ0FBQyxDQUFBO01BQUEsT0FBQTtNQUFDQyxNQUFBQSxnQkFBZ0IsR0FBQ0gsS0FBSyxDQUFBO01BQUEsS0FBQTtVQUFDLElBQUlHLGdCQUFnQixHQUFDbkosU0FBUyxDQUFBO1VBQUMsU0FBU29KLGdCQUFnQkEsQ0FBQ3ZCLEdBQUcsRUFBQztZQUFDLElBQUl3QixHQUFHLEdBQUMsRUFBRSxDQUFBO1lBQUMsSUFBSUMsQ0FBQyxHQUFDekIsR0FBRyxDQUFBO01BQUMsTUFBQSxPQUFNM0YsTUFBTSxDQUFDb0gsQ0FBQyxDQUFDLEVBQUM7Y0FBQ0QsR0FBRyxJQUFFRixnQkFBZ0IsQ0FBQ2pILE1BQU0sQ0FBQ29ILENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtNQUFBLE9BQUE7TUFBQyxNQUFBLE9BQU9ELEdBQUcsQ0FBQTtNQUFBLEtBQUE7VUFBQyxJQUFJRSxvQkFBb0IsR0FBQyxFQUFFLENBQUE7VUFBQyxJQUFJQyxlQUFlLEdBQUMsRUFBRSxDQUFBO1VBQUMsSUFBSUMsZ0JBQWdCLEdBQUMsRUFBRSxDQUFBO1VBQUMsSUFBSUMsTUFBTSxHQUFDLEVBQUUsQ0FBQTtVQUFDLElBQUlDLE1BQU0sR0FBQyxFQUFFLENBQUE7VUFBQyxTQUFTQyxxQkFBcUJBLENBQUNuQixJQUFJLEVBQUM7WUFBQyxJQUFHekksU0FBUyxLQUFHeUksSUFBSSxFQUFDO01BQUMsUUFBQSxPQUFNLFVBQVUsQ0FBQTtNQUFBLE9BQUE7WUFBQ0EsSUFBSSxHQUFDQSxJQUFJLENBQUN4SCxPQUFPLENBQUMsZ0JBQWdCLEVBQUMsR0FBRyxDQUFDLENBQUE7TUFBQyxNQUFBLElBQUk0SSxDQUFDLEdBQUNwQixJQUFJLENBQUNxQixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7TUFBQyxNQUFBLElBQUdELENBQUMsSUFBRUgsTUFBTSxJQUFFRyxDQUFDLElBQUVGLE1BQU0sRUFBQztNQUFDLFFBQUEsT0FBQSxHQUFBLEdBQVVsQixJQUFJLENBQUE7TUFBRSxPQUFBO01BQUMsTUFBQSxPQUFPQSxJQUFJLENBQUE7TUFBQSxLQUFBO01BQUMsSUFBQSxTQUFTc0IsbUJBQW1CQSxDQUFDdEIsSUFBSSxFQUFDdUIsSUFBSSxFQUFDO01BQUEsTUFBQSxJQUFBQyxVQUFBLENBQUE7TUFBQ3hCLE1BQUFBLElBQUksR0FBQ21CLHFCQUFxQixDQUFDbkIsSUFBSSxDQUFDLENBQUE7TUFBQyxNQUFBLE9BQU0sQ0FBQXdCLFVBQUEsR0FBQSxFQUFBLEVBQUFBLFVBQUEsQ0FBRXhCLElBQUksSUFBRSxZQUFVO01BQUMsUUFBQSxPQUFPdUIsSUFBSSxDQUFDRSxLQUFLLENBQUMsSUFBSSxFQUFDQyxTQUFTLENBQUMsQ0FBQTtNQUFBLE9BQUMsRUFBQUYsVUFBQSxFQUFFeEIsSUFBSSxDQUFDLENBQUE7TUFBQSxLQUFBO01BQUMsSUFBQSxTQUFTMkIsV0FBV0EsQ0FBQ0MsYUFBYSxFQUFDQyxTQUFTLEVBQUM7WUFBQyxJQUFJQyxVQUFVLEdBQUNSLG1CQUFtQixDQUFDTyxTQUFTLEVBQUMsVUFBU0UsT0FBTyxFQUFDO2NBQUMsSUFBSSxDQUFDL0IsSUFBSSxHQUFDNkIsU0FBUyxDQUFBO2NBQUMsSUFBSSxDQUFDRSxPQUFPLEdBQUNBLE9BQU8sQ0FBQTtjQUFDLElBQUlDLEtBQUssR0FBQyxJQUFJQyxLQUFLLENBQUNGLE9BQU8sQ0FBQyxDQUFDQyxLQUFLLENBQUE7Y0FBQyxJQUFHQSxLQUFLLEtBQUd6SyxTQUFTLEVBQUM7TUFBQyxVQUFBLElBQUksQ0FBQ3lLLEtBQUssR0FBQyxJQUFJLENBQUNFLFFBQVEsRUFBRSxHQUFDLElBQUksR0FBQ0YsS0FBSyxDQUFDeEosT0FBTyxDQUFDLG9CQUFvQixFQUFDLEVBQUUsQ0FBQyxDQUFBO01BQUEsU0FBQTtNQUFDLE9BQUMsQ0FBQyxDQUFBO1lBQUNzSixVQUFVLENBQUNLLFNBQVMsR0FBQ3BLLE1BQU0sQ0FBQ3FLLE1BQU0sQ0FBQ1IsYUFBYSxDQUFDTyxTQUFTLENBQUMsQ0FBQTtNQUFDTCxNQUFBQSxVQUFVLENBQUNLLFNBQVMsQ0FBQ0UsV0FBVyxHQUFDUCxVQUFVLENBQUE7TUFBQ0EsTUFBQUEsVUFBVSxDQUFDSyxTQUFTLENBQUNELFFBQVEsR0FBQyxZQUFVO01BQUMsUUFBQSxJQUFHLElBQUksQ0FBQ0gsT0FBTyxLQUFHeEssU0FBUyxFQUFDO2dCQUFDLE9BQU8sSUFBSSxDQUFDeUksSUFBSSxDQUFBO01BQUEsU0FBQyxNQUFJO01BQUMsVUFBQSxPQUFTLElBQUksQ0FBQ0EsSUFBSSxHQUFLLElBQUEsR0FBQSxJQUFJLENBQUMrQixPQUFPLENBQUE7TUFBRSxTQUFBO2FBQUUsQ0FBQTtNQUFDLE1BQUEsT0FBT0QsVUFBVSxDQUFBO01BQUEsS0FBQTtVQUFDLElBQUlRLFlBQVksR0FBQy9LLFNBQVMsQ0FBQTtVQUFDLFNBQVNnTCxpQkFBaUJBLENBQUNSLE9BQU8sRUFBQztNQUFDLE1BQUEsTUFBTSxJQUFJTyxZQUFZLENBQUNQLE9BQU8sQ0FBQyxDQUFBO01BQUEsS0FBQTtVQUFDLElBQUlTLGFBQWEsR0FBQ2pMLFNBQVMsQ0FBQTtVQUFDLFNBQVNrTCxrQkFBa0JBLENBQUNWLE9BQU8sRUFBQztNQUFDLE1BQUEsTUFBTSxJQUFJUyxhQUFhLENBQUNULE9BQU8sQ0FBQyxDQUFBO01BQUEsS0FBQTtNQUFDLElBQUEsU0FBU1csNkJBQTZCQSxDQUFDQyxPQUFPLEVBQUNDLGNBQWMsRUFBQ0MsaUJBQWlCLEVBQUM7TUFBQ0YsTUFBQUEsT0FBTyxDQUFDRyxPQUFPLENBQUMsVUFBU0MsSUFBSSxFQUFDO01BQUMvQixRQUFBQSxnQkFBZ0IsQ0FBQytCLElBQUksQ0FBQyxHQUFDSCxjQUFjLENBQUE7TUFBQSxPQUFDLENBQUMsQ0FBQTtZQUFDLFNBQVNJLFVBQVVBLENBQUNDLGNBQWMsRUFBQztNQUFDLFFBQUEsSUFBSUMsZ0JBQWdCLEdBQUNMLGlCQUFpQixDQUFDSSxjQUFjLENBQUMsQ0FBQTtNQUFDLFFBQUEsSUFBR0MsZ0JBQWdCLENBQUNsSSxNQUFNLEtBQUcySCxPQUFPLENBQUMzSCxNQUFNLEVBQUM7Z0JBQUN5SCxrQkFBa0IsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFBO01BQUEsU0FBQTtNQUFDLFFBQUEsS0FBSSxJQUFJaEMsQ0FBQyxHQUFDLENBQUMsRUFBQ0EsQ0FBQyxHQUFDa0MsT0FBTyxDQUFDM0gsTUFBTSxFQUFDLEVBQUV5RixDQUFDLEVBQUM7Z0JBQUMwQyxZQUFZLENBQUNSLE9BQU8sQ0FBQ2xDLENBQUMsQ0FBQyxFQUFDeUMsZ0JBQWdCLENBQUN6QyxDQUFDLENBQUMsQ0FBQyxDQUFBO01BQUEsU0FBQTtNQUFDLE9BQUE7WUFBQyxJQUFJd0MsY0FBYyxHQUFDLElBQUl6QyxLQUFLLENBQUNvQyxjQUFjLENBQUM1SCxNQUFNLENBQUMsQ0FBQTtZQUFDLElBQUlvSSxpQkFBaUIsR0FBQyxFQUFFLENBQUE7WUFBQyxJQUFJQyxVQUFVLEdBQUMsQ0FBQyxDQUFBO01BQUNULE1BQUFBLGNBQWMsQ0FBQ0UsT0FBTyxDQUFDLFVBQUNRLEVBQUUsRUFBQzdDLENBQUMsRUFBRztNQUFDLFFBQUEsSUFBR00sZUFBZSxDQUFDd0MsY0FBYyxDQUFDRCxFQUFFLENBQUMsRUFBQztNQUFDTCxVQUFBQSxjQUFjLENBQUN4QyxDQUFDLENBQUMsR0FBQ00sZUFBZSxDQUFDdUMsRUFBRSxDQUFDLENBQUE7TUFBQSxTQUFDLE1BQUk7TUFBQ0YsVUFBQUEsaUJBQWlCLENBQUNJLElBQUksQ0FBQ0YsRUFBRSxDQUFDLENBQUE7TUFBQyxVQUFBLElBQUcsQ0FBQ3hDLG9CQUFvQixDQUFDeUMsY0FBYyxDQUFDRCxFQUFFLENBQUMsRUFBQztNQUFDeEMsWUFBQUEsb0JBQW9CLENBQUN3QyxFQUFFLENBQUMsR0FBQyxFQUFFLENBQUE7TUFBQSxXQUFBO01BQUN4QyxVQUFBQSxvQkFBb0IsQ0FBQ3dDLEVBQUUsQ0FBQyxDQUFDRSxJQUFJLENBQUMsWUFBSTtNQUFDUCxZQUFBQSxjQUFjLENBQUN4QyxDQUFDLENBQUMsR0FBQ00sZUFBZSxDQUFDdUMsRUFBRSxDQUFDLENBQUE7TUFBQyxZQUFBLEVBQUVELFVBQVUsQ0FBQTtNQUFDLFlBQUEsSUFBR0EsVUFBVSxLQUFHRCxpQkFBaUIsQ0FBQ3BJLE1BQU0sRUFBQztvQkFBQ2dJLFVBQVUsQ0FBQ0MsY0FBYyxDQUFDLENBQUE7TUFBQSxhQUFBO01BQUMsV0FBQyxDQUFDLENBQUE7TUFBQSxTQUFBO01BQUMsT0FBQyxDQUFDLENBQUE7TUFBQyxNQUFBLElBQUcsQ0FBQyxLQUFHRyxpQkFBaUIsQ0FBQ3BJLE1BQU0sRUFBQztjQUFDZ0ksVUFBVSxDQUFDQyxjQUFjLENBQUMsQ0FBQTtNQUFBLE9BQUE7TUFBQyxLQUFBO01BQUMsSUFBQSxTQUFTRSxZQUFZQSxDQUFDTSxPQUFPLEVBQUNDLGtCQUFrQixFQUFDQyxPQUFPLEVBQUk7TUFBQSxNQUFBLElBQVhBLE9BQU8sS0FBQSxLQUFBLENBQUEsRUFBQTtjQUFQQSxPQUFPLEdBQUMsRUFBRSxDQUFBO01BQUEsT0FBQTtNQUFFLE1BQUEsSUFBRyxFQUFFLGdCQUFnQixJQUFHRCxrQkFBa0IsQ0FBQyxFQUFDO01BQUMsUUFBQSxNQUFNLElBQUlyRCxTQUFTLENBQUMseURBQXlELENBQUMsQ0FBQTtNQUFBLE9BQUE7TUFBQyxNQUFBLElBQUlMLElBQUksR0FBQzBELGtCQUFrQixDQUFDMUQsSUFBSSxDQUFBO1lBQUMsSUFBRyxDQUFDeUQsT0FBTyxFQUFDO2NBQUNsQixpQkFBaUIsQ0FBQSxTQUFBLEdBQVV2QyxJQUFJLEdBQUEsZ0RBQStDLENBQUMsQ0FBQTtNQUFBLE9BQUE7TUFBQyxNQUFBLElBQUdlLGVBQWUsQ0FBQ3dDLGNBQWMsQ0FBQ0UsT0FBTyxDQUFDLEVBQUM7Y0FBQyxJQUFHRSxPQUFPLENBQUNDLDRCQUE0QixFQUFDO01BQUMsVUFBQSxPQUFBO01BQU0sU0FBQyxNQUFJO2dCQUFDckIsaUJBQWlCLENBQUEsd0JBQUEsR0FBMEJ2QyxJQUFJLEdBQUEsU0FBUyxDQUFDLENBQUE7TUFBQSxTQUFBO01BQUMsT0FBQTtNQUFDZSxNQUFBQSxlQUFlLENBQUMwQyxPQUFPLENBQUMsR0FBQ0Msa0JBQWtCLENBQUE7WUFBQyxPQUFPMUMsZ0JBQWdCLENBQUN5QyxPQUFPLENBQUMsQ0FBQTtNQUFDLE1BQUEsSUFBRzNDLG9CQUFvQixDQUFDeUMsY0FBYyxDQUFDRSxPQUFPLENBQUMsRUFBQztNQUFDLFFBQUEsSUFBSXhGLFNBQVMsR0FBQzZDLG9CQUFvQixDQUFDMkMsT0FBTyxDQUFDLENBQUE7Y0FBQyxPQUFPM0Msb0JBQW9CLENBQUMyQyxPQUFPLENBQUMsQ0FBQTtNQUFDeEYsUUFBQUEsU0FBUyxDQUFDNkUsT0FBTyxDQUFDLFVBQUF2SCxFQUFFLEVBQUE7Z0JBQUEsT0FBRUEsRUFBRSxFQUFFLENBQUE7ZUFBQyxDQUFBLENBQUE7TUFBQSxPQUFBO01BQUMsS0FBQTtVQUFDLFNBQVNzSSxzQkFBc0JBLENBQUNKLE9BQU8sRUFBQ3pELElBQUksRUFBQ0MsSUFBSSxFQUFDNkQsU0FBUyxFQUFDQyxVQUFVLEVBQUM7TUFBQyxNQUFBLElBQUk3SSxLQUFLLEdBQUNrRixnQkFBZ0IsQ0FBQ0gsSUFBSSxDQUFDLENBQUE7TUFBQ0QsTUFBQUEsSUFBSSxHQUFDVyxnQkFBZ0IsQ0FBQ1gsSUFBSSxDQUFDLENBQUE7WUFBQ21ELFlBQVksQ0FBQ00sT0FBTyxFQUFDO01BQUN6RCxRQUFBQSxJQUFJLEVBQUNBLElBQUk7TUFBQyxRQUFBLGNBQWMsRUFBQyxTQUFBZ0UsWUFBU0MsQ0FBQUEsRUFBRSxFQUFDO2dCQUFDLE9BQU0sQ0FBQyxDQUFDQSxFQUFFLENBQUE7ZUFBQztNQUFDLFFBQUEsWUFBWSxFQUFDLFNBQUFDLFVBQUFBLENBQVNDLFdBQVcsRUFBQ0MsQ0FBQyxFQUFDO01BQUMsVUFBQSxPQUFPQSxDQUFDLEdBQUNOLFNBQVMsR0FBQ0MsVUFBVSxDQUFBO2VBQUM7TUFBQyxRQUFBLGdCQUFnQixFQUFDLENBQUM7TUFBQyxRQUFBLHNCQUFzQixFQUFDLFNBQUFNLG9CQUFTQyxDQUFBQSxPQUFPLEVBQUM7TUFBQyxVQUFBLElBQUlDLElBQUksQ0FBQTtnQkFBQyxJQUFHdEUsSUFBSSxLQUFHLENBQUMsRUFBQztNQUFDc0UsWUFBQUEsSUFBSSxHQUFDL0ssS0FBSyxDQUFBO01BQUEsV0FBQyxNQUFLLElBQUd5RyxJQUFJLEtBQUcsQ0FBQyxFQUFDO01BQUNzRSxZQUFBQSxJQUFJLEdBQUM3SyxNQUFNLENBQUE7TUFBQSxXQUFDLE1BQUssSUFBR3VHLElBQUksS0FBRyxDQUFDLEVBQUM7TUFBQ3NFLFlBQUFBLElBQUksR0FBQzNLLE1BQU0sQ0FBQTtNQUFBLFdBQUMsTUFBSTtNQUFDLFlBQUEsTUFBTSxJQUFJeUcsU0FBUyxDQUFDLDZCQUE2QixHQUFDTCxJQUFJLENBQUMsQ0FBQTtNQUFBLFdBQUE7Z0JBQUMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUN1RSxJQUFJLENBQUNELE9BQU8sSUFBRXBKLEtBQUssQ0FBQyxDQUFDLENBQUE7ZUFBQztNQUFDc0osUUFBQUEsa0JBQWtCLEVBQUMsSUFBQTtNQUFJLE9BQUMsQ0FBQyxDQUFBO01BQUEsS0FBQTtVQUFDLFNBQVNDLHFCQUFxQkEsQ0FBQ0MsS0FBSyxFQUFDO01BQUMsTUFBQSxJQUFHLEVBQUUsSUFBSSxZQUFZQyxXQUFXLENBQUMsRUFBQztNQUFDLFFBQUEsT0FBTyxLQUFLLENBQUE7TUFBQSxPQUFBO01BQUMsTUFBQSxJQUFHLEVBQUVELEtBQUssWUFBWUMsV0FBVyxDQUFDLEVBQUM7TUFBQyxRQUFBLE9BQU8sS0FBSyxDQUFBO01BQUEsT0FBQTtZQUFDLElBQUlDLFNBQVMsR0FBQyxJQUFJLENBQUNDLEVBQUUsQ0FBQ0MsT0FBTyxDQUFDQyxlQUFlLENBQUE7TUFBQyxNQUFBLElBQUlDLElBQUksR0FBQyxJQUFJLENBQUNILEVBQUUsQ0FBQ3pGLEdBQUcsQ0FBQTtZQUFDLElBQUk2RixVQUFVLEdBQUNQLEtBQUssQ0FBQ0csRUFBRSxDQUFDQyxPQUFPLENBQUNDLGVBQWUsQ0FBQTtNQUFDLE1BQUEsSUFBSUcsS0FBSyxHQUFDUixLQUFLLENBQUNHLEVBQUUsQ0FBQ3pGLEdBQUcsQ0FBQTtZQUFDLE9BQU13RixTQUFTLENBQUNPLFNBQVMsRUFBQztNQUFDSCxRQUFBQSxJQUFJLEdBQUNKLFNBQVMsQ0FBQ1EsTUFBTSxDQUFDSixJQUFJLENBQUMsQ0FBQTtjQUFDSixTQUFTLEdBQUNBLFNBQVMsQ0FBQ08sU0FBUyxDQUFBO01BQUEsT0FBQTtZQUFDLE9BQU1GLFVBQVUsQ0FBQ0UsU0FBUyxFQUFDO01BQUNELFFBQUFBLEtBQUssR0FBQ0QsVUFBVSxDQUFDRyxNQUFNLENBQUNGLEtBQUssQ0FBQyxDQUFBO2NBQUNELFVBQVUsR0FBQ0EsVUFBVSxDQUFDRSxTQUFTLENBQUE7TUFBQSxPQUFBO01BQUMsTUFBQSxPQUFPUCxTQUFTLEtBQUdLLFVBQVUsSUFBRUQsSUFBSSxLQUFHRSxLQUFLLENBQUE7TUFBQSxLQUFBO1VBQUMsU0FBU0csMEJBQTBCQSxDQUFDakIsQ0FBQyxFQUFDO1lBQUMsT0FBTTtjQUFDa0IsS0FBSyxFQUFDbEIsQ0FBQyxDQUFDa0IsS0FBSztjQUFDQyxlQUFlLEVBQUNuQixDQUFDLENBQUNtQixlQUFlO2NBQUNDLHVCQUF1QixFQUFDcEIsQ0FBQyxDQUFDb0IsdUJBQXVCO2NBQUNwRyxHQUFHLEVBQUNnRixDQUFDLENBQUNoRixHQUFHO2NBQUMwRixPQUFPLEVBQUNWLENBQUMsQ0FBQ1UsT0FBTztjQUFDVyxRQUFRLEVBQUNyQixDQUFDLENBQUNxQixRQUFRO2NBQUNDLFlBQVksRUFBQ3RCLENBQUMsQ0FBQ3NCLFlBQUFBO2FBQWEsQ0FBQTtNQUFBLEtBQUE7VUFBQyxTQUFTQywyQkFBMkJBLENBQUNDLEdBQUcsRUFBQztZQUFDLFNBQVNDLG1CQUFtQkEsQ0FBQ0MsTUFBTSxFQUFDO2NBQUMsT0FBT0EsTUFBTSxDQUFDakIsRUFBRSxDQUFDQyxPQUFPLENBQUNDLGVBQWUsQ0FBQy9FLElBQUksQ0FBQTtNQUFBLE9BQUE7TUFBQ3VDLE1BQUFBLGlCQUFpQixDQUFDc0QsbUJBQW1CLENBQUNELEdBQUcsQ0FBQyxHQUFDLDJCQUEyQixDQUFDLENBQUE7TUFBQSxLQUFBO1VBQUMsSUFBSUcsb0JBQW9CLEdBQUMsS0FBSyxDQUFBO01BQUMsSUFBQSxTQUFTQyxlQUFlQSxDQUFDRixNQUFNLEVBQUMsRUFBQztVQUFDLFNBQVNHLGFBQWFBLENBQUNwQixFQUFFLEVBQUM7WUFBQyxJQUFHQSxFQUFFLENBQUNZLFFBQVEsRUFBQztjQUFDWixFQUFFLENBQUNhLFlBQVksQ0FBQ1EsYUFBYSxDQUFDckIsRUFBRSxDQUFDWSxRQUFRLENBQUMsQ0FBQTtNQUFBLE9BQUMsTUFBSTtjQUFDWixFQUFFLENBQUNDLE9BQU8sQ0FBQ0MsZUFBZSxDQUFDbUIsYUFBYSxDQUFDckIsRUFBRSxDQUFDekYsR0FBRyxDQUFDLENBQUE7TUFBQSxPQUFBO01BQUMsS0FBQTtVQUFDLFNBQVMrRyxrQkFBa0JBLENBQUN0QixFQUFFLEVBQUM7TUFBQ0EsTUFBQUEsRUFBRSxDQUFDUyxLQUFLLENBQUNjLEtBQUssSUFBRSxDQUFDLENBQUE7WUFBQyxJQUFJQyxRQUFRLEdBQUMsQ0FBQyxLQUFHeEIsRUFBRSxDQUFDUyxLQUFLLENBQUNjLEtBQUssQ0FBQTtNQUFDLE1BQUEsSUFBR0MsUUFBUSxFQUFDO2NBQUNKLGFBQWEsQ0FBQ3BCLEVBQUUsQ0FBQyxDQUFBO01BQUEsT0FBQTtNQUFDLEtBQUE7TUFBQyxJQUFBLFNBQVN5QixlQUFlQSxDQUFDbEgsR0FBRyxFQUFDbUgsUUFBUSxFQUFDQyxZQUFZLEVBQUM7WUFBQyxJQUFHRCxRQUFRLEtBQUdDLFlBQVksRUFBQztNQUFDLFFBQUEsT0FBT3BILEdBQUcsQ0FBQTtNQUFBLE9BQUE7TUFBQyxNQUFBLElBQUc3SCxTQUFTLEtBQUdpUCxZQUFZLENBQUNyQixTQUFTLEVBQUM7TUFBQyxRQUFBLE9BQU8sSUFBSSxDQUFBO01BQUEsT0FBQTtZQUFDLElBQUlzQixFQUFFLEdBQUNILGVBQWUsQ0FBQ2xILEdBQUcsRUFBQ21ILFFBQVEsRUFBQ0MsWUFBWSxDQUFDckIsU0FBUyxDQUFDLENBQUE7WUFBQyxJQUFHc0IsRUFBRSxLQUFHLElBQUksRUFBQztNQUFDLFFBQUEsT0FBTyxJQUFJLENBQUE7TUFBQSxPQUFBO01BQUMsTUFBQSxPQUFPRCxZQUFZLENBQUNFLFFBQVEsQ0FBQ0QsRUFBRSxDQUFDLENBQUE7TUFBQSxLQUFBO1VBQUMsSUFBSUUsa0JBQWtCLEdBQUMsRUFBRSxDQUFBO1VBQUMsU0FBU0MseUJBQXlCQSxHQUFFO01BQUMsTUFBQSxPQUFPN08sTUFBTSxDQUFDOE8sSUFBSSxDQUFDQyxtQkFBbUIsQ0FBQyxDQUFDOUwsTUFBTSxDQUFBO01BQUEsS0FBQTtVQUFDLFNBQVMrTCx5QkFBeUJBLEdBQUU7WUFBQyxJQUFJTixFQUFFLEdBQUMsRUFBRSxDQUFBO01BQUMsTUFBQSxLQUFJLElBQUlPLENBQUMsSUFBSUYsbUJBQW1CLEVBQUM7TUFBQyxRQUFBLElBQUdBLG1CQUFtQixDQUFDdkQsY0FBYyxDQUFDeUQsQ0FBQyxDQUFDLEVBQUM7TUFBQ1AsVUFBQUEsRUFBRSxDQUFDakQsSUFBSSxDQUFDc0QsbUJBQW1CLENBQUNFLENBQUMsQ0FBQyxDQUFDLENBQUE7TUFBQSxTQUFBO01BQUMsT0FBQTtNQUFDLE1BQUEsT0FBT1AsRUFBRSxDQUFBO01BQUEsS0FBQTtVQUFDLElBQUlRLGFBQWEsR0FBQyxFQUFFLENBQUE7VUFBQyxTQUFTQyxtQkFBbUJBLEdBQUU7WUFBQyxPQUFNRCxhQUFhLENBQUNqTSxNQUFNLEVBQUM7TUFBQyxRQUFBLElBQUk0SyxHQUFHLEdBQUNxQixhQUFhLENBQUNFLEdBQUcsRUFBRSxDQUFBO01BQUN2QixRQUFBQSxHQUFHLENBQUNmLEVBQUUsQ0FBQ1UsZUFBZSxHQUFDLEtBQUssQ0FBQTtNQUFDSyxRQUFBQSxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQTtNQUFBLE9BQUE7TUFBQyxLQUFBO1VBQUMsSUFBSXdCLGFBQWEsR0FBQzdQLFNBQVMsQ0FBQTtVQUFDLFNBQVM4UCxnQkFBZ0JBLENBQUNDLEVBQUUsRUFBQztNQUFDRixNQUFBQSxhQUFhLEdBQUNFLEVBQUUsQ0FBQTtNQUFDLE1BQUEsSUFBR0wsYUFBYSxDQUFDak0sTUFBTSxJQUFFb00sYUFBYSxFQUFDO2NBQUNBLGFBQWEsQ0FBQ0YsbUJBQW1CLENBQUMsQ0FBQTtNQUFBLE9BQUE7TUFBQyxLQUFBO1VBQUMsU0FBU0ssV0FBV0EsR0FBRTtNQUFDL1AsTUFBQUEsTUFBTSxDQUFDLDJCQUEyQixDQUFDLEdBQUNvUCx5QkFBeUIsQ0FBQTtNQUFDcFAsTUFBQUEsTUFBTSxDQUFDLDJCQUEyQixDQUFDLEdBQUN1UCx5QkFBeUIsQ0FBQTtNQUFDdlAsTUFBQUEsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEdBQUMwUCxtQkFBbUIsQ0FBQTtNQUFDMVAsTUFBQUEsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEdBQUM2UCxnQkFBZ0IsQ0FBQTtNQUFBLEtBQUE7VUFBQyxJQUFJUCxtQkFBbUIsR0FBQyxFQUFFLENBQUE7TUFBQyxJQUFBLFNBQVNVLGdCQUFnQkEsQ0FBQ0MsTUFBTSxFQUFDckksR0FBRyxFQUFDO1lBQUMsSUFBR0EsR0FBRyxLQUFHN0gsU0FBUyxFQUFDO2NBQUNnTCxpQkFBaUIsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBO01BQUEsT0FBQTtZQUFDLE9BQU1rRixNQUFNLENBQUN0QyxTQUFTLEVBQUM7TUFBQy9GLFFBQUFBLEdBQUcsR0FBQ3FJLE1BQU0sQ0FBQ3JDLE1BQU0sQ0FBQ2hHLEdBQUcsQ0FBQyxDQUFBO2NBQUNxSSxNQUFNLEdBQUNBLE1BQU0sQ0FBQ3RDLFNBQVMsQ0FBQTtNQUFBLE9BQUE7TUFBQyxNQUFBLE9BQU8vRixHQUFHLENBQUE7TUFBQSxLQUFBO01BQUMsSUFBQSxTQUFTc0ksb0JBQW9CQSxDQUFDRCxNQUFNLEVBQUNySSxHQUFHLEVBQUM7TUFBQ0EsTUFBQUEsR0FBRyxHQUFDb0ksZ0JBQWdCLENBQUNDLE1BQU0sRUFBQ3JJLEdBQUcsQ0FBQyxDQUFBO1lBQUMsT0FBTzBILG1CQUFtQixDQUFDMUgsR0FBRyxDQUFDLENBQUE7TUFBQSxLQUFBO01BQUMsSUFBQSxTQUFTdUksZUFBZUEsQ0FBQ3hGLFNBQVMsRUFBQ3lGLE1BQU0sRUFBQztZQUFDLElBQUcsQ0FBQ0EsTUFBTSxDQUFDOUMsT0FBTyxJQUFFLENBQUM4QyxNQUFNLENBQUN4SSxHQUFHLEVBQUM7Y0FBQ3FELGtCQUFrQixDQUFDLDBDQUEwQyxDQUFDLENBQUE7TUFBQSxPQUFBO01BQUMsTUFBQSxJQUFJb0YsZUFBZSxHQUFDLENBQUMsQ0FBQ0QsTUFBTSxDQUFDbEMsWUFBWSxDQUFBO01BQUMsTUFBQSxJQUFJb0MsV0FBVyxHQUFDLENBQUMsQ0FBQ0YsTUFBTSxDQUFDbkMsUUFBUSxDQUFBO1lBQUMsSUFBR29DLGVBQWUsS0FBR0MsV0FBVyxFQUFDO2NBQUNyRixrQkFBa0IsQ0FBQyxrREFBa0QsQ0FBQyxDQUFBO01BQUEsT0FBQTtZQUFDbUYsTUFBTSxDQUFDdEMsS0FBSyxHQUFDO01BQUNjLFFBQUFBLEtBQUssRUFBQyxDQUFBO2FBQUUsQ0FBQTtNQUFDLE1BQUEsT0FBTzJCLGVBQWUsQ0FBQ2hRLE1BQU0sQ0FBQ3FLLE1BQU0sQ0FBQ0QsU0FBUyxFQUFDO01BQUMwQyxRQUFBQSxFQUFFLEVBQUM7TUFBQ3VCLFVBQUFBLEtBQUssRUFBQ3dCLE1BQUFBO01BQU0sU0FBQTtNQUFDLE9BQUMsQ0FBQyxDQUFDLENBQUE7TUFBQSxLQUFBO1VBQUMsU0FBU0ksOEJBQThCQSxDQUFDNUksR0FBRyxFQUFDO01BQUMsTUFBQSxJQUFJNkksVUFBVSxHQUFDLElBQUksQ0FBQ0MsVUFBVSxDQUFDOUksR0FBRyxDQUFDLENBQUE7WUFBQyxJQUFHLENBQUM2SSxVQUFVLEVBQUM7TUFBQyxRQUFBLElBQUksQ0FBQ0UsVUFBVSxDQUFDL0ksR0FBRyxDQUFDLENBQUE7TUFBQyxRQUFBLE9BQU8sSUFBSSxDQUFBO01BQUEsT0FBQTtZQUFDLElBQUlzRSxrQkFBa0IsR0FBQ2dFLG9CQUFvQixDQUFDLElBQUksQ0FBQzNDLGVBQWUsRUFBQ2tELFVBQVUsQ0FBQyxDQUFBO1lBQUMsSUFBRzFRLFNBQVMsS0FBR21NLGtCQUFrQixFQUFDO2NBQUMsSUFBRyxDQUFDLEtBQUdBLGtCQUFrQixDQUFDbUIsRUFBRSxDQUFDUyxLQUFLLENBQUNjLEtBQUssRUFBQztNQUFDMUMsVUFBQUEsa0JBQWtCLENBQUNtQixFQUFFLENBQUN6RixHQUFHLEdBQUM2SSxVQUFVLENBQUE7TUFBQ3ZFLFVBQUFBLGtCQUFrQixDQUFDbUIsRUFBRSxDQUFDWSxRQUFRLEdBQUNyRyxHQUFHLENBQUE7TUFBQyxVQUFBLE9BQU9zRSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFBO01BQUEsU0FBQyxNQUFJO01BQUMsVUFBQSxJQUFJK0MsRUFBRSxHQUFDL0Msa0JBQWtCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQTtNQUFDLFVBQUEsSUFBSSxDQUFDeUUsVUFBVSxDQUFDL0ksR0FBRyxDQUFDLENBQUE7TUFBQyxVQUFBLE9BQU9xSCxFQUFFLENBQUE7TUFBQSxTQUFBO01BQUMsT0FBQTtZQUFDLFNBQVMyQixpQkFBaUJBLEdBQUU7Y0FBQyxJQUFHLElBQUksQ0FBQ0MsY0FBYyxFQUFDO01BQUMsVUFBQSxPQUFPVixlQUFlLENBQUMsSUFBSSxDQUFDNUMsZUFBZSxDQUFDdUQsaUJBQWlCLEVBQUM7a0JBQUN4RCxPQUFPLEVBQUMsSUFBSSxDQUFDeUQsV0FBVztNQUFDbkosWUFBQUEsR0FBRyxFQUFDNkksVUFBVTtNQUFDdkMsWUFBQUEsWUFBWSxFQUFDLElBQUk7TUFBQ0QsWUFBQUEsUUFBUSxFQUFDckcsR0FBQUE7TUFBRyxXQUFDLENBQUMsQ0FBQTtNQUFBLFNBQUMsTUFBSTtNQUFDLFVBQUEsT0FBT3VJLGVBQWUsQ0FBQyxJQUFJLENBQUM1QyxlQUFlLENBQUN1RCxpQkFBaUIsRUFBQztNQUFDeEQsWUFBQUEsT0FBTyxFQUFDLElBQUk7TUFBQzFGLFlBQUFBLEdBQUcsRUFBQ0EsR0FBQUE7TUFBRyxXQUFDLENBQUMsQ0FBQTtNQUFBLFNBQUE7TUFBQyxPQUFBO1lBQUMsSUFBSW9KLFVBQVUsR0FBQyxJQUFJLENBQUN6RCxlQUFlLENBQUMwRCxhQUFhLENBQUNSLFVBQVUsQ0FBQyxDQUFBO01BQUMsTUFBQSxJQUFJUyx1QkFBdUIsR0FBQy9CLGtCQUFrQixDQUFDNkIsVUFBVSxDQUFDLENBQUE7WUFBQyxJQUFHLENBQUNFLHVCQUF1QixFQUFDO01BQUMsUUFBQSxPQUFPTixpQkFBaUIsQ0FBQ08sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO01BQUEsT0FBQTtNQUFDLE1BQUEsSUFBSUMsTUFBTSxDQUFBO1lBQUMsSUFBRyxJQUFJLENBQUNDLE9BQU8sRUFBQztjQUFDRCxNQUFNLEdBQUNGLHVCQUF1QixDQUFDSSxnQkFBZ0IsQ0FBQTtNQUFBLE9BQUMsTUFBSTtjQUFDRixNQUFNLEdBQUNGLHVCQUF1QixDQUFDSyxXQUFXLENBQUE7TUFBQSxPQUFBO01BQUMsTUFBQSxJQUFJQyxFQUFFLEdBQUMxQyxlQUFlLENBQUMyQixVQUFVLEVBQUMsSUFBSSxDQUFDbEQsZUFBZSxFQUFDNkQsTUFBTSxDQUFDN0QsZUFBZSxDQUFDLENBQUE7WUFBQyxJQUFHaUUsRUFBRSxLQUFHLElBQUksRUFBQztNQUFDLFFBQUEsT0FBT1osaUJBQWlCLENBQUNPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtNQUFBLE9BQUE7WUFBQyxJQUFHLElBQUksQ0FBQ04sY0FBYyxFQUFDO01BQUMsUUFBQSxPQUFPVixlQUFlLENBQUNpQixNQUFNLENBQUM3RCxlQUFlLENBQUN1RCxpQkFBaUIsRUFBQztNQUFDeEQsVUFBQUEsT0FBTyxFQUFDOEQsTUFBTTtNQUFDeEosVUFBQUEsR0FBRyxFQUFDNEosRUFBRTtNQUFDdEQsVUFBQUEsWUFBWSxFQUFDLElBQUk7TUFBQ0QsVUFBQUEsUUFBUSxFQUFDckcsR0FBQUE7TUFBRyxTQUFDLENBQUMsQ0FBQTtNQUFBLE9BQUMsTUFBSTtNQUFDLFFBQUEsT0FBT3VJLGVBQWUsQ0FBQ2lCLE1BQU0sQ0FBQzdELGVBQWUsQ0FBQ3VELGlCQUFpQixFQUFDO01BQUN4RCxVQUFBQSxPQUFPLEVBQUM4RCxNQUFNO01BQUN4SixVQUFBQSxHQUFHLEVBQUM0SixFQUFBQTtNQUFFLFNBQUMsQ0FBQyxDQUFBO01BQUEsT0FBQTtNQUFDLEtBQUE7VUFBQyxTQUFTakIsZUFBZUEsQ0FBQ2pDLE1BQU0sRUFBQztNQUFDLE1BQUEsSUFBRyxXQUFXLEtBQUcsT0FBT21ELG9CQUFvQixFQUFDO2NBQUNsQixlQUFlLEdBQUMsU0FBQUEsZUFBQUEsQ0FBQWpDLE1BQU0sRUFBQTtNQUFBLFVBQUEsT0FBRUEsTUFBTSxDQUFBO01BQUEsU0FBQSxDQUFBO01BQUMsUUFBQSxPQUFPQSxNQUFNLENBQUE7TUFBQSxPQUFBO01BQUNDLE1BQUFBLG9CQUFvQixHQUFDLElBQUlrRCxvQkFBb0IsQ0FBQyxVQUFBdEwsSUFBSSxFQUFFO01BQUN3SSxRQUFBQSxrQkFBa0IsQ0FBQ3hJLElBQUksQ0FBQ2tILEVBQUUsQ0FBQyxDQUFBO01BQUEsT0FBQyxDQUFDLENBQUE7TUFBQ2tELE1BQUFBLGVBQWUsR0FBQyxTQUFBQSxlQUFBakMsQ0FBQUEsTUFBTSxFQUFFO01BQUMsUUFBQSxJQUFJakIsRUFBRSxHQUFDaUIsTUFBTSxDQUFDakIsRUFBRSxDQUFBO01BQUMsUUFBQSxJQUFJaUQsV0FBVyxHQUFDLENBQUMsQ0FBQ2pELEVBQUUsQ0FBQ1ksUUFBUSxDQUFBO01BQUMsUUFBQSxJQUFHcUMsV0FBVyxFQUFDO01BQUMsVUFBQSxJQUFJbkssSUFBSSxHQUFDO01BQUNrSCxZQUFBQSxFQUFFLEVBQUNBLEVBQUFBO2lCQUFHLENBQUE7Z0JBQUNrQixvQkFBb0IsQ0FBQ21ELFFBQVEsQ0FBQ3BELE1BQU0sRUFBQ25JLElBQUksRUFBQ21JLE1BQU0sQ0FBQyxDQUFBO01BQUEsU0FBQTtNQUFDLFFBQUEsT0FBT0EsTUFBTSxDQUFBO2FBQUMsQ0FBQTtZQUFDRSxlQUFlLEdBQUMsU0FBQUEsZUFBQUEsQ0FBQUYsTUFBTSxFQUFBO01BQUEsUUFBQSxPQUFFQyxvQkFBb0IsQ0FBQ29ELFVBQVUsQ0FBQ3JELE1BQU0sQ0FBQyxDQUFBO01BQUEsT0FBQSxDQUFBO1lBQUMsT0FBT2lDLGVBQWUsQ0FBQ2pDLE1BQU0sQ0FBQyxDQUFBO01BQUEsS0FBQTtVQUFDLFNBQVNzRCxpQkFBaUJBLEdBQUU7TUFBQyxNQUFBLElBQUcsQ0FBQyxJQUFJLENBQUN2RSxFQUFFLENBQUN6RixHQUFHLEVBQUM7Y0FBQ3VHLDJCQUEyQixDQUFDLElBQUksQ0FBQyxDQUFBO01BQUEsT0FBQTtNQUFDLE1BQUEsSUFBRyxJQUFJLENBQUNkLEVBQUUsQ0FBQ1csdUJBQXVCLEVBQUM7TUFBQyxRQUFBLElBQUksQ0FBQ1gsRUFBRSxDQUFDUyxLQUFLLENBQUNjLEtBQUssSUFBRSxDQUFDLENBQUE7TUFBQyxRQUFBLE9BQU8sSUFBSSxDQUFBO01BQUEsT0FBQyxNQUFJO01BQUMsUUFBQSxJQUFJaUQsS0FBSyxHQUFDdEIsZUFBZSxDQUFDaFEsTUFBTSxDQUFDcUssTUFBTSxDQUFDckssTUFBTSxDQUFDdVIsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFDO01BQUN6RSxVQUFBQSxFQUFFLEVBQUM7TUFBQ3VCLFlBQUFBLEtBQUssRUFBQ2YsMEJBQTBCLENBQUMsSUFBSSxDQUFDUixFQUFFLENBQUE7TUFBQyxXQUFBO01BQUMsU0FBQyxDQUFDLENBQUMsQ0FBQTtNQUFDd0UsUUFBQUEsS0FBSyxDQUFDeEUsRUFBRSxDQUFDUyxLQUFLLENBQUNjLEtBQUssSUFBRSxDQUFDLENBQUE7TUFBQ2lELFFBQUFBLEtBQUssQ0FBQ3hFLEVBQUUsQ0FBQ1UsZUFBZSxHQUFDLEtBQUssQ0FBQTtNQUFDLFFBQUEsT0FBTzhELEtBQUssQ0FBQTtNQUFBLE9BQUE7TUFBQyxLQUFBO1VBQUMsU0FBU0Usa0JBQWtCQSxHQUFFO01BQUMsTUFBQSxJQUFHLENBQUMsSUFBSSxDQUFDMUUsRUFBRSxDQUFDekYsR0FBRyxFQUFDO2NBQUN1RywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtNQUFBLE9BQUE7TUFBQyxNQUFBLElBQUcsSUFBSSxDQUFDZCxFQUFFLENBQUNVLGVBQWUsSUFBRSxDQUFDLElBQUksQ0FBQ1YsRUFBRSxDQUFDVyx1QkFBdUIsRUFBQztjQUFDakQsaUJBQWlCLENBQUMsdUNBQXVDLENBQUMsQ0FBQTtNQUFBLE9BQUE7WUFBQ3lELGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtNQUFDRyxNQUFBQSxrQkFBa0IsQ0FBQyxJQUFJLENBQUN0QixFQUFFLENBQUMsQ0FBQTtNQUFDLE1BQUEsSUFBRyxDQUFDLElBQUksQ0FBQ0EsRUFBRSxDQUFDVyx1QkFBdUIsRUFBQztNQUFDLFFBQUEsSUFBSSxDQUFDWCxFQUFFLENBQUNZLFFBQVEsR0FBQ2xPLFNBQVMsQ0FBQTtNQUFDLFFBQUEsSUFBSSxDQUFDc04sRUFBRSxDQUFDekYsR0FBRyxHQUFDN0gsU0FBUyxDQUFBO01BQUEsT0FBQTtNQUFDLEtBQUE7VUFBQyxTQUFTaVMscUJBQXFCQSxHQUFFO01BQUMsTUFBQSxPQUFNLENBQUMsSUFBSSxDQUFDM0UsRUFBRSxDQUFDekYsR0FBRyxDQUFBO01BQUEsS0FBQTtVQUFDLFNBQVNxSyx1QkFBdUJBLEdBQUU7TUFBQyxNQUFBLElBQUcsQ0FBQyxJQUFJLENBQUM1RSxFQUFFLENBQUN6RixHQUFHLEVBQUM7Y0FBQ3VHLDJCQUEyQixDQUFDLElBQUksQ0FBQyxDQUFBO01BQUEsT0FBQTtNQUFDLE1BQUEsSUFBRyxJQUFJLENBQUNkLEVBQUUsQ0FBQ1UsZUFBZSxJQUFFLENBQUMsSUFBSSxDQUFDVixFQUFFLENBQUNXLHVCQUF1QixFQUFDO2NBQUNqRCxpQkFBaUIsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFBO01BQUEsT0FBQTtNQUFDMEUsTUFBQUEsYUFBYSxDQUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO01BQUMsTUFBQSxJQUFHeUQsYUFBYSxDQUFDak0sTUFBTSxLQUFHLENBQUMsSUFBRW9NLGFBQWEsRUFBQztjQUFDQSxhQUFhLENBQUNGLG1CQUFtQixDQUFDLENBQUE7TUFBQSxPQUFBO01BQUMsTUFBQSxJQUFJLENBQUNyQyxFQUFFLENBQUNVLGVBQWUsR0FBQyxJQUFJLENBQUE7TUFBQyxNQUFBLE9BQU8sSUFBSSxDQUFBO01BQUEsS0FBQTtVQUFDLFNBQVNtRSxnQkFBZ0JBLEdBQUU7TUFBQy9FLE1BQUFBLFdBQVcsQ0FBQ3hDLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBQ3NDLHFCQUFxQixDQUFBO01BQUNFLE1BQUFBLFdBQVcsQ0FBQ3hDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBQ2lILGlCQUFpQixDQUFBO01BQUN6RSxNQUFBQSxXQUFXLENBQUN4QyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUNvSCxrQkFBa0IsQ0FBQTtNQUFDNUUsTUFBQUEsV0FBVyxDQUFDeEMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFDcUgscUJBQXFCLENBQUE7TUFBQzdFLE1BQUFBLFdBQVcsQ0FBQ3hDLFNBQVMsQ0FBQyxhQUFhLENBQUMsR0FBQ3NILHVCQUF1QixDQUFBO01BQUEsS0FBQTtVQUFDLFNBQVM5RSxXQUFXQSxHQUFFLEVBQUM7TUFBQyxJQUFBLFNBQVNnRixtQkFBbUJBLENBQUNDLEtBQUssRUFBQ0MsVUFBVSxFQUFDQyxTQUFTLEVBQUM7WUFBQyxJQUFHdlMsU0FBUyxLQUFHcVMsS0FBSyxDQUFDQyxVQUFVLENBQUMsQ0FBQ0UsYUFBYSxFQUFDO01BQUMsUUFBQSxJQUFJQyxRQUFRLEdBQUNKLEtBQUssQ0FBQ0MsVUFBVSxDQUFDLENBQUE7TUFBQ0QsUUFBQUEsS0FBSyxDQUFDQyxVQUFVLENBQUMsR0FBQyxZQUFVO01BQUMsVUFBQSxJQUFHLENBQUNELEtBQUssQ0FBQ0MsVUFBVSxDQUFDLENBQUNFLGFBQWEsQ0FBQ3hHLGNBQWMsQ0FBQzdCLFNBQVMsQ0FBQzFHLE1BQU0sQ0FBQyxFQUFDO01BQUN1SCxZQUFBQSxpQkFBaUIsQ0FBY3VILFlBQUFBLEdBQUFBLFNBQVMsR0FBaURwSSxnREFBQUEsR0FBQUEsU0FBUyxDQUFDMUcsTUFBTSxHQUFBLHNCQUFBLEdBQXVCNE8sS0FBSyxDQUFDQyxVQUFVLENBQUMsQ0FBQ0UsYUFBYSxPQUFJLENBQUMsQ0FBQTtNQUFBLFdBQUE7TUFBQyxVQUFBLE9BQU9ILEtBQUssQ0FBQ0MsVUFBVSxDQUFDLENBQUNFLGFBQWEsQ0FBQ3JJLFNBQVMsQ0FBQzFHLE1BQU0sQ0FBQyxDQUFDeUcsS0FBSyxDQUFDLElBQUksRUFBQ0MsU0FBUyxDQUFDLENBQUE7ZUFBQyxDQUFBO01BQUNrSSxRQUFBQSxLQUFLLENBQUNDLFVBQVUsQ0FBQyxDQUFDRSxhQUFhLEdBQUMsRUFBRSxDQUFBO2NBQUNILEtBQUssQ0FBQ0MsVUFBVSxDQUFDLENBQUNFLGFBQWEsQ0FBQ0MsUUFBUSxDQUFDQyxRQUFRLENBQUMsR0FBQ0QsUUFBUSxDQUFBO01BQUEsT0FBQTtNQUFDLEtBQUE7TUFBQyxJQUFBLFNBQVNFLGtCQUFrQkEsQ0FBQ2xLLElBQUksRUFBQ29HLEtBQUssRUFBQytELFlBQVksRUFBQztNQUFDLE1BQUEsSUFBRzNTLE1BQU0sQ0FBQytMLGNBQWMsQ0FBQ3ZELElBQUksQ0FBQyxFQUFDO2NBQUMsSUFBR3pJLFNBQVMsS0FBRzRTLFlBQVksSUFBRTVTLFNBQVMsS0FBR0MsTUFBTSxDQUFDd0ksSUFBSSxDQUFDLENBQUMrSixhQUFhLElBQUV4UyxTQUFTLEtBQUdDLE1BQU0sQ0FBQ3dJLElBQUksQ0FBQyxDQUFDK0osYUFBYSxDQUFDSSxZQUFZLENBQUMsRUFBQztnQkFBQzVILGlCQUFpQixDQUFBLCtCQUFBLEdBQWlDdkMsSUFBSSxHQUFBLFNBQVMsQ0FBQyxDQUFBO01BQUEsU0FBQTtNQUFDMkosUUFBQUEsbUJBQW1CLENBQUNuUyxNQUFNLEVBQUN3SSxJQUFJLEVBQUNBLElBQUksQ0FBQyxDQUFBO01BQUMsUUFBQSxJQUFHeEksTUFBTSxDQUFDK0wsY0FBYyxDQUFDNEcsWUFBWSxDQUFDLEVBQUM7Z0JBQUM1SCxpQkFBaUIsQ0FBQSxzRkFBQSxHQUF3RjRILFlBQVksR0FBQSxJQUFJLENBQUMsQ0FBQTtNQUFBLFNBQUE7Y0FBQzNTLE1BQU0sQ0FBQ3dJLElBQUksQ0FBQyxDQUFDK0osYUFBYSxDQUFDSSxZQUFZLENBQUMsR0FBQy9ELEtBQUssQ0FBQTtNQUFBLE9BQUMsTUFBSTtNQUFDNU8sUUFBQUEsTUFBTSxDQUFDd0ksSUFBSSxDQUFDLEdBQUNvRyxLQUFLLENBQUE7Y0FBQyxJQUFHN08sU0FBUyxLQUFHNFMsWUFBWSxFQUFDO01BQUMzUyxVQUFBQSxNQUFNLENBQUN3SSxJQUFJLENBQUMsQ0FBQ21LLFlBQVksR0FBQ0EsWUFBWSxDQUFBO01BQUEsU0FBQTtNQUFDLE9BQUE7TUFBQyxLQUFBO01BQUMsSUFBQSxTQUFTQyxlQUFlQSxDQUFDcEssSUFBSSxFQUFDcUMsV0FBVyxFQUFDaUcsaUJBQWlCLEVBQUNwQyxhQUFhLEVBQUNmLFNBQVMsRUFBQ3NELGFBQWEsRUFBQ3JELE1BQU0sRUFBQ3NCLFFBQVEsRUFBQztZQUFDLElBQUksQ0FBQzFHLElBQUksR0FBQ0EsSUFBSSxDQUFBO1lBQUMsSUFBSSxDQUFDcUMsV0FBVyxHQUFDQSxXQUFXLENBQUE7WUFBQyxJQUFJLENBQUNpRyxpQkFBaUIsR0FBQ0EsaUJBQWlCLENBQUE7WUFBQyxJQUFJLENBQUNwQyxhQUFhLEdBQUNBLGFBQWEsQ0FBQTtZQUFDLElBQUksQ0FBQ2YsU0FBUyxHQUFDQSxTQUFTLENBQUE7WUFBQyxJQUFJLENBQUNzRCxhQUFhLEdBQUNBLGFBQWEsQ0FBQTtZQUFDLElBQUksQ0FBQ3JELE1BQU0sR0FBQ0EsTUFBTSxDQUFBO1lBQUMsSUFBSSxDQUFDc0IsUUFBUSxHQUFDQSxRQUFRLENBQUE7WUFBQyxJQUFJLENBQUMyRCxvQkFBb0IsR0FBQyxFQUFFLENBQUE7TUFBQSxLQUFBO01BQUMsSUFBQSxTQUFTQyxhQUFhQSxDQUFDbEwsR0FBRyxFQUFDbUgsUUFBUSxFQUFDQyxZQUFZLEVBQUM7WUFBQyxPQUFNRCxRQUFRLEtBQUdDLFlBQVksRUFBQztNQUFDLFFBQUEsSUFBRyxDQUFDRCxRQUFRLENBQUNuQixNQUFNLEVBQUM7Z0JBQUM3QyxpQkFBaUIsQ0FBQSwrQkFBQSxHQUFpQ2lFLFlBQVksQ0FBQ3hHLElBQUksNkJBQXdCdUcsUUFBUSxDQUFDdkcsSUFBTSxDQUFDLENBQUE7TUFBQSxTQUFBO01BQUNaLFFBQUFBLEdBQUcsR0FBQ21ILFFBQVEsQ0FBQ25CLE1BQU0sQ0FBQ2hHLEdBQUcsQ0FBQyxDQUFBO2NBQUNtSCxRQUFRLEdBQUNBLFFBQVEsQ0FBQ3BCLFNBQVMsQ0FBQTtNQUFBLE9BQUE7TUFBQyxNQUFBLE9BQU8vRixHQUFHLENBQUE7TUFBQSxLQUFBO01BQUMsSUFBQSxTQUFTbUwsbUNBQW1DQSxDQUFDcEcsV0FBVyxFQUFDMkIsTUFBTSxFQUFDO1lBQUMsSUFBR0EsTUFBTSxLQUFHLElBQUksRUFBQztjQUFDLElBQUcsSUFBSSxDQUFDMEUsV0FBVyxFQUFDO01BQUNqSSxVQUFBQSxpQkFBaUIsQ0FBd0Isc0JBQUEsR0FBQSxJQUFJLENBQUN2QyxJQUFNLENBQUMsQ0FBQTtNQUFBLFNBQUE7TUFBQyxRQUFBLE9BQU8sQ0FBQyxDQUFBO01BQUEsT0FBQTtNQUFDLE1BQUEsSUFBRyxDQUFDOEYsTUFBTSxDQUFDakIsRUFBRSxFQUFDO2NBQUN0QyxpQkFBaUIsQ0FBQSxnQkFBQSxHQUFpQmtJLFVBQVUsQ0FBQzNFLE1BQU0sQ0FBQyxHQUFVLFVBQUEsR0FBQSxJQUFJLENBQUM5RixJQUFNLENBQUMsQ0FBQTtNQUFBLE9BQUE7TUFBQyxNQUFBLElBQUcsQ0FBQzhGLE1BQU0sQ0FBQ2pCLEVBQUUsQ0FBQ3pGLEdBQUcsRUFBQztNQUFDbUQsUUFBQUEsaUJBQWlCLENBQW9ELGtEQUFBLEdBQUEsSUFBSSxDQUFDdkMsSUFBTSxDQUFDLENBQUE7TUFBQSxPQUFBO1lBQUMsSUFBSTBLLFdBQVcsR0FBQzVFLE1BQU0sQ0FBQ2pCLEVBQUUsQ0FBQ0MsT0FBTyxDQUFDQyxlQUFlLENBQUE7TUFBQyxNQUFBLElBQUkzRixHQUFHLEdBQUNrTCxhQUFhLENBQUN4RSxNQUFNLENBQUNqQixFQUFFLENBQUN6RixHQUFHLEVBQUNzTCxXQUFXLEVBQUMsSUFBSSxDQUFDM0YsZUFBZSxDQUFDLENBQUE7TUFBQyxNQUFBLE9BQU8zRixHQUFHLENBQUE7TUFBQSxLQUFBO01BQUMsSUFBQSxTQUFTdUwsd0JBQXdCQSxDQUFDeEcsV0FBVyxFQUFDMkIsTUFBTSxFQUFDO01BQUMsTUFBQSxJQUFJMUcsR0FBRyxDQUFBO1lBQUMsSUFBRzBHLE1BQU0sS0FBRyxJQUFJLEVBQUM7Y0FBQyxJQUFHLElBQUksQ0FBQzBFLFdBQVcsRUFBQztNQUFDakksVUFBQUEsaUJBQWlCLENBQXdCLHNCQUFBLEdBQUEsSUFBSSxDQUFDdkMsSUFBTSxDQUFDLENBQUE7TUFBQSxTQUFBO2NBQUMsSUFBRyxJQUFJLENBQUNxSSxjQUFjLEVBQUM7TUFBQ2pKLFVBQUFBLEdBQUcsR0FBQyxJQUFJLENBQUN3TCxjQUFjLEVBQUUsQ0FBQTtnQkFBQyxJQUFHekcsV0FBVyxLQUFHLElBQUksRUFBQztrQkFBQ0EsV0FBVyxDQUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDMEMsYUFBYSxFQUFDOUcsR0FBRyxDQUFDLENBQUE7TUFBQSxXQUFBO01BQUMsVUFBQSxPQUFPQSxHQUFHLENBQUE7TUFBQSxTQUFDLE1BQUk7TUFBQyxVQUFBLE9BQU8sQ0FBQyxDQUFBO01BQUEsU0FBQTtNQUFDLE9BQUE7TUFBQyxNQUFBLElBQUcsQ0FBQzBHLE1BQU0sQ0FBQ2pCLEVBQUUsRUFBQztjQUFDdEMsaUJBQWlCLENBQUEsZ0JBQUEsR0FBaUJrSSxVQUFVLENBQUMzRSxNQUFNLENBQUMsR0FBVSxVQUFBLEdBQUEsSUFBSSxDQUFDOUYsSUFBTSxDQUFDLENBQUE7TUFBQSxPQUFBO01BQUMsTUFBQSxJQUFHLENBQUM4RixNQUFNLENBQUNqQixFQUFFLENBQUN6RixHQUFHLEVBQUM7TUFBQ21ELFFBQUFBLGlCQUFpQixDQUFvRCxrREFBQSxHQUFBLElBQUksQ0FBQ3ZDLElBQU0sQ0FBQyxDQUFBO01BQUEsT0FBQTtNQUFDLE1BQUEsSUFBRyxDQUFDLElBQUksQ0FBQzZJLE9BQU8sSUFBRS9DLE1BQU0sQ0FBQ2pCLEVBQUUsQ0FBQ0MsT0FBTyxDQUFDK0QsT0FBTyxFQUFDO2NBQUN0RyxpQkFBaUIsQ0FBQSxrQ0FBQSxJQUFvQ3VELE1BQU0sQ0FBQ2pCLEVBQUUsQ0FBQ2EsWUFBWSxHQUFDSSxNQUFNLENBQUNqQixFQUFFLENBQUNhLFlBQVksQ0FBQzFGLElBQUksR0FBQzhGLE1BQU0sQ0FBQ2pCLEVBQUUsQ0FBQ0MsT0FBTyxDQUFDOUUsSUFBSSxDQUFzQixHQUFBLHFCQUFBLEdBQUEsSUFBSSxDQUFDQSxJQUFNLENBQUMsQ0FBQTtNQUFBLE9BQUE7WUFBQyxJQUFJMEssV0FBVyxHQUFDNUUsTUFBTSxDQUFDakIsRUFBRSxDQUFDQyxPQUFPLENBQUNDLGVBQWUsQ0FBQTtNQUFDM0YsTUFBQUEsR0FBRyxHQUFDa0wsYUFBYSxDQUFDeEUsTUFBTSxDQUFDakIsRUFBRSxDQUFDekYsR0FBRyxFQUFDc0wsV0FBVyxFQUFDLElBQUksQ0FBQzNGLGVBQWUsQ0FBQyxDQUFBO1lBQUMsSUFBRyxJQUFJLENBQUNzRCxjQUFjLEVBQUM7TUFBQyxRQUFBLElBQUc5USxTQUFTLEtBQUd1TyxNQUFNLENBQUNqQixFQUFFLENBQUNZLFFBQVEsRUFBQztnQkFBQ2xELGlCQUFpQixDQUFDLGlEQUFpRCxDQUFDLENBQUE7TUFBQSxTQUFBO2NBQUMsUUFBTyxJQUFJLENBQUNzSSxhQUFhO01BQUUsVUFBQSxLQUFLLENBQUM7TUFBQyxZQUFBLElBQUcvRSxNQUFNLENBQUNqQixFQUFFLENBQUNhLFlBQVksS0FBRyxJQUFJLEVBQUM7TUFBQ3RHLGNBQUFBLEdBQUcsR0FBQzBHLE1BQU0sQ0FBQ2pCLEVBQUUsQ0FBQ1ksUUFBUSxDQUFBO01BQUEsYUFBQyxNQUFJO29CQUFDbEQsaUJBQWlCLENBQUEsa0NBQUEsSUFBb0N1RCxNQUFNLENBQUNqQixFQUFFLENBQUNhLFlBQVksR0FBQ0ksTUFBTSxDQUFDakIsRUFBRSxDQUFDYSxZQUFZLENBQUMxRixJQUFJLEdBQUM4RixNQUFNLENBQUNqQixFQUFFLENBQUNDLE9BQU8sQ0FBQzlFLElBQUksQ0FBc0IsR0FBQSxxQkFBQSxHQUFBLElBQUksQ0FBQ0EsSUFBTSxDQUFDLENBQUE7TUFBQSxhQUFBO01BQUMsWUFBQSxNQUFBO01BQU0sVUFBQSxLQUFLLENBQUM7TUFBQ1osWUFBQUEsR0FBRyxHQUFDMEcsTUFBTSxDQUFDakIsRUFBRSxDQUFDWSxRQUFRLENBQUE7TUFBQyxZQUFBLE1BQUE7TUFBTSxVQUFBLEtBQUssQ0FBQztNQUFDLFlBQUEsSUFBR0ssTUFBTSxDQUFDakIsRUFBRSxDQUFDYSxZQUFZLEtBQUcsSUFBSSxFQUFDO01BQUN0RyxjQUFBQSxHQUFHLEdBQUMwRyxNQUFNLENBQUNqQixFQUFFLENBQUNZLFFBQVEsQ0FBQTtNQUFBLGFBQUMsTUFBSTtNQUFDLGNBQUEsSUFBSXFGLFlBQVksR0FBQ2hGLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFBO29CQUFDMUcsR0FBRyxHQUFDLElBQUksQ0FBQzJMLFFBQVEsQ0FBQzNMLEdBQUcsRUFBQzRMLEtBQUssQ0FBQ0MsUUFBUSxDQUFDLFlBQVU7TUFBQ0gsZ0JBQUFBLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFBO01BQUEsZUFBQyxDQUFDLENBQUMsQ0FBQTtvQkFBQyxJQUFHM0csV0FBVyxLQUFHLElBQUksRUFBQztzQkFBQ0EsV0FBVyxDQUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDMEMsYUFBYSxFQUFDOUcsR0FBRyxDQUFDLENBQUE7TUFBQSxlQUFBO01BQUMsYUFBQTtNQUFDLFlBQUEsTUFBQTtNQUFNLFVBQUE7a0JBQVFtRCxpQkFBaUIsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBO01BQUEsU0FBQTtNQUFDLE9BQUE7TUFBQyxNQUFBLE9BQU9uRCxHQUFHLENBQUE7TUFBQSxLQUFBO01BQUMsSUFBQSxTQUFTOEwsc0NBQXNDQSxDQUFDL0csV0FBVyxFQUFDMkIsTUFBTSxFQUFDO1lBQUMsSUFBR0EsTUFBTSxLQUFHLElBQUksRUFBQztjQUFDLElBQUcsSUFBSSxDQUFDMEUsV0FBVyxFQUFDO01BQUNqSSxVQUFBQSxpQkFBaUIsQ0FBd0Isc0JBQUEsR0FBQSxJQUFJLENBQUN2QyxJQUFNLENBQUMsQ0FBQTtNQUFBLFNBQUE7TUFBQyxRQUFBLE9BQU8sQ0FBQyxDQUFBO01BQUEsT0FBQTtNQUFDLE1BQUEsSUFBRyxDQUFDOEYsTUFBTSxDQUFDakIsRUFBRSxFQUFDO2NBQUN0QyxpQkFBaUIsQ0FBQSxnQkFBQSxHQUFpQmtJLFVBQVUsQ0FBQzNFLE1BQU0sQ0FBQyxHQUFVLFVBQUEsR0FBQSxJQUFJLENBQUM5RixJQUFNLENBQUMsQ0FBQTtNQUFBLE9BQUE7TUFBQyxNQUFBLElBQUcsQ0FBQzhGLE1BQU0sQ0FBQ2pCLEVBQUUsQ0FBQ3pGLEdBQUcsRUFBQztNQUFDbUQsUUFBQUEsaUJBQWlCLENBQW9ELGtEQUFBLEdBQUEsSUFBSSxDQUFDdkMsSUFBTSxDQUFDLENBQUE7TUFBQSxPQUFBO01BQUMsTUFBQSxJQUFHOEYsTUFBTSxDQUFDakIsRUFBRSxDQUFDQyxPQUFPLENBQUMrRCxPQUFPLEVBQUM7TUFBQ3RHLFFBQUFBLGlCQUFpQixDQUFvQ3VELGtDQUFBQSxHQUFBQSxNQUFNLENBQUNqQixFQUFFLENBQUNDLE9BQU8sQ0FBQzlFLElBQUksR0FBc0IscUJBQUEsR0FBQSxJQUFJLENBQUNBLElBQU0sQ0FBQyxDQUFBO01BQUEsT0FBQTtZQUFDLElBQUkwSyxXQUFXLEdBQUM1RSxNQUFNLENBQUNqQixFQUFFLENBQUNDLE9BQU8sQ0FBQ0MsZUFBZSxDQUFBO01BQUMsTUFBQSxJQUFJM0YsR0FBRyxHQUFDa0wsYUFBYSxDQUFDeEUsTUFBTSxDQUFDakIsRUFBRSxDQUFDekYsR0FBRyxFQUFDc0wsV0FBVyxFQUFDLElBQUksQ0FBQzNGLGVBQWUsQ0FBQyxDQUFBO01BQUMsTUFBQSxPQUFPM0YsR0FBRyxDQUFBO01BQUEsS0FBQTtVQUFDLFNBQVMrTCwwQkFBMEJBLENBQUM3RyxPQUFPLEVBQUM7WUFBQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzFLLE1BQU0sQ0FBQzBLLE9BQU8sSUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO01BQUEsS0FBQTtVQUFDLFNBQVM4Ryw0QkFBNEJBLENBQUNoTSxHQUFHLEVBQUM7WUFBQyxJQUFHLElBQUksQ0FBQ2lNLGFBQWEsRUFBQztNQUFDak0sUUFBQUEsR0FBRyxHQUFDLElBQUksQ0FBQ2lNLGFBQWEsQ0FBQ2pNLEdBQUcsQ0FBQyxDQUFBO01BQUEsT0FBQTtNQUFDLE1BQUEsT0FBT0EsR0FBRyxDQUFBO01BQUEsS0FBQTtVQUFDLFNBQVNrTSw0QkFBNEJBLENBQUNsTSxHQUFHLEVBQUM7WUFBQyxJQUFHLElBQUksQ0FBQzhHLGFBQWEsRUFBQztNQUFDLFFBQUEsSUFBSSxDQUFDQSxhQUFhLENBQUM5RyxHQUFHLENBQUMsQ0FBQTtNQUFBLE9BQUE7TUFBQyxLQUFBO1VBQUMsU0FBU21NLDhCQUE4QkEsQ0FBQ3pGLE1BQU0sRUFBQztZQUFDLElBQUdBLE1BQU0sS0FBRyxJQUFJLEVBQUM7TUFBQ0EsUUFBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUE7TUFBQSxPQUFBO01BQUMsS0FBQTtVQUFDLFNBQVMwRixzQkFBc0JBLEdBQUU7TUFBQ0MsTUFBQUEsaUJBQWlCLENBQUN0SixTQUFTLENBQUMrRixVQUFVLEdBQUNrRCw0QkFBNEIsQ0FBQTtNQUFDSyxNQUFBQSxpQkFBaUIsQ0FBQ3RKLFNBQVMsQ0FBQ2dHLFVBQVUsR0FBQ21ELDRCQUE0QixDQUFBO01BQUNHLE1BQUFBLGlCQUFpQixDQUFDdEosU0FBUyxDQUFDLGdCQUFnQixDQUFDLEdBQUMsQ0FBQyxDQUFBO01BQUNzSixNQUFBQSxpQkFBaUIsQ0FBQ3RKLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxHQUFDZ0osMEJBQTBCLENBQUE7TUFBQ00sTUFBQUEsaUJBQWlCLENBQUN0SixTQUFTLENBQUMsY0FBYyxDQUFDLEdBQUNvSiw4QkFBOEIsQ0FBQTtNQUFDRSxNQUFBQSxpQkFBaUIsQ0FBQ3RKLFNBQVMsQ0FBQyxjQUFjLENBQUMsR0FBQzZGLDhCQUE4QixDQUFBO01BQUEsS0FBQTtVQUFDLFNBQVN5RCxpQkFBaUJBLENBQUN6TCxJQUFJLEVBQUMrRSxlQUFlLEVBQUN5RixXQUFXLEVBQUMzQixPQUFPLEVBQUNSLGNBQWMsRUFBQ0UsV0FBVyxFQUFDc0MsYUFBYSxFQUFDUSxhQUFhLEVBQUNULGNBQWMsRUFBQ0csUUFBUSxFQUFDN0UsYUFBYSxFQUFDO1lBQUMsSUFBSSxDQUFDbEcsSUFBSSxHQUFDQSxJQUFJLENBQUE7WUFBQyxJQUFJLENBQUMrRSxlQUFlLEdBQUNBLGVBQWUsQ0FBQTtZQUFDLElBQUksQ0FBQ3lGLFdBQVcsR0FBQ0EsV0FBVyxDQUFBO1lBQUMsSUFBSSxDQUFDM0IsT0FBTyxHQUFDQSxPQUFPLENBQUE7WUFBQyxJQUFJLENBQUNSLGNBQWMsR0FBQ0EsY0FBYyxDQUFBO1lBQUMsSUFBSSxDQUFDRSxXQUFXLEdBQUNBLFdBQVcsQ0FBQTtZQUFDLElBQUksQ0FBQ3NDLGFBQWEsR0FBQ0EsYUFBYSxDQUFBO1lBQUMsSUFBSSxDQUFDUSxhQUFhLEdBQUNBLGFBQWEsQ0FBQTtZQUFDLElBQUksQ0FBQ1QsY0FBYyxHQUFDQSxjQUFjLENBQUE7WUFBQyxJQUFJLENBQUNHLFFBQVEsR0FBQ0EsUUFBUSxDQUFBO1lBQUMsSUFBSSxDQUFDN0UsYUFBYSxHQUFDQSxhQUFhLENBQUE7WUFBQyxJQUFHLENBQUNtQyxjQUFjLElBQUV0RCxlQUFlLENBQUNJLFNBQVMsS0FBRzVOLFNBQVMsRUFBQztNQUFDLFFBQUEsSUFBR3NSLE9BQU8sRUFBQztNQUFDLFVBQUEsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFDMEIsbUNBQW1DLENBQUE7Z0JBQUMsSUFBSSxDQUFDL0Ysa0JBQWtCLEdBQUMsSUFBSSxDQUFBO01BQUEsU0FBQyxNQUFJO01BQUMsVUFBQSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUMwRyxzQ0FBc0MsQ0FBQTtnQkFBQyxJQUFJLENBQUMxRyxrQkFBa0IsR0FBQyxJQUFJLENBQUE7TUFBQSxTQUFBO01BQUMsT0FBQyxNQUFJO01BQUMsUUFBQSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUNtRyx3QkFBd0IsQ0FBQTtNQUFBLE9BQUE7TUFBQyxLQUFBO01BQUMsSUFBQSxTQUFTZSxtQkFBbUJBLENBQUMxTCxJQUFJLEVBQUNvRyxLQUFLLEVBQUMrRCxZQUFZLEVBQUM7TUFBQyxNQUFBLElBQUcsQ0FBQzNTLE1BQU0sQ0FBQytMLGNBQWMsQ0FBQ3ZELElBQUksQ0FBQyxFQUFDO2NBQUN5QyxrQkFBa0IsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFBO01BQUEsT0FBQTtNQUFDLE1BQUEsSUFBR2xMLFNBQVMsS0FBR0MsTUFBTSxDQUFDd0ksSUFBSSxDQUFDLENBQUMrSixhQUFhLElBQUV4UyxTQUFTLEtBQUc0UyxZQUFZLEVBQUM7Y0FBQzNTLE1BQU0sQ0FBQ3dJLElBQUksQ0FBQyxDQUFDK0osYUFBYSxDQUFDSSxZQUFZLENBQUMsR0FBQy9ELEtBQUssQ0FBQTtNQUFBLE9BQUMsTUFBSTtNQUFDNU8sUUFBQUEsTUFBTSxDQUFDd0ksSUFBSSxDQUFDLEdBQUNvRyxLQUFLLENBQUE7TUFBQzVPLFFBQUFBLE1BQU0sQ0FBQ3dJLElBQUksQ0FBQyxDQUFDaUssUUFBUSxHQUFDRSxZQUFZLENBQUE7TUFBQSxPQUFBO01BQUMsS0FBQTtNQUFDLElBQUEsU0FBU3dCLGFBQWFBLENBQUNDLEdBQUcsRUFBQ3hNLEdBQUcsRUFBQ3lNLElBQUksRUFBQztNQUFDLE1BQUEsSUFBSXpLLENBQUMsR0FBQzVKLE1BQU0sQ0FBQyxVQUFVLEdBQUNvVSxHQUFHLENBQUMsQ0FBQTtNQUFDLE1BQUEsT0FBT0MsSUFBSSxJQUFFQSxJQUFJLENBQUM3USxNQUFNLEdBQUNvRyxDQUFDLENBQUNLLEtBQUssQ0FBQyxJQUFJLEVBQUMsQ0FBQ3JDLEdBQUcsQ0FBQyxDQUFDME0sTUFBTSxDQUFDRCxJQUFJLENBQUMsQ0FBQyxHQUFDekssQ0FBQyxDQUFDdUgsSUFBSSxDQUFDLElBQUksRUFBQ3ZKLEdBQUcsQ0FBQyxDQUFBO01BQUEsS0FBQTtVQUFDLElBQUkyTSxlQUFlLEdBQUMsRUFBRSxDQUFBO1VBQUMsU0FBU0MsaUJBQWlCQSxDQUFDQyxPQUFPLEVBQUM7TUFBQyxNQUFBLElBQUlDLElBQUksR0FBQ0gsZUFBZSxDQUFDRSxPQUFPLENBQUMsQ0FBQTtZQUFDLElBQUcsQ0FBQ0MsSUFBSSxFQUFDO01BQUMsUUFBQSxJQUFHRCxPQUFPLElBQUVGLGVBQWUsQ0FBQy9RLE1BQU0sRUFBQytRLGVBQWUsQ0FBQy9RLE1BQU0sR0FBQ2lSLE9BQU8sR0FBQyxDQUFDLENBQUE7Y0FBQ0YsZUFBZSxDQUFDRSxPQUFPLENBQUMsR0FBQ0MsSUFBSSxHQUFDdlIsU0FBUyxDQUFDd1IsR0FBRyxDQUFDRixPQUFPLENBQUMsQ0FBQTtNQUFBLE9BQUE7TUFBQyxNQUFBLE9BQU9DLElBQUksQ0FBQTtNQUFBLEtBQUE7TUFBQyxJQUFBLFNBQVNFLE9BQU9BLENBQUNSLEdBQUcsRUFBQ3hNLEdBQUcsRUFBQ3lNLElBQUksRUFBQztNQUFDLE1BQUEsSUFBR0QsR0FBRyxDQUFDUyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUM7TUFBQyxRQUFBLE9BQU9WLGFBQWEsQ0FBQ0MsR0FBRyxFQUFDeE0sR0FBRyxFQUFDeU0sSUFBSSxDQUFDLENBQUE7TUFBQSxPQUFBO01BQUMsTUFBQSxJQUFJUyxHQUFHLEdBQUNOLGlCQUFpQixDQUFDNU0sR0FBRyxDQUFDLENBQUNxQyxLQUFLLENBQUMsSUFBSSxFQUFDb0ssSUFBSSxDQUFDLENBQUE7TUFBQyxNQUFBLE9BQU9TLEdBQUcsQ0FBQTtNQUFBLEtBQUE7TUFBQyxJQUFBLFNBQVNDLFlBQVlBLENBQUNYLEdBQUcsRUFBQ3hNLEdBQUcsRUFBQztZQUFDLElBQUlvTixRQUFRLEdBQUMsRUFBRSxDQUFBO01BQUMsTUFBQSxPQUFPLFlBQVU7Y0FBQ0EsUUFBUSxDQUFDeFIsTUFBTSxHQUFDLENBQUMsQ0FBQTtNQUFDakQsUUFBQUEsTUFBTSxDQUFDQyxNQUFNLENBQUN3VSxRQUFRLEVBQUM5SyxTQUFTLENBQUMsQ0FBQTtNQUFDLFFBQUEsT0FBTzBLLE9BQU8sQ0FBQ1IsR0FBRyxFQUFDeE0sR0FBRyxFQUFDb04sUUFBUSxDQUFDLENBQUE7YUFBQyxDQUFBO01BQUEsS0FBQTtNQUFDLElBQUEsU0FBU0MsdUJBQXVCQSxDQUFDQyxTQUFTLEVBQUNDLFdBQVcsRUFBQztNQUFDRCxNQUFBQSxTQUFTLEdBQUMvTCxnQkFBZ0IsQ0FBQytMLFNBQVMsQ0FBQyxDQUFBO1lBQUMsU0FBU0UsYUFBYUEsR0FBRTtNQUFDLFFBQUEsSUFBR0YsU0FBUyxDQUFDTCxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUM7TUFBQyxVQUFBLE9BQU9FLFlBQVksQ0FBQ0csU0FBUyxFQUFDQyxXQUFXLENBQUMsQ0FBQTtNQUFBLFNBQUE7Y0FBQyxPQUFPWCxpQkFBaUIsQ0FBQ1csV0FBVyxDQUFDLENBQUE7TUFBQSxPQUFBO01BQUMsTUFBQSxJQUFJRSxFQUFFLEdBQUNELGFBQWEsRUFBRSxDQUFBO01BQUMsTUFBQSxJQUFHLE9BQU9DLEVBQUUsSUFBRSxVQUFVLEVBQUM7TUFBQ3RLLFFBQUFBLGlCQUFpQixDQUE0Q21LLDBDQUFBQSxHQUFBQSxTQUFTLEdBQUtDLElBQUFBLEdBQUFBLFdBQWEsQ0FBQyxDQUFBO01BQUEsT0FBQTtNQUFDLE1BQUEsT0FBT0UsRUFBRSxDQUFBO01BQUEsS0FBQTtVQUFDLElBQUlDLGdCQUFnQixHQUFDdlYsU0FBUyxDQUFBO1VBQUMsU0FBU3dWLFdBQVdBLENBQUNoSyxJQUFJLEVBQUM7TUFBQyxNQUFBLElBQUkzRCxHQUFHLEdBQUM0TixZQUFjLENBQUNqSyxJQUFJLENBQUMsQ0FBQTtNQUFDLE1BQUEsSUFBSTBELEVBQUUsR0FBQzlGLGdCQUFnQixDQUFDdkIsR0FBRyxDQUFDLENBQUE7WUFBQzZOLE1BQUssQ0FBQzdOLEdBQUcsQ0FBQyxDQUFBO01BQUMsTUFBQSxPQUFPcUgsRUFBRSxDQUFBO01BQUEsS0FBQTtNQUFDLElBQUEsU0FBU3lHLHFCQUFxQkEsQ0FBQ25MLE9BQU8sRUFBQ29MLEtBQUssRUFBQztZQUFDLElBQUlDLFlBQVksR0FBQyxFQUFFLENBQUE7WUFBQyxJQUFJQyxJQUFJLEdBQUMsRUFBRSxDQUFBO1lBQUMsU0FBU0MsS0FBS0EsQ0FBQ3ZLLElBQUksRUFBQztNQUFDLFFBQUEsSUFBR3NLLElBQUksQ0FBQ3RLLElBQUksQ0FBQyxFQUFDO01BQUMsVUFBQSxPQUFBO01BQU0sU0FBQTtNQUFDLFFBQUEsSUFBR2hDLGVBQWUsQ0FBQ2dDLElBQUksQ0FBQyxFQUFDO01BQUMsVUFBQSxPQUFBO01BQU0sU0FBQTtNQUFDLFFBQUEsSUFBRy9CLGdCQUFnQixDQUFDK0IsSUFBSSxDQUFDLEVBQUM7TUFBQy9CLFVBQUFBLGdCQUFnQixDQUFDK0IsSUFBSSxDQUFDLENBQUNELE9BQU8sQ0FBQ3dLLEtBQUssQ0FBQyxDQUFBO01BQUMsVUFBQSxPQUFBO01BQU0sU0FBQTtNQUFDRixRQUFBQSxZQUFZLENBQUM1SixJQUFJLENBQUNULElBQUksQ0FBQyxDQUFBO01BQUNzSyxRQUFBQSxJQUFJLENBQUN0SyxJQUFJLENBQUMsR0FBQyxJQUFJLENBQUE7TUFBQSxPQUFBO01BQUNvSyxNQUFBQSxLQUFLLENBQUNySyxPQUFPLENBQUN3SyxLQUFLLENBQUMsQ0FBQTtNQUFDLE1BQUEsTUFBTSxJQUFJUixnQkFBZ0IsQ0FBSS9LLE9BQU8sR0FBS3FMLElBQUFBLEdBQUFBLFlBQVksQ0FBQ0csR0FBRyxDQUFDUixXQUFXLENBQUMsQ0FBQ1MsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO01BQUEsS0FBQTtVQUFDLFNBQVNDLHVCQUF1QkEsQ0FBQ2hLLE9BQU8sRUFBQ2lLLGNBQWMsRUFBQ0MsbUJBQW1CLEVBQUNDLGdCQUFnQixFQUFDQyxzQkFBc0IsRUFBQ3BGLGFBQWEsRUFBQ3FGLGVBQWUsRUFBQzFJLE1BQU0sRUFBQzJJLGlCQUFpQixFQUFDckgsUUFBUSxFQUFDMUcsSUFBSSxFQUFDZ08sbUJBQW1CLEVBQUM5SCxhQUFhLEVBQUM7TUFBQ2xHLE1BQUFBLElBQUksR0FBQ1csZ0JBQWdCLENBQUNYLElBQUksQ0FBQyxDQUFBO01BQUN5SSxNQUFBQSxhQUFhLEdBQUNnRSx1QkFBdUIsQ0FBQ29CLHNCQUFzQixFQUFDcEYsYUFBYSxDQUFDLENBQUE7TUFBQyxNQUFBLElBQUdyRCxNQUFNLEVBQUM7TUFBQ0EsUUFBQUEsTUFBTSxHQUFDcUgsdUJBQXVCLENBQUNxQixlQUFlLEVBQUMxSSxNQUFNLENBQUMsQ0FBQTtNQUFBLE9BQUE7TUFBQyxNQUFBLElBQUdzQixRQUFRLEVBQUM7TUFBQ0EsUUFBQUEsUUFBUSxHQUFDK0YsdUJBQXVCLENBQUNzQixpQkFBaUIsRUFBQ3JILFFBQVEsQ0FBQyxDQUFBO01BQUEsT0FBQTtNQUFDUixNQUFBQSxhQUFhLEdBQUN1Ryx1QkFBdUIsQ0FBQ3VCLG1CQUFtQixFQUFDOUgsYUFBYSxDQUFDLENBQUE7TUFBQyxNQUFBLElBQUkrSCxpQkFBaUIsR0FBQzlNLHFCQUFxQixDQUFDbkIsSUFBSSxDQUFDLENBQUE7WUFBQ2tLLGtCQUFrQixDQUFDK0QsaUJBQWlCLEVBQUMsWUFBVTtNQUFDZixRQUFBQSxxQkFBcUIsdUJBQXFCbE4sSUFBSSxHQUFBLHVCQUFBLEVBQXdCLENBQUM0TixnQkFBZ0IsQ0FBQyxDQUFDLENBQUE7TUFBQSxPQUFDLENBQUMsQ0FBQTtNQUFDbEwsTUFBQUEsNkJBQTZCLENBQUMsQ0FBQ2UsT0FBTyxFQUFDaUssY0FBYyxFQUFDQyxtQkFBbUIsQ0FBQyxFQUFDQyxnQkFBZ0IsR0FBQyxDQUFDQSxnQkFBZ0IsQ0FBQyxHQUFDLEVBQUUsRUFBQyxVQUFTTSxJQUFJLEVBQUM7TUFBQ0EsUUFBQUEsSUFBSSxHQUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7TUFBQyxRQUFBLElBQUkvSSxTQUFTLENBQUE7TUFBQyxRQUFBLElBQUlnSixhQUFhLENBQUE7TUFBQyxRQUFBLElBQUdQLGdCQUFnQixFQUFDO2dCQUFDekksU0FBUyxHQUFDK0ksSUFBSSxDQUFDbkosZUFBZSxDQUFBO2dCQUFDb0osYUFBYSxHQUFDaEosU0FBUyxDQUFDbUQsaUJBQWlCLENBQUE7TUFBQSxTQUFDLE1BQUk7Z0JBQUM2RixhQUFhLEdBQUN4SixXQUFXLENBQUN4QyxTQUFTLENBQUE7TUFBQSxTQUFBO01BQUMsUUFBQSxJQUFJRSxXQUFXLEdBQUNmLG1CQUFtQixDQUFDMk0saUJBQWlCLEVBQUMsWUFBVTtnQkFBQyxJQUFHbFcsTUFBTSxDQUFDdVIsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFHaEIsaUJBQWlCLEVBQUM7TUFBQyxZQUFBLE1BQU0sSUFBSWhHLFlBQVksQ0FBQyx5QkFBeUIsR0FBQ3RDLElBQUksQ0FBQyxDQUFBO01BQUEsV0FBQTtNQUFDLFVBQUEsSUFBR3pJLFNBQVMsS0FBR3dOLGVBQWUsQ0FBQ3FKLGdCQUFnQixFQUFDO01BQUMsWUFBQSxNQUFNLElBQUk5TCxZQUFZLENBQUN0QyxJQUFJLEdBQUMsZ0NBQWdDLENBQUMsQ0FBQTtNQUFBLFdBQUE7Z0JBQUMsSUFBSXVCLElBQUksR0FBQ3dELGVBQWUsQ0FBQ3FKLGdCQUFnQixDQUFDMU0sU0FBUyxDQUFDMUcsTUFBTSxDQUFDLENBQUE7Z0JBQUMsSUFBR3pELFNBQVMsS0FBR2dLLElBQUksRUFBQztrQkFBQyxNQUFNLElBQUllLFlBQVksQ0FBNEJ0QywwQkFBQUEsR0FBQUEsSUFBSSw0Q0FBdUMwQixTQUFTLENBQUMxRyxNQUFNLEdBQUEsZ0JBQUEsR0FBaUJqRCxNQUFNLENBQUM4TyxJQUFJLENBQUM5QixlQUFlLENBQUNxSixnQkFBZ0IsQ0FBQyxDQUFDbE0sUUFBUSxFQUFFLEdBQUEsdUJBQXVCLENBQUMsQ0FBQTtNQUFBLFdBQUE7TUFBQyxVQUFBLE9BQU9YLElBQUksQ0FBQ0UsS0FBSyxDQUFDLElBQUksRUFBQ0MsU0FBUyxDQUFDLENBQUE7TUFBQSxTQUFDLENBQUMsQ0FBQTtNQUFDLFFBQUEsSUFBSTRHLGlCQUFpQixHQUFDdlEsTUFBTSxDQUFDcUssTUFBTSxDQUFDK0wsYUFBYSxFQUFDO01BQUM5TCxVQUFBQSxXQUFXLEVBQUM7TUFBQytELFlBQUFBLEtBQUssRUFBQy9ELFdBQUFBO01BQVcsV0FBQTtNQUFDLFNBQUMsQ0FBQyxDQUFBO2NBQUNBLFdBQVcsQ0FBQ0YsU0FBUyxHQUFDbUcsaUJBQWlCLENBQUE7Y0FBQyxJQUFJdkQsZUFBZSxHQUFDLElBQUlxRixlQUFlLENBQUNwSyxJQUFJLEVBQUNxQyxXQUFXLEVBQUNpRyxpQkFBaUIsRUFBQ3BDLGFBQWEsRUFBQ2YsU0FBUyxFQUFDc0QsYUFBYSxFQUFDckQsTUFBTSxFQUFDc0IsUUFBUSxDQUFDLENBQUE7Y0FBQyxJQUFHM0IsZUFBZSxDQUFDSSxTQUFTLEVBQUM7TUFBQyxVQUFBLElBQUdKLGVBQWUsQ0FBQ0ksU0FBUyxDQUFDa0osZ0JBQWdCLEtBQUc5VyxTQUFTLEVBQUM7TUFBQ3dOLFlBQUFBLGVBQWUsQ0FBQ0ksU0FBUyxDQUFDa0osZ0JBQWdCLEdBQUMsRUFBRSxDQUFBO01BQUEsV0FBQTtnQkFBQ3RKLGVBQWUsQ0FBQ0ksU0FBUyxDQUFDa0osZ0JBQWdCLENBQUM3SyxJQUFJLENBQUN1QixlQUFlLENBQUMsQ0FBQTtNQUFBLFNBQUE7TUFBQyxRQUFBLElBQUl1SixrQkFBa0IsR0FBQyxJQUFJN0MsaUJBQWlCLENBQUN6TCxJQUFJLEVBQUMrRSxlQUFlLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLENBQUMsQ0FBQTtNQUFDLFFBQUEsSUFBSXdKLGdCQUFnQixHQUFDLElBQUk5QyxpQkFBaUIsQ0FBQ3pMLElBQUksR0FBQyxHQUFHLEVBQUMrRSxlQUFlLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLENBQUMsQ0FBQTtNQUFDLFFBQUEsSUFBSXlKLHFCQUFxQixHQUFDLElBQUkvQyxpQkFBaUIsQ0FBQ3pMLElBQUksR0FBQyxTQUFTLEVBQUMrRSxlQUFlLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxLQUFLLENBQUMsQ0FBQTtjQUFDNEIsa0JBQWtCLENBQUNsRCxPQUFPLENBQUMsR0FBQztNQUFDc0YsVUFBQUEsV0FBVyxFQUFDd0YsZ0JBQWdCO01BQUN6RixVQUFBQSxnQkFBZ0IsRUFBQzBGLHFCQUFBQTtlQUFzQixDQUFBO01BQUM5QyxRQUFBQSxtQkFBbUIsQ0FBQ3VDLGlCQUFpQixFQUFDNUwsV0FBVyxDQUFDLENBQUE7TUFBQyxRQUFBLE9BQU0sQ0FBQ2lNLGtCQUFrQixFQUFDQyxnQkFBZ0IsRUFBQ0MscUJBQXFCLENBQUMsQ0FBQTtNQUFBLE9BQUMsQ0FBQyxDQUFBO01BQUEsS0FBQTtVQUFDLFNBQVNDLGNBQWNBLENBQUN0SyxXQUFXLEVBQUM7WUFBQyxPQUFNQSxXQUFXLENBQUNuSixNQUFNLEVBQUM7TUFBQyxRQUFBLElBQUlvRSxHQUFHLEdBQUMrRSxXQUFXLENBQUNnRCxHQUFHLEVBQUUsQ0FBQTtNQUFDLFFBQUEsSUFBSXVILEdBQUcsR0FBQ3ZLLFdBQVcsQ0FBQ2dELEdBQUcsRUFBRSxDQUFBO2NBQUN1SCxHQUFHLENBQUN0UCxHQUFHLENBQUMsQ0FBQTtNQUFBLE9BQUE7TUFBQyxLQUFBO01BQUMsSUFBQSxTQUFTdVAsb0JBQW9CQSxDQUFDN0UsU0FBUyxFQUFDOEUsUUFBUSxFQUFDQyxTQUFTLEVBQUNDLGNBQWMsRUFBQ0MsYUFBYSxFQUFDQyxPQUFPLEVBQUM7TUFBQyxNQUFBLElBQUkvRSxRQUFRLEdBQUMyRSxRQUFRLENBQUM1VCxNQUFNLENBQUE7WUFBQyxJQUFHaVAsUUFBUSxHQUFDLENBQUMsRUFBQztjQUFDMUgsaUJBQWlCLENBQUMsZ0ZBQWdGLENBQUMsQ0FBQTtNQUFBLE9BQUE7WUFBQyxJQUFJME0saUJBQWlCLEdBQUNMLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBRyxJQUFJLElBQUVDLFNBQVMsS0FBRyxJQUFJLENBQUE7WUFBQyxJQUFJSyxvQkFBb0IsR0FBQyxLQUFLLENBQUE7TUFBQyxNQUFBLEtBQUksSUFBSXpPLENBQUMsR0FBQyxDQUFDLEVBQUNBLENBQUMsR0FBQ21PLFFBQVEsQ0FBQzVULE1BQU0sRUFBQyxFQUFFeUYsQ0FBQyxFQUFDO01BQUMsUUFBQSxJQUFHbU8sUUFBUSxDQUFDbk8sQ0FBQyxDQUFDLEtBQUcsSUFBSSxJQUFFbU8sUUFBUSxDQUFDbk8sQ0FBQyxDQUFDLENBQUMrRCxrQkFBa0IsS0FBR2pOLFNBQVMsRUFBQztNQUFDMlgsVUFBQUEsb0JBQW9CLEdBQUMsSUFBSSxDQUFBO01BQUMsVUFBQSxNQUFBO01BQUssU0FBQTtNQUFDLE9BQUE7WUFBQyxJQUFJQyxPQUFPLEdBQUNQLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzVPLElBQUksS0FBRyxNQUFNLENBQUE7TUFBQyxNQUFBLElBQUlvUCxnQkFBZ0IsR0FBQ25GLFFBQVEsR0FBQyxDQUFDLENBQUE7TUFBQyxNQUFBLElBQUlvRixTQUFTLEdBQUMsSUFBSTdPLEtBQUssQ0FBQzRPLGdCQUFnQixDQUFDLENBQUE7WUFBQyxJQUFJRSxlQUFlLEdBQUMsRUFBRSxDQUFBO1lBQUMsSUFBSW5MLFdBQVcsR0FBQyxFQUFFLENBQUE7TUFBQyxNQUFBLE9BQU8sWUFBVTtNQUFDLFFBQUEsSUFBR3pDLFNBQVMsQ0FBQzFHLE1BQU0sS0FBR29VLGdCQUFnQixFQUFDO2dCQUFDN00saUJBQWlCLENBQUEsV0FBQSxHQUFhdUgsU0FBUyxHQUFnQnBJLGVBQUFBLEdBQUFBLFNBQVMsQ0FBQzFHLE1BQU0sR0FBQSx1QkFBQSxHQUF3Qm9VLGdCQUFnQixHQUFBLFFBQVEsQ0FBQyxDQUFBO01BQUEsU0FBQTtjQUFDakwsV0FBVyxDQUFDbkosTUFBTSxHQUFDLENBQUMsQ0FBQTtNQUFDLFFBQUEsSUFBSXVVLFNBQVMsQ0FBQTtNQUFDRCxRQUFBQSxlQUFlLENBQUN0VSxNQUFNLEdBQUNpVSxpQkFBaUIsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO01BQUNLLFFBQUFBLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBQ1AsYUFBYSxDQUFBO01BQUMsUUFBQSxJQUFHRSxpQkFBaUIsRUFBQztNQUFDTSxVQUFBQSxTQUFTLEdBQUNYLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQ3pLLFdBQVcsRUFBQyxJQUFJLENBQUMsQ0FBQTtNQUFDbUwsVUFBQUEsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFDQyxTQUFTLENBQUE7TUFBQSxTQUFBO2NBQUMsS0FBSSxJQUFJOU8sQ0FBQyxHQUFDLENBQUMsRUFBQ0EsQ0FBQyxHQUFDMk8sZ0JBQWdCLEVBQUMsRUFBRTNPLENBQUMsRUFBQztnQkFBQzRPLFNBQVMsQ0FBQzVPLENBQUMsQ0FBQyxHQUFDbU8sUUFBUSxDQUFDbk8sQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDMEQsV0FBVyxFQUFDekMsU0FBUyxDQUFDakIsQ0FBQyxDQUFDLENBQUMsQ0FBQTtNQUFDNk8sVUFBQUEsZUFBZSxDQUFDOUwsSUFBSSxDQUFDNkwsU0FBUyxDQUFDNU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtNQUFBLFNBQUE7Y0FBQyxJQUFJZ0csRUFBRSxHQUFDcUksY0FBYyxDQUFDck4sS0FBSyxDQUFDLElBQUksRUFBQzZOLGVBQWUsQ0FBQyxDQUFBO2NBQUMsU0FBU0UsTUFBTUEsQ0FBQy9JLEVBQUUsRUFBQztNQUFDLFVBQUEsSUFBR3lJLG9CQUFvQixFQUFDO2tCQUFDVCxjQUFjLENBQUN0SyxXQUFXLENBQUMsQ0FBQTtNQUFBLFdBQUMsTUFBSTtNQUFDLFlBQUEsS0FBSSxJQUFJMUQsQ0FBQyxHQUFDd08saUJBQWlCLEdBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQ3hPLENBQUMsR0FBQ21PLFFBQVEsQ0FBQzVULE1BQU0sRUFBQ3lGLENBQUMsRUFBRSxFQUFDO01BQUMsY0FBQSxJQUFJZ1AsS0FBSyxHQUFDaFAsQ0FBQyxLQUFHLENBQUMsR0FBQzhPLFNBQVMsR0FBQ0YsU0FBUyxDQUFDNU8sQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFBO29CQUFDLElBQUdtTyxRQUFRLENBQUNuTyxDQUFDLENBQUMsQ0FBQytELGtCQUFrQixLQUFHLElBQUksRUFBQztNQUFDb0ssZ0JBQUFBLFFBQVEsQ0FBQ25PLENBQUMsQ0FBQyxDQUFDK0Qsa0JBQWtCLENBQUNpTCxLQUFLLENBQUMsQ0FBQTtNQUFBLGVBQUE7TUFBQyxhQUFBO01BQUMsV0FBQTtNQUFDLFVBQUEsSUFBR04sT0FBTyxFQUFDO2tCQUFDLE9BQU9QLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQ25JLEVBQUUsQ0FBQyxDQUFBO01BQUEsV0FBQTtNQUFDLFNBQUE7Y0FBQyxPQUFPK0ksTUFBTSxDQUFDL0ksRUFBRSxDQUFDLENBQUE7YUFBQyxDQUFBO01BQUEsS0FBQTtNQUFDLElBQUEsU0FBU2lKLG1CQUFtQkEsQ0FBQ3BLLEtBQUssRUFBQ3FLLFlBQVksRUFBQztZQUFDLElBQUlDLEtBQUssR0FBQyxFQUFFLENBQUE7WUFBQyxLQUFJLElBQUluUCxDQUFDLEdBQUMsQ0FBQyxFQUFDQSxDQUFDLEdBQUM2RSxLQUFLLEVBQUM3RSxDQUFDLEVBQUUsRUFBQztNQUFDbVAsUUFBQUEsS0FBSyxDQUFDcE0sSUFBSSxDQUFDM0osT0FBTyxDQUFDOFYsWUFBWSxHQUFDbFAsQ0FBQyxHQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO01BQUEsT0FBQTtNQUFDLE1BQUEsT0FBT21QLEtBQUssQ0FBQTtNQUFBLEtBQUE7TUFBQyxJQUFBLFNBQVNDLHNDQUFzQ0EsQ0FBQ0MsWUFBWSxFQUFDakcsVUFBVSxFQUFDSSxRQUFRLEVBQUM4RixlQUFlLEVBQUNDLGdCQUFnQixFQUFDQyxVQUFVLEVBQUMzSSxFQUFFLEVBQUMwSCxPQUFPLEVBQUM7TUFBQyxNQUFBLElBQUlrQixXQUFXLEdBQUNSLG1CQUFtQixDQUFDekYsUUFBUSxFQUFDOEYsZUFBZSxDQUFDLENBQUE7TUFBQ2xHLE1BQUFBLFVBQVUsR0FBQ2xKLGdCQUFnQixDQUFDa0osVUFBVSxDQUFDLENBQUE7TUFBQ29HLE1BQUFBLFVBQVUsR0FBQ3hELHVCQUF1QixDQUFDdUQsZ0JBQWdCLEVBQUNDLFVBQVUsQ0FBQyxDQUFBO1lBQUN2Tiw2QkFBNkIsQ0FBQyxFQUFFLEVBQUMsQ0FBQ29OLFlBQVksQ0FBQyxFQUFDLFVBQVNqQixTQUFTLEVBQUM7TUFBQ0EsUUFBQUEsU0FBUyxHQUFDQSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7TUFBQyxRQUFBLElBQUkvRSxTQUFTLEdBQUkrRSxTQUFTLENBQUM3TyxJQUFJLFNBQUk2SixVQUFZLENBQUE7Y0FBQyxTQUFTc0csbUJBQW1CQSxHQUFFO01BQUNqRCxVQUFBQSxxQkFBcUIsQ0FBZ0JwRCxjQUFBQSxHQUFBQSxTQUFTLEdBQXdCb0csdUJBQUFBLEVBQUFBLFdBQVcsQ0FBQyxDQUFBO01BQUEsU0FBQTtNQUFDLFFBQUEsSUFBR3JHLFVBQVUsQ0FBQ3ZOLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBQztnQkFBQ3VOLFVBQVUsR0FBQ3VHLE1BQU0sQ0FBQ3ZHLFVBQVUsQ0FBQ3dHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO01BQUEsU0FBQTtNQUFDLFFBQUEsSUFBSXpHLEtBQUssR0FBQ2lGLFNBQVMsQ0FBQzlKLGVBQWUsQ0FBQzFDLFdBQVcsQ0FBQTtNQUFDLFFBQUEsSUFBRzlLLFNBQVMsS0FBR3FTLEtBQUssQ0FBQ0MsVUFBVSxDQUFDLEVBQUM7TUFBQ3NHLFVBQUFBLG1CQUFtQixDQUFDbEcsUUFBUSxHQUFDQSxRQUFRLEdBQUMsQ0FBQyxDQUFBO01BQUNMLFVBQUFBLEtBQUssQ0FBQ0MsVUFBVSxDQUFDLEdBQUNzRyxtQkFBbUIsQ0FBQTtNQUFBLFNBQUMsTUFBSTtNQUFDeEcsVUFBQUEsbUJBQW1CLENBQUNDLEtBQUssRUFBQ0MsVUFBVSxFQUFDQyxTQUFTLENBQUMsQ0FBQTtnQkFBQ0YsS0FBSyxDQUFDQyxVQUFVLENBQUMsQ0FBQ0UsYUFBYSxDQUFDRSxRQUFRLEdBQUMsQ0FBQyxDQUFDLEdBQUNrRyxtQkFBbUIsQ0FBQTtNQUFBLFNBQUE7TUFBQ3pOLFFBQUFBLDZCQUE2QixDQUFDLEVBQUUsRUFBQ3dOLFdBQVcsRUFBQyxVQUFTdEIsUUFBUSxFQUFDO01BQUMsVUFBQSxJQUFJMEIsZ0JBQWdCLEdBQUMsQ0FBQzFCLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQzlDLE1BQU0sQ0FBQzhDLFFBQVEsQ0FBQzJCLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO01BQUMsVUFBQSxJQUFJckUsSUFBSSxHQUFDeUMsb0JBQW9CLENBQUM3RSxTQUFTLEVBQUN3RyxnQkFBZ0IsRUFBQyxJQUFJLEVBQUNMLFVBQVUsRUFBQzNJLEVBQVUsQ0FBQyxDQUFBO2dCQUFDLElBQUcvUCxTQUFTLEtBQUdxUyxLQUFLLENBQUNDLFVBQVUsQ0FBQyxDQUFDRSxhQUFhLEVBQUM7TUFBQ21DLFlBQUFBLElBQUksQ0FBQ2pDLFFBQVEsR0FBQ0EsUUFBUSxHQUFDLENBQUMsQ0FBQTtNQUFDTCxZQUFBQSxLQUFLLENBQUNDLFVBQVUsQ0FBQyxHQUFDcUMsSUFBSSxDQUFBO01BQUEsV0FBQyxNQUFJO2tCQUFDdEMsS0FBSyxDQUFDQyxVQUFVLENBQUMsQ0FBQ0UsYUFBYSxDQUFDRSxRQUFRLEdBQUMsQ0FBQyxDQUFDLEdBQUNpQyxJQUFJLENBQUE7TUFBQSxXQUFBO01BQUMsVUFBQSxJQUFHMkMsU0FBUyxDQUFDOUosZUFBZSxDQUFDc0osZ0JBQWdCLEVBQUM7TUFBQyxZQUFBLEtBQUEsSUFBQW1DLFNBQUEsR0FBQUMsK0JBQUEsQ0FBMEI1QixTQUFTLENBQUM5SixlQUFlLENBQUNzSixnQkFBZ0IsQ0FBQSxFQUFBcUMsS0FBQSxFQUFBQSxDQUFBQSxDQUFBQSxLQUFBLEdBQUFGLFNBQUEsRUFBQSxFQUFBRyxJQUFBLEdBQUM7TUFBQSxjQUFBLElBQTNEQyxZQUFZLEdBQUFGLEtBQUEsQ0FBQXRLLEtBQUEsQ0FBQTtvQkFBZ0QsSUFBRyxDQUFDd0ssWUFBWSxDQUFDdk8sV0FBVyxDQUFDa0IsY0FBYyxDQUFDc0csVUFBVSxDQUFDLEVBQUM7TUFBQytHLGdCQUFBQSxZQUFZLENBQUN2TyxXQUFXLENBQUN3SCxVQUFVLENBQUMsR0FBQ3FDLElBQUksQ0FBQTtNQUFBLGVBQUE7TUFBQyxhQUFBO01BQUMsV0FBQTtNQUFDLFVBQUEsT0FBTSxFQUFFLENBQUE7TUFBQSxTQUFDLENBQUMsQ0FBQTtNQUFDLFFBQUEsT0FBTSxFQUFFLENBQUE7TUFBQSxPQUFDLENBQUMsQ0FBQTtNQUFBLEtBQUE7TUFBQyxJQUFBLFNBQVMyRSxZQUFZQSxDQUFDQyxLQUFLLEVBQUNqQyxTQUFTLEVBQUMvRSxTQUFTLEVBQUM7TUFBQyxNQUFBLElBQUcsRUFBRWdILEtBQUssWUFBWS9ZLE1BQU0sQ0FBQyxFQUFDO01BQUN3SyxRQUFBQSxpQkFBaUIsQ0FBSXVILFNBQVMsR0FBeUJnSCwwQkFBQUEsR0FBQUEsS0FBTyxDQUFDLENBQUE7TUFBQSxPQUFBO1lBQUMsSUFBRyxFQUFFQSxLQUFLLFlBQVlqQyxTQUFTLENBQUM5SixlQUFlLENBQUMxQyxXQUFXLENBQUMsRUFBQztjQUFDRSxpQkFBaUIsQ0FBSXVILFNBQVMsR0FBcUNnSCxzQ0FBQUEsR0FBQUEsS0FBSyxDQUFDek8sV0FBVyxDQUFDckMsSUFBTSxDQUFDLENBQUE7TUFBQSxPQUFBO01BQUMsTUFBQSxJQUFHLENBQUM4USxLQUFLLENBQUNqTSxFQUFFLENBQUN6RixHQUFHLEVBQUM7Y0FBQ21ELGlCQUFpQixDQUFBLHdDQUFBLEdBQTBDdUgsU0FBUyxHQUFBLG9CQUFvQixDQUFDLENBQUE7TUFBQSxPQUFBO01BQUMsTUFBQSxPQUFPUSxhQUFhLENBQUN3RyxLQUFLLENBQUNqTSxFQUFFLENBQUN6RixHQUFHLEVBQUMwUixLQUFLLENBQUNqTSxFQUFFLENBQUNDLE9BQU8sQ0FBQ0MsZUFBZSxFQUFDOEosU0FBUyxDQUFDOUosZUFBZSxDQUFDLENBQUE7TUFBQSxLQUFBO01BQUMsSUFBQSxTQUFTZ00sc0NBQXNDQSxDQUFDakIsWUFBWSxFQUFDa0IsU0FBUyxFQUFDQyxZQUFZLEVBQUNDLFdBQVcsRUFBQ0MsZUFBZSxFQUFDQyxNQUFNLEVBQUNDLGVBQWUsRUFBQ0MsTUFBTSxFQUFDO01BQUNOLE1BQUFBLFNBQVMsR0FBQ3JRLGdCQUFnQixDQUFDcVEsU0FBUyxDQUFDLENBQUE7TUFBQ0ksTUFBQUEsTUFBTSxHQUFDM0UsdUJBQXVCLENBQUMwRSxlQUFlLEVBQUNDLE1BQU0sQ0FBQyxDQUFBO1lBQUMxTyw2QkFBNkIsQ0FBQyxFQUFFLEVBQUMsQ0FBQ29OLFlBQVksQ0FBQyxFQUFDLFVBQVNqQixTQUFTLEVBQUM7TUFBQ0EsUUFBQUEsU0FBUyxHQUFDQSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7TUFBQyxRQUFBLElBQUkvRSxTQUFTLEdBQUkrRSxTQUFTLENBQUM3TyxJQUFJLFNBQUlnUixTQUFXLENBQUE7TUFBQyxRQUFBLElBQUlPLElBQUksR0FBQztnQkFBQ3BGLEdBQUcsRUFBQyxTQUFBQSxHQUFBQSxHQUFVO01BQUNlLFlBQUFBLHFCQUFxQixvQkFBa0JwRCxTQUFTLEdBQUEsdUJBQUEsRUFBd0IsQ0FBQ21ILFlBQVksQ0FBQyxDQUFDLENBQUE7aUJBQUM7TUFBQ08sVUFBQUEsVUFBVSxFQUFDLElBQUk7TUFBQ0MsVUFBQUEsWUFBWSxFQUFDLElBQUE7ZUFBSyxDQUFBO01BQUMsUUFBQSxJQUFHSCxNQUFNLEVBQUM7Z0JBQUNDLElBQUksQ0FBQ0csR0FBRyxHQUFDLFlBQUk7TUFBQ3hFLFlBQUFBLHFCQUFxQixvQkFBa0JwRCxTQUFTLEdBQUEsdUJBQUEsRUFBd0IsQ0FBQ21ILFlBQVksQ0FBQyxDQUFDLENBQUE7aUJBQUMsQ0FBQTtNQUFBLFNBQUMsTUFBSTtNQUFDTSxVQUFBQSxJQUFJLENBQUNHLEdBQUcsR0FBQyxVQUFBQyxDQUFDLEVBQUU7a0JBQUNwUCxpQkFBaUIsQ0FBSXVILFNBQVMsR0FBQSwwQkFBMEIsQ0FBQyxDQUFBO2lCQUFDLENBQUE7TUFBQSxTQUFBO01BQUMvUixRQUFBQSxNQUFNLENBQUM2WixjQUFjLENBQUMvQyxTQUFTLENBQUM5SixlQUFlLENBQUMxQyxXQUFXLEVBQUMyTyxTQUFTLEVBQUNPLElBQUksQ0FBQyxDQUFBO2NBQUM3Tyw2QkFBNkIsQ0FBQyxFQUFFLEVBQUMsQ0FBQ3VPLFlBQVksQ0FBQyxFQUFDLFVBQVNZLFNBQVMsRUFBQztNQUFDQSxVQUFBQSxTQUFTLEdBQUNBLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtNQUFDLFVBQUEsSUFBSU4sSUFBSSxHQUFDO2tCQUFDcEYsR0FBRyxFQUFDLFNBQUFBLEdBQUFBLEdBQVU7b0JBQUMsT0FBTzBGLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQ1QsTUFBTSxDQUFDRixXQUFXLENBQUMsQ0FBQyxDQUFBO21CQUFDO01BQUNNLFlBQUFBLFVBQVUsRUFBQyxJQUFBO2lCQUFLLENBQUE7TUFBQyxVQUFBLElBQUdGLE1BQU0sRUFBQztNQUFDQSxZQUFBQSxNQUFNLEdBQUM3RSx1QkFBdUIsQ0FBQzRFLGVBQWUsRUFBQ0MsTUFBTSxDQUFDLENBQUE7TUFBQ0MsWUFBQUEsSUFBSSxDQUFDRyxHQUFHLEdBQUMsVUFBQUMsQ0FBQyxFQUFFO29CQUFDLElBQUl4TixXQUFXLEdBQUMsRUFBRSxDQUFBO01BQUNtTixjQUFBQSxNQUFNLENBQUNKLFdBQVcsRUFBQ1csU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDMU4sV0FBVyxFQUFDd04sQ0FBQyxDQUFDLENBQUMsQ0FBQTtvQkFBQ2xELGNBQWMsQ0FBQ3RLLFdBQVcsQ0FBQyxDQUFBO21CQUFDLENBQUE7TUFBQSxXQUFBO01BQUNwTSxVQUFBQSxNQUFNLENBQUM2WixjQUFjLENBQUMvQyxTQUFTLENBQUM5SixlQUFlLENBQUMxQyxXQUFXLEVBQUMyTyxTQUFTLEVBQUNPLElBQUksQ0FBQyxDQUFBO01BQUMsVUFBQSxPQUFNLEVBQUUsQ0FBQTtNQUFBLFNBQUMsQ0FBQyxDQUFBO01BQUMsUUFBQSxPQUFNLEVBQUUsQ0FBQTtNQUFBLE9BQUMsQ0FBQyxDQUFBO01BQUEsS0FBQTtNQUFDLElBQUEsU0FBU08sbUNBQW1DQSxDQUFDaEMsWUFBWSxFQUFDN0YsUUFBUSxFQUFDOEYsZUFBZSxFQUFDQyxnQkFBZ0IsRUFBQytCLE9BQU8sRUFBQ25ILGNBQWMsRUFBQztNQUFDdlIsTUFBQUEsTUFBTSxDQUFDNFEsUUFBUSxHQUFDLENBQUMsQ0FBQyxDQUFBO01BQUMsTUFBQSxJQUFJaUcsV0FBVyxHQUFDUixtQkFBbUIsQ0FBQ3pGLFFBQVEsRUFBQzhGLGVBQWUsQ0FBQyxDQUFBO01BQUNnQyxNQUFBQSxPQUFPLEdBQUN0Rix1QkFBdUIsQ0FBQ3VELGdCQUFnQixFQUFDK0IsT0FBTyxDQUFDLENBQUE7WUFBQ3JQLDZCQUE2QixDQUFDLEVBQUUsRUFBQyxDQUFDb04sWUFBWSxDQUFDLEVBQUMsVUFBU2pCLFNBQVMsRUFBQztNQUFDQSxRQUFBQSxTQUFTLEdBQUNBLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtNQUFDLFFBQUEsSUFBSS9FLFNBQVMsR0FBQSxjQUFBLEdBQWdCK0UsU0FBUyxDQUFDN08sSUFBTSxDQUFBO01BQUMsUUFBQSxJQUFHekksU0FBUyxLQUFHc1gsU0FBUyxDQUFDOUosZUFBZSxDQUFDcUosZ0JBQWdCLEVBQUM7TUFBQ1MsVUFBQUEsU0FBUyxDQUFDOUosZUFBZSxDQUFDcUosZ0JBQWdCLEdBQUMsRUFBRSxDQUFBO01BQUEsU0FBQTtNQUFDLFFBQUEsSUFBRzdXLFNBQVMsS0FBR3NYLFNBQVMsQ0FBQzlKLGVBQWUsQ0FBQ3FKLGdCQUFnQixDQUFDbkUsUUFBUSxHQUFDLENBQUMsQ0FBQyxFQUFDO2dCQUFDLE1BQU0sSUFBSTNILFlBQVksQ0FBQSw2RUFBQSxJQUErRTJILFFBQVEsR0FBQyxDQUFDLENBQUEsR0FBQSxlQUFBLEdBQWdCNEUsU0FBUyxDQUFDN08sSUFBSSxHQUFBLHFHQUFxRyxDQUFDLENBQUE7TUFBQSxTQUFBO2NBQUM2TyxTQUFTLENBQUM5SixlQUFlLENBQUNxSixnQkFBZ0IsQ0FBQ25FLFFBQVEsR0FBQyxDQUFDLENBQUMsR0FBQyxZQUFJO01BQUNpRCxVQUFBQSxxQkFBcUIsdUJBQXFCMkIsU0FBUyxDQUFDN08sSUFBSSxHQUFBLHVCQUFBLEVBQXdCa1EsV0FBVyxDQUFDLENBQUE7ZUFBQyxDQUFBO01BQUN4TixRQUFBQSw2QkFBNkIsQ0FBQyxFQUFFLEVBQUN3TixXQUFXLEVBQUMsVUFBU3RCLFFBQVEsRUFBQztnQkFBQ0EsUUFBUSxDQUFDb0QsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQUNuRCxTQUFTLENBQUM5SixlQUFlLENBQUNxSixnQkFBZ0IsQ0FBQ25FLFFBQVEsR0FBQyxDQUFDLENBQUMsR0FBQzBFLG9CQUFvQixDQUFDN0UsU0FBUyxFQUFDOEUsUUFBUSxFQUFDLElBQUksRUFBQ21ELE9BQU8sRUFBQ25ILGNBQWMsQ0FBQyxDQUFBO01BQUMsVUFBQSxPQUFNLEVBQUUsQ0FBQTtNQUFBLFNBQUMsQ0FBQyxDQUFBO01BQUMsUUFBQSxPQUFNLEVBQUUsQ0FBQTtNQUFBLE9BQUMsQ0FBQyxDQUFBO01BQUEsS0FBQTtNQUFDLElBQUEsU0FBU3FILGdDQUFnQ0EsQ0FBQ25DLFlBQVksRUFBQ2pHLFVBQVUsRUFBQ0ksUUFBUSxFQUFDOEYsZUFBZSxFQUFDQyxnQkFBZ0IsRUFBQ0MsVUFBVSxFQUFDaUMsT0FBTyxFQUFDQyxhQUFhLEVBQUNuRCxPQUFPLEVBQUM7TUFBQyxNQUFBLElBQUlrQixXQUFXLEdBQUNSLG1CQUFtQixDQUFDekYsUUFBUSxFQUFDOEYsZUFBZSxDQUFDLENBQUE7TUFBQ2xHLE1BQUFBLFVBQVUsR0FBQ2xKLGdCQUFnQixDQUFDa0osVUFBVSxDQUFDLENBQUE7TUFBQ29HLE1BQUFBLFVBQVUsR0FBQ3hELHVCQUF1QixDQUFDdUQsZ0JBQWdCLEVBQUNDLFVBQVUsQ0FBQyxDQUFBO1lBQUN2Tiw2QkFBNkIsQ0FBQyxFQUFFLEVBQUMsQ0FBQ29OLFlBQVksQ0FBQyxFQUFDLFVBQVNqQixTQUFTLEVBQUM7TUFBQ0EsUUFBQUEsU0FBUyxHQUFDQSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7TUFBQyxRQUFBLElBQUkvRSxTQUFTLEdBQUkrRSxTQUFTLENBQUM3TyxJQUFJLFNBQUk2SixVQUFZLENBQUE7TUFBQyxRQUFBLElBQUdBLFVBQVUsQ0FBQ3ZOLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBQztnQkFBQ3VOLFVBQVUsR0FBQ3VHLE1BQU0sQ0FBQ3ZHLFVBQVUsQ0FBQ3dHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO01BQUEsU0FBQTtNQUFDLFFBQUEsSUFBRzhCLGFBQWEsRUFBQztnQkFBQ3RELFNBQVMsQ0FBQzlKLGVBQWUsQ0FBQ3NGLG9CQUFvQixDQUFDN0csSUFBSSxDQUFDcUcsVUFBVSxDQUFDLENBQUE7TUFBQSxTQUFBO2NBQUMsU0FBU3NHLG1CQUFtQkEsR0FBRTtNQUFDakQsVUFBQUEscUJBQXFCLENBQWdCcEQsY0FBQUEsR0FBQUEsU0FBUyxHQUF3Qm9HLHVCQUFBQSxFQUFBQSxXQUFXLENBQUMsQ0FBQTtNQUFBLFNBQUE7TUFBQyxRQUFBLElBQUl0RyxLQUFLLEdBQUNpRixTQUFTLENBQUM5SixlQUFlLENBQUN1RCxpQkFBaUIsQ0FBQTtNQUFDLFFBQUEsSUFBSThKLE1BQU0sR0FBQ3hJLEtBQUssQ0FBQ0MsVUFBVSxDQUFDLENBQUE7Y0FBQyxJQUFHdFMsU0FBUyxLQUFHNmEsTUFBTSxJQUFFN2EsU0FBUyxLQUFHNmEsTUFBTSxDQUFDckksYUFBYSxJQUFFcUksTUFBTSxDQUFDQyxTQUFTLEtBQUd4RCxTQUFTLENBQUM3TyxJQUFJLElBQUVvUyxNQUFNLENBQUNuSSxRQUFRLEtBQUdBLFFBQVEsR0FBQyxDQUFDLEVBQUM7TUFBQ2tHLFVBQUFBLG1CQUFtQixDQUFDbEcsUUFBUSxHQUFDQSxRQUFRLEdBQUMsQ0FBQyxDQUFBO01BQUNrRyxVQUFBQSxtQkFBbUIsQ0FBQ2tDLFNBQVMsR0FBQ3hELFNBQVMsQ0FBQzdPLElBQUksQ0FBQTtNQUFDNEosVUFBQUEsS0FBSyxDQUFDQyxVQUFVLENBQUMsR0FBQ3NHLG1CQUFtQixDQUFBO01BQUEsU0FBQyxNQUFJO01BQUN4RyxVQUFBQSxtQkFBbUIsQ0FBQ0MsS0FBSyxFQUFDQyxVQUFVLEVBQUNDLFNBQVMsQ0FBQyxDQUFBO2dCQUFDRixLQUFLLENBQUNDLFVBQVUsQ0FBQyxDQUFDRSxhQUFhLENBQUNFLFFBQVEsR0FBQyxDQUFDLENBQUMsR0FBQ2tHLG1CQUFtQixDQUFBO01BQUEsU0FBQTtNQUFDek4sUUFBQUEsNkJBQTZCLENBQUMsRUFBRSxFQUFDd04sV0FBVyxFQUFDLFVBQVN0QixRQUFRLEVBQUM7TUFBQyxVQUFBLElBQUkwRCxjQUFjLEdBQUMzRCxvQkFBb0IsQ0FBQzdFLFNBQVMsRUFBQzhFLFFBQVEsRUFBQ0MsU0FBUyxFQUFDb0IsVUFBVSxFQUFDaUMsT0FBZSxDQUFDLENBQUE7Z0JBQUMsSUFBRzNhLFNBQVMsS0FBR3FTLEtBQUssQ0FBQ0MsVUFBVSxDQUFDLENBQUNFLGFBQWEsRUFBQztNQUFDdUksWUFBQUEsY0FBYyxDQUFDckksUUFBUSxHQUFDQSxRQUFRLEdBQUMsQ0FBQyxDQUFBO01BQUNMLFlBQUFBLEtBQUssQ0FBQ0MsVUFBVSxDQUFDLEdBQUN5SSxjQUFjLENBQUE7TUFBQSxXQUFDLE1BQUk7a0JBQUMxSSxLQUFLLENBQUNDLFVBQVUsQ0FBQyxDQUFDRSxhQUFhLENBQUNFLFFBQVEsR0FBQyxDQUFDLENBQUMsR0FBQ3FJLGNBQWMsQ0FBQTtNQUFBLFdBQUE7TUFBQyxVQUFBLE9BQU0sRUFBRSxDQUFBO01BQUEsU0FBQyxDQUFDLENBQUE7TUFBQyxRQUFBLE9BQU0sRUFBRSxDQUFBO01BQUEsT0FBQyxDQUFDLENBQUE7TUFBQSxLQUFBO1VBQUMsU0FBU0MsZ0NBQWdDQSxDQUFDMUQsU0FBUyxFQUFDbUMsU0FBUyxFQUFDd0IsZ0JBQWdCLEVBQUNyQixlQUFlLEVBQUNDLE1BQU0sRUFBQ3FCLGFBQWEsRUFBQ0Msa0JBQWtCLEVBQUNyQixlQUFlLEVBQUNDLE1BQU0sRUFBQ3FCLGFBQWEsRUFBQztNQUFDM0IsTUFBQUEsU0FBUyxHQUFDclEsZ0JBQWdCLENBQUNxUSxTQUFTLENBQUMsQ0FBQTtNQUFDSSxNQUFBQSxNQUFNLEdBQUMzRSx1QkFBdUIsQ0FBQzBFLGVBQWUsRUFBQ0MsTUFBTSxDQUFDLENBQUE7WUFBQzFPLDZCQUE2QixDQUFDLEVBQUUsRUFBQyxDQUFDbU0sU0FBUyxDQUFDLEVBQUMsVUFBU0EsU0FBUyxFQUFDO01BQUNBLFFBQUFBLFNBQVMsR0FBQ0EsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO01BQUMsUUFBQSxJQUFJL0UsU0FBUyxHQUFJK0UsU0FBUyxDQUFDN08sSUFBSSxTQUFJZ1IsU0FBVyxDQUFBO01BQUMsUUFBQSxJQUFJTyxJQUFJLEdBQUM7Z0JBQUNwRixHQUFHLEVBQUMsU0FBQUEsR0FBQUEsR0FBVTtrQkFBQ2UscUJBQXFCLENBQUEsZ0JBQUEsR0FBa0JwRCxTQUFTLEdBQXdCLHVCQUFBLEVBQUEsQ0FBQzBJLGdCQUFnQixFQUFDRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUE7aUJBQUM7TUFBQ2xCLFVBQUFBLFVBQVUsRUFBQyxJQUFJO01BQUNDLFVBQUFBLFlBQVksRUFBQyxJQUFBO2VBQUssQ0FBQTtNQUFDLFFBQUEsSUFBR0gsTUFBTSxFQUFDO2dCQUFDQyxJQUFJLENBQUNHLEdBQUcsR0FBQyxZQUFJO2tCQUFDeEUscUJBQXFCLENBQUEsZ0JBQUEsR0FBa0JwRCxTQUFTLEdBQXdCLHVCQUFBLEVBQUEsQ0FBQzBJLGdCQUFnQixFQUFDRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUE7aUJBQUMsQ0FBQTtNQUFBLFNBQUMsTUFBSTtNQUFDbkIsVUFBQUEsSUFBSSxDQUFDRyxHQUFHLEdBQUMsVUFBQUMsQ0FBQyxFQUFFO01BQUNwUCxZQUFBQSxpQkFBaUIsQ0FBQ3VILFNBQVMsR0FBQywwQkFBMEIsQ0FBQyxDQUFBO2lCQUFDLENBQUE7TUFBQSxTQUFBO01BQUMvUixRQUFBQSxNQUFNLENBQUM2WixjQUFjLENBQUMvQyxTQUFTLENBQUM5SixlQUFlLENBQUN1RCxpQkFBaUIsRUFBQzBJLFNBQVMsRUFBQ08sSUFBSSxDQUFDLENBQUE7TUFBQzdPLFFBQUFBLDZCQUE2QixDQUFDLEVBQUUsRUFBQzRPLE1BQU0sR0FBQyxDQUFDa0IsZ0JBQWdCLEVBQUNFLGtCQUFrQixDQUFDLEdBQUMsQ0FBQ0YsZ0JBQWdCLENBQUMsRUFBQyxVQUFTckYsS0FBSyxFQUFDO01BQUMsVUFBQSxJQUFJcUYsZ0JBQWdCLEdBQUNyRixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7TUFBQyxVQUFBLElBQUlvRSxJQUFJLEdBQUM7a0JBQUNwRixHQUFHLEVBQUMsU0FBQUEsR0FBQUEsR0FBVTtvQkFBQyxJQUFJL00sR0FBRyxHQUFDeVIsWUFBWSxDQUFDLElBQUksRUFBQ2hDLFNBQVMsRUFBQy9FLFNBQVMsR0FBQyxTQUFTLENBQUMsQ0FBQTtvQkFBQyxPQUFPMEksZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUNwQixNQUFNLENBQUNxQixhQUFhLEVBQUNyVCxHQUFHLENBQUMsQ0FBQyxDQUFBO21CQUFDO01BQUNvUyxZQUFBQSxVQUFVLEVBQUMsSUFBQTtpQkFBSyxDQUFBO01BQUMsVUFBQSxJQUFHRixNQUFNLEVBQUM7TUFBQ0EsWUFBQUEsTUFBTSxHQUFDN0UsdUJBQXVCLENBQUM0RSxlQUFlLEVBQUNDLE1BQU0sQ0FBQyxDQUFBO01BQUMsWUFBQSxJQUFJb0Isa0JBQWtCLEdBQUN2RixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7TUFBQ29FLFlBQUFBLElBQUksQ0FBQ0csR0FBRyxHQUFDLFVBQVNDLENBQUMsRUFBQztvQkFBQyxJQUFJdlMsR0FBRyxHQUFDeVIsWUFBWSxDQUFDLElBQUksRUFBQ2hDLFNBQVMsRUFBQy9FLFNBQVMsR0FBQyxTQUFTLENBQUMsQ0FBQTtvQkFBQyxJQUFJM0YsV0FBVyxHQUFDLEVBQUUsQ0FBQTtNQUFDbU4sY0FBQUEsTUFBTSxDQUFDcUIsYUFBYSxFQUFDdlQsR0FBRyxFQUFDc1Qsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUN2TyxXQUFXLEVBQUN3TixDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUFDbEQsY0FBYyxDQUFDdEssV0FBVyxDQUFDLENBQUE7bUJBQUMsQ0FBQTtNQUFBLFdBQUE7TUFBQ3BNLFVBQUFBLE1BQU0sQ0FBQzZaLGNBQWMsQ0FBQy9DLFNBQVMsQ0FBQzlKLGVBQWUsQ0FBQ3VELGlCQUFpQixFQUFDMEksU0FBUyxFQUFDTyxJQUFJLENBQUMsQ0FBQTtNQUFDLFVBQUEsT0FBTSxFQUFFLENBQUE7TUFBQSxTQUFDLENBQUMsQ0FBQTtNQUFDLFFBQUEsT0FBTSxFQUFFLENBQUE7TUFBQSxPQUFDLENBQUMsQ0FBQTtNQUFBLEtBQUE7VUFBQyxTQUFTcUIsZUFBZUEsR0FBRTtNQUFDLE1BQUEsSUFBSSxDQUFDQyxTQUFTLEdBQUMsQ0FBQ3RiLFNBQVMsQ0FBQyxDQUFBO1lBQUMsSUFBSSxDQUFDdWIsUUFBUSxHQUFDLEVBQUUsQ0FBQTtNQUFDLE1BQUEsSUFBSSxDQUFDM0csR0FBRyxHQUFDLFVBQVN0USxFQUFFLEVBQUM7TUFBQyxRQUFBLE9BQU8sSUFBSSxDQUFDZ1gsU0FBUyxDQUFDaFgsRUFBRSxDQUFDLENBQUE7YUFBQyxDQUFBO01BQUMsTUFBQSxJQUFJLENBQUNrWCxHQUFHLEdBQUMsVUFBU2xYLEVBQUUsRUFBQztNQUFDLFFBQUEsT0FBTyxJQUFJLENBQUNnWCxTQUFTLENBQUNoWCxFQUFFLENBQUMsS0FBR3RFLFNBQVMsQ0FBQTthQUFDLENBQUE7TUFBQyxNQUFBLElBQUksQ0FBQ3liLFFBQVEsR0FBQyxVQUFTbE4sTUFBTSxFQUFDO01BQUMsUUFBQSxJQUFJakssRUFBRSxHQUFDLElBQUksQ0FBQ2lYLFFBQVEsQ0FBQzNMLEdBQUcsRUFBRSxJQUFFLElBQUksQ0FBQzBMLFNBQVMsQ0FBQzdYLE1BQU0sQ0FBQTtNQUFDLFFBQUEsSUFBSSxDQUFDNlgsU0FBUyxDQUFDaFgsRUFBRSxDQUFDLEdBQUNpSyxNQUFNLENBQUE7TUFBQyxRQUFBLE9BQU9qSyxFQUFFLENBQUE7YUFBQyxDQUFBO01BQUMsTUFBQSxJQUFJLENBQUNvWCxJQUFJLEdBQUMsVUFBU3BYLEVBQUUsRUFBQztNQUFDLFFBQUEsSUFBSSxDQUFDZ1gsU0FBUyxDQUFDaFgsRUFBRSxDQUFDLEdBQUN0RSxTQUFTLENBQUE7TUFBQyxRQUFBLElBQUksQ0FBQ3ViLFFBQVEsQ0FBQ3RQLElBQUksQ0FBQzNILEVBQUUsQ0FBQyxDQUFBO2FBQUMsQ0FBQTtNQUFBLEtBQUE7TUFBQyxJQUFBLElBQUlxWCxhQUFhLEdBQUMsSUFBSU4sZUFBZSxFQUFBLENBQUE7VUFBQyxTQUFTTyxjQUFjQSxDQUFDck4sTUFBTSxFQUFDO01BQUMsTUFBQSxJQUFHQSxNQUFNLElBQUVvTixhQUFhLENBQUNFLFFBQVEsSUFBRSxDQUFDLEtBQUcsRUFBRUYsYUFBYSxDQUFDL0csR0FBRyxDQUFDckcsTUFBTSxDQUFDLENBQUN1TixRQUFRLEVBQUM7TUFBQ0gsUUFBQUEsYUFBYSxDQUFDRCxJQUFJLENBQUNuTixNQUFNLENBQUMsQ0FBQTtNQUFBLE9BQUE7TUFBQyxLQUFBO1VBQUMsU0FBU3dOLG1CQUFtQkEsR0FBRTtZQUFDLElBQUloTyxLQUFLLEdBQUMsQ0FBQyxDQUFBO01BQUMsTUFBQSxLQUFJLElBQUk3RSxDQUFDLEdBQUN5UyxhQUFhLENBQUNFLFFBQVEsRUFBQzNTLENBQUMsR0FBQ3lTLGFBQWEsQ0FBQ0wsU0FBUyxDQUFDN1gsTUFBTSxFQUFDLEVBQUV5RixDQUFDLEVBQUM7Y0FBQyxJQUFHeVMsYUFBYSxDQUFDTCxTQUFTLENBQUNwUyxDQUFDLENBQUMsS0FBR2xKLFNBQVMsRUFBQztNQUFDLFVBQUEsRUFBRStOLEtBQUssQ0FBQTtNQUFBLFNBQUE7TUFBQyxPQUFBO01BQUMsTUFBQSxPQUFPQSxLQUFLLENBQUE7TUFBQSxLQUFBO1VBQUMsU0FBU2lPLFVBQVVBLEdBQUU7TUFBQ0wsTUFBQUEsYUFBYSxDQUFDTCxTQUFTLENBQUNyUCxJQUFJLENBQUM7TUFBQzRDLFFBQUFBLEtBQUssRUFBQzdPLFNBQUFBO01BQVMsT0FBQyxFQUFDO01BQUM2TyxRQUFBQSxLQUFLLEVBQUMsSUFBQTtNQUFJLE9BQUMsRUFBQztNQUFDQSxRQUFBQSxLQUFLLEVBQUMsSUFBQTtNQUFJLE9BQUMsRUFBQztNQUFDQSxRQUFBQSxLQUFLLEVBQUMsS0FBQTtNQUFLLE9BQUMsQ0FBQyxDQUFBO01BQUM4TSxNQUFBQSxhQUFhLENBQUNFLFFBQVEsR0FBQ0YsYUFBYSxDQUFDTCxTQUFTLENBQUM3WCxNQUFNLENBQUE7TUFBQ3hELE1BQUFBLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxHQUFDOGIsbUJBQW1CLENBQUE7TUFBQSxLQUFBO01BQUMsSUFBQSxJQUFJdEksS0FBSyxHQUFDO01BQUN3SSxNQUFBQSxPQUFPLEVBQUMsU0FBQUEsT0FBQTFOLENBQUFBLE1BQU0sRUFBRTtjQUFDLElBQUcsQ0FBQ0EsTUFBTSxFQUFDO01BQUN2RCxVQUFBQSxpQkFBaUIsQ0FBQyxtQ0FBbUMsR0FBQ3VELE1BQU0sQ0FBQyxDQUFBO01BQUEsU0FBQTtNQUFDLFFBQUEsT0FBT29OLGFBQWEsQ0FBQy9HLEdBQUcsQ0FBQ3JHLE1BQU0sQ0FBQyxDQUFDTSxLQUFLLENBQUE7YUFBQztNQUFDNkUsTUFBQUEsUUFBUSxFQUFDLFNBQUFBLFFBQUE3RSxDQUFBQSxLQUFLLEVBQUU7TUFBQyxRQUFBLFFBQU9BLEtBQUs7TUFBRSxVQUFBLEtBQUs3TyxTQUFTO01BQUMsWUFBQSxPQUFPLENBQUMsQ0FBQTtNQUFDLFVBQUEsS0FBSyxJQUFJO01BQUMsWUFBQSxPQUFPLENBQUMsQ0FBQTtNQUFDLFVBQUEsS0FBSyxJQUFJO01BQUMsWUFBQSxPQUFPLENBQUMsQ0FBQTtNQUFDLFVBQUEsS0FBSyxLQUFLO01BQUMsWUFBQSxPQUFPLENBQUMsQ0FBQTtNQUFDLFVBQUE7TUFBUSxZQUFBO29CQUFDLE9BQU8yYixhQUFhLENBQUNGLFFBQVEsQ0FBQztNQUFDSyxnQkFBQUEsUUFBUSxFQUFDLENBQUM7TUFBQ2pOLGdCQUFBQSxLQUFLLEVBQUNBLEtBQUFBO01BQUssZUFBQyxDQUFDLENBQUE7TUFBQSxhQUFBO01BQUMsU0FBQTtNQUFDLE9BQUE7V0FBRSxDQUFBO01BQUMsSUFBQSxTQUFTcU4sdUJBQXVCQSxDQUFDaFEsT0FBTyxFQUFDekQsSUFBSSxFQUFDO01BQUNBLE1BQUFBLElBQUksR0FBQ1csZ0JBQWdCLENBQUNYLElBQUksQ0FBQyxDQUFBO1lBQUNtRCxZQUFZLENBQUNNLE9BQU8sRUFBQztNQUFDekQsUUFBQUEsSUFBSSxFQUFDQSxJQUFJO01BQUMsUUFBQSxjQUFjLEVBQUMsU0FBQWdFLFlBQVM4QixDQUFBQSxNQUFNLEVBQUM7TUFBQyxVQUFBLElBQUlXLEVBQUUsR0FBQ3VFLEtBQUssQ0FBQ3dJLE9BQU8sQ0FBQzFOLE1BQU0sQ0FBQyxDQUFBO2dCQUFDcU4sY0FBYyxDQUFDck4sTUFBTSxDQUFDLENBQUE7TUFBQyxVQUFBLE9BQU9XLEVBQUUsQ0FBQTtlQUFDO01BQUMsUUFBQSxZQUFZLEVBQUMsU0FBQXZDLFVBQUFBLENBQVNDLFdBQVcsRUFBQ2lDLEtBQUssRUFBQztNQUFDLFVBQUEsT0FBTzRFLEtBQUssQ0FBQ0MsUUFBUSxDQUFDN0UsS0FBSyxDQUFDLENBQUE7ZUFBQztNQUFDLFFBQUEsZ0JBQWdCLEVBQUMsQ0FBQztNQUFDLFFBQUEsc0JBQXNCLEVBQUMrRSwwQkFBMEI7TUFBQzNHLFFBQUFBLGtCQUFrQixFQUFDLElBQUE7TUFBSSxPQUFDLENBQUMsQ0FBQTtNQUFBLEtBQUE7TUFBQyxJQUFBLFNBQVNrUCx3QkFBd0JBLENBQUMxVCxJQUFJLEVBQUM5RSxLQUFLLEVBQUN5WSxNQUFNLEVBQUM7TUFBQyxNQUFBLFFBQU96WSxLQUFLO01BQUUsUUFBQSxLQUFLLENBQUM7Z0JBQUMsT0FBTyxVQUFTb0osT0FBTyxFQUFDO01BQUMsWUFBQSxJQUFJQyxJQUFJLEdBQUNvUCxNQUFNLEdBQUNuYSxLQUFLLEdBQUNDLE1BQU0sQ0FBQTtrQkFBQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzhLLElBQUksQ0FBQ0QsT0FBTyxDQUFDLENBQUMsQ0FBQTtpQkFBQyxDQUFBO01BQUMsUUFBQSxLQUFLLENBQUM7Z0JBQUMsT0FBTyxVQUFTQSxPQUFPLEVBQUM7TUFBQyxZQUFBLElBQUlDLElBQUksR0FBQ29QLE1BQU0sR0FBQ2phLE1BQU0sR0FBQ0MsT0FBTyxDQUFBO2tCQUFDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDNEssSUFBSSxDQUFDRCxPQUFPLElBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtpQkFBQyxDQUFBO01BQUMsUUFBQSxLQUFLLENBQUM7Z0JBQUMsT0FBTyxVQUFTQSxPQUFPLEVBQUM7TUFBQyxZQUFBLElBQUlDLElBQUksR0FBQ29QLE1BQU0sR0FBQy9aLE1BQU0sR0FBQ0MsT0FBTyxDQUFBO2tCQUFDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDMEssSUFBSSxDQUFDRCxPQUFPLElBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtpQkFBQyxDQUFBO01BQUMsUUFBQTtNQUFRLFVBQUEsTUFBTSxJQUFJakUsU0FBUyxDQUFDLHdCQUF3QixHQUFDTCxJQUFJLENBQUMsQ0FBQTtNQUFBLE9BQUE7TUFBQyxLQUFBO1VBQUMsU0FBUzRULHNCQUFzQkEsQ0FBQ25RLE9BQU8sRUFBQ3pELElBQUksRUFBQ0MsSUFBSSxFQUFDNFQsUUFBUSxFQUFDO01BQUMsTUFBQSxJQUFJM1ksS0FBSyxHQUFDa0YsZ0JBQWdCLENBQUNILElBQUksQ0FBQyxDQUFBO01BQUNELE1BQUFBLElBQUksR0FBQ1csZ0JBQWdCLENBQUNYLElBQUksQ0FBQyxDQUFBO1lBQUMsU0FBUzhULElBQUlBLEdBQUUsRUFBQztNQUFDQSxNQUFBQSxJQUFJLENBQUNDLE1BQU0sR0FBQyxFQUFFLENBQUE7WUFBQzVRLFlBQVksQ0FBQ00sT0FBTyxFQUFDO01BQUN6RCxRQUFBQSxJQUFJLEVBQUNBLElBQUk7TUFBQ3FDLFFBQUFBLFdBQVcsRUFBQ3lSLElBQUk7TUFBQyxRQUFBLGNBQWMsRUFBQyxTQUFBOVAsWUFBU25ELENBQUFBLENBQUMsRUFBQztNQUFDLFVBQUEsT0FBTyxJQUFJLENBQUN3QixXQUFXLENBQUMwUixNQUFNLENBQUNsVCxDQUFDLENBQUMsQ0FBQTtlQUFDO01BQUMsUUFBQSxZQUFZLEVBQUMsU0FBQXFELFVBQUFBLENBQVNDLFdBQVcsRUFBQ3RELENBQUMsRUFBQztnQkFBQyxPQUFPQSxDQUFDLENBQUN1RixLQUFLLENBQUE7ZUFBQztNQUFDLFFBQUEsZ0JBQWdCLEVBQUMsQ0FBQztjQUFDLHNCQUFzQixFQUFDc04sd0JBQXdCLENBQUMxVCxJQUFJLEVBQUM5RSxLQUFLLEVBQUMyWSxRQUFRLENBQUM7TUFBQ3JQLFFBQUFBLGtCQUFrQixFQUFDLElBQUE7TUFBSSxPQUFDLENBQUMsQ0FBQTtNQUFDMEYsTUFBQUEsa0JBQWtCLENBQUNsSyxJQUFJLEVBQUM4VCxJQUFJLENBQUMsQ0FBQTtNQUFBLEtBQUE7TUFBQyxJQUFBLFNBQVNFLHFCQUFxQkEsQ0FBQ3ZRLE9BQU8sRUFBQ3FHLFNBQVMsRUFBQztNQUFDLE1BQUEsSUFBSW1LLElBQUksR0FBQ2xULGVBQWUsQ0FBQzBDLE9BQU8sQ0FBQyxDQUFBO1lBQUMsSUFBR2xNLFNBQVMsS0FBRzBjLElBQUksRUFBQztjQUFDMVIsaUJBQWlCLENBQUN1SCxTQUFTLEdBQUMsb0JBQW9CLEdBQUNpRCxXQUFXLENBQUN0SixPQUFPLENBQUMsQ0FBQyxDQUFBO01BQUEsT0FBQTtNQUFDLE1BQUEsT0FBT3dRLElBQUksQ0FBQTtNQUFBLEtBQUE7TUFBQyxJQUFBLFNBQVNDLDRCQUE0QkEsQ0FBQ0MsV0FBVyxFQUFDblUsSUFBSSxFQUFDb1UsU0FBUyxFQUFDO01BQUMsTUFBQSxJQUFJQyxRQUFRLEdBQUNMLHFCQUFxQixDQUFDRyxXQUFXLEVBQUMsTUFBTSxDQUFDLENBQUE7TUFBQ25VLE1BQUFBLElBQUksR0FBQ1csZ0JBQWdCLENBQUNYLElBQUksQ0FBQyxDQUFBO01BQUMsTUFBQSxJQUFJc1UsSUFBSSxHQUFDRCxRQUFRLENBQUNoUyxXQUFXLENBQUE7WUFBQyxJQUFJa1MsS0FBSyxHQUFDeGMsTUFBTSxDQUFDcUssTUFBTSxDQUFDaVMsUUFBUSxDQUFDaFMsV0FBVyxDQUFDRixTQUFTLEVBQUM7TUFBQ2lFLFFBQUFBLEtBQUssRUFBQztNQUFDQSxVQUFBQSxLQUFLLEVBQUNnTyxTQUFBQTtlQUFVO01BQUMvUixRQUFBQSxXQUFXLEVBQUM7Z0JBQUMrRCxLQUFLLEVBQUM5RSxtQkFBbUIsQ0FBSStTLFFBQVEsQ0FBQ3JVLElBQUksR0FBQSxHQUFBLEdBQUlBLElBQUksRUFBRyxZQUFVLEVBQUUsQ0FBQTtNQUFDLFNBQUE7TUFBQyxPQUFDLENBQUMsQ0FBQTtNQUFDc1UsTUFBQUEsSUFBSSxDQUFDUCxNQUFNLENBQUNLLFNBQVMsQ0FBQyxHQUFDRyxLQUFLLENBQUE7TUFBQ0QsTUFBQUEsSUFBSSxDQUFDdFUsSUFBSSxDQUFDLEdBQUN1VSxLQUFLLENBQUE7TUFBQSxLQUFBO1VBQUMsU0FBUzlKLFVBQVVBLENBQUNrSCxDQUFDLEVBQUM7WUFBQyxJQUFHQSxDQUFDLEtBQUcsSUFBSSxFQUFDO01BQUMsUUFBQSxPQUFNLE1BQU0sQ0FBQTtNQUFBLE9BQUE7WUFBQyxJQUFJNkMsQ0FBQyxHQUFDLE9BQU83QyxDQUFDLENBQUE7WUFBQyxJQUFHNkMsQ0FBQyxLQUFHLFFBQVEsSUFBRUEsQ0FBQyxLQUFHLE9BQU8sSUFBRUEsQ0FBQyxLQUFHLFVBQVUsRUFBQztNQUFDLFFBQUEsT0FBTzdDLENBQUMsQ0FBQ3pQLFFBQVEsRUFBRSxDQUFBO01BQUEsT0FBQyxNQUFJO2NBQUMsT0FBTSxFQUFFLEdBQUN5UCxDQUFDLENBQUE7TUFBQSxPQUFBO01BQUMsS0FBQTtNQUFDLElBQUEsU0FBUzhDLHlCQUF5QkEsQ0FBQ3pVLElBQUksRUFBQzlFLEtBQUssRUFBQztNQUFDLE1BQUEsUUFBT0EsS0FBSztNQUFFLFFBQUEsS0FBSyxDQUFDO2dCQUFDLE9BQU8sVUFBU29KLE9BQU8sRUFBQztrQkFBQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQ3hLLE9BQU8sQ0FBQ3dLLE9BQU8sSUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO2lCQUFDLENBQUE7TUFBQyxRQUFBLEtBQUssQ0FBQztnQkFBQyxPQUFPLFVBQVNBLE9BQU8sRUFBQztrQkFBQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQ3ZLLE9BQU8sQ0FBQ3VLLE9BQU8sSUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO2lCQUFDLENBQUE7TUFBQyxRQUFBO01BQVEsVUFBQSxNQUFNLElBQUlqRSxTQUFTLENBQUMsc0JBQXNCLEdBQUNMLElBQUksQ0FBQyxDQUFBO01BQUEsT0FBQTtNQUFDLEtBQUE7TUFBQyxJQUFBLFNBQVMwVSx1QkFBdUJBLENBQUNqUixPQUFPLEVBQUN6RCxJQUFJLEVBQUNDLElBQUksRUFBQztNQUFDLE1BQUEsSUFBSS9FLEtBQUssR0FBQ2tGLGdCQUFnQixDQUFDSCxJQUFJLENBQUMsQ0FBQTtNQUFDRCxNQUFBQSxJQUFJLEdBQUNXLGdCQUFnQixDQUFDWCxJQUFJLENBQUMsQ0FBQTtZQUFDbUQsWUFBWSxDQUFDTSxPQUFPLEVBQUM7TUFBQ3pELFFBQUFBLElBQUksRUFBQ0EsSUFBSTtNQUFDLFFBQUEsY0FBYyxFQUFDLFNBQUFnRSxZQUFTb0MsQ0FBQUEsS0FBSyxFQUFDO01BQUMsVUFBQSxPQUFPQSxLQUFLLENBQUE7ZUFBQztNQUFDLFFBQUEsWUFBWSxFQUFDLFNBQUFsQyxVQUFBQSxDQUFTQyxXQUFXLEVBQUNpQyxLQUFLLEVBQUM7TUFBQyxVQUFBLE9BQU9BLEtBQUssQ0FBQTtlQUFDO01BQUMsUUFBQSxnQkFBZ0IsRUFBQyxDQUFDO01BQUMsUUFBQSxzQkFBc0IsRUFBQ3FPLHlCQUF5QixDQUFDelUsSUFBSSxFQUFDOUUsS0FBSyxDQUFDO01BQUNzSixRQUFBQSxrQkFBa0IsRUFBQyxJQUFBO01BQUksT0FBQyxDQUFDLENBQUE7TUFBQSxLQUFBO01BQUMsSUFBQSxTQUFTbVEsMkJBQTJCQSxDQUFDM1UsSUFBSSxFQUFDOUUsS0FBSyxFQUFDeVksTUFBTSxFQUFDO01BQUMsTUFBQSxRQUFPelksS0FBSztNQUFFLFFBQUEsS0FBSyxDQUFDO01BQUMsVUFBQSxPQUFPeVksTUFBTSxHQUFDLFNBQVNpQixpQkFBaUJBLENBQUN0USxPQUFPLEVBQUM7a0JBQUMsT0FBTzlLLEtBQUssQ0FBQzhLLE9BQU8sQ0FBQyxDQUFBO01BQUEsV0FBQyxHQUFDLFNBQVN1USxpQkFBaUJBLENBQUN2USxPQUFPLEVBQUM7a0JBQUMsT0FBTzdLLE1BQU0sQ0FBQzZLLE9BQU8sQ0FBQyxDQUFBO2lCQUFDLENBQUE7TUFBQyxRQUFBLEtBQUssQ0FBQztNQUFDLFVBQUEsT0FBT3FQLE1BQU0sR0FBQyxTQUFTbUIsa0JBQWtCQSxDQUFDeFEsT0FBTyxFQUFDO01BQUMsWUFBQSxPQUFPNUssTUFBTSxDQUFDNEssT0FBTyxJQUFFLENBQUMsQ0FBQyxDQUFBO01BQUEsV0FBQyxHQUFDLFNBQVN5USxrQkFBa0JBLENBQUN6USxPQUFPLEVBQUM7TUFBQyxZQUFBLE9BQU8zSyxPQUFPLENBQUMySyxPQUFPLElBQUUsQ0FBQyxDQUFDLENBQUE7aUJBQUMsQ0FBQTtNQUFDLFFBQUEsS0FBSyxDQUFDO01BQUMsVUFBQSxPQUFPcVAsTUFBTSxHQUFDLFNBQVNxQixrQkFBa0JBLENBQUMxUSxPQUFPLEVBQUM7TUFBQyxZQUFBLE9BQU8xSyxNQUFNLENBQUMwSyxPQUFPLElBQUUsQ0FBQyxDQUFDLENBQUE7TUFBQSxXQUFDLEdBQUMsU0FBUzJRLGtCQUFrQkEsQ0FBQzNRLE9BQU8sRUFBQztNQUFDLFlBQUEsT0FBT3pLLE9BQU8sQ0FBQ3lLLE9BQU8sSUFBRSxDQUFDLENBQUMsQ0FBQTtpQkFBQyxDQUFBO01BQUMsUUFBQTtNQUFRLFVBQUEsTUFBTSxJQUFJakUsU0FBUyxDQUFDLHdCQUF3QixHQUFDTCxJQUFJLENBQUMsQ0FBQTtNQUFBLE9BQUE7TUFBQyxLQUFBO1VBQUMsU0FBU2tWLHlCQUF5QkEsQ0FBQ25WLGFBQWEsRUFBQ0MsSUFBSSxFQUFDQyxJQUFJLEVBQUNDLFFBQVEsRUFBQ0MsUUFBUSxFQUFDO01BQUNILE1BQUFBLElBQUksR0FBQ1csZ0JBQWdCLENBQUNYLElBQUksQ0FBQyxDQUFBO01BQXVDLE1BQUEsSUFBSTlFLEtBQUssR0FBQ2tGLGdCQUFnQixDQUFDSCxJQUFJLENBQUMsQ0FBQTtNQUFDLE1BQUEsSUFBSStELFlBQVksR0FBQyxTQUFBQSxZQUFBQSxDQUFBb0MsS0FBSyxFQUFBO01BQUEsUUFBQSxPQUFFQSxLQUFLLENBQUE7TUFBQSxPQUFBLENBQUE7WUFBQyxJQUFHbEcsUUFBUSxLQUFHLENBQUMsRUFBQztNQUFDLFFBQUEsSUFBSWlWLFFBQVEsR0FBQyxFQUFFLEdBQUMsQ0FBQyxHQUFDbFYsSUFBSSxDQUFBO2NBQUMrRCxZQUFZLEdBQUMsU0FBQUEsWUFBQUEsQ0FBQW9DLEtBQUssRUFBQTtNQUFBLFVBQUEsT0FBRUEsS0FBSyxJQUFFK08sUUFBUSxLQUFHQSxRQUFRLENBQUE7TUFBQSxTQUFBLENBQUE7TUFBQSxPQUFBO01BQUMsTUFBQSxJQUFJQyxjQUFjLEdBQUNwVixJQUFJLENBQUNxTSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUE7WUFBQyxJQUFJZ0osZUFBZSxHQUFDLFNBQWhCQSxlQUFlQSxDQUFFalAsS0FBSyxFQUFDa1AsVUFBVSxFQUFHLEVBQUUsQ0FBQTtNQUFDLE1BQUEsSUFBSXBSLFVBQVUsQ0FBQTtNQUFDLE1BQUEsSUFBR2tSLGNBQWMsRUFBQztNQUFDbFIsUUFBQUEsVUFBVSxHQUFDLFNBQUFBLFVBQUFBLENBQVNDLFdBQVcsRUFBQ2lDLEtBQUssRUFBQztNQUFDaVAsVUFBQUEsZUFBZSxDQUFDalAsS0FBSyxFQUFDLElBQUksQ0FBQ3BHLElBQUksQ0FBQyxDQUFBO2dCQUFDLE9BQU9vRyxLQUFLLEtBQUcsQ0FBQyxDQUFBO2VBQUMsQ0FBQTtNQUFBLE9BQUMsTUFBSTtNQUFDbEMsUUFBQUEsVUFBVSxHQUFDLFNBQUFBLFVBQUFBLENBQVNDLFdBQVcsRUFBQ2lDLEtBQUssRUFBQztNQUFDaVAsVUFBQUEsZUFBZSxDQUFDalAsS0FBSyxFQUFDLElBQUksQ0FBQ3BHLElBQUksQ0FBQyxDQUFBO01BQUMsVUFBQSxPQUFPb0csS0FBSyxDQUFBO2VBQUMsQ0FBQTtNQUFBLE9BQUE7WUFBQ2pELFlBQVksQ0FBQ3BELGFBQWEsRUFBQztNQUFDQyxRQUFBQSxJQUFJLEVBQUNBLElBQUk7TUFBQyxRQUFBLGNBQWMsRUFBQ2dFLFlBQVk7TUFBQyxRQUFBLFlBQVksRUFBQ0UsVUFBVTtNQUFDLFFBQUEsZ0JBQWdCLEVBQUMsQ0FBQztjQUFDLHNCQUFzQixFQUFDeVEsMkJBQTJCLENBQUMzVSxJQUFJLEVBQUM5RSxLQUFLLEVBQUNnRixRQUFRLEtBQUcsQ0FBQyxDQUFDO01BQUNzRSxRQUFBQSxrQkFBa0IsRUFBQyxJQUFBO01BQUksT0FBQyxDQUFDLENBQUE7TUFBQSxLQUFBO01BQUMsSUFBQSxTQUFTK1EsNkJBQTZCQSxDQUFDOVIsT0FBTyxFQUFDK1IsYUFBYSxFQUFDeFYsSUFBSSxFQUFDO01BQUMsTUFBQSxJQUFJeVYsV0FBVyxHQUFDLENBQUN0YixTQUFTLEVBQUNHLFVBQVUsRUFBQ0YsVUFBVSxFQUFDRyxXQUFXLEVBQUNGLFVBQVUsRUFBQ0csV0FBVyxFQUFDQyxZQUFZLEVBQUNDLFlBQVksQ0FBQyxDQUFBO01BQUMsTUFBQSxJQUFJZ2IsRUFBRSxHQUFDRCxXQUFXLENBQUNELGFBQWEsQ0FBQyxDQUFBO1lBQUMsU0FBU0csZ0JBQWdCQSxDQUFDN1AsTUFBTSxFQUFDO2NBQUNBLE1BQU0sR0FBQ0EsTUFBTSxJQUFFLENBQUMsQ0FBQTtjQUFDLElBQUl2QixJQUFJLEdBQUMxSyxPQUFPLENBQUE7TUFBQyxRQUFBLElBQUlvRyxJQUFJLEdBQUNzRSxJQUFJLENBQUN1QixNQUFNLENBQUMsQ0FBQTtNQUFDLFFBQUEsSUFBSThQLElBQUksR0FBQ3JSLElBQUksQ0FBQ3VCLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQTtjQUFDLE9BQU8sSUFBSTRQLEVBQUUsQ0FBQ25SLElBQUksQ0FBQ3JLLE1BQU0sRUFBQzBiLElBQUksRUFBQzNWLElBQUksQ0FBQyxDQUFBO01BQUEsT0FBQTtNQUFDRCxNQUFBQSxJQUFJLEdBQUNXLGdCQUFnQixDQUFDWCxJQUFJLENBQUMsQ0FBQTtZQUFDbUQsWUFBWSxDQUFDTSxPQUFPLEVBQUM7TUFBQ3pELFFBQUFBLElBQUksRUFBQ0EsSUFBSTtNQUFDLFFBQUEsY0FBYyxFQUFDMlYsZ0JBQWdCO01BQUMsUUFBQSxnQkFBZ0IsRUFBQyxDQUFDO01BQUMsUUFBQSxzQkFBc0IsRUFBQ0EsZ0JBQUFBO01BQWdCLE9BQUMsRUFBQztNQUFDL1IsUUFBQUEsNEJBQTRCLEVBQUMsSUFBQTtNQUFJLE9BQUMsQ0FBQyxDQUFBO01BQUEsS0FBQTtVQUFDLFNBQVNpUyxpQkFBaUJBLENBQUNqWCxHQUFHLEVBQUMyRixJQUFJLEVBQUN1UixNQUFNLEVBQUNDLGVBQWUsRUFBQztNQUFDLE1BQUEsSUFBRyxFQUFFQSxlQUFlLEdBQUMsQ0FBQyxDQUFDLEVBQUMsT0FBTyxDQUFDLENBQUE7WUFBQyxJQUFJQyxRQUFRLEdBQUNGLE1BQU0sQ0FBQTtNQUFDLE1BQUEsSUFBSXRYLE1BQU0sR0FBQ3NYLE1BQU0sR0FBQ0MsZUFBZSxHQUFDLENBQUMsQ0FBQTtNQUFDLE1BQUEsS0FBSSxJQUFJdFYsQ0FBQyxHQUFDLENBQUMsRUFBQ0EsQ0FBQyxHQUFDN0IsR0FBRyxDQUFDNUQsTUFBTSxFQUFDLEVBQUV5RixDQUFDLEVBQUM7TUFBQyxRQUFBLElBQUl3VixDQUFDLEdBQUNyWCxHQUFHLENBQUN5QyxVQUFVLENBQUNaLENBQUMsQ0FBQyxDQUFBO01BQUMsUUFBQSxJQUFHd1YsQ0FBQyxJQUFFLEtBQUssSUFBRUEsQ0FBQyxJQUFFLEtBQUssRUFBQztnQkFBQyxJQUFJalgsRUFBRSxHQUFDSixHQUFHLENBQUN5QyxVQUFVLENBQUMsRUFBRVosQ0FBQyxDQUFDLENBQUE7TUFBQ3dWLFVBQUFBLENBQUMsR0FBQyxLQUFLLElBQUUsQ0FBQ0EsQ0FBQyxHQUFDLElBQUksS0FBRyxFQUFFLENBQUMsR0FBQ2pYLEVBQUUsR0FBQyxJQUFJLENBQUE7TUFBQSxTQUFBO2NBQUMsSUFBR2lYLENBQUMsSUFBRSxHQUFHLEVBQUM7Z0JBQUMsSUFBR0gsTUFBTSxJQUFFdFgsTUFBTSxFQUFDLE1BQUE7TUFBTStGLFVBQUFBLElBQUksQ0FBQ3VSLE1BQU0sRUFBRSxDQUFDLEdBQUNHLENBQUMsQ0FBQTtNQUFBLFNBQUMsTUFBSyxJQUFHQSxDQUFDLElBQUUsSUFBSSxFQUFDO01BQUMsVUFBQSxJQUFHSCxNQUFNLEdBQUMsQ0FBQyxJQUFFdFgsTUFBTSxFQUFDLE1BQUE7Z0JBQU0rRixJQUFJLENBQUN1UixNQUFNLEVBQUUsQ0FBQyxHQUFDLEdBQUcsR0FBQ0csQ0FBQyxJQUFFLENBQUMsQ0FBQTtnQkFBQzFSLElBQUksQ0FBQ3VSLE1BQU0sRUFBRSxDQUFDLEdBQUMsR0FBRyxHQUFDRyxDQUFDLEdBQUMsRUFBRSxDQUFBO01BQUEsU0FBQyxNQUFLLElBQUdBLENBQUMsSUFBRSxLQUFLLEVBQUM7TUFBQyxVQUFBLElBQUdILE1BQU0sR0FBQyxDQUFDLElBQUV0WCxNQUFNLEVBQUMsTUFBQTtnQkFBTStGLElBQUksQ0FBQ3VSLE1BQU0sRUFBRSxDQUFDLEdBQUMsR0FBRyxHQUFDRyxDQUFDLElBQUUsRUFBRSxDQUFBO2dCQUFDMVIsSUFBSSxDQUFDdVIsTUFBTSxFQUFFLENBQUMsR0FBQyxHQUFHLEdBQUNHLENBQUMsSUFBRSxDQUFDLEdBQUMsRUFBRSxDQUFBO2dCQUFDMVIsSUFBSSxDQUFDdVIsTUFBTSxFQUFFLENBQUMsR0FBQyxHQUFHLEdBQUNHLENBQUMsR0FBQyxFQUFFLENBQUE7TUFBQSxTQUFDLE1BQUk7TUFBQyxVQUFBLElBQUdILE1BQU0sR0FBQyxDQUFDLElBQUV0WCxNQUFNLEVBQUMsTUFBQTtnQkFBTStGLElBQUksQ0FBQ3VSLE1BQU0sRUFBRSxDQUFDLEdBQUMsR0FBRyxHQUFDRyxDQUFDLElBQUUsRUFBRSxDQUFBO2dCQUFDMVIsSUFBSSxDQUFDdVIsTUFBTSxFQUFFLENBQUMsR0FBQyxHQUFHLEdBQUNHLENBQUMsSUFBRSxFQUFFLEdBQUMsRUFBRSxDQUFBO2dCQUFDMVIsSUFBSSxDQUFDdVIsTUFBTSxFQUFFLENBQUMsR0FBQyxHQUFHLEdBQUNHLENBQUMsSUFBRSxDQUFDLEdBQUMsRUFBRSxDQUFBO2dCQUFDMVIsSUFBSSxDQUFDdVIsTUFBTSxFQUFFLENBQUMsR0FBQyxHQUFHLEdBQUNHLENBQUMsR0FBQyxFQUFFLENBQUE7TUFBQSxTQUFBO01BQUMsT0FBQTtNQUFDMVIsTUFBQUEsSUFBSSxDQUFDdVIsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFBO1lBQUMsT0FBT0EsTUFBTSxHQUFDRSxRQUFRLENBQUE7TUFBQSxLQUFBO01BQUMsSUFBQSxTQUFTRSxZQUFZQSxDQUFDdFgsR0FBRyxFQUFDdVgsTUFBTSxFQUFDSixlQUFlLEVBQUM7WUFBQyxPQUFPRixpQkFBaUIsQ0FBQ2pYLEdBQUcsRUFBQ25GLE1BQU0sRUFBQzBjLE1BQU0sRUFBQ0osZUFBZSxDQUFDLENBQUE7TUFBQSxLQUFBO1VBQUMsU0FBU0ssZUFBZUEsQ0FBQ3hYLEdBQUcsRUFBQztZQUFDLElBQUl5WCxHQUFHLEdBQUMsQ0FBQyxDQUFBO01BQUMsTUFBQSxLQUFJLElBQUk1VixDQUFDLEdBQUMsQ0FBQyxFQUFDQSxDQUFDLEdBQUM3QixHQUFHLENBQUM1RCxNQUFNLEVBQUMsRUFBRXlGLENBQUMsRUFBQztNQUFDLFFBQUEsSUFBSUksQ0FBQyxHQUFDakMsR0FBRyxDQUFDeUMsVUFBVSxDQUFDWixDQUFDLENBQUMsQ0FBQTtjQUFDLElBQUdJLENBQUMsSUFBRSxHQUFHLEVBQUM7TUFBQ3dWLFVBQUFBLEdBQUcsRUFBRSxDQUFBO01BQUEsU0FBQyxNQUFLLElBQUd4VixDQUFDLElBQUUsSUFBSSxFQUFDO01BQUN3VixVQUFBQSxHQUFHLElBQUUsQ0FBQyxDQUFBO2VBQUMsTUFBSyxJQUFHeFYsQ0FBQyxJQUFFLEtBQUssSUFBRUEsQ0FBQyxJQUFFLEtBQUssRUFBQztNQUFDd1YsVUFBQUEsR0FBRyxJQUFFLENBQUMsQ0FBQTtNQUFDLFVBQUEsRUFBRTVWLENBQUMsQ0FBQTtNQUFBLFNBQUMsTUFBSTtNQUFDNFYsVUFBQUEsR0FBRyxJQUFFLENBQUMsQ0FBQTtNQUFBLFNBQUE7TUFBQyxPQUFBO01BQUMsTUFBQSxPQUFPQSxHQUFHLENBQUE7TUFBQSxLQUFBO01BQUMsSUFBQSxTQUFTQyw0QkFBNEJBLENBQUM3UyxPQUFPLEVBQUN6RCxJQUFJLEVBQUM7TUFBQ0EsTUFBQUEsSUFBSSxHQUFDVyxnQkFBZ0IsQ0FBQ1gsSUFBSSxDQUFDLENBQUE7TUFBQyxNQUFBLElBQUl1VyxlQUFlLEdBQUN2VyxJQUFJLEtBQUcsYUFBYSxDQUFBO1lBQUNtRCxZQUFZLENBQUNNLE9BQU8sRUFBQztNQUFDekQsUUFBQUEsSUFBSSxFQUFDQSxJQUFJO01BQUMsUUFBQSxjQUFjLEVBQUMsU0FBQWdFLFlBQVNvQyxDQUFBQSxLQUFLLEVBQUM7TUFBQyxVQUFBLElBQUlwTCxNQUFNLEdBQUNuQixPQUFPLENBQUN1TSxLQUFLLElBQUUsQ0FBQyxDQUFDLENBQUE7TUFBQyxVQUFBLElBQUlvUSxPQUFPLEdBQUNwUSxLQUFLLEdBQUMsQ0FBQyxDQUFBO01BQUMsVUFBQSxJQUFJeEgsR0FBRyxDQUFBO01BQUMsVUFBQSxJQUFHMlgsZUFBZSxFQUFDO2tCQUFDLElBQUlFLGNBQWMsR0FBQ0QsT0FBTyxDQUFBO2tCQUFDLEtBQUksSUFBSS9WLENBQUMsR0FBQyxDQUFDLEVBQUNBLENBQUMsSUFBRXpGLE1BQU0sRUFBQyxFQUFFeUYsQ0FBQyxFQUFDO01BQUMsY0FBQSxJQUFJaVcsY0FBYyxHQUFDRixPQUFPLEdBQUMvVixDQUFDLENBQUE7b0JBQUMsSUFBR0EsQ0FBQyxJQUFFekYsTUFBTSxJQUFFdkIsTUFBTSxDQUFDaWQsY0FBYyxDQUFDLElBQUUsQ0FBQyxFQUFDO01BQUMsZ0JBQUEsSUFBSUMsT0FBTyxHQUFDRCxjQUFjLEdBQUNELGNBQWMsQ0FBQTtNQUFDLGdCQUFBLElBQUlHLGFBQWEsR0FBQ3pYLFlBQVksQ0FBQ3NYLGNBQWMsRUFBQ0UsT0FBTyxDQUFDLENBQUE7c0JBQUMsSUFBRy9YLEdBQUcsS0FBR3JILFNBQVMsRUFBQztNQUFDcUgsa0JBQUFBLEdBQUcsR0FBQ2dZLGFBQWEsQ0FBQTtNQUFBLGlCQUFDLE1BQUk7TUFBQ2hZLGtCQUFBQSxHQUFHLElBQUVFLE1BQU0sQ0FBQ0MsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFBO01BQUNILGtCQUFBQSxHQUFHLElBQUVnWSxhQUFhLENBQUE7TUFBQSxpQkFBQTtzQkFBQ0gsY0FBYyxHQUFDQyxjQUFjLEdBQUMsQ0FBQyxDQUFBO01BQUEsZUFBQTtNQUFDLGFBQUE7TUFBQyxXQUFDLE1BQUk7TUFBQyxZQUFBLElBQUlHLENBQUMsR0FBQyxJQUFJclcsS0FBSyxDQUFDeEYsTUFBTSxDQUFDLENBQUE7a0JBQUMsS0FBSSxJQUFJeUYsQ0FBQyxHQUFDLENBQUMsRUFBQ0EsQ0FBQyxHQUFDekYsTUFBTSxFQUFDLEVBQUV5RixDQUFDLEVBQUM7TUFBQ29XLGNBQUFBLENBQUMsQ0FBQ3BXLENBQUMsQ0FBQyxHQUFDM0IsTUFBTSxDQUFDQyxZQUFZLENBQUN0RixNQUFNLENBQUMrYyxPQUFPLEdBQUMvVixDQUFDLENBQUMsQ0FBQyxDQUFBO01BQUEsYUFBQTtNQUFDN0IsWUFBQUEsR0FBRyxHQUFDaVksQ0FBQyxDQUFDckosSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO01BQUEsV0FBQTtnQkFBQ1AsTUFBSyxDQUFDN0csS0FBSyxDQUFDLENBQUE7TUFBQyxVQUFBLE9BQU94SCxHQUFHLENBQUE7ZUFBQztNQUFDLFFBQUEsWUFBWSxFQUFDLFNBQUFzRixVQUFBQSxDQUFTQyxXQUFXLEVBQUNpQyxLQUFLLEVBQUM7Z0JBQUMsSUFBR0EsS0FBSyxZQUFZMFEsV0FBVyxFQUFDO01BQUMxUSxZQUFBQSxLQUFLLEdBQUMsSUFBSTlMLFVBQVUsQ0FBQzhMLEtBQUssQ0FBQyxDQUFBO01BQUEsV0FBQTtNQUFDLFVBQUEsSUFBSXBMLE1BQU0sQ0FBQTtNQUFDLFVBQUEsSUFBSStiLG1CQUFtQixHQUFDLE9BQU8zUSxLQUFLLElBQUUsUUFBUSxDQUFBO01BQUMsVUFBQSxJQUFHLEVBQUUyUSxtQkFBbUIsSUFBRTNRLEtBQUssWUFBWTlMLFVBQVUsSUFBRThMLEtBQUssWUFBWTRRLGlCQUFpQixJQUFFNVEsS0FBSyxZQUFZak0sU0FBUyxDQUFDLEVBQUM7a0JBQUNvSSxpQkFBaUIsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFBO01BQUEsV0FBQTtnQkFBQyxJQUFHZ1UsZUFBZSxJQUFFUSxtQkFBbUIsRUFBQztNQUFDL2IsWUFBQUEsTUFBTSxHQUFDb2IsZUFBZSxDQUFDaFEsS0FBSyxDQUFDLENBQUE7TUFBQSxXQUFDLE1BQUk7a0JBQUNwTCxNQUFNLEdBQUNvTCxLQUFLLENBQUNwTCxNQUFNLENBQUE7TUFBQSxXQUFBO2dCQUFDLElBQUlrVCxJQUFJLEdBQUMrSSxRQUFPLENBQUMsQ0FBQyxHQUFDamMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFBO01BQUMsVUFBQSxJQUFJb0UsR0FBRyxHQUFDOE8sSUFBSSxHQUFDLENBQUMsQ0FBQTtNQUFDclUsVUFBQUEsT0FBTyxDQUFDcVUsSUFBSSxJQUFFLENBQUMsQ0FBQyxHQUFDbFQsTUFBTSxDQUFBO2dCQUFDLElBQUd1YixlQUFlLElBQUVRLG1CQUFtQixFQUFDO2tCQUFDYixZQUFZLENBQUM5UCxLQUFLLEVBQUNoSCxHQUFHLEVBQUNwRSxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUE7TUFBQSxXQUFDLE1BQUk7TUFBQyxZQUFBLElBQUcrYixtQkFBbUIsRUFBQztvQkFBQyxLQUFJLElBQUl0VyxDQUFDLEdBQUMsQ0FBQyxFQUFDQSxDQUFDLEdBQUN6RixNQUFNLEVBQUMsRUFBRXlGLENBQUMsRUFBQztNQUFDLGdCQUFBLElBQUl5VyxRQUFRLEdBQUM5USxLQUFLLENBQUMvRSxVQUFVLENBQUNaLENBQUMsQ0FBQyxDQUFBO3NCQUFDLElBQUd5VyxRQUFRLEdBQUMsR0FBRyxFQUFDO3dCQUFDakssTUFBSyxDQUFDN04sR0FBRyxDQUFDLENBQUE7d0JBQUNtRCxpQkFBaUIsQ0FBQyx3REFBd0QsQ0FBQyxDQUFBO01BQUEsaUJBQUE7TUFBQzlJLGdCQUFBQSxNQUFNLENBQUMyRixHQUFHLEdBQUNxQixDQUFDLENBQUMsR0FBQ3lXLFFBQVEsQ0FBQTtNQUFBLGVBQUE7TUFBQyxhQUFDLE1BQUk7b0JBQUMsS0FBSSxJQUFJelcsQ0FBQyxHQUFDLENBQUMsRUFBQ0EsQ0FBQyxHQUFDekYsTUFBTSxFQUFDLEVBQUV5RixDQUFDLEVBQUM7c0JBQUNoSCxNQUFNLENBQUMyRixHQUFHLEdBQUNxQixDQUFDLENBQUMsR0FBQzJGLEtBQUssQ0FBQzNGLENBQUMsQ0FBQyxDQUFBO01BQUEsZUFBQTtNQUFDLGFBQUE7TUFBQyxXQUFBO2dCQUFDLElBQUcwRCxXQUFXLEtBQUcsSUFBSSxFQUFDO01BQUNBLFlBQUFBLFdBQVcsQ0FBQ1gsSUFBSSxDQUFDeUosTUFBSyxFQUFDaUIsSUFBSSxDQUFDLENBQUE7TUFBQSxXQUFBO01BQUMsVUFBQSxPQUFPQSxJQUFJLENBQUE7ZUFBQztNQUFDLFFBQUEsZ0JBQWdCLEVBQUMsQ0FBQztNQUFDLFFBQUEsc0JBQXNCLEVBQUMvQywwQkFBMEI7TUFBQzNHLFFBQUFBLGtCQUFrQixFQUFDLFNBQUFBLGtCQUFTcEYsQ0FBQUEsR0FBRyxFQUFDO2dCQUFDNk4sTUFBSyxDQUFDN04sR0FBRyxDQUFDLENBQUE7TUFBQSxTQUFBO01BQUMsT0FBQyxDQUFDLENBQUE7TUFBQSxLQUFBO01BQUMsSUFBQSxJQUFJK1gsWUFBWSxHQUFDLE9BQU9oWixXQUFXLElBQUUsV0FBVyxHQUFDLElBQUlBLFdBQVcsQ0FBQyxVQUFVLENBQUMsR0FBQzVHLFNBQVMsQ0FBQTtNQUFDLElBQUEsU0FBUzZmLGFBQWFBLENBQUNoWSxHQUFHLEVBQUNiLGNBQWMsRUFBQztZQUFDLElBQUlFLE1BQU0sR0FBQ1csR0FBRyxDQUFBO01BQUMsTUFBQSxJQUFJZCxHQUFHLEdBQUNHLE1BQU0sSUFBRSxDQUFDLENBQUE7TUFBQyxNQUFBLElBQUk0WSxNQUFNLEdBQUMvWSxHQUFHLEdBQUNDLGNBQWMsR0FBQyxDQUFDLENBQUE7TUFBQyxNQUFBLE9BQU0sRUFBRUQsR0FBRyxJQUFFK1ksTUFBTSxDQUFDLElBQUUxZCxPQUFPLENBQUMyRSxHQUFHLENBQUMsRUFBQyxFQUFFQSxHQUFHLENBQUE7WUFBQ0csTUFBTSxHQUFDSCxHQUFHLElBQUUsQ0FBQyxDQUFBO1lBQUMsSUFBR0csTUFBTSxHQUFDVyxHQUFHLEdBQUMsRUFBRSxJQUFFK1gsWUFBWSxFQUFDLE9BQU9BLFlBQVksQ0FBQ3pZLE1BQU0sQ0FBQ2pGLE1BQU0sQ0FBQ2tGLFFBQVEsQ0FBQ1MsR0FBRyxFQUFDWCxNQUFNLENBQUMsQ0FBQyxDQUFBO1lBQUMsSUFBSUcsR0FBRyxHQUFDLEVBQUUsQ0FBQTtNQUFDLE1BQUEsS0FBSSxJQUFJNkIsQ0FBQyxHQUFDLENBQUMsRUFBQyxFQUFFQSxDQUFDLElBQUVsQyxjQUFjLEdBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRWtDLENBQUMsRUFBQztjQUFDLElBQUk2VyxRQUFRLEdBQUM1ZCxNQUFNLENBQUMwRixHQUFHLEdBQUNxQixDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFBO2NBQUMsSUFBRzZXLFFBQVEsSUFBRSxDQUFDLEVBQUMsTUFBQTtNQUFNMVksUUFBQUEsR0FBRyxJQUFFRSxNQUFNLENBQUNDLFlBQVksQ0FBQ3VZLFFBQVEsQ0FBQyxDQUFBO01BQUEsT0FBQTtNQUFDLE1BQUEsT0FBTzFZLEdBQUcsQ0FBQTtNQUFBLEtBQUE7TUFBQyxJQUFBLFNBQVMyWSxhQUFhQSxDQUFDM1ksR0FBRyxFQUFDdVgsTUFBTSxFQUFDSixlQUFlLEVBQUM7WUFBQyxJQUFHQSxlQUFlLEtBQUd4ZSxTQUFTLEVBQUM7TUFBQ3dlLFFBQUFBLGVBQWUsR0FBQyxVQUFVLENBQUE7TUFBQSxPQUFBO01BQUMsTUFBQSxJQUFHQSxlQUFlLEdBQUMsQ0FBQyxFQUFDLE9BQU8sQ0FBQyxDQUFBO01BQUNBLE1BQUFBLGVBQWUsSUFBRSxDQUFDLENBQUE7WUFBQyxJQUFJeUIsUUFBUSxHQUFDckIsTUFBTSxDQUFBO01BQUMsTUFBQSxJQUFJc0IsZUFBZSxHQUFDMUIsZUFBZSxHQUFDblgsR0FBRyxDQUFDNUQsTUFBTSxHQUFDLENBQUMsR0FBQythLGVBQWUsR0FBQyxDQUFDLEdBQUNuWCxHQUFHLENBQUM1RCxNQUFNLENBQUE7WUFBQyxLQUFJLElBQUl5RixDQUFDLEdBQUMsQ0FBQyxFQUFDQSxDQUFDLEdBQUNnWCxlQUFlLEVBQUMsRUFBRWhYLENBQUMsRUFBQztNQUFDLFFBQUEsSUFBSTZXLFFBQVEsR0FBQzFZLEdBQUcsQ0FBQ3lDLFVBQVUsQ0FBQ1osQ0FBQyxDQUFDLENBQUE7TUFBQy9HLFFBQUFBLE1BQU0sQ0FBQ3ljLE1BQU0sSUFBRSxDQUFDLENBQUMsR0FBQ21CLFFBQVEsQ0FBQTtNQUFDbkIsUUFBQUEsTUFBTSxJQUFFLENBQUMsQ0FBQTtNQUFBLE9BQUE7TUFBQ3pjLE1BQUFBLE1BQU0sQ0FBQ3ljLE1BQU0sSUFBRSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUE7WUFBQyxPQUFPQSxNQUFNLEdBQUNxQixRQUFRLENBQUE7TUFBQSxLQUFBO1VBQUMsU0FBU0UsZ0JBQWdCQSxDQUFDOVksR0FBRyxFQUFDO01BQUMsTUFBQSxPQUFPQSxHQUFHLENBQUM1RCxNQUFNLEdBQUMsQ0FBQyxDQUFBO01BQUEsS0FBQTtNQUFDLElBQUEsU0FBUzJjLGFBQWFBLENBQUN2WSxHQUFHLEVBQUNiLGNBQWMsRUFBQztZQUFDLElBQUlrQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO1lBQUMsSUFBSTdCLEdBQUcsR0FBQyxFQUFFLENBQUE7TUFBQyxNQUFBLE9BQU0sRUFBRTZCLENBQUMsSUFBRWxDLGNBQWMsR0FBQyxDQUFDLENBQUMsRUFBQztjQUFDLElBQUlxWixLQUFLLEdBQUNoZSxNQUFNLENBQUN3RixHQUFHLEdBQUNxQixDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFBO2NBQUMsSUFBR21YLEtBQUssSUFBRSxDQUFDLEVBQUMsTUFBQTtNQUFNLFFBQUEsRUFBRW5YLENBQUMsQ0FBQTtjQUFDLElBQUdtWCxLQUFLLElBQUUsS0FBSyxFQUFDO01BQUMsVUFBQSxJQUFJMVksRUFBRSxHQUFDMFksS0FBSyxHQUFDLEtBQUssQ0FBQTtNQUFDaFosVUFBQUEsR0FBRyxJQUFFRSxNQUFNLENBQUNDLFlBQVksQ0FBQyxLQUFLLEdBQUNHLEVBQUUsSUFBRSxFQUFFLEVBQUMsS0FBSyxHQUFDQSxFQUFFLEdBQUMsSUFBSSxDQUFDLENBQUE7TUFBQSxTQUFDLE1BQUk7TUFBQ04sVUFBQUEsR0FBRyxJQUFFRSxNQUFNLENBQUNDLFlBQVksQ0FBQzZZLEtBQUssQ0FBQyxDQUFBO01BQUEsU0FBQTtNQUFDLE9BQUE7TUFBQyxNQUFBLE9BQU9oWixHQUFHLENBQUE7TUFBQSxLQUFBO01BQUMsSUFBQSxTQUFTaVosYUFBYUEsQ0FBQ2paLEdBQUcsRUFBQ3VYLE1BQU0sRUFBQ0osZUFBZSxFQUFDO1lBQUMsSUFBR0EsZUFBZSxLQUFHeGUsU0FBUyxFQUFDO01BQUN3ZSxRQUFBQSxlQUFlLEdBQUMsVUFBVSxDQUFBO01BQUEsT0FBQTtNQUFDLE1BQUEsSUFBR0EsZUFBZSxHQUFDLENBQUMsRUFBQyxPQUFPLENBQUMsQ0FBQTtZQUFDLElBQUl5QixRQUFRLEdBQUNyQixNQUFNLENBQUE7TUFBQyxNQUFBLElBQUkxWCxNQUFNLEdBQUMrWSxRQUFRLEdBQUN6QixlQUFlLEdBQUMsQ0FBQyxDQUFBO01BQUMsTUFBQSxLQUFJLElBQUl0VixDQUFDLEdBQUMsQ0FBQyxFQUFDQSxDQUFDLEdBQUM3QixHQUFHLENBQUM1RCxNQUFNLEVBQUMsRUFBRXlGLENBQUMsRUFBQztNQUFDLFFBQUEsSUFBSTZXLFFBQVEsR0FBQzFZLEdBQUcsQ0FBQ3lDLFVBQVUsQ0FBQ1osQ0FBQyxDQUFDLENBQUE7TUFBQyxRQUFBLElBQUc2VyxRQUFRLElBQUUsS0FBSyxJQUFFQSxRQUFRLElBQUUsS0FBSyxFQUFDO2dCQUFDLElBQUlRLGNBQWMsR0FBQ2xaLEdBQUcsQ0FBQ3lDLFVBQVUsQ0FBQyxFQUFFWixDQUFDLENBQUMsQ0FBQTtNQUFDNlcsVUFBQUEsUUFBUSxHQUFDLEtBQUssSUFBRSxDQUFDQSxRQUFRLEdBQUMsSUFBSSxLQUFHLEVBQUUsQ0FBQyxHQUFDUSxjQUFjLEdBQUMsSUFBSSxDQUFBO01BQUEsU0FBQTtNQUFDbGUsUUFBQUEsTUFBTSxDQUFDdWMsTUFBTSxJQUFFLENBQUMsQ0FBQyxHQUFDbUIsUUFBUSxDQUFBO01BQUNuQixRQUFBQSxNQUFNLElBQUUsQ0FBQyxDQUFBO01BQUMsUUFBQSxJQUFHQSxNQUFNLEdBQUMsQ0FBQyxHQUFDMVgsTUFBTSxFQUFDLE1BQUE7TUFBSyxPQUFBO01BQUM3RSxNQUFBQSxNQUFNLENBQUN1YyxNQUFNLElBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO1lBQUMsT0FBT0EsTUFBTSxHQUFDcUIsUUFBUSxDQUFBO01BQUEsS0FBQTtVQUFDLFNBQVNPLGdCQUFnQkEsQ0FBQ25aLEdBQUcsRUFBQztZQUFDLElBQUl5WCxHQUFHLEdBQUMsQ0FBQyxDQUFBO01BQUMsTUFBQSxLQUFJLElBQUk1VixDQUFDLEdBQUMsQ0FBQyxFQUFDQSxDQUFDLEdBQUM3QixHQUFHLENBQUM1RCxNQUFNLEVBQUMsRUFBRXlGLENBQUMsRUFBQztNQUFDLFFBQUEsSUFBSTZXLFFBQVEsR0FBQzFZLEdBQUcsQ0FBQ3lDLFVBQVUsQ0FBQ1osQ0FBQyxDQUFDLENBQUE7Y0FBQyxJQUFHNlcsUUFBUSxJQUFFLEtBQUssSUFBRUEsUUFBUSxJQUFFLEtBQUssRUFBQyxFQUFFN1csQ0FBQyxDQUFBO01BQUM0VixRQUFBQSxHQUFHLElBQUUsQ0FBQyxDQUFBO01BQUEsT0FBQTtNQUFDLE1BQUEsT0FBT0EsR0FBRyxDQUFBO01BQUEsS0FBQTtNQUFDLElBQUEsU0FBUzJCLDZCQUE2QkEsQ0FBQ3ZVLE9BQU8sRUFBQ3dVLFFBQVEsRUFBQ2pZLElBQUksRUFBQztNQUFDQSxNQUFBQSxJQUFJLEdBQUNXLGdCQUFnQixDQUFDWCxJQUFJLENBQUMsQ0FBQTtZQUFDLElBQUlrWSxZQUFZLEVBQUNDLFlBQVksRUFBQ0MsT0FBTyxFQUFDQyxjQUFjLEVBQUNuZCxLQUFLLENBQUE7WUFBQyxJQUFHK2MsUUFBUSxLQUFHLENBQUMsRUFBQztNQUFDQyxRQUFBQSxZQUFZLEdBQUNkLGFBQWEsQ0FBQTtNQUFDZSxRQUFBQSxZQUFZLEdBQUNaLGFBQWEsQ0FBQTtNQUFDYyxRQUFBQSxjQUFjLEdBQUNYLGdCQUFnQixDQUFBO2NBQUNVLE9BQU8sR0FBQyxTQUFBQSxPQUFBLEdBQUE7TUFBQSxVQUFBLE9BQUl6ZSxPQUFPLENBQUE7TUFBQSxTQUFBLENBQUE7TUFBQ3VCLFFBQUFBLEtBQUssR0FBQyxDQUFDLENBQUE7TUFBQSxPQUFDLE1BQUssSUFBRytjLFFBQVEsS0FBRyxDQUFDLEVBQUM7TUFBQ0MsUUFBQUEsWUFBWSxHQUFDUCxhQUFhLENBQUE7TUFBQ1EsUUFBQUEsWUFBWSxHQUFDTixhQUFhLENBQUE7TUFBQ1EsUUFBQUEsY0FBYyxHQUFDTixnQkFBZ0IsQ0FBQTtjQUFDSyxPQUFPLEdBQUMsU0FBQUEsT0FBQSxHQUFBO01BQUEsVUFBQSxPQUFJdmUsT0FBTyxDQUFBO01BQUEsU0FBQSxDQUFBO01BQUNxQixRQUFBQSxLQUFLLEdBQUMsQ0FBQyxDQUFBO01BQUEsT0FBQTtZQUFDaUksWUFBWSxDQUFDTSxPQUFPLEVBQUM7TUFBQ3pELFFBQUFBLElBQUksRUFBQ0EsSUFBSTtNQUFDLFFBQUEsY0FBYyxFQUFDLFNBQUFnRSxZQUFTb0MsQ0FBQUEsS0FBSyxFQUFDO01BQUMsVUFBQSxJQUFJcEwsTUFBTSxHQUFDbkIsT0FBTyxDQUFDdU0sS0FBSyxJQUFFLENBQUMsQ0FBQyxDQUFBO01BQUMsVUFBQSxJQUFJa1MsSUFBSSxHQUFDRixPQUFPLEVBQUUsQ0FBQTtNQUFDLFVBQUEsSUFBSXhaLEdBQUcsQ0FBQTtNQUFDLFVBQUEsSUFBSTZYLGNBQWMsR0FBQ3JRLEtBQUssR0FBQyxDQUFDLENBQUE7Z0JBQUMsS0FBSSxJQUFJM0YsQ0FBQyxHQUFDLENBQUMsRUFBQ0EsQ0FBQyxJQUFFekYsTUFBTSxFQUFDLEVBQUV5RixDQUFDLEVBQUM7a0JBQUMsSUFBSWlXLGNBQWMsR0FBQ3RRLEtBQUssR0FBQyxDQUFDLEdBQUMzRixDQUFDLEdBQUN3WCxRQUFRLENBQUE7TUFBQyxZQUFBLElBQUd4WCxDQUFDLElBQUV6RixNQUFNLElBQUVzZCxJQUFJLENBQUM1QixjQUFjLElBQUV4YixLQUFLLENBQUMsSUFBRSxDQUFDLEVBQUM7TUFBQyxjQUFBLElBQUlxZCxZQUFZLEdBQUM3QixjQUFjLEdBQUNELGNBQWMsQ0FBQTtNQUFDLGNBQUEsSUFBSUcsYUFBYSxHQUFDc0IsWUFBWSxDQUFDekIsY0FBYyxFQUFDOEIsWUFBWSxDQUFDLENBQUE7b0JBQUMsSUFBRzNaLEdBQUcsS0FBR3JILFNBQVMsRUFBQztNQUFDcUgsZ0JBQUFBLEdBQUcsR0FBQ2dZLGFBQWEsQ0FBQTtNQUFBLGVBQUMsTUFBSTtNQUFDaFksZ0JBQUFBLEdBQUcsSUFBRUUsTUFBTSxDQUFDQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7TUFBQ0gsZ0JBQUFBLEdBQUcsSUFBRWdZLGFBQWEsQ0FBQTtNQUFBLGVBQUE7b0JBQUNILGNBQWMsR0FBQ0MsY0FBYyxHQUFDdUIsUUFBUSxDQUFBO01BQUEsYUFBQTtNQUFDLFdBQUE7Z0JBQUNoTCxNQUFLLENBQUM3RyxLQUFLLENBQUMsQ0FBQTtNQUFDLFVBQUEsT0FBT3hILEdBQUcsQ0FBQTtlQUFDO01BQUMsUUFBQSxZQUFZLEVBQUMsU0FBQXNGLFVBQUFBLENBQVNDLFdBQVcsRUFBQ2lDLEtBQUssRUFBQztNQUFDLFVBQUEsSUFBRyxFQUFFLE9BQU9BLEtBQUssSUFBRSxRQUFRLENBQUMsRUFBQztrQkFBQzdELGlCQUFpQixDQUFBLDRDQUFBLEdBQThDdkMsSUFBTSxDQUFDLENBQUE7TUFBQSxXQUFBO01BQUMsVUFBQSxJQUFJaEYsTUFBTSxHQUFDcWQsY0FBYyxDQUFDalMsS0FBSyxDQUFDLENBQUE7Z0JBQUMsSUFBSWhILEdBQUcsR0FBQzZYLFFBQU8sQ0FBQyxDQUFDLEdBQUNqYyxNQUFNLEdBQUNpZCxRQUFRLENBQUMsQ0FBQTtnQkFBQ3BlLE9BQU8sQ0FBQ3VGLEdBQUcsSUFBRSxDQUFDLENBQUMsR0FBQ3BFLE1BQU0sSUFBRUUsS0FBSyxDQUFBO2dCQUFDaWQsWUFBWSxDQUFDL1IsS0FBSyxFQUFDaEgsR0FBRyxHQUFDLENBQUMsRUFBQ3BFLE1BQU0sR0FBQ2lkLFFBQVEsQ0FBQyxDQUFBO2dCQUFDLElBQUc5VCxXQUFXLEtBQUcsSUFBSSxFQUFDO01BQUNBLFlBQUFBLFdBQVcsQ0FBQ1gsSUFBSSxDQUFDeUosTUFBSyxFQUFDN04sR0FBRyxDQUFDLENBQUE7TUFBQSxXQUFBO01BQUMsVUFBQSxPQUFPQSxHQUFHLENBQUE7ZUFBQztNQUFDLFFBQUEsZ0JBQWdCLEVBQUMsQ0FBQztNQUFDLFFBQUEsc0JBQXNCLEVBQUMrTCwwQkFBMEI7TUFBQzNHLFFBQUFBLGtCQUFrQixFQUFDLFNBQUFBLGtCQUFTcEYsQ0FBQUEsR0FBRyxFQUFDO2dCQUFDNk4sTUFBSyxDQUFDN04sR0FBRyxDQUFDLENBQUE7TUFBQSxTQUFBO01BQUMsT0FBQyxDQUFDLENBQUE7TUFBQSxLQUFBO01BQUMsSUFBQSxTQUFTb1osc0JBQXNCQSxDQUFDL1UsT0FBTyxFQUFDekQsSUFBSSxFQUFDO01BQUNBLE1BQUFBLElBQUksR0FBQ1csZ0JBQWdCLENBQUNYLElBQUksQ0FBQyxDQUFBO1lBQUNtRCxZQUFZLENBQUNNLE9BQU8sRUFBQztNQUFDZ1YsUUFBQUEsTUFBTSxFQUFDLElBQUk7TUFBQ3pZLFFBQUFBLElBQUksRUFBQ0EsSUFBSTtNQUFDLFFBQUEsZ0JBQWdCLEVBQUMsQ0FBQztjQUFDLGNBQWMsRUFBQyxTQUFBZ0UsWUFBQUEsR0FBVTtNQUFDLFVBQUEsT0FBT3pNLFNBQVMsQ0FBQTtlQUFDO01BQUMsUUFBQSxZQUFZLEVBQUMsU0FBQTJNLFVBQUFBLENBQVNDLFdBQVcsRUFBQ0MsQ0FBQyxFQUFDO01BQUMsVUFBQSxPQUFPN00sU0FBUyxDQUFBO01BQUEsU0FBQTtNQUFDLE9BQUMsQ0FBQyxDQUFBO01BQUEsS0FBQTtNQUFDLElBQUEsU0FBU21oQixVQUFVQSxDQUFDNVMsTUFBTSxFQUFDNlMsVUFBVSxFQUFDQyxjQUFjLEVBQUM7TUFBQzlTLE1BQUFBLE1BQU0sR0FBQ2tGLEtBQUssQ0FBQ3dJLE9BQU8sQ0FBQzFOLE1BQU0sQ0FBQyxDQUFBO01BQUM2UyxNQUFBQSxVQUFVLEdBQUMzRSxxQkFBcUIsQ0FBQzJFLFVBQVUsRUFBQyxXQUFXLENBQUMsQ0FBQTtZQUFDLElBQUl4VSxXQUFXLEdBQUMsRUFBRSxDQUFBO01BQUMsTUFBQSxJQUFJMFUsRUFBRSxHQUFDN04sS0FBSyxDQUFDQyxRQUFRLENBQUM5RyxXQUFXLENBQUMsQ0FBQTtNQUFDdEssTUFBQUEsT0FBTyxDQUFDK2UsY0FBYyxJQUFFLENBQUMsQ0FBQyxHQUFDQyxFQUFFLENBQUE7WUFBQyxPQUFPRixVQUFVLENBQUMsWUFBWSxDQUFDLENBQUN4VSxXQUFXLEVBQUMyQixNQUFNLENBQUMsQ0FBQTtNQUFBLEtBQUE7VUFBQyxTQUFTZ1QsY0FBY0EsQ0FBQ2hULE1BQU0sRUFBQztZQUFDLElBQUdBLE1BQU0sR0FBQyxDQUFDLEVBQUM7Y0FBQ29OLGFBQWEsQ0FBQy9HLEdBQUcsQ0FBQ3JHLE1BQU0sQ0FBQyxDQUFDdU4sUUFBUSxJQUFFLENBQUMsQ0FBQTtNQUFBLE9BQUE7TUFBQyxLQUFBO1VBQUMsU0FBUzBGLHVCQUF1QkEsQ0FBQ2pULE1BQU0sRUFBQztNQUFDLE1BQUEsSUFBSTNCLFdBQVcsR0FBQzZHLEtBQUssQ0FBQ3dJLE9BQU8sQ0FBQzFOLE1BQU0sQ0FBQyxDQUFBO1lBQUMySSxjQUFjLENBQUN0SyxXQUFXLENBQUMsQ0FBQTtZQUFDZ1AsY0FBYyxDQUFDck4sTUFBTSxDQUFDLENBQUE7TUFBQSxLQUFBO01BQUMsSUFBQSxTQUFTa1Qsa0JBQWtCQSxDQUFDalcsSUFBSSxFQUFDa1csR0FBRyxFQUFDO01BQUNsVyxNQUFBQSxJQUFJLEdBQUNpUixxQkFBcUIsQ0FBQ2pSLElBQUksRUFBQyxtQkFBbUIsQ0FBQyxDQUFBO1lBQUMsSUFBSTRPLENBQUMsR0FBQzVPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDa1csR0FBRyxDQUFDLENBQUE7TUFBQyxNQUFBLE9BQU9qTyxLQUFLLENBQUNDLFFBQVEsQ0FBQzBHLENBQUMsQ0FBQyxDQUFBO01BQUEsS0FBQTtVQUFDLFNBQVN1SCxNQUFNQSxHQUFFO1lBQUNoZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFBO01BQUEsS0FBQTtNQUFDLElBQUEsU0FBU2lnQixzQkFBc0JBLENBQUNDLElBQUksRUFBQzloQixHQUFHLEVBQUMraEIsR0FBRyxFQUFDO1lBQUM1ZixNQUFNLENBQUM2ZixVQUFVLENBQUNGLElBQUksRUFBQzloQixHQUFHLEVBQUNBLEdBQUcsR0FBQytoQixHQUFHLENBQUMsQ0FBQTtNQUFBLEtBQUE7VUFBQyxTQUFTRSxVQUFVQSxHQUFFO01BQUMsTUFBQSxPQUFPLFVBQVUsQ0FBQTtNQUFBLEtBQUE7VUFBQyxTQUFTQyx5QkFBeUJBLENBQUN2WixJQUFJLEVBQUM7TUFBQyxNQUFBLElBQUloRyxDQUFDLEdBQUNkLFVBQVUsQ0FBQ2UsTUFBTSxDQUFBO1lBQUMsSUFBSXVmLEtBQUssR0FBQ3haLElBQUksR0FBQ2hHLENBQUMsQ0FBQ3lmLFVBQVUsR0FBQyxLQUFLLEtBQUcsRUFBRSxDQUFBO1lBQUMsSUFBRztNQUFDdmdCLFFBQUFBLFVBQVUsQ0FBQ3dnQixJQUFJLENBQUNGLEtBQUssQ0FBQyxDQUFBO01BQUN6ZixRQUFBQSxpQkFBaUIsRUFBRSxDQUFBO01BQUMsUUFBQSxPQUFPLENBQUMsQ0FBQTthQUFDLENBQUEsT0FBTWlDLENBQUMsRUFBQyxFQUFDO01BQUMsS0FBQTtVQUFDLFNBQVMyZCx1QkFBdUJBLENBQUNDLGFBQWEsRUFBQztNQUFDLE1BQUEsSUFBSUMsT0FBTyxHQUFDcmdCLE1BQU0sQ0FBQ3VCLE1BQU0sQ0FBQTtZQUFDNmUsYUFBYSxHQUFDQSxhQUFhLEtBQUcsQ0FBQyxDQUFBO01BQUMsTUFBQSxJQUFJRSxXQUFXLEdBQUNSLFVBQVUsRUFBRSxDQUFBO1lBQUMsSUFBR00sYUFBYSxHQUFDRSxXQUFXLEVBQUM7TUFBQyxRQUFBLE9BQU8sS0FBSyxDQUFBO01BQUEsT0FBQTtNQUFDLE1BQUEsSUFBSUMsT0FBTyxHQUFDLFNBQVJBLE9BQU9BLENBQUVDLENBQUMsRUFBQ0MsUUFBUSxFQUFBO2NBQUEsT0FBR0QsQ0FBQyxHQUFDLENBQUNDLFFBQVEsR0FBQ0QsQ0FBQyxHQUFDQyxRQUFRLElBQUVBLFFBQVEsQ0FBQTtNQUFBLE9BQUEsQ0FBQTtNQUFDLE1BQUEsS0FBSSxJQUFJQyxPQUFPLEdBQUMsQ0FBQyxFQUFDQSxPQUFPLElBQUUsQ0FBQyxFQUFDQSxPQUFPLElBQUUsQ0FBQyxFQUFDO2NBQUMsSUFBSUMsaUJBQWlCLEdBQUNOLE9BQU8sSUFBRSxDQUFDLEdBQUMsRUFBRSxHQUFDSyxPQUFPLENBQUMsQ0FBQTtjQUFDQyxpQkFBaUIsR0FBQ0MsSUFBSSxDQUFDQyxHQUFHLENBQUNGLGlCQUFpQixFQUFDUCxhQUFhLEdBQUMsU0FBUyxDQUFDLENBQUE7Y0FBQyxJQUFJVSxPQUFPLEdBQUNGLElBQUksQ0FBQ0MsR0FBRyxDQUFDUCxXQUFXLEVBQUNDLE9BQU8sQ0FBQ0ssSUFBSSxDQUFDRyxHQUFHLENBQUNYLGFBQWEsRUFBQ08saUJBQWlCLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO01BQUMsUUFBQSxJQUFJSyxXQUFXLEdBQUNqQix5QkFBeUIsQ0FBQ2UsT0FBTyxDQUFDLENBQUE7TUFBQyxRQUFBLElBQUdFLFdBQVcsRUFBQztNQUFDLFVBQUEsT0FBTyxJQUFJLENBQUE7TUFBQSxTQUFBO01BQUMsT0FBQTtNQUFDLE1BQUEsT0FBTyxLQUFLLENBQUE7TUFBQSxLQUFBO1VBQUMsU0FBU0MsU0FBU0EsQ0FBQ3BiLEVBQUUsRUFBQztNQUFDLE1BQUEsT0FBTyxFQUFFLENBQUE7TUFBQSxLQUFBO1VBQUMsU0FBU3FiLFFBQVFBLENBQUNyYixFQUFFLEVBQUNzYixHQUFHLEVBQUNDLE1BQU0sRUFBQ0MsSUFBSSxFQUFDO01BQUMsTUFBQSxPQUFPLEVBQUUsQ0FBQTtNQUFBLEtBQUE7VUFBQyxTQUFTQyxRQUFRQSxDQUFDemIsRUFBRSxFQUFDMGIsVUFBVSxFQUFDQyxXQUFXLEVBQUNDLE1BQU0sRUFBQ0MsU0FBUyxFQUFDO01BQUMsTUFBQSxPQUFPLEVBQUUsQ0FBQTtNQUFBLEtBQUE7VUFBQyxJQUFJQyxnQkFBZ0IsR0FBQyxDQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUE7TUFBQyxJQUFBLFNBQVNDLFNBQVNBLENBQUNDLE1BQU0sRUFBQ0MsSUFBSSxFQUFDO01BQUMsTUFBQSxJQUFJcmhCLE1BQU0sR0FBQ2toQixnQkFBZ0IsQ0FBQ0UsTUFBTSxDQUFDLENBQUE7TUFBQyxNQUFBLElBQUdDLElBQUksS0FBRyxDQUFDLElBQUVBLElBQUksS0FBRyxFQUFFLEVBQUM7TUFBQyxRQUFBLENBQUNELE1BQU0sS0FBRyxDQUFDLEdBQUM1aUIsR0FBRyxHQUFDSSxHQUFHLEVBQUVzRixpQkFBaUIsQ0FBQ2xFLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2NBQUNBLE1BQU0sQ0FBQ2MsTUFBTSxHQUFDLENBQUMsQ0FBQTtNQUFBLE9BQUMsTUFBSTtNQUFDZCxRQUFBQSxNQUFNLENBQUNzSixJQUFJLENBQUMrWCxJQUFJLENBQUMsQ0FBQTtNQUFBLE9BQUE7TUFBQyxLQUFBO1VBQUMsU0FBU0MsU0FBU0EsQ0FBQ2xjLEVBQUUsRUFBQ3NiLEdBQUcsRUFBQ0MsTUFBTSxFQUFDQyxJQUFJLEVBQUM7WUFBQyxJQUFJekIsR0FBRyxHQUFDLENBQUMsQ0FBQTtZQUFDLEtBQUksSUFBSTVZLENBQUMsR0FBQyxDQUFDLEVBQUNBLENBQUMsR0FBQ29hLE1BQU0sRUFBQ3BhLENBQUMsRUFBRSxFQUFDO01BQUMsUUFBQSxJQUFJckIsR0FBRyxHQUFDdkYsT0FBTyxDQUFDK2dCLEdBQUcsSUFBRSxDQUFDLENBQUMsQ0FBQTtjQUFDLElBQUl2RSxHQUFHLEdBQUN4YyxPQUFPLENBQUMrZ0IsR0FBRyxHQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQTtNQUFDQSxRQUFBQSxHQUFHLElBQUUsQ0FBQyxDQUFBO2NBQUMsS0FBSSxJQUFJYSxDQUFDLEdBQUMsQ0FBQyxFQUFDQSxDQUFDLEdBQUNwRixHQUFHLEVBQUNvRixDQUFDLEVBQUUsRUFBQztnQkFBQ0osU0FBUyxDQUFDL2IsRUFBRSxFQUFDN0YsTUFBTSxDQUFDMkYsR0FBRyxHQUFDcWMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtNQUFBLFNBQUE7TUFBQ3BDLFFBQUFBLEdBQUcsSUFBRWhELEdBQUcsQ0FBQTtNQUFBLE9BQUE7TUFBQ3hjLE1BQUFBLE9BQU8sQ0FBQ2loQixJQUFJLElBQUUsQ0FBQyxDQUFDLEdBQUN6QixHQUFHLENBQUE7TUFBQyxNQUFBLE9BQU8sQ0FBQyxDQUFBO01BQUEsS0FBQTtVQUFDLFNBQVNxQyw0QkFBNEJBLEdBQUU7TUFBQyxNQUFBLElBQUlDLFFBQVEsR0FBQ25rQixNQUFNLENBQUMsZUFBZSxDQUFDLENBQUE7TUFBQyxNQUFBLElBQUlva0IsVUFBVSxHQUFDRCxRQUFRLENBQUNFLG9CQUFvQixFQUFFLENBQUE7TUFBQyxNQUFBLElBQUlDLFVBQVUsR0FBQ0gsUUFBUSxDQUFDSSxvQkFBb0IsRUFBRSxDQUFBO01BQUMsTUFBQSxJQUFJQyxLQUFLLEdBQUNMLFFBQVEsQ0FBQ00sZUFBZSxFQUFFLENBQUE7TUFBQyxNQUFBLElBQUlDLFNBQVMsR0FBQ1AsUUFBUSxDQUFDUSxtQkFBbUIsRUFBRSxDQUFBO01BQUNDLE1BQUFBLFVBQVUsQ0FBQ0MsbUJBQW1CLENBQUNDLFlBQVksQ0FBQ1YsVUFBVSxFQUFDRSxVQUFVLEVBQUNFLEtBQUssRUFBQ0UsU0FBUyxDQUFDOVYsS0FBSyxDQUFDLENBQUE7TUFBQSxLQUFBO1VBQUMsU0FBU21XLDJCQUEyQkEsR0FBRTtNQUFDLE1BQUEsSUFBSVosUUFBUSxHQUFDbmtCLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQTtNQUFDLE1BQUEsSUFBSW9rQixVQUFVLEdBQUNELFFBQVEsQ0FBQ0Usb0JBQW9CLEVBQUUsQ0FBQTtNQUFDLE1BQUEsSUFBSUssU0FBUyxHQUFDUCxRQUFRLENBQUNRLG1CQUFtQixFQUFFLENBQUE7TUFBQyxNQUFBLElBQUlMLFVBQVUsR0FBQ0gsUUFBUSxDQUFDSSxvQkFBb0IsRUFBRSxDQUFBO01BQUMsTUFBQSxJQUFJQyxLQUFLLEdBQUNMLFFBQVEsQ0FBQ00sZUFBZSxFQUFFLENBQUE7TUFBQ0csTUFBQUEsVUFBVSxDQUFDQyxtQkFBbUIsQ0FBQ0csc0JBQXNCLENBQUNaLFVBQVUsRUFBQ0UsVUFBVSxFQUFDRSxLQUFLLEVBQUNFLFNBQVMsQ0FBQzlWLEtBQUssQ0FBQyxDQUFBO01BQUEsS0FBQTtNQUFDOUYsSUFBQUEscUJBQXFCLEVBQUUsQ0FBQTtVQUFDZ0MsWUFBWSxHQUFDOUssTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFDbUssV0FBVyxDQUFDTSxLQUFLLEVBQUMsY0FBYyxDQUFDLENBQUE7VUFBQ08sYUFBYSxHQUFDaEwsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFDbUssV0FBVyxDQUFDTSxLQUFLLEVBQUMsZUFBZSxDQUFDLENBQUE7TUFBQ3lILElBQUFBLGdCQUFnQixFQUFFLENBQUE7TUFBQ25DLElBQUFBLFdBQVcsRUFBRSxDQUFBO01BQUNpRSxJQUFBQSxzQkFBc0IsRUFBRSxDQUFBO1VBQUNzQixnQkFBZ0IsR0FBQ3RWLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFDbUssV0FBVyxDQUFDTSxLQUFLLEVBQUMsa0JBQWtCLENBQUMsQ0FBQTtNQUFDc1IsSUFBQUEsVUFBVSxFQUFFLENBQUE7TUFBQyxJQUFBLElBQUkzVixXQUFXLEdBQUM7TUFBQyxNQUFBLEdBQUcsRUFBQ3lCLGtCQUFrQjtNQUFDLE1BQUEsR0FBRyxFQUFDSSxnQkFBZ0I7TUFBQyxNQUFBLEdBQUcsRUFBQ0UsaUJBQWlCO01BQUMsTUFBQSxHQUFHLEVBQUNHLHdCQUF3QjtNQUFDLE1BQUEsR0FBRyxFQUFDK0Qsc0JBQXNCO01BQUMsTUFBQSxHQUFHLEVBQUM0Six1QkFBdUI7TUFBQyxNQUFBLEdBQUcsRUFBQ29DLHNDQUFzQztNQUFDLE1BQUEsR0FBRyxFQUFDa0Isc0NBQXNDO01BQUMsTUFBQSxHQUFHLEVBQUNlLG1DQUFtQztNQUFDLE1BQUEsR0FBRyxFQUFDRyxnQ0FBZ0M7TUFBQyxNQUFBLEdBQUcsRUFBQ00sZ0NBQWdDO01BQUMsTUFBQSxHQUFHLEVBQUNrQix1QkFBdUI7TUFBQyxNQUFBLEdBQUcsRUFBQ0csc0JBQXNCO01BQUMsTUFBQSxHQUFHLEVBQUNNLDRCQUE0QjtNQUFDLE1BQUEsR0FBRyxFQUFDUSx1QkFBdUI7TUFBQyxNQUFBLEdBQUcsRUFBQ1EseUJBQXlCO01BQUMsTUFBQSxHQUFHLEVBQUNLLDZCQUE2QjtNQUFDLE1BQUEsR0FBRyxFQUFDZSw0QkFBNEI7TUFBQyxNQUFBLEdBQUcsRUFBQzBCLDZCQUE2QjtNQUFDLE1BQUEsR0FBRyxFQUFDUSxzQkFBc0I7TUFBQyxNQUFBLEdBQUcsRUFBQ0UsVUFBVTtNQUFDLE1BQUEsR0FBRyxFQUFDdkYsY0FBYztNQUFDLE1BQUEsR0FBRyxFQUFDMkYsY0FBYztNQUFDLE1BQUEsR0FBRyxFQUFDQyx1QkFBdUI7TUFBQyxNQUFBLEdBQUcsRUFBQ0Msa0JBQWtCO01BQUMsTUFBQSxHQUFHLEVBQUNFLE1BQU07TUFBQyxNQUFBLEdBQUcsRUFBQ0Msc0JBQXNCO01BQUMsTUFBQSxHQUFHLEVBQUNTLHVCQUF1QjtNQUFDLE1BQUEsR0FBRyxFQUFDYyxTQUFTO01BQUMsTUFBQSxHQUFHLEVBQUNDLFFBQVE7TUFBQyxNQUFBLEdBQUcsRUFBQ0ksUUFBUTtNQUFDLE1BQUEsR0FBRyxFQUFDUyxTQUFTO01BQUMsTUFBQSxHQUFHLEVBQUNFLDRCQUE0QjtNQUFDLE1BQUEsR0FBRyxFQUFDYSwyQkFBQUE7V0FBNEIsQ0FBQTtNQUFDLElBQVE3ZSxVQUFVLEdBQUU7TUFBd0csSUFBQSxJQUFJdVosUUFBTyxHQUFDLFNBQUFBLE9BQUFBLEdBQVU7TUFBQyxNQUFBLE9BQU0sQ0FBQ0EsUUFBTyxHQUFDemYsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFaUssS0FBSyxDQUFDLElBQUksRUFBQ0MsU0FBUyxDQUFDLENBQUE7V0FBQyxDQUFBO01BQUMsSUFBQSxJQUFJdUwsTUFBSyxHQUFDLFNBQUFBLEtBQUFBLEdBQVU7TUFBQyxNQUFBLE9BQU0sQ0FBQ0EsTUFBSyxHQUFDelYsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFaUssS0FBSyxDQUFDLElBQUksRUFBQ0MsU0FBUyxDQUFDLENBQUE7V0FBQyxDQUFBO01BQUMsSUFBQSxJQUFJc0wsWUFBYyxHQUFDLFNBQUFBLGNBQUFBLEdBQVU7TUFBQyxNQUFBLE9BQU0sQ0FBQ0EsWUFBYyxHQUFDeFYsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFaUssS0FBSyxDQUFDLElBQUksRUFBQ0MsU0FBUyxDQUFDLENBQUE7V0FBQyxDQUFBO01BQUMsSUFBaUNsSyxNQUFNLENBQUMsOEJBQThCLENBQUMsR0FBQyxZQUFVO1lBQUMsT0FBTSxDQUE4QkEsTUFBTSxDQUFDLDhCQUE4QixDQUFDLEdBQUNBLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRWlLLEtBQUssQ0FBQyxJQUFJLEVBQUNDLFNBQVMsQ0FBQyxDQUFBO1lBQUM7TUFBcUgsSUFBaUJsSyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUMsWUFBVTtZQUFDLE9BQU0sQ0FBY0EsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFDQSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUVpSyxLQUFLLENBQUMsSUFBSSxFQUFDQyxTQUFTLENBQUMsQ0FBQTtZQUFDO01BQUMsSUFBQSxJQUFJK2EsU0FBUyxDQUFBO01BQUM5Z0IsSUFBQUEscUJBQXFCLEdBQUMsU0FBUytnQixTQUFTQSxHQUFFO01BQUMsTUFBQSxJQUFHLENBQUNELFNBQVMsRUFBQ0UsR0FBRyxFQUFFLENBQUE7TUFBQyxNQUFBLElBQUcsQ0FBQ0YsU0FBUyxFQUFDOWdCLHFCQUFxQixHQUFDK2dCLFNBQVMsQ0FBQTtXQUFDLENBQUE7VUFBQyxTQUFTQyxHQUFHQSxHQUFFO1lBQUMsSUFBR2poQixlQUFlLEdBQUMsQ0FBQyxFQUFDO01BQUMsUUFBQSxPQUFBO01BQU0sT0FBQTtNQUFDWCxNQUFBQSxNQUFNLEVBQUUsQ0FBQTtZQUFDLElBQUdXLGVBQWUsR0FBQyxDQUFDLEVBQUM7TUFBQyxRQUFBLE9BQUE7TUFBTSxPQUFBO1lBQUMsU0FBU2toQixLQUFLQSxHQUFFO01BQUMsUUFBQSxJQUFHSCxTQUFTLEVBQUMsT0FBQTtNQUFPQSxRQUFBQSxTQUFTLEdBQUMsSUFBSSxDQUFBO01BQUNqbEIsUUFBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFDLElBQUksQ0FBQTtNQUFDLFFBQUEsSUFBRzRCLEtBQUssRUFBQyxPQUFBO01BQU9nQyxRQUFBQSxXQUFXLEVBQUUsQ0FBQTtjQUFDM0QsbUJBQW1CLENBQUNELE1BQU0sQ0FBQyxDQUFBO2NBQUMsSUFBR0EsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEVBQUNBLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLENBQUE7TUFBQzZELFFBQUFBLE9BQU8sRUFBRSxDQUFBO01BQUEsT0FBQTtNQUFDLE1BQUEsSUFBRzdELE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBQztNQUFDQSxRQUFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUE7TUFBQ3FsQixRQUFBQSxVQUFVLENBQUMsWUFBVTtNQUFDQSxVQUFBQSxVQUFVLENBQUMsWUFBVTtNQUFDcmxCLFlBQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtpQkFBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO01BQUNvbEIsVUFBQUEsS0FBSyxFQUFFLENBQUE7ZUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO01BQUEsT0FBQyxNQUFJO01BQUNBLFFBQUFBLEtBQUssRUFBRSxDQUFBO01BQUEsT0FBQTtNQUFDLEtBQUE7TUFBQyxJQUFBLElBQUdwbEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFDO01BQUMsTUFBQSxJQUFHLE9BQU9BLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBRSxVQUFVLEVBQUNBLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBQyxDQUFDQSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtZQUFDLE9BQU1BLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQ3dELE1BQU0sR0FBQyxDQUFDLEVBQUM7Y0FBQ3hELE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzJQLEdBQUcsRUFBRSxFQUFFLENBQUE7TUFBQSxPQUFBO01BQUMsS0FBQTtNQUFDd1YsSUFBQUEsR0FBRyxFQUFFLENBQUE7VUFHeDN0RCxPQUFPemxCLFNBQVMsQ0FBQzRsQixLQUFLLENBQUE7U0FDdkIsQ0FBQTtNQUdELENBQUM7Ozs7Ozs7OyJ9
