import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { vkbBlockEditor } from '@vkblocks/utils/depModules';
const { InspectorControls, RichText } = vkbBlockEditor;

export default function AlertEdit({ attributes, setAttributes, className }) {
	const { style, content } = attributes;

	const onChangeContent = (newContent) => {
		setAttributes({ content: newContent });
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Style Settings', 'vk-blocks')}>
					<SelectControl
						value={style}
						onChange={(value) => setAttributes({ style: value })}
						options={[
							{
								label: __('Success', 'vk-blocks'),
								value: 'success',
							},
							{ label: __('Info', 'vk-blocks'), value: 'info' },
							{
								label: __('Warning', 'vk-blocks'),
								value: 'warning',
							},
							{
								label: __('Danger', 'vk-blocks'),
								value: 'danger',
							},
						]}
					/>
				</PanelBody>
			</InspectorControls>
			<div className={`${className} alert alert-${style}`}>
				<RichText
					tagName="p"
					onChange={onChangeContent}
					value={content}
				/>
			</div>
		</Fragment>
	);
}
