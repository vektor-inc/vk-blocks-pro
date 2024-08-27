/* eslint camelcase: 0 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import GenerateBgImage from './GenerateBgImage';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
const prefix = 'vk_slider_item';

export default function save(props) {
	const { attributes } = props;
	const {
		verticalAlignment,
		bgColor,
		opacity,
		padding_left_and_right,
		bgImageMobile,
		bgImageTablet,
		bgImage,
		clientId,
	} = attributes;
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

	const bgColorClasses = [];
	let style;
	if (bgColor !== undefined) {
		bgColorClasses.push('has-background');
		if (!isHexColor(bgColor)) {
			bgColorClasses.push(`has-${bgColor}-background-color`);
		} else {
			style = { backgroundColor: bgColor };
		}
	}

	if (opacity !== undefined) {
		const opacityClass = opacity * 10;
		bgColorClasses.push('has-background-dim');
		bgColorClasses.push(`has-background-dim-${opacityClass}`);
	}

	let GetBgImage;
	if (bgImage || bgImageTablet || bgImageMobile) {
		GetBgImage = (
			<GenerateBgImage prefix={prefix} clientId={clientId} {...props} />
		);
	} else {
		GetBgImage = <div className="vk_slider_item-background-area"></div>;
	}

	const blockProps = useBlockProps.save({
		className: `vk_slider_item swiper-slide vk_valign-${verticalAlignment} ${prefix}-${clientId} ${classPaddingLR} ${prefix}-paddingVertical-none ${bgColorClasses.join(
			' '
		)}`,
		style,
	});
	return (
		<div {...blockProps}>
			{GetBgImage}
			<div className={containerClass}>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
