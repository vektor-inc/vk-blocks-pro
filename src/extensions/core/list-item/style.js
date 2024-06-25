/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { PanelBody, Button } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { select, dispatch } from '@wordpress/data';

const isValidBlockType = (name) => {
	const validBlockTypes = ['core/list-item'];
	return validBlockTypes.includes(name);
};

export const addAttribute = (settings) => {
	if (isValidBlockType(settings.name)) {
		settings.attributes = {
			...settings.attributes,
			returnToList: {
				type: 'boolean',
				default: false,
			},
		};
	}
	return settings;
};
addFilter(
	'blocks.registerBlockType',
	'vk-blocks/list-item-style',
	addAttribute
);

export const addBlockControl = createHigherOrderComponent(
	(BlockEdit) => (props) => {
		const { name, attributes, setAttributes } = props;
		const { returnToList } = attributes;

		if (!isValidBlockType(name)) {
			return <BlockEdit {...props} />;
		}

		// 親ブロックのユーザーフレンドリーな名前を取得する関数
		const getParentBlockTitle = () => {
			const clientId = select('core/block-editor').getSelectedBlockClientId();
			const parentClientId = select('core/block-editor').getBlockHierarchyRootClientId(clientId);
			const parentBlock = select('core/block-editor').getBlock(parentClientId);
			if (parentBlock) {
				const parentBlockType = select('core/blocks').getBlockType(parentBlock.name);
				return parentBlockType ? parentBlockType.title : __('Parent Block', 'vk-blocks-pro');
			}
			return __('Parent Block', 'vk-blocks-pro');
		};

		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody
						title={__('List Item Settings', 'vk-blocks-pro')}
						initialOpen={true}
					>
						<Button
							isSecondary
							onClick={() => {
								setAttributes({ returnToList: !returnToList }); // トグルとして使用
								// 親ブロック (list) に戻る処理
								const clientId =
									select(
										'core/block-editor'
									).getSelectedBlockClientId();
								const parentClientId =
									select(
										'core/block-editor'
									).getBlockHierarchyRootClientId(clientId);
								dispatch('core/block-editor').selectBlock(
									parentClientId
								);
							}}
						>
							{sprintf(__('Select parent block: %s', 'vk-blocks-pro'), getParentBlockTitle())}
						</Button>
					</PanelBody>
				</InspectorControls>
			</>
		);
	},
	'addMyCustomBlockControls'
);
addFilter(
	'editor.BlockEdit',
	'vk-blocks/list-item-style',
	addBlockControl
);
