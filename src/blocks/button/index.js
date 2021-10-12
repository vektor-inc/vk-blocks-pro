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
	const { clientId, buttonType, buttonColorCustom } = attributes;
	let inlineCss = '';

	// 規定カラーの場合
	if (
		buttonColorCustom === 'undefined' ||
		buttonColorCustom === undefined ||
		buttonColorCustom === null
	) {
		return inlineCss;
	}

	if (buttonType === '0' || buttonType === null) {
		inlineCss = `
		.vk_button-${clientId} .vk_button_link.btn {
			background-color: ${buttonColorCustom};
			border: 1px solid ${buttonColorCustom};
			color: #fff;
		}
		`;
	}

	if (buttonType === '1') {
		inlineCss = `
		.vk_button-${clientId} .vk_button_link.btn {
			background-color: transparent;
			border: 1px solid ${buttonColorCustom};
			color: ${buttonColorCustom};
		}
		.vk_button-${clientId} .vk_button_link.btn:hover {
			background-color: ${buttonColorCustom};
			border: 1px solid ${buttonColorCustom};
			color: #fff;
		}
		`;
	}

	if (buttonType === '2') {
		inlineCss = `
		.vk_button-${clientId} .vk_button_link-type-text {
			color: ${buttonColorCustom};
		}
		`;
	}
	return inlineCss;
};

addFilter(
	'editor.BlockEdit',
	'vk-blocks/button-addInlineEditorsCss',
	createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			const { attributes, setAttributes, clientId } = props;
			const { buttonColorCustom } = attributes;

			if ('vk-blocks/button' === props.name) {
				useEffect(() => {
					setAttributes({ clientId });
				}, []);
				if (buttonColorCustom) {
					const cssTag = generateInlineCss(attributes);

					return (
						<>
							<BlockEdit {...props} />
							<style type="text/css">{cssTag}</style>
						</>
					);
				}
				return (
					<>
						<BlockEdit {...props} />
					</>
				);
			}
			return <BlockEdit {...props} />;
		};
	}, 'addInlineEditorsCss')
);

addFilter(
	'blocks.getSaveElement',
	'vk-blocks/button-addInlineFrontCss',
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
				const { buttonColorCustom } = attributes;
				if (buttonColorCustom) {
					const cssTag = generateInlineCss(attributes);
					return (
						<>
							{el}
							<style type="text/css">{cssTag}</style>
						</>
					);
				}
				return (
					<>
						{el}
					</>
				);

				//後方互換
			}
			let DeprecatedHook;
			// Deprecated Hooks が Deprecated Save関数より少ない場合にエラーが出ないように。
			if (deprecatedHooks.length > deprecatedFuncIndex) {
				DeprecatedHook = deprecatedHooks[deprecatedFuncIndex];
			} else {
				DeprecatedHook = deprecatedHooks[deprecatedHooks.length - 1];
			}
			return <DeprecatedHook el={el} attributes={attributes} />;
		}
		return el;
	},
	11
);
