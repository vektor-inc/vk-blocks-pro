import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
//import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	Spinner,
} from '@wordpress/components';

export default function SingleTermEdit(props) {
	const { attributes, setAttributes, context } = props;
	const { hasLink, taxonomy } = attributes;
	const { postId, postType } = context;

	const { value: termColorInfo, isLoading } = useSelect(
		(select) => {
			return select('vk-blocks/term-color').getTermColorInfoByPost(
				postId,
				taxonomy
			);
		},
		[taxonomy]
	);

	const taxonomies =
		useSelect(
			(select) => {
				// postTypeが定義されている場合のみ実行
				if (!postType) {
					return null;
				}
				// 現在の投稿タイプに関連するタクソノミーを取得
				const relatedTaxonomies = select('core').getTaxonomies({
					type: postType,
				});

				// post_tagとタグタイプのタクソノミーを除外して他のタクソノミーのみを返す
				return relatedTaxonomies
					? relatedTaxonomies.filter(
							(_taxonomy) =>
								_taxonomy.slug !== 'post_tag' &&
								_taxonomy.hierarchical
					  )
					: [];
			},
			[postType]
		) || [];

	const blockProps = useBlockProps({
		className: 'vk_singleTerm',
		style: {
			backgroundColor: termColorInfo?.color ?? '#999999',
			color: termColorInfo?.text_color ?? '#FFFFFF',
		},
	});

	const url = termColorInfo?.term_url ?? '';
	const termName = isLoading ? (
		<Spinner />
	) : (
		termColorInfo?.term_name ?? 'Unposted'
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Setting', 'vk-blocks-pro')}>
					<ToggleControl
						label={__('Add Link to Taxonomy Page', 'vk-blocks-pro')}
						checked={hasLink}
						onChange={(checked) =>
							setAttributes({ hasLink: checked })
						}
					/>
					{taxonomies && (
						<SelectControl
							label={__('Select Taxonomy', 'vk-blocks-pro')}
							value={taxonomy}
							options={[
								{ label: '自動', value: '' },
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
			{hasLink && url ? (
				<a
					{...blockProps}
					href={termColorInfo.term_url}
					onClick={(event) => event.preventDefault()}
				>
					{termName}
				</a>
			) : (
				<div {...blockProps}>{termName}</div>
			)}
		</>
	);
}
