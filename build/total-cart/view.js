/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! zustand */ "./node_modules/zustand/esm/index.mjs");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);




// Utility debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Fix missing global func
if (typeof window.throttle === "undefined") {
  window.throttle = lodash__WEBPACK_IMPORTED_MODULE_1__.throttle;
}
if (typeof window.debounce === "undefined") {
  window.debounce = debounce;
}
const addProductToCartDebounced = {}; // Object to hold debounced functions by productId
const removeProductFromCartDebounced = {}; // Object to hold debounced functions by productId

const logVariables = variables => {
  for (const [name, value] of Object.entries(variables)) {
    console.log(`${name}:`, value);
  }
};

// Attach the store to a global variable to ensure a single instance
window.myGlobalStore = window.myGlobalStore || (0,zustand__WEBPACK_IMPORTED_MODULE_2__.create)((set, get) => ({
  // Initial state...
  totalCartUpdate: 0,
  cartProducts: [],
  totalQuantity: 0,
  totalPrice: 0.0,
  totalSalePrice: 0.0,
  totalDiscountPrice: 0.0,
  currencyData: {
    currency_code: "",
    currency_decimal_separator: ".",
    currency_minor_unit: 2,
    currency_prefix: "",
    currency_suffix: "",
    currency_symbol: "",
    currency_thousand_separator: ""
  },
  isLoading: false,
  error: "",
  isAddingToCart: false,
  cartAdditions: {},
  // Holds the count of additions for debounce
  cartRemovals: {},
  // Holds the count of removals for debounce,
  cartCoupons: [],
  triggerUpdateProductDisplayPrices: false,
  //Coupon update indicator

  // State setters...
  // These setters are simplified for demonstration. You might adjust them based on your needs.

  // Fetch cart data
  fetchCart: async () => {
    try {
      // Fetch the cart data
      const cart = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
        path: "/wc/store/cart"
      });

      // Fetch shipping methods to get flat rate
      const shippingMethods = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
        path: "/custom/v1/shipping-methods",
        method: "GET"
      });

      // Find the flat rate method and extract its cost
      const flatRateMethod = shippingMethods.find(method => method.id === "flat_rate");
      const flatRateCost = flatRateMethod ? parseFloat(flatRateMethod.cost) : 0;

      // Access the threshold value from localized script data
      const freeShippingThreshold = wc_free_shipping_data.threshold;

      // Calculate total items price
      const totalItems = parseFloat(cart.totals.total_items) / 100 || 0;
      const totalPrice = parseFloat(cart.totals.total_price) / 100 || 0;
      // const totalDiscountPrice = parseFloat(cart.totals.total_discount) / 100 || 0;

      // Determine shipping cost based on threshold
      const shippingTotal = totalPrice >= freeShippingThreshold ? 0 : flatRateCost;
      const totalPriceMinusShipping = Math.max(totalItems, 0).toFixed(2);
      const totalSalePriceMinusShipping = Math.max(totalPrice - shippingTotal, 0).toFixed(2);

      // logVariables({ totalPriceMinusShipping, totalSalePriceMinusShipping });

      // Set the state with the extracted values
      set({
        cartProducts: cart.items,
        totalQuantity: cart.items.reduce((acc, item) => acc + item.quantity, 0),
        totalPrice: totalItems,
        totalPriceMinusShipping: totalPriceMinusShipping,
        totalSalePrice: totalPrice,
        totalSalePriceMinusShipping: totalSalePriceMinusShipping,
        // totalDiscountPrice: totalDiscountPrice,
        shippingTotal: shippingTotal,
        currencyData: {
          currency_code: cart.totals.currency_code,
          currency_decimal_separator: cart.totals.currency_decimal_separator,
          currency_minor_unit: cart.totals.currency_minor_unit,
          currency_prefix: cart.totals.currency_prefix,
          currency_suffix: cart.totals.currency_suffix,
          currency_symbol: cart.totals.currency_symbol,
          currency_thousand_separator: cart.totals.currency_thousand_separator
        },
        cartCoupons: cart.coupons,
        error: ""
      });

      // Debugging: Log the shipping total
      // console.log("Shipping Total (Flat Rate or Free):", shippingTotal);
    } catch (err) {
      console.error("Error fetching cart:", err);
      set({
        error: "Failed to fetch cart."
      });
    }
  },
  applyCoupon: async couponCode => {
    console.log(`Applying coupon: ${couponCode}`);
    try {
      // Fetch the cart data

      // Post couppon code
      const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
        path: "/wc/store/v1/cart/apply-coupon",
        method: "POST",
        data: {
          code: couponCode
        }
      });
      console.log(`Coupon ${couponCode} applied.`);
      const cart = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
        path: "/wc/store/cart"
      });

      // Fetch shipping methods to get flat rate
      const shippingMethods = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
        path: "/custom/v1/shipping-methods",
        method: "GET"
      });

      // Find the flat rate method and extract its cost
      const flatRateMethod = shippingMethods.find(method => method.id === "flat_rate");
      const flatRateCost = flatRateMethod ? parseFloat(flatRateMethod.cost) : 0;

      // Access the threshold value from localized script data
      const freeShippingThreshold = wc_free_shipping_data.threshold;
      const totalItems = parseFloat(cart.totals.total_items) / 100 || 0;
      const totalPrice = parseFloat(cart.totals.total_price) / 100 || 0;

      // Determine shipping cost based on threshold
      const shippingTotal = totalPrice >= freeShippingThreshold ? 0 : flatRateCost;
      const totalSalePriceMinusShipping = Math.max(totalPrice - shippingTotal, 0).toFixed(2);
      const totalPriceMinusShipping = Math.max(totalItems, 0).toFixed(2);

      // setAppliedCoupon(couponCode); // Update component state
      // Clear any existing error
      // setError("");
      set({
        triggerUpdateProductDisplayPrices: true
      });
      setTimeout(() => {
        set({
          triggerUpdateProductDisplayPrices: false
        });
      }, 200);

      // logVariables({ totalPriceMinusShipping, totalSalePriceMinusShipping });

      set({
        totalPrice: parseFloat(response.totals.total_items) / 100,
        totalPriceMinusShipping: totalPriceMinusShipping,
        totalSalePrice: parseFloat(response.totals.total_price) / 100,
        totalSalePriceMinusShipping: totalSalePriceMinusShipping,
        totalDiscountPrice: parseFloat(response.totals.total_discount) / 100,
        currencyData: {
          currency_code: response.totals.currency_code,
          currency_decimal_separator: response.totals.currency_decimal_separator,
          currency_minor_unit: response.totals.currency_minor_unit,
          currency_prefix: response.totals.currency_prefix,
          currency_suffix: response.totals.currency_suffix,
          currency_symbol: response.totals.currency_symbol,
          currency_thousand_separator: response.totals.currency_thousand_separator
        },
        cartCoupons: response.coupons
      });
      return response; // Return response for potential chaining
    } catch (error) {
      console.error(`Error applying coupon ${couponCode}:`, error);
      // setError(`Failed to apply coupon ${couponCode}.`); // Update component state with error
      throw error; // Re-throw to allow catch chaining elsewhere
    }
  },
  wc_price: (price, wrapped = true) => {
    const {
      currency_code,
      currency_decimal_separator,
      currency_minor_unit,
      currency_prefix,
      currency_suffix,
      currency_symbol,
      currency_thousand_separator
    } = get().currencyData;
    const roundedPrice = price.toFixed(currency_minor_unit);
    const [integerPart, decimalPart] = roundedPrice.split(".");
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, currency_thousand_separator);
    let formattedPrice = currency_prefix + formattedIntegerPart;
    if (decimalPart) {
      formattedPrice += currency_decimal_separator + decimalPart;
    }
    formattedPrice += currency_suffix;
    if (!wrapped) return formattedPrice;
    return `<span class="woocommerce-Price-amount amount"><bdi>${formattedPrice}</bdi></span>`;
  },
  addToCart: productId => {
    // Increase the count for the specific productId
    const currentCount = get().cartAdditions[productId] || 0;
    set(state => ({
      cartAdditions: {
        ...state.cartAdditions,
        [productId]: currentCount + 1
      }
    }));

    // Initialize the debounced function if it doesn't exist for the productId
    if (!addProductToCartDebounced[productId]) {
      addProductToCartDebounced[productId] = debounce(async () => {
        set({
          isLoading: true
        });
        try {
          const quantityToAdd = get().cartAdditions[productId];
          console.log(`Adding ${quantityToAdd} of product ${productId} to cart.`);
          await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
            path: "/wc/store/cart/add-item",
            method: "POST",
            data: {
              id: productId,
              quantity: quantityToAdd
            }
          });

          // Dispatch custom event to update the mini-cart
          const event = new Event("added_to_cart");
          document.dispatchEvent(event);

          // Reset the count for productId after adding
          set(state => ({
            cartAdditions: {
              ...state.cartAdditions,
              [productId]: 0
            }
          }));
          get().fetchCart();
        } catch (error) {
          console.error("Error adding item to cart:", error);
          set({
            error: "Failed to add item to cart."
          });
        } finally {
          set({
            isLoading: false
          });
        }
      }, 300); // Debounce time
    }

    // Call the debounced addition function
    addProductToCartDebounced[productId]();
  },
  // Define remFromCart within your store
  remFromCart: productId => {
    // Increase the removal count for the specific productId
    const currentCount = get().cartRemovals[productId] || 0;
    set(state => ({
      cartRemovals: {
        ...state.cartRemovals,
        [productId]: currentCount + 1
      }
    }));
    if (!removeProductFromCartDebounced[productId]) {
      removeProductFromCartDebounced[productId] = debounce(async () => {
        set({
          isLoading: true
        });
        const cartProducts = get().cartProducts;
        const item = cartProducts.find(item => item.id === productId);
        if (!item) {
          console.error("Item not found in cart:", productId);
          set({
            isLoading: false
          });
          return;
        }
        try {
          const itemData = {
            key: item.key,
            quantity: item.quantity - get().cartRemovals[productId]
          };

          // Reset the removal count for productId after removing
          set(state => ({
            cartRemovals: {
              ...state.cartRemovals,
              [productId]: 0
            }
          }));
          await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
            path: itemData.quantity > 0 ? "/wc/store/cart/update-item" : "/wc/store/cart/remove-item",
            method: "POST",
            data: itemData
          });
          console.log(`Updated cart for product ${productId}.`);
          get().fetchCart();
        } catch (error) {
          console.error("Error updating cart:", error);
          set({
            error: "Failed to update cart."
          });
        } finally {
          set({
            isLoading: false
          });
          get().triggerTotalCartUpdate();
        }
      }, 300); // Debounce time
    }
    removeProductFromCartDebounced[productId]();
  },
  triggerTotalCartUpdate: () => {
    set(state => ({
      totalCartUpdate: state.totalCartUpdate + 1
    }));
  }
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.myGlobalStore);

