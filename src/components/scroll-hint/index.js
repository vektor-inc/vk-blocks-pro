import { useState, useEffect } from 'react';
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
	setAttributes,
	iconFamily,
	...props
}) => {
	// 初期状態のアイコン出力フラグをpropsから取得
	const [iconOutputLeft, setIconOutputLeft] = useState(scrollIconLeft !== '');
	const [iconOutputRight, setIconOutputRight] = useState(scrollIconRight !== '');

	useEffect(() => {
		setAttributes({ iconOutputLeft });
		setAttributes({ iconOutputRight });
	}, [iconOutputLeft, iconOutputRight, setAttributes]);

	// アイコンの出力トグル関数
	const handleIconOutputToggle = (position) => {
		if (position === 'left') {
			setIconOutputLeft(!iconOutputLeft);
			setAttributes({ scrollIconLeft: !iconOutputLeft ? '<i class="fa-solid fa-caret-left"></i>' : '' });
		} else if (position === 'right') {
			setIconOutputRight(!iconOutputRight);
			setAttributes({ scrollIconRight: !iconOutputRight ? '<i class="fa-solid fa-caret-right"></i>' : '' });
		}
	};

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
						{__('Icon', 'vk-blocks-pro') + ' ( ' + iconFamily + ' )'}
					</h4>
					<ToggleControl
						label={__('Output Before Text Icon', 'vk-blocks-pro')}
						checked={iconOutputLeft}
						onChange={() => handleIconOutputToggle('left')}
					/>
					{iconOutputLeft && (
						<BaseControl
							label={__('Before text', 'vk-blocks-pro')}
							id={`vk_alert-icon-left`}
						>
							<FontAwesome
								attributeName={'scrollIconLeft'}
								{...props}
							/>
						</BaseControl>
					)}
					<ToggleControl
						label={__('Output After Text Icon', 'vk-blocks-pro')}
						checked={iconOutputRight}
						onChange={() => handleIconOutputToggle('right')}
					/>
					{iconOutputRight && (
						<BaseControl
							label={__('After text', 'vk-blocks-pro')}
							id={`vk_alert-icon-right`}
						>
							<FontAwesome
								attributeName={'scrollIconRight'}
								{...props}
							/>
						</BaseControl>
					)}
				</>
			)}
		</>
	);
};

export default ScrollMessageControls;
