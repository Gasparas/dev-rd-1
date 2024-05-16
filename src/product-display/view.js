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

import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from '@wordpress/url';
import {
	useState,
	useEffect
} from "@wordpress/element";
import useStore from "store";
import { Minus, Plus, ShoppingCart } from "lucide-react";

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

function AdjusterBox({product, isDisabled, onQuantityUpdate}){
	const {
		isLoading,
		fetchCart,
		addToCart,
		remFromCart
	} = useStore((store) => ({
		isLoading: store.isLoading,
		fetchCart: store.fetchCart,
		addToCart: store.addToCart,
		remFromCart: store.remFromCart,
	}));

	const [quantity, setQuantity] = useState(product.counterValue);

	useEffect(() => {
		if(quantity != product.counterValue) {
			setQuantity(product.counterValue)
		}
	}, [product.counterValue])

	useEffect(() => {
		if(!isLoading && quantity != product.counterValue) {
			onQuantityUpdate(quantity);
		}
	}, [isLoading])

	const handleIncrement = () => {
		setQuantity(quantity+1);
		addToCart(product.id);
	}

	const handleDecrement = () => {
		if(quantity > 0){
			setQuantity(quantity-1);
			remFromCart(product.id);
		}
	}

	return (
		<div className="py-3 shadow-md rounded-md flex items-center justify-around w-44 font-bold bg-gray-300 [&>button]:bg-white [&>button]:rounded-full [&>button>svg]:m-auto [&>button]:h-8 [&>button]:w-8">
			<button onClick={handleDecrement} disabled={isDisabled}>
				{/* {isLoading ? <Minus size={24} /> : <Minus size={24} />} */}
				<Minus size={20} strokeWidth={3} />
			</button>
			<span>{quantity}</span>
			<button onClick={handleIncrement} disabled={isDisabled}>
				{/* {isLoading ? <Plus size={24} /> : <Plus size={24} />} */}
				<Plus size={20} strokeWidth={3} />
			</button>
		</div>
	)
}

function ProductDisplay({ productsSkus }) {
	const [products, setProducts] = useState([]);
	const [selectedProductId, setSelectedProductId] = useState(null);
	const [productsResetInprogress, setProductsResetInprogress] = useState(false);

	const {
		isLoading,
		fetchCart,
		triggerUpdateProductDisplayPrices
	} = useStore((store) => ({
		isLoading: store.isLoading,
		fetchCart: store.fetchCart,
		triggerUpdateProductDisplayPrices: store.triggerUpdateProductDisplayPrices
	}));

	const resetProductsData = () => {
		setProductsResetInprogress(true);
		apiFetch({
			path: addQueryArgs('/rd-shop-product/v1/block-product-display-data', {
				skus: productsSkus
			}),
			method: 'GET'
		}).then( ( res ) => {
			if(res?.data){
				setProducts(res.data); // Directly use the data prop which is now an array
				if (res.data.length > 0 && !selectedProductId) {
					// Set the first product's ID as selected by default
					setSelectedProductId(res.data[0].id);
				}
			}
			setProductsResetInprogress(false);
		} );
	}

	useEffect(() => {
		fetchCart();
		resetProductsData();
	}, [productsSkus]);

	useEffect(() => {
		if(triggerUpdateProductDisplayPrices){
			resetProductsData();
		}
	}, [triggerUpdateProductDisplayPrices])

	useEffect(() => {
		const selectedProduct = products.find((p) => p.id === selectedProductId);
	}, [products, selectedProductId]);

	const handleProductSelect = (id) => {
		setSelectedProductId(id);
	};

	const selectedProduct = products.find((p) => p.id === selectedProductId,);
	const selectedProductTitle = selectedProduct ? selectedProduct.title : "";
	const selectedProductPrice = selectedProduct ? selectedProduct.price : "";
	if(!selectedProductId) return <div/>

	return (
		<div
			className="mb-14 product-wrapper"
			style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<ProductGallery
				selectedProductId={selectedProductId}
				productsData={products}
			/>
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
				product={selectedProduct}
				isDisabled={isLoading || productsResetInprogress}
				onQuantityUpdate={resetProductsData}
			/>
		</div>
	)
}

document.querySelectorAll(".react-container").forEach((container) => {
	const jsonProductsSkus = JSON.parse(container.dataset?.products_skus || "[]");
	ReactDOM.createRoot(container).render(<ProductDisplay productsSkus={jsonProductsSkus} />);
});
