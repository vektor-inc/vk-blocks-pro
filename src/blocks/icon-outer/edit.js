import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
	JustifyContentControl,
	BlockControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	BaseControl,
	TextControl,
	RangeControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	Button,
	SelectControl,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { select, dispatch } from '@wordpress/data';

export default function IconOuterEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		iconSize,
		iconSizeUnit,
		iconMargin,
		iconMarginUnit,
		iconRadius,
		iconsJustify,
		iconType,
	} = attributes;

	const { getBlocksByClientId } = select('core/block-editor');
	const { updateBlockAttributes } = dispatch('core/block-editor');

	const thisBlock = getBlocksByClientId(clientId);

	useEffect(() => {
		if (thisBlock && thisBlock[0] && thisBlock[0].innerBlocks) {
			const thisInnerBlocks = thisBlock[0].innerBlocks;
			thisInnerBlocks.forEach(function (thisInnerBlock) {
				updateBlockAttributes(thisInnerBlock.clientId, { iconSize });
				updateBlockAttributes(thisInnerBlock.clientId, {
					iconSizeUnit,
				});
				updateBlockAttributes(thisInnerBlock.clientId, { iconMargin });
				updateBlockAttributes(thisInnerBlock.clientId, {
					iconMarginUnit,
				});
				updateBlockAttributes(thisInnerBlock.clientId, { iconRadius });
				updateBlockAttributes(thisInnerBlock.clientId, { iconType });
			});
		}
	}, [thisBlock, attributes, clientId]);

	// blocksProps を予め定義
	const blockProps = useBlockProps({
		className: `vk_icons`,
	});

	const ALLOWED_BLOCKS = ['vk-blocks/icon'];

	const TEMPLATE = [['vk-blocks/icon'], ['vk-blocks/icon']];

	// 空白チェック
	const defaultIconSize = 'px' === iconSizeUnit ? 36 : 1;
	const defaultIconMargin = 'px' === iconMarginUnit ? 22 : 1;

	return (
		<>
			<BlockControls group="block">
				<JustifyContentControl
					allowedControls={[
						'left',
						'center',
						'right',
						'space-between',
					]}
					value={iconsJustify}
					onChange={(value) => setAttributes({ iconsJustify: value })}
					popoverProps={{
						position: 'bottom right',
						variant: 'toolbar',
					}}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={__('Icon Common Setting', 'vk-blocks-pro')}>
					<p className={`mt-0 mb-2`}>{__('Size', 'vk-blocks-pro')}</p>
					<div className="vk_icon_custombox">
						<TextControl
							className={`vk_icon_custombox_number`}
							value={iconSize}
							step={'px' === iconSizeUnit ? 1 : 0.1}
							min={0}
							onChange={(value) => {
								let newIconSize = value
									? parseFloat(value)
									: defaultIconSize;
								if ('px' === iconSizeUnit) {
									newIconSize = parseInt(newIconSize);
								}
								setAttributes({ iconSize: newIconSize });
							}}
							type={'number'}
						/>
						<SelectControl
							className={`vk_icon_custombox_unit`}
							value={iconSizeUnit}
							onChange={(value) => {
								setAttributes({ iconSizeUnit: value });
								if ('px' === value) {
									setAttributes({
										iconSize: parseInt(iconSize),
									});
								}
							}}
							options={[
								{
									value: 'px',
									label: __('px', 'vk-blocks-pro'),
								},
								{
									value: 'em',
									label: __('em', 'vk-blocks-pro'),
								},
								{
									value: 'rem',
									label: __('rem', 'vk-blocks-pro'),
								},
								{
									value: 'vw',
									label: __('vw', 'vk-blocks-pro'),
								},
							]}
						/>
						<Button
							className="vk_icon_custombox_reset"
							isSmall
							isSecondary
							onClick={() => {
								setAttributes({ iconSize: 36 });
								setAttributes({ iconSizeUnit: 'px' });
							}}
						>
							{__('Reset')}
						</Button>
					</div>
					<p className={`mt-0 mb-2`}>
						{__('Margin', 'vk-blocks-pro')}
					</p>
					<div className="vk_icon_custombox">
						<TextControl
							className={`vk_icon_custombox_number`}
							value={iconMargin}
							step={'px' === iconMarginUnit ? 1 : 0.1}
							min={0}
							onChange={(value) => {
								let newIconMargin = value
									? parseFloat(value)
									: defaultIconMargin;
								if ('px' === iconMarginUnit) {
									newIconMargin = parseInt(newIconMargin);
								}
								setAttributes({ iconMargin: newIconMargin });
							}}
							type={'number'}
						/>
						<SelectControl
							className={`vk_icon_custombox_unit`}
							value={iconMarginUnit}
							onChange={(value) => {
								setAttributes({ iconMarginUnit: value });
								if ('px' === value) {
									setAttributes({
										iconMargin: parseInt(iconMargin),
									});
								}
							}}
							options={[
								{
									value: 'px',
									label: __('px', 'vk-blocks-pro'),
								},
								{
									value: 'em',
									label: __('em', 'vk-blocks-pro'),
								},
								{
									value: 'rem',
									label: __('rem', 'vk-blocks-pro'),
								},
								{
									value: 'vw',
									label: __('vw', 'vk-blocks-pro'),
								},
							]}
						/>
						<Button
							className="vk_icon_custombox_reset"
							isSmall
							isSecondary
							onClick={() => {
								setAttributes({ iconMargin: 22 });
								setAttributes({ iconMarginUnit: 'px' });
							}}
						>
							{__('Reset')}
						</Button>
					</div>
					<BaseControl
						label={__('Border radius', 'vk-blocks-pro')}
						id={`vk_icon-radius`}
					>
						<RangeControl
							value={iconRadius}
							onChange={(value) =>
								setAttributes({
									iconRadius:
										value !== undefined ? value : 50,
								})
							}
							min={0}
							max={50}
							allowReset={true}
						/>
					</BaseControl>
					<p className="mt-0 mb-2">{__('Style', 'vk-blocks-pro')}</p>

					<ToggleGroupControl
						value={iconType}
						onChange={(value) => setAttributes({ iconType: value })}
						isBlock
					>
						<ToggleGroupControlOption
							value="0"
							label={__('Solid color', 'vk-blocks-pro')}
						/>
						<ToggleGroupControlOption
							value="1"
							label={__('Icon & Frame', 'vk-blocks-pro')}
						/>
						<ToggleGroupControlOption
							value="2"
							label={__('Icon only', 'vk-blocks-pro')}
						/>
					</ToggleGroupControl>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div
					className={`vk_icons_col vk_icons_col-justify-${iconsJustify}`}
				>
					<InnerBlocks
						allowedBlocks={ALLOWED_BLOCKS}
						template={TEMPLATE}
						templateLock={false}
						orientation="horizontal"
					/>
				</div>
			</div>
		</>
	);
}
