import hex2rgba from './hex-to-rgba';
import { colorSlugToColorCode } from './color-slug-to-color-code';
import { isHexColor } from './is-hex-color';
const GenerateBgImage = (props) => {
	const { attributes, clientId, prefix, bgColorOutputDisable } = props;
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
	let bgHexColor = bgColor;
	//hexからrgbaに変換
	if (bgColor) {
		if (!isHexColor(bgColor)) {
			bgHexColor = colorSlugToColorCode(bgColor);
		}
		bgColorWOpacity = hex2rgba(bgHexColor, opacity);
	} else {
		//背景色をクリアした時は、白に変更
		bgColorWOpacity = hex2rgba('#fff', opacity);
	}

	/* eslint-disable */
	let backgroundInfo = [];

	// モバイル背景のみ有効
	if (bgImageMobile && !bgImageTablet && !bgImage) {
		backgroundInfo.push({ url: bgImageMobile });

		// タブレット背景のみ有効
	} else if (!bgImageMobile && bgImageTablet && !bgImage) {
		backgroundInfo.push({ url: bgImageTablet });

		// PC背景のみ有効
	} else if (!bgImageMobile && !bgImageTablet && bgImage) {
		backgroundInfo.push({ url: bgImage });

		// モバイル＆PC背景が有効
	} else if (bgImageMobile && !bgImageTablet && bgImage) {
		backgroundInfo.push({
			mediaQuery: underPcViewport,
			url: bgImageMobile,
		});
		backgroundInfo.push({ mediaQuery: pcViewport, url: bgImage });

		// タブレット＆PC背景が有効
	} else if (!bgImageMobile && bgImageTablet && bgImage) {
		backgroundInfo.push({
			mediaQuery: underPcViewport,
			url: bgImageTablet,
		});
		backgroundInfo.push({ mediaQuery: pcViewport, url: bgImage });

		// モバイル＆タブレット背景が有効
	} else if (bgImageMobile && bgImageTablet && !bgImage) {
		backgroundInfo.push({ mediaQuery: mobileViewport, url: bgImageMobile });
		backgroundInfo.push({ mediaQuery: tabletViewport, url: bgImageTablet });

		// PC&モバイル＆タブレット背景が有効
	} else if (bgImageMobile && bgImageTablet && bgImage) {
		backgroundInfo.push({ mediaQuery: mobileViewport, url: bgImageMobile });
		backgroundInfo.push({ mediaQuery: tabletViewport, url: bgImageTablet });
		backgroundInfo.push({ mediaQuery: pcViewport, url: bgImage });

		// 背景がすべて有効になっていない
	} else if (!bgImageMobile && !bgImageTablet && !bgImage) {
		backgroundInfo.push({ mediaQuery: null, url: null });
	}
	/* eslint-enable */

	// ここからCSSの組み立て処理
	const selectorCss = `.${prefix}-${clientId}`;
	const bgColorCss = bgColorOutputDisable
		? ''
		: `background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity})`;
	const outputCss = [];

	backgroundInfo.forEach((bg) => {
		let mediaQueryBefore = '';
		let mediaQueryAfter = '';

		// 背景情報が複数あるときのみメディアクエリを指定
		if (backgroundInfo.length > 1) {
			mediaQueryBefore = `\n\t@media screen and (${bg.mediaQuery}) {\n\t`;
			mediaQueryAfter = '}\n\t';
		}

		// 背景が指定されているときのみ url出力
		let bgUrlCss = '';
		if (bg.url) {
			bgUrlCss = `url(${bg.url});`;
		}

		let separation = bgUrlCss ? ', ' : ';';

		if ('' === bgColorCss && !bg.url) {
			separation = '';
		}

		outputCss.push(mediaQueryBefore ?? '');
		outputCss.push(
			`${selectorCss}{${bgColorCss}${separation}${bgUrlCss} ${backgroundStyle}}\n`
		);
		outputCss.push(mediaQueryAfter ?? '');
	});

	return <style>{outputCss.join('')}</style>;
};
export default GenerateBgImage;
