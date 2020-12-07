/**
 * highlighter block type
 */
const {__} = wp.i18n; // Import __() from wp.i18n
const {registerFormatType, toggleFormat, applyFormat, removeFormat, getActiveFormat} = window.wp.richText;
const {RichTextToolbarButton, RichTextShortcut, InspectorControls, PanelColorSettings, getColorObjectByColorValue} = wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const {Fragment} = wp.element;
const name = 'vk-blocks/highlighter';

import hex2rgba from "../../utils/hex-to-rgba";
import BlockIcon from "./icon.svg";

registerFormatType(name, {
    title: __('Highlighter', 'vk-blocks'),
    tagName: 'span',
    className: 'vk_highlighter',
    attributes: {
        data: 'data-color',
        style: 'style',
    },
    edit(props) {
        const {value, isActive, onChange} = props;
        const alpha = 0.7;
        const defaultColor = '#fffd6b';
        const shortcutType = 'primary';
        const shortcutChar = "h";

        let activeColor;
        if (isActive) {
            const activeFormat = getActiveFormat(value, name);
            activeColor = activeFormat.attributes.data;
        }

        const setColorIfUndefined = (activeColor) => {
            if (activeColor === undefined) {
                activeColor = defaultColor;
            }
            return activeColor;
        };

        const onToggle = (activeColor) => {

            activeColor = setColorIfUndefined(activeColor);

            onChange(toggleFormat(value, {
                type: name,
                attributes: {
                    data: activeColor,
                    style: `background: linear-gradient(transparent 60%,${hex2rgba(activeColor, alpha)} 0);`,
                },
            } ))
        };

        return (
	<Fragment>
		<InspectorControls>
			<PanelColorSettings
				title={ __('Highlighter', 'vk-blocks') }
				initialOpen={ false }
				colorSettings={ [
                            {
                                value: activeColor,
                                onChange: (color) => {
                                    if (color) {
                                        onChange(applyFormat(value, {
                                            type: name,
                                            attributes: {
                                                data: color,
                                                style: `background: linear-gradient(transparent 60%,${hex2rgba(color, 0.7)} 0);`,
                                            }
                                        }));
                                        return
                                    }
                                    onChange(removeFormat(value, name))
                                },
                                label: __('Highlight Color', 'vk-blocks')
                            }
                        ] }
                    />
		</InspectorControls>
		<RichTextShortcut
			type={ shortcutType }
			character={ shortcutChar }
			onUse={ () => onToggle(activeColor) }
                />
		<RichTextToolbarButton
			icon={ BlockIcon }
			title={ __('Highlighter', 'vk-blocks') }
			onClick={ () => onToggle(activeColor) }
			isActive={ isActive }
			shortcutType={ shortcutType }
			shortcutCharacter={ shortcutChar }
                />
	</Fragment>
        );
    },
});
