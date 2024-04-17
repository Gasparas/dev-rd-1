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
import { useBlockProps, InnerBlocks, PlainText } from "@wordpress/block-editor";

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
	const blockProps = useBlockProps({
		style: {
			background: "#FFFFFF",
			border: "2px solid grey",
			margin: "20px 0 0 0",
			padding: "1em",
		},
		className: "product-bundle-editor",
	});

	const { roles } = attributes;
	const [localAttributes, setLocalAttributes] = useState({
		roles: roles.toString(),
	});

	useEffect(() => {
		setLocalAttributes({
			roles: roles.toString(),
		});
	}, [roles]);

	const handleChange = (name, value) => {
		// Update local state immediately for UI feedback
		setLocalAttributes((prev) => ({ ...prev, [name]: value }));
	};

	const handleBlur = (name, value) => {
		// Trim the input value and update the corresponding attribute
		setAttributes({ [name]: value.trim() });
	};

	return (
		<div {...blockProps}>
			<div
				style={{
					background: "lightgrey",
					padding: "0.5em",
					marginBottom: "1em",
				}}
			>
				<h4 style={{ marginBottom: "1em" }}>Conditional Wrapper</h4>
				<p style={{}}>User roles:</p>
				<PlainText
					style={{ background: "lightgrey" }}
					value={localAttributes.roles}
					onChange={(value) => handleChange("roles", value)}
					onBlur={() => handleBlur("roles", localAttributes.roles)}
					placeholder="Enter roles"
				/>
			</div>
			<InnerBlocks
				templateLock={false}
				renderAppender={InnerBlocks.ButtonBlockAppender}
			/>
		</div>
	);
}
