import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import {
	useBlockProps,
	InspectorControls,
	AlignmentToolbar,
	BlockControls,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	Spinner,
} from '@wordpress/components';
import { useEffect, useState } from 'react';

export default function CategoryBadgeEdit(props) {
	const { attributes, setAttributes, context } = props;
	const { hasLink, taxonomy, textAlign } = attributes;
	const { postId, postType } = context;

	const [bgColor, setBgColor] = useState('#999999');
	const [textColor, setTextColor] = useState('#FFFFFF');
	const [opacity, setOpacity] = useState(0.3);
	const [termUrl, setTermUrl] = useState('');
	const [termName, setTermName] = useState('');

	// タクソノミー一覧を取得
	const taxonomies = useSelect(
		(select) => {
			const allTaxonomies = select('core').getTaxonomies();
			return allTaxonomies
				? allTaxonomies.filter(
						(_taxonomy) =>
							_taxonomy.slug !== 'post_tag' &&
							_taxonomy.hierarchical
					)
				: [];
		},
		[postType]
	) || [];

	// 自動タクソノミー選択
	function getAutoTaxonomy(taxonomies, postType) {
		const customTaxonomy = taxonomies.find((tax) =>
			tax.types.includes(postType)
		);
		if (customTaxonomy) {
			return customTaxonomy.slug;
		}

		const defaultTaxonomy = taxonomies.find(
			(tax) => tax.slug === 'category'
		);
		return defaultTaxonomy ? defaultTaxonomy.slug : '';
	}

	// タクソノミーが「Auto」に設定されている場合の処理
	const autoTaxonomy =
		taxonomy === '' ? getAutoTaxonomy(taxonomies, postType) : taxonomy;

	// 投稿に関連付けられたタームを取得
	const terms = useSelect(
		(select) => {
			if (!autoTaxonomy) {
				return [];
			}
			return select('core').getEntityRecords(
				'taxonomy',
				autoTaxonomy,
				{
					per_page: -1,
					post: postId,
				}
			);
		},
		[autoTaxonomy, postId]
	) || [];

	const selectedTerm = terms.length > 0 ? terms[0] : null;

	// タームカラー情報を取得
	const { value: termColorInfo, isResolving } = useSelect(
		(select) => {
			if (!selectedTerm) {
				return { value: null, isResolving: false };
			}
			const response = select('vk-blocks/term-color').getTermColorInfo(
				postId,
				autoTaxonomy
			);
			return response || { value: null, isResolving: false };
		},
		[autoTaxonomy, postId, selectedTerm]
	);

	useEffect(() => {

		if (termColorInfo && termColorInfo.color) {
			setBgColor(termColorInfo.color);
			setTextColor(termColorInfo.text_color || '#FFFFFF');
			setTermUrl(termColorInfo.term_url || '');
			setOpacity(1);
			setTermName(termColorInfo.term_name || '');
		} else if (selectedTerm) {
			setTermName(selectedTerm.name);
			setOpacity(1);
		} else {
			setOpacity(0.3);
		}
	}, [termColorInfo, selectedTerm]);

	// タクソノミー名を取得
	function getTaxonomyName(slug, taxonomies) {
		return taxonomies.find((tax) => tax.slug === slug)?.name || '';
	}

	// ブロック要素の属性やスタイルを設定
	const blockProps = useBlockProps({
		className: classnames('vk_categoryBadge', {
			[`has-text-align-${textAlign}`]: !!textAlign,
		}),
		style: {
			backgroundColor: bgColor,
			color: textColor,
			opacity: opacity,
		},
	});

	const displayTermName = isResolving ? <Spinner /> : termName || getTaxonomyName(autoTaxonomy, taxonomies);

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={textAlign}
					onChange={(nextAlign) => {
						setAttributes({ textAlign: nextAlign });
					}}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={__('Setting', 'vk-blocks-pro')}>
					<ToggleControl
						label={__('Enable Term Link', 'vk-blocks-pro')}
						checked={hasLink}
						onChange={(checked) =>
							setAttributes({ hasLink: checked })
						}
					/>
					{taxonomies.length > 1 && (
						<SelectControl
							label={__('Select Taxonomy', 'vk-blocks-pro')}
							value={taxonomy === '' ? '' : taxonomy}
							options={[
								{
									label: __('Auto', 'vk-blocks-pro'),
									value: '',
								},
								...taxonomies.map((tax) => ({
									label: tax.name,
									value: tax.slug,
								})),
							]}
							onChange={(selectedSlug) => {
								setAttributes({ taxonomy: selectedSlug });
							}}
						/>
					)}
				</PanelBody>
			</InspectorControls>
			{displayTermName &&
				(hasLink && termUrl ? (
					<a
						{...blockProps}
						href={termUrl}
						onClick={(event) => event.preventDefault()}
					>
						{displayTermName}
					</a>
				) : (
					<div {...blockProps}>{displayTermName}</div>
				))}
		</>
	);
}