/***/ }),

/***/ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {

          'use strict';

/* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ===
    'function'
) {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
}
          var React = __webpack_require__(/*! react */ "react");

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function error(format) {
  {
    {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      printWarning('error', format, args);
    }
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    } // eslint-disable-next-line react-internal/safe-string-coercion


    var argsWithFormat = args.map(function (item) {
      return String(item);
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
  ;
}

var objectIs = typeof Object.is === 'function' ? Object.is : is;

// dispatch for CommonJS interop named imports.

var useState = React.useState,
    useEffect = React.useEffect,
    useLayoutEffect = React.useLayoutEffect,
    useDebugValue = React.useDebugValue;
var didWarnOld18Alpha = false;
var didWarnUncachedGetSnapshot = false; // Disclaimer: This shim breaks many of the rules of React, and only works
// because of a very particular set of implementation details and assumptions
// -- change any one of them and it will break. The most important assumption
// is that updates are always synchronous, because concurrent rendering is
// only available in versions of React that also have a built-in
// useSyncExternalStore API. And we only use this shim when the built-in API
// does not exist.
//
// Do not assume that the clever hacks used by this hook also work in general.
// The point of this shim is to replace the need for hacks by other libraries.

function useSyncExternalStore(subscribe, getSnapshot, // Note: The shim does not use getServerSnapshot, because pre-18 versions of
// React do not expose a way to check if we're hydrating. So users of the shim
// will need to track that themselves and return the correct value
// from `getSnapshot`.
getServerSnapshot) {
  {
    if (!didWarnOld18Alpha) {
      if (React.startTransition !== undefined) {
        didWarnOld18Alpha = true;

        error('You are using an outdated, pre-release alpha of React 18 that ' + 'does not support useSyncExternalStore. The ' + 'use-sync-external-store shim will not work correctly. Upgrade ' + 'to a newer pre-release.');
      }
    }
  } // Read the current snapshot from the store on every render. Again, this
  // breaks the rules of React, and only works here because of specific
  // implementation details, most importantly that updates are
  // always synchronous.


  var value = getSnapshot();

  {
    if (!didWarnUncachedGetSnapshot) {
      var cachedValue = getSnapshot();

      if (!objectIs(value, cachedValue)) {
        error('The result of getSnapshot should be cached to avoid an infinite loop');

        didWarnUncachedGetSnapshot = true;
      }
    }
  } // Because updates are synchronous, we don't queue them. Instead we force a
  // re-render whenever the subscribed state changes by updating an some
  // arbitrary useState hook. Then, during render, we call getSnapshot to read
  // the current value.
  //
  // Because we don't actually use the state returned by the useState hook, we
  // can save a bit of memory by storing other stuff in that slot.
  //
  // To implement the early bailout, we need to track some things on a mutable
  // object. Usually, we would put that in a useRef hook, but we can stash it in
  // our useState hook instead.
  //
  // To force a re-render, we call forceUpdate({inst}). That works because the
  // new object always fails an equality check.


  var _useState = useState({
    inst: {
      value: value,
      getSnapshot: getSnapshot
    }
  }),
      inst = _useState[0].inst,
      forceUpdate = _useState[1]; // Track the latest getSnapshot function with a ref. This needs to be updated
  // in the layout phase so we can access it during the tearing check that
  // happens on subscribe.


  useLayoutEffect(function () {
    inst.value = value;
    inst.getSnapshot = getSnapshot; // Whenever getSnapshot or subscribe changes, we need to check in the
    // commit phase if there was an interleaved mutation. In concurrent mode
    // this can happen all the time, but even in synchronous mode, an earlier
    // effect may have mutated the store.

    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceUpdate({
        inst: inst
      });
    }
  }, [subscribe, value, getSnapshot]);
  useEffect(function () {
    // Check for changes right before subscribing. Subsequent changes will be
    // detected in the subscription handler.
    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceUpdate({
        inst: inst
      });
    }

    var handleStoreChange = function () {
      // TODO: Because there is no cross-renderer API for batching updates, it's
      // up to the consumer of this library to wrap their subscription event
      // with unstable_batchedUpdates. Should we try to detect when this isn't
      // the case and print a warning in development?
      // The store changed. Check if the snapshot changed since the last time we
      // read from the store.
      if (checkIfSnapshotChanged(inst)) {
        // Force a re-render.
        forceUpdate({
          inst: inst
        });
      }
    }; // Subscribe to the store and return a clean-up function.


    return subscribe(handleStoreChange);
  }, [subscribe]);
  useDebugValue(value);
  return value;
}

