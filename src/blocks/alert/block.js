/**
 * Alert block type
 *
 */
import { deprecated } from './deprecated';
import { vkbBlockEditor } from "./../_helper/depModules";
import { content } from "./../_helper/example-data"

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { PanelBody, SelectControl } = wp.components;
const { InspectorControls, RichText } = vkbBlockEditor;
const { Fragment } = wp.element;
const BlockIcon = (
	<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M10.89 14.778l-3.267.008a.11.11 0 00-.102.075l-.25.722c-.022.076.03.152.103.152h1.27c.095 0 .146.122.08.19L6.7 18.105h.007l1.042 3.397c.022.076-.03.145-.103.145h-1.02a.104.104 0 01-.102-.076L6 19.83c-.029-.107-.168-.107-.205-.008l-.426 1.223a.109.109 0 000 .069l.39 1.481c.014.046.058.084.102.084H9.15c.073 0 .125-.076.103-.145l-1.329-4.277c-.014-.038 0-.084.03-.114l3.016-3.176c.066-.069.015-.19-.08-.19z" fill="#000" />
		<path d="M7.022 13l-1.99.008a.11.11 0 00-.102.076l-.257.721c-.03.076.03.152.103.152h.836c.074 0 .125.076.103.152l-2.37 6.717a.108.108 0 01-.206 0l-1.703-4.848a.112.112 0 01.103-.152h.859a.11.11 0 01.103.076l.616 1.748a.108.108 0 00.206 0l.954-2.72a.112.112 0 00-.103-.152H.108c-.073 0-.125.076-.103.152l3.127 8.996a.108.108 0 00.205 0l3.787-10.774c.022-.076-.029-.152-.102-.152z" fill="#D8141C" />
		<path fill-rule="evenodd" clip-rule="evenodd" d="M24 8.5a8.5 8.5 0 01-12.123 7.691l.178-.188c.976-1.02.252-2.725-1.165-2.725l-2.272.005c.06-.673-.304-1.433-1.038-1.691A8.5 8.5 0 1124 8.5zm-7.859.69h-1.255l-.873-2.908V4H17v2.282l-.859 2.909zm.859 1.3V13h-3v-2.51h3z" fill="#000" />
	</svg>
);

registerBlockType('vk-blocks/alert', {

	title: __('Alert', 'vk-blocks'),

	icon: BlockIcon,

	category: 'vk-blocks-cat',

	attributes: {
		style: {
			type: 'string',
			default: 'info',
		},
		content: {
			type: 'string',
			source: 'html',
			selector: 'p',
		}
	},
	example: {
		attributes: {
			style: 'info',
			content
		},
	},

	edit({ attributes, setAttributes, className }) {
		const {
			style,
			content
		} = attributes;

		const onChangeContent = (newContent) => {
			setAttributes({ content: newContent });
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={__("Style Settings", "vk-blocks")}>
						<SelectControl
							value={style}
							onChange={value => setAttributes({ style: value })}
							options={[
								{ label: __("Success", "vk-blocks"), value: "success" },
								{ label: __("Info", "vk-blocks"), value: "info" },
								{ label: __("Warning", "vk-blocks"), value: "warning" },
								{ label: __("Danger", "vk-blocks"), value: "danger" },
							]}
						/>
					</PanelBody>
				</InspectorControls>
				<div className={`${className} alert alert-${style}`}>
					<RichText
						tagName="p"
						onChange={onChangeContent}
						value={content}
					/>
				</div>
			</Fragment>
		);
	},

	save({ attributes, className }) {
		const {
			style,
			content
		} = attributes;
		return (
			<div className={`${className} alert alert-${style}`}>
				<RichText.Content
					tagName={'p'}
					value={content} />
			</div>
		);
	},
	deprecated,
});
