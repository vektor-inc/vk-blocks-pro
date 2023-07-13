import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	__experimentalUseBorderProps as useBorderProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalNumberControl as NumberControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
} from '@wordpress/components';

import { useEntityProp } from '@wordpress/core-data';
import { useState, useEffect } from '@wordpress/element';

const ALLOWED_FORMATS = [
	'core/bold',
	'core/image',
	'core/italic',
	'core/link',
	'core/strikethrough',
	'core/text-color',
	'vk-blocks/highlighter',
];

export default function NewTextEdit(props) {
	const { attributes, setAttributes, context } = props;
	const { content, daysAsNewPost } = attributes;
	const [isNew, setIsNew] = useState(false);

	const { postId } = context;
	const [postDate] = useEntityProp('postType', 'post', 'date', postId);

	useEffect(() => {
		const today = new Date();
		const publishedDate = new Date(postDate);
		const differenceInDays = Math.floor(
			(today - publishedDate) / (1000 * 60 * 60 * 24)
		);
		setIsNew(differenceInDays <= daysAsNewPost);
	}, [daysAsNewPost, postDate]);

	const borderProps = useBorderProps(attributes);

	const blockProps = useBlockProps({
		style: {
			opacity: !isNew ? 0.15 : 1,
			...borderProps.style,
		},
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('New Text setting', 'vk-blocks-pro')}>
					<NumberControl
						label={__('Days Counted as New Post', 'vk-blocks-pro')}
						value={daysAsNewPost}
						min={1}
						onChange={(value) =>
							setAttributes({ daysAsNewPost: Number(value) })
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<RichText
					allowedFormats={ALLOWED_FORMATS}
					withoutInteractiveFormatting
					multiline={false}
					aria-label={__('New text…')}
					placeholder={__('New text…') + ' '}
					value={content}
					onChange={(value) => setAttributes({ content: value })}
					tagName="span"
				/>
			</div>
		</>
	);
}
