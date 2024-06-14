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
import { Check } from "lucide-react";

/**
 * Coupon Form
 */

function CouponTotals() {
	const { totalPrice, totalSalePrice, totalDiscountPrice, wc_price } = useStore(
		(state) => ({
			totalPrice: state.totalPrice,
			totalSalePrice: state.totalSalePrice,
			totalDiscountPrice: state.totalDiscountPrice,
			wc_price: state.wc_price,
		}),
	);

	if (!totalPrice) return;

	return (
		<div className={"coupon-cart-totals-wrap"}>
			<div className={"coupon-totals flex justify-evenly"}>
				{totalSalePrice > 0 && totalSalePrice < totalPrice ? (
					<>
						<del aria-hidden="true">
							<span className="woocommerce-Price-amount amount">
								<bdi>{wc_price(totalPrice, false)}</bdi>
							</span>
						</del>
						<span className="woocommerce-Price-amount amount">
							<bdi>Total: {wc_price(totalSalePrice, false)}</bdi>
						</span>
						<span className={"discount-amount"}>
							<span className="woocommerce-Price-amount amount">
								<bdi>Save: {wc_price(totalDiscountPrice, false)}</bdi>
							</span>
						</span>
					</>
				) : (
					<span className="woocommerce-Price-amount amount">
						<bdi>{wc_price(totalPrice, false)}</bdi>
					</span>
				)}
			</div>
		</div>
	);
}

function FormComponent() {
	const { applyCoupon, cartCoupons } = useStore((state) => ({
		applyCoupon: state.applyCoupon,
		cartCoupons: state.cartCoupons,
	}));

	const [inputValue, setInputValue] = useState(""); // State to hold the input value
	const [isSubmitted, setIsSubmitted] = useState(false); // State to track submission status
	const [formErrorText, setFormErrorText] = useState(""); // State for negative response
	const appliedCouponsCodes = cartCoupons.map((c) => c.code);

	const handleChange = (event) => {
		setInputValue(event.target.value); // Update state with input value
	};

	const handleSubmit = async (event) => {
		event.preventDefault(); // Prevent the default form submit action
		setFormErrorText("");
		applyCoupon(inputValue)
			.then((res) => {
				if (res) {
					setIsSubmitted(true);
				}
			})
			.catch((err) => {
				setFormErrorText(err.message);
			});
		// Set the submission flag to true
		// alert(`Submitted value: ${inputValue}`); // Display alert with current input value
	};

	return (
		<div className="p-2 rounded bg-amber-200">
			<form className="flex justify-center gap-x-2" onSubmit={handleSubmit}>
				{!isSubmitted && !appliedCouponsCodes.length ? (
					<>
						<input
							className="px-1 text-base font-light rounded basis-4/6"
							type="text"
							placeholder="Wprowadź kod rabatowy"
							value={inputValue}
							onChange={handleChange}
						/>
						<button
							className="px-2 text-base font-medium text-center uppercase transition-all bg-white hover:text-white hover:bg-sky-700 w-3/8 rounded-xl text-sky-900 basis-2/6"
							type="submit"
						>
							Aktywuj
						</button>
					</>
				) : (
					<>
						<p className="text-base uppercase text-sky-900">
							Kod rabatowy: {appliedCouponsCodes.join(", ")}
						</p>
						<Check color="#0c4a6e" />
					</>
				)}
			</form>
			{/* {formErrorText.length > 0 ? (
				<p
					className={"wc-block-components-validation-error"}
					dangerouslySetInnerHTML={{ __html: formErrorText }}
				/>
			) : (
				""
			)} */}
			{/* <CouponTotals /> */}
		</div>
	);
}

// const jsonDataElement = document.querySelector(".total-cart-data");
// const jsonData = JSON.parse(jsonDataElement.textContent || "{}");
const htmlElement = document.querySelector("#root-coupon-form");
if (htmlElement) {
	ReactDOM.createRoot(document.querySelector("#root-coupon-form")).render(
		<FormComponent />,
	);
}
