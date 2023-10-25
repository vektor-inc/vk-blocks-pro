/*globals vk_block_archve_list_post_type_params */
// import WordPress Scripts
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

const getPostTypesSelect = () => {
	const types = vk_block_archve_list_post_type_params.post_types.map(
		(item) => {
			return {
				label: item.label,
				value: item.slug,
			};
		}
	);
	return types;
};

export default function PostListEdit(props) {
	const { attributes, setAttributes, name } = props;
	const { postType, displayType, displayDropdown, showCount } = attributes;
	attributes.name = name;

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Archive List Setting', 'vk-blocks-pro')}>
					<SelectControl
						label={__('Post type', 'vk-blocks-pro')}
						value={postType}
						options={getPostTypesSelect()}
						onChange={(value) => setAttributes({ postType: value })}
					/>
					<SelectControl
						label={__('Archive type', 'vk-blocks-pro')}
						value={displayType}
						onChange={(value) =>
							setAttributes({ displayType: value })
						}
						options={[
							{
								value: 'monthly',
								label: __('Monthly', 'vk-blocks-pro'),
							},
							{
								value: 'yearly',
								label: __('Yearly', 'vk-blocks-pro'),
							},
						]}
					/>
					<ToggleControl
						label={__('Display as dropdown', 'vk-blocks-pro')}
						checked={displayDropdown}
						onChange={(checked) =>
							setAttributes({ displayDropdown: checked })
						}
					/>
					<ToggleControl
						label={__('Show post counts', 'vk-blocks-pro')}
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
