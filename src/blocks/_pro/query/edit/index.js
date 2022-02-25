/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { cloneBlock } from '@wordpress/blocks';
import { useInstanceId } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import {
	BlockControls,
	InspectorControls,
	useBlockProps,
	store as blockEditorStore,
	useInnerBlocksProps,
	__experimentalBlockPatternSetup as BlockPatternSetup, // eslint-disable-line
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import QueryToolbar from './query-toolbar';
import QueryInspectorControls from './inspector-controls';
import QueryPlaceholder from './query-placeholder';
import { DEFAULTS_POSTS_PER_PAGE } from '../constants';
import { getFirstQueryClientIdFromBlocks } from '../utils';

const TEMPLATE = [['vk-blocks/post-template']];
// QueryContentの中身を作る
export function QueryContent({ attributes, setAttributes }) {
	const {
		queryId,
		query,
		displayLayout,
		tagName: TagName = 'div',
		// layout = {},
	} = attributes;
	/**
	 * __unstableMarkNextChangeAsNotPersistent
	 * https://github.com/WordPress/gutenberg/pull/19521/files#diff-d1fbd3af72ee0220c5c3ab2952a24d818174aed711b9a50b57c9544218a63988
	 */
	const { __unstableMarkNextChangeAsNotPersistent } =
		useDispatch(blockEditorStore);
	const instanceId = useInstanceId(QueryContent);
	/**
	 * theme.jsonでlayoutを設定している場合はlayoutを編集できるようなっていたが
	 * __experimentalLayoutなのでコメントアウト
	 * https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#settings_defaults
	 */
	// const { themeSupportsLayout } = useSelect((select) => {
	// 	const { getSettings } = select(blockEditorStore);
	// 	return { themeSupportsLayout: getSettings()?.supportsLayout };
	// }, []);
	// const defaultLayout = useSetting('layout') || {};
	// const usedLayout = !!layout && layout.inherit ? defaultLayout : layout;
	const blockProps = useBlockProps({ className: `vk_query` });
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: TEMPLATE,
	});
	// １ページに表示する記事数
	const { postsPerPage } = useSelect((select) => {
		const { getSettings } = select(blockEditorStore);
		return {
			postsPerPage:
				+getSettings().postsPerPage || DEFAULTS_POSTS_PER_PAGE,
		};
	}, []);
	/**
	 * 初期化ロジックが発生し、いくつかの属性（例：queryId）に値が設定されるような効果が実行されています。
	 * これらの更新は、元に戻すと再びリセットされる `undo trap` を引き起こす可能性があるので、`__unstableMarkNextChangeAsNotPersistent` でこれらの変更を持続しないようにマークしておく必要があります。
	 *
	 * レンダリング後に更新がバッチ処理され、異なるクエリプロパティの変更が行われるため、クエリプロパティ（オブジェクト）の変更は、同じコールバック内にある必要があります。
	 * 以前の希望する変更を上書きしてしまうことになります。
	 */
	useEffect(() => {
		const newQuery = {};
		if (!query.perPage && postsPerPage) {
			newQuery.perPage = postsPerPage;
		}
		if (!!Object.keys(newQuery).length) {
			__unstableMarkNextChangeAsNotPersistent();
			updateQuery(newQuery);
		}
	}, [query.perPage]);
	/**
	 * マルチクエリブロックのページネーションに必要です。
	 * 各ブロックのクエリパラメータは、そのIDにスコープされています。
	 *
	 * queryIdはブロック一意のIDを保存しようと試みているが再利用ブロックなどでIDが被るバグがある
	 * https://github.com/WordPress/gutenberg/pull/34750
	 */
	useEffect(() => {
		if (!Number.isFinite(queryId)) {
			__unstableMarkNextChangeAsNotPersistent();
			setAttributes({ queryId: instanceId });
		}
	}, [queryId, instanceId]);
	const updateQuery = (newQuery) =>
		setAttributes({ query: { ...query, ...newQuery } });
	// displayLayoutはlistかflexかカラム数はいくつかなどを保存する
	const updateDisplayLayout = (newDisplayLayout) =>
		setAttributes({
			displayLayout: { ...displayLayout, ...newDisplayLayout },
		});

	return (
		<>
			<QueryInspectorControls
				attributes={attributes}
				setQuery={updateQuery}
				setDisplayLayout={updateDisplayLayout}
			/>
			<BlockControls>
				<QueryToolbar
					attributes={attributes}
					setQuery={updateQuery}
					setDisplayLayout={updateDisplayLayout}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={__('HTML Settings', 'vk-blocks')}
					initialOpen={false}
				>
					<SelectControl
						label={__('HTML element', 'vk-blocks')}
						options={[
							{
								label: __('Default (<div>)', 'vk-blocks'),
								value: 'div',
							},
							{ label: '<main>', value: 'main' },
							{ label: '<section>', value: 'section' },
							{ label: '<aside>', value: 'aside' },
						]}
						value={TagName}
						onChange={(value) => setAttributes({ tagName: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<TagName {...innerBlocksProps} />
		</>
	);
}

// クエリーパターン
function QueryPatternSetup(props) {
	const { clientId, name: blockName } = props;
	const blockProps = useBlockProps();
	const { replaceBlock, selectBlock } = useDispatch(blockEditorStore);
	const onBlockPatternSelect = (blocks) => {
		const clonedBlocks = blocks.map((block) => cloneBlock(block));
		const firstQueryClientId =
			getFirstQueryClientIdFromBlocks(clonedBlocks);
		replaceBlock(clientId, clonedBlocks);
		if (firstQueryClientId) {
			selectBlock(firstQueryClientId);
		}
	};
	/**
	 * StartBlankComponent` は `Start blank` をクリックしたとき、またはマッチしたパターンが見つからなかったときにレンダリングするものです。
	 * BlockPatternSetup
	 * https://github.com/WordPress/gutenberg/tree/2e4919650c85593ffef3ba1dc7f464b40fff2992/packages/block-editor/src/components/block-pattern-setup
	 */
	return (
		<div {...blockProps}>
			<BlockPatternSetup
				blockName={blockName}
				clientId={clientId}
				startBlankComponent={<QueryPlaceholder {...props} />}
				onBlockPatternSelect={onBlockPatternSelect}
			/>
		</div>
	);
}

// 初期の編集画面
const QueryEdit = (props) => {
	const { clientId } = props;
	const hasInnerBlocks = useSelect(
		(select) => !!select(blockEditorStore).getBlocks(clientId).length,
		[clientId]
	);
	const Component = hasInnerBlocks ? QueryContent : QueryPatternSetup;
	return <Component {...props} />;
};
export default QueryEdit;
