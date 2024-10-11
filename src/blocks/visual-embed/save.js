import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { iframeCode } = attributes;
	const blockProps = useBlockProps.save();

	// iframeCode 内の <a> タグに rel="noopener" を追加
	const updatedIframeCode = iframeCode.replace(
		/<a /g,
		'<a rel="noopener" '
	);

	return (
		<div {...blockProps}>
			<div dangerouslySetInnerHTML={{ __html: updatedIframeCode }} />
		</div>
	);
}
