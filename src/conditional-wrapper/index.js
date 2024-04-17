/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

import { v4 as uuidv4 } from "uuid";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./style.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import metadata from "./block.json";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	attributes: {
		roles: {
			type: "string",
			default: "",
		},
	},

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	// apiVersion: 2,
	// title: "Dynamic Container",
	// category: "layout",
	// icon: "smiley",
	// save: () => null, // For dynamic blocks, return null in save function
	save() {
		return <InnerBlocks.Content />;
	},
});