function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  var prevValue = inst.value;

  try {
    var nextValue = latestGetSnapshot();
    return !objectIs(prevValue, nextValue);
  } catch (error) {
    return true;
  }
}

function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
  // Note: The shim does not use getServerSnapshot, because pre-18 versions of
  // React do not expose a way to check if we're hydrating. So users of the shim
  // will need to track that themselves and return the correct value
  // from `getSnapshot`.
  return getSnapshot();
}

var canUseDOM = !!(typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined');

var isServerEnvironment = !canUseDOM;

var shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore;
var useSyncExternalStore$2 = React.useSyncExternalStore !== undefined ? React.useSyncExternalStore : shim;

exports.useSyncExternalStore = useSyncExternalStore$2;
          /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ===
    'function'
) {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
}
        
  })();
}


/***/ }),

/***/ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {

          'use strict';

/* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ===
    'function'
) {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
}
          var React = __webpack_require__(/*! react */ "react");
var shim = __webpack_require__(/*! use-sync-external-store/shim */ "./node_modules/use-sync-external-store/shim/index.js");

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
  ;
}

var objectIs = typeof Object.is === 'function' ? Object.is : is;

var useSyncExternalStore = shim.useSyncExternalStore;

// for CommonJS interop.

var useRef = React.useRef,
    useEffect = React.useEffect,
    useMemo = React.useMemo,
    useDebugValue = React.useDebugValue; // Same as useSyncExternalStore, but supports selector and isEqual arguments.

