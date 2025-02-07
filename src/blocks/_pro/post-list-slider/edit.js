/* globals vk_block_post_type_params */
// import WordPress Scripts
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	BaseControl,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';
import {
	BlockControls,
	BlockAlignmentToolbar,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
// Load VK Blocks Compornents
import { DisplayItemsControl } from '@vkblocks/components/display-items-control';
import { DisplayCondition } from '@vkblocks/components/display-condition';
import { AdvancedToggleControl } from '@vkblocks/components/advanced-toggle-control';
import { MultiItemSetting } from './multi-item-setting.js';
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';

export default function PostListSliderEdit(props) {
	const { attributes, setAttributes, clientId } = props;

	const postTypesProps = vk_block_post_type_params.post_type_option;
	const termsByTaxonomyName = vk_block_post_type_params.term_by_taxonomy_name;
	const stickyPosts = attributes.stickyPosts;

	const {
		layout,
		autoPlay,
		autoPlayStop,
		autoPlayDelay,
		pagination,
		width,
		loop,
		effect,
		speed,
		navigationPosition,
		blockId,
	} = attributes;

	const blockProps = useBlockProps();

	useEffect(() => {
		// blockID が定義されていない場合は blockID に clientID を挿入
		// 再利用ブロックのインナーブロックではない場合 blockID を更新
		if (
			blockId === undefined ||
			isParentReusableBlock(clientId) === false
		) {
			setAttributes({ blockId: clientId });
		}
	}, [clientId]);

	useEffect(() => {
		if (layout === 'postListText') {
			setAttributes({ slidesPerGroup: 'one-by-one' });
			setAttributes({ slidesPerViewMobile: 1 });
			setAttributes({ slidesPerViewTablet: 1 });
			setAttributes({ slidesPerViewPC: 1 });
			setAttributes({ centeredSlides: false });
		}
	}, [layout]);

	return (
		<>
			<BlockControls>
				<BlockAlignmentToolbar
					value={width}
					onChange={(nextWidth) =>
						setAttributes({ width: nextWidth })
					}
					controls={['wide', 'full']}
				/>
			</BlockControls>
			<InspectorControls>
				<DisplayCondition
					attributes={attributes}
					setAttributes={setAttributes}
					postTypesProps={postTypesProps}
					termsByTaxonomyName={termsByTaxonomyName}
					stickyPosts={stickyPosts}
				/>
				<PanelBody
					title={__('Display type', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<BaseControl
						label={__('Display type', 'vk-blocks-pro')}
						id={'vk_column-displayType'}
					>
						<SelectControl
							value={layout}
							onChange={(value) =>
								setAttributes({ layout: value })
							}
							options={[
								{
									value: 'card',
									label: __('Card', 'vk-blocks-pro'),
								},
								{
									value: 'card-noborder',
									label: __(
										'Card (No border)',
										'vk-blocks-pro'
									),
								},
								{
									value: 'card-intext',
									label: __('Card (Intext)', 'vk-blocks-pro'),
								},
								{
									value: 'card-horizontal',
									label: __(
										'Card (Horizontal)',
										'vk-blocks-pro'
									),
								},
								{
									value: 'media',
									label: __('Media', 'vk-blocks-pro'),
								},
								{
									value: 'postListText',
									label: __('Text 1 Column', 'vk-blocks-pro'),
								},
							]}
						/>
					</BaseControl>
				</PanelBody>
				<DisplayItemsControl {...props} />
				<PanelBody
					title={__('Slider Settings', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<BaseControl
						label={__('Effect ', 'vk-blocks-pro')}
						id={`vk_slider-effect`}
					>
						<SelectControl
							value={effect}
							onChange={(value) =>
								setAttributes({ effect: value })
							}
							options={[
								{
									label: __('Slide', 'vk-blocks-pro'),
									value: 'slide',
								},
								{
									label: __('Fade', 'vk-blocks-pro'),
									value: 'fade',
								},
							]}
						/>
					</BaseControl>
					<BaseControl
						label={__('Loop ', 'vk-blocks-pro')}
						id={`vk_slider-loop`}
					>
						<AdvancedToggleControl
							initialFixedTable={loop}
							schema={'loop'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('AutoPlay', 'vk-blocks-pro')}
						id={`vk_slider-autoPlay`}
					>
						<AdvancedToggleControl
							initialFixedTable={autoPlay}
							schema={'autoPlay'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('Stop AutoPlay when swipe', 'vk-blocks-pro')}
						id={`vk_slider-autoPlay`}
					>
						<AdvancedToggleControl
							initialFixedTable={autoPlayStop}
							schema={'autoPlayStop'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('Display Time', 'vk-blocks-pro')}
						id={`vk_slider-autoPlay`}
					>
						<TextControl
							type={'number'}
							value={autoPlayDelay}
							onChange={(value) => {
								if (
									Number(value) === NaN ||
									Number(value) < 0
								) {
									setAttributes({
										autoPlayDelay: 0,
									});
								} else {
									setAttributes({
										autoPlayDelay: parseInt(
											Number(value),
											10
										),
									});
								}
							}}
							min={0}
						/>
					</BaseControl>
					<BaseControl
						label={__('Change Speed', 'vk-blocks-pro')}
						id={`vk_slider-changeSpeed`}
					>
						<TextControl
							type={'number'}
							value={speed}
							onChange={(value) => {
								if (
									Number(value) === NaN ||
									Number(value) < 0
								) {
									setAttributes({
										speed: 0,
									});
								} else {
									setAttributes({
										speed: parseInt(Number(value), 10),
									});
								}
							}}
							min={0}
						/>
					</BaseControl>
					<BaseControl
						label={__('Pagination Type', 'vk-blocks-pro')}
						id={`vk_slider-displayPagination`}
					>
						<SelectControl
							value={pagination}
							options={[
								{
									label: __('Hide', 'vk-blocks-pro'),
									value: 'hide',
								},
								{
									label: __('Default', 'vk-blocks-pro'),
									value: 'bullets',
								},
								{
									label: __(
										'Number of slides',
										'vk-blocks-pro'
									),
									value: 'fraction',
								},
							]}
							onChange={(value) =>
								setAttributes({ pagination: value })
							}
						/>
					</BaseControl>
					<BaseControl
						label={__('Navigation Position', 'vk-blocks-pro')}
						id={`vk_slider-navigationPosition`}
					>
						<SelectControl
							value={navigationPosition}
							options={[
								{
									label: __('Hide', 'vk-blocks-pro'),
									value: 'hide',
								},
								{
									label: __('Center', 'vk-blocks-pro'),
									value: 'center',
								},
								{
									label: __(
										'Bottom on Mobile device',
										'vk-blocks-pro'
									),
									value: 'mobile-bottom',
								},
							]}
							onChange={(value) =>
								setAttributes({ navigationPosition: value })
							}
						/>
					</BaseControl>
				</PanelBody>
				{layout !== 'postListText' && <MultiItemSetting {...props} />}
			</InspectorControls>
			<div {...blockProps}>
				<div className="alert alert-info font-size-14px">
					{__(
						'Please check the actual behavior on the live site.',
						'vk-blocks-pro'
					)}
				</div>
				<ServerSideRender
					block="vk-blocks/post-list-slider"
					attributes={attributes}
				/>
			</div>
		</>
	);
}
