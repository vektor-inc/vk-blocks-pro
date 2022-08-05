// Spacers

const Spacer = ({ style, viewPort }) => {
	return <div className={`vk_spacer-display-${viewPort}`} style={style} />;
};

export default function Spacers({
	spaceSize,
	type,
	pcSize,
	tabletSize,
	mobileSize,
	unit,
}) {
	const SPACE_SIZE_CLASSNAMES = {
		small: 'vk_block-margin-sm',
		medium: 'vk_block-margin-md',
		large: 'vk_block-margin-lg',
	};

	if (spaceSize !== undefined && SPACE_SIZE_CLASSNAMES[spaceSize]) {
		if (type === 'margin-top') {
			return (
				<div
					className={
						SPACE_SIZE_CLASSNAMES[spaceSize] + '--margin-top'
					}
				/>
			);
		} else if (type === 'margin-bottom') {
			return (
				<div
					className={
						SPACE_SIZE_CLASSNAMES[spaceSize] + '--margin-bottom'
					}
				/>
			);
		}
		return (
			<div className={SPACE_SIZE_CLASSNAMES[spaceSize] + '--height'} />
		);
	}

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
	} else if (type === 'margin-bottom') {
		return (
			<>
				<Spacer
					viewPort={'pc'}
					style={{ marginBottom: pcSize + unit }}
				/>
				<Spacer
					viewPort={'tablet'}
					style={{ marginBottom: tabletSize + unit }}
				/>
				<Spacer
					viewPort={'mobile'}
					style={{ marginBottom: mobileSize + unit }}
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