function useSyncExternalStoreWithSelector(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
  // Use this to track the rendered snapshot.
  var instRef = useRef(null);
  var inst;

  if (instRef.current === null) {
    inst = {
      hasValue: false,
      value: null
    };
    instRef.current = inst;
  } else {
    inst = instRef.current;
  }

  var _useMemo = useMemo(function () {
    // Track the memoized state using closure variables that are local to this
    // memoized instance of a getSnapshot function. Intentionally not using a
    // useRef hook, because that state would be shared across all concurrent
    // copies of the hook/component.
    var hasMemo = false;
    var memoizedSnapshot;
    var memoizedSelection;

    var memoizedSelector = function (nextSnapshot) {
      if (!hasMemo) {
        // The first time the hook is called, there is no memoized result.
        hasMemo = true;
        memoizedSnapshot = nextSnapshot;

        var _nextSelection = selector(nextSnapshot);

        if (isEqual !== undefined) {
          // Even if the selector has changed, the currently rendered selection
          // may be equal to the new selection. We should attempt to reuse the
          // current value if possible, to preserve downstream memoizations.
          if (inst.hasValue) {
            var currentSelection = inst.value;

            if (isEqual(currentSelection, _nextSelection)) {
              memoizedSelection = currentSelection;
              return currentSelection;
            }
          }
        }

        memoizedSelection = _nextSelection;
        return _nextSelection;
      } // We may be able to reuse the previous invocation's result.


      // We may be able to reuse the previous invocation's result.
      var prevSnapshot = memoizedSnapshot;
      var prevSelection = memoizedSelection;

      if (objectIs(prevSnapshot, nextSnapshot)) {
        // The snapshot is the same as last time. Reuse the previous selection.
        return prevSelection;
      } // The snapshot has changed, so we need to compute a new selection.


      // The snapshot has changed, so we need to compute a new selection.
      var nextSelection = selector(nextSnapshot); // If a custom isEqual function is provided, use that to check if the data
      // has changed. If it hasn't, return the previous selection. That signals
      // to React that the selections are conceptually equal, and we can bail
      // out of rendering.

      // If a custom isEqual function is provided, use that to check if the data
      // has changed. If it hasn't, return the previous selection. That signals
      // to React that the selections are conceptually equal, and we can bail
      // out of rendering.
      if (isEqual !== undefined && isEqual(prevSelection, nextSelection)) {
        return prevSelection;
      }

      memoizedSnapshot = nextSnapshot;
      memoizedSelection = nextSelection;
      return nextSelection;
    }; // Assigning this to a constant so that Flow knows it can't change.


    // Assigning this to a constant so that Flow knows it can't change.
    var maybeGetServerSnapshot = getServerSnapshot === undefined ? null : getServerSnapshot;

    var getSnapshotWithSelector = function () {
      return memoizedSelector(getSnapshot());
    };

    var getServerSnapshotWithSelector = maybeGetServerSnapshot === null ? undefined : function () {
      return memoizedSelector(maybeGetServerSnapshot());
    };
    return [getSnapshotWithSelector, getServerSnapshotWithSelector];
  }, [getSnapshot, getServerSnapshot, selector, isEqual]),
      getSelection = _useMemo[0],
      getServerSelection = _useMemo[1];

  var value = useSyncExternalStore(subscribe, getSelection, getServerSelection);
  useEffect(function () {
    inst.hasValue = true;
    inst.value = value;
  }, [value]);
  useDebugValue(value);
  return value;
}

