import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	__experimentalUseBorderProps as useBorderProps, // eslint-disable-line @wordpress/no-unsafe-wp-apis
} from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalNumberControl as NumberControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
} from '@wordpress/components';

import { useEntityProp } from '@wordpress/core-data';
import { useState, useEffect } from '@wordpress/element';

export default function NewBadgeEdit(props) {
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
		className: 'vk_newBadge',
		style: {
			opacity: !isNew ? 0.15 : 1,
			...borderProps.style,
		},
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('New Badge setting', 'vk-blocks-pro')}>
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
			<div>
				<div {...blockProps}>
					<RichText
						multiline={false}
						aria-label={__('Edit text…')}
						placeholder={__('Edit text…') + ' '}
						value={content}
						onChange={(value) => setAttributes({ content: value })}
						tagName="span"
					/>
				</div>
			</div>
		</>
	);
}