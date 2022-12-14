import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function save() {
	return (
		<p {...useBlockProps.save()}>
			{__('Vk Block Pro - Dynamic text block front', 'vk-blocks')}
		</p>
	);
}
