import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	let {
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
		clickStop,
	} = attributes;
	let alignClass;

	// slidesPerView 互換設定
	if (slidesPerView === undefined) {
		slidesPerView = 1;
	}
	// slidesPerGroup 互換設定
	if (slidesPerGroup === undefined) {
		slidesPerGroup = 1;
	}

	// pagination 互換設定
	if (pagination === false) {
		pagination = 'hide';
	}
	if (pagination === true) {
		pagination = 'bullets';
	}

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
		clickStop,
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
	if (pagination !== 'hide') {
		pagination_html = (
			<div
				className={`swiper-pagination swiper-pagination-${pagination}`}
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
