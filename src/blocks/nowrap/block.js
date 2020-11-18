/**
 * No Wrap
 */

const {__} = wp.i18n; // Import __() from wp.i18n
const {registerFormatType, toggleFormat, applyFormat, removeFormat, getActiveFormat} = window.wp.richText;
const {RichTextToolbarButton, RichTextShortcut, InspectorControls, PanelColorSettings, getColorObjectByColorValue} = wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const {Fragment} = wp.element;
const BlockIcon = (

<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

<path fill-rule="evenodd" clip-rule="evenodd" d="M3 4L3 20L5 20L5 4L3 4ZM19 20L21 20L21 4L19 4L19 20ZM14 11L14 8L18 12L14 16L14 13L6.5 13L6.5 12L6.5 11L14 11Z" />

</svg>



);

registerFormatType(
	'vk-blocks/nowrap', {
   		title: __('No wrap', 'vk-blocks'),
    	tagName: 'span',
    	className: 'text-nowrap',
    	edit(props) {
			const { value, isActive } = props;

			return (
				<Fragment>
					<RichTextToolbarButton
						icon={ BlockIcon }
						title={ __('Nowrap', 'vk-blocks') }
						onClick={ () => {
							props.onChange (
								toggleFormat(
									value,
									{ type: 'vk-blocks/nowrap' }
								)
							);
						} }
						isActive={ isActive }
					/>
				</Fragment>
			);
		}
    },
);
