import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, PanelRow, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function FAQ2Edit(props) {
	const { attributes, setAttributes } = props;
	const { showContent } = attributes;
	const blockProps = useBlockProps({
		className: 'vk_faq',
	});

	const ALLOWED_BLOCKS = ['vk-blocks/faq2-q', 'vk-blocks/faq2-a'];

	const TEMPLATE = [['vk-blocks/faq2-q'], ['vk-blocks/faq2-a']];

	let settingContent;
	// eslint-disable-next-line no-undef
	if (vk_blocks_check.is_pro) {
		settingContent = (
			<SelectControl
				name="vk_blocks_options[new_faq_accordion]"
				value={showContent}
				onChange={(value) => {
					setAttributes({
						showContent: value,
					});
				}}
				options={[
					{
						label: __('Use common settings', 'vk-blocks-pro'),
						value: 'default',
					},
					{
						label: __('Disable accordion', 'vk-blocks-pro'),
						value: 'disable',
					},
					{
						label: __(
							'Enable accordion and default open',
							'vk-blocks-pro'
						),
						value: 'open',
					},
					{
						label: __(
							'Enable accordion and default close',
							'vk-blocks-pro'
						),
						value: 'close',
					},
				]}
			/>
		);
	} else {
		settingContent = __(
			'You can be collapsing this block at VK Blocks Pro',
			'vk-blocks-pro'
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Accordion Setting', 'vk-blocks-pro')}>
					<PanelRow>{settingContent}</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className="vk_faq-header"></div>
				<dl className="vk_faq-body">
					<InnerBlocks
						allowedBlocks={ALLOWED_BLOCKS}
						template={TEMPLATE}
						templateLock="all"
					/>
				</dl>
				<div className="vk_faq-footer"></div>
			</div>
		</>
	);
}
