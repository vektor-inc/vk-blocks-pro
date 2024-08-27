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
import { useEffect } from '@wordpress/element';

export default function IconCardEdit(props) {
	const { attributes, clientId, name } = props;
	attributes.name = name;
	let innerClass = '';
	const ALLOWED_BLOCKS = ['vk-blocks/icon-card-item'];
	const TEMPLATE = [['vk-blocks/icon-card-item']];

	const { getBlocksByClientId } = select('core/block-editor');
	const { updateBlockAttributes } = dispatch('core/block-editor');
	const thisBlock = getBlocksByClientId(clientId);

	useEffect(() => {
		if (thisBlock && thisBlock[0] && thisBlock[0].innerBlocks) {
			const thisInnerBlocks = thisBlock[0].innerBlocks;
			thisInnerBlocks.forEach(function (thisInnerBlock) {
				//className以外の値で、子要素のattributesをアップデート
				let updateAttributes = removeProperty(attributes, 'className');
				updateAttributes = removeProperty(attributes, 'faIcon');
				updateAttributes = removeProperty(attributes, 'color');
				updateAttributes = removeProperty(attributes, 'bgType');

				updateBlockAttributes(
					thisInnerBlock.clientId,
					updateAttributes
				);
			});
		}
	}, [thisBlock, attributes]);

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
					title={__('Columns', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<ColumnLayout {...props} />
				</PanelBody>
				<PanelBody
					title={__('Align', 'vk-blocks-pro')}
					initialOpen={false}
				>
					<BaseControl
						label={__('Title', 'vk-blocks-pro')}
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
						label={__('Text', 'vk-blocks-pro')}
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
						orientation="horizontal"
					/>
				</div>
			</div>
		</>
	);
}
