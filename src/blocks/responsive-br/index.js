const { __ } = wp.i18n;
const {registerFormatType, toggleFormat,　insertObject } = wp.richText;
const { RichTextToolbarButton, BlockFormatControls } = wp.blockEditor;

registerFormatType(
    'vk-blocks/responsive-br-lg', {
        title: __('Inline', 'vk-blocks'),
        tagName: 'br',
        className: 'test',
        edit: ( { onChange, value, isActive} ) => {

			return <RichTextToolbarButton
				icon='star-filled'
				title= { __('Inline', 'vk-blocks') }
				onClick={ () => {

					onChange( insertObject(
						value,
						{ type: 'vk-blocks/responsive-br-lg' },
						value.start,
						value.end,
					) );
				} }
				isActive={ isActive }
			/>;
		},
    }
);
