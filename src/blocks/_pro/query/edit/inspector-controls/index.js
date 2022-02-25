/**
 * External dependencies
 */
import { debounce } from 'lodash';

/**
 * WordPress dependencies
 */
import {
	PanelBody,
	TextControl,
	SelectControl,
	RangeControl,
	ToggleControl,
	Notice,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { useEffect, useState, useCallback } from '@wordpress/element';
import { select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import OrderControl from './order-control';
import AuthorControl from './author-control';
import TaxonomyControls from './taxonomy-controls';
import { usePostTypes } from '../../utils';

const stickyOptions = [
	{ label: __('Include'), value: '' },
	{ label: __('Exclude'), value: 'exclude' },
	{ label: __('Only'), value: 'only' },
];

export default function QueryInspectorControls({
	attributes: { query, displayLayout },
	setQuery,
	setDisplayLayout,
}) {
	const {
		order,
		orderBy,
		author: authorIds,
		postType,
		sticky,
		inherit,
		taxQuery,
		postParent,
	} = query;
	const [showSticky, setShowSticky] = useState(postType === 'post');
	// usePostTypesからpostTypesTaxonomiesMapとpostTypesSelectOptionsを受け取る
	const { postTypesTaxonomiesMap, postTypesSelectOptions } = usePostTypes();
	useEffect(() => {
		setShowSticky(postType === 'post');
	}, [postType]);
	//投稿タイプが変更された時に実行される関数
	const onPostTypeChange = (newValue) => {
		const updateQuery = { postType: newValue };
		// サポートされていないタクソノミーをクエリから削除することで、`taxQuery` プロパティを動的に更新する必要があります。
		const supportedTaxonomies = postTypesTaxonomiesMap[newValue];
		const updatedTaxQuery = Object.entries(taxQuery || {}).reduce(
			(accumulator, [taxonomySlug, terms]) => {
				if (supportedTaxonomies.includes(taxonomySlug)) {
					accumulator[taxonomySlug] = terms;
				}
				return accumulator;
			},
			{}
		);
		updateQuery.taxQuery = !!Object.keys(updatedTaxQuery).length
			? updatedTaxQuery
			: undefined;

		if (newValue !== 'post') {
			updateQuery.sticky = '';
		}
		setQuery(updateQuery);
	};

	/**
	 * 子ページリスト用
	 */
	const pages = select('core').getEntityRecords('postType', 'page', {
		_embed: true,
		per_page: -1,
	});
	// SelectControlのoption形式に整形する
	const options = [
		{ label: __('Not Select page', 'vk-blocks'), value: '' },
		{ label: __('Current page', 'vk-blocks'), value: -1 },
	];
	if (pages !== undefined && pages !== null) {
		const l = pages.length;
		const parents = [];
		let i = 0;
		for (i = 0; i < l; i++) {
			if (pages[i].parent !== 0) {
				parents.push(pages[i].parent);
			}
		}
		for (i = 0; i < l; i++) {
			if (parents.includes(pages[i].id)) {
				options.push({
					label: pages[i].title.rendered,
					value: pages[i].id,
				});
			}
		}
	}
	//クエリーを変更する
	const onPageChange = (newValue) => {
		const updateQuery = { postParent: newValue };
		setQuery(updateQuery);
	};

	const [querySearch, setQuerySearch] = useState(query.search);
	const onChangeDebounced = useCallback(
		debounce(() => {
			if (query.search !== querySearch) {
				setQuery({ search: querySearch });
			}
		}, 250),
		[querySearch, query.search]
	);
	useEffect(() => {
		onChangeDebounced();
		return onChangeDebounced.cancel;
	}, [querySearch, onChangeDebounced]);
	return (
		<InspectorControls>
			<PanelBody title={__('Settings', 'vk-blocks')}>
				<ToggleControl
					label={__('Inherit query from template', 'vk-blocks')}
					help={__(
						'Toggle to use the global query context that is set with the current template, such as an archive or search. Disable to customize the settings independently.'
					)}
					checked={!!inherit}
					onChange={(value) => setQuery({ inherit: !!value })}
				/>
				{!inherit && (
					<>
						<SelectControl
							options={postTypesSelectOptions}
							value={postType}
							label={__('Post type', 'vk-blocks')}
							onChange={onPostTypeChange}
							help={__(
								'WordPress contains different types of content and they are divided into collections called "Post types". By default there are a few different ones such as blog posts and pages, but plugins could add more.'
							)}
						/>
					</>
				)}
				{displayLayout?.type === 'flex' && (
					<>
						<RangeControl
							label={__('Columns', 'vk-blocks')}
							value={displayLayout.columns}
							onChange={(value) =>
								setDisplayLayout({ columns: value })
							}
							min={2}
							max={Math.max(6, displayLayout.columns)}
						/>
						{displayLayout.columns > 6 && (
							<Notice status="warning" isDismissible={false}>
								{__(
									'This column count exceeds the recommended amount and may cause visual breakage.'
								)}
							</Notice>
						)}
					</>
				)}
				{!inherit && (
					<OrderControl {...{ order, orderBy }} onChange={setQuery} />
				)}
				{showSticky && (
					<SelectControl
						label={__('Sticky posts', 'vk-blocks')}
						options={stickyOptions}
						value={sticky}
						onChange={(value) => setQuery({ sticky: value })}
						help={__(
							'Blog posts can be "stickied", a feature that places them at the top of the front page of posts, keeping it there until new sticky posts are published.'
						)}
					/>
				)}
			</PanelBody>
			{!inherit && (
				<PanelBody title={__('Filters', 'vk-blocks')}>
					{postType === 'page' && (
						<SelectControl
							options={options}
							value={postParent}
							label={__('Post Parent', 'vk-blocks')}
							onChange={onPageChange}
							help={__(
								'Show the selected child page.',
								'vk-blocks'
							)}
						/>
					)}
					<TaxonomyControls onChange={setQuery} query={query} />
					<AuthorControl value={authorIds} onChange={setQuery} />
					<TextControl
						label={__('Keyword')}
						value={querySearch}
						onChange={setQuerySearch}
					/>
				</PanelBody>
			)}
		</InspectorControls>
	);
}
