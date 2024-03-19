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
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addToCart: () => (/* binding */ addToCart),
/* harmony export */   removeProductFromCart_AJAX: () => (/* binding */ removeProductFromCart_AJAX)
/* harmony export */ });
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


function ProductIdBox({
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
      fontWeight: product.id === selectedProductId ? "bold" : "normal"
    }
  }, product.counterValue)));
}
function AdjusterBox({
  productId,
  initialValue,
  onValueChange
}) {
  const [value, setValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(initialValue);
  const [cartItemKey, setCartItemKey] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");

  // Fetch the cart contents to find the current item's quantity and key when the component mounts or productId changes
  // useEffect(() => {
  // 	console.log("useEffect with productId dependency triggered", productId);
  // 	const loadCartItemDetails = async () => {
  // 		const items = await fetchCartContents();
  // 		const item = items.find((item) => item.product_id === productId); // Adjust to match your actual data structure
  // 		if (item) {
  // 			setValue(item.quantity);
  // 			setCartItemKey(item.key); // Store the cart item key for later use
  // 		}
  // 	};

  // 	loadCartItemDetails();
  // }, [productId]);

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setValue(initialValue);
  }, [initialValue]);
  const handleIncrement = async () => {
    const newValue = value + 1;
    setValue(newValue);
    onValueChange(newValue);
    await addToCart(productId);
  };
  const handleDecrement = async () => {
    const newValue = value - 1;
    setValue(newValue);
    onValueChange(newValue);
    removeProductFromCart_AJAX(productId, 1);
  };

  // const handleDecrement = async () => {
  // 	if (value > 1) {
  // 		// Decrement quantity logic here
  // 		const newValue = value - 1;
  // 		setValue(newValue);
  // 		onValueChange(newValue);
  // 		// Potentially update cart via an API call, not covered here
  // 		setValue((prevQuantity) => prevQuantity - 1);
  // 	} else if (value === 1) {
  // 		// If quantity is 1, then decrementing should remove the item from the cart
  // 		await removeProductFromCart(cartItemKey);
  // 		setValue(0); // Update quantity state to reflect removal
  // 		// Optionally, signal to parent components that the item has been removed
  // 	}
  // };

  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleDecrement
  }, "-"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, " ", value, " "), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleIncrement
  }, "+"));
}
function ProductDisplay({
  data
}) {
  const [products, setProducts] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [selectedProductId, setSelectedProductId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const [counterValue, setCounterValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const selectedProduct = products.find(product => product.id === selectedProductId);
    setCounterValue(selectedProduct ? selectedProduct.counterValue : 0);
  }, [products, selectedProductId]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const parsedData = JSON.parse(data);
    setProducts(parsedData);
    if (parsedData.length > 0) {
      // Set the first product's ID as selected by default
      setSelectedProductId(parsedData[0].id);
    }
  }, [data]);
  const handleCounterChange = newValue => {
    // Update the counterValue for the selected product
    const updatedProducts = products.map(product => product.id === selectedProductId ? {
      ...product,
      counterValue: newValue
    } : product);
    setProducts(updatedProducts);
  };
  const handleProductSelect = id => {
    setSelectedProductId(id);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ProductIdBox, {
    selectedProductId: selectedProductId
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TogglerBox, {
    products: products,
    onProductSelect: handleProductSelect,
    selectedProductId: selectedProductId
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(AdjusterBox, {
    productId: selectedProductId,
    initialValue: counterValue,
    onValueChange: handleCounterChange
  }));
}
document.querySelectorAll(".react-container").forEach(container => {
  const dataScript = container.querySelector(".product-data");
  if (dataScript) {
    ReactDOM.createRoot(container).render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ProductDisplay, {
      data: dataScript.textContent
    }));
  }
});

/**
 *  WooCommerce API
 */

const addToCart = async productId => {
  try {
    const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: `wc/store/cart/add-item`,
      method: "POST",
      data: {
        id: productId,
        quantity: 1
      }
    });
    console.log("Product added to cart:", response);
    return response;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return null;
  }
};
const fetchCartContents = async () => {
  console.log("Calling fetchCartContents");
  try {
    const cartContents = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: "/wc/store/cart",
      method: "GET"
    });
    return cartContents.items;
  } catch (error) {
    console.error("Error fetching cart contents:", error);
    throw error;
  }
};

