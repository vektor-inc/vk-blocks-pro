import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { ToggleControl, TextControl, BaseControl } from '@wordpress/components';
import { FontAwesome } from '@vkblocks/utils/font-awesome-new';

const ScrollMessageControls = ({
	showScrollMessage,
	scrollMessageText,
	scrollIconLeft,
	scrollIconRight,
	handleMessageTextChange,
	setAttributes,
	attributes,
	iconFamily,
	...props
}) => {
	const [iconOutputLeft, setIconOutputLeft] = useState(scrollIconLeft !== '');
	const [iconOutputRight, setIconOutputRight] = useState(
		scrollIconRight !== ''
	);

	// アイコン出力の状態に応じて data-attributes を更新
	useEffect(() => {
		setAttributes({
			iconOutputLeft,
			iconOutputRight,
		});
	}, [iconOutputLeft, iconOutputRight]);

	const handleScrollMessageToggle = (checked) => {
		setAttributes({ showScrollMessage: checked });
	};

	const handleIconChange = (position, iconClass) => {
		if (position === 'left') {
			setAttributes({ scrollIconLeft: iconClass });
		} else if (position === 'right') {
			setAttributes({ scrollIconRight: iconClass });
		}
	};

	const handleIconOutputToggle = (position) => {
		if (position === 'left') {
			setIconOutputLeft(!iconOutputLeft);
			setAttributes({
				scrollIconLeft: !iconOutputLeft ? 'fa-solid fa-caret-left' : '',
			});
		} else if (position === 'right') {
			setIconOutputRight(!iconOutputRight);
			setAttributes({
				scrollIconRight: !iconOutputRight
					? 'fa-solid fa-caret-right'
					: '',
			});
		}
	};

	return (
		<>
			<ToggleControl
				label={__('Show Scroll Message', 'vk-blocks-pro')}
				checked={showScrollMessage}
				onChange={() => handleScrollMessageToggle(!showScrollMessage)}
			/>
			{showScrollMessage && (
				<>
					<TextControl
						label={__('Scroll Message Text', 'vk-blocks-pro')}
						value={scrollMessageText}
						onChange={handleMessageTextChange}
					/>
					<h4>
						{__('Icon', 'vk-blocks-pro') +
							' ( ' +
							iconFamily +
							' )'}
					</h4>
					<ToggleControl
						label={__('Output Before Text Icon', 'vk-blocks-pro')}
						checked={iconOutputLeft}
						onChange={() => handleIconOutputToggle('left')}
					/>
					{iconOutputLeft && (
						<BaseControl
							label={__('Before text', 'vk-blocks-pro')}
							id="scrollIconLeftControl"
						>
							<FontAwesome
								attributeName={'scrollIconLeft'}
								attributes={attributes}
								setAttributes={setAttributes}
								modeClass={true}
								onChange={(iconClass) =>
									handleIconChange('left', iconClass)
								}
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
							id="scrollIconRightControl"
						>
							<FontAwesome
								attributeName={'scrollIconRight'}
								attributes={attributes}
								setAttributes={setAttributes}
								modeClass={true}
								onChange={(iconClass) =>
									handleIconChange('right', iconClass)
								}
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
