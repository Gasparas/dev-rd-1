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
import useStore from "store";

/**
 * StepIndicator
 */

function transformArray(arr) {
	const lastElement = arr[arr.length - 1] + arr[0];
	return [0, ...arr, lastElement];
}

const StepIndicator = ({ data }) => {
	const {
		fetchCart,
		addToCart,
		remFromCart,
		totalQuantity,
		totalPrice,
		totalSalePrice,
		isLoading,
		error,
	} = useStore((state) => ({
		fetchCart: state.fetchCart,
		addToCart: state.addToCart,
		remFromCart: state.remFromCart,
		totalQuantity: state.totalQuantity,
		totalPrice: state.totalPrice,
		totalSalePrice: state.totalSalePrice,
		error: state.error,
		isLoading: state.isLoading,
	}));

	const [currentStep, setCurrentStep] = useState(0);
	const [appliedCoupon, setAppliedCoupon] = useState("");

	const priceSave = (totalPrice - totalSalePrice).toFixed(2);
	const steps = transformArray(data.steps);
	const percs = data.percs;
	const maxStepValue = steps[steps.length - 1]; // The last step is the maximum

	const progressPercentage = (totalQuantity / maxStepValue) * 100;

	useEffect(() => {
		determineCurrentStep();
	}, [totalQuantity]);

	const determineCurrentStep = () => {
		let foundStep = 0;
		// Iterate over steps to find the highest step not exceeding totalItems
		for (let step of steps) {
			if (totalQuantity >= step) {
				foundStep = step;
			} else {
				break; // Break early as steps are sorted
			}
		}

		// Determine the step index if a step was found; otherwise, handle stepIndex as null
		const stepIndex = foundStep !== 0 ? steps.indexOf(foundStep) : 0;

		// Check if we are moving down to step 0 and need to remove any existing coupon
		if (stepIndex === 0 && appliedCoupon) {
			console.log(
				`Removing coupon, as moving to step 0 from step: ${currentStep}`,
			);
			removeCoupon(appliedCoupon);
			setCurrentStep(0);
			// setBeforeNextStep(0);
			// fetchCart();
			return;
		}

		const newCouponCode = stepIndex ? `coupon-step-${stepIndex}` : 0;

		if (stepIndex !== currentStep) {
			setCurrentStep(stepIndex);
			// setBeforeNextStep(1);
			console.log(
				`Current step: ${stepIndex} for total items: ${totalQuantity}`,
			);

			// Chain removal and application of coupons only if there's a valid step
			if (newCouponCode && appliedCoupon !== newCouponCode) {
				const couponOperation = appliedCoupon
					? removeCoupon(appliedCoupon).then(() => applyCoupon(newCouponCode))
					: applyCoupon(newCouponCode);

				couponOperation
					.then(() => {
						console.log("Coupon operation completed.");
						fetchCart();
					})
					.catch((error) => {
						console.error("Coupon operation failed:", error);
					});
			}
		}
	};

	const applyCoupon = async (couponCode) => {
		console.log(`Applying coupon: ${couponCode}`);
		try {
			const response = await apiFetch({
				path: "/wc/store/v1/cart/apply-coupon",
				method: "POST",
				data: { code: couponCode },
			});
			console.log(`Coupon ${couponCode} applied.`);
			setAppliedCoupon(couponCode); // Update component state
			// Clear any existing error
			setError("");
			return response; // Return response for potential chaining
		} catch (error) {
			console.error(`Error applying coupon ${couponCode}:`, error);
			setError(`Failed to apply coupon ${couponCode}.`); // Update component state with error
			throw error; // Re-throw to allow catch chaining elsewhere
		}
	};

	const removeCoupon = async (couponCode) => {
		console.log(`Removing coupon: ${couponCode}`);
		try {
			const response = await apiFetch({
				path: "/wc/store/v1/cart/remove-coupon",
				method: "POST",
				data: { code: couponCode },
			});
			console.log(`Coupon ${couponCode} removed.`);
			setAppliedCoupon(""); // Clear the applied coupon from state
			// Clear any existing error
			setError("");
			return response; // Return response for potential chaining
		} catch (error) {
			console.error(`Error removing coupon ${couponCode}:`, error);
			setError(`Failed to remove coupon ${couponCode}.`); // Update component state with error
			throw error; // Re-throw to allow catch chaining elsewhere
		}
	};

	return (
		<>
			<div className="px-3 pt-1 pb-2 bg-blue-500 rounded-lg">
				<div className="mb-3 text-xs font-semibold tracking-wide text-center text-white">
					<span>{currentStep}</span> Items selected: {totalQuantity}
				</div>
				<div className="numbers-container">
					{steps
						.filter((_, index) => index !== 0 && index !== steps.length - 1) // Exclude first and last steps
						.map((step, index) => {
							const leftPercentage = (step / maxStepValue) * 100; // Correct calculation for leftPercentage
							return (
								<div
									key={index} // Changed to index for unique key, consider adding a prefix if needed
									className="step-number"
									style={{
										width: "20px",
										// background: "grey",
										textAlign: "center",
										marginLeft: "-4px",
										left: `${leftPercentage - 2}%`,
									}}
								>
									{step}
								</div>
							);
						})}
				</div>
				<div className="progress-container">
					<div
						className="progress-bar"
						style={{ width: `${progressPercentage}%` }}
					></div>
					{steps
						.filter((_, index) => index !== 0 && index !== steps.length - 1) // Exclude first and last steps
						.map((step) => {
							const leftPercentage = (step / maxStepValue) * 100; // Left percentage calculation remains the same
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
				<div className="mt-2.5 numbers-container">
					{steps
						.filter((_, index) => index !== 0 && index !== steps.length - 1) // Exclude first and last steps
						.map((step, index) => {
							const leftPercentage = (step / maxStepValue) * 100; // Correct calculation for leftPercentage
							return (
								<div
									key={index} // Changed to index for unique key, consider adding a prefix if needed
									className="step-number"
									style={{
										width: "36px",
										textAlign: "center",
										marginLeft: "-4px",
										left: `${leftPercentage - 4}%`,
									}}
								>
									{percs[index]}
								</div>
							);
						})}
				</div>
				<div>
					<div className="flex items-center w-full pt-2 font-medium text-white bg-blue-500 rounded-lg justify-evenly">
						<div>
							<span className="text-sm font-light text-gray-100">
								Total:&nbsp;
							</span>
							<span
								className={
									`strikethrough-diagonal font-light text-sm text-gray-100 `
									// ${currentStep != 0 ? "opacity-100" : "opacity-0"}
								}
							>
								{totalPrice}€
							</span>
							<span className="ml-2">{totalSalePrice}€</span>
						</div>
						<div>
							<span className="text-sm font-light text-gray-100">
								You save:&nbsp;
							</span>
							<span className="">{priceSave}€</span>
						</div>
					</div>
					{/* <div
							className={`bg-white text-gray-700 rounded-lg px-2 ${
								currentStep != 0 ? "opacity-100" : "opacity-0"
							}`}
						> */}
					{/* -{percanteges[currentStep - 1]}% OFF */}
					{/* </div> */}
				</div>
			</div>
		</>
	);
};

const jsonDataElement = document.querySelector(".total-cart-data");
const jsonData = JSON.parse(jsonDataElement.textContent || "{}");
ReactDOM.createRoot(document.querySelector("#root-step-indicator")).render(
	<StepIndicator data={jsonData} />,
);
