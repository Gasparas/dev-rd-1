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
import useCart from "useCart";
import useStore from "store";

/**
 * NextStep
 */

const NextStep = ({ beforeNextStep, percanteges, currentStep }) => {
	const nextPercentage = percanteges[currentStep];

	return (
		<div className="flex items-center justify-center px-3 py-2 mb-1 text-sm font-medium bg-white border-2 border-blue-500 rounded-lg">
			Add <span className="mx-1">{beforeNextStep}</span> more for extra{" "}
			<span className="px-2 py-1 mx-1 text-white bg-red-500 rounded-lg">
				-{nextPercentage}% OFF
			</span>
		</div>
	);
};

/**
 * TotalCart
 */

const TotalCart = ({ data }) => {
	const totalCartUpdate = useStore((state) => {
		console.log("TotalCart totalCartUpdate", state.totalCartUpdate);
		return state.totalCartUpdate;
	});

	const {
		fetchCart,
		applyCoupon,
		removeCoupon,
		appliedCoupon,
		totalQuantity,
		totalPrice,
		totalSalePrice,
		salePercentage,
		isLoading,
		error,
	} = useCart();

	const [steps, setSteps] = useState(data.steps);
	const [percanteges, setPercanteges] = useState(data.perc);
	const [currentStep, setCurrentStep] = useState(0);
	// const percanteges = ["5", "10", "15", "20"];
	const [distanceToNextStep, setDistanceToNextStep] = useState(0);

	useEffect(() => {
		// setSteps(data.steps);
		// setPercanteges(data.perc); 
	}, [data]);

	useEffect(() => {
		// Calculate the distance to the next step
		const calculateDistanceToNextStep = () => {
			if (currentStep < steps.length) {
				// If not at the last step, calculate the difference between the next step and totalQuantity
				const nextStepValue = steps[currentStep];
				setDistanceToNextStep(nextStepValue - totalQuantity);
			} else {
				// If at the last step, there's no "next step" so set distance to 0
				setDistanceToNextStep(0);
			}
		};
		calculateDistanceToNextStep();
	}, [currentStep, totalQuantity, steps]);

	useEffect(() => {
		fetchCart();
		determineCurrentStep();
	}, [totalQuantity]);

	useEffect(() => {
		fetchCart();
	}, [totalCartUpdate]);

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
		const stepIndex = foundStep !== 0 ? steps.indexOf(foundStep) + 1 : 0;

		// Check if we are moving down to step 0 and need to remove any existing coupon
		if (stepIndex === 0 && appliedCoupon) {
			console.log(
				`Removing coupon, as moving to step 0 from step: ${currentStep}`,
			);
			// removeCoupon(appliedCoupon);
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
			// if (newCouponCode && appliedCoupon !== newCouponCode) {
			// 	const couponOperation = appliedCoupon
			// 		? removeCoupon(appliedCoupon).then(() => applyCoupon(newCouponCode))
			// 		: applyCoupon(newCouponCode);

			// 	couponOperation
			// 		.then(() => {
			// 			console.log("Coupon operation completed.");
			// 			fetchCart();
			// 		})
			// 		.catch((error) => {
			// 			console.error("Coupon operation failed:", error);
			// 		});
			// }
		}
	};

	if (isLoading) return <div>Loading cart items...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<>
			<NextStep
				beforeNextStep={distanceToNextStep}
				percanteges={percanteges}
				currentStep={currentStep}
			></NextStep>
			{/* <div className="flex justify-around w-full px-3 py-4 font-medium text-white bg-blue-500 rounded-lg">
				<div>
					<span className="mr-1">{totalSalePrice}€</span>
					<span
						className={`strikethrough-diagonal font-light text-sm text-gray-100 ${
							currentStep != 0 ? "opacity-100" : "opacity-0"
						}`}
					>
						{totalPrice}€
					</span>
				</div>
				<div
					className={`bg-white text-gray-700 rounded-lg px-2 ${
						currentStep != 0 ? "opacity-100" : "opacity-0"
					}`}
				>
					-{percanteges[currentStep - 1]}% OFF
				</div>
				<div className="flex items-center gap-x-2">
					<div className="bg-white text-gray-700 rounded-lg px-1.5 text-sm">
						{totalQuantity}
					</div>
					<a href="/?page_id=9" className="text-sm text-white no-underline">
						View Order
					</a>
				</div>
			</div> */}
		</>
	);
};

const container = document.querySelector("#root-total-cart");
const jsonDataElement = document.querySelector(".total-cart-data");
const jsonData = JSON.parse(jsonDataElement.textContent || "{}");

// ReactDOM.createRoot(container).render(<TotalCart data={jsonData} />);
