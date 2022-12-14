import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl } from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

export default function DynamicTextEdit(props) {
	const { attributes, setAttributes } = props;
	const { displayElement } = attributes;

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Display Element', 'vk-blocks')}>
					<SelectControl
						label={__('Select Display Element', 'vk-blocks')}
						value={displayElement}
						onChange={(value) =>
							setAttributes({ displayElement: value })
						}
						options={[
							{
								value: 'please-select',
								label: __('選択してください', 'vk-blocks'),
							},
							{
								value: 'post-type',
								label: __(
									'表示中のページの投稿タイプ名',
									'vk-blocks'
								),
							},
							{
								value: 'ancestor-page',
								label: __(
									'表示中のページの先祖階層の固定ページ名',
									'vk-blocks'
								),
							},
							{
								value: 'custom-field',
								label: __('カスタムフィールド', 'vk-blocks'),
							},
						]}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<ServerSideRender
					block="vk-blocks/dynamic-text"
					attributes={attributes}
				/>
			</div>
		</>
	);
}
