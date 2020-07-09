export const schema = {
    vk_staff_text_name: {
        type: 'string',
        source: 'html',
        selector: 'h3',
    },
    vk_staff_text_caption: {
        type: 'string',
        source: 'html',
        selector: 'p.vk_staff_text_caption',
    },
    vk_staff_text_role: {
        type: 'string',
        source: 'html',
        selector: 'p.vk_staff_text_role',
    },
    vk_staff_text_profileTitle: {
        type: 'string',
        source: 'html',
        selector: 'h4',
    },
    vk_staff_text_profileText: {
        type: 'string',
        source: 'html',
        selector: 'p.vk_staff_text_profileText',
    },
    vk_staff_photo_image: {
        type: 'string',
        default: '',
    },
    vk_staff_photo_image_alt: {
        type: 'string',
        default: 'Profile Picture',
    },
    vk_staff_layout: {
        type: 'string',
        default: 'default',
    },
    vk_staff_nameColor: {
        type: 'string',
        default: 'inherit',
    },
    vk_staff_captionColor: {
        type: 'string',
        default: 'inherit',
    },
    vk_staff_positionColor: {
        type: 'string',
        default: 'inherit',
    },
    vk_staff_profileTitleColor: {
        type: 'string',
        default: 'inherit',
    },
    vk_staff_profileTextColor: {
        type: 'string',
        default: 'inherit',
    },
    vk_staff_photoBorder: {
        type: 'string',
        default: 'default',
    }
};

export const example = {
    vk_staff_text_name: "",
    vk_staff_text_caption: "",
    vk_staff_text_role: "",
    vk_staff_text_profileTitle: "",
    vk_staff_text_profileText: "",
    vk_staff_photo_image: 'Profile Picture',
    vk_staff_layout:  'default',
    vk_staff_nameColor: 'inherit',
    vk_staff_captionColor: 'inherit',
    vk_staff_positionColor:'inherit',
    vk_staff_profileTitleColor: 'inherit',
    vk_staff_profileTextColor: 'inherit',
    vk_staff_photoBorder: 'default'
};
