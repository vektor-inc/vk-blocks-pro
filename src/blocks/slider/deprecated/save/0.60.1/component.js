import { InnerBlocks } from '@wordpress/block-editor';
import classNames from 'classnames';

export const ColumnResponsive = ( props ) => {
	const for_ = props.for_;
	const attributes = props.attributes;
	const {
		pagination,
		clientId,
		width,
		autoPlay,
		autoPlayDelay,
		loop,
		effect,
		speed,
	} = attributes;
	const containerClass = ' vk_grid-column';
	let elm;
	let alignClass;
	const ALLOWED_BLOCKS = [ [ 'vk-blocks/slider-item' ] ];
	const TEMPLATE = ALLOWED_BLOCKS;

	if ( 'full' === width ) {
		alignClass = 'vk_width-full';
	} else if ( 'wide' === width ) {
		alignClass = 'vk_width-wide';
	} else {
		alignClass = 'vk_width';
	}

	//編集画面とサイト上の切り替え
	if ( for_ === 'edit' ) {
		elm = (
			<div>
				<InnerBlocks
					//編集画面の追加タグ用に2回目のClassを挿入
					className={ `${ containerClass } row` }
					template={ TEMPLATE }
					allowedBlocks={ ALLOWED_BLOCKS }
				/>
			</div>
		);
	} else if ( 'save' ) {
		elm = <InnerBlocks.Content />;
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
	};

	return (
		<div
			data-vkb-slider={ JSON.stringify( sliderData ) }
			className={ classNames(
				`swiper-container vk_slider vk_slider_${ clientId }`,
				alignClass
			) }
		>
			<div className={ `swiper-wrapper` }>{ elm }</div>
			<div className="swiper-button-next"></div>
			<div className="swiper-button-prev"></div>
			{ pagination && <div className="swiper-pagination"></div> }
		</div>
	);
};
