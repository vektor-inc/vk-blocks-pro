/**
 * outer block type
 */
import { ReactComponent as Icon } from './icon.svg';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated/save/';
import deprecatedHooks from './deprecated/hooks/';
import createWrapUnwrapTransforms from '@vkblocks/utils/wrap-unwrap';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />,
	transforms: createWrapUnwrapTransforms('vk-blocks/outer'),
	edit,
	save,
	deprecated,
};

const generateInlineCss = (attributes) => {
	let {
		blockId,
		innerSideSpaceValuePC,
		innerSideSpaceValueTablet,
		innerSideSpaceValueMobile,
		innerSideSpaceUnit,
	} = attributes;

	//For recovering block.
	if (undefined === innerSideSpaceUnit) {
		innerSideSpaceUnit = 'px';
	}
	if (undefined === innerSideSpaceValueMobile) {
		innerSideSpaceValueMobile = 0;
	}
	if (undefined === innerSideSpaceValueTablet) {
		innerSideSpaceValueTablet = 0;
	}
	if (undefined === innerSideSpaceValuePC) {
		innerSideSpaceValuePC = 0;
	}

	const containerSelector = `.vk_outer.vkb-outer-${blockId} > div > .vk_outer_container`;
	return `
	${containerSelector}{
		padding-left:${innerSideSpaceValueMobile}${innerSideSpaceUnit}!important;
		padding-right:${innerSideSpaceValueMobile}${innerSideSpaceUnit}!important;
	}
	@media (min-width: 576px) {
		${containerSelector}{
			padding-left:${innerSideSpaceValueTablet}${innerSideSpaceUnit}!important;
			padding-right:${innerSideSpaceValueTablet}${innerSideSpaceUnit}!important;
		}
	}
	@media (min-width: 992px) {
		${containerSelector}{
			padding-left:${innerSideSpaceValuePC}${innerSideSpaceUnit}!important;
			padding-right:${innerSideSpaceValuePC}${innerSideSpaceUnit}!important;
		}
	}
	`;
};

addFilter(
	'editor.BlockEdit',
	'vk-blocks/outer-addInlineEditorsCss',
	createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			const { attributes } = props;

			if ('vk-blocks/outer' === props.name) {
				const cssTag = generateInlineCss(attributes);
				return (
					<>
						<BlockEdit {...props} />
						<style type="text/css">{cssTag}</style>
					</>
				);
			}
			return <BlockEdit {...props} />;
		};
	}, 'addInlineEditorsCss')
);

addFilter(
	'blocks.getSaveElement',
	'vk-blocks/outer-addInlineFrontCss',
	(el, type, attributes) => {
		if ('vk-blocks/outer' === type.name) {
			//現在実行されている deprecated内の save関数のindexを取得
			const deprecatedFuncIndex = deprecated.findIndex(
				(item) => item.save === type.save
			);

			// 最新版
			if (-1 === deprecatedFuncIndex) {
				// NOTE: useBlockProps + style要素を挿入する場合、useBlockPropsを使った要素が最初（上）にこないと、
				// カスタムクラスを追加する処理が失敗する
				const cssTag = generateInlineCss(attributes);
				return (
					<>
						{el}
						<style type="text/css">{cssTag}</style>
					</>
				);
			}

			//後方互換
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
