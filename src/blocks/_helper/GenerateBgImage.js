import hex2rgba from "./hex-to-rgba";
const GenerateBgImage = (props) => {
	const { attributes, clientId, prefix } = props;
	const {
		bgImageMobile,
		bgImageTablet,
		bgImage,
		bgColor,
		opacity,
	} = attributes;

	console.log(bgColor)

	const mobileViewport = "max-width: 575.98px";
	const tabletViewport = "min-width: 576px";
	const pcViewport = "min-width: 1200px";
	const underPcViewport = "max-width: 1199.98px";

	let bgColorWOpacity;

	//hexからrgbaに変換
	if (bgColor) {
		bgColorWOpacity = hex2rgba(bgColor, opacity);
	} else {
		//背景色をクリアした時は、白に変更
		bgColorWOpacity = hex2rgba("#fff", opacity);
	}

	//moible only
	if (bgImageMobile && !bgImageTablet && !bgImage) {
		return (
			<style>{ `.${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImageMobile})}!important;` }</style>
		);
	}
	//tablet only
	if (!bgImageMobile && bgImageTablet && !bgImage) {
		return (
			<style>{ `.${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImageTablet})}!important;` }</style>
		);
	}
	//pc only
	if (!bgImageMobile && !bgImageTablet && bgImage) {
		return (
			<style>{ `.${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImage})}!important;` }</style>
		);
	}
	//pc -mobile
	if (bgImageMobile && !bgImageTablet && bgImage) {
		return (
			<style>
				{ `
          @media screen and (${underPcViewport}) {
            .${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImageMobile})}!important;
          }
          @media screen and (${pcViewport}) {
            .${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImage})}!important;
          }
          ` }
			</style>
		);
	}
	//pc -tablet
	if (!bgImageMobile && bgImageTablet && bgImage) {
		return (
			<style>
				{ `
          @media screen and (${underPcViewport}) {
            .${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImageTablet})}!important;
          }
          @media screen and (${pcViewport}) {
            .${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImage})}!important;
          }
          ` }
			</style>
		);
	}
	//tablet - mobile
	if (bgImageMobile && bgImageTablet && !bgImage) {
		return (
			<style>
				{ `
          @media screen and (${mobileViewport}) {
            .${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImageMobile})}!important;
          }
          @media screen and (${tabletViewport}) {
            .${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImageTablet})}!important;
          }
        ` }
			</style>
		);
	}
	//pc -tablet - mobile
	if (bgImageMobile && bgImageTablet && bgImage) {
		return (
			<style>
				{ `
        @media screen and (${mobileViewport}) {
          .${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImageMobile})}!important;
        }
        @media screen and (${tabletViewport}) {
          .${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImageTablet})}!important;
        }
        @media screen and (${pcViewport}) {
          .${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity}), url(${bgImage})}!important;
        }
        ` }
			</style>
		);
	}
	//no background image
	if (!bgImageMobile && !bgImageTablet && !bgImage) {
		return (
			<style>{ `.${prefix}-${clientId}{background: linear-gradient(${bgColorWOpacity}, ${bgColorWOpacity})}!important;` }</style>
		);
	}
};
export default GenerateBgImage
