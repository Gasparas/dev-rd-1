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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************************!*\
  !*** ./src/total-cart/view.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'your-store-path'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());

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

console.log("view.js");


 // Adjust the import path as needed

/**
 * useCart
 */

function useCart(productId) {
  const triggerTotalCartUpdate = Object(function webpackMissingModule() { var e = new Error("Cannot find module 'your-store-path'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(state => state.triggerTotalCartUpdate);
  const [isLoading, setIsLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [cartProducts, setCartProducts] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [totalQuantity, setTotalQuantity] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  const [totalPrice, setTotalPrice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  const [totalSalePrice, setTotalSalePrice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  const [salePercentage, setSalePercentage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  const [appliedCoupon, setAppliedCoupon] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    fetchCart();
    // console.log('hi');
  }, []);

  // useEffect (() => {
  // 	console.log('useCart totalQuantity', totalQuantity);
  // 	// triggerTotalCartUpdate();
  // }, [totalQuantity]);

  const fetchCart = () => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: "/wc/store/cart"
    }) // Adjusted to an endpoint that returns full cart details
    .then(cart => {
      const cartProducts = cart.items;
      setCartProducts(cartProducts);
      // Assuming the response includes totalItems and total price directly
      const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
      setTotalQuantity(totalQuantity);
      // console.log('fetchCart totalQuantity', totalQuantity);

      // Directly use the total price from the cart object
      const totalPrice = parseFloat(cart.totals.total_items) / 100;
      setTotalPrice(totalPrice);
      const totalSalePrice = parseFloat(cart.totals.total_price) / 100;
      setTotalSalePrice(totalSalePrice);
      // if (totalPrice != 0) {
      // 	const salePercentage = Math.round(
      // 		((totalPrice - totalSalePrice) / totalPrice) * 100,
      // 	);
      // 	setSalePercentage(salePercentage);
      // }
      // console.log("fetchCart:", totalPrice);

      setIsLoading(false);
    }).catch(err => {
      console.error("Error fetching cart:", err);
      setError("Failed to fetch cart.");
      setIsLoading(false);
    });
  };
  const addToCart = productId => {
    setIsLoading(true);
    const itemData = {
      id: productId,
      quantity: 1
    };
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: "/wc/store/cart/add-item",
      method: "POST",
      data: itemData
    }).then(() => {
      console.log(`Add to cart: ${productId}`);
    }).catch(error => {
      console.error("Error incrementing item:", error);
      setError("Failed to increment item.");
      setIsLoading(false);
    }).finally(() => {
      fetchCart(); // Refresh the cart items to reflect the change
      triggerTotalCartUpdate();
      // console.log('addToCart finally');
    });
  };
  const remFromCart = productId => {
    setIsLoading(true);

    // Find the current item in the cart
    const item = cartProducts.find(item => item.id === productId);
    if (!item) {
      // If item not found, exit early
      console.error("Item not found in cart:", productId);
      // setIsLoading(false);
      return;
    }
    if (item.quantity === 1) {
      // If the item's quantity is 1, remove it from the cart
      const itemData = {
        key: item.key
      };
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path: "/wc/store/cart/remove-item",
        method: "POST",
        data: itemData
      }).then(() => {
        console.log(`Remove from cart: ${productId}`);
        fetchCart(); // Refresh the cart items to reflect the change
        triggerTotalCartUpdate();
      }).catch(error => {
        console.error("Error removing item:", error);
        setError("Failed to remove item.");
        setIsLoading(false);
      });
    } else {
      // If the item's quantity is greater than 1, decrement its quantity
      const itemData = {
        key: item.key,
        quantity: item.quantity - 1
      };
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path: "/wc/store/cart/update-item",
        method: "POST",
        data: itemData
      }).then(() => {
        console.log(`Decrease cart quantity: ${productId}`);
        fetchCart(); // Refresh the cart items to reflect the change
        triggerTotalCartUpdate();
      }).catch(error => {
        console.error("Error decrementing item:", error);
        setError("Failed to decrement item.");
        setIsLoading(false);
      });
    }
  };
  const applyCoupon = couponCode => {
    console.log(`Applying coupon: ${couponCode}`);
    return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: "/wc/store/v1/cart/apply-coupon",
      method: "POST",
      data: {
        code: couponCode
      }
    }).then(response => {
      console.log(`Coupon ${couponCode} applied.`);
      setAppliedCoupon(couponCode); // Update the applied coupon
      return response; // Return response for chaining
    }).catch(error => {
      console.error(`Error applying coupon ${couponCode}:`, error);
      throw error; // Re-throw for catch chaining
    });
  };
  const removeCoupon = couponCode => {
    console.log(`Removing coupon: ${couponCode}`);
    return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: "/wc/store/v1/cart/remove-coupon",
      method: "POST",
      data: {
        code: couponCode
      }
    }).then(response => {
      console.log(`Coupon ${couponCode} removed.`);
      setAppliedCoupon(""); // Clear the applied coupon
      return response; // Return response for chaining
    }).catch(error => {
      console.error(`Error removing coupon ${couponCode}:`, error);
      throw error; // Re-throw for catch chaining
    });
  };
  return {
    fetchCart,
    addToCart,
    remFromCart,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    totalPrice,
    totalSalePrice,
    salePercentage,
    totalQuantity,
    isLoading,
    error
  };
}

