/**
 * highlighter block type
 */
const {__} = wp.i18n; // Import __() from wp.i18n
const {registerFormatType, toggleFormat, applyFormat, removeFormat, getActiveFormat} = window.wp.richText;
const {RichTextToolbarButton, RichTextShortcut, InspectorControls, PanelColorSettings, getColorObjectByColorValue} = wp.blockEditor && wp.blockEditor.BlockEdit ? wp.blockEditor : wp.editor;
const {Fragment} = wp.element;
const name = 'vk-blocks/highlighter';
const BlockIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="576" height="512" viewBox="0 0 576 512">
		<path d="M26.9,462.2l104.7,39.6l34-34l-73.2-73.2L26.9,462.2z M146.5,231.8c-10.3,9.1-14.4,23.4-10.4,36.6l12.5,41.1l-48.9,48.9
		L201,459.6l48.8-48.8l41,12.6c13.2,4,27.5,0,36.6-10.3l27.3-29.1L175.5,204.6L146.5,231.8L146.5,231.8z M533.7,122.3L437,25.7
		C417.4,6,385.8,5,364.9,23.4L201,186.6l171.8,171.8l163.1-163.9C554.3,173.6,553.3,142,533.7,122.3L533.7,122.3z" />
	</svg>
);
import hex2rgba from "../_helper/hex-to-rgba";

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
