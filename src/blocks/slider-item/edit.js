/**
 * External dependencies
 */
import classnames from 'classnames';

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
		blockId,
	} = attributes;

	//classPaddingLRのクラス切り替え
	let containerClass = `${prefix}_container`;
	let containerStyles = {};
	const classPaddingLR = '';
	switch (padding_left_and_right) {
		case '0':
			containerClass += ' container';
			break;
		case '1':
			containerStyles = { paddingLeft: '4em', paddingRight: '4em' };
			break;
		case '2':
			containerStyles = { paddingLeft: '0', paddingRight: '0' };
			break;
	}

	const opacityClass = opacity && opacity * 10;
	const bgAreaClasses = classnames('vk_slider_item-background-area', {
		[`has-background`]: bgColor !== undefined,
		[`has-${bgColor}-background-color`]:
			bgColor !== undefined && !isHexColor(bgColor),
		[`has-background-dim`]: opacity !== undefined,
		[`has-background-dim-${opacityClass}`]: opacityClass !== undefined,
	});

	const bgAreaStyles = {
		backgroundColor: isHexColor(bgColor) ? bgColor : undefined,
	};

	const GetBgImage = (
		<>
			{(bgImage || bgImageTablet || bgImageMobile) && (
				<GenerateBgImage prefix={prefix} blockId={blockId} {...props} />
			)}
			<div className={bgAreaClasses} style={bgAreaStyles}></div>
		</>
	);

	const blockProps = useBlockProps.save({
		className: `vk_slider_item swiper-slide vk_valign-${verticalAlignment} ${prefix}-${blockId} ${classPaddingLR} ${prefix}-paddingVertical-none`,
		style: containerStyles,
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
