import save1_102_0 from './1.102.0/save';
import save1_20_2 from './1.20.2/save';
import save1_3_1 from './1.3.1/save';

export const blockAttributes = {
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

const blockAttributes2 = {
    ...blockAttributes,
    vk_staff_fontFamily: {
        type: 'string',
        default: '0',
    },
}

const deprecated = [
    {
        attributes: blockAttributes2,
        save: save1_102_0
    },
    {
        attributes: blockAttributes2,
        save: save1_20_2
    },
    {
        attributes: blockAttributes2,
        save: save1_3_1
    }
];

export default deprecated;
