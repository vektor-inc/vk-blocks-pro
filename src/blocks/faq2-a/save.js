import { vkbBlockEditor } from '@vkblocks/utils/depModules';

const { InnerBlocks } = vkbBlockEditor;

export default function save() {
	return (
		<dd className={ `vk_faq_content` }>
			<InnerBlocks.Content />
		</dd>
	 );
}
