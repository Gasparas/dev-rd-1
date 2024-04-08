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

const StepIndicator = ({ data }) => {
    const { totalQuantity } = useStore((state) => ({
        totalQuantity: state.totalQuantity,
    }));

    const steps = data.steps;
    const progressPercentage = (totalQuantity / steps[steps.length - 1]) * 100;

    return (
        <>
            <div className="px-3 py-4 mt-3 bg-blue-500 rounded-lg">
                <div className="relative w-full h-2 bg-gray-200 rounded-full progress-container">
                    <div
                        className="absolute h-2 bg-blue-600 rounded-full progress-bar"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                    {steps.map((step, index) => {
                        const numberOfSteps = steps.length;
                        // Calculate the left percentage for equal spacing based on index
                        const leftPercentage = numberOfSteps > 0 ? (index / (numberOfSteps - 1)) * 100 : 0;
                        return (
                            <div
                                key={step}
                                className="absolute w-4 h-4 bg-blue-500 rounded-full step-marker -top-1"
                                style={{
                                    left: `${leftPercentage}%`,
                                    transform: 'translateX(-50%)', // Center the markers
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
