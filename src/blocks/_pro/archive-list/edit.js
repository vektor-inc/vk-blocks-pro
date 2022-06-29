// import WordPress Scripts
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

// Load VK Blocks Compornents
import { DisplayItemsControl } from '@vkblocks/components/display-items-control';
import { ColumnLayoutControl } from '@vkblocks/components/column-layout-control';

export default function PostListEdit(props) {
	const { attributes, setAttributes, name } = props;
	const { title, postType } = attributes;
	attributes.name = name;

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Archive List Setting', 'vk-blocks')}>
					<TextControl
						label={__('Title', 'vk-blocks')}
						value={title}
						onChange={(value) => setAttributes({ title: value })}
					/>
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
				</PanelBody>
				<ColumnLayoutControl {...props} />
				<DisplayItemsControl {...props} />
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
