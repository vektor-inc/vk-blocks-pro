import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		pagination,
		clientId,
		width,
		autoPlay,
		autoPlayDelay,
		loop,
		effect,
		speed,
		slidesPerView,
		slidesPerGroup,
		autoPlayStop,
		paginationType,
	} = attributes;
	let alignClass;

	const sliderData = {
		autoPlay,
		autoPlayDelay,
		pagination,
		clientId,
		width,
		loop,
		effect,
		speed,
		slidesPerView,
		slidesPerGroup,
		autoPlayStop,
		paginationType,
	};

	if ('full' === width) {
		alignClass = 'vk_width-full';
	} else if ('wide' === width) {
		alignClass = 'vk_width-wide';
	} else {
		alignClass = 'vk_width';
	}

	// ページネーションの HTML
	let pagination_html = '';
	if (paginationType !== 'hide') {
		pagination_html = (
			<div
				className={`swiper-pagination swiper-pagination-${paginationType}`}
			></div>
		);
	}

	const blockProps = useBlockProps.save({
		className: `swiper-container vk_slider vk_slider_${clientId} ${alignClass}`,
	});

	return (
		<div {...blockProps} data-vkb-slider={JSON.stringify(sliderData)}>
			<div className={`swiper-wrapper`}>
				<InnerBlocks.Content />
			</div>
			<div className="swiper-button-next"></div>
			<div className="swiper-button-prev"></div>
			{pagination_html}
		</div>
	);
}
