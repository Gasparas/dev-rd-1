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

// App

class EventDispatcher {
	constructor() {
		this.listeners = {};
	}

	subscribe(eventName, callback) {
		if (!this.listeners[eventName]) {
			this.listeners[eventName] = [];
		}
		this.listeners[eventName].push(callback);
	}

	emit(eventName, data) {
		const eventListeners = this.listeners[eventName];
		if (eventListeners) {
			eventListeners.forEach((callback) => callback(data));
		}
	}
}
const eventDispatcher = new EventDispatcher();

class CounterBox {
	constructor(
		displayElement,
		initialValue = 0,
		min = 0,
		max = 20,
		color,
		productId,
	) {
		this.counterValue = initialValue;
		this.min = min;
		this.max = max;
		this.color = color;
		this.displayElement = displayElement;
		this.isActive = false;
		this.productId = productId;
		this.updateDisplay();
	}

	setActive(state) {
		this.isActive = state;
	}

	increment() {
		if (this.isActive && this.counterValue < this.max) {
			this.counterValue++;
			this.updateDisplay();
			eventDispatcher.emit("counterUpdated", 1);
			eventDispatcher.emit("addToCart", this.productId);
		}
	}

	decrement() {
		if (this.isActive && this.counterValue > this.min) {
			this.counterValue--;
			this.updateDisplay();
			eventDispatcher.emit("counterUpdated", -1);
			eventDispatcher.emit("removeFromCart", this.productId);
		}
	}

	updateDisplay() {
		// this.displayElement.textContent = `${this.counterValue}`;
		this.displayElement.textContent =
			this.counterValue > 0 ? this.counterValue : "";
	}
}

class GlobalCounterBox {
	static initialize(wrapperId) {
		GlobalCounterBox.globalCount = 0;

		// Find the wrapper element by its ID
		const wrapper = document.getElementById(wrapperId);
		if (!wrapper) {
			console.error(`Wrapper with ID ${wrapperId} not found`);
			return;
		}

		// Create and append the display element for the global counter within the wrapper
		const globalCounterDisplay = document.createElement("div");
		globalCounterDisplay.id = "globalCounter"; // Adding an ID for styling or querying
		wrapper.appendChild(globalCounterDisplay);
		GlobalCounterBox.displayElement = globalCounterDisplay;
		GlobalCounterBox.updateDisplay();

		// Subscribe to counter updates
		eventDispatcher.subscribe("counterUpdated", (change) => {
			GlobalCounterBox.globalCount += change;
			GlobalCounterBox.ensureGlobalCountWithinRange();
			GlobalCounterBox.updateDisplay();
		});
	}

	static ensureGlobalCountWithinRange() {
		if (GlobalCounterBox.globalCount < 0) {
			GlobalCounterBox.globalCount = 0;
		}
		// Uncomment if there's an upper limit for the global count
		// if (GlobalCounterBox.globalCount > maxGlobalCount) {
		//     GlobalCounterBox.globalCount = maxGlobalCount;
		// }
	}

	static updateDisplay() {
		if (GlobalCounterBox.displayElement) {
			GlobalCounterBox.displayElement.textContent = `Global: ${GlobalCounterBox.globalCount}`;
		}
	}
}

class Controller {
	constructor(wrapperId) {
		this.wrapperId = wrapperId;
		this.wrapper = document.getElementById(wrapperId);
		this.activeCounter = null;
		this.counters = [];
		this.initializeButtons();
	}

	registerCounter(counter) {
		this.counters.push(counter);
		// If this is the first counter, set it as active
		if (this.counters.length === 1) {
			this.setActiveCounter(counter);
		}
	}

	setActiveCounter(activeCounter) {
		if (this.activeCounter) {
			this.activeCounter.setActive(false);
		}
		this.activeCounter = activeCounter;
		this.activeCounter.setActive(true);
	}

	incrementActiveCounter() {
		if (
			this.activeCounter &&
			this.activeCounter.counterBox.isActive &&
			this.activeCounter.counterBox.counterValue <
				this.activeCounter.counterBox.max
		) {
			this.activeCounter.counterBox.increment();
			// WooCommerce integration
			addProductToCart(this.activeCounter.counterBox.productId, 1);
		}
	}

	decrementActiveCounter() {
		if (
			this.activeCounter &&
			this.activeCounter.counterBox.isActive &&
			this.activeCounter.counterBox.counterValue >
				this.activeCounter.counterBox.min
		) {
			this.activeCounter.counterBox.decrement();
			// WooCommerce integration
			removeProductFromCart(this.activeCounter.counterBox.productId, 1);
		}
	}

	initializeButtons() {
		const buttonsContainer = document.createElement("div");
		buttonsContainer.className = "controller-wrapper";

		const decrementButton = document.createElement("button");
		decrementButton.className = "controller-button";
		decrementButton.textContent = "-";
		decrementButton.addEventListener("click", () =>
			this.decrementActiveCounter(),
		);
		buttonsContainer.appendChild(decrementButton); // Add the decrement button to the container

		const incrementButton = document.createElement("button");
		incrementButton.className = "controller-button";
		incrementButton.textContent = "+";
		incrementButton.addEventListener("click", () =>
			this.incrementActiveCounter(),
		);
		buttonsContainer.appendChild(incrementButton); // Add the increment button to the container

		this.wrapper.appendChild(buttonsContainer); // Append the container to the wrapper
	}
}

