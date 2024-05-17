/**
 * columns-style block type
 *
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import classnames from 'classnames';

const isValidBlockType = (name) => {
	const validBlockTypes = ['core/columns'];
	return validBlockTypes.includes(name);
};

export const addAttribute = (settings) => {
	if (isValidBlockType(settings.name)) {
		settings.attributes = {
			...settings.attributes,
			reverse: {
				type: 'boolean',
			},
		};
	}
	return settings;
};
addFilter('blocks.registerBlockType', 'vk-blocks/columns-style', addAttribute);

export const addBlockControl = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if (isValidBlockType(props.name) && props.isSelected) {
			const { attributes, setAttributes } = props;
			const { reverse, className } = attributes;

			return (
				<>
					<BlockEdit {...props} />
					<InspectorControls>
						<PanelBody
							title={__('カラムの方向', 'vk-blocks-pro')}
							initialOpen={true}
							className="columns-row-reverse"
						>
							<ToggleControl
								label="Reverse"
								checked={ reverse }
								onChange={(checked) => {
									// 既存のクラス名
									const nowClassArray = className ? className.split(' ') : [];
									
									// 新しいクラス名の配列
									let newClassNameArray = nowClassArray
									? nowClassArray
									: [];

									// クラス名 is-style-vk-column-row-reverse をいったん削除
									if (nowClassArray) {
										newClassNameArray = nowClassArray.filter(
											(item) => {
												return !item.match(
													/is-style-vk-column-row-reverse/
												);
											}
										);
									}
									

									// reverse クラスを付与
									const rereverseClass = [ {
										'is-style-vk-column-row-reverse': checked,
									} ]
									newClassNameArray = classnames( newClassNameArray, rereverseClass );

									setAttributes({
										className: newClassNameArray,
										reverse: checked,
									})
								}}
            				/>
						</PanelBody>
					</InspectorControls>
				</>
			);
		}
		
		return <BlockEdit {...props} />;
	};
}, 'addMyCustomBlockControls');

addFilter('editor.BlockEdit', 'vk-blocks/columns-style', addBlockControl);

/**
 * Override the default block element to include elements styles.
 */
const withElementsStyles = createHigherOrderComponent(
	(BlockListBlock) => (props) => {
		const { name, attributes } = props;
		const { reverse, className } = attributes;

		if (!isValidBlockType(name)) {
			return <BlockListBlock {...props} />;
		}

		const rereverseClass = [ {
			'is-style-vk-column-row-reverse': reverse,
		} ]

		return (
			<>
				<BlockListBlock { ...props }
    				className={ classnames( className, rereverseClass ) }
				/>
			</>
		);
	}
);
addFilter(
	'editor.BlockListBlock',
	'vk-blocks/columns-style',
	withElementsStyles
);