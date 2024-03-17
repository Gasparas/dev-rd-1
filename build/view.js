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
  color,
  productId,
  counterValue,
  isActive,
  onActiveChange
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      padding: "10px",
      margin: "5px",
      border: isActive ? "2px solid blue" : "none",
      backgroundColor: color,
      color: "#ffffff"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    style: {
      cursor: "pointer"
    },
    type: "radio",
    name: "counterGroup",
    checked: isActive,
    onChange: () => onActiveChange(productId),
    id: `counter-${productId}`
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: `counter-${productId}`,
    style: {}
  }, counterValue ? counterValue : ""));
};
const ProgressBar = ({
  totalCounterValue
}) => {
  const steps = [3, 6, 9, 12, 15];
  const maxStepValue = steps[steps.length - 1]; // The last step is the maximum

  const progressPercentage = totalCounterValue / maxStepValue * 100;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "progress-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "progress-bar",
    style: {
      width: `${progressPercentage}%`
    }
  }), steps.map(step => {
    const leftPercentage = step / maxStepValue * 100; // Correct calculation for leftPercentage
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: step,
      className: "step-marker",
      style: {
        left: `${leftPercentage}%`
      }
    });
  }));
};

// App component
const App = () => {
  const initialCounters = {
    1: {
      min: 0,
      max: 20,
      color: "#deb0a1",
      counterValue: 0,
      imageUrls: "/wp-content/uploads/2024/03/61pcyODhE4L._AC_SX679_.jpg",
      productDescription: "Silver infused Extra Soft Toothbrush for Adults - Dual Length Bristles for Interdental Cleaning.",
      price: 8.89
    },
    2: {
      min: 0,
      max: 20,
      color: "#f29891",
      counterValue: 0,
      imageUrls: "/wp-content/uploads/2024/03/61pWFSOfb-L._AC_SX679_.jpg",
      productDescription: "Silver infused Extra Soft Toothbrush for Adults - Dual Length Bristles for Interdental Cleaning.",
      price: 8.89
    },
    3: {
      min: 0,
      max: 20,
      color: "#5467ac",
      counterValue: 0,
      imageUrls: "/wp-content/uploads/2024/03/61QN62tdqhL._AC_SX679_.jpg",
      productDescription: "Silver infused Extra Soft Toothbrush for Adults - Dual Length Bristles for Interdental Cleaning.",
      price: 8.89
    },
    4: {
      min: 0,
      max: 20,
      color: "#2b6486",
      counterValue: 0,
      imageUrls: "/wp-content/uploads/2024/03/613AaVICUCL._AC_SX679_.jpg",
      productDescription: "Silver infused Extra Soft Toothbrush for Adults - Dual Length Bristles for Interdental Cleaning.",
      price: 8.89
    }
    // Add more counters as needed
  };
  const [counters, setCounters] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(initialCounters);
  const [activeCounterId, setActiveCounterId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("1");
  const totalValues = Object.values(counters).reduce((acc, counter) => {
    acc.totalCounterValue += counter.counterValue;
    acc.totalPrice += counter.counterValue * counter.price;
    return acc;
  }, {
    totalCounterValue: 0,
    totalPrice: 0
  });
  const handleActiveChange = productId => {
    setActiveCounterId(productId);
  };
  const handleIncrement = () => {
    console.log("handleIncrement ", activeCounterId);
    setCounters(prevCounters => ({
      ...prevCounters,
      [activeCounterId]: {
        ...prevCounters[activeCounterId],
        counterValue: Math.min(prevCounters[activeCounterId].counterValue + 1, prevCounters[activeCounterId].max)
      }
    }));
  };
  const handleDecrement = () => {
    console.log("handleDecrement ", activeCounterId);
    setCounters(prevCounters => ({
      ...prevCounters,
      [activeCounterId]: {
        ...prevCounters[activeCounterId],
        counterValue: Math.max(prevCounters[activeCounterId].counterValue - 1, prevCounters[activeCounterId].min)
      }
    }));
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(EventContextProvider, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      padding: "0 0 3em 0"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      borderRadius: "4px",
      alignItems: "center",
      height: "",
      background: "#0092FB",
      padding: "0.5em 1em 2em 1em"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      margin: "10px 0",
      color: "#fff"
    }
  }, "Buy more & save more"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ProgressBar, {
    totalCounterValue: totalValues.totalCounterValue
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      color: "#ffffff",
      background: "#0092FB",
      margin: "10px 0",
      padding: "0.5em",
      borderRadius: "4px"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, totalValues.totalPrice.toFixed(2), "\u20AC"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      background: "#ffffff",
      color: "#000000",
      padding: "0.2em",
      borderRadius: "4px"
    }
  }, "-00% OFF"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      columnGap: "0.5em"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      background: "#ffffff",
      color: "#000",
      borderRadius: "50%",
      width: "27px",
      height: "auto"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, totalValues.totalCounterValue)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "View Order"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginTop: "20px"
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginTop: "20px"
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      margin: "20px 0",
      textAlign: "center"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: counters[activeCounterId].imageUrls,
    alt: "Active Counter",
    style: {
      maxWidth: "auto",
      maxHeight: "300px"
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      margin: "10px 0",
      columnGap: "0.75em",
      alignItems: "flex-start"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      border: "1px",
      borderColor: "grey",
      borderStyle: "solid",
      padding: "0.5em"
    }
  }, counters[activeCounterId].price, "\u20AC"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      fontSize: "14px"
    }
  }, counters[activeCounterId].productDescription)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      margin: "10px 0 0 0"
    }
  }, Object.keys(counters).map(id => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CounterBoxComponent, {
    key: id,
    productId: id,
    min: counters[id].min,
    max: counters[id].max,
    color: counters[id].color,
    counterValue: counters[id].counterValue,
    isActive: activeCounterId === id,
    onActiveChange: handleActiveChange
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    style: {
      textAlign: "center",
      margin: "5px 0"
    }
  }, "Select colour and quantity"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      background: "#d7d7d7",
      padding: "0.75em 1em",
      width: "200px",
      margin: "auto",
      borderRadius: "8px"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    style: {
      cursor: "pointer",
      height: "30px",
      width: "30px"
    },
    onClick: handleDecrement
  }, "-"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    style: {
      margin: "0 10px"
    }
  }, counters[activeCounterId].counterValue > 0 ? counters[activeCounterId].counterValue : ""), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    style: {
      cursor: "pointer",
      height: "30px",
      width: "30px"
    },
    onClick: handleIncrement
  }, "+"))));
};

