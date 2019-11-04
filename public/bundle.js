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

/***/ "../rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/hyperapp/2.0.3/node_modules/hyperapp/src/index.js":
/*!************************************************************************************************************************************************!*\
  !*** /rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/hyperapp/2.0.3/node_modules/hyperapp/src/index.js ***!
  \************************************************************************************************************************************************/
/*! exports provided: Lazy, h, app */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Lazy\", function() { return Lazy; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"h\", function() { return h; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"app\", function() { return app; });\nvar RECYCLED_NODE = 1\nvar LAZY_NODE = 2\nvar TEXT_NODE = 3\nvar EMPTY_OBJ = {}\nvar EMPTY_ARR = []\nvar map = EMPTY_ARR.map\nvar isArray = Array.isArray\nvar defer =\n  typeof requestAnimationFrame !== \"undefined\"\n    ? requestAnimationFrame\n    : setTimeout\n\nvar createClass = function(obj) {\n  var out = \"\"\n\n  if (typeof obj === \"string\") return obj\n\n  if (isArray(obj) && obj.length > 0) {\n    for (var k = 0, tmp; k < obj.length; k++) {\n      if ((tmp = createClass(obj[k])) !== \"\") {\n        out += (out && \" \") + tmp\n      }\n    }\n  } else {\n    for (var k in obj) {\n      if (obj[k]) {\n        out += (out && \" \") + k\n      }\n    }\n  }\n\n  return out\n}\n\nvar merge = function(a, b) {\n  var out = {}\n\n  for (var k in a) out[k] = a[k]\n  for (var k in b) out[k] = b[k]\n\n  return out\n}\n\nvar batch = function(list) {\n  return list.reduce(function(out, item) {\n    return out.concat(\n      !item || item === true\n        ? 0\n        : typeof item[0] === \"function\"\n        ? [item]\n        : batch(item)\n    )\n  }, EMPTY_ARR)\n}\n\nvar isSameAction = function(a, b) {\n  return isArray(a) && isArray(b) && a[0] === b[0] && typeof a[0] === \"function\"\n}\n\nvar shouldRestart = function(a, b) {\n  if (a !== b) {\n    for (var k in merge(a, b)) {\n      if (a[k] !== b[k] && !isSameAction(a[k], b[k])) return true\n      b[k] = a[k]\n    }\n  }\n}\n\nvar patchSubs = function(oldSubs, newSubs, dispatch) {\n  for (\n    var i = 0, oldSub, newSub, subs = [];\n    i < oldSubs.length || i < newSubs.length;\n    i++\n  ) {\n    oldSub = oldSubs[i]\n    newSub = newSubs[i]\n    subs.push(\n      newSub\n        ? !oldSub ||\n          newSub[0] !== oldSub[0] ||\n          shouldRestart(newSub[1], oldSub[1])\n          ? [\n              newSub[0],\n              newSub[1],\n              newSub[0](dispatch, newSub[1]),\n              oldSub && oldSub[2]()\n            ]\n          : oldSub\n        : oldSub && oldSub[2]()\n    )\n  }\n  return subs\n}\n\nvar patchProperty = function(node, key, oldValue, newValue, listener, isSvg) {\n  if (key === \"key\") {\n  } else if (key === \"style\") {\n    for (var k in merge(oldValue, newValue)) {\n      oldValue = newValue == null || newValue[k] == null ? \"\" : newValue[k]\n      if (k[0] === \"-\") {\n        node[key].setProperty(k, oldValue)\n      } else {\n        node[key][k] = oldValue\n      }\n    }\n  } else if (key[0] === \"o\" && key[1] === \"n\") {\n    if (\n      !((node.actions || (node.actions = {}))[\n        (key = key.slice(2).toLowerCase())\n      ] = newValue)\n    ) {\n      node.removeEventListener(key, listener)\n    } else if (!oldValue) {\n      node.addEventListener(key, listener)\n    }\n  } else if (!isSvg && key !== \"list\" && key in node) {\n    node[key] = newValue == null ? \"\" : newValue\n  } else if (\n    newValue == null ||\n    newValue === false ||\n    (key === \"class\" && !(newValue = createClass(newValue)))\n  ) {\n    node.removeAttribute(key)\n  } else {\n    node.setAttribute(key, newValue)\n  }\n}\n\nvar createNode = function(vdom, listener, isSvg) {\n  var ns = \"http://www.w3.org/2000/svg\"\n  var props = vdom.props\n  var node =\n    vdom.type === TEXT_NODE\n      ? document.createTextNode(vdom.name)\n      : (isSvg = isSvg || vdom.name === \"svg\")\n      ? document.createElementNS(ns, vdom.name, { is: props.is })\n      : document.createElement(vdom.name, { is: props.is })\n\n  for (var k in props) {\n    patchProperty(node, k, null, props[k], listener, isSvg)\n  }\n\n  for (var i = 0, len = vdom.children.length; i < len; i++) {\n    node.appendChild(\n      createNode(\n        (vdom.children[i] = getVNode(vdom.children[i])),\n        listener,\n        isSvg\n      )\n    )\n  }\n\n  return (vdom.node = node)\n}\n\nvar getKey = function(vdom) {\n  return vdom == null ? null : vdom.key\n}\n\nvar patch = function(parent, node, oldVNode, newVNode, listener, isSvg) {\n  if (oldVNode === newVNode) {\n  } else if (\n    oldVNode != null &&\n    oldVNode.type === TEXT_NODE &&\n    newVNode.type === TEXT_NODE\n  ) {\n    if (oldVNode.name !== newVNode.name) node.nodeValue = newVNode.name\n  } else if (oldVNode == null || oldVNode.name !== newVNode.name) {\n    node = parent.insertBefore(\n      createNode((newVNode = getVNode(newVNode)), listener, isSvg),\n      node\n    )\n    if (oldVNode != null) {\n      parent.removeChild(oldVNode.node)\n    }\n  } else {\n    var tmpVKid\n    var oldVKid\n\n    var oldKey\n    var newKey\n\n    var oldVProps = oldVNode.props\n    var newVProps = newVNode.props\n\n    var oldVKids = oldVNode.children\n    var newVKids = newVNode.children\n\n    var oldHead = 0\n    var newHead = 0\n    var oldTail = oldVKids.length - 1\n    var newTail = newVKids.length - 1\n\n    isSvg = isSvg || newVNode.name === \"svg\"\n\n    for (var i in merge(oldVProps, newVProps)) {\n      if (\n        (i === \"value\" || i === \"selected\" || i === \"checked\"\n          ? node[i]\n          : oldVProps[i]) !== newVProps[i]\n      ) {\n        patchProperty(node, i, oldVProps[i], newVProps[i], listener, isSvg)\n      }\n    }\n\n    while (newHead <= newTail && oldHead <= oldTail) {\n      if (\n        (oldKey = getKey(oldVKids[oldHead])) == null ||\n        oldKey !== getKey(newVKids[newHead])\n      ) {\n        break\n      }\n\n      patch(\n        node,\n        oldVKids[oldHead].node,\n        oldVKids[oldHead],\n        (newVKids[newHead] = getVNode(\n          newVKids[newHead++],\n          oldVKids[oldHead++]\n        )),\n        listener,\n        isSvg\n      )\n    }\n\n    while (newHead <= newTail && oldHead <= oldTail) {\n      if (\n        (oldKey = getKey(oldVKids[oldTail])) == null ||\n        oldKey !== getKey(newVKids[newTail])\n      ) {\n        break\n      }\n\n      patch(\n        node,\n        oldVKids[oldTail].node,\n        oldVKids[oldTail],\n        (newVKids[newTail] = getVNode(\n          newVKids[newTail--],\n          oldVKids[oldTail--]\n        )),\n        listener,\n        isSvg\n      )\n    }\n\n    if (oldHead > oldTail) {\n      while (newHead <= newTail) {\n        node.insertBefore(\n          createNode(\n            (newVKids[newHead] = getVNode(newVKids[newHead++])),\n            listener,\n            isSvg\n          ),\n          (oldVKid = oldVKids[oldHead]) && oldVKid.node\n        )\n      }\n    } else if (newHead > newTail) {\n      while (oldHead <= oldTail) {\n        node.removeChild(oldVKids[oldHead++].node)\n      }\n    } else {\n      for (var i = oldHead, keyed = {}, newKeyed = {}; i <= oldTail; i++) {\n        if ((oldKey = oldVKids[i].key) != null) {\n          keyed[oldKey] = oldVKids[i]\n        }\n      }\n\n      while (newHead <= newTail) {\n        oldKey = getKey((oldVKid = oldVKids[oldHead]))\n        newKey = getKey(\n          (newVKids[newHead] = getVNode(newVKids[newHead], oldVKid))\n        )\n\n        if (\n          newKeyed[oldKey] ||\n          (newKey != null && newKey === getKey(oldVKids[oldHead + 1]))\n        ) {\n          if (oldKey == null) {\n            node.removeChild(oldVKid.node)\n          }\n          oldHead++\n          continue\n        }\n\n        if (newKey == null || oldVNode.type === RECYCLED_NODE) {\n          if (oldKey == null) {\n            patch(\n              node,\n              oldVKid && oldVKid.node,\n              oldVKid,\n              newVKids[newHead],\n              listener,\n              isSvg\n            )\n            newHead++\n          }\n          oldHead++\n        } else {\n          if (oldKey === newKey) {\n            patch(\n              node,\n              oldVKid.node,\n              oldVKid,\n              newVKids[newHead],\n              listener,\n              isSvg\n            )\n            newKeyed[newKey] = true\n            oldHead++\n          } else {\n            if ((tmpVKid = keyed[newKey]) != null) {\n              patch(\n                node,\n                node.insertBefore(tmpVKid.node, oldVKid && oldVKid.node),\n                tmpVKid,\n                newVKids[newHead],\n                listener,\n                isSvg\n              )\n              newKeyed[newKey] = true\n            } else {\n              patch(\n                node,\n                oldVKid && oldVKid.node,\n                null,\n                newVKids[newHead],\n                listener,\n                isSvg\n              )\n            }\n          }\n          newHead++\n        }\n      }\n\n      while (oldHead <= oldTail) {\n        if (getKey((oldVKid = oldVKids[oldHead++])) == null) {\n          node.removeChild(oldVKid.node)\n        }\n      }\n\n      for (var i in keyed) {\n        if (newKeyed[i] == null) {\n          node.removeChild(keyed[i].node)\n        }\n      }\n    }\n  }\n\n  return (newVNode.node = node)\n}\n\nvar propsChanged = function(a, b) {\n  for (var k in a) if (a[k] !== b[k]) return true\n  for (var k in b) if (a[k] !== b[k]) return true\n}\n\nvar getTextVNode = function(node) {\n  return typeof node === \"object\" ? node : createTextVNode(node)\n}\n\nvar getVNode = function(newVNode, oldVNode) {\n  return newVNode.type === LAZY_NODE\n    ? ((!oldVNode ||\n        (oldVNode.type !== LAZY_NODE ||\n          propsChanged(oldVNode.lazy, newVNode.lazy))) &&\n        ((oldVNode = getTextVNode(newVNode.lazy.view(newVNode.lazy))).lazy =\n          newVNode.lazy),\n      oldVNode)\n    : newVNode\n}\n\nvar createVNode = function(name, props, children, node, key, type) {\n  return {\n    name: name,\n    props: props,\n    children: children,\n    node: node,\n    type: type,\n    key: key\n  }\n}\n\nvar createTextVNode = function(value, node) {\n  return createVNode(value, EMPTY_OBJ, EMPTY_ARR, node, undefined, TEXT_NODE)\n}\n\nvar recycleNode = function(node) {\n  return node.nodeType === TEXT_NODE\n    ? createTextVNode(node.nodeValue, node)\n    : createVNode(\n        node.nodeName.toLowerCase(),\n        EMPTY_OBJ,\n        map.call(node.childNodes, recycleNode),\n        node,\n        undefined,\n        RECYCLED_NODE\n      )\n}\n\nvar Lazy = function(props) {\n  return {\n    lazy: props,\n    type: LAZY_NODE\n  }\n}\n\nvar h = function(name, props) {\n  for (var vdom, rest = [], children = [], i = arguments.length; i-- > 2; ) {\n    rest.push(arguments[i])\n  }\n\n  while (rest.length > 0) {\n    if (isArray((vdom = rest.pop()))) {\n      for (var i = vdom.length; i-- > 0; ) {\n        rest.push(vdom[i])\n      }\n    } else if (vdom === false || vdom === true || vdom == null) {\n    } else {\n      children.push(getTextVNode(vdom))\n    }\n  }\n\n  props = props || EMPTY_OBJ\n\n  return typeof name === \"function\"\n    ? name(props, children)\n    : createVNode(name, props, children, undefined, props.key)\n}\n\nvar app = function(props) {\n  var state = {}\n  var lock = false\n  var view = props.view\n  var node = props.node\n  var vdom = node && recycleNode(node)\n  var subscriptions = props.subscriptions\n  var subs = []\n\n  var listener = function(event) {\n    dispatch(this.actions[event.type], event)\n  }\n\n  var setState = function(newState) {\n    if (state !== newState) {\n      state = newState\n      if (subscriptions) {\n        subs = patchSubs(subs, batch([subscriptions(state)]), dispatch)\n      }\n      if (view && !lock) defer(render, (lock = true))\n    }\n    return state\n  }\n\n  var dispatch = (props.middleware ||\n    function(obj) {\n      return obj\n    })(function(action, props) {\n    return typeof action === \"function\"\n      ? dispatch(action(state, props))\n      : isArray(action)\n      ? typeof action[0] === \"function\" || isArray(action[0])\n        ? dispatch(\n            action[0],\n            typeof action[1] === \"function\" ? action[1](props) : action[1]\n          )\n        : (batch(action.slice(1)).map(function(fx) {\n            fx && fx[0](dispatch, fx[1])\n          }, setState(action[0])),\n          state)\n      : setState(action)\n  })\n\n  var render = function() {\n    lock = false\n    node = patch(\n      node.parentNode,\n      node,\n      vdom,\n      (vdom = getTextVNode(view(state))),\n      listener\n    )\n  }\n\n  dispatch(props.init)\n}\n\n\n//# sourceURL=webpack:////rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/hyperapp/2.0.3/node_modules/hyperapp/src/index.js?");

/***/ }),

/***/ "./client.js":
/*!*******************!*\
  !*** ./client.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var hyperapp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hyperapp */ \"../rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/hyperapp/2.0.3/node_modules/hyperapp/src/index.js\");\n\nObject(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"app\"])({\n  init: 0,\n  view: function view(state) {\n    return Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"main\", {}, [Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"h1\", {}, state), Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"button\", {\n      onClick: function onClick(state) {\n        return state - 1;\n      }\n    }, \"-\"), Object(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"button\", {\n      onClick: function onClick(state) {\n        return state + 1;\n      }\n    }, \"+\")]);\n  },\n  node: document.getElementById(\"app\")\n});\n\n//# sourceURL=webpack:///./client.js?");

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