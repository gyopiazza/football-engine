/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client.js":
/*!*******************!*\
  !*** ./client.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var hyperapp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hyperapp */ \"./node_modules/hyperapp/hyperapp.js\");\n/* harmony import */ var hyperapp_fx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hyperapp-fx */ \"./node_modules/hyperapp-fx/src/index.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\nvar Log = function () {\n  var effectFn = function effectFn(dispatch, opts) {\n    return console.log(opts.message);\n  };\n\n  return function (message) {\n    return [effectFn, {\n      message: message\n    }];\n  };\n}(); // Actions\n\n\nvar cancelEditing = function cancelEditing(state) {\n  return _objectSpread(_objectSpread({}, state), {}, {\n    selectedSchema: {},\n    selectedRecord: {}\n  });\n};\n\nvar setSelectedSchema = function setSelectedSchema(state, schema) {\n  return _objectSpread(_objectSpread({}, state), {}, {\n    selectedSchema: schema,\n    selectedRecord: {}\n  });\n};\n\nvar setSelectedRecord = function setSelectedRecord(state, record) {\n  console.log('setSelectedRecord', record);\n  return _objectSpread(_objectSpread({}, state), {}, {\n    selectedRecord: record\n  });\n};\n\nvar loadData = function loadData(state, payload) {\n  return [state, getDataFx(payload) // Call a proxy-function\n  // [getData, payload]\n  ];\n};\n\nvar setData = function setData(state, payload) {\n  console.log('setData', payload);\n  return _objectSpread(_objectSpread({}, state), {}, {\n    schemas: payload.schemas,\n    records: payload.records\n  });\n}; // Effects\n\n\nvar getDataFx = function getDataFx(payload) {\n  console.log('getDataFx', payload);\n  return [getData, payload];\n}; // Side effects\n\n\nvar getData = function getData(dispatch, payload) {\n  console.log('getData', payload);\n  fetch('/api').then(function (response) {\n    return response.json();\n  }).then(function (response) {\n    return dispatch(setData, response);\n  });\n}; // Components\n\n\nfunction App(state) {\n  return Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"main\", null, Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"button\", {\n    onclick: [loadData, {\n      test: true\n    }]\n  }, \"load\"), (state.selectedSchema.name || state.selectedRecord.id) && Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"button\", {\n    onclick: cancelEditing\n  }, \"cancel editing\"), Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"h1\", null, \"Schemas\"), Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"ul\", null, Object.keys(state.schemas).map(function (schema) {\n    return Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"li\", {\n      onclick: [setSelectedSchema, state.schemas[schema]]\n    }, state.selectedSchema.name === schema ? '-> ' + schema : schema);\n  })), state.selectedSchema.name && Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(EditSchema, {\n    selectedSchema: state.selectedSchema,\n    selectedRecord: state.selectedRecord,\n    records: state.records[(state.selectedSchema.name || '').toLowerCase()] || []\n  }), Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"hr\", null), Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"pre\", null, JSON.stringify(state, null, 2)));\n}\n\nfunction EditSchema(_ref) {\n  var selectedSchema = _ref.selectedSchema,\n      selectedRecord = _ref.selectedRecord,\n      records = _ref.records;\n  return Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"div\", {\n    style: {\n      display: 'flex'\n    }\n  }, Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"div\", null, Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"h2\", null, selectedSchema.name, \" Schema\"), Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(Form, {\n    selectedSchema: selectedSchema\n  })), !selectedRecord.id && Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"div\", null, Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"h2\", null, selectedSchema.name, \" Records\"), records.map(function (record) {\n    return Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"div\", {\n      onclick: [setSelectedRecord, record]\n    }, selectedRecord.id === record.id ? '-> ' + record.name : record.name);\n  })), selectedRecord.id && Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(EditRecord, {\n    selectedSchema: selectedSchema,\n    selectedRecord: selectedRecord\n  }));\n}\n\nfunction EditRecord(_ref2) {\n  var selectedSchema = _ref2.selectedSchema,\n      selectedRecord = _ref2.selectedRecord;\n  return Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"div\", null, Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"h2\", null, \"Edit \\\"\", selectedRecord.name, \"\\\" Record\"), Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(Form, {\n    selectedSchema: selectedSchema,\n    selectedRecord: selectedRecord\n  }));\n}\n\nfunction Form(_ref3) {\n  var selectedSchema = _ref3.selectedSchema,\n      _ref3$selectedRecord = _ref3.selectedRecord,\n      selectedRecord = _ref3$selectedRecord === void 0 ? {} : _ref3$selectedRecord;\n  return Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"form\", null, Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"fieldset\", null, Object.keys(selectedSchema.properties).map(function (prop) {\n    return Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(Field, {\n      id: prop,\n      type: selectedSchema.properties[prop],\n      value: selectedRecord[prop]\n    });\n  })));\n}\n\nfunction Field(_ref4) {\n  var id = _ref4.id,\n      type = _ref4.type,\n      value = _ref4.value;\n  // const field = typeof type === 'string' ? { type } : type\n  var primitives = ['bool', 'int', 'float', 'double', 'string', 'data', 'date'];\n  var isPrimitive = primitives.indexOf(type) > -1;\n  return Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"div\", null, Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"input\", {\n    type: \"text\",\n    placeholder: id + ' ' + type,\n    value: value\n  }));\n}\n\nObject(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"app\"])({\n  init: {\n    selectedSchema: {},\n    selectedRecord: {},\n    schemas: [],\n    records: {}\n  },\n  view: function view(state) {\n    return App(state);\n  },\n  node: document.getElementById(\"app\")\n});\n\n//# sourceURL=webpack:///./client.js?");

