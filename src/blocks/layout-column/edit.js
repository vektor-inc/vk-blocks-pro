import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	TextControl,
	RangeControl,
	Button, 
	ToolbarGroup, 
	ToolbarButton,
	__experimentalUnitControl as UnitControl
} from '@wordpress/components';

import {
	BlockControls, 
	useBlockProps,
	InnerBlocks,
	store as blockEditorStore,
	InspectorControls
} from '@wordpress/block-editor';

import { useSelect,
	useDispatch
 } from '@wordpress/data';

import {
	useMediaQuery
} from '@wordpress/compose';

import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';

export default function LayoutColumnEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	let {
		totalWidth,
		brakePoint
	} = attributes;
	
	let className = 'vk_layoutColumn';
	const matches = useMediaQuery('(min-width:' + (brakePoint + 280)  + 'px)');
	if (matches) {	
		className += ' vk_layoutColumn_grid'
	}	

	const innerBlockCount = useSelect( ( select ) => select( 'core/block-editor' ).getBlock( clientId ).innerBlocks );
	console.log(innerBlockCount);

	const ALLOWED_BLOCKS = ['vk-blocks/layout-column-item'];
	const TEMPLATE = [
		['vk-blocks/layout-column-item', {}],
		['vk-blocks/layout-column-item', {}]
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
					renderAppender={ () => (
						innerBlockCount.length < 3 && (
							<InnerBlocks.ButtonBlockAppender />
						)
					 ) }
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
