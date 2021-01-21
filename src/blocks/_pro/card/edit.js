import { ColumnLayoutControl } from '@vkblocks/components/column-layout-control';
import { CardAlignControls } from '@vkblocks/components/card-align-control';
import removeProperty from '@vkblocks/utils/removeProperty';
import AdvancedViewportControl from '@vkblocks/components/advanced-viewport-control';
import AdvancedUnitControl from '@vkblocks/components/advanced-unit-control';

import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	BaseControl,
	TextControl,
	CheckboxControl,
} from '@wordpress/components';
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import { select, dispatch } from '@wordpress/data';
import { convertToGrid } from '@vkblocks/utils/convert-to-grid';

export default function CardEdit(props) {
	const { attributes, setAttributes, clientId, name } = props;
	const { blockId } = attributes;
	attributes.name = name;
	attributes.clientId = clientId;
	setAttributes({ clientId });
	setAttributes({ blockId: clientId });

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
						const updateAttributes = removeProperty(
							attributes,
							'className'
						);
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
	let innerClass = '';
	const ALLOWED_BLOCKS = ['vk-blocks/card-item'];
	const TEMPLATE = [ALLOWED_BLOCKS];

	innerClass = 'editting';
	innerClass += innerClass + ' vk_posts-edit';
	innerClass += ' vk_posts-edit-col-xs-' + convertToGrid(attributes.col_xs);
	innerClass += ' vk_posts-edit-col-sm-' + convertToGrid(attributes.col_sm);
	innerClass += ' vk_posts-edit-col-md-' + convertToGrid(attributes.col_md);
	innerClass += ' vk_posts-edit-col-lg-' + convertToGrid(attributes.col_lg);
	innerClass += ' vk_posts-edit-col-xl-' + convertToGrid(attributes.col_xl);
	innerClass += ' vk_posts-edit-col-xxl-' + convertToGrid(attributes.col_xxl);

	const blockProps = useBlockProps({
		className: `vk_posts vk_card_${blockId}`,
	});

	return (
		<>
			<InspectorControls>
				<ColumnLayoutControl {...props} />
				<DisplayItemsControlForCards {...props} />
				<PanelBody
					title={__('Image Height', 'vk-blocks')}
					initialOpen={false}
				>
					<AdvancedUnitControl {...props} />
					<BaseControl
						label={__('Slide Height for each device.', 'vk-blocks')}
						id={`vk_card-SlideHeight`}
					>
						<AdvancedViewportControl
							{...props}
							initial={{
								iPc: 150,
								iTablet: 150,
								iMobile: 150,
							}}
						/>
					</BaseControl>
				</PanelBody>
				<CardAlignControls {...props} />
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

export const DisplayItemsControlForCards = (props) => {
	const { setAttributes, attributes } = props;
	const {
		display_title, //eslint-disable-line camelcase
		display_excerpt, //eslint-disable-line camelcase
		display_image, //eslint-disable-line camelcase
		display_btn, //eslint-disable-line camelcase
		btn_text, //eslint-disable-line camelcase
	} = attributes;
	return (
		<PanelBody title={__('Display item', 'vk-blocks')} initialOpen={false}>
			<CheckboxControl
				label={__('Title', 'vk-blocks')}
				className={'mb-1'}
				checked={display_title} //eslint-disable-line camelcase
				onChange={(checked) =>
					setAttributes({ display_title: checked })
				}
			/>
			<p className="alert alert-danger">
				{__(
					'Warning! When you hidden this item, you will lose the content.',
					'vk-blocks'
				)}
			</p>
			<CheckboxControl
				label={__('Excerpt Text', 'vk-blocks')}
				className={'mb-1'}
				checked={display_excerpt} //eslint-disable-line camelcase
				onChange={(checked) =>
					setAttributes({ display_excerpt: checked })
				}
			/>
			<p className="alert alert-danger">
				{__(
					'Warning! When you hidden this item, you will lose the content.',
					'vk-blocks'
				)}
			</p>
			<CheckboxControl
				label={__('Image', 'vk-blocks')}
				checked={display_image} //eslint-disable-line camelcase
				onChange={(checked) =>
					setAttributes({ display_image: checked })
				}
			/>
			<CheckboxControl
				label={__('Button', 'vk-blocks')}
				checked={display_btn} //eslint-disable-line camelcase
				onChange={(checked) => setAttributes({ display_btn: checked })}
			/>
			<h4 className={'postList_itemCard_button-option'}>
				{__('Button option', 'vk-blocks')}
			</h4>
			<p>
				{__(
					"Click each card block to set the target url. You can find the url form at it's sidebar.",
					'vk-blocks'
				)}
			</p>
			<TextControl
				label={__('Button text', 'vk-blocks')}
				value={btn_text} //eslint-disable-line camelcase
				onChange={(value) => setAttributes({ btn_text: value })}
			/>
		</PanelBody>
	);
};