/***/ }),

/***/ "./node_modules/hyperapp-fx/src/fxCreators.js":
/*!****************************************************!*\
  !*** ./node_modules/hyperapp-fx/src/fxCreators.js ***!
  \****************************************************/
/*! exports provided: action, frame, delay, time, log, http, event, keydown, keyup, random, debounce, throttle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"action\", function() { return action; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"frame\", function() { return frame; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"delay\", function() { return delay; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"time\", function() { return time; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"log\", function() { return log; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"http\", function() { return http; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"event\", function() { return event; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"keydown\", function() { return keydown; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"keyup\", function() { return keyup; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"random\", function() { return random; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"debounce\", function() { return debounce; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"throttle\", function() { return throttle; });\n/* harmony import */ var _fxTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fxTypes */ \"./node_modules/hyperapp-fx/src/fxTypes.js\");\n\n\nfunction action(name, data) {\n  return [\n    _fxTypes__WEBPACK_IMPORTED_MODULE_0__[\"ACTION\"],\n    {\n      name: name,\n      data: data\n    }\n  ]\n}\n\nfunction frame(action) {\n  return [\n    _fxTypes__WEBPACK_IMPORTED_MODULE_0__[\"FRAME\"],\n    {\n      action: action\n    }\n  ]\n}\n\nfunction delay(duration, action, data) {\n  return [\n    _fxTypes__WEBPACK_IMPORTED_MODULE_0__[\"DELAY\"],\n    {\n      duration: duration,\n      action: action,\n      data: data\n    }\n  ]\n}\n\nfunction time(action) {\n  return [\n    _fxTypes__WEBPACK_IMPORTED_MODULE_0__[\"TIME\"],\n    {\n      action: action\n    }\n  ]\n}\n\nfunction log() {\n  return [\n    _fxTypes__WEBPACK_IMPORTED_MODULE_0__[\"LOG\"],\n    {\n      args: arguments\n    }\n  ]\n}\n\nfunction http(url, action, options) {\n  return [\n    _fxTypes__WEBPACK_IMPORTED_MODULE_0__[\"HTTP\"],\n    {\n      url: url,\n      action: action,\n      options: options\n    }\n  ]\n}\n\nfunction event(action) {\n  return [\n    _fxTypes__WEBPACK_IMPORTED_MODULE_0__[\"EVENT\"],\n    {\n      action: action\n    }\n  ]\n}\n\nfunction keydown(action) {\n  return [\n    _fxTypes__WEBPACK_IMPORTED_MODULE_0__[\"KEY_DOWN\"],\n    {\n      action: action\n    }\n  ]\n}\n\nfunction keyup(action) {\n  return [\n    _fxTypes__WEBPACK_IMPORTED_MODULE_0__[\"KEY_UP\"],\n    {\n      action: action\n    }\n  ]\n}\n\nfunction random(action, min, max) {\n  return [\n    _fxTypes__WEBPACK_IMPORTED_MODULE_0__[\"RANDOM\"],\n    {\n      action: action,\n      min: min || 0,\n      max: max || 1\n    }\n  ]\n}\n\nfunction debounce(wait, action, data) {\n  return [\n    _fxTypes__WEBPACK_IMPORTED_MODULE_0__[\"DEBOUNCE\"],\n    {\n      wait: wait,\n      action: action,\n      data: data\n    }\n  ]\n}\n\nfunction throttle(rate, action, data) {\n  return [\n    _fxTypes__WEBPACK_IMPORTED_MODULE_0__[\"THROTTLE\"],\n    {\n      rate: rate,\n      action: action,\n      data: data\n    }\n  ]\n}\n\n\n//# sourceURL=webpack:///./node_modules/hyperapp-fx/src/fxCreators.js?");

