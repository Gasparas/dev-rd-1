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
				type="radio"
				name="counterGroup"
				checked={isActive}
				onChange={() => onActiveChange(productId)}
				id={`counter-${productId}`}
			/>
			<label htmlFor={`counter-${productId}`} style={{}}>
				{counterValue}
			</label>
		</div>
	);
};

// App component
const App = () => {
	const initialCounters = {
		1: {
			min: 0,
			max: 10,
			color: "#dac7c1",
			counterValue: 0,
			imageUrl: "https://shop-royaldenta-lt-staging.local/wp-content/uploads/2024/03/61pcyODhE4L._AC_SX679_.jpg",
			productDescription:
				"Silver infused Extra Soft Toothbrush for Adults - Dual Length Bristles for Interdental Cleaning.",
			price: 10.99,
		},
		2: {
			min: 0,
			max: 10,
			color: "#f29891",
			counterValue: 0,
			imageUrl: "https://shop-royaldenta-lt-staging.local/wp-content/uploads/2024/03/61pWFSOfb-L._AC_SX679_.jpg",
			productDescription:
				"Silver infused Extra Soft Toothbrush for Adults - Dual Length Bristles for Interdental Cleaning.",
			price: 11.99,
		},
		3: {
			min: 0,
			max: 10,
			color: "#5467ac",
			counterValue: 0,
			imageUrl: "https://shop-royaldenta-lt-staging.local/wp-content/uploads/2024/03/61QN62tdqhL._AC_SX679_.jpg",
			productDescription:
				"Silver infused Extra Soft Toothbrush for Adults - Dual Length Bristles for Interdental Cleaning.",
			price: 12.99,
		},
		4: {
			min: 0,
			max: 10,
			color: "#2b6486",
			counterValue: 0,
			imageUrl: "https://shop-royaldenta-lt-staging.local/wp-content/uploads/2024/03/613AaVICUCL._AC_SX679_.jpg",
			productDescription:
				"Silver infused Extra Soft Toothbrush for Adults - Dual Length Bristles for Interdental Cleaning.",
			price: 13.99,
		},
		// Add more counters as needed
	};

	const [counters, setCounters] = useState(initialCounters);
	const [activeCounterId, setActiveCounterId] = useState("1");

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
			<div style={{padding: "0 0 3em 0"}}>
				<div style={{ margin: "20px 0", textAlign: "center" }}>
					<img
						src={counters[activeCounterId].imageUrl}
						alt="Active Counter"
						style={{ maxWidth: "auto", maxHeight: "300px" }}
					/>
				</div>
				<div
					style={{
						display: "flex",
						margin: "20px 0",
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
					<div>{counters[activeCounterId].productDescription}</div>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						margin: "20px 0",
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
						margin: "0",
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
						width: "70%",
						margin: "auto",
						borderRadius: "8px",
					}}
				>
					<button onClick={handleDecrement}>-</button>
					<span style={{ margin: "0 10px" }}>
						{counters[activeCounterId].counterValue}
					</span>
					<button onClick={handleIncrement}>+</button>
				</div>
			</div>
		</EventContextProvider>
	);
};

const container2 = document.querySelector("#app-1");
render(<App />, container2);
