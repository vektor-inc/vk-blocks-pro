import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	TextControl,
	RangeControl,
	__experimentalUnitControl as UnitControl
} from '@wordpress/components';

import {
	useBlockProps,
	InnerBlocks,
	InspectorControls
} from '@wordpress/block-editor';

import {
	useMediaQuery
} from '@wordpress/compose';

export default function LayoutColumnEdit(props) {
	const { attributes, setAttributes } = props;
	let {
		totalWidth,
		brakePoint
	} = attributes;

	let className = 'vk_layoutColumn';
	const matches = useMediaQuery('(min-width:' + brakePoint + 'px)');
	if (matches) {
		className += ' vk_layoutColumn_grid'
	}	
	const ALLOWED_BLOCKS = ['core/image', 'vk-blocks/layout-column-item'];
	const TEMPLATE = [
		[ 'vk-blocks/layout-column-item', {} ],
		[ 'core/image', {} ],
		[ 'vk-blocks/layout-column-item', {} ]
	];
	const blockProps = useBlockProps({
		"className": className
	});

	return (
		<>
		<div {...blockProps} style={{ width: totalWidth }}>
			<InnerBlocks
					//編集画面の追加タグ用に2回目のClassを挿入
					template={TEMPLATE}
					allowedBlocks={ALLOWED_BLOCKS}
				/>			
		</div>
		<InspectorControls>
			<PanelBody title={__('Layout Column Setting', 'vk-blocks')}>
			<UnitControl
				onChange={(value) =>
					setAttributes({ totalWidth: value })
				}
				label={__('Block width', 'vk-blocks')}
				value={ totalWidth }
			/>
			<div style={{marginTop:"10px"}}>
			<RangeControl
				value={brakePoint}
				onChange={(value) =>
					setAttributes({
						brakePoint: value										
					})
				}
				min={0}
				max={2000}
				allowReset={true}
				resetFallbackValue={900}
				label={__('Brakepoint(px)', 'vk-blocks')}
			/>			
			</div>
			</PanelBody>
		</InspectorControls>
		</>
	);
}
