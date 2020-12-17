function Spacer({ style, viewPort }) {
	return <div className={`vk_spacer-display-${viewPort}`} style={style} />;
}
export default function Spacers({
	type,
	pcSize,
	tabletSize,
	mobileSize,
	unit,
}) {
	if (type === 'height') {
		return (
			<>
				<Spacer viewPort={'pc'} style={{ height: pcSize + unit }} />
				<Spacer
					viewPort={'tablet'}
					style={{ height: tabletSize + unit }}
				/>
				<Spacer
					viewPort={'mobile'}
					style={{ height: mobileSize + unit }}
				/>
			</>
		);
	} else if (type === 'margin-top') {
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
}
