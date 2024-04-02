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
// import useStore from "your-store-path"; // Adjust the import path as needed
// import test from "./../test.js"; // Adjust the import path as needed

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
	}, []);

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
	};

	const handleDecrement = () => {
		if (value > 0) {
			const newValue = value - 1;
			setValue(newValue);
			togglerValueChange(newValue);
			remFromCart(productId);
		}
	};

	return (
		<div>
			<button
				style={{ padding: "0.5em 1em" }}
				onClick={handleDecrement}
				disabled={isLoading}
			>
				{isLoading ? "-" : "-"}
			</button>
			<span> {value} </span>
			<button
				style={{ padding: "0.5em 1em" }}
				onClick={handleIncrement}
				disabled={isLoading}
			>
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
