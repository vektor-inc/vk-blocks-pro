import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { BaseControl, PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function FAQ2Edit(props) {
	const { attributes, setAttributes } = props;
	const { showContent } = attributes;
	const blockProps = useBlockProps({
		className: 'vk_faq',
	});

	const ALLOWED_BLOCKS = ['vk-blocks/faq2-q', 'vk-blocks/faq2-a'];

	const TEMPLATE = [['vk-blocks/faq2-q'], ['vk-blocks/faq2-a']];

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Accordion Setting', 'vk-blocks-pro')}>
					{/* eslint-disable-next-line no-undef */}
					{vk_blocks_check.is_pro ? (
						<BaseControl>
							<SelectControl
								__nextHasNoMarginBottom
								name="vk_blocks_options[new_faq_accordion]"
								value={showContent}
								onChange={(value) => {
									setAttributes({
										showContent: value,
									});
								}}
								options={[
									{
										label: __(
											'Use common settings',
											'vk-blocks-pro'
										),
										value: 'default',
									},
									{
										label: __(
											'Disable accordion',
											'vk-blocks-pro'
										),
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
							<p>
								{__(
									'* You can change each common accordion settings from Setting > VK Blocks.',
									'vk-blocks-pro'
								)}
							</p>
						</BaseControl>
					) : (
						<p>
							{__(
								'You can be collapsing this block at VK Blocks Pro',
								'vk-blocks-pro'
							)}
						</p>
					)}
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
