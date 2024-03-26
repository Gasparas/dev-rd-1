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
import { create } from "zustand";

/**
 * useCart
 */

function useCart(productId) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const [cartProducts, setCartProducts] = useState([]);

	const [totalQuantity, setTotalQuantity] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		fetchCart();
	}, []);

	// const fetchCart = () => {
	// 	setIsLoading(true);
	// 	setError(null);

	// 	apiFetch({ path: "/wc/store/cart/items" })
	// 		.then((items) => {
	// 			setCartProducts(items);
	// 			setIsLoading(false);
	// 		})
	// 		.catch((error) => {
	// 			console.error("Error fetching cart items:", error);
	// 			setError("Failed to fetch cart items.");
	// 			setIsLoading(false);
	// 		});
	// };

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

				// Directly use the total price from the cart object
				const totalPrice = parseFloat(cart.totals.total_price) / 100;
				setTotalPrice(totalPrice);

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
				fetchCart(); // Refresh the cart items to reflect the change
				// triggerTotalItemsUpdate();
			})
			.catch((error) => {
				console.error("Error incrementing item:", error);
				setError("Failed to increment item.");
				setIsLoading(false);
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
					fetchCart(); // Refresh the cart items to reflect the change
					console.log(`Remove from cart: ${productId}`);
					// triggerTotalItemsUpdate();
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
					fetchCart(); // Refresh the cart items to reflect the change
					console.log(`Decrease cart quantity: ${productId}`);
					// triggerTotalItemsUpdate();
				})
				.catch((error) => {
					console.error("Error decrementing item:", error);
					setError("Failed to decrement item.");
					setIsLoading(false);
				});
		}
	};

	return { fetchCart, addToCart, remFromCart, isLoading, error, totalPrice, totalQuantity };
}

/**
 * TotalCart
 */

const useStore = create((set) => ({
	totalItemsUpdate: 0, // A simple counter to track cart updates
	triggerTotalItemsUpdate: () =>
		set((state) => ({ totalItemsUpdate: state.totalItemsUpdate + 1 })),
}));

function TotalCart() {
	const totalItemsUpdate = useStore((state) => state.totalItemsUpdate);

	const {fetchCart,  isLoading, error, totalQuantity, totalPrice } = useCart();

	// const [totalItems, setTotalItems] = useState(0);
	// const [totalPrice, setTotalPrice] = useState(0);
	// const [isLoading, setIsLoading] = useState(true);
	// const [error, setError] = useState(null);

	const [steps, setSteps] = useState([2, 4, 6]); // Example steps
	const [currentStep, setCurrentStep] = useState(null);
	const [appliedCoupon, setAppliedCoupon] = useState("");

	// const [couponApplied, setCouponApplied] = useState(false);

	useEffect(() => {
		// determineCurrentStep();
		fetchCart();
	}, [totalItemsUpdate]);

	useEffect(() => {
		fetchCart();
	}, []);

	// useEffect(() => {
	// 	determineCurrentStep();
	// }, [totalItems]); // Re-run when totalItems or steps array changes

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

	const determineCurrentStep = () => {
		let foundStep = null;
		// Iterate over steps to find the highest step not exceeding totalItems
		for (let step of steps) {
			if (totalItems >= step) {
				foundStep = step;
			} else {
				break; // Break early as steps are sorted
			}
		}

		// Determine the step index if a step was found; otherwise, handle stepIndex as null
		const stepIndex = foundStep !== null ? steps.indexOf(foundStep) + 1 : null;

		// Check if we are moving down to step 0 and need to remove any existing coupon
		if (stepIndex === null && appliedCoupon) {
			console.log(
				`Removing coupon, as moving to step 0 from step: ${currentStep}`,
			);
			removeCoupon(appliedCoupon)
				.then(() => {
					setAppliedCoupon("");
					console.log("Coupon removed as we are at step 0.");
				})
				.catch((error) => {
					console.error("Error removing coupon:", error);
				});
			setCurrentStep(null);
			return;
		}

		const newCouponCode = stepIndex ? `coupon-step-${stepIndex}` : null;

		if (stepIndex !== currentStep) {
			setCurrentStep(stepIndex);
			console.log(`Current step: ${stepIndex} for total items: ${totalItems}`);

			// Chain removal and application of coupons only if there's a valid step
			if (newCouponCode && appliedCoupon !== newCouponCode) {
				const couponOperation = appliedCoupon
					? removeCoupon(appliedCoupon).then(() => applyCoupon(newCouponCode))
					: applyCoupon(newCouponCode);

				couponOperation
					.then(() => {
						console.log("Coupon operation completed.");
					})
					.catch((error) => {
						console.error("Coupon operation failed:", error);
					});
			}
		}
	};

	// const fetchCart = () => {
	// 	apiFetch({ path: "/wc/store/cart" }) // Adjusted to an endpoint that returns full cart details
	// 		.then((cart) => {
	// 			// Assuming the response includes totalItems and total price directly
	// 			const totalQuantity = cart.items.reduce(
	// 				(acc, item) => acc + item.quantity,
	// 				0,
	// 			);
	// 			setTotalItems(totalQuantity);

	// 			// Directly use the total price from the cart object
	// 			const totalPrice = parseFloat(cart.totals.total_price) / 100;
	// 			setTotalPrice(totalPrice);

	// 			setIsLoading(false);
	// 		})
	// 		.catch((err) => {
	// 			console.error("Error fetching cart:", err);
	// 			setError("Failed to fetch cart.");
	// 			setIsLoading(false);
	// 		});
	// };

	if (isLoading) return <div>Loading cart items...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			<div>{totalQuantity}</div>
			<div>{totalPrice.toFixed(2)} €</div>
			<div>Discount step: {currentStep}</div>
		</div>
	);
}

