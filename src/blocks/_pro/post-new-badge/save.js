/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { content, textAlign } = attributes;
	const className = classnames('vk_newBadge', {
		[`has-text-align-${textAlign}`]: textAlign,
	});

	return (
		<div {...useBlockProps.save({ className })}>
			<RichText.Content tagName={'span'} value={content} />
		</div>
	);
}