// export const removeProductFromCart = async (cartItemKey) => {
// 	try {
// 		const response = await apiFetch({
// 			path: "/wc/store/cart/remove-item", // Ensure this endpoint is correct
// 			method: "POST",
// 			data: {
// 				key: cartItemKey,
// 			},
// 		});

// 		console.log("Product removed from cart:", response);
// 		return response;
// 	} catch (error) {
// 		console.error("Error removing product from cart:", error);
// 		throw error;
// 	}
// };

const removeProductFromCart_AJAX = (productId, quantity) => {
  console.log(`Removing product ${productId} from the cart`);
  jQuery.ajax({
    url: ajaxurl,
    method: "POST",
    data: {
      action: "remove_from_cart_request",
      product_id: productId,
      quantity: quantity
    },
    success: function (data) {
      console.log(data);
    },
    error: function (errorThrown) {
      window.alert(errorThrown);
    }
  });
};

//
// App1
//

/*

const ProgressBar = ({ totalCounterValue }) => {
	const steps = [3, 6, 9, 12, 15];
	const maxStepValue = steps[steps.length - 1]; // The last step is the maximum

	const progressPercentage = (totalCounterValue / maxStepValue) * 100;

	return (
		<div className="progress-container">
			<div
				className="progress-bar"
				style={{ width: `${progressPercentage}%` }}
			></div>
			{steps.map((step) => {
				const leftPercentage = (step / maxStepValue) * 100; // Correct calculation for leftPercentage
				return (
					<div
						key={step}
						className="step-marker"
						style={{
							left: `${leftPercentage}%`,
						}}
					></div>
				);
			})}
		</div>
	);
};

// App component
const App1 = ({ containerId, productData }) => {
	const initialCounters = {
		1: {
			min: 0,
			max: 20,
			color: "#deb0a1",
			counterValue: 0,
			imageUrls: "/wp-content/uploads/2024/03/61pcyODhE4L._AC_SX679_.jpg",
			productDescription:
				"Silver infused Extra Soft Toothbrush for Adults - Dual Length Bristles for Interdental Cleaning.",
			price: 8.89,
		},
		2: {
			min: 0,
			max: 20,
			color: "#f29891",
			counterValue: 0,
			imageUrls: "/wp-content/uploads/2024/03/61pWFSOfb-L._AC_SX679_.jpg",
			productDescription:
				"Silver infused Extra Soft Toothbrush for Adults - Dual Length Bristles for Interdental Cleaning.",
			price: 8.89,
		},
		3: {
			min: 0,
			max: 20,
			color: "#5467ac",
			counterValue: 0,
			imageUrls: "/wp-content/uploads/2024/03/61QN62tdqhL._AC_SX679_.jpg",
			productDescription:
				"Silver infused Extra Soft Toothbrush for Adults - Dual Length Bristles for Interdental Cleaning.",
			price: 8.89,
		},
		4: {
			min: 0,
			max: 20,
			color: "#2b6486",
			counterValue: 0,
			imageUrls: "/wp-content/uploads/2024/03/613AaVICUCL._AC_SX679_.jpg",
			productDescription:
				"Silver infused Extra Soft Toothbrush for Adults - Dual Length Bristles for Interdental Cleaning.",
			price: 8.89,
		},
		// Add more counters as needed
	};

	const [counters, setCounters] = useState(initialCounters);
	const [activeCounterId, setActiveCounterId] = useState("1");

	const totalValues = Object.values(counters).reduce(
		(acc, counter) => {
			acc.totalCounterValue += counter.counterValue;
			acc.totalPrice += counter.counterValue * counter.price;
			return acc;
		},
		{ totalCounterValue: 0, totalPrice: 0 },
	);

	const handleActiveChange = (productId) => {
		setActiveCounterId(productId);
	};

	const handleIncrement = () => {
		console.log("handleIncrement ", activeCounterId);
		setCounters((prevCounters) => ({
			...prevCounters,
			[activeCounterId]: {
				...prevCounters[activeCounterId],
				counterValue: Math.min(
					prevCounters[activeCounterId].counterValue + 1,
					prevCounters[activeCounterId].max,
				),
			},
		}));
	};

	const handleDecrement = () => {
		console.log("handleDecrement ", activeCounterId);
		setCounters((prevCounters) => ({
			...prevCounters,
			[activeCounterId]: {
				...prevCounters[activeCounterId],
				counterValue: Math.max(
					prevCounters[activeCounterId].counterValue - 1,
					prevCounters[activeCounterId].min,
				),
			},
		}));
	};

	return (
		<EventContextProvider>
			<div>
				<div className="progress-bar-wrapper">
					<ProgressBar
						totalCounterValue={totalValues.totalCounterValue}
					></ProgressBar>
				</div>
				<div className="order-totals-wrapper">
					<div className="order-value">
						{totalValues.totalPrice.toFixed(2)}€
					</div>
					<div className="order-discount">-00% OFF</div>
					<div className="order-items">
						<div className="count">
							<span>{totalValues.totalCounterValue}</span>
						</div>
						<div>View Order</div>
					</div>
				</div>
				<div>
					<img
						src={counters[activeCounterId].imageUrls}
						alt="Active Counter"
						style={{ maxWidth: "auto", maxHeight: "60px" }}
					/>
				</div>
				<div className="description-wrapper">
					<div className="price">{counters[activeCounterId].price}€</div>
					<p>{counters[activeCounterId].productDescription}</p>
				</div>
				<div className="counters-wrapper">
					{Object.keys(counters).map((id) => (
						<CounterBoxComponent
							key={id}
							productId={id}
							min={counters[id].min}
							max={counters[id].max}
							color={counters[id].color}
							counterValue={counters[id].counterValue}
							isActive={activeCounterId === id}
							onActiveChange={handleActiveChange}
						/>
					))}
				</div>
				<div className="increment-decrement-wrapper">
					<button onClick={handleDecrement}>-</button>
					<span>
						{counters[activeCounterId].counterValue > 0
							? counters[activeCounterId].counterValue
							: ""}
					</span>
					<button onClick={handleIncrement}>+</button>
				</div>
			</div>
		</EventContextProvider>
	);
};

document.addEventListener("DOMContentLoaded", () => {
	// Assuming each .react-container is supposed to have a .product-data script associated with it
	const containers = document.querySelectorAll(".react-container");

	// Render a React component to each container
	containers.forEach((container) => {
		// Attempt to find a .product-data script within the current container
		const dataElement = container.querySelector(".product-data");
		const productData = dataElement
		? JSON.parse(dataElement.textContent)
		: null;

		const root = createRoot(container); // Create a root for each container
		// Pass both the containerId and productData to the App2 component
		root.render(<App1 containerId={container.id} productData={productData} />);
	});
});
const container = document.querySelector("#app-1");
render(<App1 />, container);

*/

