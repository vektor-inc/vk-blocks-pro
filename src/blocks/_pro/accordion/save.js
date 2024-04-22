import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save(props) {
    const {
		containerClass,
		initialState,
		initialStateMobile,
		initialStateTablet,
		initialStateDesktop,
		isDeviceSpecific
	} = props.attributes;
    const blockProps = useBlockProps.save({
        'data-initial-state': initialState,
        'data-initial-state-mobile': initialStateMobile,
        'data-initial-state-tablet': initialStateTablet,
        'data-initial-state-desktop': initialStateDesktop
    });

    return (
        <div {...blockProps}>
            <InnerBlocks.Content />
        </div>
    );
}
