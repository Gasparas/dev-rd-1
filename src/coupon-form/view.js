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

console.log("coupon-code js");

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
 * Coupon Form
 */

function FormComponent() {
	const { applyCoupon } = useStore((state) => ({
		applyCoupon: state.applyCoupon,
	}));

	const [inputValue, setInputValue] = useState(""); // State to hold the input value
    const [isSubmitted, setIsSubmitted] = useState(false); // State to track submission status

	const handleChange = (event) => {
		setInputValue(event.target.value); // Update state with input value
	};

	const handleSubmit = (event) => {
		event.preventDefault(); // Prevent the default form submit action		
		applyCoupon(inputValue);
		setIsSubmitted(true); // Set the submission flag to true
		// alert(`Submitted value: ${inputValue}`); // Display alert with current input value
	};

	return (
		<div className="p-2 bg-green-300">
			<form className="flex" onSubmit={handleSubmit}>
			{!isSubmitted ? ( 
				<>
				<input
					className="px-2 basis-2/3"
					type="text"
					placeholder="Coupon code"
					value={inputValue}
					onChange={handleChange}
					/>
				<button className="text-center basis-1/3" type="submit">
					Apply
				</button>
					</>

			) : ( )}
			</form>
		</div>
	);
}

// const jsonDataElement = document.querySelector(".total-cart-data");
// const jsonData = JSON.parse(jsonDataElement.textContent || "{}");
ReactDOM.createRoot(document.querySelector("#root-coupon-form")).render(
	<FormComponent />,
);
