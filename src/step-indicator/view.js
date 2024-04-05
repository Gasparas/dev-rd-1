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

import {
	createRoot,
	render,
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import useStore from "store";

/**
 * useCart
 */

function useCart(productId) {
	const triggerTotalCartUpdate = useStore(
		(state) => state.triggerTotalCartUpdate,
	);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const [cartProducts, setCartProducts] = useState([]);
	const [totalQuantity, setTotalQuantity] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalSalePrice, setTotalSalePrice] = useState(0);
	const [salePercentage, setSalePercentage] = useState(0);
	const [appliedCoupon, setAppliedCoupon] = useState("");

	useEffect(() => {
		fetchCart();
		// console.log('hi');
	}, []);

	// useEffect (() => {
	// 	console.log('useCart totalQuantity', totalQuantity);
	// 	// triggerTotalCartUpdate();
	// }, [totalQuantity]);

	const fetchCart = () => {
		apiFetch({ path: "/wc/store/cart" }) // Adjusted to an endpoint that returns full cart details
			.then((cart) => {
				const cartProducts = cart.items;
				setCartProducts(cartProducts);
				// Assuming the response includes totalItems and total price directly
				const totalQuantity = cart.items.reduce(
					(acc, item) => acc + item.quantity,
					0,
				);
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
			})
			.catch((err) => {
				console.error("Error fetching cart:", err);
				setError("Failed to fetch cart.");
				setIsLoading(false);
			});
	};

	const addToCart = (productId) => {
		setIsLoading(true);

		const itemData = {
			id: productId,
			quantity: 1,
		};

		apiFetch({
			path: "/wc/store/cart/add-item",
			method: "POST",
			data: itemData,
		})
			.then(() => {
				console.log(`Add to cart: ${productId}`);
			})
			.catch((error) => {
				console.error("Error incrementing item:", error);
				setError("Failed to increment item.");
				setIsLoading(false);
			})
			.finally(() => {
				fetchCart(); // Refresh the cart items to reflect the change
				triggerTotalCartUpdate();
				// console.log('addToCart finally');
			});
	};

	const remFromCart = (productId) => {
		setIsLoading(true);

		// Find the current item in the cart
		const item = cartProducts.find((item) => item.id === productId);
		if (!item) {
			// If item not found, exit early
			console.error("Item not found in cart:", productId);
			// setIsLoading(false);
			return;
		}

		if (item.quantity === 1) {
			// If the item's quantity is 1, remove it from the cart
			const itemData = {
				key: item.key,
			};

			apiFetch({
				path: "/wc/store/cart/remove-item",
				method: "POST",
				data: itemData,
			})
				.then(() => {
					console.log(`Remove from cart: ${productId}`);
					fetchCart(); // Refresh the cart items to reflect the change
					triggerTotalCartUpdate();
				})
				.catch((error) => {
					console.error("Error removing item:", error);
					setError("Failed to remove item.");
					setIsLoading(false);
				});
		} else {
			// If the item's quantity is greater than 1, decrement its quantity
			const itemData = {
				key: item.key,
				quantity: item.quantity - 1,
			};

			apiFetch({
				path: "/wc/store/cart/update-item",
				method: "POST",
				data: itemData,
			})
				.then(() => {
					console.log(`Decrease cart quantity: ${productId}`);
					fetchCart(); // Refresh the cart items to reflect the change
					triggerTotalCartUpdate();
				})
				.catch((error) => {
					console.error("Error decrementing item:", error);
					setError("Failed to decrement item.");
					setIsLoading(false);
				});
		}
	};

	const applyCoupon = (couponCode) => {
		console.log(`Applying coupon: ${couponCode}`);
		return apiFetch({
			path: "/wc/store/v1/cart/apply-coupon",
			method: "POST",
			data: { code: couponCode },
		})
			.then((response) => {
				console.log(`Coupon ${couponCode} applied.`);
				setAppliedCoupon(couponCode); // Update the applied coupon
				return response; // Return response for chaining
			})
			.catch((error) => {
				console.error(`Error applying coupon ${couponCode}:`, error);
				throw error; // Re-throw for catch chaining
			});
	};

	const removeCoupon = (couponCode) => {
		console.log(`Removing coupon: ${couponCode}`);
		return apiFetch({
			path: "/wc/store/v1/cart/remove-coupon",
			method: "POST",
			data: { code: couponCode },
		})
			.then((response) => {
				console.log(`Coupon ${couponCode} removed.`);
				setAppliedCoupon(""); // Clear the applied coupon
				return response; // Return response for chaining
			})
			.catch((error) => {
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
		error,
	};
}

/**
 * StepIndicator
 */

const StepIndicator = ({ data }) => {
	const totalCartUpdate = useStore((state) => state.totalCartUpdate);
	const { fetchCart, totalQuantity } = useCart();

	const steps = data.steps;
	const maxStepValue = steps[steps.length - 1]; // The last step is the maximum

	const progressPercentage = (totalQuantity / maxStepValue) * 100;

	useEffect(() => {
		fetchCart();
	}, [totalCartUpdate]);

	return (
		<>
			<div className="px-3 py-4 mt-3 bg-blue-500 rounded-lg">
				<div className="numbers-container">
					{steps.map((step) => {
						const leftPercentage = (step / maxStepValue) * 100; // Correct calculation for leftPercentage
						return (
							<div
								key={step}
								className="step-number"
								style={{
									left: `${leftPercentage - 2}%`,
								}}
							>
								{step}
							</div>
						);
					})}
				</div>
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
			</div>
		</>
	);
};

const jsonDataElement = document.querySelector(".total-cart-data");
const jsonData = JSON.parse(jsonDataElement.textContent || "{}");
ReactDOM.createRoot(document.querySelector("#root-step-indicator")).render(
	<StepIndicator data={jsonData} />,
);
