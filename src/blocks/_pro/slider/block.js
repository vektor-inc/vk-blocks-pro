/**
 * Slider block type
 *
 */
import { ColumnResponsive } from "./component";
import { schema } from "./schema";
import { ColumnLayout } from "../../../components/column-layout";
import classNames from "classnames";
import { convertToGrid } from "../../_helper/convert-to-grid";
import formatNum from "../../_helper/formatNum";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { select, dispatch } = wp.data;
const { RangeControl, PanelBody, BaseControl, SelectControl } = wp.components;

const BlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 576">
		<path d="M456.1,1320.7H118.4v36.6H533V945.2h-35.5v334C497.6,1302.1,479,1320.7,456.1,1320.7z" />
		<path d="M528,89H48c-26.5,0-48,21.5-48,48v302c0,26.5,21.5,48,48,48h480c26.5,0,48-21.5,48-48V137C576,110.5,554.5,89,528,89z
	 M528,439H48V137h480V439z"/>
		<g>
			<path d="M92.4,239.6v96.8c0,14.6,12.1,26.3,26.3,26.3h52.5c14.6,0,26.3-12.1,26.3-26.3v-96.8c0-14.6-12.1-26.3-26.3-26.3h-52.5
		C104.3,213.3,92.4,225.4,92.4,239.6z"/>
			<path d="M235.5,239.6v96.8c0,14.6,12.1,26.3,26.3,26.3h52.5c14.6,0,26.3-12.1,26.3-26.3v-96.8c0-14.6-12.1-26.3-26.3-26.3h-52.5
		C247.2,213.3,235.5,225.4,235.5,239.6z"/>
			<path d="M378.6,239.6v96.8c0,14.6,12.1,26.3,26.3,26.3h52.5c14.6,0,26.3-12.1,26.3-26.3v-96.8c0-14.6-12.1-26.3-26.3-26.3h-52.5
		C390.3,213.3,378.6,225.4,378.6,239.6z"/>
		</g>
	</svg>
);

let displayInserter = false;
if (window.wpVersion && 5.4 <= parseFloat(window.wpVersion)) {
	displayInserter = true;
}

registerBlockType("vk-blocks/slider", {
	title: __("Slider", "vk-blocks"),
	icon: BlockIcon,
	category: "vk-blocks-cat-layout",
	attributes: schema,
	supports: {
		className: true,
		inserter: displayInserter,
	},

	edit(props) {
		const { attributes, setAttributes, className, clientId } = props;
		const { unit, pc, tablet, mobile } = attributes;
		const { getBlocksByClientId } = select("core/block-editor");
		const { updateBlockAttributes } = dispatch("core/block-editor");

		const thisBlock = getBlocksByClientId(clientId);

		let beforeLength;
		let afterLength;

		if (
			thisBlock !== undefined &&
			thisBlock[0] !== null &&
			thisBlock[0].innerBlocks !== undefined
		) {
			const innerBlocks = thisBlock[0].innerBlocks;
			beforeLength = innerBlocks.length;

			if (beforeLength !== undefined) {
				if (beforeLength !== afterLength) {
					for (let i = 0; i < innerBlocks.length; i++) {
						if (innerBlocks[i] !== undefined) {
							updateBlockAttributes(innerBlocks[i].clientId, attributes);
						}
					}
				}
				afterLength = beforeLength;
			}
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={__("Layout Columns", "vk-blocks")}
						initialOpen={false}
					>
						<ColumnLayout {...props} />
					</PanelBody>
					<PanelBody
						title={__("Slide Settings", "vk-blocks")}
						initialOpen={false}
					>
						<SelectControl
							label={__('Unit Type', 'vk-blocks')}
							value={unit}
							onChange={(value) => setAttributes({ unit: value })}
							options={[
								{
									value: 'px',
									label: __('px', 'vk-blocks'),
								},
								{
									value: 'em',
									label: __('em', 'vk-blocks'),
								},
								{
									value: 'rem',
									label: __('rem', 'vk-blocks'),
								},
								{
									value: 'vw',
									label: __('vw', 'vk-blocks'),
								}
							]}
						/>
						<BaseControl label={__('Slide Height for each device.', 'vk-blocks')}>
							<RangeControl
								label={__('PC', 'vk-blocks')}
								value={pc}
								onChange={(value) => setAttributes({ pc: formatNum(value, pc) })}
								step={0.1}
							/>
							<RangeControl
								label={__('Tablet', 'vk-blocks')}
								value={tablet}
								onChange={(value) => setAttributes({ tablet: formatNum(value, tablet) })}
								step={0.1}
							/>
							<RangeControl
								label={__('Mobile', 'vk-blocks')}
								value={mobile}
								onChange={(value) => setAttributes({ mobile: formatNum(value, mobile) })}
								step={0.1}
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
				<ColumnResponsive
					attributes={attributes}
					className={className}
					setAttributes={setAttributes}
					for_={"edit"}
				/>
			</Fragment>
		);
	},
	save({ attributes, className }) {
		return (
			<ColumnResponsive
				attributes={attributes}
				className={className}
				for_={"save"}
			/>
		);
	},
});

const { createHigherOrderComponent } = wp.compose;
const { addFilter } = wp.hooks;

const vkbwithClientIdClassName = createHigherOrderComponent(
	(BlockListBlock) => {
		return (props) => {
			if (props.name === "vk-blocks/slider-item") {
				const { col_xs, col_sm, col_md, col_lg, col_xl } = props.attributes;
				const customClass = classNames(props.className, `col-${convertToGrid(col_xs)} col-sm-${convertToGrid(col_sm)} col-md-${convertToGrid(col_md)} col-lg-${convertToGrid(col_lg)} col-xl-${convertToGrid(col_xl)}`);
				return (
					<BlockListBlock
						{...props}
						className={customClass}
					/>
				);
			}
			return <BlockListBlock {...props} />;

		};
	},
	"vkbwithClientIdClassName"
);

addFilter(
	"editor.BlockListBlock",
	"vk-blocks/slider-item",
	vkbwithClientIdClassName
);
