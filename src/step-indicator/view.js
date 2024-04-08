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

	const steps = transformArray(data.steps);
	const maxStepValue = steps[steps.length - 1]; // The last step is the maximum

	const progressPercentage = (totalQuantity / maxStepValue) * 100;

	return (
		<>
			<div className="px-3 py-4 mt-3 bg-blue-500 rounded-lg">
				<div className="numbers-container">
					{steps
						.filter((_, index) => index !== 0 && index !== steps.length - 1) // Exclude first and last steps
						.map((step) => {
							const leftPercentage = (step / maxStepValue) * 100; // Correct calculation for leftPercentage
							return (
								<div
									key={step}
									className="step-number"
									style={{
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
			</div>
		</>
	);
};

const jsonDataElement = document.querySelector(".total-cart-data");
const jsonData = JSON.parse(jsonDataElement.textContent || "{}");
ReactDOM.createRoot(document.querySelector("#root-step-indicator")).render(
	<StepIndicator data={jsonData} />,
);
