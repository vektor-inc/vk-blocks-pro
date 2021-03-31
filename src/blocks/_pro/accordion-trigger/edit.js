import { FontAwesome } from '@vkblocks/utils/font-awesome-new';
import { PanelBody, BaseControl } from '@wordpress/components';
import {
	InspectorControls,
	ColorPalette,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import ReactHtmlParser from 'react-html-parser';

export default function AccordionTriggerEdit(props) {
	const { attributes, setAttributes } = props;
	let { fontAwesomeIconBefore, fontAwesomeIconColor } = attributes;

	let iconBefore;

	if (fontAwesomeIconBefore) {
		//for recovering block
		fontAwesomeIconColor = fontAwesomeIconColor
			? fontAwesomeIconColor
			: '#000000';

		//add inline css
		const faIconFragmentBefore = fontAwesomeIconBefore.split('<i');
		faIconFragmentBefore[0] =
			faIconFragmentBefore[0] +
			`<i style="color:${fontAwesomeIconColor};" `;
		iconBefore = faIconFragmentBefore.join('');
	}

	const blockProps = useBlockProps({
		className: `vk_accordion-trigger`,
	});
	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Font Awesome Icon Settings', 'vk-blocks')}
				>
					<BaseControl
						label={__('Before text', 'vk-blocks')}
						id={`vk_heading_beforeText`}
					>
						<FontAwesome
							attributeName={'fontAwesomeIconBefore'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('Icon Color', 'vk-blocks')}
						id={`vk_heading_iconColor`}
					>
						<ColorPalette
							value={fontAwesomeIconColor}
							onChange={(value) =>
								setAttributes({
									fontAwesomeIconColor: value,
								})
							}
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				{ReactHtmlParser(iconBefore)}
				<InnerBlocks
					templateLock={false}
					template={[['core/paragraph']]}
				/>
				<span
					className={`vk_accordion-toggle vk_accordion-toggle-close`}
				></span>
			</div>
		</>
	);
}