/***/ }),

/***/ "./node_modules/hyperapp-fx/src/fxIf.js":
/*!**********************************************!*\
  !*** ./node_modules/hyperapp-fx/src/fxIf.js ***!
  \**********************************************/
/*! exports provided: fxIf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fxIf\", function() { return fxIf; });\nfunction fxIf(fxSpecs) {\n  return fxSpecs\n    .filter(function(fxSpec) {\n      // first element is the conditional\n      return fxSpec[0]\n    })\n    .map(function(fxSpec) {\n      // second element is the effect to include\n      return fxSpec[1]\n    })\n}\n\n\n//# sourceURL=webpack:///./node_modules/hyperapp-fx/src/fxIf.js?");

/***/ }),

/***/ "./node_modules/hyperapp-fx/src/fxTypes.js":
/*!*************************************************!*\
  !*** ./node_modules/hyperapp-fx/src/fxTypes.js ***!
  \*************************************************/
/*! exports provided: ACTION, FRAME, DELAY, TIME, LOG, HTTP, EVENT, KEY_DOWN, KEY_UP, RANDOM, DEBOUNCE, THROTTLE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ACTION\", function() { return ACTION; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FRAME\", function() { return FRAME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DELAY\", function() { return DELAY; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TIME\", function() { return TIME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LOG\", function() { return LOG; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HTTP\", function() { return HTTP; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT\", function() { return EVENT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"KEY_DOWN\", function() { return KEY_DOWN; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"KEY_UP\", function() { return KEY_UP; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RANDOM\", function() { return RANDOM; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DEBOUNCE\", function() { return DEBOUNCE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"THROTTLE\", function() { return THROTTLE; });\nvar ACTION = \"action\"\nvar FRAME = \"frame\"\nvar DELAY = \"delay\"\nvar TIME = \"time\"\nvar LOG = \"log\"\nvar HTTP = \"http\"\nvar EVENT = \"event\"\nvar KEY_DOWN = \"keydown\"\nvar KEY_UP = \"keyup\"\nvar RANDOM = \"random\"\nvar DEBOUNCE = \"debounce\"\nvar THROTTLE = \"throttle\"\n\n\n//# sourceURL=webpack:///./node_modules/hyperapp-fx/src/fxTypes.js?");

/***/ }),

/***/ "./node_modules/hyperapp-fx/src/index.js":
/*!***********************************************!*\
  !*** ./node_modules/hyperapp-fx/src/index.js ***!
  \***********************************************/
/*! exports provided: withFx, action, frame, delay, time, log, http, event, keydown, keyup, random, debounce, throttle, fxIf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _withFx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./withFx */ \"./node_modules/hyperapp-fx/src/withFx.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"withFx\", function() { return _withFx__WEBPACK_IMPORTED_MODULE_0__[\"withFx\"]; });\n\n/* harmony import */ var _fxCreators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fxCreators */ \"./node_modules/hyperapp-fx/src/fxCreators.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"action\", function() { return _fxCreators__WEBPACK_IMPORTED_MODULE_1__[\"action\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"frame\", function() { return _fxCreators__WEBPACK_IMPORTED_MODULE_1__[\"frame\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"delay\", function() { return _fxCreators__WEBPACK_IMPORTED_MODULE_1__[\"delay\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"time\", function() { return _fxCreators__WEBPACK_IMPORTED_MODULE_1__[\"time\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"log\", function() { return _fxCreators__WEBPACK_IMPORTED_MODULE_1__[\"log\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"http\", function() { return _fxCreators__WEBPACK_IMPORTED_MODULE_1__[\"http\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"event\", function() { return _fxCreators__WEBPACK_IMPORTED_MODULE_1__[\"event\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"keydown\", function() { return _fxCreators__WEBPACK_IMPORTED_MODULE_1__[\"keydown\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"keyup\", function() { return _fxCreators__WEBPACK_IMPORTED_MODULE_1__[\"keyup\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"random\", function() { return _fxCreators__WEBPACK_IMPORTED_MODULE_1__[\"random\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"debounce\", function() { return _fxCreators__WEBPACK_IMPORTED_MODULE_1__[\"debounce\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"throttle\", function() { return _fxCreators__WEBPACK_IMPORTED_MODULE_1__[\"throttle\"]; });\n\n/* harmony import */ var _fxIf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fxIf */ \"./node_modules/hyperapp-fx/src/fxIf.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"fxIf\", function() { return _fxIf__WEBPACK_IMPORTED_MODULE_2__[\"fxIf\"]; });\n\n\n\n\n\n\n//# sourceURL=webpack:///./node_modules/hyperapp-fx/src/index.js?");