const tempContainer = document.querySelector("#root-temp");
ReactDOM.createRoot(tempContainer).render(<TotalCart />);

/**
 * ProductDisplay
 */

function ProductGallery({ selectedProductId, productsData }) {
	const selectedProductData = productsData.find(
		(product) => product.id === selectedProductId,
	);

	// Initialize selectedImage with the first image of the selected product or a default value
	const [selectedImage, setSelectedImage] = useState(
		selectedProductData?.imageUrls[0] || "",
	);

	useEffect(() => {
		// Update selectedImage when selectedProductId changes
		setSelectedImage(selectedProductData?.imageUrls[0] || "");
	}, [selectedProductId, selectedProductData]);

	if (!selectedProductData) return <div>No product selected</div>; // Or any other fallback UI

	return (
		<div className="image-viewer-wrapper">
			{/* <div className="thumbnails-wrapper">
				{selectedProductData.imageUrls.map((url, index) => (
					<img
						key={index}
						src={url}
						alt={`Thumbnail ${index}`}
						className={selectedImage === url ? "selected-thumbnail" : ""}
						onClick={() => setSelectedImage(url)} // Click to change the image
						onMouseEnter={() => setSelectedImage(url)} // Hover to change the image
					/>
				))}
			</div> */}
			<div className="full-size-wrapper">
				<img src={selectedImage} alt="Selected" />
			</div>
		</div>
	);
}

function InfoBox({ selectedProductId }) {
	return <div>Selected Product ID: {selectedProductId}</div>;
}

function TogglerBox({ products, onProductSelect, selectedProductId }) {
	return (
		<div>
			{products.map((product) => (
				<button
					key={product.id}
					onClick={() => onProductSelect(product.id)}
					style={{
						fontWeight: product.id === selectedProductId ? "bold" : "normal",
					}}
				>
					{product.counterValue}
				</button>
			))}
		</div>
	);
}

function AdjusterBox({ productId, initialValue, togglerValueChange }) {
	const triggerTotalItemsUpdate = useStore(
		(state) => state.triggerTotalItemsUpdate,
	);

	const [value, setValue] = useState(initialValue);
	const { isLoading, error, addToCart, remFromCart } = useCart();

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		// apiFetchCartItems();
	}, []);

	const handleIncrement = () => {
		const newValue = value + 1;
		setValue(newValue);
		togglerValueChange(newValue);
		// apiAddToCart(productId);
		addToCart(productId);
	};

	const handleDecrement = () => {
		if (value > 0) {
			const newValue = value - 1;
			setValue(newValue);
			togglerValueChange(newValue);
			// apiRemoveFromCart(productId);
			remFromCart(productId);
		}
	};

	return (
		<div>
			<button onClick={handleDecrement} disabled={isLoading}>
				{isLoading ? "-" : "-"}
			</button>
			<span> {value} </span>
			<button onClick={handleIncrement} disabled={isLoading}>
				{isLoading ? "+" : "+"}
			</button>
		</div>
	);
}

function ProductDisplay({ data }) {
	const [products, setProducts] = useState([]);
	const [selectedProductId, setSelectedProductId] = useState(null);
	const [counterValue, setCounterValue] = useState(0);

	useEffect(() => {
		const selectedProduct = products.find(
			(product) => product.id === selectedProductId,
		);
		setCounterValue(selectedProduct ? selectedProduct.counterValue : 0);
	}, [products, selectedProductId]);

	useEffect(() => {
		setProducts(data); // Directly use the data prop which is now an array
		if (data.length > 0) {
			// Set the first product's ID as selected by default
			setSelectedProductId(data[0].id);
		}
	}, [data]);

	const togglerValueChange = (newValue) => {
		// Update the counterValue for the selected product
		const updatedProducts = products.map((product) =>
			product.id === selectedProductId
				? { ...product, counterValue: newValue }
				: product,
		);
		// console.log(updatedProducts);
		setProducts(updatedProducts);
	};

	const handleProductSelect = (id) => {
		setSelectedProductId(id);
	};

	return (
		<div>
			<ProductGallery
				selectedProductId={selectedProductId}
				productsData={products}
			></ProductGallery>
			<InfoBox selectedProductId={selectedProductId} />
			<TogglerBox
				products={products}
				onProductSelect={handleProductSelect}
				selectedProductId={selectedProductId}
			/>
			<AdjusterBox
				productId={selectedProductId}
				initialValue={counterValue}
				togglerValueChange={togglerValueChange}
			/>
		</div>
	);
}

document.querySelectorAll(".react-container").forEach((container) => {
	const jsonDataElement = container.querySelector(".product-data");
	if (jsonDataElement) {
		const jsonData = JSON.parse(jsonDataElement.textContent || "[]");
		console.log("Mount data", jsonData);
		ReactDOM.createRoot(container).render(<ProductDisplay data={jsonData} />);
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
