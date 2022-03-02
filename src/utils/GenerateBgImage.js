/**
 * GenerateBgImage deprecated
 *
 * save.jsに反映される内容がutils内にあると互換性対応が出来ないので各ブロック内に移植
 *
 * 以下で使用
 * Outer 0.60.0-1.26.0
 * Slider Item 0.0.0-1.22.1
 * 関連 #925 #950 #1032
 */
import hex2rgba from './hex-to-rgba';
const GenerateBgImage = (props) => {
	const { attributes, clientId, prefix } = props;
	const { bgImageMobile, bgImageTablet, bgImage, bgColor, opacity, bgSize } =
		attributes;

	const mobileViewport = 'max-width: 575.98px';
	const tabletViewport = 'min-width: 576px';
	const pcViewport = 'min-width: 1200px';
	const underPcViewport = 'max-width: 1199.98px';

	let backgroundStyle;
	const backgroundPosition = 'background-position:center!important;';
	if ('cover' === bgSize) {
		backgroundStyle = `background-size:${bgSize}!important; ${backgroundPosition}`;
	} else if ('repeat' === bgSize) {
		backgroundStyle = `background-repeat:${bgSize}!important; ${backgroundPosition}`;
	} else {
		backgroundStyle = ``;
	}

	let bgColorWOpacity;

	//hexからrgbaに変換
	if (bgColor) {
		bgColorWOpacity = hex2rgba(bgColor, opacity);
	} else {
		//背景色をクリアした時は、白に変更
		bgColorWOpacity = hex2rgba('#fff', opacity);
	}

	//moible only
	if (bgImageMobile && !bgImageTablet && !bgImage) {
		return (
			<style>{`.${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImageMobile}); ${backgroundStyle}}`}</style>
		);
	}
	//tablet only
	if (!bgImageMobile && bgImageTablet && !bgImage) {
		return (
			<style>{`.${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImageTablet}); ${backgroundStyle}}`}</style>
		);
	}
	//pc only
	if (!bgImageMobile && !bgImageTablet && bgImage) {
		return (
			<style>{`.${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImage}); ${backgroundStyle}}`}</style>
		);
	}
	//pc -mobile
	if (bgImageMobile && !bgImageTablet && bgImage) {
		return (
			<style>
				{`
          @media screen and (${underPcViewport}) {
            .${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImageMobile}); ${backgroundStyle}}
         }
          @media screen and (${pcViewport}) {
            .${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImage}); ${backgroundStyle}}
         }
          `}
			</style>
		);
	}
	//pc -tablet
	if (!bgImageMobile && bgImageTablet && bgImage) {
		return (
			<style>
				{`
          @media screen and (${underPcViewport}) {
            .${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImageTablet}); ${backgroundStyle}}
         }
          @media screen and (${pcViewport}) {
            .${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImage}); ${backgroundStyle}}
         }
          `}
			</style>
		);
	}
	//tablet - mobile
	if (bgImageMobile && bgImageTablet && !bgImage) {
		return (
			<style>
				{`
          @media screen and (${mobileViewport}) {
            .${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImageMobile}); ${backgroundStyle}}
         }
          @media screen and (${tabletViewport}) {
            .${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImageTablet}); ${backgroundStyle}}
         }
        `}
			</style>
		);
	}
	//pc -tablet - mobile
	if (bgImageMobile && bgImageTablet && bgImage) {
		return (
			<style>
				{`
        @media screen and (${mobileViewport}) {
          .${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImageMobile}); ${backgroundStyle}}
       }
        @media screen and (${tabletViewport}) {
          .${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImageTablet}); ${backgroundStyle}}
       }
        @media screen and (${pcViewport}) {
          .${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImage}); ${backgroundStyle}}
       }
        `}
			</style>
		);
	}
	//no background image
	if (!bgImageMobile && !bgImageTablet && !bgImage) {
		return (
			<style>{`.${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}); ${backgroundStyle}}`}</style>
		);
	}
};
export default GenerateBgImage;
