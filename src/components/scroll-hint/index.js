import { __ } from '@wordpress/i18n';
import { ToggleControl, TextControl, BaseControl } from '@wordpress/components';
import { FontAwesome } from '@vkblocks/utils/font-awesome-new';

const ScrollMessageControls = ({
	showScrollMessage,
	scrollMessageText,
	scrollIconLeft,
	scrollIconRight,
	handleScrollMessageToggle,
	handleMessageTextChange,
	iconFamily,
	...props
}) => {
	return (
		<>
			<ToggleControl
				label={__('Show Scroll Message', 'vk-blocks-pro')}
				checked={showScrollMessage}
				onChange={handleScrollMessageToggle}
			/>
			{showScrollMessage && (
				<>
					<TextControl
						label={__('Scroll Message Text', 'vk-blocks-pro')}
						value={scrollMessageText}
						onChange={handleMessageTextChange}
					/>
					<h4 className={`mt-0 mb-2`}>
						{__('Icon', 'vk-blocks-pro') +
							' ( ' +
							iconFamily +
							' )'}
					</h4>
					<BaseControl
						label={__('Before text', 'vk-blocks-pro')}
						id={`vk_alert-icon-left`}
					>
						<FontAwesome
							attributeName={'scrollIconLeft'}
							{...props}
						/>
					</BaseControl>
					<BaseControl
						label={__('After text', 'vk-blocks-pro')}
						id={`vk_alert-icon-right`}
					>
						<FontAwesome
							attributeName={'scrollIconRight'}
							{...props}
						/>
					</BaseControl>
				</>
			)}
		</>
	);
};

export default ScrollMessageControls;
