/**
 * Button block type
 *
 */
import { __ } from '@wordpress/i18n';
import { ReactComponent as Icon } from './icon.svg';
import { title, iconName, url, iconUser } from '@vkblocks/utils/example-data';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import { deprecated } from './deprecated/save/';
import deprecatedHooks from './deprecated/hooks';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { colorSlugToColorCode } from '@vkblocks/utils/color-slug-to-color-code';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Button', 'vk-blocks'),
	icon: <Icon />,
	example: {
		attributes: {
			content: iconName,
			subCaption: title,
			buttonUrl: url,
			buttonTarget: false,
			buttonSize: 'md',
			buttonType: '0',
			buttonColor: 'primary',
			buttonColorCustom: 'undefined',
			buttonAlign: 'left',
			fontAwesomeIconBefore: iconUser,
			fontAwesomeIconAfter: iconUser,
		},
	},
	edit,
	save,
	deprecated,
};

const generateInlineCss = (attributes) => {
	const { buttonColorCustom, clientId } = attributes;
	let inlineCss = '';

	// カスタムカラーの場合
	if (buttonColorCustom !== undefined) {
		if (!isHexColor(buttonColorCustom)) {
			inlineCss += `:root .has-${buttonColorCustom}-color {
				--vk-current-color: ${colorSlugToColorCode(buttonColorCustom)};
			}
			:root .has-${buttonColorCustom}-background-color {
				--vk-current-color: ${colorSlugToColorCode(buttonColorCustom)};
			}`;
		} else {
			inlineCss += `:root .vk_button-${clientId} {
				--vk-current-color: ${buttonColorCustom};
			}`;
		}
	}

	return inlineCss;
};

addFilter(
	'editor.BlockEdit',
	'vk-blocks/button',
	createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			const { attributes, setAttributes, clientId } = props;

			if ('vk-blocks/button' === props.name) {
				useEffect(() => {
					setAttributes({ clientId });
				}, [clientId]);
				const cssTag = generateInlineCss(attributes);
				if (cssTag !== '') {
					return (
						<>
							<BlockEdit {...props} />
							<style type="text/css">{cssTag}</style>
						</>
					);
				}
				return <BlockEdit {...props} />;
			}
			return <BlockEdit {...props} />;
		};
	}, 'addInlineEditorsCss')
);

addFilter(
	'blocks.getSaveElement',
	'vk-blocks/button',
	(el, type, attributes) => {
		if ('vk-blocks/button' === type.name) {
			//現在実行されている deprecated内の save関数のindexを取得
			const deprecatedFuncIndex = deprecated.findIndex(
				(item) => item.save === type.save
			);

			// 最新版
			if (-1 === deprecatedFuncIndex) {
				// NOTE: useBlockProps + style要素を挿入する場合、useBlockPropsを使った要素が最初（上）にこないと、
				// カスタムクラスを追加する処理が失敗する[
				const cssTag = generateInlineCss(attributes);
				if (cssTag !== '') {
					return (
						<>
							{el}
							<style type="text/css">{cssTag}</style>
						</>
					);
				}
				return el;

				//後方互換
			}
			const DeprecatedHook = deprecatedHooks[deprecatedFuncIndex];
			return <DeprecatedHook el={el} attributes={attributes} />;
		}
		return el;
	},
	11
);
