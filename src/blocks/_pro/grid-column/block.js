/**
 * Column Responsive block type
 *
 */
import { ColumnResponsive } from './component';
import { schema } from './schema';
import { ColumnLayout } from '@vkblocks/components/column-layout';
import classNames from 'classnames';
import { convertToGrid } from '@vkblocks/utils/convert-to-grid';
import { ReactComponent as Icon } from './icon.svg';
import compareVersions from 'compare-versions';
import deprecated from './deprecated/';

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { select, dispatch } from '@wordpress/data';
import { PanelBody } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

let displayInserter = false;
if (window.wpVersion && compareVersions(window.wpVersion, '5.4') > 0) {
	displayInserter = true;
}

registerBlockType('vk-blocks/grid-column', {
	title: __('Grid Column', 'vk-blocks'),
	icon: <Icon />,
	category: 'vk-blocks-cat-layout',
	attributes: schema,
	supports: {
		className: true,
		inserter: displayInserter,
	},
	/* eslint camelcase: 0 */
	edit(props) {
		const { attributes, setAttributes, className, clientId } = props;

		const { getBlocksByClientId } = select('core/block-editor');
		const { updateBlockAttributes } = dispatch('core/block-editor');

		const thisBlock = getBlocksByClientId(clientId);

		let beforeLength;
		let afterLength;

		if (
			thisBlock !== undefined &&
			thisBlock[0] !== null &&
			thisBlock[0].innerBlocks !== undefined
		) {
			const innerBlocks = thisBlock[0].innerBlocks;
			beforeLength = innerBlocks.length;

			if (beforeLength !== undefined) {
				if (beforeLength !== afterLength) {
					for (let i = 0; i < innerBlocks.length; i++) {
						if (innerBlocks[i] !== undefined) {
							updateBlockAttributes(innerBlocks[i].clientId, {
								name: attributes.name,
								layout: attributes.layout,
								col_xs: attributes.col_xs,
								col_sm: attributes.col_sm,
								col_md: attributes.col_md,
								col_lg: attributes.col_lg,
								col_xl: attributes.col_xl,
								col_xxl: attributes.col_xxl,
							});
						}
					}
				}
				afterLength = beforeLength;
			}
		}

		return (
			<>
				<InspectorControls>
					<PanelBody
						title={__('Layout Columns', 'vk-blocks')}
						initialOpen={false}
					>
						<ColumnLayout {...props} />
					</PanelBody>
				</InspectorControls>
				<ColumnResponsive
					attributes={attributes}
					className={className}
					setAttributes={setAttributes}
					for_={'edit'}
				/>
			</>
		);
	},
	save({ attributes }) {
		return (
			<div>
				<ColumnResponsive attributes={attributes} for_={'save'} />
			</div>
		);
	},
	deprecated,
});
/* eslint camelcase: 0 */
const vkbwithClientIdClassName = createHigherOrderComponent(
	(BlockListBlock) => {
		return (props) => {
			if (props.name === 'vk-blocks/grid-column-item') {
				const {
					col_xs,
					col_sm,
					col_md,
					col_lg,
					col_xl,
					col_xxl,
				} = props.attributes;
				const customClass = classNames(
					props.className,
					`col-${convertToGrid(col_xs)} col-sm-${convertToGrid(
						col_sm
					)} col-md-${convertToGrid(col_md)} col-lg-${convertToGrid(
						col_lg
					)} col-xl-${convertToGrid(col_xl)} col-xxl-${convertToGrid(
						col_xxl
					)}`
				);
				return <BlockListBlock {...props} className={customClass} />;
			}
			return <BlockListBlock {...props} />;
		};
	},
	'vkbwithClientIdClassName'
);

addFilter(
	'editor.BlockListBlock',
	'vk-blocks/grid-column',
	vkbwithClientIdClassName
);

addFilter(
	'blocks.getSaveElement',
	'vk-blocks/grid-column',
	(element, blockType, attributes) => {
		const { col_xs, col_sm, col_md, col_lg, col_xl, col_xxl } = attributes;

		if (blockType.name === 'vk-blocks/grid-column-item' && element) {
			return {
				...element,
				...{
					props: {
						...element.props,
						...{
							className: classNames(
								element.props.className,
								`col-${convertToGrid(
									col_xs
								)} col-sm-${convertToGrid(
									col_sm
								)} col-md-${convertToGrid(
									col_md
								)} col-lg-${convertToGrid(
									col_lg
								)} col-xl-${convertToGrid(
									col_xl
								)} col-xxl-${convertToGrid(col_xxl)}`
							),
						},
					},
				},
			};
		}

		return element;
	}
);
