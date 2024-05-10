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

console.log("step-indicator view.js");

import useStore from "store";

/**
 * NextStep
 */
const NextStep = ({ data }) => {
	const {
		totalQuantity
	} =  useStore((state) => ({
		totalQuantity: state.totalQuantity
	}));

	const currentStepIndex = data.steps.filter((step) => totalQuantity >= step).length-1;
	const nextStepDiscountPercent = data.percs[(currentStepIndex+1)] ?? '';
	const productsToNextStep = nextStepDiscountPercent ? data.steps[(currentStepIndex+1)]-totalQuantity : 0;

	return (
		<div className="lg:w-[400px] w-[330px]" style={{position: "fixed", bottom: "5px", left: "50%", translate: "-50%"}}>
			<div className="flex  justify-around items-center px-3 py-2 mb-1 text-sm font-medium text-white bg-blue-500 rounded-lg [&>span]:text-xs">
				{nextStepDiscountPercent ? (
					<div>
						Add <span className="mr-1">{productsToNextStep}</span>more to get{" "}
						<span className="mx-1">{nextStepDiscountPercent} OFF</span>
					</div>
				) : (
					<div>
						You have a <span className="mr-1">{data.percs[currentStepIndex] ?? '0%'}</span> discount
					</div>
				)}
				<a
					href="/?page_id=9"
					className="px-2 py-1 text-sm text-white no-underline bg-blue-600 rounded-lg"
				>
					View Order
				</a>
			</div>
		</div>
	)
}

/**
 * StepIndicator
 */
const StepIndicator = ({ data }) => {
	const {
		totalQuantity,
		totalPrice,
		totalSalePrice,
		totalDiscountPrice,
		wc_price
	} = useStore((state) => ({
		totalQuantity: state.totalQuantity,
		totalPrice: state.totalPrice,
		totalSalePrice: state.totalSalePrice,
		totalDiscountPrice: state.totalDiscountPrice,
		wc_price: state.wc_price
	}));

	const steps = [0, ...data.steps, (data.steps[0]+data.steps[data.steps.length-1])];
	const maxStepValue = steps[steps.length - 1];
	const progressPercentage = (totalQuantity / maxStepValue) * 100;

	return (
		<>
			<div className="px-3 pt-1 pb-2 bg-blue-500 rounded-lg">
				<div className="mb-3 text-xs font-semibold tracking-wide text-center text-white">
					Items selected: {totalQuantity}
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
					/>
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
								/>
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
									{data.percs[index]}
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
							{totalSalePrice < totalPrice ? (
								<span className={`strikethrough-diagonal font-light text-sm text-gray-100`}>
								{wc_price(totalPrice, false)}
							</span>
							) : ''}
							<span className="ml-2">{wc_price(totalSalePrice, false)}</span>
						</div>
						<div>
							<span className="text-sm font-light text-gray-100">
								You save:&nbsp;
							</span>
							<span>{wc_price(totalDiscountPrice ?? totalPrice, false)}</span>
						</div>
					</div>
				</div>
			</div>
			<NextStep
				data={data}
			/>
		</>
	);
};

const jsonDataElement = document.querySelector(".total-cart-data");
const jsonData = JSON.parse(jsonDataElement?.textContent || "{}");
const htmlElement = document.querySelector("#root-step-indicator");
if(htmlElement) {
	ReactDOM.createRoot(htmlElement).render(
		<StepIndicator data={jsonData}/>,
	);
}
