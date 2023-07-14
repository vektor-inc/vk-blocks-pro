import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	AlignmentControl,
	BlockControls,
	RichText,
	useSetting,
	__experimentalUseBorderProps as useBorderProps, // eslint-disable-line @wordpress/no-unsafe-wp-apis
} from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalUseCustomUnits as useCustomUnits, // eslint-disable-line @wordpress/no-unsafe-wp-apis
	__experimentalNumberControl as NumberControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
	__experimentalUnitControl as UnitControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
} from '@wordpress/components';

import { useEntityProp } from '@wordpress/core-data';
import { useState, useEffect } from '@wordpress/element';

export default function NewTextEdit(props) {
	const { attributes, setAttributes, context } = props;
	const { content, daysAsNewPost, align, width } = attributes;
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

	const units = useCustomUnits({
		availableUnits: useSetting('spacing.units') || [
			'%',
			'px',
			'em',
			'rem',
			'vw',
		],
	});

	const borderProps = useBorderProps(attributes);

	const blockProps = useBlockProps({
		style: {
			opacity: !isNew ? 0.15 : 1,
			...borderProps.style,
			textAlign: align,
			...(width && { width }),
		},
	});

	return (
		<>
			<BlockControls group="block">
				<AlignmentControl
					value={align}
					onChange={(newAlign) =>
						setAttributes({
							align: newAlign,
						})
					}
				/>
			</BlockControls>
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
			<InspectorControls group="styles">
				<PanelBody title={__('Width setting', 'vk-blocks-pro')}>
					<UnitControl
						label={__('Width')}
						labelPosition="edge"
						value={width || ''}
						onChange={(value) => {
							value = 0 > parseFloat(value) ? '0' : value;
							setAttributes({ width: value });
						}}
						units={units}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<RichText
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
