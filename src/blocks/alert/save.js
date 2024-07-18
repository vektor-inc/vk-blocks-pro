import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor';
import parse from 'html-react-parser';

export default function save({ attributes }) {
	const { style, icon, iconText } = attributes;

	const blockProps = useBlockProps.save({
		className: `alert alert-${style}`,
	});

	let alertIcon = '';
	if (
		icon !== '' &&
		icon !== undefined
	) {
		alertIcon = (
			<div className="alert-icon">
				<div className="alert-icon-icon">{parse(icon)}</div>
				<div className="alert-icon-text">
					<RichText.Content
						tagName="span"
						value={iconText}
						
					/>
				</div>
			</div>
		);
	}

	return (
		<div {...blockProps}>
			{alertIcon}
			<InnerBlocks.Content />
		</div>
	);
}
