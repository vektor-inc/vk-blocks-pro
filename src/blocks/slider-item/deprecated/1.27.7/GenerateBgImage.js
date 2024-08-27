const GenerateBgImage = (props) => {
	const { attributes, clientId, prefix } = props;
	const { bgImageMobile, bgImageTablet, bgImage, bgSize } = attributes;

	const mobileViewport = 'max-width: 575.98px';
	const tabletViewport = 'min-width: 576px';
	const pcViewport = 'min-width: 992px';
	const underPcViewport = 'max-width: 992.98px';

	let backgroundStyle;
	const backgroundPosition = 'background-position:center!important;';
	if ('cover' === bgSize) {
		backgroundStyle = `background-size:${bgSize}!important; ${backgroundPosition}`;
	} else if ('repeat' === bgSize) {
		backgroundStyle = `background-repeat:${bgSize}!important; background-size: auto; ${backgroundPosition}`;
	} else {
		backgroundStyle = ``;
	}

	//moible only
	if (bgImageMobile && !bgImageTablet && !bgImage) {
		return (
			<style>{`.${prefix}-${clientId}{background-image: url(${bgImageMobile}); ${backgroundStyle}}`}</style>
		);
	}
	//tablet only
	if (!bgImageMobile && bgImageTablet && !bgImage) {
		return (
			<style>{`.${prefix}-${clientId}{background-image: url(${bgImageTablet}); ${backgroundStyle}}`}</style>
		);
	}
	//pc only
	if (!bgImageMobile && !bgImageTablet && bgImage) {
		return (
			<style>{`.${prefix}-${clientId}{background-image: url(${bgImage}); ${backgroundStyle}}`}</style>
		);
	}
	//pc -mobile
	if (bgImageMobile && !bgImageTablet && bgImage) {
		return (
			<style>
				{`
          @media screen and (${underPcViewport}) {
            .${prefix}-${clientId}{background-image: url(${bgImageMobile}); ${backgroundStyle}}
         }
          @media screen and (${pcViewport}) {
            .${prefix}-${clientId}{background-image: url(${bgImage}); ${backgroundStyle}}
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
            .${prefix}-${clientId}{background-image: url(${bgImageTablet}); ${backgroundStyle}}
         }
          @media screen and (${pcViewport}) {
            .${prefix}-${clientId}{background-image: url(${bgImage}); ${backgroundStyle}}
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
            .${prefix}-${clientId}{background-image: url(${bgImageMobile}); ${backgroundStyle}}
         }
          @media screen and (${tabletViewport}) {
            .${prefix}-${clientId}{background-image: url(${bgImageTablet}); ${backgroundStyle}}
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
          .${prefix}-${clientId}{background-image: url(${bgImageMobile}); ${backgroundStyle}}
       }
        @media screen and (${tabletViewport}) {
          .${prefix}-${clientId}{background-image: url(${bgImageTablet}); ${backgroundStyle}}
       }
        @media screen and (${pcViewport}) {
          .${prefix}-${clientId}{background-image: url(${bgImage}); ${backgroundStyle}}
       }
        `}
			</style>
		);
	}
};
export default GenerateBgImage;
