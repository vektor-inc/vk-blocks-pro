/**
 * Slider block type
 *
 */
import { ColumnResponsive } from "./component";
import { schema } from "./schema";
import classNames from "classnames";
import { convertToGrid } from "../../_helper/convert-to-grid";
import formatNum from "../../_helper/formatNum";
import { AdvancedToggleControl } from "./../../../components/advanced-toggle-control";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment, useEffect } = wp.element;
const { InspectorControls, BlockControls, BlockAlignmentToolbar} = wp.blockEditor;
const { select, dispatch } = wp.data;
const { RangeControl, PanelBody, BaseControl, SelectControl, TextControl, ButtonGroup, Button } = wp.components;
const { createHigherOrderComponent } = wp.compose;
const { addFilter } = wp.hooks;

const BlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 576">
	<path d="M456.1,1320.7H118.4v36.6H533V945.2h-35.5v334C497.6,1302.1,479,1320.7,456.1,1320.7z"/>
	<path d="M56.5,363.5c5.6,7,15.3,2.1,15.3-8V220.4c0-10.1-9.7-15-15.3-8L2.6,280.1c-3.5,4.4-3.5,11.5,0,15.9L56.5,363.5z"/>
	<path d="M519.5,363.5c-5.6,7-15.3,2.1-15.3-8V220.4c0-10.1,9.7-15,15.3-8l53.9,67.6c3.5,4.4,3.5,11.5,0,15.9L519.5,363.5z"/>
	<g>
		<g>
			<circle cx="240.3" cy="195.8" r="23.8"/>
			<path d="M181.7,311.7h56h36.7h120c10.6,0,16.4-13.7,9.5-22.6l-64.9-83.6c-5-6.4-13.9-6.4-18.9,0l-52.1,67.1
				c-5.2,6.7-14.9,6.3-19.6-1l-22.3-34.3c-5-7.6-15.3-7.6-20.3,0L171.5,290C165.7,299.1,171.5,311.7,181.7,311.7z"/>
			<path d="M392.7,404H183.3c-7.8,0-14.1-6.3-14.1-14.1v-24.1c0-7.8,6.3-14.1,14.1-14.1h209.3c7.8,0,14.1,6.3,14.1,14.1v24.1
				C406.8,397.7,400.5,404,392.7,404z"/>
		</g>
		<path d="M436.1,87.8H139.9c-25.4,0-46,20.6-46,46v308.3c0,25.4,20.6,46,46,46h296.2c25.4,0,46-20.6,46-46V133.8
			C482.1,108.5,461.5,87.8,436.1,87.8z M436.1,442.2H139.9V133.8h296.2V442.2z"/>
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
		const { unit, pc, tablet, mobile, autoPlay, autoPlayDelay, navigation, width } = attributes;
		const { getBlocksByClientId } = select("core/block-editor");
		const { updateBlockAttributes } = dispatch("core/block-editor");

		const thisBlock = getBlocksByClientId(clientId);

		let beforeLength;
		let afterLength;

		let customClientId = clientId.replace(/-/g, '');

		useEffect(() => {
			updateBlockAttributes(clientId, {
				clientId:customClientId,
			});
		}, [])

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
				<BlockControls>
					<BlockAlignmentToolbar
						value={ width }
						onChange={ ( nextWidth ) =>
							setAttributes( { width: nextWidth } )
						}
						controls={ [ 'wide', 'full' ] }
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody
						title={__("Height", "vk-blocks")}
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
								max={ 2000 }
							/>
							<RangeControl
								label={__('Tablet', 'vk-blocks')}
								value={tablet}
								onChange={(value) => setAttributes({ tablet: formatNum(value, tablet) })}
								step={0.1}
								max={ 2000 }
							/>
							<RangeControl
								label={__('Mobile', 'vk-blocks')}
								value={mobile}
								onChange={(value) => setAttributes({ mobile: formatNum(value, mobile) })}
								step={0.1}
								max={ 2000 }
							/>
						</BaseControl>
					</PanelBody>
					<PanelBody
						title={ __("Width", "vk-blocks") }
						initialOpen={ false }
					>
						<BaseControl>
							<ButtonGroup className="mb-3">
								<Button
									isSmall
									isPrimary={ width === 'wide' }
									isSecondary={ width !== 'wide' }
									onClick={ () => setAttributes({ width: 'wide' }) }
								>
									{ __('wide', 'vk-blocks') }
								</Button>
								<Button
									isSmall
									isPrimary={ width === 'full' }
									isSecondary={ width !== 'full' }
									onClick={ () => setAttributes({ width: 'full' }) }
								>
									{ __('Full Wide', 'vk-blocks') }
								</Button>
							</ButtonGroup>
						</BaseControl>
					</PanelBody>
					<PanelBody
						title={ __("Slider Settings", "vk-blocks") }
						initialOpen={ false }
					>
						<BaseControl label={ __("Display Navigation ", "vk-blocks") }>
							<AdvancedToggleControl
								initialFixedTable={ navigation }
								schema={ "navigation" }
								{ ...props }
							/>
						</BaseControl>
						<BaseControl label={ __("AutoPlay", "vk-blocks") }>
							<AdvancedToggleControl
								initialFixedTable={ autoPlay }
								schema={ "autoPlay" }
								{ ...props }
							/>
							<TextControl
								label={__('Delay', 'vk-blocks')}
								value={autoPlayDelay}
								onChange={value => setAttributes({ autoPlayDelay: formatNum(parseInt(value, 10), parseInt(autoPlayDelay, 10)) })}
								type={"number"}
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
