import { InnerBlocks } from '@wordpress/block-editor';

export default function save(props) {
	const { className } = props;
	return (
		<div className={`${className}`}>
			<InnerBlocks.Content />
		</div>
	);
}
