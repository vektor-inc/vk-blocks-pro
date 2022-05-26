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

import { useEffect } from '@wordpress/element';
import { useMediaQuery } from '@wordpress/compose';

export default function LayoutColumnItemEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { width, margin_pc, margin_tb, margin_sp, is_grid, blockId } =
		attributes;
	const blockProps = useBlockProps({
		className: `vk_layoutColumnItem`,
	});

	useEffect(() => {
		if (blockId === undefined) {
			setAttributes({ blockId: clientId });
		}
	}, [clientId]);

	const isMobile = useMediaQuery('(max-width: 575.98px)');
	const isTablet = useMediaQuery(
		'(min-width: 576px) and (max-width: 991.98px)'
	);
	const isPC = useMediaQuery('(min-width: 992px)');

	let padding = margin_pc;
	if (isMobile) {
		padding = margin_sp;
	} else if (isTablet) {
		padding = margin_tb;
	}

	const cStyle = {
		width,
		paddingTop: padding.top,
		paddingRight: padding.right,
		paddingBottom: padding.bottom,
		paddingLeft: padding.left,
	};

	return (
		<>
			<div {...blockProps} style={cStyle}>
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
				</PanelBody>
				<PanelBody title={__('Margin Setting', 'vk-blocks')}>
					<BoxControl
						className={blockProps.className + '-boxcontrol'}
						values={margin_pc}
						label={__('PC')}
						onChange={(nextValues) =>
							setAttributes({ margin_pc: nextValues })
						}
					/>
					<BoxControl
						className={blockProps.className + '-boxcontrol'}
						values={margin_tb}
						label={__('Tablet')}
						onChange={(nextValues) =>
							setAttributes({ margin_tb: nextValues })
						}
					/>
					<BoxControl
						className={blockProps.className + '-boxcontrol'}
						values={margin_sp}
						label={__('Mobile')}
						onChange={(nextValues) =>
							setAttributes({ margin_sp: nextValues })
						}
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
