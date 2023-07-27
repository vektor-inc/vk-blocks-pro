/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { PanelBody, ToggleControl, Button } from '@wordpress/components';
import {
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { emptyStringToUndefined } from '@vkblocks/utils/empty-string-to-undefined';

/**
 * Override the default edit UI to include layout controls
 */
export const withInspectorControls = createHigherOrderComponent(
	(BlockEdit) => (props) => {
		const { name, attributes, setAttributes, clientId } = props;
		if (name !== 'core/columns') {
			return <BlockEdit {...props} />;
		}

		const { isParentsBlogCard } = useSelect(
			(select) => {
				const { getBlockParents, getBlockName } =
					select(blockEditorStore);
				const parentsIdArray = getBlockParents(clientId);
				const _isParentsBlogCard = parentsIdArray.some(
					(_clientId) =>
						getBlockName(_clientId) === 'vk-blocks/blog-card'
				);

				return {
					isParentsBlogCard: _isParentsBlogCard,
				};
			},
			[clientId]
		);
		if (!isParentsBlogCard) {
			return <BlockEdit {...props} />;
		}

		const { isStackedOnMobile, className } = attributes;
		const flexWrapReverseClassName = 'vk_flex-wrap-reverse-on-mobile';

		// 追加CSSクラスを半角文字列で分けて配列化
		const nowClassArray = className ? className.split(' ') : [];

		// アクティブなクラスかどうか
		const isActiveClass = (targetClass) => {
			const activeClassArray = [];
			nowClassArray.forEach((item) => {
				if (item === targetClass) {
					activeClassArray.push(targetClass);
				}
			});
			return activeClassArray[0] === targetClass ? true : false;
		};

		// classNameをセット
		const setNewClass = (checked, targetClass) => {
			if (checked) {
				nowClassArray.push(targetClass);
			} else {
				const clickIndex = nowClassArray.indexOf(targetClass);
				nowClassArray.splice(clickIndex, 1);
			}
			setAttributes({
				className: emptyStringToUndefined(nowClassArray.join(' ')),
			});
		};

		useEffect(() => {
			if (!isStackedOnMobile) {
				setNewClass(false, flexWrapReverseClassName);
			}
		}, [isStackedOnMobile]);

		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody>
						<ToggleControl
							label={__(
								'モバイルでは逆方向に折り返す',
								'vk-blocks-pro'
							)}
							disabled={!isStackedOnMobile}
							checked={isActiveClass(flexWrapReverseClassName)}
							onChange={(checked) => {
								setNewClass(checked, flexWrapReverseClassName);
							}}
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	},
	'withInspectorControls'
);

addFilter(
	'editor.BlockEdit',
	'vk-blocks/editor/core-columns/with-inspector-controls',
	withInspectorControls
);

/**
 * Override the default edit UI to include layout controls
 */
export const withInspectorControls2 = createHigherOrderComponent(
	(BlockEdit) => (props) => {
		const { clientId } = props;
		const { isParentsBlogCard } = useSelect(
			(select) => {
				const { getBlockParents, getBlockName } =
					select(blockEditorStore);
				const parentsIdArray = getBlockParents(clientId);
				const _isParentsBlogCard = parentsIdArray.some(
					(_clientId) =>
						getBlockName(_clientId) === 'vk-blocks/blog-card'
				);

				return {
					isParentsBlogCard: _isParentsBlogCard,
				};
			},
			[clientId]
		);
		if (!isParentsBlogCard) {
			return <BlockEdit {...props} />;
		}

		const { selectBlock } = useDispatch(blockEditorStore);
		const { firstParentClientId } = useSelect((select) => {
			const { getBlockParents, getSelectedBlockClientId, getBlockName } =
				select(blockEditorStore);
			const selectedBlockClientId = getSelectedBlockClientId();
			const parents = getBlockParents(selectedBlockClientId);
			// parents のid配列から最後のvk-blocks/blog-cardを抽出
			let parentBlogCardClientId;
			for (let i = parents.length - 1; i >= 0; i--) {
				const element = parents[i];
				if (getBlockName(element) === 'vk-blocks/blog-card') {
					parentBlogCardClientId = element;
					break;
				}
			}
			return {
				firstParentClientId: parentBlogCardClientId,
			};
		}, []);

		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody>
						<Button
							onClick={() => selectBlock(firstParentClientId)}
							variant="secondary"
						>
							{__(
								'親のブログカードブロックを選択',
								'vk-blocks-pro'
							)}
						</Button>
					</PanelBody>
				</InspectorControls>
			</>
		);
	},
	'withInspectorControls2'
);

addFilter(
	'editor.BlockEdit',
	'vk-blocks/editor/blog-card/with-inspector-controls',
	withInspectorControls2
);
