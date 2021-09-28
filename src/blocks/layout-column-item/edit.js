import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	BaseControl,
	TextControl,
	RangeControl,
	Text,
    __experimentalFlex as Flex,
    __experimentalFlexBlock as FlexBlock,
    __experimentalFlexItem as FlexItem,	
	__experimentalBoxControl as BoxControl,
	__experimentalUnitControl as UnitControl
} from '@wordpress/components';

import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	cleanEmptyObject
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

export default function LayoutColumnItemEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	let {
		width,
		padding_pc,
		padding_tb,
		padding_sp,		
	} = attributes;
	const blockProps = useBlockProps({
		className: `vk_layoutColumnItem`,
	});


	return (
		<>
		<div {...blockProps} style={{ width: width }}>
		<InnerBlocks />
		</div>
		<InspectorControls>
			<PanelBody title={__('Layout Column item Setting', 'vk-blocks')}>
			<UnitControl
				onChange={(value) =>
					setAttributes({ width: value })
				}
				label={__('Block width', 'vk-blocks')}
				value={ width }
			/>
			<BoxControl
				className={ blockProps.className + '-boxcontrol' }
				values={ padding_pc }
				label={ __( 'Margin(PC)' ) }
				onChange={ ( nextValues ) => setAttributes({ padding_pc: nextValues }) }
			/>
			<BoxControl
				className={ blockProps.className + '-boxcontrol' }
				values={ padding_tb }
				label={ __( 'Margin(Tablet)' ) }
				onChange={ ( nextValues ) => setAttributes({ padding_tb: nextValues }) }
			/>	
			<BoxControl
				className={ blockProps.className + '-boxcontrol' }
				values={ padding_sp }
				label={ __( 'Margin(Mobile)' ) }
				onChange={ ( nextValues ) => setAttributes({ padding_sp: nextValues }) }
			/>		
			</PanelBody>
		</InspectorControls>			
	
		</>
	);
}
