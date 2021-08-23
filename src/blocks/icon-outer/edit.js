import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
	BlockAlignmentControl,
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

export default function IconOuterEdit(props) {
	const { attributes, setAttributes } = props;
	const {
		iconSize,
		iconSizeUnit,
		iconMargin,
		iconMarginUnit,
		iconRadius,
		iconAlign,
		iconType,
	} = attributes;
	// blocksProps を予め定義
	const blockProps = useBlockProps({
		className: `vk_icons`,
	});

	const ALLOWED_BLOCKS = ['vk-blocks/icon'];

	const TEMPLATE = [['vk-blocks/icon'], ['vk-blocks/icon']];

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Icon Common Setting', 'vk-blocks')}>
					<BaseControl
						label={__('Icon Align', 'vk-blocks')}
						id={`vk_icon-align`}
					>
						<BlockAlignmentControl
							value={iconAlign}
							onChange={(value) => {
								setAttributes({ iconAlign: value });
							}}
							controls={['left', 'center', 'right']}
						/>
					</BaseControl>
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
				<div className={'vk_icons_col'}>
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