exports.useSyncExternalStoreWithSelector = useSyncExternalStoreWithSelector;
          /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ===
    'function'
) {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
}
        
  })();
}


/***/ }),

/***/ "./node_modules/use-sync-external-store/shim/index.js":
/*!************************************************************!*\
  !*** ./node_modules/use-sync-external-store/shim/index.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (false) {} else {
  module.exports = __webpack_require__(/*! ../cjs/use-sync-external-store-shim.development.js */ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js");
}


/***/ }),

/***/ "./node_modules/use-sync-external-store/shim/with-selector.js":
/*!********************************************************************!*\
  !*** ./node_modules/use-sync-external-store/shim/with-selector.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (false) {} else {
  module.exports = __webpack_require__(/*! ../cjs/use-sync-external-store-shim/with-selector.development.js */ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js");
}


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["lodash"];

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

/***/ }),

/***/ "./node_modules/zustand/esm/index.mjs":
/*!********************************************!*\
  !*** ./node_modules/zustand/esm/index.mjs ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   create: () => (/* binding */ create),
/* harmony export */   createStore: () => (/* reexport safe */ zustand_vanilla__WEBPACK_IMPORTED_MODULE_0__.createStore),
/* harmony export */   "default": () => (/* binding */ react),
/* harmony export */   useStore: () => (/* binding */ useStore)
/* harmony export */ });
/* harmony import */ var zustand_vanilla__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand/vanilla */ "./node_modules/zustand/esm/vanilla.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var use_sync_external_store_shim_with_selector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! use-sync-external-store/shim/with-selector.js */ "./node_modules/use-sync-external-store/shim/with-selector.js");





