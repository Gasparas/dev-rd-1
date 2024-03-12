/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);

/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
console.log("view.js");
/* eslint-enable no-console */

// import apiFetch from "@wordpress/api-fetch";

// const addToCart = async (productId, quantity = 1) => {
// 	try {
// 		const response = await apiFetch({
// 			path: `wc/store/cart/add-item`, // Adjust according to the correct Store API endpoint
// 			method: "POST",
// 			data: {
// 				id: productId,
// 				quantity,
// 			},
// 		});

// 		console.log("Product added to cart:", response);
// 		return response;
// 	} catch (error) {
// 		console.error("Error adding product to cart:", error);
// 		return null;
// 	}
// };



// EventContext.js
const EventContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)();
const useEventContext = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(EventContext);
const EventContextProvider = ({
  children
}) => {
  const [listeners, setListeners] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({});
  const subscribeToEvent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)((eventName, callback) => {
    setListeners(prev => ({
      ...prev,
      [eventName]: [...(prev[eventName] || []), callback]
    }));
  }, []);
  const emitEvent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)((eventName, data) => {
    listeners[eventName]?.forEach(callback => callback(data));
  }, [listeners]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(EventContext.Provider, {
    value: {
      subscribeToEvent,
      emitEvent
    }
  }, children);
};

// CounterBoxComponent.js
const CounterBoxComponent = ({
  min,
  max,
  color,
  productId,
  isActive,
  onActiveChange
}) => {
  const [counterValue, setCounterValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  const {
    emitEvent
  } = useEventContext();
  const handleIncrement = () => {
    if (isActive && counterValue < max) {
      setCounterValue(prev => prev + 1);
      emitEvent('counterChanged', {
        productId,
        change: 1
      });
    }
  };
  const handleDecrement = () => {
    if (isActive && counterValue > min) {
      setCounterValue(prev => prev - 1);
      emitEvent('counterChanged', {
        productId,
        change: -1
      });
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      padding: '10px',
      margin: '5px',
      border: isActive ? '2px solid blue' : 'none'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "radio",
    name: "counterGroup",
    checked: isActive,
    onChange: () => onActiveChange(productId),
    id: `counter-${productId}`
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: `counter-${productId}`,
    style: {
      backgroundColor: color
    }
  }, "Counter ", productId, ": ", counterValue), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleDecrement
  }, "-"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleIncrement
  }, "+"));
};

// App component
const App = () => {
  const [activeProductId, setActiveProductId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("1");
  const handleActiveChange = productId => {
    setActiveProductId(productId);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(EventContextProvider, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, "Counter Group"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CounterBoxComponent, {
    min: 0,
    max: 10,
    color: "#e0e0e0",
    productId: "1",
    isActive: activeProductId === "1",
    onActiveChange: handleActiveChange
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CounterBoxComponent, {
    min: 0,
    max: 10,
    color: "#f0f0f0",
    productId: "2",
    isActive: activeProductId === "2",
    onActiveChange: handleActiveChange
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CounterBoxComponent, {
    min: 0,
    max: 10,
    color: "#f0f0f0",
    productId: "3",
    isActive: activeProductId === "3",
    onActiveChange: handleActiveChange
  })));
};
const container2 = document.querySelector("#app-1");
(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.render)((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(App, null), container2);
})();

/******/ })()
;
//# sourceMappingURL=view.js.map