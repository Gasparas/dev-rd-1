import { create } from "zustand";
import apiFetch from "@wordpress/api-fetch";
import {throttle} from "lodash"

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
if(typeof window.throttle === "undefined"){
	window.throttle = throttle;
}
if(typeof window.debounce === "undefined"){
	window.debounce = debounce;
}

const addProductToCartDebounced = {}; // Object to hold debounced functions by productId
const removeProductFromCartDebounced = {}; // Object to hold debounced functions by productId

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
			// console.log("Starting to fetch cart, setting isLoading to true...");
			// set({ isLoading: true });
			try {
				const cart = await apiFetch({ path: "/wc/store/cart" });
				set({
					cartProducts: cart.items,
					totalQuantity: cart.items.reduce(
						(acc, item) => acc + item.quantity,
						0,
					),
					totalPrice: parseFloat(cart.totals.total_items) / 100,
					totalSalePrice: parseFloat(cart.totals.total_price) / 100,
					totalDiscountPrice: parseFloat(cart.totals.total_discount) / 100,
					currencyData: {
						currency_code: cart.totals.currency_code,
						currency_decimal_separator: cart.totals.currency_decimal_separator,
						currency_minor_unit: cart.totals.currency_minor_unit,
						currency_prefix: cart.totals.currency_prefix,
						currency_suffix: cart.totals.currency_suffix,
						currency_symbol: cart.totals.currency_symbol,
						currency_thousand_separator: cart.totals.currency_thousand_separator,
					},
					cartCoupons: cart.coupons,
					error: "",
				});
				// console.log("Successfully fetched cart, setting isLoading to false...");
			} catch (err) {
				console.error("Error fetching cart:", err);
				set({
					error: "Failed to fetch cart.",
				});
			} finally {
				// set({ isLoading: false });
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
			const [integerPart, decimalPart] = roundedPrice.split('.');
			const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, currency_thousand_separator);
			let formattedPrice = currency_prefix + formattedIntegerPart;
			if (decimalPart) {
				formattedPrice += currency_decimal_separator + decimalPart;
			}
			formattedPrice += currency_suffix;
			if(!wrapped) return formattedPrice;

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

		applyCoupon: async (couponCode) => {
			console.log(`Applying coupon: ${couponCode}`);
			try {
				const response = await apiFetch({
					path: "/wc/store/v1/cart/apply-coupon",
					method: "POST",
					data: { code: couponCode },
				});
				console.log(`Coupon ${couponCode} applied.`);
				// setAppliedCoupon(couponCode); // Update component state
				// Clear any existing error
				// setError("");
				set({triggerUpdateProductDisplayPrices: true});
				setTimeout(() => {
					set({triggerUpdateProductDisplayPrices: false});
				}, 200);
				set({
					totalPrice: parseFloat(response.totals.total_items) / 100,
					totalSalePrice: parseFloat(response.totals.total_price) / 100,
					totalDiscountPrice: parseFloat(response.totals.total_discount) / 100,
					currencyData: {
						currency_code: response.totals.currency_code,
						currency_decimal_separator: response.totals.currency_decimal_separator,
						currency_minor_unit: response.totals.currency_minor_unit,
						currency_prefix: response.totals.currency_prefix,
						currency_suffix: response.totals.currency_suffix,
						currency_symbol: response.totals.currency_symbol,
						currency_thousand_separator: response.totals.currency_thousand_separator,
					},
					cartCoupons: response.coupons,
				})
				return response; // Return response for potential chaining
			} catch (error) {
				console.error(`Error applying coupon ${couponCode}:`, error);
				// setError(`Failed to apply coupon ${couponCode}.`); // Update component state with error
				throw error; // Re-throw to allow catch chaining elsewhere
			}
		},

		triggerTotalCartUpdate: () => {
			set((state) => ({
				totalCartUpdate: state.totalCartUpdate + 1,
			}));
		},
	}));

export default window.myGlobalStore;
