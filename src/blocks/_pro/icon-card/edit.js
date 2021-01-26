import { ColumnLayout } from '@vkblocks/components/column-layout';
import { AlignControl } from '@vkblocks/components/align-control';
import removeProperty from '@vkblocks/utils/removeProperty';
import { fixBrokenUnicode } from '@vkblocks/utils/depModules';

import { __ } from '@wordpress/i18n';
import { PanelBody, BaseControl } from '@wordpress/components';
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import { convertToGrid } from '@vkblocks/utils/convert-to-grid';
import { select, dispatch } from '@wordpress/data';

export default function IconCardEdit(props) {
	const { attributes, clientId, name } = props;
	attributes.name = name;
	let innerClass = '';
	const ALLOWED_BLOCKS = ['vk-blocks/icon-card-item'];
	const TEMPLATE = [ALLOWED_BLOCKS];

	const selectEditor = select('core/block-editor')
		? select('core/block-editor')
		: select('core/editor');
	const dispatchEditor = dispatch('core/block-editor')
		? dispatch('core/block-editor')
		: dispatch('core/editor');

	const { getBlocksByClientId } = selectEditor;
	const { updateBlockAttributes } = dispatchEditor;

	const currentBlock = getBlocksByClientId(clientId);
	let beforeLength;
	let afterLength;

	if (
		currentBlock !== undefined &&
		currentBlock[0] !== null &&
		currentBlock[0].innerBlocks !== undefined
	) {
		const innerBlocks = currentBlock[0].innerBlocks;
		beforeLength = innerBlocks.length;

		if (beforeLength !== undefined) {
			if (beforeLength !== afterLength) {
				for (let i = 0; i < innerBlocks.length; i++) {
					if (innerBlocks[i] !== undefined) {
						//className以外の値で、子要素のattributesをアップデート
						let updateAttributes = removeProperty(
							attributes,
							'className'
						);
						updateAttributes = removeProperty(attributes, 'faIcon');
						updateAttributes = removeProperty(attributes, 'color');
						updateAttributes = removeProperty(attributes, 'bgType');

						updateBlockAttributes(
							innerBlocks[i].clientId,
							updateAttributes
						);
					}
				}
			}
			afterLength = beforeLength;
		}
	}

	const align = JSON.parse(fixBrokenUnicode(attributes.activeControl));

	innerClass = 'editting';
	innerClass += ' vk_posts-edit';
	innerClass += ' vk_posts-edit-col-xs-' + convertToGrid(attributes.col_xs);
	innerClass += ' vk_posts-edit-col-sm-' + convertToGrid(attributes.col_sm);
	innerClass += ' vk_posts-edit-col-md-' + convertToGrid(attributes.col_md);
	innerClass += ' vk_posts-edit-col-lg-' + convertToGrid(attributes.col_lg);
	innerClass += ' vk_posts-edit-col-xl-' + convertToGrid(attributes.col_xl);
	innerClass += ' vk_posts-edit-col-xxl-' + convertToGrid(attributes.col_xxl);

	const blockProps = useBlockProps({
		className: `vk_posts`,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Columns', 'vk-blocks')}
					initialOpen={false}
				>
					<ColumnLayout {...props} />
				</PanelBody>
				<PanelBody title={__('Align', 'vk-blocks')} initialOpen={false}>
					<BaseControl
						label={__('Title', 'vk-blocks')}
						id={`vk_iconCard-title`}
					>
						<AlignControl
							{...props}
							schema={align}
							component={'title'}
							initial={align.title}
						/>
					</BaseControl>
					<BaseControl
						label={__('Text', 'vk-blocks')}
						id={`vk_iconCard-text`}
					>
						<AlignControl
							{...props}
							schema={align}
							component={'text'}
							initial={align.text}
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className={innerClass}>
					<InnerBlocks
						template={TEMPLATE}
						allowedBlocks={ALLOWED_BLOCKS}
					/>
				</div>
			</div>
		</>
	);
}
