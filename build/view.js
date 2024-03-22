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


function GlobalTotal() {}

/**
 *
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
  const [cartItems, setCartItems] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [isLoading, setIsLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setValue(initialValue);
  }, [initialValue]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    apiFetchCartItems();
  }, []);
  const apiFetchCartItems = () => {
    setIsLoading(true);
    setError(null);
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: "/wc/store/cart/items"
    }).then(items => {
      setCartItems(items);
      setIsLoading(false);
    }).catch(error => {
      console.error("Error fetching cart items:", error);
      setError("Failed to fetch cart items.");
      setIsLoading(false);
    });
  };
  const apiAddToCart = productId => {
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
      apiFetchCartItems(); // Refresh the cart items to reflect the change
      console.log(`Add to cart: ${productId}`);
    }).catch(error => {
      console.error("Error incrementing item:", error);
      setError("Failed to increment item.");
      setIsLoading(false);
    });
  };
  const apiRemoveFromCart = productId => {
    setIsLoading(true);

    // Find the current item in the cart
    const item = cartItems.find(item => item.id === productId);
    if (!item) {
      // If item not found, exit early
      console.error("Item not found in cart:", productId);
      setIsLoading(false);
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
        apiFetchCartItems(); // Refresh the cart items to reflect the change
        console.log(`Remove from cart: ${productId}`);
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
        apiFetchCartItems(); // Refresh the cart items to reflect the change
        console.log(`Decrease cart quantity: ${productId}`);
      }).catch(error => {
        console.error("Error decrementing item:", error);
        setError("Failed to decrement item.");
        setIsLoading(false);
      });
    }
  };
  const handleIncrement = () => {
    const newValue = value + 1;
    setValue(newValue);
    onValueChange(newValue);
    apiAddToCart(productId);
  };
  const handleDecrement = () => {
    if (value > 0) {
      const newValue = value - 1;
      setValue(newValue);
      onValueChange(newValue);
      apiRemoveFromCart(productId);
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleDecrement,
    disabled: isLoading
  }, isLoading ? "-" : "-"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, " ", value, " "), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
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
  const handleCounterChange = newValue => {
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
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ProductGallery, {
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
    onValueChange: handleCounterChange
  }));
}
document.querySelectorAll(".react-container").forEach(container => {
  const jsonDataElement = container.querySelector(".product-data");
  if (jsonDataElement) {
    const jsonData = JSON.parse(jsonDataElement.textContent || "[]");
    console.log('Mount data', jsonData);
    ReactDOM.createRoot(container).render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ProductDisplay, {
      data: jsonData
    }));
  }
});

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