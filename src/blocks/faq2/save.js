const { InnerBlocks, InspectorControls } = vkbBlockEditor;

export default function save() {
	return (
		<dl className={ `vk_faq [accordion_trigger_switch]` }>
			<InnerBlocks.Content />
		</dl>
	 );
}
