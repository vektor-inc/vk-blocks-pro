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

	////////////////////////
	const backgroundInfo = [];
	if (bgImageMobile && !bgImageTablet && !bgImage) {
		backgroundInfo.push({ url: bgImageMobile });
	} else if (!bgImageMobile && bgImageTablet && !bgImage) {
		backgroundInfo.push({ url: bgImageTablet });
	} else if (!bgImageMobile && !bgImageTablet && bgImage) {
		backgroundInfo.push({ url: bgImage });
	} else if (bgImageMobile && !bgImageTablet && bgImage) {
		backgroundInfo.push({
			mediaQuery: underPcViewport,
			url: bgImageMobile,
		});
		backgroundInfo.push({ mediaQuery: pcViewport, url: bgImage });
	} else if (!bgImageMobile && bgImageTablet && bgImage) {
		backgroundInfo.push({
			mediaQuery: underPcViewport,
			url: bgImageTablet,
		});
		backgroundInfo.push({ mediaQuery: pcViewport, url: bgImage });
	} else if (bgImageMobile && bgImageTablet && !bgImage) {
		backgroundInfo.push({ mediaQuery: mobileViewport, url: bgImageMobile });
		backgroundInfo.push({ mediaQuery: tabletViewport, url: bgImageTablet });
	} else if (bgImageMobile && bgImageTablet && bgImage) {
		backgroundInfo.push({ mediaQuery: mobileViewport, url: bgImageMobile });
		backgroundInfo.push({ mediaQuery: tabletViewport, url: bgImageTablet });
		backgroundInfo.push({ mediaQuery: pcViewport, url: bgImage });
	} else if (!bgImageMobile && !bgImageTablet && !bgImage) {
		backgroundInfo.push({ mediaQuery: null, url: null });
	}

	const selectorCss = `.${prefix}-${clientId}`;
	const bgColorCss = bgColorOutputDisable
		? ''
		: `background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity})`;
	const outputCss = [];
	backgroundInfo.forEach((bg) => {
		let mediaQueryBefore = '';
		let mediaQueryAfter = '';
		if (backgroundInfo.length > 1) {
			mediaQueryBefore = `@media screen and (${bg.mediaQuery}) {`;
			mediaQueryAfter = '}';
		}

		let bgUrlCss = '';
		if (bg.url) {
			bgUrlCss = `url(${bg.url});`;
		}

		const comma = bgUrlCss ? ',' : ';';

		outputCss.push(mediaQueryBefore ?? '');
		outputCss.push(
			`${selectorCss}{${bgColorCss}${comma}${bgUrlCss} ${backgroundStyle}}`
		);
		outputCss.push(mediaQueryAfter ?? '');
	});

	return <style>{outputCss.join('')}</style>;
};
export default GenerateBgImage;
