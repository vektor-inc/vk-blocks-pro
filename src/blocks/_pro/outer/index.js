/**
 * outer block type
 */
import { ReactComponent as Icon } from './icon.svg';
import { useEffect } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated/';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />,
	edit,
	save,
	deprecated,
};

const generateInlineCss = (attributes) => {
	let {
		clientId,
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

	const containerSelector = `.vkb-outer-${clientId} .vk_outer_container`;
	return `
	${containerSelector}{
		padding-left:${innerSideSpaceValueMobile}${innerSideSpaceUnit};
		padding-right:${innerSideSpaceValueMobile}${innerSideSpaceUnit};
	}
	@media (min-width: 577px) {
		${containerSelector}{
			padding-left:${innerSideSpaceValueTablet}${innerSideSpaceUnit};
			padding-right:${innerSideSpaceValueTablet}${innerSideSpaceUnit};
		}
	}
	@media (min-width: 769px) {
		${containerSelector}{
			padding-left:${innerSideSpaceValuePC}${innerSideSpaceUnit};
			padding-right:${innerSideSpaceValuePC}${innerSideSpaceUnit};
		}
	}
	`;
};

addFilter(
	'editor.BlockEdit',
	'vk-blocks/outer-addInlineEditorsCss',
	createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			const { attributes, setAttributes, clientId } = props;

			if ('vk-blocks/outer' === props.name) {
				useEffect(() => {
					setAttributes({ clientId });
				}, []);

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

			const cssTag = generateInlineCss(attributes);

			// 最新版
			if (-1 === deprecatedFuncIndex || deprecated[deprecatedFuncIndex].filters?.includes('addInlineFrontCss')) {
				// NOTE: useBlockProps + style要素を挿入する場合、useBlockPropsを使った要素が最初（上）にこないと、
				// カスタムクラスを追加する処理が失敗する
				return (
					<>
						{el}
						<style type="text/css">{cssTag}</style>
					</>
				);
			}
		}
		return el;
	},
	11
);
