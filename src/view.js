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

/* eslint-disable no-console */
console.log("view.js");
/* eslint-enable no-console */

// import apiFetch from "@wordpress/api-fetch";

// const addToCart = async (productId, quantity = 1) => {
// 	try {
// 		const response = await apiFetch({
// 			path: `wc/store/cart/add-item`, // Adjust according to the correct Store API endpoint
// 			method: "POST",
// 			data: {
// 				id: productId,
// 				quantity,
// 			},
// 		});

// 		console.log("Product added to cart:", response);
// 		return response;
// 	} catch (error) {
// 		console.error("Error adding product to cart:", error);
// 		return null;
// 	}
// };

import {
	createRoot,
	render,
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from "@wordpress/element";

// EventContext.js
const EventContext = createContext();

const useEventContext = () => useContext(EventContext);

const EventContextProvider = ({ children }) => {
	const [listeners, setListeners] = useState({});

	const subscribeToEvent = useCallback((eventName, callback) => {
		setListeners((prev) => ({
			...prev,
			[eventName]: [...(prev[eventName] || []), callback],
		}));
	}, []);

	const emitEvent = useCallback(
		(eventName, data) => {
			listeners[eventName]?.forEach((callback) => callback(data));
		},
		[listeners],
	);

	return (
		<EventContext.Provider value={{ subscribeToEvent, emitEvent }}>
			{children}
		</EventContext.Provider>
	);
};

// CounterBoxComponent.js
const CounterBoxComponent = ({
	color,
	productId,
	counterValue,
	isActive,
	onActiveChange,
}) => {
	return (
		<div
			style={{
				padding: "10px",
				margin: "5px",
				border: isActive ? "2px solid blue" : "none",
				backgroundColor: color,
				color: "#ffffff",
			}}
		>
			<input
				style={{ cursor: "pointer" }}
				type="radio"
				name="counterGroup"
				checked={isActive}
				onChange={() => onActiveChange(productId)}
				id={`counter-${productId}`}
			/>
			<label htmlFor={`counter-${productId}`} style={{}}>
				{counterValue ? counterValue : ""}
			</label>
		</div>
	);
};

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
const App = () => {
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
			<div style={{ padding: "0 0 3em 0" }}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						borderRadius: "4px",
						alignItems: "center",
						height: "",
						background: "#0092FB",
						padding: "0.5em 1em 2em 1em",
					}}
				>
					<div style={{ margin: "10px 0", color: "#fff" }}>
						Buy more & save more
					</div>
					<ProgressBar
						totalCounterValue={totalValues.totalCounterValue}
					></ProgressBar>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-around",
						color: "#ffffff",
						background: "#0092FB",
						margin: "10px 0",
						padding: "0.5em",
						borderRadius: "4px",
					}}
				>
					<div>{totalValues.totalPrice.toFixed(2)}€</div>
					<div
						style={{
							background: "#ffffff",
							color: "#000000",
							padding: "0.2em",
							borderRadius: "4px",
						}}
					>
						-00% OFF
					</div>
					<div style={{ display: "flex", columnGap: "0.5em" }}>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								background: "#ffffff",
								color: "#000",
								borderRadius: "50%",
								width: "27px",
								height: "auto",
							}}
						>
							<span>{totalValues.totalCounterValue}</span>
						</div>
						<div>View Order</div>
					</div>
				</div>
				<div style={{ marginTop: "20px" }}></div>
				<div style={{ marginTop: "20px" }}></div>
				<div style={{ margin: "20px 0", textAlign: "center" }}>
					<img
						src={counters[activeCounterId].imageUrls}
						alt="Active Counter"
						style={{ maxWidth: "auto", maxHeight: "300px" }}
					/>
				</div>
				<div
					style={{
						display: "flex",
						margin: "10px 0",
						columnGap: "0.75em",
						alignItems: "flex-start",
					}}
				>
					<div
						style={{
							border: "1px",
							borderColor: "grey",
							borderStyle: "solid",
							padding: "0.5em",
						}}
					>
						{counters[activeCounterId].price}€
					</div>
					<div style={{ fontSize: "14px" }}>
						{counters[activeCounterId].productDescription}
					</div>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						margin: "10px 0 0 0",
					}}
				>
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
				<p
					style={{
						textAlign: "center",
						margin: "5px 0",
					}}
				>
					Select colour and quantity
				</p>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						background: "#d7d7d7",
						padding: "0.75em 1em",
						width: "200px",
						margin: "auto",
						borderRadius: "8px",
					}}
				>
					<button
						style={{ cursor: "pointer", height: "30px", width: "30px" }}
						onClick={handleDecrement}
					>
						-
					</button>
					<span style={{ margin: "0 10px" }}>
						{counters[activeCounterId].counterValue > 0
							? counters[activeCounterId].counterValue
							: ""}
					</span>
					<button
						style={{ cursor: "pointer", height: "30px", width: "30px" }}
						onClick={handleIncrement}
					>
						+
					</button>
				</div>
			</div>
		</EventContextProvider>
	);
};

// const container2 = document.querySelector("#app-1");
// render(<App />, container2);

// Define your component
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
					<img
						src={selectedImage}
						alt="Selected"						
					/>
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