/***/ }),

/***/ "./node_modules/hyperapp-fx/src/makeDefaultFx.js":
/*!*******************************************************!*\
  !*** ./node_modules/hyperapp-fx/src/makeDefaultFx.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return makeDefaultFx; });\n/* harmony import */ var _fxTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fxTypes */ \"./node_modules/hyperapp-fx/src/fxTypes.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ \"./node_modules/hyperapp-fx/src/utils.js\");\n\n\n\nfunction makeDefaultFx() {\n  var fx = {}\n\n  fx[_fxTypes__WEBPACK_IMPORTED_MODULE_0__[\"ACTION\"]] = function(props, getAction) {\n    getAction(props.name)(props.data)\n  }\n\n  fx[_fxTypes__WEBPACK_IMPORTED_MODULE_0__[\"FRAME\"]] = function(props, getAction) {\n    requestAnimationFrame(function(time) {\n      getAction(props.action)(time)\n    })\n  }\n\n  fx[_fxTypes__WEBPACK_IMPORTED_MODULE_0__[\"DELAY\"]] = function(props, getAction) {\n    setTimeout(function() {\n      getAction(props.action)(props.data)\n    }, props.duration)\n  }\n\n  fx[_fxTypes__WEBPACK_IMPORTED_MODULE_0__[\"TIME\"]] = function(props, getAction) {\n    getAction(props.action)(performance.now())\n  }\n\n  fx[_fxTypes__WEBPACK_IMPORTED_MODULE_0__[\"LOG\"]] = function(props) {\n    // eslint-disable-next-line no-console\n    console.log.apply(null, props.args)\n  }\n\n  fx[_fxTypes__WEBPACK_IMPORTED_MODULE_0__[\"HTTP\"]] = function(props, getAction) {\n    var options = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"assign\"])(\n      {\n        response: \"json\",\n        error: props.action\n      },\n      props.options\n    )\n    var fetchOptions = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__[\"omit\"])(options, [\"response\", \"error\"])\n    fetch(props.url, fetchOptions)\n      .then(function(response) {\n        if (!response.ok) {\n          throw response\n        }\n        return response\n      })\n      .then(function(response) {\n        return response[options.response]()\n      })\n      .then(function(result) {\n        getAction(props.action)(result)\n      })\n      .catch(function(error) {\n        getAction(options.error)(error)\n      })\n  }\n\n  fx[_fxTypes__WEBPACK_IMPORTED_MODULE_0__[\"EVENT\"]] = function(props, getAction) {\n    getAction(props.action)(props.event)\n  }\n\n  fx[_fxTypes__WEBPACK_IMPORTED_MODULE_0__[\"KEY_DOWN\"]] = function(props, getAction) {\n    document.onkeydown = function(keyEvent) {\n      getAction(props.action)(keyEvent)\n    }\n  }\n\n  fx[_fxTypes__WEBPACK_IMPORTED_MODULE_0__[\"KEY_UP\"]] = function(props, getAction) {\n    document.onkeyup = function(keyEvent) {\n      getAction(props.action)(keyEvent)\n    }\n  }\n\n  fx[_fxTypes__WEBPACK_IMPORTED_MODULE_0__[\"RANDOM\"]] = function(props, getAction) {\n    var randomValue = Math.random() * (props.max - props.min) + props.min\n    getAction(props.action)(randomValue)\n  }\n\n  var debounceTimeouts = {}\n  fx[_fxTypes__WEBPACK_IMPORTED_MODULE_0__[\"DEBOUNCE\"]] = function(props, getAction) {\n    return (function(props, getAction) {\n      clearTimeout(debounceTimeouts[props.action])\n      debounceTimeouts[props.action] = setTimeout(function() {\n        getAction(props.action)(props.data)\n      }, props.wait)\n    })(props, getAction)\n  }\n\n  var throttleLocks = {}\n  fx[_fxTypes__WEBPACK_IMPORTED_MODULE_0__[\"THROTTLE\"]] = function(props, getAction) {\n    return (function(props, getAction) {\n      if (!throttleLocks[props.action]) {\n        getAction(props.action)(props.data)\n        throttleLocks[props.action] = true\n        setTimeout(function() {\n          throttleLocks[props.action] = false\n        }, props.rate)\n      }\n    })(props, getAction)\n  }\n\n  return fx\n}\n\n\n//# sourceURL=webpack:///./node_modules/hyperapp-fx/src/makeDefaultFx.js?");

