/**
 * outer block type
 */
import { ReactComponent as Icon } from './icon.svg';
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import classnames from 'classnames';

import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated/';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Outer', 'vk-blocks'),
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
			if (-1 === deprecatedFuncIndex) {
				// NOTE: useBlockProps + style要素を挿入する場合、useBlockPropsを使った要素が最初（上）にこないと、
				// カスタムクラスを追加する処理が失敗する
				const {
					vkb_hidden, // eslint-disable-line camelcase
					vkb_hidden_xxl, // eslint-disable-line camelcase
					vkb_hidden_xl_v2, // eslint-disable-line camelcase
					vkb_hidden_xl, // eslint-disable-line camelcase
					vkb_hidden_lg, // eslint-disable-line camelcase
					vkb_hidden_md, // eslint-disable-line camelcase
					vkb_hidden_sm, // eslint-disable-line camelcase
					vkb_hidden_xs, // eslint-disable-line camelcase
				} = attributes;

				if (
					vkb_hidden || // eslint-disable-line camelcase
					vkb_hidden_xxl || // eslint-disable-line camelcase
					vkb_hidden_xl_v2 || // eslint-disable-line camelcase
					vkb_hidden_xl || // eslint-disable-line camelcase
					vkb_hidden_lg || // eslint-disable-line camelcase
					vkb_hidden_md || // eslint-disable-line camelcase
					vkb_hidden_sm || // eslint-disable-line camelcase
					vkb_hidden_xs // eslint-disable-line camelcase
				) {
					const custom = vkb_hidden && 'vk_hidden'; // eslint-disable-line camelcase
					const customXxl = vkb_hidden_xxl && 'vk_hidden-xxl'; // eslint-disable-line camelcase
					const customXl2 = vkb_hidden_xl_v2 && 'vk_hidden-xl-v2'; // eslint-disable-line camelcase
					const customXl = vkb_hidden_xl && 'vk_hidden-xl'; // eslint-disable-line camelcase
					const customLg = vkb_hidden_lg && 'vk_hidden-lg'; // eslint-disable-line camelcase
					const customMd = vkb_hidden_md && 'vk_hidden-md'; // eslint-disable-line camelcase
					const customSm = vkb_hidden_sm && 'vk_hidden-sm'; // eslint-disable-line camelcase
					const customXs = vkb_hidden_xs && 'vk_hidden-xs'; // eslint-disable-line camelcase

					if (el) {
						el = {
							...el,
							...{
								props: {
									...el.props,
									...{
										className: classnames(
											el.props.className,
											custom,
											customXxl,
											customXl2,
											customXl,
											customLg,
											customMd,
											customSm,
											customXs
										),
									},
								},
							},
						};
					}
				}
				return (
					<>
						{el}
						<style type="text/css">{cssTag}</style>
					</>
				);
			}
		}
		return el;
	}
);
