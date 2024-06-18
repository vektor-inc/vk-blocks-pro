import { VKBIcon } from './component';
import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	let {
		faIcon,
		iconSize,
		iconSizeUnit,
		iconMargin,
		iconMarginUnit,
		iconRadius,
		iconAlign,
		iconType,
		iconColor,
		iconFontColor,
		iconUrl,
		iconTarget,
	} = attributes;

	if (faIcon && !faIcon.match(/<i/)) {
		faIcon = `<i class="${faIcon}"></i>`;
	}

	const blockProps = useBlockProps.save({
		className: `vk_icon`,
	});

	return (
		<div {...blockProps}>
			<VKBIcon
				lbFontAwesomeIcon={faIcon}
				lbSize={iconSize}
				lbSizeUnit={iconSizeUnit}
				lbMargin={iconMargin}
				lbMarginUnit={iconMarginUnit}
				lbRadius={iconRadius}
				lbAlign={iconAlign}
				lbType={iconType}
				lbColor={iconColor}
				lbFontColor={iconFontColor}
				lbUrl={iconUrl}
				lbTarget={iconTarget}
			/>
		</div>
	);
}