// const container2 = document.querySelector("#app-1");
// render(<App />, container2);

// Define your component
const App2 = ({
  containerId,
  productData
}) => {
  const ImageViewer = () => {
    const [selectedImage, setSelectedImage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(productData.imageUrls[0]);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "image-viewer-wrapper"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "thumbnails-wrapper"
    }, productData.imageUrls.map((url, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      key: index,
      src: url,
      alt: `Thumbnail ${index}`,
      onClick: () => setSelectedImage(url) // Click to change the image
      ,
      onMouseEnter: () => setSelectedImage(url) // Hover to change the image
    }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "full-size-wrapper"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: selectedImage,
      alt: "Selected"
    })));
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      background: "white",
      wordBreak: "break-all"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Container ID: ", containerId), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ImageViewer, null), productData && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, productData.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Price: ", productData.price), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Color: ", productData.color), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Image: ", productData.imageUrls)));
};
document.addEventListener("DOMContentLoaded", () => {
  // Assuming each .react-container is supposed to have a .product-data script associated with it
  const containers = document.querySelectorAll(".react-container");

  // Render a React component to each container
  containers.forEach(container => {
    // Attempt to find a .product-data script within the current container
    const dataElement = container.querySelector(".product-data");
    const productData = dataElement ? JSON.parse(dataElement.textContent) : null;
    const root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createRoot)(container); // Create a root for each container
    // Pass both the containerId and productData to the App2 component
    root.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(App2, {
      containerId: container.id,
      productData: productData
    }));
  });
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map