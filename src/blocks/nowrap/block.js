/**
 * No Wrap
 */
import BlockIcon from "./icon.svg";

const {__} = wp.i18n; // Import __() from wp.i18n
const {registerFormatType, toggleFormat, applyFormat, removeFormat, getActiveFormat} = window.wp.richText;
const {RichTextToolbarButton, RichTextShortcut, InspectorControls, PanelColorSettings, getColorObjectByColorValue} = wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const {Fragment} = wp.element;

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
