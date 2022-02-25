/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, PlainText } from '@wordpress/block-editor';

const arrowMap = {
	none: '',
	arrow: '→',
	chevron: '»',
};

export default function QueryPaginationNextEdit(props) {
	const { attributes, setAttributes, context } = props;
	const { label } = attributes;
	const { paginationArrow } = context;

	const displayArrow = arrowMap[paginationArrow];
	return (
		<a
			href="#pagination-next-pseudo-link"
			onClick={(event) => event.preventDefault()}
			{...useBlockProps()}
		>
			<PlainText
				__experimentalVersion={2}
				tagName="span"
				aria-label={__('Next page link', 'vk-blocks')}
				placeholder={__('Next Page', 'vk-blocks')}
				value={label}
				onChange={(newLabel) => setAttributes({ label: newLabel })}
			/>
			{displayArrow && (
				<span className={`is-arrow-${paginationArrow}`}>
					{displayArrow}
				</span>
			)}
		</a>
	);
}
