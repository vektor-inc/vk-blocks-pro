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
	ButtonGroup,
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
						isAlternate: true,
					}}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={__('Icon Common Setting', 'vk-blocks')}>
					<p className={`mt-0 mb-2`}>{__('Size', 'vk-blocks')}</p>
					<div className="vk_icon_custombox">
						<TextControl
							className={`vk_icon_custombox_number`}
							value={iconSize}
							onChange={(value) =>
								setAttributes({ iconSize: parseInt(value) })
							}
							type={'number'}
						/>
						<SelectControl
							className={`vk_icon_custombox_unit`}
							value={iconSizeUnit}
							onChange={(value) => {
								setAttributes({ iconSizeUnit: value });
							}}
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
					<p className={`mt-0 mb-2`}>{__('Margin', 'vk-blocks')}</p>
					<div className="vk_icon_custombox">
						<TextControl
							className={`vk_icon_custombox_number`}
							value={iconMargin}
							onChange={(value) =>
								setAttributes({ iconMargin: parseInt(value) })
							}
							type={'number'}
						/>
						<SelectControl
							className={`vk_icon_custombox_unit`}
							value={iconMarginUnit}
							onChange={(value) => {
								setAttributes({ iconMarginUnit: value });
							}}
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
						label={__('Border radius', 'vk-blocks')}
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
					<p className={`mt-0 mb-2`}>{__('Style', 'vk-blocks')}</p>
					<ButtonGroup className={`mb-3`}>
						<Button
							isSmall
							isPrimary={iconType === '0'}
							isSecondary={iconType !== '0'}
							onClick={() => setAttributes({ iconType: '0' })}
						>
							{__('Solid color', 'vk-blocks')}
						</Button>
						<Button
							isSmall
							isPrimary={iconType === '1'}
							isSecondary={iconType !== '1'}
							onClick={() => setAttributes({ iconType: '1' })}
						>
							{__('Icon & Frame', 'vk-blocks')}
						</Button>
						<Button
							isSmall
							isPrimary={iconType === '2'}
							isSecondary={iconType !== '2'}
							onClick={() => setAttributes({ iconType: '2' })}
						>
							{__('Icon only', 'vk-blocks')}
						</Button>
					</ButtonGroup>
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
					/>
				</div>
			</div>
		</>
	);
}