//
// App2
//

/*

const App2 = ({ containerId, productData }) => {
	const ImageViewer = () => {
		const [selectedImage, setSelectedImage] = useState(
			productData.imageUrls[0],
		);
		return (
			<div className="image-viewer-wrapper">
				<div className="thumbnails-wrapper">
					{productData.imageUrls.map((url, index) => (
						<img
							key={index}
							src={url}
							alt={`Thumbnail ${index}`}
							onClick={() => setSelectedImage(url)} // Click to change the image
							onMouseEnter={() => setSelectedImage(url)} // Hover to change the image
						/>
					))}
				</div>
				<div className="full-size-wrapper">
					<img src={selectedImage} alt="Selected" />
				</div>
			</div>
		);
	};

	return (
		<div style={{ background: "white", wordBreak: "break-all" }}>
			<p>Container ID: {containerId}</p>
			<ImageViewer></ImageViewer>
			{productData && (
				<>
					<h2>{productData.title}</h2>
					<p>Price: {productData.price}</p>
					<p>Color: {productData.color}</p>
					<p>Image: {productData.imageUrls}</p>
				</>
			)}
		</div>
	);
};

document.addEventListener("DOMContentLoaded", () => {
	// Assuming each .react-container is supposed to have a .product-data script associated with it
	const containers = document.querySelectorAll(".react-container");

	// Render a React component to each container
	containers.forEach((container) => {
		// Attempt to find a .product-data script within the current container
		const dataElement = container.querySelector(".product-data");
		const productData = dataElement
			? JSON.parse(dataElement.textContent)
			: null;

		const root = createRoot(container); // Create a root for each container
		// Pass both the containerId and productData to the App2 component
		root.render(<App2 containerId={container.id} productData={productData} />);
	});
});

*/
})();

/******/ })()
;
//# sourceMappingURL=view.js.map