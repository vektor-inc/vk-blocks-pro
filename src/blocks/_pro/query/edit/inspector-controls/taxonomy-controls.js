/**
 * WordPress dependencies
 */
import { FormTokenField } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import { getEntitiesInfo, useTaxonomies } from '../../utils';
import { MAX_FETCHED_TERMS } from '../../constants';

// FormTokenField` に入力された内容を元に用語IDを取得するためのヘルパー関数です。
const getTermIdByTermValue = (termsMappedByName, termValue) => {
	// まず、`term.id`による完全一致と、大文字・小文字を区別する `term.name` による一致をチェックします。
	const termId = termValue?.id || termsMappedByName[termValue]?.id;
	if (termId) return termId;
	/**
	 * ここでは、ユーザーの期待に応えるために、大文字と小文字を区別しない方法で入力された単語をチェックするようにしています。大文字と小文字を区別しない候補を表示します。
	 *
	 *  WPは、ユーザーが同じ名前の用語を追加することを阻止しようとしますが（大文字と小文字を区別しない）、用語が異なるスラッグを持つ限り、手動で名前を変更すれば、まだ可能です。
	 * このエッジケースでは、常に用語リストから最初にマッチしたものを適用します。
	 */
	const termValueLower = termValue.toLocaleLowerCase();
	for (const term in termsMappedByName) {
		if (term.toLocaleLowerCase() === termValueLower) {
			return termsMappedByName[term].id;
		}
	}
};

function TaxonomyControls({ onChange, query }) {
	const taxonomies = useTaxonomies(query.postType);
	const taxonomiesInfo = useSelect(
		(select) => {
			const { getEntityRecords } = select(coreStore);
			const termsQuery = { per_page: MAX_FETCHED_TERMS };
			const _taxonomiesInfo = taxonomies?.map(({ slug, name }) => {
				const _terms = getEntityRecords('taxonomy', slug, termsQuery);
				return {
					slug,
					name,
					terms: getEntitiesInfo(_terms),
				};
			});
			return _taxonomiesInfo;
		},
		[taxonomies]
	);
	const onTermsChange = (taxonomySlug) => (newTermValues) => {
		const taxonomyInfo = taxonomiesInfo.find(
			({ slug }) => slug === taxonomySlug
		);
		if (!taxonomyInfo) return;
		const termIds = Array.from(
			newTermValues.reduce((accumulator, termValue) => {
				const termId = getTermIdByTermValue(
					taxonomyInfo.terms.mapByName,
					termValue
				);
				if (termId) accumulator.add(termId);
				return accumulator;
			}, new Set())
		);
		const newTaxQuery = {
			...query.taxQuery,
			[taxonomySlug]: termIds,
		};
		onChange({ taxQuery: newTaxQuery });
	};
	// FormTokenField` で使用するために、既存の用語IDのみを適切なフォーマットで返します。
	// これは、コンポーネントが が提供された場合、エディターでクラッシュします。
	const getExistingTaxQueryValue = (taxonomySlug) => {
		const taxonomyInfo = taxonomiesInfo.find(
			({ slug }) => slug === taxonomySlug
		);
		if (!taxonomyInfo) return [];
		return (query.taxQuery?.[taxonomySlug] || []).reduce(
			(accumulator, termId) => {
				const term = taxonomyInfo.terms.mapById[termId];
				if (term) {
					accumulator.push({
						id: termId,
						value: term.name,
					});
				}
				return accumulator;
			},
			[]
		);
	};
	return (
		<>
			{!!taxonomiesInfo?.length &&
				taxonomiesInfo.map(({ slug, name, terms }) => {
					if (!terms?.names?.length) {
						return null;
					}
					return (
						<FormTokenField
							key={slug}
							label={name}
							value={getExistingTaxQueryValue(slug)}
							suggestions={terms.names}
							onChange={onTermsChange(slug)}
						/>
					);
				})}
		</>
	);
}

export default TaxonomyControls;
