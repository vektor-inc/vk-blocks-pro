/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
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

		const handleReturnToList = () => {
			setAttributes({ returnToList: !returnToList }); // トグルとして使用
			// 親ブロック (list) に戻る処理
			const clientId =
				select('core/block-editor').getSelectedBlockClientId();
			const parentBlockId =
				select('core/block-editor').getBlockRootClientId(clientId);
			dispatch('core/block-editor').selectBlock(parentBlockId);
		};

		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody
						title={__('List Item Settings', 'vk-blocks-pro')}
						initialOpen={true}
					>
						<Button isSecondary onClick={handleReturnToList}>
							{__('Return to List', 'vk-blocks-pro')}
						</Button>
					</PanelBody>
				</InspectorControls>
			</>
		);
	},
	'addMyCustomBlockControls'
);
addFilter('editor.BlockEdit', 'vk-blocks/list-item-style', addBlockControl);
