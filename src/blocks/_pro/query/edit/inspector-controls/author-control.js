/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { FormTokenField } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import { getEntitiesInfo } from '../../utils';

const AUTHORS_QUERY = {
	who: 'authors',
	per_page: -1,
	_fields: 'id,name',
	context: 'view',
};

function AuthorControl({ value, onChange }) {
	const authorsList = useSelect((select) => {
		const { getUsers } = select(coreStore);
		return getUsers(AUTHORS_QUERY);
	}, []);

	if (!authorsList) {
		return null;
	}
	const authorsInfo = getEntitiesInfo(authorsList);
	/**
	 * このブロックはカンマ(`,`)区切りの文字列の値に対して動作し、 `FormTokenFiels` はその値を必要とするので、値を正規化する必要があります。の配列になります。
	 */
	const normalizedValue = !value ? [] : value.toString().split(',');
	/**
	 * 既存の作者IDのみを返します。これは、コンポーネントを指定すると、エディタでクラッシュすることがあります。
	 */
	const sanitizedValue = normalizedValue.reduce((accumulator, authorId) => {
		const author = authorsInfo.mapById[authorId];
		if (author) {
			accumulator.push({
				id: authorId,
				value: author.name,
			});
		}
		return accumulator;
	}, []);

	const getIdByValue = (entitiesMappedByName, authorValue) => {
		const id = authorValue?.id || entitiesMappedByName[authorValue]?.id;
		if (id) return id;
	};
	const onAuthorChange = (newValue) => {
		const ids = Array.from(
			newValue.reduce((accumulator, author) => {
				// 新しい値が既存のエンティティを指していることを確認する。
				const id = getIdByValue(authorsInfo.mapByName, author);
				if (id) accumulator.add(id);
				return accumulator;
			}, new Set())
		);
		onChange({ author: ids.join(',') });
	};
	return (
		<FormTokenField
			label={__('Authors')}
			value={sanitizedValue}
			suggestions={authorsInfo.names}
			onChange={onAuthorChange}
		/>
	);
}

export default AuthorControl;
