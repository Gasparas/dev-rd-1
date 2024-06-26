import { create } from "zustand";
import apiFetch from "@wordpress/api-fetch";
import { throttle } from "lodash";

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
	window.throttle = throttle;
}
if (typeof window.debounce === "undefined") {
	window.debounce = debounce;
}

const addProductToCartDebounced = {}; // Object to hold debounced functions by productId
const removeProductFromCartDebounced = {}; // Object to hold debounced functions by productId

const logVariables = (variables) => {
	for (const [name, value] of Object.entries(variables)) {
		console.log(`${name}:`, value);
	}
};

// Attach the store to a global variable to ensure a single instance
window.myGlobalStore =
	window.myGlobalStore ||
	create((set, get) => ({
		// Initial state...
		totalCartUpdate: 0,
		cartProducts: [],
		totalQuantity: 0,
		totalPrice: 0.0,
		totalSalePrice: 0.0,
		totalDiscountPrice: 0.0,
		currencyData: {
			currency_code: "EUR",
			currency_decimal_separator: ".",
			currency_minor_unit: 2,
			currency_prefix: "",
			currency_suffix: "€",
			currency_symbol: "€",
			currency_thousand_separator: "",
		},
		isLoading: false,
		error: "",
		isAddingToCart: false,
		cartAdditions: {}, // Holds the count of additions for debounce
		cartRemovals: {}, // Holds the count of removals for debounce,
		cartCoupons: [],
		triggerUpdateProductDisplayPrices: false, //Coupon update indicator

		// State setters...
		// These setters are simplified for demonstration. You might adjust them based on your needs.

		// Fetch cart data
		fetchCart: async () => {
			try {
				// Fetch the cart data
				const cart = await apiFetch({ path: "/wc/store/cart" });

				// Fetch shipping methods to get flat rate
				const shippingMethods = await apiFetch({
					path: "/custom/v1/shipping-methods",
					method: "GET",
				});

				// Find the flat rate method and extract its cost
				const flatRateMethod = shippingMethods.find(
					(method) => method.id === "flat_rate",
				);
				const flatRateCost = flatRateMethod
					? parseFloat(flatRateMethod.cost)
					: 0;

				// Access the threshold value from localized script data
				const freeShippingThreshold = wc_free_shipping_data.threshold;

				// Calculate total items price
				const totalItems = parseFloat(cart.totals.total_items) / 100 || 0;
				const totalPrice = parseFloat(cart.totals.total_price) / 100 || 0;
				// const totalDiscountPrice = parseFloat(cart.totals.total_discount) / 100 || 0;

				// Determine shipping cost based on threshold
				const shippingTotal =
					totalPrice >= freeShippingThreshold ? 0 : flatRateCost;

				const totalPriceMinusShipping = Math.max(totalItems, 0).toFixed(2);

				const totalSalePriceMinusShipping = Math.max(
					totalPrice - shippingTotal,
					0,
				).toFixed(2);

				// logVariables({ totalPriceMinusShipping, totalSalePriceMinusShipping });

				// Set the state with the extracted values
				set({
					cartProducts: cart.items,
					totalQuantity: cart.items.reduce(
						(acc, item) => acc + item.quantity,
						0,
					),
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
						currency_thousand_separator:
							cart.totals.currency_thousand_separator,
					},
					cartCoupons: cart.coupons,
					error: "",
				});

				// Debugging: Log the shipping total
				// console.log("Shipping Total (Flat Rate or Free):", shippingTotal);
			} catch (err) {
				console.error("Error fetching cart:", err);
				set({ error: "Failed to fetch cart." });
			}
		},

		applyCoupon: async (couponCode) => {
			console.log(`Applying coupon: ${couponCode}`);
			try {
				// Fetch the cart data
				
				// Post couppon code
				const response = await apiFetch({
					path: "/wc/store/v1/cart/apply-coupon",
					method: "POST",
					data: { code: couponCode },
				});
				console.log(`Coupon ${couponCode} applied.`);
				
				const cart = await apiFetch({ path: "/wc/store/cart" });
				
				// Fetch shipping methods to get flat rate
				const shippingMethods = await apiFetch({
					path: "/custom/v1/shipping-methods",
					method: "GET",
				});

				// Find the flat rate method and extract its cost
				const flatRateMethod = shippingMethods.find(
					(method) => method.id === "flat_rate",
				);
				const flatRateCost = flatRateMethod
					? parseFloat(flatRateMethod.cost)
					: 0;

				// Access the threshold value from localized script data
				const freeShippingThreshold = wc_free_shipping_data.threshold;

				const totalItems = parseFloat(cart.totals.total_items) / 100 || 0;
				const totalPrice = parseFloat(cart.totals.total_price) / 100 || 0;

				// Determine shipping cost based on threshold
				const shippingTotal =
					totalPrice >= freeShippingThreshold ? 0 : flatRateCost;

				const totalSalePriceMinusShipping = Math.max(
					totalPrice - shippingTotal,
					0,
				).toFixed(2);

				const totalPriceMinusShipping = Math.max(totalItems, 0).toFixed(2);

				// setAppliedCoupon(couponCode); // Update component state
				// Clear any existing error
				// setError("");
				set({ triggerUpdateProductDisplayPrices: true });
				setTimeout(() => {
					set({ triggerUpdateProductDisplayPrices: false });
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
						currency_decimal_separator:
							response.totals.currency_decimal_separator,
						currency_minor_unit: response.totals.currency_minor_unit,
						currency_prefix: response.totals.currency_prefix,
						currency_suffix: response.totals.currency_suffix,
						currency_symbol: response.totals.currency_symbol,
						currency_thousand_separator:
							response.totals.currency_thousand_separator,
					},
					cartCoupons: response.coupons,
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
				currency_thousand_separator,
			} = get().currencyData;

			const roundedPrice = price.toFixed(currency_minor_unit);
			const [integerPart, decimalPart] = roundedPrice.split(".");
			const formattedIntegerPart = integerPart.replace(
				/\B(?=(\d{3})+(?!\d))/g,
				currency_thousand_separator,
			);
			let formattedPrice = currency_prefix + formattedIntegerPart;
			if (decimalPart) {
				formattedPrice += currency_decimal_separator + decimalPart;
			}
			formattedPrice += currency_suffix;
			if (!wrapped) return formattedPrice;

			return `<span class="woocommerce-Price-amount amount"><bdi>${formattedPrice}</bdi></span>`;
		},

		addToCart: (productId) => {
			// Increase the count for the specific productId
			const currentCount = get().cartAdditions[productId] || 0;
			set((state) => ({
				cartAdditions: {
					...state.cartAdditions,
					[productId]: currentCount + 1,
				},
			}));

			// Initialize the debounced function if it doesn't exist for the productId
			if (!addProductToCartDebounced[productId]) {
				addProductToCartDebounced[productId] = debounce(async () => {
					set({ isLoading: true });
					try {
						const quantityToAdd = get().cartAdditions[productId];
						console.log(
							`Adding ${quantityToAdd} of product ${productId} to cart.`,
						);

						await apiFetch({
							path: "/wc/store/cart/add-item",
							method: "POST",
							data: { id: productId, quantity: quantityToAdd },
						});

						// Dispatch custom event to update the mini-cart
						const event = new Event("added_to_cart");
						document.dispatchEvent(event);

						// Reset the count for productId after adding
						set((state) => ({
							cartAdditions: {
								...state.cartAdditions,
								[productId]: 0,
							},
						}));

						get().fetchCart();
					} catch (error) {
						console.error("Error adding item to cart:", error);
						set({ error: "Failed to add item to cart." });
					} finally {
						set({ isLoading: false });
					}
				}, 300); // Debounce time
			}

			// Call the debounced addition function
			addProductToCartDebounced[productId]();
		},
		// Define remFromCart within your store
		remFromCart: (productId) => {
			// Increase the removal count for the specific productId
			const currentCount = get().cartRemovals[productId] || 0;
			set((state) => ({
				cartRemovals: {
					...state.cartRemovals,
					[productId]: currentCount + 1,
				},
			}));

			if (!removeProductFromCartDebounced[productId]) {
				removeProductFromCartDebounced[productId] = debounce(async () => {
					set({ isLoading: true });

					const cartProducts = get().cartProducts;
					const item = cartProducts.find((item) => item.id === productId);

					if (!item) {
						console.error("Item not found in cart:", productId);
						set({ isLoading: false });
						return;
					}

					try {
						const itemData = {
							key: item.key,
							quantity: item.quantity - get().cartRemovals[productId],
						};

						// Reset the removal count for productId after removing
						set((state) => ({
							cartRemovals: {
								...state.cartRemovals,
								[productId]: 0,
							},
						}));

						await apiFetch({
							path:
								itemData.quantity > 0
									? "/wc/store/cart/update-item"
									: "/wc/store/cart/remove-item",
							method: "POST",
							data: itemData,
						});

						console.log(`Updated cart for product ${productId}.`);
						get().fetchCart();
					} catch (error) {
						console.error("Error updating cart:", error);
						set({ error: "Failed to update cart." });
					} finally {
						set({ isLoading: false });
						get().triggerTotalCartUpdate();
					}
				}, 300); // Debounce time
			}

			removeProductFromCartDebounced[productId]();
		},

		triggerTotalCartUpdate: () => {
			set((state) => ({
				totalCartUpdate: state.totalCartUpdate + 1,
			}));
		},
	}));

export default window.myGlobalStore;
