/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

// https://github.com/WordPress/gutenberg/blame/3da717b8d0ac7d7821fc6d0475695ccf3ae2829f/packages/block-library/src/query-pagination-numbers/edit.js
const createPaginationItem = (content, Tag = 'a', extraClass = '') => (
	<Tag className={`vk-page-numbers ${extraClass}`}>{content}</Tag>
);

/**
 * 編集画面はページ数に関わらず1〜8まで表示される
 * 3ページ目にいるような状態で表示される
 */
const previewPaginationNumbers = () => (
	<>
		{createPaginationItem(1)}
		{createPaginationItem(2)}
		{createPaginationItem(3, 'span', 'current')}
		{createPaginationItem(4)}
		{createPaginationItem(5)}
		{createPaginationItem('...', 'span', 'dots')}
		{createPaginationItem(8)}
	</>
);

export default function QueryPaginationNumbersEdit() {
	const paginationNumbers = previewPaginationNumbers();
	return <div {...useBlockProps()}>{paginationNumbers}</div>;
}
