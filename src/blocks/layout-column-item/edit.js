/* eslint-disable */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	__experimentalBoxControl as BoxControl,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';

import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';

import { useMediaQuery } from '@wordpress/compose';


export default function LayoutColumnItemEdit(props) {
	const { attributes, setAttributes } = props;
	const { width, margin_pc, margin_tb, margin_sp } = attributes;
	const blockProps = useBlockProps({
		className: `vk_layoutColumnItem`,
	});

	const isMobile = useMediaQuery('(max-width: 689px)');
	const isTablet = useMediaQuery('(min-width: 690px) and (max-width: 1079px)');
	const isPC = useMediaQuery('(min-width: 1080px)');
	console.log(isMobile + ":" + isTablet + ":" + isPC);

	let paddingObject = margin_pc;
	if ( isMobile ) {
		paddingObject = margin_sp;
	} else if ( isTablet ) {
		paddingObject = margin_tb;
	}

	const cStyle = {
		width,
		marginTop: paddingObject.top,
		marginRight: paddingObject.right,
		marginBottom: paddingObject.bottom,
		marginLeft: paddingObject.left
	}
	console.log(cStyle);

	return (
		<>
			<div {...blockProps} style={ cStyle }>
				<InnerBlocks />
			</div>
			<InspectorControls>
				<PanelBody
					title={__('Layout Column item Setting', 'vk-blocks')}
				>
					<UnitControl
						onChange={(value) => setAttributes({ width: value })}
						label={__('Block width', 'vk-blocks')}
						value={width}
					/>
					<BoxControl
						className={blockProps.className + '-boxcontrol'}
						values={margin_pc}
						label={__('Margin(PC)')}
						onChange={(nextValues) =>
							setAttributes({ margin_pc: nextValues })
						}
					/>
					<BoxControl
						className={blockProps.className + '-boxcontrol'}
						values={margin_tb}
						label={__('Margin(Tablet)')}
						onChange={(nextValues) =>
							setAttributes({ margin_tb: nextValues })
						}
					/>
					<BoxControl
						className={blockProps.className + '-boxcontrol'}
						values={margin_sp}
						label={__('Margin(Mobile)')}
						onChange={(nextValues) =>
							setAttributes({ margin_sp: nextValues })
						}
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