/***/ }),

/***/ "./node_modules/hyperapp-fx/src/utils.js":
/*!***********************************************!*\
  !*** ./node_modules/hyperapp-fx/src/utils.js ***!
  \***********************************************/
/*! exports provided: assign, omit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"assign\", function() { return assign; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"omit\", function() { return omit; });\nfunction assign(source, assignments) {\n  var result = {},\n    i\n  for (i in source) result[i] = source[i]\n  for (i in assignments) result[i] = assignments[i]\n  return result\n}\n\nfunction omit(object, keys) {\n  var copy = {}\n  Object.keys(object)\n    .filter(function(key) {\n      return keys.indexOf(key) === -1\n    })\n    .forEach(function(key) {\n      copy[key] = object[key]\n    })\n  return copy\n}\n\n\n//# sourceURL=webpack:///./node_modules/hyperapp-fx/src/utils.js?");

/***/ }),

/***/ "./node_modules/hyperapp-fx/src/withFx.js":
/*!************************************************!*\
  !*** ./node_modules/hyperapp-fx/src/withFx.js ***!
  \************************************************/
/*! exports provided: withFx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"withFx\", function() { return withFx; });\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./node_modules/hyperapp-fx/src/utils.js\");\n/* harmony import */ var _makeDefaultFx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./makeDefaultFx */ \"./node_modules/hyperapp-fx/src/makeDefaultFx.js\");\n\n\n\nvar isFx = Array.isArray\nvar isFn = function(value) {\n  return typeof value === \"function\"\n}\n\nfunction getActionNamed(actions, name) {\n  function getNextAction(partialActions, paths) {\n    var nextAction = partialActions[paths[0]]\n    if (!nextAction) {\n      throw new Error(\"couldn't find action: \" + name)\n    }\n    return paths.length === 1\n      ? nextAction\n      : getNextAction(nextAction, paths.slice(1))\n  }\n  return getNextAction(actions, name.split(\".\"))\n}\n\nfunction runIfFx(actions, currentEvent, maybeFx, fx) {\n  if (!isFx(maybeFx)) {\n    // Not an effect\n    return maybeFx\n  } else if (isFx(maybeFx[0])) {\n    // Run an array of effects\n    for (var i in maybeFx) {\n      runIfFx(actions, currentEvent, maybeFx[i], fx)\n    }\n  } else if (maybeFx.length) {\n    // Run a single effect\n    var getAction = getActionNamed.bind(null, actions)\n    var type = maybeFx[0]\n    var props = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"assign\"])(maybeFx[1], { event: currentEvent })\n    var fxRunner = fx[type]\n    if (isFn(fxRunner)) {\n      fxRunner(props, getAction)\n    } else {\n      throw new Error(\"no such fx type: \" + type)\n    }\n  }\n}\n\nfunction enhanceActions(actionsTemplate, fx) {\n  return Object.keys(actionsTemplate || {}).reduce(function(\n    otherActions,\n    name\n  ) {\n    var action = actionsTemplate[name]\n    otherActions[name] = isFn(action)\n      ? function(data) {\n          return function(state, actions) {\n            var result = action(data)\n            result = isFn(result) ? result(state, actions) : result\n            return runIfFx(actions, null, result, fx)\n          }\n        }\n      : enhanceActions(action, fx)\n    return otherActions\n  },\n  {})\n}\n\nfunction handleEventFx(actions, currentFx, fx) {\n  return function(currentEvent) {\n    runIfFx(actions, currentEvent, currentFx, fx)\n  }\n}\n\nfunction makeEnhancedView(view, fx) {\n  function patchVdomFx(actions, vdom) {\n    if (typeof vdom === \"object\") {\n      for (var key in vdom.attributes) {\n        var maybeFx = vdom.attributes[key]\n        if (isFx(maybeFx)) {\n          vdom.attributes[key] = handleEventFx(actions, maybeFx, fx)\n        }\n      }\n      for (var i in vdom.children) {\n        if (isFn(vdom.children[i])) {\n          vdom.children[i] = makeEnhancedView(vdom.children[i], fx)\n        } else {\n          patchVdomFx(actions, vdom.children[i], fx)\n        }\n      }\n    }\n  }\n  return function(state, actions) {\n    var vdom = view(state, actions)\n    patchVdomFx(actions, vdom, fx)\n    return vdom\n  }\n}\n\nfunction makeFxApp(fx, nextApp) {\n  return function(initialState, actionsTemplate, view, container) {\n    var enhancedActions = enhanceActions(actionsTemplate, fx)\n    var enhancedView = makeEnhancedView(view, fx)\n\n    var appActions = nextApp(\n      initialState,\n      enhancedActions,\n      enhancedView,\n      container\n    )\n    return appActions\n  }\n}\n\nfunction withFx(fxOrApp) {\n  var fx = Object(_makeDefaultFx__WEBPACK_IMPORTED_MODULE_1__[\"default\"])()\n  if (typeof fxOrApp === \"function\") {\n    return makeFxApp(fx, fxOrApp)\n  } else {\n    for (var name in fxOrApp) {\n      fx[name] = fxOrApp[name]\n    }\n    return function(nextApp) {\n      return makeFxApp(fx, nextApp)\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/hyperapp-fx/src/withFx.js?");

