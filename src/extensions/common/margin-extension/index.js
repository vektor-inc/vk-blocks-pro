/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { BlockControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { ToolbarDropdownMenu } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

/**
 * External dependencies
 */
import { find } from 'lodash';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { marginIcon, marginTopIcon, marginBottomIcon } from './icons';
import { isExcludesBlocks } from '@vkblocks/utils/is-excludes-blocks';

const DEFAULT_MARGIN_TOP_CONTROLS = [
	{
		title: __('Top lg', 'vk-blocks'),
		marginClass: 'vk_block-margin-lg--margin-top',
		flag: 'top',
	},
	{
		title: __('Top md', 'vk-blocks'),
		marginClass: 'vk_block-margin-md--margin-top',
		flag: 'top',
	},
	{
		title: __('Top sm', 'vk-blocks'),
		marginClass: 'vk_block-margin-sm--margin-top',
		flag: 'top',
	},
	{
		title: __('Top 0', 'vk-blocks'),
		marginClass: 'vk_block-margin-0--margin-top',
		flag: 'top',
	},
];

const DEFAULT_MARGIN_BOTTOM_CONTROLS = [
	{
		title: __('Bottom 0', 'vk-blocks'),
		marginClass: 'vk_block-margin-0--margin-bottom',
		flag: 'bottom',
	},
	{
		title: __('Bottom sm', 'vk-blocks'),
		marginClass: 'vk_block-margin-sm--margin-bottom',
		flag: 'bottom',
	},
	{
		title: __('Bottom md', 'vk-blocks'),
		marginClass: 'vk_block-margin-md--margin-bottom',
		flag: 'bottom',
	},
	{
		title: __('Bottom lg', 'vk-blocks'),
		marginClass: 'vk_block-margin-lg--margin-bottom',
		flag: 'bottom',
	},
];

const DEFAULT_MARGIN_CONTROLS = [
	...DEFAULT_MARGIN_TOP_CONTROLS,
	...DEFAULT_MARGIN_BOTTOM_CONTROLS,
];

export const isAddMargin = (blockName) => {
	const addExclude = [
		'vk-blocks/slider-item',
		'vk-blocks/card-item',
		'vk-blocks/icon-card-item',
		'vk-blocks/select-post-list-item',
		'vk-blocks/grid-column',
		'vk-blocks/grid-column-item',
	];
	return isExcludesBlocks({ blockName, addExclude });
};

/* Filter of blocks.registerBlockType
	/*-----------------------------------*/

/* Filter of editor.BlockEdit
	/*-----------------------------------*/
addFilter(
	'editor.BlockEdit',
	'vk-blocks/margin-extension',
	createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			const { name, attributes, setAttributes } = props;
			const { marginTop, marginBottom, className } = attributes;
			const marginTopControls = DEFAULT_MARGIN_TOP_CONTROLS;
			const marginBottomControls = DEFAULT_MARGIN_BOTTOM_CONTROLS;
			const marginControls = DEFAULT_MARGIN_CONTROLS;
			// attributeの変数名がわかりにくいので別の変数にする
			const nowClass = className || '';
			const marginTopRegex = /vk_block-margin-(|0|sm|md|lg|)--margin-top/;
			const marginBottomRegex =
				/vk_block-margin-(|0|sm|md|lg|)--margin-bottom/;

			// deprecated
			// 過去に使用していたmarginTop,marginBottomをclassNameに入れ,過去のmarginTopやmarginBottomはundefinedにする
			const isMatchTop = marginTopRegex.test(marginTop);
			const isMatchBottom = marginBottomRegex.test(marginBottom);
			useEffect(() => {
				if (isMatchTop || isMatchBottom) {
					setAttributes({
						className: classnames({
							[nowClass]: nowClass,
							[marginTop]: isMatchTop,
							[marginBottom]: isMatchBottom,
						}),
					});
					setAttributes({ marginTop: undefined });
					setAttributes({ marginBottom: undefined });
				}
			}, []);

			// 追加CSSクラスを半角文字列で分けて配列化
			const nowClassArray = nowClass ? nowClass.split(' ') : [];
			// 現在カスタムcssに入っているvk_block-margin-(|0|sm|md|lg|)--margin-top,bottomクラス名を取得
			const activeMarginTopClassArray = nowClassArray.filter((item) => {
				return item.match(marginTopRegex);
			});
			const activeMarginBottomClassArray = nowClassArray.filter(
				(item) => {
					return item.match(marginBottomRegex);
				}
			);

			// 複数のクラス名が入っていた場合は最後のcssが当たるので最後のクラス名を取得する
			const activeMarginTopClass = activeMarginTopClassArray.slice(-1)[0];
			const activeMarginBottomClass =
				activeMarginBottomClassArray.slice(-1)[0];

			// アクティブマージンのObjectを作る
			const activeMarginTop = find(
				marginTopControls,
				(control) => control.marginClass === activeMarginTopClass
			);
			const activeMarginBottom = find(
				marginBottomControls,
				(control) => control.marginClass === activeMarginBottomClass
			);

			// 追加CSSに保存するクラスを作る関数
			const getNewClasses = (
				classArray, // 現在のクラス 配列
				clickedClass, // クリックされたクラス名 文字列
				spliceMarginClassName // アクティブなクラス名,削除するクラス名 文字列
			) => {
				// アクティブなクラスがなければ新規に新しいクラスを追加する
				if (spliceMarginClassName === undefined) {
					classArray.push(clickedClass);
					return classArray;
				}
				// 選択されているクラスがクリックされたらそのクラス名を削除する
				if (classArray.includes(clickedClass)) {
					const clickIndex = classArray.indexOf(clickedClass);
					classArray.splice(clickIndex, 1);
					return classArray;
				}
				// アクティブなクラス名を削除
				const spliceIndex = classArray.indexOf(spliceMarginClassName);
				classArray.splice(spliceIndex, 1);
				// 新しいクラスを追加する
				classArray.push(clickedClass);
				return classArray;
			};

			if (!isAddMargin(name)) {
				return <BlockEdit {...props} />;
			}
			return (
				<>
					<BlockEdit {...props} />
					<BlockControls group="block">
						<ToolbarDropdownMenu
							icon={
								<>
									{activeMarginTop &&
										!activeMarginBottom &&
										marginTopIcon}
									{!activeMarginTop &&
										activeMarginBottom &&
										marginBottomIcon}
									{activeMarginTop &&
										activeMarginBottom &&
										marginIcon}
									{!activeMarginTop &&
										!activeMarginBottom &&
										marginIcon}
									{activeMarginTop || activeMarginBottom ? (
										<span style={{ marginLeft: '8px' }}>
											{activeMarginTop &&
												activeMarginTop.title}
											{activeMarginTop &&
												activeMarginBottom && <br />}
											{activeMarginBottom &&
												activeMarginBottom.title}
										</span>
									) : null}
								</>
							}
							label={__('Margin the block', 'vk-blocks')}
							controls={marginControls.map((control) => {
								const { marginClass, flag } = control;
								const isActive =
									activeMarginTopClass === marginClass ||
									activeMarginBottomClass === marginClass;
								return {
									...control,
									isActive,
									icon:
										flag === 'top'
											? marginTopIcon
											: marginBottomIcon,
									onClick: () => {
										// 現在のクラス,クリックされたクラス,アクティブなクラス名をgetNewClassesに渡してクラス名を作り直す
										const newClasses = getNewClasses(
											nowClassArray,
											marginClass,
											flag === 'top'
												? activeMarginTopClass
												: activeMarginBottomClass
										);
										setAttributes({
											className: newClasses.join(' '),
										});
									},
								};
							})}
						/>
					</BlockControls>
				</>
			);
		};
	}, 'addMarginSection')
);
