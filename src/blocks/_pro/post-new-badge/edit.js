import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import {
	AlignmentToolbar,
	BlockControls,
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalNumberControl as NumberControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
} from '@wordpress/components';

import { useEntityProp } from '@wordpress/core-data';
import { useState, useEffect } from '@wordpress/element';

export default function NewBadgeEdit(props) {
	const { attributes, setAttributes, context } = props;
	const { content, daysAsNewPost, textAlign } = attributes;
	const [isNew, setIsNew] = useState(false);

	const { postId } = context;
	const [postDate] = useEntityProp('postType', 'post', 'date', postId);

	useEffect(() => {
		const today = new Date();
		const publishedDate = new Date(postDate);

		// 時刻部分を0にリセット
		today.setHours(0, 0, 0, 0);
		publishedDate.setHours(0, 0, 0, 0);

		const differenceInDays =
			Math.floor((today - publishedDate) / (1000 * 60 * 60 * 24)) + 1;
		setIsNew(differenceInDays <= daysAsNewPost);
	}, [daysAsNewPost, postDate]);

	const blockProps = useBlockProps({
		className: classnames('vk_newBadge', {
			[`has-text-align-${textAlign}`]: !!textAlign,
		}),
		style: {
			opacity: !isNew ? 0.15 : 1,
		},
	});

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={textAlign}
					onChange={(nextAlign) => {
						setAttributes({ textAlign: nextAlign });
					}}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={__('New Badge setting', 'vk-blocks-pro')}>
					<NumberControl
						label={__('Days Counted as New Post', 'vk-blocks-pro')}
						value={daysAsNewPost}
						min={1}
						onChange={(value) => {
							const inputValue = value ? parseInt(value) : 1;
							setAttributes({ daysAsNewPost: inputValue });
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<RichText
					multiline={false}
					aria-label={__('Edit text…', 'vk-blocks-pro')}
					placeholder={__('Edit text…', 'vk-blocks-pro')}
					value={content}
					onChange={(value) => setAttributes({ content: value })}
					tagName="span"
				/>
			</div>
		</>
	);
}
