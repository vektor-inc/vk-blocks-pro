// import WordPress Scripts
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Render Select controls for the Dynamic text block.
 *
 * @param {Object}   props                 Component props.
 * @param {string}   props.tagName         The HTML tag name.
 * @param {Function} props.onSelectTagName onChange function for the SelectControl.
 *
 * @return {JSX.Element}                The select control group for HTML tag name.
 */
function DynamicTextEditControls({ tagName, onSelectTagName }) {
	return (
		<SelectControl
			__nextHasNoMarginBottom
			label={__('HTML element', 'vk-blocks')}
			value={tagName}
			options={[
				{
					value: 'div',
					label: __('div (default)', 'vk-blocks'),
				},
				{
					value: 'h1',
					label: __('h1', 'vk-blocks'),
				},
				{
					value: 'h2',
					label: __('h2', 'vk-blocks'),
				},
				{
					value: 'h3',
					label: __('h3', 'vk-blocks'),
				},
				{
					value: 'h4',
					label: __('h4', 'vk-blocks'),
				},
				{
					value: 'h5',
					label: __('h5', 'vk-blocks'),
				},
				{
					value: 'h6',
					label: __('h6', 'vk-blocks'),
				},
				{
					value: 'p',
					label: __('p', 'vk-blocks'),
				},
				{
					value: 'span',
					label: __('span', 'vk-blocks'),
				},
			]}
			onChange={onSelectTagName}
		/>
	);
}

export default function DynamicTextEdit(props) {
	const { attributes, setAttributes } = props;

	const { displayElement, tagName: TagName = '' } = attributes;

	// Hooks.
	const blockProps = useBlockProps();
	// const blockProps = useBlockProps({ className: 'vk_dynamicText' });

	let editContent;
	if (displayElement === 'please-select') {
		editContent = (
			<div className="alert alert-warning text-center">
				{__(
					'This block will not render because no visible element is selected.',
					'vk-blocks'
				)}
			</div>
			// Because no display Element is selected, The block Will not render
		);
	} else {
		editContent = (
			<ServerSideRender
				block="vk-blocks/dynamic-text"
				attributes={attributes}
			/>
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Display element settings', 'vk-blocks')}>
					<SelectControl
						label={__('Display element', 'vk-blocks')}
						value={displayElement}
						onChange={(value) =>
							setAttributes({ displayElement: value })
						}
						options={[
							{
								value: 'please-select',
								label: __('Please Select', 'vk-blocks'),
							},
							{
								value: 'post-type',
								label: __(
									'Post type name of the page being viewed',
									'vk-blocks'
								),
							},
							{
								value: 'ancestor-page',
								label: __(
									'Page name in the ancestor hierarchy of the displayed page',
									'vk-blocks'
								),
							},
							// {
							// 	value: 'custom-field',
							// 	label: __('カスタムフィールド', 'vk-blocks'),
							// },
						]}
					/>
					{displayElement === 'ancestor-page' &&
						<div className="alert alert-warning">
							{__(
								'このブロックは親階層を持つ固定ページ以外のページでは表示されません。',
								'vk-blocks'
							)}
						</div>
					}
					<DynamicTextEditControls
						tagName={TagName}
						onSelectTagName={(value) =>
							setAttributes({ tagName: value })
						}
					/>
					<div className="alert alert-info">
						{__(
							'If you want to specify the style of characters, put this block inside the Row block and specify the style in the Row block.',
							'vk-blocks'
						)}
					</div>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>{editContent}</div>
		</>
	);
}