/***/ }),

/***/ "./node_modules/hyperapp/hyperapp.js":
/*!*******************************************!*\
  !*** ./node_modules/hyperapp/hyperapp.js ***!
  \*******************************************/
/*! exports provided: memo, text, h, app */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"memo\", function() { return memo; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"text\", function() { return text; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"h\", function() { return h; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"app\", function() { return app; });\nvar e={},n=[],r=e=>e,t=n.map,l=Array.isArray,o=\"undefined\"!=typeof requestAnimationFrame?requestAnimationFrame:setTimeout,i=e=>{var n=\"\";if(\"string\"==typeof e)return e;if(l(e))for(var r,t=0;t<e.length;t++)(r=i(e[t]))&&(n+=(n&&\" \")+r);else for(var t in e)e[t]&&(n+=(n&&\" \")+t);return n},a=(e,n)=>{for(var r in{...e,...n})if(\"function\"==typeof(l(n[r]=e[r])?n[r][0]:n[r]));else if(e[r]!==n[r])return!0},u=e=>null==e?e:e.key,d=(e,n,r,t,l,o)=>{if(\"key\"===n);else if(\"style\"===n)for(var a in{...r,...t})r=null==t||null==t[a]?\"\":t[a],\"-\"===a[0]?e[n].setProperty(a,r):e[n][a]=r;else\"o\"===n[0]&&\"n\"===n[1]?((e.tag||(e.tag={}))[n=n.slice(2)]=t)?r||e.addEventListener(n,l):e.removeEventListener(n,l):!o&&\"list\"!==n&&\"form\"!==n&&n in e?e[n]=null==t?\"\":t:null==t||!1===t||\"class\"===n&&!(t=i(t))?e.removeAttribute(n):e.setAttribute(n,t)},f=(e,n,r)=>{var t=e.props,l=3===e.tag?document.createTextNode(e.type):(r=r||\"svg\"===e.type)?document.createElementNS(\"http://www.w3.org/2000/svg\",e.type,{is:t.is}):document.createElement(e.type,{is:t.is});for(var o in t)d(l,o,null,t[o],n,r);for(var i=0;i<e.children.length;i++)l.appendChild(f(e.children[i]=p(e.children[i]),n,r));return e.node=l},s=(e,n,r,t,l,o)=>{if(r===t);else if(null!=r&&3===r.tag&&3===t.tag)r.type!==t.type&&(n.nodeValue=t.type);else if(null==r||r.type!==t.type)n=e.insertBefore(f(t=p(t),l,o),n),null!=r&&e.removeChild(r.node);else{var i,a,m,v,y=r.props,c=t.props,h=r.children,g=t.children,x=0,w=0,C=h.length-1,k=g.length-1;for(var A in o=o||\"svg\"===t.type,{...y,...c})(\"value\"===A||\"selected\"===A||\"checked\"===A?n[A]:y[A])!==c[A]&&d(n,A,y[A],c[A],l,o);for(;w<=k&&x<=C&&null!=(m=u(h[x]))&&m===u(g[w]);)s(n,h[x].node,h[x],g[w]=p(g[w++],h[x++]),l,o);for(;w<=k&&x<=C&&null!=(m=u(h[C]))&&m===u(g[k]);)s(n,h[C].node,h[C],g[k]=p(g[k--],h[C--]),l,o);if(x>C)for(;w<=k;)n.insertBefore(f(g[w]=p(g[w++]),l,o),(a=h[x])&&a.node);else if(w>k)for(;x<=C;)n.removeChild(h[x++].node);else{var N={},E={};for(A=x;A<=C;A++)null!=(m=h[A].key)&&(N[m]=h[A]);for(;w<=k;)m=u(a=h[x]),v=u(g[w]=p(g[w],a)),E[m]||null!=v&&v===u(h[x+1])?(null==m&&n.removeChild(a.node),x++):null==v||1===r.tag?(null==m&&(s(n,a&&a.node,a,g[w],l,o),w++),x++):(m===v?(s(n,a.node,a,g[w],l,o),E[v]=!0,x++):null!=(i=N[v])?(s(n,n.insertBefore(i.node,a&&a.node),i,g[w],l,o),E[v]=!0):s(n,a&&a.node,null,g[w],l,o),w++);for(;x<=C;)null==u(a=h[x++])&&n.removeChild(a.node);for(var A in N)null==E[A]&&n.removeChild(N[A].node)}}return t.node=n},p=(e,n)=>!0!==e&&!1!==e&&e?\"function\"==typeof e.tag?((!n||null==n.memo||((e,n)=>{for(var r in e)if(e[r]!==n[r])return!0;for(var r in n)if(e[r]!==n[r])return!0})(n.memo,e.memo))&&((n=e.tag(e.memo)).memo=e.memo),n):e:text(\"\"),m=n=>3===n.nodeType?text(n.nodeValue,n):v(n.nodeName.toLowerCase(),e,t.call(n.childNodes,m),n,null,1),v=(e,n,r,t,l,o)=>({type:e,props:n,children:r,node:t,key:l,tag:o});var memo=(e,n)=>({tag:e,memo:n});var text=(r,t)=>v(r,e,n,t,null,3);var h=(e,r,t)=>v(e,r,l(t)?t:null==t?n:[t],null,r.key);var app=e=>{var n,t,i=e.view,u=e.node,d=e.subscriptions,f=u&&m(u),p=[],v=e=>{t!==e&&(t=e,d&&(p=((e,n,r)=>{for(var t,l,o=[],i=0;i<e.length||i<n.length;i++)t=e[i],l=n[i],o.push(l&&!0!==l?!t||l[0]!==t[0]||a(l[1],t[1])?[l[0],l[1],l[0](r,l[1]),t&&t[2]()]:t:t&&t[2]());return o})(p,d(t),y)),i&&!n&&o(h,n=!0))},y=(e.middleware||r)((e,n)=>\"function\"==typeof e?y(e(t,n)):l(e)?\"function\"==typeof e[0]?y(e[0],e[1]):e.slice(1).map(e=>e&&!0!==e&&e[0](y,e[1]),v(e[0])):v(e)),c=function(e){y(this.tag[e.type],e)},h=()=>u=s(u.parentNode,u,f,f=i(t),c,n=!1);y(e.init)};\n//# sourceMappingURL=hyperapp.js.map\n\n//# sourceURL=webpack:///./node_modules/hyperapp/hyperapp.js?");

/***/ }),

/***/ 0:
/*!*************************!*\
  !*** multi ./client.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./client.js */\"./client.js\");\n\n\n//# sourceURL=webpack:///multi_./client.js?");

/***/ })

/******/ });