import { vkbBlockEditor } from '@vkblocks/utils/depModules';

const { InnerBlocks } = vkbBlockEditor;

export default function save() {
	return (
		<dt className={ `vk_faq_title` }>
			<InnerBlocks.Content />
		</dt>
	 );
}
