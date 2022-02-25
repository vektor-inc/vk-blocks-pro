/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
// import { getBlockSupport } from '@wordpress/blocks';
import {
	PanelBody,
	BaseControl,
	ButtonGroup,
	Button,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
const TEMPLATE = [
	['vk-blocks/query-pagination-previous'],
	['vk-blocks/query-pagination-numbers'],
	['vk-blocks/query-pagination-next'],
];

// const getDefaultBlockLayout = (blockTypeOrName) => {
// 	const layoutBlockSupportConfig = getBlockSupport(blockTypeOrName);
// 	return layoutBlockSupportConfig?.default;
// };

export default function QueryPaginationEdit(props) {
	const { attributes, setAttributes, clientId } = props;
	const { paginationArrow } = attributes;

	// const usedLayout = layout || getDefaultBlockLayout(name);
	const hasNextPreviousBlocks = useSelect((select) => {
		const { getBlocks } = select(blockEditorStore);
		const innerBlocks = getBlocks(clientId);
		/**
		 * Show the `paginationArrow` control only if a
		 * `QueryPaginationNext/Previous` block exists.
		 */
		return innerBlocks?.find((innerBlock) => {
			return [
				'vk-blocks/query-pagination-next',
				'vk-blocks/query-pagination-previous',
			].includes(innerBlock.name);
		});
	}, []);
	const blockProps = useBlockProps({ className: `vk-query-pagination` });
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: TEMPLATE,
		allowedBlocks: [
			'vk-blocks/query-pagination-previous',
			'vk-blocks/query-pagination-numbers',
			'vk-blocks/query-pagination-next',
		],
	});
	return (
		<>
			{hasNextPreviousBlocks && (
				<InspectorControls>
					<PanelBody title={__('Settings', 'vk-blocks')}>
						<BaseControl>
							<ButtonGroup>
								<Button
									isPrimary={paginationArrow === 'none'}
									isSecondary={paginationArrow !== 'none'}
									onClick={() =>
										setAttributes({
											paginationArrow: 'none',
										})
									}
								>
									{__('None', 'vk-blocks')}
								</Button>
								<Button
									isPrimary={paginationArrow === 'arrow'}
									isSecondary={paginationArrow !== 'arrow'}
									onClick={() =>
										setAttributes({
											paginationArrow: 'arrow',
										})
									}
								>
									{__('← →', 'vk-blocks')}
								</Button>
								<Button
									isPrimary={paginationArrow === 'chevron'}
									isSecondary={paginationArrow !== 'chevron'}
									onClick={() =>
										setAttributes({
											paginationArrow: 'chevron',
										})
									}
								>
									{__('« »')}
								</Button>
							</ButtonGroup>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
			)}
			<div {...innerBlocksProps} />
		</>
	);
}
