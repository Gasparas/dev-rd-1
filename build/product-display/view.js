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
/*!*************************************!*\
  !*** ./src/product-display/view.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);

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


// import useStore from "your-store-path"; // Adjust the import path as needed
// import test from "./../test.js"; // Adjust the import path as needed

/**
 * useCart
 */

function useCart(productId) {
  const triggerTotalCartUpdate = useStore(state => state.triggerTotalCartUpdate);
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
  }, []);
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
 * ProductDisplay
 */

function ProductGallery({
  selectedProductId,
  productsData
}) {
  const selectedProductData = productsData.find(product => product.id === selectedProductId);

  // Initialize selectedImage with the first image of the selected product or a default value
  const [selectedImage, setSelectedImage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(selectedProductData?.imageUrls[0] || "");
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // Update selectedImage when selectedProductId changes
    setSelectedImage(selectedProductData?.imageUrls[0] || "");
  }, [selectedProductId, selectedProductData]);
  if (!selectedProductData) return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "No product selected"); // Or any other fallback UI

  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "image-viewer-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "full-size-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: selectedImage,
    alt: "Selected"
  })));
}
function InfoBox({
  selectedProductId
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Selected Product ID: ", selectedProductId);
}
function TogglerBox({
  products,
  onProductSelect,
  selectedProductId
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, products.map(product => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: product.id,
    onClick: () => onProductSelect(product.id),
    style: {
      padding: "0.5em 1em",
      margin: "1em 0",
      fontWeight: product.id === selectedProductId ? "bold" : "normal"
    }
  }, product.counterValue)));
}
function AdjusterBox({
  productId,
  initialValue,
  togglerValueChange
}) {
  const [value, setValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(initialValue);
  const {
    fetchCart,
    addToCart,
    remFromCart,
    isLoading,
    error
  } = useCart();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setValue(initialValue);
  }, [initialValue]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // apiFetchCartItems();
  }, []);
  const handleIncrement = () => {
    const newValue = value + 1;
    setValue(newValue);
    togglerValueChange(newValue);
    addToCart(productId);
  };
  const handleDecrement = () => {
    if (value > 0) {
      const newValue = value - 1;
      setValue(newValue);
      togglerValueChange(newValue);
      remFromCart(productId);
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    style: {
      padding: "0.5em 1em"
    },
    onClick: handleDecrement,
    disabled: isLoading
  }, isLoading ? "-" : "-"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, " ", value, " "), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    style: {
      padding: "0.5em 1em"
    },
    onClick: handleIncrement,
    disabled: isLoading
  }, isLoading ? "+" : "+"));
}
function ProductDisplay({
  data
}) {
  const [products, setProducts] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [selectedProductId, setSelectedProductId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [counterValue, setCounterValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const selectedProduct = products.find(product => product.id === selectedProductId);
    setCounterValue(selectedProduct ? selectedProduct.counterValue : 0);
  }, [products, selectedProductId]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setProducts(data); // Directly use the data prop which is now an array
    if (data.length > 0) {
      // Set the first product's ID as selected by default
      setSelectedProductId(data[0].id);
    }
  }, [data]);
  const togglerValueChange = newValue => {
    // Update the counterValue for the selected product
    const updatedProducts = products.map(product => product.id === selectedProductId ? {
      ...product,
      counterValue: newValue
    } : product);
    // console.log(updatedProducts);
    setProducts(updatedProducts);
  };
  const handleProductSelect = id => {
    setSelectedProductId(id);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "product-wrapper",
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ProductGallery, {
    selectedProductId: selectedProductId,
    productsData: products
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(InfoBox, {
    selectedProductId: selectedProductId
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TogglerBox, {
    products: products,
    onProductSelect: handleProductSelect,
    selectedProductId: selectedProductId
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(AdjusterBox, {
    productId: selectedProductId,
    initialValue: counterValue,
    togglerValueChange: togglerValueChange
  }));
}
document.querySelectorAll(".react-container").forEach(container => {
  const jsonDataElement = container.querySelector(".product-data");
  if (jsonDataElement) {
    const jsonData = JSON.parse(jsonDataElement.textContent || "[]");
    // console.log("Mount data", jsonData);
    ReactDOM.createRoot(container).render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ProductDisplay, {
      data: jsonData
    }));
  }
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map