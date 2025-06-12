import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { ExcludeFromTocToggle } from '@vkblocks/components/exclude-from-toc-toggle';
import { addExcludeFromTocAttribute } from '@vkblocks/utils/is-exclude-from-toc';

// 目次設定属性追加
addFilter(
	'blocks.registerBlockType',
	'vk-blocks-pro/core-heading-exclude-from-toc-attr',
	(settings, name) =>
		name === 'core/heading'
			? addExcludeFromTocAttribute(settings)
			: settings
);

// 目次設定UI追加
const withInspectorControls = createHigherOrderComponent(
	(BlockEdit) => (props) => {
		if (props.name !== 'core/heading') {
			return <BlockEdit {...props} />;
		}
		return (
			<>
				<BlockEdit {...props} />
				<ExcludeFromTocToggle
					attributes={props.attributes}
					setAttributes={props.setAttributes}
				/>
			</>
		);
	},
	'withInspectorControls'
);

addFilter(
	'editor.BlockEdit',
	'vk-blocks-pro/core-heading-exclude-from-toc-ui',
	withInspectorControls
);

// save時にdata-vk-toc-excludeを付与
addFilter(
	'blocks.getSaveContent.extraProps',
	'vk-blocks-pro/core-heading-exclude-from-toc-save',
	(extraProps, blockType, attributes) => {
		if (blockType.name === 'core/heading' && attributes.excludeFromToc) {
			return {
				...extraProps,
				'data-vk-toc-exclude': 'true',
			};
		}
		return extraProps;
	}
);
