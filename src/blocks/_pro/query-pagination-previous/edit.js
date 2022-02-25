/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, PlainText } from '@wordpress/block-editor';

const arrowMap = {
	none: '',
	arrow: '←',
	chevron: '«',
};

export default function QueryPaginationPreviousEdit(props) {
	const { attributes, setAttributes, context } = props;
	const { label } = attributes;
	const { paginationArrow } = context;

	const displayArrow = arrowMap[paginationArrow];
	return (
		<a
			href="#pagination-previous-pseudo-link"
			onClick={(event) => event.preventDefault()}
			{...useBlockProps()}
		>
			{displayArrow && (
				<span className={`is-arrow-${paginationArrow}`}>
					{displayArrow}
				</span>
			)}
			<PlainText
				// __experimentalVersion={2}でで編集可能にする
				// https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/plain-text/index.js#L20
				__experimentalVersion={2}
				tagName="span"
				aria-label={__('Previous page link', 'vk-blocks')}
				placeholder={__('Previous Page', 'vk-blocks')}
				value={label}
				onChange={(newLabel) => setAttributes({ label: newLabel })}
			/>
		</a>
	);
}
