/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin-settings/ApiKeySettings.jsx":
/*!***********************************************!*\
  !*** ./src/admin-settings/ApiKeySettings.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const ApiKeySettings = ({
  label,
  enabled,
  apiKey,
  onToggle,
  onApiKeyChange
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "checkbox",
    checked: enabled,
    onChange: e => onToggle(e.target.checked)
  }), label), enabled && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    value: apiKey,
    onChange: e => onApiKeyChange(e.target.value),
    placeholder: "Enter API Key"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiKeySettings);

/***/ }),

/***/ "./src/admin-settings/App.jsx":
/*!************************************!*\
  !*** ./src/admin-settings/App.jsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ApiKeySettings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ApiKeySettings */ "./src/admin-settings/ApiKeySettings.jsx");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);




const App = () => {
  const [settings, setSettings] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    enable_chatgpt: false,
    chatgpt_api_key: '',
    enable_gemini: false,
    gemini_api_key: ''
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      url: intellibuilderSettings.apiUrl,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': intellibuilderSettings.nonce
      }
    }).then(response => {
      setSettings(response);
    });
  }, []);
  const handleSave = () => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      url: intellibuilderSettings.apiUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': intellibuilderSettings.nonce
      },
      body: JSON.stringify(settings)
    }).then(() => {
      alert('Settings saved!');
    });
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, "IntelliBuilder Settings"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ApiKeySettings__WEBPACK_IMPORTED_MODULE_1__["default"], {
    label: "Enable ChatGPT",
    enabled: settings.enable_chatgpt,
    apiKey: settings.chatgpt_api_key,
    onToggle: enabled => setSettings({
      ...settings,
      enable_chatgpt: enabled
    }),
    onApiKeyChange: apiKey => setSettings({
      ...settings,
      chatgpt_api_key: apiKey
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ApiKeySettings__WEBPACK_IMPORTED_MODULE_1__["default"], {
    label: "Enable Gemini",
    enabled: settings.enable_gemini,
    apiKey: settings.gemini_api_key,
    onToggle: enabled => setSettings({
      ...settings,
      enable_gemini: enabled
    }),
    onApiKeyChange: apiKey => setSettings({
      ...settings,
      gemini_api_key: apiKey
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleSave
  }, "Save Settings"));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/admin-settings/index.jsx ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ "./src/admin-settings/App.jsx");



console.log('intellibuilderSettings', intellibuilderSettings);
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('intellibuilder-admin-settings');
  if (rootElement) {
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createRoot)(rootElement).render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_App__WEBPACK_IMPORTED_MODULE_2__["default"], null));
  }
});
/******/ })()
;
//# sourceMappingURL=index.js.map