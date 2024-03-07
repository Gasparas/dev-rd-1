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
console.log('Hello World! (from create-block-rd-shop-product block)');
/* eslint-enable no-console */
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
            eventListeners.forEach(callback => callback(data));
        }
    }
}
const eventDispatcher = new EventDispatcher();

class CounterBox {
    constructor(displayElement, initialValue = 0, min = 0, max = 20) {
        this.counterValue = initialValue;
        this.min = min;
        this.max = max;
        this.displayElement = displayElement;
        this.isActive = false;
        this.updateDisplay();
    }

    setActive(state) {
        this.isActive = state;
        console.log(this.displayElement, state);
    }

    increment() {
        if (this.isActive && this.counterValue < this.max) {
            this.counterValue++;
            this.updateDisplay();
            eventDispatcher.emit('counterUpdated', 1);
        }
    }

    decrement() {
        if (this.isActive && this.counterValue > this.min) {
            this.counterValue--;
            this.updateDisplay();
            eventDispatcher.emit('counterUpdated', -1);
        }
    }

    updateDisplay() {
        // this.displayElement.textContent = `${this.counterValue}`;
        this.displayElement.textContent = this.counterValue > 0 ? this.counterValue : '';
    }
}

class Button {
    constructor(buttonType, counterBox) {
        this.buttonType = buttonType;
        this.counterBox = counterBox;
        this.element = this.createButton();
        this.addClickListener();
    }

    createButton() {
        const button = document.createElement('button');
        button.textContent = this.buttonType === 'plus' ? '+' : '-';
        return button;
    }

    addClickListener() {
        this.element.addEventListener('click', () => this.onClick());
    }

    onClick() {
        if (this.buttonType === 'plus') {
            this.counterBox.increment();
        } else if (this.buttonType === 'minus') {
            this.counterBox.decrement();
        }
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
        const globalCounterDisplay = document.createElement('div');
        globalCounterDisplay.id = 'globalCounter'; // Adding an ID for styling or querying
        wrapper.appendChild(globalCounterDisplay);
        GlobalCounterBox.displayElement = globalCounterDisplay;
        GlobalCounterBox.updateDisplay();

        // Subscribe to counter updates
        eventDispatcher.subscribe('counterUpdated', (change) => {
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
    constructor() {
        this.activeCounter = null;
        this.counters = [];
    }

    registerCounter(counter) {
        this.counters.push(counter);
    }

    setActiveCounter(activeCounter) {
        if (this.activeCounter) {
            this.activeCounter.setActive(false);
        }
        this.activeCounter = activeCounter;
        this.activeCounter.setActive(true);
    }
}


class CounterInstance {
    constructor(controller, wrapperId, instanceId, counterValue = 0, counterRange = { min: 0, max: 20 }) {
        this.controller = controller;
        this.wrapperId = wrapperId;
        this.instanceId = instanceId;
        const parent = document.getElementById(wrapperId);
        if (!parent) {
            console.error('Parent not found');
            return;
        }

        const radioContainer = document.createElement('div');
        radioContainer.className = 'radio-container';
        parent.appendChild(radioContainer);

        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.id = `${wrapperId}-radio-${instanceId}`;
        radioButton.name = `number-${wrapperId}`;
        radioButton.className = 'radio-button';
        radioButton.checked = instanceId === 0;
        radioContainer.appendChild(radioButton);

        const label = document.createElement('label');
        label.setAttribute('for', `${wrapperId}-radio-${instanceId}`);
        label.className = 'radio-label';
        radioContainer.appendChild(label);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        radioContainer.appendChild(buttonContainer);

        const displayElement = label;

        this.counterBox = new CounterBox(displayElement, counterValue, counterRange.min, counterRange.max);
        this.radioButton = document.createElement('input');

        // const minusButton = new Button('minus', counterBox);
        // buttonContainer.appendChild(minusButton.element);

        // const plusButton = new Button('plus', counterBox);
        // buttonContainer.appendChild(plusButton.element);

        // Event listener that might trigger setActive
        radioButton.addEventListener('change', () => {
            if (radioButton.checked) {
                this.controller.setActiveCounter(this);
            }
        });
    }

    setActive(isActive) {
        this.counterBox.setActive(isActive);
        if (isActive) {
            // Additional logic when this counter becomes active
            // console.log(this.counterBox, 'is active');
        }
    }
}


// Example usage: Creating a new counter instance within the 'app' parent element
const controllerA = new Controller();
const controllerB = new Controller();

new CounterInstance(controllerA, 'app_0', 0, 0, { min: 0, max: 3 });
new CounterInstance(controllerA, 'app_0', 1, 0, { min: 0, max: 4 });
new CounterInstance(controllerA, 'app_0', 2, 0, { min: 0, max: 4 });
new CounterInstance(controllerA, 'app_0', 3, 0, { min: 0, max: 4 });

new CounterInstance(controllerB, 'app_1', 0, 0, { min: 0, max: 3 });
new CounterInstance(controllerB, 'app_1', 1, 0, { min: 0, max: 4 });

GlobalCounterBox.initialize('globalCounterWrapper');