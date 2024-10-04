const GenerateBgImage = (props) => {
	const { attributes, prefix } = props;
	const {
		bgImageMobile,
		bgImageTablet,
		bgImage,
		bgFocalPointPC,
		bgFocalPointTablet,
		bgFocalPointMobile,
		bgSize,
		blockId,
	} = attributes;

	const mobileViewport = 'max-width: 575.98px';
	const tabletViewport = 'min-width: 576px';
	const pcViewport = 'min-width: 992px';
	const underPcViewport = 'max-width: 992.98px';

	// 背景位置の変換関数
	const coordsToBackgroundPosition = (focalPoint) => {
		if (!focalPoint || (isNaN(focalPoint.x) && isNaN(focalPoint.y))) {
			return '50% 50%';
		}
		const x = isNaN(focalPoint.x) ? 0.5 : focalPoint.x;
		const y = isNaN(focalPoint.y) ? 0.5 : focalPoint.y;
		return `${x * 100}% ${y * 100}%`;
	};

	let backgroundStyle;
	if ('cover' === bgSize) {
		backgroundStyle = `background-size:${bgSize}!important;`;
	} else if ('repeat' === bgSize) {
		backgroundStyle = `background-repeat:${bgSize}!important; background-size: auto;`;
	} else {
		backgroundStyle = ``;
	}

	// モバイルのみ
	if (bgImageMobile && !bgImageTablet && !bgImage) {
		return (
			<style>
				{`
        .${prefix}-${blockId} {
          background-image: url(${bgImageMobile}) !important;
          background-position: ${coordsToBackgroundPosition(bgFocalPointMobile)}!important;
          ${backgroundStyle}
        }
        `}
			</style>
		);
	}
	// タブレットのみ
	if (!bgImageMobile && bgImageTablet && !bgImage) {
		return (
			<style>
				{`
        .${prefix}-${blockId} {
          background-image: url(${bgImageTablet}) !important;
          background-position: ${coordsToBackgroundPosition(bgFocalPointTablet)}!important;
          ${backgroundStyle}
        }
        `}
			</style>
		);
	}
	// PCのみ
	if (!bgImageMobile && !bgImageTablet && bgImage) {
		return (
			<style>
				{`
        .${prefix}-${blockId} {
          background-image: url(${bgImage}) !important;
          background-position: ${coordsToBackgroundPosition(bgFocalPointPC)}!important;
          ${backgroundStyle}
        }
        `}
			</style>
		);
	}
	// PCとモバイル
	if (bgImageMobile && !bgImageTablet && bgImage) {
		return (
			<style>
				{`
        @media screen and (${underPcViewport}) {
          .${prefix}-${blockId} {
            background-image: url(${bgImageMobile}) !important;
            background-position: ${coordsToBackgroundPosition(bgFocalPointMobile)}!important;
            ${backgroundStyle}
          }
        }
        @media screen and (${pcViewport}) {
          .${prefix}-${blockId} {
            background-image: url(${bgImage}) !important;
            background-position: ${coordsToBackgroundPosition(bgFocalPointPC)}!important;
            ${backgroundStyle}
          }
        }
        `}
			</style>
		);
	}
	// PCとタブレット
	if (!bgImageMobile && bgImageTablet && bgImage) {
		return (
			<style>
				{`
        @media screen and (${underPcViewport}) {
          .${prefix}-${blockId} {
            background-image: url(${bgImageTablet}) !important;
            background-position: ${coordsToBackgroundPosition(bgFocalPointTablet)}!important;
            ${backgroundStyle}
          }
        }
        @media screen and (${pcViewport}) {
          .${prefix}-${blockId} {
            background-image: url(${bgImage}) !important;
            background-position: ${coordsToBackgroundPosition(bgFocalPointPC)}!important;
            ${backgroundStyle}
          }
        }
        `}
			</style>
		);
	}
	// タブレットとモバイル
	if (bgImageMobile && bgImageTablet && !bgImage) {
		return (
			<style>
				{`
        @media screen and (${mobileViewport}) {
          .${prefix}-${blockId} {
            background-image: url(${bgImageMobile}) !important;
            background-position: ${coordsToBackgroundPosition(bgFocalPointMobile)}!important;
            ${backgroundStyle}
          }
        }
        @media screen and (${tabletViewport}) {
          .${prefix}-${blockId} {
            background-image: url(${bgImageTablet}) !important;
            background-position: ${coordsToBackgroundPosition(bgFocalPointTablet)}!important;
            ${backgroundStyle}
          }
        }
        `}
			</style>
		);
	}
	// PC、タブレット、モバイル
	if (bgImageMobile && bgImageTablet && bgImage) {
		return (
			<style>
				{`
        @media screen and (${mobileViewport}) {
          .${prefix}-${blockId} {
            background-image: url(${bgImageMobile}) !important;
            background-position: ${coordsToBackgroundPosition(bgFocalPointMobile)}!important;
            ${backgroundStyle}
          }
        }
        @media screen and (${tabletViewport}) {
          .${prefix}-${blockId} {
            background-image: url(${bgImageTablet}) !important;
            background-position: ${coordsToBackgroundPosition(bgFocalPointTablet)}!important;
            ${backgroundStyle}
          }
        }
        @media screen and (${pcViewport}) {
          .${prefix}-${blockId} {
            background-image: url(${bgImage}) !important;
            background-position: ${coordsToBackgroundPosition(bgFocalPointPC)}!important;
            ${backgroundStyle}
          }
        }
        `}
			</style>
		);
	}
};

export default GenerateBgImage;
