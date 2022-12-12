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
				 <GenerateBgImage
					 prefix={prefix}
					 clientId={clientId}
					 {...props}
				 />
			 )}
			 <div className={bgAreaClasses} style={bgAreaStyles}></div>
		 </>
	 );

	 const blockProps = useBlockProps.save({
		 className: `vk_slider_item swiper-slide vk_valign-${verticalAlignment} ${prefix}-${clientId} ${classPaddingLR} ${prefix}-paddingVertical-none`,
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