const { useDebugValue } = react__WEBPACK_IMPORTED_MODULE_1__;
const { useSyncExternalStoreWithSelector } = use_sync_external_store_shim_with_selector_js__WEBPACK_IMPORTED_MODULE_2__;
let didWarnAboutEqualityFn = false;
const identity = (arg) => arg;
function useStore(api, selector = identity, equalityFn) {
  if (( false ? 0 : void 0) !== "production" && equalityFn && !didWarnAboutEqualityFn) {
    console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
    );
    didWarnAboutEqualityFn = true;
  }
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getInitialState,
    selector,
    equalityFn
  );
  useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  if (( false ? 0 : void 0) !== "production" && typeof createState !== "function") {
    console.warn(
      "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
    );
  }
  const api = typeof createState === "function" ? (0,zustand_vanilla__WEBPACK_IMPORTED_MODULE_0__.createStore)(createState) : createState;
  const useBoundStore = (selector, equalityFn) => useStore(api, selector, equalityFn);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
var react = (createState) => {
  if (( false ? 0 : void 0) !== "production") {
    console.warn(
      "[DEPRECATED] Default export is deprecated. Instead use `import { create } from 'zustand'`."
    );
  }
  return create(createState);
};




/***/ }),

/***/ "./node_modules/zustand/esm/vanilla.mjs":
/*!**********************************************!*\
  !*** ./node_modules/zustand/esm/vanilla.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createStore: () => (/* binding */ createStore),
/* harmony export */   "default": () => (/* binding */ vanilla)
/* harmony export */ });
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => {
    if (( false ? 0 : void 0) !== "production") {
      console.warn(
        "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
      );
    }
    listeners.clear();
  };
  const api = { setState, getState, getInitialState, subscribe, destroy };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
var vanilla = (createState) => {
  if (( false ? 0 : void 0) !== "production") {
    console.warn(
      "[DEPRECATED] Default export is deprecated. Instead use import { createStore } from 'zustand/vanilla'."
    );
  }
  return createStore(createState);
};




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
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! store */ "./src/store.js");

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



/**
 * NextStep
 */

const NextStep = ({
  beforeNextStep,
  percanteges,
  currentStep
}) => {
  const nextPercentage = percanteges[currentStep];
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
  const totalCartUpdate = (0,store__WEBPACK_IMPORTED_MODULE_2__["default"])(state => {
    console.log("TotalCart totalCartUpdate", state.totalCartUpdate);
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
  const [steps, setSteps] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(data.steps);
  const [percanteges, setPercanteges] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(data.perc);
  const [currentStep, setCurrentStep] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  // const percanteges = ["5", "10", "15", "20"];
  const [distanceToNextStep, setDistanceToNextStep] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // setSteps(data.steps);
    // setPercanteges(data.perc);
  }, [data]);
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
      // removeCoupon(appliedCoupon);
      setCurrentStep(0);
      // setBeforeNextStep(0);
      // fetchCart();
      return;
    }
    const newCouponCode = stepIndex ? `coupon-step-${stepIndex}` : 0;
    if (stepIndex !== currentStep) {
      setCurrentStep(stepIndex);
      // setBeforeNextStep(1);
      console.log(`Current step: ${stepIndex} for total items: ${totalQuantity}`);

      // Chain removal and application of coupons only if there's a valid step
      // if (newCouponCode && appliedCoupon !== newCouponCode) {
      // 	const couponOperation = appliedCoupon
      // 		? removeCoupon(appliedCoupon).then(() => applyCoupon(newCouponCode))
      // 		: applyCoupon(newCouponCode);

      // 	couponOperation
      // 		.then(() => {
      // 			console.log("Coupon operation completed.");
      // 			fetchCart();
      // 		})
      // 		.catch((error) => {
      // 			console.error("Coupon operation failed:", error);
      // 		});
      // }
    }
  };
  if (isLoading) return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Loading cart items...");
  if (error) return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Error: ", error);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(NextStep, {
    beforeNextStep: distanceToNextStep,
    percanteges: percanteges,
    currentStep: currentStep
  }));
};
const container = document.querySelector("#root-total-cart");
const jsonDataElement = document.querySelector(".total-cart-data");
const jsonData = JSON.parse(jsonDataElement?.textContent || "{}");

// ReactDOM.createRoot(container).render(<TotalCart data={jsonData} />);
})();

/******/ })()
;
//# sourceMappingURL=view.js.map