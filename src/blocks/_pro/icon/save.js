import { VKBIcon } from './component';
import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	let {
		faIcon,
		iconSize,
		iconMargin,
		iconRadius,
		iconUnit,
		iconAlign,
		iconType,
		iconColor,
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
				lbUrl={iconUrl}
				lbTarget={iconTarget}
				lbSize={iconSize}
				lbMargin={iconMargin}
				lbRadius={iconRadius}
				lbUnit={iconUnit}
				lbAlign={iconAlign}
				lbType={iconType}
				lbColor={iconColor}
				lbFontAwesomeIcon={faIcon}
			/>
		</div>
	);
}
