// Spacers

const Spacer = ({ style, viewPort }) => {
	return <div className={`vk_spacer-display-${viewPort}`} style={style} />;
};


export default function Spacers({
	settingType,
	type,
	pcSize,
	tabletSize,
	mobileSize,
	unit,
}) {

	if (settingType === '_number' || settingType === undefined) {

		if (type === 'margin-top') {
			return (
				<>
					<Spacer viewPort={'pc'} style={{ marginTop: pcSize + unit }} />
					<Spacer
						viewPort={'tablet'}
						style={{ marginTop: tabletSize + unit }}
					/>
					<Spacer
						viewPort={'mobile'}
						style={{ marginTop: mobileSize + unit }}
					/>
				</>
			);
		}
		return (
			<>
				<Spacer viewPort={'pc'} style={{ height: pcSize + unit }} />
				<Spacer viewPort={'tablet'} style={{ height: tabletSize + unit }} />
				<Spacer viewPort={'mobile'} style={{ height: mobileSize + unit }} />
			</>
		);
	} else {
		return <div className={settingType} />;
	}
}
