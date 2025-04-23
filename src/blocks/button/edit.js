import { __ } from '@wordpress/i18n';
import {
	ButtonSettings,
	VKBButton,
} from '@vkblocks/components/vkb-button-control';
import {
	PanelBody,
	BaseControl,
	CheckboxControl,
	Button,
	ToolbarGroup,
	ToolbarButton,
	Dropdown,
} from '@wordpress/components';
import {
	RichText,
	InspectorControls,
	useBlockProps,
	BlockControls,
	URLInput,
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { dispatch, select } from '@wordpress/data';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { link, linkOff, keyboardReturn } from '@wordpress/icons';
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';

export default function ButtonEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		content,
		subCaption,
		buttonUrl,
		buttonTarget,
		buttonSize,
		buttonType,
		buttonEffect,
		buttonColor,
		buttonTextColorCustom,
		buttonColorCustom,
		buttonAlign,
		buttonWidthMobile,
		buttonWidthTablet,
		buttonWidth,
		outerGap,
		fontAwesomeIconBefore,
		fontAwesomeIconAfter,
		iconSizeBefore,
		iconSizeAfter,
		blockId,
		old_1_31_0,
	} = attributes;

	// 親ブロックが vk-blocks/button-outer かどうか判定
	const parents = select('core/block-editor').getBlockParentsByBlockName(
		clientId,
		['vk-blocks/button-outer']
	);
	const isInnerButton = parents.length ? true : false;

	const { updateBlockAttributes } = dispatch('core/block-editor');

	// 以前の値を切り替え
	useEffect(() => {
		if (attributes.clientId !== undefined) {
			setAttributes({ clientId: undefined });
		}
		if (
			blockId === undefined ||
			isParentReusableBlock(clientId) === false
		) {
			setAttributes({ blockId: clientId });
		}
		if (
			buttonUrl === null ||
			buttonUrl === 'null' ||
			buttonUrl === 'undefined' ||
			buttonUrl === ''
		) {
			setAttributes({ buttonUrl: undefined });
		}
		if (buttonColorCustom === undefined) {
			setAttributes({ buttonTextColorCustom: undefined });
		}
		if (
			buttonColorCustom === null ||
			buttonColorCustom === 'null' ||
			buttonColorCustom === 'undefined' ||
			buttonColorCustom === ''
		) {
			setAttributes({ buttonColorCustom: undefined });
		}
		if (
			fontAwesomeIconBefore === null ||
			fontAwesomeIconBefore === 'null' ||
			fontAwesomeIconBefore === 'undefined' ||
			fontAwesomeIconBefore === ''
		) {
			setAttributes({ fontAwesomeIconBefore: undefined });
		}
		if (
			fontAwesomeIconAfter === null ||
			fontAwesomeIconAfter === 'null' ||
			fontAwesomeIconAfter === 'undefined' ||
			fontAwesomeIconAfter === ''
		) {
			setAttributes({ fontAwesomeIconAfter: undefined });
		}
		if (
			subCaption === null ||
			subCaption === 'null' ||
			subCaption === 'undefined' ||
			subCaption === ''
		) {
			setAttributes({ subCaption: undefined });
		}
		if (old_1_31_0 === undefined) {
			if (buttonWidthMobile === undefined) {
				setAttributes({ buttonWidthMobile: buttonWidth });
			}
			if (buttonWidthTablet === undefined) {
				setAttributes({ buttonWidthTablet: buttonWidth });
			}
			setAttributes({ old_1_31_0: true });
		}
		if (!isInnerButton) {
			setAttributes({ buttonWidth: 0 });
		}
	}, [clientId]);

	let containerClass;
	if (
		(buttonColorCustom !== undefined && isHexColor(buttonColorCustom)) ||
		(buttonTextColorCustom !== undefined &&
			isHexColor(buttonTextColorCustom)) ||
		outerGap
	) {
		containerClass = `vk_button vk_button-color-custom vk_button-${blockId}`;
	} else {
		containerClass = `vk_button vk_button-color-custom`;
	}

	if (isInnerButton) {
		if (buttonWidthMobile) {
			containerClass += ` vk_button-width-mobile-${buttonWidthMobile}`;
		}
		if (buttonWidthTablet) {
			containerClass += ` vk_button-width-tablet-${buttonWidthTablet}`;
		}
		if (buttonWidth) {
			containerClass += ` vk_button-width-${buttonWidth}`;
		}
	} else {
		containerClass += ` vk_button-align-${buttonAlign}`;
	}

	if (buttonEffect !== '') {
		containerClass += ` is-style-${buttonEffect}`;
	}

	const blockProps = useBlockProps({
		className: containerClass,
	});

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<Dropdown
						renderToggle={({ isOpen, onToggle }) => {
							const setLink = () => {
								if (isOpen && buttonUrl !== '') {
									setAttributes({ buttonUrl: '' });
								}
								onToggle();
							};
							return (
								<ToolbarButton
									aria-expanded={isOpen}
									icon={
										buttonUrl !== '' && isOpen
											? linkOff
											: link
									}
									isActive={
										buttonUrl !== '' && isOpen
											? true
											: false
									}
									label={
										buttonUrl !== '' && isOpen
											? __('Unlink')
											: __(
													'Input Link URL',
													'vk-blocks-pro'
												)
									}
									onClick={setLink}
								/>
							);
						}}
						renderContent={(params) => {
							return (
								<form
									onSubmit={() => {
										params.onClose();
									}}
								>
									<div className="vk-block-editor-url-input-wrapper">
										<URLInput
											__nextHasNoMarginBottom
											value={buttonUrl}
											onChange={(value) => {
												setAttributes({
													buttonUrl: value,
												});
											}}
										/>
										<Button
											icon={keyboardReturn}
											label={__('Submit')}
											type="submit"
										/>
									</div>
									<CheckboxControl
										label={__(
											'Open link new tab.',
											'vk-blocks-pro'
										)}
										checked={buttonTarget}
										onChange={(checked) =>
											setAttributes({
												buttonTarget: checked,
											})
										}
									/>
								</form>
							);
						}}
					/>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={__('Button Setting', 'vk-blocks-pro')}
					initialOpen={true}
				>
					<ButtonSettings
						{...props}
						isInnerButton={isInnerButton}
					/>
				</PanelBody>

				<PanelBody
					title={__('Link Settings', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<BaseControl
						id={'button-url-control'}
						label={__('Link URL:', 'vk-blocks-pro')}
					>
						<URLInput
							value={buttonUrl}
							onChange={(value) =>
								setAttributes({ buttonUrl: value })
							}
						/>
					</BaseControl>
					<CheckboxControl
						label={__('Open link new tab.', 'vk-blocks-pro')}
						checked={buttonTarget}
						onChange={(checked) =>
							setAttributes({
								buttonTarget: checked,
							})
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<VKBButton
					lbTextColorCustom={buttonTextColorCustom}
					lbColorCustom={buttonColorCustom}
					lbColor={buttonColor}
					lbType={buttonType}
					lbAlign={buttonAlign}
					lbSize={buttonSize}
					lbFontAwesomeIconBefore={fontAwesomeIconBefore}
					lbFontAwesomeIconAfter={fontAwesomeIconAfter}
					lbIconSizeBefore={iconSizeBefore}
					lbIconSizeAfter={iconSizeAfter}
					subCaption={subCaption}
					inlineStyle={{
						color: buttonTextColorCustom,
						backgroundColor: buttonColorCustom,
						borderColor: buttonColorCustom,
						borderWidth: attributes.borderWidth,
						borderStyle: attributes.borderStyle,
						borderRadius: attributes.borderRadius,
					}}
					lbRichtext={
						<RichText
							tagName={'span'}
							className={'vk_button_link_txt'}
							onChange={(value) =>
								setAttributes({ content: value })
							}
							value={content}
							placeholder={__('Input text', 'vk-blocks-pro')}
							allowedFormats={[
								'core/bold',
								'core/italic',
								'core/strikethrough',
								'core/superscript',
								'core/subscript',
								'vk-blocks/responsive-br',
								'vk-blocks/nowrap',
								'vk-blocks/inline-font-size',
							]}
						/>
					}
				/>
			</div>
		</>
	);
}
