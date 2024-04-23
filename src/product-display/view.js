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

// console.log("view.js");

import {
	createRoot,
	render,
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from "@wordpress/element";
import useStore from "store";
import { Minus, Plus, ShoppingCart } from "lucide-react";

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

function InfoBox({ selectedProductTitle, selectedProductPrice }) {
	const PriceComponent = ({ html }) => {
		return <span dangerouslySetInnerHTML={{ __html: html }} />;
	};
	return (
		<div className="flex items-center w-full mt-2 gap-x-4 h-14">
			<div className="text-xl basis-1/5">
				<PriceComponent html={selectedProductPrice} />
			</div>
			<div className="leading-snug basis-4/5">{selectedProductTitle}</div>
		</div>
	);
}

function TogglerBox({ products, onProductSelect, selectedProductId }) {
	return (
		<div className="flex gap-x-3">
			{products.map((product) => (
				<button
					className="w-11 h-11"
					key={product.id}
					onClick={() => onProductSelect(product.id)}
					style={{
						background: product.color,
						borderRadius: "50%",
						color: "white",
						margin: "1em 0",
						fontWeight: "bold",
						outline:
							product.id === selectedProductId ? "2px solid #3c82f6" : "none",
						outlineOffset: "3px",
					}}
				>
					{product.counterValue === 0 ? " " : product.counterValue}
				</button>
			))}
		</div>
	);
}

function AdjusterBox({ productId, initialValue, togglerValueChange }) {
	const {
		fetchCart,
		addToCart,
		remFromCart,
		totalQuantity,
		totalPrice,
		isLoading,
		error,
	} = useStore((state) => ({
		fetchCart: state.fetchCart,
		addToCart: state.addToCart,
		remFromCart: state.remFromCart,
		totalQuantity: state.totalQuantity,
		totalPrice: state.totalPrice,
		error: state.error,
		isLoading: state.isLoading,
	}));

	// const totalQuantity = useStore((state) => state.totalQuantity);
	// const totalPrice = useStore((state) => state.totalPrice);

	const [value, setValue] = useState(initialValue);
	// const { remFromCart } = useCart();

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		fetchCart();
	}, [value]);

	const throttledAddToCart = throttle((productId) => {
		window.myGlobalStore.getState().addToCart(productId);
		console.log("t");
	}, 10000); // Adjust time as needed

	const handleIncrement = () => {
		const newValue = value + 1;
		setValue(newValue);
		togglerValueChange(newValue);
		addToCart(productId);
		// console.log(isLoading);
		// throttledAddToCart(productId);
		// debounce(addToCart(productId), 1000);
		fetchCart();
	};

	const handleDecrement = () => {
		if (value > 0) {
			const newValue = value - 1;
			setValue(newValue);
			togglerValueChange(newValue);
			remFromCart(productId);
			// debounce(remFromCart(productId), 300);
			fetchCart();
		}
	};

	return (
		<>
			<div className="py-3 shadow-md rounded-md flex items-center justify-around w-44 font-bold bg-gray-300 [&>button]:bg-white [&>button]:rounded-full [&>button>svg]:m-auto [&>button]:h-8 [&>button]:w-8">
				<button onClick={handleDecrement} disabled={isLoading}>
					{/* {isLoading ? <Minus size={24} /> : <Minus size={24} />} */}
					<Minus size={20} strokeWidth={3} />
				</button>
				<span>{value}</span>
				<button onClick={handleIncrement} disabled={isLoading}>
					{/* {isLoading ? <Plus size={24} /> : <Plus size={24} />} */}
					<Plus size={20} strokeWidth={3} />
				</button>
			</div>
		</>
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

	// Find the selected product to get its title
	const selectedProduct = products.find(
		(product) => product.id === selectedProductId,
	);

	const selectedProductTitle = selectedProduct ? selectedProduct.title : "";
	const selectedProductPrice = selectedProduct ? selectedProduct.price : "";

	return (
		<div
			className="mb-14 product-wrapper"
			style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<ProductGallery
				selectedProductId={selectedProductId}
				productsData={products}
			></ProductGallery>
			<InfoBox
				selectedProductId={selectedProductId}
				selectedProductTitle={selectedProductTitle}
				selectedProductPrice={selectedProductPrice}
			/>
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
