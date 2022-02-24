import { isHexColor } from '@vkblocks/utils/is-hex-color';

const _buildBgInfo = (bgImage, bgImageTablet, bgImageMobile) => {
	const mobileViewport = 'max-width: 575.98px';
	const tabletViewport = 'min-width: 576px';
	const pcViewport = 'min-width: 992px';
	const underPcViewport = 'max-width: 991.98px';

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

	return backgroundInfo;
};

class VK_Outer_Container {
	constructor(selector) {
		this.selector = selector;
		this.classNames = [];
		this.styles = {};
	}

	setClassName(name) {
		this.classNames.push(name);
	}

	setStyle(attr, value) {
		this.styles[attr] = value;
	}

	outputClassName() {
		return this.classNames.join(' ');
	}

	outputStyle() {
		const styles = [];
		Object.keys(this.styles).forEach((key) => {
			styles.push(`${key}: ${this.styles[key]}`);
		});
		return styles.length ? `${this.selector} { ${styles.join('; ')} }` : '';
	}
}
const outerBackground = (props) => {
	const { attributes, clientId, prefix } = props;

	const blockContainer = new VK_Outer_Container(`.${prefix}-${clientId}`);
	const bgContainer = new VK_Outer_Container(
		`.${prefix}-${clientId} .vk_outer_bgoverlay`
	);

	bgContainer.setClassName(`vk_outer_bgoverlay`);

	// 背景色がカラーパレット色指定の場合
	if (!isHexColor(attributes.bgColor)) {
		bgContainer.setClassName(`has-${attributes.bgColor}-background-color`);

		// 背景色がカスタムカラー（カラーコード指定）の場合
	} else if (attributes.bgColor) {
		bgContainer.setStyle('background-color', attributes.bgColor);

		// 背景色指定しない場合は白
	} else {
		bgContainer.setStyle('background-color', '#fff');
	}

	// 透過設定
	bgContainer.setClassName('has-background-dim');
	bgContainer.setClassName(`has-background-dim-${attributes.opacity * 100}`);

	// 背景情報を構築
	const backgroundInfo = _buildBgInfo(
		attributes.bgImage,
		attributes.bgImageTablet,
		attributes.bgImageMobile
	);
	const outputStyles = [];

	backgroundInfo.forEach((bg) => {
		let mediaQueryBefore = '';
		let mediaQueryAfter = '';

		// 背景情報が複数あるときのみメディアクエリを指定
		if (backgroundInfo.length > 1) {
			mediaQueryBefore = `\n\t@media screen and (${bg.mediaQuery}) {\n\t`;
			mediaQueryAfter = '}\n\t';
		}

		// 背景が指定されているときのみ url出力
		if (bg.url) {
			blockContainer.setStyle('background-image', `url(${bg.url})`);
		}

		outputStyles.push(mediaQueryBefore ?? '');
		outputStyles.push(blockContainer.outputStyle());
		outputStyles.push(bgContainer.outputStyle());
		outputStyles.push(mediaQueryAfter ?? '');
	});

	const outputStyle = outputStyles.join('');

	return (
		<>
			<span className={bgContainer.outputClassName()}></span>
			{outputStyle ? <style>{outputStyle}</style> : ''}
		</>
	);
};
export default outerBackground;
