// import WordPress Scripts
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

export default function PostListEdit(props) {
	const { attributes, setAttributes, name } = props;
	const { postType, displayType, displayDropdown, showCount } = attributes;
	attributes.name = name;

	const blockProps = useBlockProps({
		className: `vk_icon`,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Archive List Setting', 'vk-blocks')}>
					<SelectControl
						label={__('Post Type', 'vk-blocks')}
						value={postType}
						onChange={(value) => setAttributes({ postType: value })}
						options={[
							{
								value: 'post',
								label: __('Post', 'vk-blocks'),
							},
						]}
					/>
					<SelectControl
						label={__('Archive Type', 'vk-blocks')}
						value={displayType}
						onChange={(value) =>
							setAttributes({ displayType: value })
						}
						options={[
							{
								value: 'monthly',
								label: __('Monthly', 'vk-blocks'),
							},
							{
								value: 'yearly',
								label: __('Yearly', 'vk-blocks'),
							},
						]}
					/>
					<ToggleControl
						label={__('Display as dropdown', 'vk-blocks')}
						checked={displayDropdown}
						onChange={(checked) =>
							setAttributes({ displayDropdown: checked })
						}
					/>
					<ToggleControl
						label={__('Show post counts', 'vk-blocks')}
						checked={showCount}
						onChange={(checked) =>
							setAttributes({ showCount: checked })
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<ServerSideRender
					block="vk-blocks/archive-list"
					attributes={attributes}
				/>
			</div>
		</>
	);
}
