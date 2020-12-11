import { vkbBlockEditor } from '@vkblocks/utils/depModules';

const { InnerBlocks } = vkbBlockEditor;

export default function save() {
	return (
		<dl className={ `vk_faq` }>
			<InnerBlocks.Content />
		</dl>
	 );
}
