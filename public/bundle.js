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
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from /rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/babel-loader/8.0.6/node_modules/babel-loader/lib/index.js):\\nSyntaxError: /app/client.js: Unexpected token (26:28)\\n\\n  24 | \\n  25 | const getStories = (payload, dispatch) => {\\n> 26 |   setTimeout(() => dispatch(, 1000)\\n     |                             ^\\n  27 | }\\n  28 | \\n  29 | \\n    at Object.raise (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:6420:17)\\n    at Object.unexpected (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:7773:16)\\n    at Object.parseExprAtom (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:8996:20)\\n    at Object.parseExprAtom (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:3618:20)\\n    at Object.parseExprSubscripts (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:8556:23)\\n    at Object.parseMaybeUnary (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:8536:21)\\n    at Object.parseExprOps (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:8402:23)\\n    at Object.parseMaybeConditional (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:8375:23)\\n    at Object.parseMaybeAssign (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:8325:21)\\n    at Object.parseExprListItem (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:9659:18)\\n    at Object.parseCallExpressionArguments (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:8774:22)\\n    at Object.parseSubscript (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:8661:29)\\n    at Object.parseSubscripts (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:8577:19)\\n    at Object.parseExprSubscripts (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:8566:17)\\n    at Object.parseMaybeUnary (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:8536:21)\\n    at Object.parseExprOps (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:8402:23)\\n    at Object.parseMaybeConditional (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:8375:23)\\n    at Object.parseMaybeAssign (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:8325:21)\\n    at Object.parseFunctionBody (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:9566:24)\\n    at Object.parseArrowExpression (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:9525:10)\\n    at Object.parseParenAndDistinguishExpression (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:9157:12)\\n    at Object.parseExprAtom (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:8917:21)\\n    at Object.parseExprAtom (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:3618:20)\\n    at Object.parseExprSubscripts (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:8556:23)\\n    at Object.parseMaybeUnary (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:8536:21)\\n    at Object.parseExprOps (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:8402:23)\\n    at Object.parseMaybeConditional (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:8375:23)\\n    at Object.parseMaybeAssign (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:8325:21)\\n    at Object.parseExprListItem (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:9659:18)\\n    at Object.parseCallExpressionArguments (/rbd/pnpm-volume/d20cbbae-46a5-442d-823f-763aa9622fed/node_modules/.registry.npmjs.org/@babel/parser/7.6.4/node_modules/@babel/parser/lib/index.js:8774:22)\");\n\n//# sourceURL=webpack:///./client.js?");

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