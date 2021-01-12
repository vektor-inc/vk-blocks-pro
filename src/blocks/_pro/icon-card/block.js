/**
 * Pr Card block type
 *
 */
import { PRCard } from './component';
import { deprecated } from './deprecated';
import { ColumnLayout } from '@vkblocks/components/column-layout';
import { AlignControl } from '@vkblocks/components/align-control';
import removeProperty from '@vkblocks/utils/removeProperty';
import { fixBrokenUnicode } from '@vkblocks/utils/depModules';
import { ReactComponent as Icon } from './icon.svg';
import { title, content, iconUser } from '@vkblocks/utils/example-data';

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { PanelBody, BaseControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { select, dispatch } from '@wordpress/data';

registerBlockType('vk-blocks/icon-card', {
	title: __('Icon Card', 'vk-blocks'),
	icon: <Icon />,
	category: 'vk-blocks-cat',
	attributes: {
		col_xs: {
			type: 'number',
			default: 1,
		},
		col_sm: {
			type: 'number',
			default: 2,
		},
		col_md: {
			type: 'number',
			default: 3,
		},
		col_lg: {
			type: 'number',
			default: 3,
		},
		col_xl: {
			type: 'number',
			default: 3,
		},
		col_xxl: {
			type: 'number',
			default: 3,
		},
		activeControl: {
			type: 'string',
			default: '{"title":"center","text":"center"}',
		},
	},
	supports: {
		className: true,
	},
	example: {
		attributes: {
			col_xs: 1,
			col_sm: 1,
			col_md: 1,
			col_lg: 1,
			col_xl: 1,
			col_xxl: 1,
			activeControl: '{"title":"center","text":"center"}',
		},
		innerBlocks: [
			{
				name: 'vk-blocks/icon-card-item',
				attributes: {
					col_xs: 1,
					col_sm: 1,
					col_md: 1,
					col_lg: 1,
					col_xl: 1,
					col_xxl: 1,
					activeControl: '{"title":"center","text":"center"}',
					urlOpenType: false,
					color: '#0693e3',
					bgType: '1',
					heading: title,
					content,
					faIcon: iconUser,
				},
			},
		],
	},
	edit(props) {
		const { attributes, setAttributes, className, clientId, name } = props;
		attributes.name = name;

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
							updateAttributes = removeProperty(
								attributes,
								'faIcon'
							);
							updateAttributes = removeProperty(
								attributes,
								'color'
							);
							updateAttributes = removeProperty(
								attributes,
								'bgType'
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

		const align = JSON.parse(fixBrokenUnicode(attributes.activeControl));

		return (
			<>
				<InspectorControls>
					<PanelBody
						title={__('Columns', 'vk-blocks')}
						initialOpen={false}
					>
						<ColumnLayout {...props} />
					</PanelBody>
					<PanelBody
						title={__('Align', 'vk-blocks')}
						initialOpen={false}
					>
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
				<PRCard
					attributes={attributes}
					className={className}
					setAttributes={setAttributes}
					for_={'edit'}
				/>
			</>
		);
	},
	save({ attributes, className }) {
		return (
			<PRCard
				attributes={attributes}
				className={className}
				for_={'save'}
			/>
		);
	},
	deprecated,
});
