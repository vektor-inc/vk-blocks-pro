import { __ } from '@wordpress/i18n'; 
import {
	InnerBlocks,
	useBlockProps,
	JustifyContentControl,
	BlockControls,
	InspectorControls
} from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalUnitControl as UnitControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
} from '@wordpress/components';

export default function ButtonOuterEdit(props) {
	const { attributes, setAttributes } = props;
	const {
		buttonsJustify,
		gap
	} = attributes;

	// blocksProps を予め定義
	const blockProps = useBlockProps({
		className: `vk_buttons`,
	});

	const ALLOWED_BLOCKS = ['vk-blocks/button'];

	const TEMPLATE = [['vk-blocks/button'], ['vk-blocks/button']];

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Button Common Setting', 'vk-blocks')}
					initialOpen={true}
				>
					<UnitControl
						label={__('Button gap size', 'vk-blocks')}
						value={gap}
						onChange={(value) => setAttributes({ gap: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls group="block">
				<JustifyContentControl
					allowedControls={[
						'left',
						'center',
						'right',
						'space-between',
					]}
					value={buttonsJustify}
					onChange={(value) =>
						setAttributes({ buttonsJustify: value })
					}
					popoverProps={{
						position: 'bottom right',
						isAlternate: true,
					}}
				/>
			</BlockControls>
			<div {...blockProps}>
				<div
					className={`vk_buttons_col vk_buttons_col-justify-${buttonsJustify}`}
				>
					<InnerBlocks
						allowedBlocks={ALLOWED_BLOCKS}
						template={TEMPLATE}
						templateLock={false}
						orientation="horizontal"
					/>
				</div>
			</div>
		</>
	);
}
