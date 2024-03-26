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
 * useStore
 */

const useStore = create((set) => ({
	totalCartUpdate: 0, // A simple counter to track cart updates
	triggerTotalCartUpdate: () =>
		set((state) => ({ totalCartUpdate: state.totalCartUpdate + 1 })),
}));

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
 * TotalCart
 */

function TotalCart() {
	const totalCartUpdate = useStore((state) => state.totalCartUpdate);

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
		error,
	} = useCart();

	const [steps, setSteps] = useState([3, 5, 7, 9]); // Example steps
	const [currentStep, setCurrentStep] = useState(null);

	useEffect(() => {
		fetchCart();
		determineCurrentStep();
		// console.log('mount', totalCartUpdate);
		// console.log('mount totalQuantity', totalQuantity);
	}, [totalQuantity]);

	useEffect(() => {
		fetchCart();
		// console.log('totalCartUpdate totalCartUpdate', totalCartUpdate);
		// console.log('totalCartUpdate totalQuantity', totalQuantity);
	}, [totalCartUpdate]);

	// useEffect(() => {
	// 	determineCurrentStep();
	// }, [totalItems]); // Re-run when totalItems or steps array changes

	const determineCurrentStep = () => {
		let foundStep = null;
		// Iterate over steps to find the highest step not exceeding totalItems
		for (let step of steps) {
			if (totalQuantity >= step) {
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
			removeCoupon(appliedCoupon);
			setCurrentStep(null);
			fetchCart();
			return;
		}

		const newCouponCode = stepIndex ? `coupon-step-${stepIndex}` : null;

		if (stepIndex !== currentStep) {
			setCurrentStep(stepIndex);
			console.log(
				`Current step: ${stepIndex} for total items: ${totalQuantity}`,
			);

			// Chain removal and application of coupons only if there's a valid step
			if (newCouponCode && appliedCoupon !== newCouponCode) {
				const couponOperation = appliedCoupon
					? removeCoupon(appliedCoupon).then(() => applyCoupon(newCouponCode))
					: applyCoupon(newCouponCode);

				couponOperation
					.then(() => {
						console.log("Coupon operation completed.");
						fetchCart();
					})
					.catch((error) => {
						console.error("Coupon operation failed:", error);
					});
			}
		}
	};

	if (isLoading) return <div>Loading cart items...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div
			style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<div>Total items: {totalQuantity}</div>
			<div>
				<span
					style={{
						padding: "0.25em",
						borderStyle: "solid",
						borderColor: currentStep !== null ? "fuchsia" : "grey",
						width: "70px",
						textAlign: "center",
						display: "inline-block",
					}}
				>
					{" "}
					{totalSalePrice} €
				</span>{" "}
				{currentStep !== null && (
					<span
						style={{
							backgroundColor: "grey",
							padding: "0.5em",
							color: "white",
						}}
					>
						{totalPrice} €
					</span>
				)}{" "}
			</div>
			<div>Discount step: {currentStep}</div>
			{console.log("return", totalQuantity)}
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
						padding: "0.5em 1em",
						margin: "1em 0",
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
	const triggerTotalCartUpdate = useStore(
		(state) => state.triggerTotalCartUpdate,
	);

	const [value, setValue] = useState(initialValue);
	const { fetchCart, addToCart, remFromCart, isLoading, error } = useCart();

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
		addToCart(productId);
		// fetchCart();
		// triggerTotalCartUpdate();
	};

	const handleDecrement = () => {
		if (value > 0) {
			const newValue = value - 1;
			setValue(newValue);
			togglerValueChange(newValue);
			remFromCart(productId);
			// fetchCart();
			// triggerTotalCartUpdate();
		}
	};

	return (
		<div>
			<button style={{padding: "0.5em 1em"}} onClick={handleDecrement} disabled={isLoading}>
				{isLoading ? "-" : "-"}
			</button>
			<span> {value} </span>
			<button style={{padding: "0.5em 1em"}} onClick={handleIncrement} disabled={isLoading}>
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
		<div
			className="product-wrapper"
			style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
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
		// console.log("Mount data", jsonData);
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
