/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCallback, useState } from '@wordpress/element';
import {
	registerFormatType,
	applyFormat,
	removeFormat,
	getActiveFormat,
	useAnchorRef,
} from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { FontSizePicker, Button, Popover, Icon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { ReactComponent as IconSVG } from './icon.svg';
import compareVersions from 'compare-versions';

const name = 'vk-blocks/inline-font-size';

const FontSizeEdit = ( props ) => {
	const { value, isActive, onChange, contentRef } = props;
	const shortcutType = 'primary';
	const shortcutChar = 'h';

	// 選択した font-size を格納
	let selectedFontSize;

	// 保存された font-sizeを取得 font-size:数字+単位
	let getFontSizeStyle;
	let getFontSize;
	if ( isActive ) {
		const activeFormat = getActiveFormat( value, name );
		selectedFontSize = activeFormat.attributes.data;

		getFontSizeStyle = activeFormat.attributes.style;
		getFontSize = getFontSizeStyle.replace( 'font-size:', '' );

		// フォントサイズを変更した後にリロードするとselectedFontSizeはundefinedになるため
		if ( selectedFontSize === undefined && getFontSize ) {
			selectedFontSize = getFontSize;
		}
	}

	const pickerStyle = {
		width: '200px',
	};
	const iconStyle = {
		width: '24px',
		height: '24px',
	};
	const buttonStyle = {
		marginTop: '16px',
		padding: '0 16px',
		height: '30px',
	};
	const anchorRef = useAnchorRef( { ref: contentRef, value } );
	const [ isSettingFontSize, setIsSettingFontSize ] = useState( false );

	const enableIsAddingFontSize = useCallback(
		() => setIsSettingFontSize( true ),
		[ setIsSettingFontSize ]
	);
	const disableIsAddingFontSize = useCallback(
		() => setIsSettingFontSize( false ),
		[ setIsSettingFontSize ]
	);

	const hasFontSizeToChoose = ! isEmpty( value ) || ! selectedFontSize;
	if ( ! hasFontSizeToChoose && ! isActive ) {
		return null;
	}

	const fontSizes = [
		{
			name: __( 'Small', 'vk-blocks' ),
			slug: 'small',
			size: '12px',
		},
		{
			name: __( 'Normal', 'vk-blocks' ),
			slug: 'normal',
			size: '16px',
		},
		{
			name: __( 'Big', 'vk-blocks' ),
			slug: 'big',
			size: '18px',
		},
		{
			name: __( 'Extra big', 'vk-blocks' ),
			slug: 'extra-big',
			size: '21px',
		},
	];

	// Sliderを使用するときに必要になるfallbackFontSizeを用意 wp5.8以下
	const getFontSizeNoUnit = parseInt( getFontSize );
	const fallbackFontSize = ! getFontSizeNoUnit ? 16 : getFontSizeNoUnit;

	return (
		<>
			<RichTextToolbarButton
				title={ __( 'Inline Font Size', 'vk-blocks' ) }
				onClick={
					hasFontSizeToChoose
						? enableIsAddingFontSize
						: () => onChange( removeFormat( value, name ) )
				}
				shortcutType={ shortcutType }
				shortcutCharacter={ shortcutChar }
				className="format-library-text-color-button"
				isActive={ isActive }
				icon={
					<>
						<Icon icon={ IconSVG } style={ iconStyle } />
					</>
				}
			/>
			{ isSettingFontSize && (
				<Popover
					className="vk-blocks-format-popover components-inline-color-popover"
					anchorRef={ anchorRef }
					onClose={ disableIsAddingFontSize }
				>
					<div style={ pickerStyle }>
						<FontSizePicker
							fontSizes={ fontSizes }
							value={ selectedFontSize }
							fallbackFontSize={
								window.wpVersion !== undefined &&
								window.wpVersion !== null &&
								compareVersions( window.wpVersion, '5.9' ) < 0
									? fallbackFontSize
									: false
							}
							withSlider={
								window.wpVersion !== undefined &&
								window.wpVersion !== null &&
								compareVersions( window.wpVersion, '5.9' ) < 0
									? true
									: false
							}
							onChange={ ( newFontSize ) => {
								if ( newFontSize ) {
									onChange(
										applyFormat( value, {
											type: name,
											attributes: {
												data: `${ newFontSize }`,
												style: `font-size: ${ newFontSize };`,
											},
										} )
									);
								} else {
									// reset font size
									onChange( removeFormat( value, name ) );
								}
								//setIsSettingFontSize(false);
							} }
						/>
						<Button
							onClick={ () => {
								setIsSettingFontSize( false );
							} }
							isSmall
							isSecondary
							style={ buttonStyle }
						>
							{ __( 'Apply', 'vk-blocks' ) }
						</Button>
					</div>
				</Popover>
			) }
		</>
	);
};

registerFormatType( name, {
	title: __( 'Inline font size', 'vk-blocks' ),
	tagName: 'span',
	className: 'vk_inline-font-size',
	attributes: {
		data: 'data-fontSize',
		style: 'style',
	},
	edit: FontSizeEdit,
} );
