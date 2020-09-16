const { __ } = wp.i18n;
import { vkbBlockEditor } from "./../_helper/depModules";
const { RichText, MediaUpload } = vkbBlockEditor;
const { Button } = wp.components;
const { Component } = wp.element;

export class NewComponent extends Component {

    render() {

        const {
            vk_staff_text_name,
            vk_staff_text_caption,
            vk_staff_text_role,
            vk_staff_text_profileTitle,
            vk_staff_text_profileText,
            vk_staff_photo_image,
            vk_staff_photo_image_alt,
            vk_staff_layout,
            vk_staff_nameColor,
            vk_staff_captionColor,
            vk_staff_positionColor,
            vk_staff_profileTitleColor,
            vk_staff_profileTextColor,
            vk_staff_photoBorder
        } = this.props.attributes;
        const setAttributes = this.props.setAttributes;
        const className = this.props.className;
        const for_ = this.props.for_;
        let returnELm = '';

        if (for_ === 'edit') {

            returnELm = <div className={ `${className} vk_staff vk_staff-layout-${vk_staff_layout}` }>
	<div className={ `vk_staff_text` }>
		<RichText
			tagName="h3"
			className={ 'vk_staff_text_name' }
			style={ { color: vk_staff_nameColor } }
			onChange={ (value) => setAttributes({ vk_staff_text_name: value }) }
			value={ vk_staff_text_name }
			placeholder={ __('Your Name', 'vk-blocks') }
                    />
		<RichText
			tagName="p"
			className={ 'vk_staff_text_caption' }
			style={ { color: vk_staff_captionColor } }
			onChange={ (value) => setAttributes({ vk_staff_text_caption: value }) }
			value={ vk_staff_text_caption }
			placeholder={ __('Caption', 'vk-blocks') }
                    />
		<RichText
			tagName="p"
			className={ 'vk_staff_text_role' }
			style={ { color: vk_staff_positionColor } }
			onChange={ (value) => setAttributes({ vk_staff_text_role: value }) }
			value={ vk_staff_text_role }
			placeholder={ __('Role position', 'vk-blocks') }
                    />
		<RichText
			tagName="h4"
			className={ 'vk_staff_text_profileTitle' }
			style={ { color: vk_staff_profileTitleColor } }
			onChange={ (value) => setAttributes({ vk_staff_text_profileTitle: value }) }
			value={ vk_staff_text_profileTitle }
			placeholder={ __('Profile title', 'vk-blocks') }
                    />
		<RichText
			tagName="p"
			className={ 'vk_staff_text_profileText' }
			style={ { color: vk_staff_profileTextColor } }
			onChange={ (value) => setAttributes({ vk_staff_text_profileText: value }) }
			value={ vk_staff_text_profileText }
			placeholder={ __('Profile text', 'vk-blocks') }
                    />
	</div>
	<div className={ `vk_staff_photo vk_staff_photo-border-${vk_staff_photoBorder}` }>
		<MediaUpload
			onSelect={ (value) => setAttributes({ vk_staff_photo_image: value.sizes.full.url }) }
			type="image"
			className={ 'vk_staff_photo_image' }
			value={ vk_staff_photo_image }
			render={ ({ open }) => (
				<Button
					onClick={ open }
					className={ vk_staff_photo_image ? 'image-button' : 'button button-large' }
                            >
					{ !vk_staff_photo_image ? __('Select image', 'vk-blocks') :
					<img className={ `vk_staff_photo_image` } src={ vk_staff_photo_image }
						alt={ __(vk_staff_photo_image_alt, 'vk-blocks') } /> }
				</Button>
                        ) }
                    />
	</div>
            </div>;

        } else if (for_ === 'save') {

            returnELm = <div className={ `${className} vk_staff vk_staff-layout-${vk_staff_layout}` }>
	<div className={ `vk_staff_text` }>
		<RichText.Content
			tagName="h3"
			className={ 'vk_staff_text_name' }
			style={ { color: vk_staff_nameColor } }
			value={ vk_staff_text_name } />
		<RichText.Content
			tagName="p"
			className={ 'vk_staff_text_caption' }
			style={ { color: vk_staff_captionColor } }
			value={ vk_staff_text_caption }
                    />
		<RichText.Content
			tagName="p"
			className={ 'vk_staff_text_role' }
			style={ { color: vk_staff_positionColor } }
			value={ vk_staff_text_role }
                    />
		<RichText.Content
			tagName="h4"
			className={ 'vk_staff_text_profileTitle' }
			style={ { color: vk_staff_profileTitleColor } }
			value={ vk_staff_text_profileTitle }
                    />
		<RichText.Content
			tagName="p"
			className={ 'vk_staff_text_profileText' }
			style={ { color: vk_staff_profileTextColor } }
			value={ vk_staff_text_profileText }
                    />
	</div>
	{ vk_staff_photo_image ?
		<div className={ `vk_staff_photo vk_staff_photo-border-${vk_staff_photoBorder}` }>
			<img className={ `vk_staff_photo_image` } src={ vk_staff_photo_image } alt={
                            vk_staff_photo_image_alt ? __(vk_staff_photo_image_alt, 'vk-blocks')
                                :
                                ""
                        } />
		</div>
                    : ''
                }
            </div>;
        }
        return (returnELm);
    }
}
