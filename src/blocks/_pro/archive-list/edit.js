// import WordPress Scripts
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

// Load VK Blocks Utils
import { usePostTypes } from '@vkblocks/utils/hooks';

const getPostTypesSelect = (data) => {
	const types = data.map((item) => {
		return {
			value: item.slug,
			label: item.label,
		};
	});

	return types;
};

export default function PostListEdit(props) {
	const { attributes, setAttributes, name } = props;
	const { postType, displayType, displayDropdown, showCount } = attributes;
	attributes.name = name;

	const blockProps = useBlockProps({
		className: `vk_icon`,
	});

	// 投稿タイプ
	const postTypes = usePostTypes({ public: true });
	let postTypesProps = postTypes.map((item) => {
		return {
			label: item.name,
			slug: item.slug,
		};
	});
	// メディアと再利用ブロックを除外
	postTypesProps = postTypesProps.filter(
		(item) =>
			'attachment' !== item.slug && 'wp_block' !== item.slug
	);

	const postTypesSelect = getPostTypesSelect(postTypesProps);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Archive List Setting', 'vk-blocks')}>
					<SelectControl
						label={__('Post type', 'vk-blocks')}
						value={postType}
						options={postTypesSelect}
						onChange={(value) => setAttributes({ postType: value })}
					/>
					<SelectControl
						label={__('Archive type', 'vk-blocks')}
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
