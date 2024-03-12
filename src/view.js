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
const CounterBoxComponent = ({ min, max, color, productId, isActive, onActiveChange }) => {
    const [counterValue, setCounterValue] = useState(0);
    const { emitEvent } = useEventContext();

    const handleIncrement = () => {
        if (isActive && counterValue < max) {
            setCounterValue((prev) => prev + 1);
            emitEvent('counterChanged', { productId, change: 1 });
        }
    };

    const handleDecrement = () => {
        if (isActive && counterValue > min) {
            setCounterValue((prev) => prev - 1);
            emitEvent('counterChanged', { productId, change: -1 });
        }
    };

    return (
        <div style={{ padding: '10px', margin: '5px', border: isActive ? '2px solid blue' : 'none' }}>
            <input 
                type="radio" 
                name="counterGroup" 
                checked={isActive} 
                onChange={() => onActiveChange(productId)} 
                id={`counter-${productId}`} 
            />
            <label htmlFor={`counter-${productId}`} style={{ backgroundColor: color }}>
                Counter {productId}: {counterValue}
            </label>
            <button onClick={handleDecrement}>-</button>
            <button onClick={handleIncrement}>+</button>
        </div>
    );
};

// App component
const App = () => {
	const [activeProductId, setActiveProductId] = useState("1");

    const handleActiveChange = (productId) => {
        setActiveProductId(productId);
    };

    return (
        <EventContextProvider>
            <div>
                <h1>Counter Group</h1>
                <CounterBoxComponent 
                    min={0} 
                    max={10} 
                    color="#e0e0e0" 
                    productId="1" 
                    isActive={activeProductId === "1"} 
                    onActiveChange={handleActiveChange} 
                />
                <CounterBoxComponent 
                    min={0} 
                    max={10} 
                    color="#f0f0f0" 
                    productId="2" 
                    isActive={activeProductId === "2"} 
                    onActiveChange={handleActiveChange} 
                />
                <CounterBoxComponent 
                    min={0} 
                    max={10} 
                    color="#f0f0f0" 
                    productId="3" 
                    isActive={activeProductId === "3"} 
                    onActiveChange={handleActiveChange} 
                />
                {/* Add more CounterBoxComponents as needed, ensuring to pass `isActive` and `onActiveChange` */}
            </div>
        </EventContextProvider>
    );
};

const container2 = document.querySelector("#app-1");
render(<App />, container2);