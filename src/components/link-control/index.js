import { __ } from '@wordpress/i18n';
import { BaseControl, TextControl, ToggleControl } from '@wordpress/components';
import { useCallback } from '@wordpress/element';

export const LinkControl = (props) => {
	const { setAttributes, attributes, blockName } = props;
	const { linkTarget, rel } = attributes;

	const NEW_TAB_REL = 'noreferrer noopener';
	const onSetLinkRel = useCallback(
		(value) => {
			setAttributes({ rel: value });
		},
		[setAttributes]
	);
	const onToggleOpenInNewTab = useCallback(
		(value) => {
			const newLinkTarget = value ? '_blank' : undefined;

			let updatedRel = rel;
			if (newLinkTarget && !rel) {
				updatedRel = NEW_TAB_REL;
			} else if (!newLinkTarget && rel === NEW_TAB_REL) {
				updatedRel = undefined;
			}

			setAttributes({
				linkTarget: newLinkTarget,
				rel: updatedRel,
			});
		},
		[rel, setAttributes]
	);

	return (
		<BaseControl
			label={__('Link target', 'vk-blocks-pro')}
			id={`sidebar-${blockName}-block-url-settings`}
		>
			<ToggleControl
				label={__('Open in new tab', 'vk-blocks-pro')}
				onChange={onToggleOpenInNewTab}
				checked={linkTarget === '_blank'}
			/>
			<TextControl
				label={__('Link rel', 'vk-blocks-pro')}
				value={rel || ''}
				onChange={onSetLinkRel}
			/>
		</BaseControl>
	);
};
