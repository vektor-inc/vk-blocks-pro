/**
 * Column Responsive block type
 *
 */
import classNames from 'classnames';
import { convertToGrid } from '@vkblocks/utils/convert-to-grid';
import { ReactComponent as Icon } from './icon.svg';

import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

import deprecated from './deprecated/';
import edit from './edit';
import metadata from './block.json';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Grid Column', 'vk-blocks'),
	icon: <Icon />,
	edit,
	save,
	deprecated,
};

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
