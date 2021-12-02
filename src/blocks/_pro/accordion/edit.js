import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

export default function AccordionEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { containerClass } = attributes;

	// コンソールエラー回避のため useEffect を使用（実行タイミングの問題）
	useEffect(() => {
		// containerClass 互換設定
		if (containerClass === undefined) {
			setAttributes({ containerClass: `vk_accordion-container` });
		}
	}, [clientId]);

	// blocksProps を予め定義
	const blockProps = useBlockProps({
		className: `${containerClass}`,
	});

	const ALLOWED_BLOCKS = [
		'vk-blocks/accordion-trigger',
		'vk-blocks/accordion-target',
	];

	const TEMPLATE = [
		['vk-blocks/accordion-trigger'],
		['vk-blocks/accordion-target'],
	];

	return (
		<div {...blockProps}>
			<InnerBlocks
				allowedBlocks={ALLOWED_BLOCKS}
				template={TEMPLATE}
				templateLock="all"
			/>
		</div>
	);
}
