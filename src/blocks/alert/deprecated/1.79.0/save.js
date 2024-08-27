import { RichText, useBlockProps } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

const migrate = ( attributes, innerBlocks ) => {
    const { title, ...restAttributes } = attributes;

    return [
        restAttributes,
        [
            createBlock( 'core/paragraph', {
                content: attributes.content,
            } ),
            ...innerBlocks,
        ],
    ];
}

const save = ({ attributes })  => {
	const { style, content } = attributes;

	return (
		<div {...useBlockProps.save({ className: `alert alert-${style}` })}>
			<RichText.Content tagName={'p'} value={content} />
		</div>
	);
}

export { migrate, save }