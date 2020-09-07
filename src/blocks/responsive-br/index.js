const { __ } = wp.i18n;
// const { registerFormatType,  insert,　insertObject, create } = wp.richText;
// const { Toolbar, ToolbarButton } = wp.components;
// const { BlockFormatControls } = wp.blockEditor;
// import { pasteHandler } from '@wordpress/blocks';

// registerFormatType( 'vk-blocks/responsive-br', {
//     title: 'Responsive Newline',
//     tagName: 'br',
// 	className: 'test',
// 	edit( { value, onChange } ) {

// 		console.log(value)
// 		const insertedObject = create("","","",<br class="fa"/>)
// 		console.log(insertedObject)
// 		const onToggle = () => onChange( insert( value, insertedObject, value.start, value.end ) );

// 		return (
// 			<BlockFormatControls>
// 				<div className="editor-format-toolbar block-editor-format-toolbar">
// 					<Toolbar>
// 						<ToolbarButton
// 							icon = { 'star-filled' }
// 							title = { 'Responsive Newline' }
// 							onClick = { onToggle }
// 						/>
// 					</Toolbar>
// 				</div>
// 			</BlockFormatControls>
// 		);
// 	},
// } );
const {registerFormatType, toggleFormat,　insertObject } = wp.richText;
const { RichTextToolbarButton, BlockFormatControls } = wp.blockEditor;

const MyCustomButton = ( props ) => {

    return <RichTextToolbarButton
        icon='star-filled'
        title= { __('Responsive Newline', 'vk-blocks') }
        onClick={ () => {

            props.onChange( insertObject(
                props.value,
				{ type: 'vk-blocks/responsive-br' },
				props.value.start,
				props.value.end,
            ) );
        } }
        isActive={ props.isActive }
	/>;
};

registerFormatType(
    'vk-blocks/responsive-br', {
        title: __('Responsive Newline', 'vk-blocks'),
        tagName: 'br',
        className: 'test',
        edit: MyCustomButton,
    }
);
