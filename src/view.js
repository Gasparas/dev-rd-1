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

/**
 *
 */

const CartItems = () => {
	const [cartItems, setCartItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchCartItems = () => {
		setIsLoading(true);
		setError(null);

		apiFetch({ path: "/wc/store/cart/items" })
			.then((items) => {
				setCartItems(items);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching cart items:", error);
				setError("Failed to fetch cart items.");
				setIsLoading(false);
			});
	};

	const incrementItem = (productId) => {
		setIsLoading(true);

		// Assuming the quantity to add is always 1 for simplicity
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
				fetchCartItems(); // Refresh the cart items to reflect the change
			})
			.catch((error) => {
				console.error("Error incrementing item:", error);
				setError("Failed to increment item.");
				setIsLoading(false);
			});
	};

	const decrementItem = (itemKey) => {
		setIsLoading(true);

		// Find the current item in the cart
		const item = cartItems.find((item) => item.key === itemKey);
		if (!item) {
			// If item not found, exit early
			console.error("Item not found in cart:", itemKey);
			setIsLoading(false);
			return;
		}

		if (item.quantity === 1) {
			// If the item's quantity is 1, remove it from the cart
			const itemData = {
				key: itemKey,
			};

			apiFetch({
				path: "/wc/store/cart/remove-item",
				method: "POST",
				data: itemData,
			})
				.then(() => {
					fetchCartItems(); // Refresh the cart items to reflect the change
				})
				.catch((error) => {
					console.error("Error removing item:", error);
					setError("Failed to remove item.");
					setIsLoading(false);
				});
		} else {
			// If the item's quantity is greater than 1, decrement its quantity
			const itemData = {
				key: itemKey,
				quantity: item.quantity - 1,
			};

			apiFetch({
				path: "/wc/store/cart/update-item",
				method: "POST",
				data: itemData,
			})
				.then(() => {
					fetchCartItems(); // Refresh the cart items to reflect the change
				})
				.catch((error) => {
					console.error("Error decrementing item:", error);
					setError("Failed to decrement item.");
					setIsLoading(false);
				});
		}
	};

	return (
		<div>
			<button onClick={fetchCartItems} disabled={isLoading}>
				{isLoading ? "Loading..." : "Fetch Cart Items"}
			</button>
			{error && <p>Error: {error}</p>}
			<ul>
				{cartItems.map((item) => (
					<li key={item.key}>
						{item.name} - Quantity: {item.quantity}
						<button onClick={() => incrementItem(item.id)}>+</button>
						<button onClick={() => decrementItem(item.key)}>-</button>
					</li>
				))}
			</ul>
		</div>
	);
};

const container = document.querySelector("#root-one");
ReactDOM.createRoot(container).render(<CartItems />);

/**
 *
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

function ProductInfoBox({ selectedProductId }) {
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

function AdjusterBox({ initialValue, onValueChange }) {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	const handleIncrement = async () => {
		const newValue = value + 1;
		setValue(newValue);
		onValueChange(newValue);
	};

	const handleDecrement = async () => {
		if (value > 0) {
			const newValue = value - 1;
			setValue(newValue);
			onValueChange(newValue);
		}
	};

	return (
		<div>
			<button onClick={handleDecrement}>-</button>
			<span> {value} </span>
			<button onClick={handleIncrement}>+</button>
		</div>
	);
}

function ProductDisplay({ data }) {
	const [products, setProducts] = useState([]);
	const [selectedProductId, setSelectedProductId] = useState("");
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

	const handleCounterChange = (newValue) => {
		// Update the counterValue for the selected product
		const updatedProducts = products.map((product) =>
			product.id === selectedProductId
				? { ...product, counterValue: newValue }
				: product,
		);
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
			<ProductInfoBox selectedProductId={selectedProductId} />
			<TogglerBox
				products={products}
				onProductSelect={handleProductSelect}
				selectedProductId={selectedProductId}
			/>
			<AdjusterBox
				productId={selectedProductId}
				initialValue={counterValue}
				onValueChange={handleCounterChange}
			/>
		</div>
	);
}

document.querySelectorAll(".react-container").forEach((container) => {
	const jsonDataElement = container.querySelector(".product-data");
	if (jsonDataElement) {
		const jsonData = JSON.parse(jsonDataElement.textContent || "[]");
		ReactDOM.createRoot(container).render(<ProductDisplay data={jsonData} />);
	}
});

/**
 *  WooCommerce API
 */

export const addToCart = async (productId) => {
	try {
		const response = await apiFetch({
			path: `wc/store/cart/add-item`,
			method: "POST",
			data: {
				id: productId,
				quantity: 1,
			},
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
		const cartContents = await apiFetch({
			path: "/wc/store/cart",
			method: "GET",
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

export const removeProductFromCart_AJAX = (productId, quantity) => {
	console.log(`Removing product ${productId} from the cart`);
	jQuery.ajax({
		url: ajaxurl,
		method: "POST",
		data: {
			action: "remove_from_cart_request",
			product_id: productId,
			quantity: quantity,
		},
		success: function (data) {
			console.log(data);
		},
		error: function (errorThrown) {
			window.alert(errorThrown);
		},
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