/**
 * NextStep
 */

const NextStep = ({
  beforeNextStep,
  stepsPercanteges,
  currentStep
}) => {
  const nextPercentage = stepsPercanteges[currentStep];
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-center justify-center px-3 py-2 mb-1 text-sm font-medium bg-white border-2 border-blue-500 rounded-lg"
  }, "Add ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "mx-1"
  }, beforeNextStep), " more for extra", " ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "px-2 py-1 mx-1 text-white bg-red-500 rounded-lg"
  }, "-", nextPercentage, "% OFF"));
};

/**
 * TotalCart
 */

const TotalCart = ({
  data
}) => {
  const triggerTotalCartUpdate = Object(function webpackMissingModule() { var e = new Error("Cannot find module 'your-store-path'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(state => state.triggerTotalCartUpdate);
  const totalCartUpdate = Object(function webpackMissingModule() { var e = new Error("Cannot find module 'your-store-path'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(state => {
    console.log('Reading totalCartUpdate', state.totalCartUpdate);
    return state.totalCartUpdate;
  });
  const {
    fetchCart,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    totalQuantity,
    totalPrice,
    totalSalePrice,
    salePercentage,
    isLoading,
    error
  } = useCart();
  const [steps, setSteps] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(data); // Example steps
  const [currentStep, setCurrentStep] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  const stepsPercanteges = ["5", "10", "15", "20"];
  const [distanceToNextStep, setDistanceToNextStep] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // console.log("totalCartUpdate", totalCartUpdate);
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // Calculate the distance to the next step
    const calculateDistanceToNextStep = () => {
      if (currentStep < steps.length) {
        // If not at the last step, calculate the difference between the next step and totalQuantity
        const nextStepValue = steps[currentStep];
        setDistanceToNextStep(nextStepValue - totalQuantity);
      } else {
        // If at the last step, there's no "next step" so set distance to 0
        setDistanceToNextStep(0);
      }
    };
    calculateDistanceToNextStep();
  }, [currentStep, totalQuantity, steps]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    fetchCart();
    determineCurrentStep();
  }, [totalQuantity]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    fetchCart();
  }, [totalCartUpdate]);
  const determineCurrentStep = () => {
    let foundStep = 0;
    // Iterate over steps to find the highest step not exceeding totalItems
    for (let step of steps) {
      if (totalQuantity >= step) {
        foundStep = step;
      } else {
        break; // Break early as steps are sorted
      }
    }

    // Determine the step index if a step was found; otherwise, handle stepIndex as null
    const stepIndex = foundStep !== 0 ? steps.indexOf(foundStep) + 1 : 0;

    // Check if we are moving down to step 0 and need to remove any existing coupon
    if (stepIndex === 0 && appliedCoupon) {
      console.log(`Removing coupon, as moving to step 0 from step: ${currentStep}`);
      removeCoupon(appliedCoupon);
      setCurrentStep(0);
      // setBeforeNextStep(0);
      fetchCart();
      return;
    }
    const newCouponCode = stepIndex ? `coupon-step-${stepIndex}` : 0;
    if (stepIndex !== currentStep) {
      setCurrentStep(stepIndex);
      // setBeforeNextStep(1);
      console.log(`Current step: ${stepIndex} for total items: ${totalQuantity}`);

      // Chain removal and application of coupons only if there's a valid step
      if (newCouponCode && appliedCoupon !== newCouponCode) {
        const couponOperation = appliedCoupon ? removeCoupon(appliedCoupon).then(() => applyCoupon(newCouponCode)) : applyCoupon(newCouponCode);
        couponOperation.then(() => {
          console.log("Coupon operation completed.");
          fetchCart();
        }).catch(error => {
          console.error("Coupon operation failed:", error);
        });
      }
    }
  };
  if (isLoading) return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Loading cart items...");
  if (error) return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Error: ", error);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, totalCartUpdate), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: triggerTotalCartUpdate
  }, "button"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(NextStep, {
    beforeNextStep: distanceToNextStep,
    stepsPercanteges: stepsPercanteges,
    currentStep: currentStep
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex justify-around w-full px-3 py-4 font-medium text-white bg-blue-500 rounded-lg"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "mr-1"
  }, totalSalePrice, "\u20AC"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `strikethrough-diagonal font-light text-sm text-gray-100 ${currentStep != 0 ? "opacity-100" : "opacity-0"}`
  }, totalPrice, "\u20AC")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `bg-white text-gray-700 rounded-lg px-2 ${currentStep != 0 ? "opacity-100" : "opacity-0"}`
  }, "-", stepsPercanteges[currentStep - 1], "% OFF"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex items-center gap-x-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bg-white text-gray-700 rounded-lg px-1.5 text-sm"
  }, totalQuantity), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "/?page_id=9",
    className: "text-sm text-white no-underline"
  }, "View Order"))));
};
const container = document.querySelector("#root-total-cart");
// ReactDOM.createRoot(tempContainer).render(<TotalCart />);

const jsonDataElement = document.querySelector(".discount-steps-data");
const jsonData = JSON.parse(jsonDataElement.textContent || "[]");
ReactDOM.createRoot(container).render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TotalCart, {
  data: jsonData
}));
})();

/******/ })()
;
//# sourceMappingURL=view.js.map