class ButtonInterface {
    constructor(wrapperId) {
        if (new.target === ButtonInterface) {
            throw new TypeError("Cannot construct ButtonInterface instances directly");
        }
        this.wrapperId = wrapperId;
    }

    initialize() {
        throw new Error("Method 'initialize()' must be implemented.");
    }
}

class CounterButtons extends ButtonInterface {
    initialize() {
        const wrapper = document.getElementById(this.wrapperId);
        if (!wrapper) {
            console.error(`Wrapper with ID ${this.wrapperId} not found`);
            return;
        }

        // Create '-' button
        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        wrapper.appendChild(minusButton);

        // Create '+' button
        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        wrapper.appendChild(plusButton);

        // Add any additional initialization or event listeners here
    }
}