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

console.log("checkout-bar view.js");

import useStore from "store";
import { useState, useEffect } from "@wordpress/element";
import { Truck, Gift } from "lucide-react";

/**
 * CheckoutBar
 */
const CheckoutBar = ({ data }) => {
	const {
		currencyData,
		shippingTotal,
		totalQuantity,
		totalPrice,
		totalPriceMinusShipping,
		totalSalePrice,
		totalSalePriceMinusShipping,
		wc_price,
	} = useStore((state) => ({
		currencyData: state.currencyData,
		shippingTotal: state.shippingTotal,
		totalQuantity: state.totalQuantity,
		totalPrice: state.totalPrice,
		totalPriceMinusShipping: state.totalPriceMinusShipping,
		totalSalePrice: state.totalSalePrice,
		totalSalePriceMinusShipping: state.totalSalePriceMinusShipping,
		wc_price: state.wc_price,
	}));

	// useEffect(() => {
	// 	console.log("CheckoutBar component re-rendered");
	// 	console.log({
	// 		shippingTotal,
	// 		totalQuantity,
	// 		totalPrice,
	// 		totalPriceMinusShipping,
	// 		totalSalePrice,
	// 		totalSalePriceMinusShipping,
	// 		wc_price,
	// 	});
	// });

	const [checkoutUrl, setCheckoutUrl] = useState("");

	useEffect(() => {
		// Replace 'checkout' with the slug or ID of your Checkout page
		const pageSlug = "cart";

		// Fetch the Checkout page details from the REST API
		fetch(`${window.location.origin}/wp-json/wp/v2/pages?slug=${pageSlug}`)
			.then((response) => response.json())
			.then((pages) => {
				if (pages.length > 0) {
					setCheckoutUrl(pages[0].link);
				}
			})
			.catch((error) =>
				console.error("Error fetching the Checkout page:", error),
			);
	}, []);

	const [showTooltip, setShowTooltip] = useState(false);

	const handleClick = (e) => {
		if (totalQuantity === 0) {
			e.preventDefault();
			setShowTooltip(true);
			setTimeout(() => {
				setShowTooltip(false);
			}, 2000); // Hide tooltip after 3 seconds
		} else {
			setShowTooltip(false);
		}
	};

	return (
		<>
			{showTooltip && (
				<div className="w-full px-4 py-0 mb-2 text-red-500 bg-white border border-blue-500 rounded bottom-full">
					Jūsų krepšelis yra tuščias
				</div>
			)}
			{totalSalePriceMinusShipping > 0 && (
				<>
					<div className="flex items-center justify-end px-3 py-0 mb-1 bg-white border border-gray-400 rounded float-end w-fit">
						Pristatymas{" "}
						{shippingTotal > 0 ? (
							shippingTotal + " €"
						) : (
							<span className="contents text-[#23b500]">
								nemokamas
								<span className="ml-0.5">
									<Gift size={18} color="#23b500" />
								</span>
							</span>
						)}{" "}
					</div>
				</>
			)}
			<a
				className="w-full cursor-pointer"
				href={totalQuantity > 0 ? checkoutUrl : null}
				onClick={handleClick}
			>
				<div className="flex items-center justify-between w-full px-3 py-4 text-lg text-white no-underline bg-blue-500 rounded gap-x-1">
					<div className="flex items-center">
						<span className="flex items-center justify-center w-6 h-6 mr-2 bg-white rounded-full text-sky-900">
							{totalQuantity}
						</span>
						<p className="leading-5 ">Pirkinių krepšelis</p>
					</div>
					<div>
						{/* {totalPriceMinusShipping != totalSalePriceMinusShipping ? (
							<div className="flex flex-wrap justify-end gap-x-1">
								<span className="line-through">
									{totalPriceMinusShipping} {currencyData.currency_symbol}
								</span>{" "}
								<span>
									{totalSalePriceMinusShipping} {currencyData.currency_symbol}
								</span>
							</div>
						) : (
							<span>
								{totalSalePriceMinusShipping} {currencyData.currency_symbol}
							</span>
						)} */}
						<span>
							{totalSalePriceMinusShipping} {currencyData.currency_symbol}
						</span>
					</div>
				</div>
			</a>
		</>
	);
};

const jsonDataElement = document.querySelector(".total-cart-data");
const jsonData = JSON.parse(jsonDataElement?.textContent || "{}");
const htmlElement = document.querySelector("#root-checkout-bar");
if (htmlElement) {
	ReactDOM.createRoot(htmlElement).render(<CheckoutBar data={jsonData} />);
}
