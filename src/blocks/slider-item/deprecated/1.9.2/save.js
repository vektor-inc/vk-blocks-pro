/* eslint camelcase: 0 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import GenerateBgImage from '@vkblocks/utils/GenerateBgImage';
const prefix = 'vk_slider_item';

export default function save(props) {
	const { attributes } = props;
	const { verticalAlignment, padding_left_and_right, clientId } = attributes;
	let classPaddingLR;
	let containerClass;

	//classPaddingLRのクラス切り替え
	classPaddingLR = '';
	if (padding_left_and_right === '0') {
		classPaddingLR = ` ${prefix}-paddingLR-none`;
	} else if (padding_left_and_right === '1') {
		classPaddingLR = ` ${prefix}-paddingLR-use`;
	} else if (padding_left_and_right === '2') {
		// Fit to content area width
		classPaddingLR = ` ${prefix}-paddingLR-zero`;
	}

	if (
		classPaddingLR === ` ${prefix}-paddingLR-none` ||
		classPaddingLR === ''
	) {
		containerClass = `${prefix}_container container`;
	} else {
		containerClass = `${prefix}_container`;
	}

	const blockProps = useBlockProps.save({
		className: `vk_slider_item swiper-slide vk_valign-${verticalAlignment} ${prefix}-${clientId} ${classPaddingLR} ${prefix}-paddingVertical-none`,
	});
	return (
		<div {...blockProps}>
			<GenerateBgImage prefix={prefix} clientId={clientId} {...props} />
			<div className={containerClass}>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
