/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, PlainText } from "@wordpress/block-editor";
import { TextControl } from "@wordpress/components";

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
	const { productSKUs } = attributes;

	// Combine both states into a single state object for cleanliness
	const [localAttributes, setLocalAttributes] = useState({
		productSKUs: productSKUs.toString(),
	});

	// Single useEffect to handle external attribute changes
	useEffect(() => {
		setLocalAttributes({
			productSKUs: productSKUs.toString(),
		});
	}, [productSKUs]);

	const handleChange = (name, value) => {
		// Update local state immediately for UI feedback
		setLocalAttributes((prev) => ({ ...prev, [name]: value }));
	};

	const handleBlur = (name, value) => {
		// Trim the input value and update the corresponding attribute
		setAttributes({ [name]: value.trim() });
	};

	return (
		<div
			style={{ background: "#3b82f6", margin: "20px 0 0 0", padding: "1em" }}
		>
			<h4 style={{ color: "white" }}>Products Bundle</h4>
			{/* <PlainText
				style={{ padding: "0 0.2em" }}
				value={localAttributes.productId}
				onChange={(value) => handleChange("productId", value)}
				onBlur={() => handleBlur("productId", localAttributes.productId)}
				placeholder="Enter product IDs"
			/> */}
			<PlainText
				style={{ padding: "0 0.2em" }}
				value={localAttributes.productSKUs}
				onChange={(value) => handleChange("productSKUs", value)}
				onBlur={() => handleBlur("productSKUs", localAttributes.productSKUs)}
				placeholder="Enter product SKUs"
			/>
		</div>
	);
}
