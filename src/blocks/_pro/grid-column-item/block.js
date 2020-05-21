/**
 * card-item block type
 *
 */
import { schema } from "./schema";
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;

const BlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 576">
		<path d="M147.9,189.1v193.2c0,24.8,20.6,44.7,44.7,44.7h189.9c24.8,0,44.7-20.6,44.7-44.7V189.1c0-24.8-20.6-44.7-44.7-44.7H192.7
	C168.2,144.4,147.9,165,147.9,189.1z"/>
	</svg>
);

registerBlockType("vk-blocks/grid-column-item", {
	title: __("Grid Column Item", "vk-blocks"),
	icon: BlockIcon,
	category: "vk-blocks-cat",
	attributes: schema,
	parent: ["vk-blocks/grid-column"],
	supports: {
		className: true,
	},

	edit(props) {
		const { className } = props;
		return (
			<div className={`${className}`}>
				<InnerBlocks />
			</div>
		);
	},

	save(props) {
		const { className } = props;
		return (
			<div className={`${className}`}>
				<InnerBlocks.Content />
			</div>
		);
	},
});
