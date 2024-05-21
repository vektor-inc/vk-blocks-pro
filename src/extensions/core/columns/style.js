/**
 * columns-style block type
 *
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { PanelBody, ToggleControl, Icon } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { ReactComponent as IconSVG } from './icon.svg';

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

			// アイコンのスタイル
			let iconStyle = {
				width: '24px',
				height: '24px',
			};

			if (reverse) {
				iconStyle = {
					...iconStyle,
					color: '#fff',
					background: '#1e1e1e',
				};
			}

			return (
				<>
					<BlockEdit {...props} />
					<InspectorControls>
						<PanelBody
							title={__('Column Direction', 'vk-blocks-pro')}
							icon={<Icon icon={IconSVG} style={iconStyle} />}
							initialOpen={false}
						>
							<ToggleControl
								label={__('Reverse', 'vk-blocks-pro')}
								checked={reverse}
								onChange={(checked) => {
									// 既存のクラス名
									const existClass = className
										? className.split(' ')
										: [];
									let newClassNameArray = [];
									if (existClass) {
										// いったん削除
										newClassNameArray = existClass.filter(
											(item) => {
												return !item.match(
													/is-vk-row-reverse/
												);
											}
										);
									}

									// reverse クラスを付与
									const rereverseClass = [
										{
											'is-vk-row-reverse': checked,
										},
									];
									newClassNameArray = classnames(
										newClassNameArray,
										rereverseClass
									);

									setAttributes({
										className: newClassNameArray,
										reverse: checked,
									});
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
