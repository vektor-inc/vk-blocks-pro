// import WordPress Scripts
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl } from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

export default function DynamicTextEdit(props) {
	const { attributes, setAttributes } = props;
	const { displayElement } = attributes;

	let editContent;
	if (displayElement === 'please-select') {
		editContent = (
			<div className="alert alert-warning text-center">
				{__(
					'表示要素が選択されていないため、このブロックはレンダリングされません。',
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

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('表示要素の設定', 'vk-blocks')}>
					<SelectControl
						label={__('表示要素を選択', 'vk-blocks')}
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
			<div {...blockProps}>{editContent}</div>
		</>
	);
}