class CounterInstance {
	constructor(
		controller,
		wrapperId,
		instanceId,
		counterValue = 0,
		counterRange = { min: 0, max: 20 },
		color,
		productId,
	) {
		this.controller = controller;
		this.wrapperId = wrapperId;
		this.instanceId = instanceId;
		this.productId = productId;
		const parent = document.getElementById(wrapperId);
		if (!parent) {
			console.error("Parent not found");
			return;
		}

		// Create or select the counters-wrapper
		let countersWrapper = parent.querySelector(".counters-wrapper");
		if (!countersWrapper) {
			countersWrapper = document.createElement("div");
			countersWrapper.className = "counters-wrapper";
			parent.appendChild(countersWrapper);
		}

		const radioContainer = document.createElement("div");
		radioContainer.className = "radio-container";
		countersWrapper.appendChild(radioContainer); // Append to countersWrapper instead of parent

		const radioButton = document.createElement("input");
		radioButton.type = "radio";
		radioButton.id = `${wrapperId}-radio-${instanceId}`;
		radioButton.name = `number-${wrapperId}`;
		radioButton.className = "radio-button";
		radioButton.checked = instanceId === 0;
		radioContainer.appendChild(radioButton);

		const label = document.createElement("label");
		label.setAttribute("for", `${wrapperId}-radio-${instanceId}`);
		label.className = "radio-label";
		label.style.backgroundColor = color;
		radioContainer.appendChild(label);

		const buttonContainer = document.createElement("div");
		buttonContainer.className = "button-container";
		radioContainer.appendChild(buttonContainer);

		const displayElement = label;

		this.counterBox = new CounterBox(
			displayElement,
			counterValue,
			counterRange.min,
			counterRange.max,
			color,
			productId,
		);

		// Event listener that might trigger setActive
		radioButton.addEventListener("change", () => {
			if (radioButton.checked) {
				this.controller.setActiveCounter(this);
			}
		});
	}

	setActive(isActive) {
		this.counterBox.setActive(isActive);
		if (isActive) {
			// Additional logic when this counter becomes active
		}
	}
}

// Initialise

GlobalCounterBox.initialize("globalCounterWrapper");

function initializeCounterInstances(controller, groupId, instances) {
	instances.forEach((instance) => {
		const counterInstance = new CounterInstance(
			controller,
			groupId,
			instance.id,
			instance.initialValue,
			instance.range,
			instance.color,
			instance.productId,
		);
		controller.registerCounter(counterInstance);

		// Automatically set the first counter box of each group as active
		if (instance.id === 0) {
			controller.setActiveCounter(counterInstance);
		}
	});
}

// Define counter configurations for each group
const groupAInstances = [
	{
		id: 0,
		initialValue: 0,
		range: { min: 0, max: 10 },
		color: "#2252b8",
		productId: "36",
	},
	{
		id: 1,
		initialValue: 0,
		range: { min: 0, max: 10 },
		color: "#af3e8d",
		productId: "38",
	},
	{
		id: 2,
		initialValue: 0,
		range: { min: 0, max: 10 },
		color: "#75a937",
		productId: "34",
	},
	{
		id: 3,
		initialValue: 0,
		range: { min: 0, max: 10 },
		color: "#e29a35",
		productId: "27",
	},
];

const groupBInstances = [
	{
		id: 0,
		initialValue: 0,
		range: { min: 0, max: 10 },
		color: "#af3e8d",
		productId: "23",
	},
	{
		id: 1,
		initialValue: 0,
		range: { min: 0, max: 10 },
		color: "#e29a35",
		productId: "20",
	},
	{
		id: 2,
		initialValue: 0,
		range: { min: 0, max: 10 },
		color: "#2252b8",
		productId: "21",
	},
];

// Initialize counter instances for group A
const controllerA = new Controller("group_a");
initializeCounterInstances(controllerA, "group_a", groupAInstances);

// Initialize counter instances for group B
const controllerB = new Controller("group_b");
initializeCounterInstances(controllerB, "group_b", groupBInstances);

// WooCommerce AJAX

function addProductToCart(productId, quantity) {
	console.log(`Adding product ${productId} to the cart`);
	jQuery.ajax({
		url: ajaxurl,
		method: "POST",
		data: {
			action: "add_to_cart_request",
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
}

function removeProductFromCart(productId, quantity) {
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
}

// @wordpress/api-fetch

import apiFetch from "@wordpress/api-fetch";

async function fetchCartData() {
    try {
        const cartData = await apiFetch({ path: '/wc/store/v1/cart?_locale=user' });
        return cartData;
    } catch (error) {
        console.error('Error fetching cart data:', error);
        return null;
    }
}

async function getItemQuantityById(itemId) {
	const cartData = await fetchCartData();
	if (cartData && cartData.items) {
		const item = cartData.items.find((item) => item.id === itemId);
		if (item) {
			return item.quantity;
		} else {
			console.log("Item not found in cart.");
			return 0; // or handle as appropriate
		}
	} else {
		console.log("No items in cart.");
		return 0; // or handle as appropriate
	}
}

getItemQuantityById(36).then((quantity) => {
	console.log(`Quantity of item 36:`, quantity);
});

// Importing from view-module.js
import { myVariable, myFunction } from "./view-module.js";

console.log(myVariable); 
myFunction(); 

// REACT App, @wordpress/element

// import { render } from "@wordpress/element";
// import domReady from "@wordpress/dom-ready";

// const App = () => <div>REACT</div>;
// domReady(function () {
//     console.log("dom ready");
//     const container = document.querySelector("#app");
//     // render(<App />, container);
// });
