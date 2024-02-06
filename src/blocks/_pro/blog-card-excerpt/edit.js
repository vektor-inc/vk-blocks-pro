/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal dependencies
 */
import useRemoteUrlData from '../blog-card/api/use-rich-url-data';

const ELLIPSIS = '…';

export default function BlogCardExcerptEdit(props) {
	const { attributes, setAttributes, context } = props;
	const { textAlign, excerptLength } = attributes;
	const { richData } = useRemoteUrlData(context['vk-blocks/blog-card-url']);
	const excerpt = richData?.data.excerpt ?? '';

	const blockProps = useBlockProps({
		className: classnames({
			[`has-text-align-${textAlign}`]: textAlign,
		}),
	});

	const wordCountType = _x('words', 'Word count type. Do not translate!');

	let trimmedExcerpt = '';
	if (wordCountType === 'words') {
		trimmedExcerpt = excerpt.split(' ', excerptLength).join(' ');
	} else if (wordCountType === 'characters_excluding_spaces') {
		/*
		 * 1. Split the excerpt at the character limit,
		 * then join the substrings back into one string.
		 * 2. Count the number of spaces in the excerpt
		 * by comparing the lengths of the string with and without spaces.
		 * 3. Add the number to the length of the visible excerpt,
		 * so that the spaces are excluded from the word count.
		 */
		const excerptWithSpaces = excerpt.split('', excerptLength).join('');

		const numberOfSpaces =
			excerptWithSpaces.length -
			excerptWithSpaces.replaceAll(' ', '').length;

		trimmedExcerpt = excerpt
			.split('', excerptLength + numberOfSpaces)
			.join('');
	} else if (wordCountType === 'characters_including_spaces') {
		trimmedExcerpt = excerpt.split('', excerptLength).join('');
	}

	const isTrimmed =
		excerptLength && excerpt.length > trimmedExcerpt.length ? true : false;

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={textAlign}
					onChange={(newAlign) =>
						setAttributes({ textAlign: newAlign })
					}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={__('Settings')}>
					<RangeControl
						label={__('Max number of words')}
						value={excerptLength}
						onChange={(value) => {
							setAttributes({ excerptLength: value });
						}}
						min="1"
						max={excerpt.length}
						allowReset={true}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<p className="wp-block-vk-blocks-blog-card-excerpt__excerpt">
					{!isTrimmed
						? decodeEntities(trimmedExcerpt)
						: decodeEntities(trimmedExcerpt) + ELLIPSIS}
				</p>
			</div>
		</>
	);
}
