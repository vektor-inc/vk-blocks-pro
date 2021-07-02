// Spacers

const Spacer = ({ style, viewPort }) => {
	return <div className={`vk_spacer-display-${viewPort}`} style={style} />;
};
export default function Spacers({
	type,
	pcSize,
	tabletSize,
	mobileSize,
	unit,
}) {
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
}