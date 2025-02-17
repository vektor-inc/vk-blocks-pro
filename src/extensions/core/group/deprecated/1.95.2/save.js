import {
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function save(props) {
	const { attributes } = props;
	const {
		linkUrl,
		linkTarget,
		className = '',
		tagName: CustomTag = 'div',
	} = attributes;

	const blockProps = useBlockProps.save({
		className: linkUrl ? `${className} has-link` : className,
	});

	const relAttribute =
		linkTarget === '_blank' ? 'noopener noreferrer' : 'noopener';

	return (
		<CustomTag {...blockProps}>
			<InnerBlocks.Content />
			{linkUrl && (
				<a
					href={linkUrl}
					target={linkTarget}
					rel={relAttribute}
					aria-label={__('Group link', 'vk-blocks-pro')}
					className="wp-block-group-vk-link"
				></a>
			)}
		</CustomTag>
	);
}
