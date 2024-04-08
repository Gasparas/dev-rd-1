/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, PlainText } from "@wordpress/block-editor";
import { useState, useEffect } from "@wordpress/element"; // Import useEffect

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	// Local state for inputs
	const [localDiscountSteps, setLocalDiscountSteps] = useState(
		attributes.discountSteps,
	);
	const [localDiscountPercentages, setLocalDiscountPercentages] = useState(
		attributes.discountPercentages,
	);

	// Update local state when attributes change
	useEffect(() => {
		setLocalDiscountSteps(attributes.discountSteps);
		setLocalDiscountPercentages(attributes.discountPercentages);
	}, [attributes.discountSteps, attributes.discountPercentages]);

	const updateDiscountSteps = (value) => {
		setLocalDiscountSteps(value); // Update local state
	};

	const updateDiscountPercentages = (value) => {
		setLocalDiscountPercentages(value); // Update local state
	};

	const onBlurDiscountSteps = () => {
		setAttributes({ discountSteps: localDiscountSteps.trim() }); // Update block attribute when input is blurred
	};

	const onBlurDiscountPercentages = () => {
		setAttributes({ discountPercentages: localDiscountPercentages.trim() }); // Update block attribute when input is blurred
	};

	return (
		<div
			style={{ background: "#3b82f6", margin: "20px 0 0 0", padding: "1em" }}
		>
			<h3 style={{ color: "#FFFFFF" }}>Cart total counter</h3>
			<p style={{ color: "#FFFFFF" }}>Discount quantity steps:</p>
			<PlainText
				style={{ padding: "0 0.2em" }}
				value={localDiscountSteps}
				onChange={updateDiscountSteps}
				onBlur={onBlurDiscountSteps}
				placeholder="Enter discount steps"
			/>
			<p style={{ color: "#FFFFFF" }}>Discount percentages:</p>
			<PlainText
				style={{ padding: "0 0.2em" }}
				value={localDiscountPercentages}
				onChange={updateDiscountPercentages}
				onBlur={onBlurDiscountPercentages}
				placeholder="Enter discount percentages"
			/>
		</div>
	);
}
