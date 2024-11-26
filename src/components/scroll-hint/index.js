import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { ToggleControl, TextControl, BaseControl } from '@wordpress/components';
import { FontAwesome } from '@vkblocks/utils/font-awesome-new';

const ScrollMessageControls = ({
	showScrollMessage,
	scrollMessageText,
	scrollIconLeft,
	scrollIconRight,
	setAttributes,
	attributes,
	...props
}) => {
	// eslint-disable-next-line no-undef
	const iconFamily = vkFontAwesome.iconFamily;

	const [iconOutputLeft, setIconOutputLeft] = useState(scrollIconLeft !== '');
	const [iconOutputRight, setIconOutputRight] = useState(
		scrollIconRight !== ''
	);

	// アイコンの状態が空の場合には、トグルをOFFに設定
	useEffect(() => {
		if (attributes.scrollIconLeft === '') {
			setIconOutputLeft(false);
		}
		if (attributes.scrollIconRight === '') {
			setIconOutputRight(false);
		}
	}, [attributes.scrollIconLeft, attributes.scrollIconRight]);

	// アイコン出力の状態に応じて data-attributes を更新
	useEffect(() => {
		setAttributes({
			iconOutputLeft,
			iconOutputRight,
		});
	}, [iconOutputLeft, iconOutputRight]);

	const handleScrollMessageToggle = (isChecked) => {
		setAttributes({ showScrollMessage: isChecked });
	};

	const handleMessageTextChange = (value) => {
		setAttributes({ scrollMessageText: value });
	};

	const handleIconChange = (position, iconClass) => {
		if (position === 'left') {
			setAttributes({ scrollIconLeft: iconClass });
		} else if (position === 'right') {
			setAttributes({ scrollIconRight: iconClass });
		}
	};

	// ToggleControlが動いたときに状態を更新
	const handleIconOutputToggle = (position) => {
		if (position === 'left') {
			setIconOutputLeft(!iconOutputLeft);

			// トグルがONになった場合にデフォルトアイコンを設定、OFFになった場合は削除
			if (!iconOutputLeft && !attributes.scrollIconLeft) {
				setAttributes({
					scrollIconLeft: 'fa-solid fa-caret-left',
				});
			} else if (iconOutputLeft) {
				setAttributes({
					scrollIconLeft: '',
				});
			}
		} else if (position === 'right') {
			setIconOutputRight(!iconOutputRight);

			// トグルがONになった場合にデフォルトアイコンを設定、OFFになった場合は削除
			if (!iconOutputRight && !attributes.scrollIconRight) {
				setAttributes({
					scrollIconRight: 'fa-solid fa-caret-right',
				});
			} else if (iconOutputRight) {
				setAttributes({
					scrollIconRight: '',
				});
			}
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
						onChange={(value) => handleMessageTextChange(value)} // handleMessageTextChangeに正しく引数を渡す
					/>
					<h4>
						{__('Icon', 'vk-blocks-pro') +
							' ( ' +
							iconFamily +
							' )'}
					</h4>
					<ToggleControl
						label={__(
							'Display the icon before the text',
							'vk-blocks-pro'
						)}
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
						label={__(
							'Display the icon after the text.',
							'vk-blocks-pro'
						)}
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
