import { ReactComponent as Icon } from './icon.svg';
import { __ } from '@wordpress/i18n';
import { registerFormatType, insert } from '@wordpress/rich-text';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarItem, DropdownMenu } from '@wordpress/components';

const breakPoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

// 改行を挿入する
const insertBR = (value, onChange, breakPoint) => {
	onChange(insert(value, `[br-${breakPoint}]`, value.start, value.end));
};

registerFormatType(`vk-blocks/responsive-br`, {
	title: __(`Responsive Br`, 'vk-blocks-pro'),
	tagName: 'br',
	className: null,
	edit: (props) => {
		const { onChange, value } = props;

		return (
			<BlockControls group="block">
				<ToolbarGroup>
					<ToolbarItem>
						{(toggleProps) => (
							<DropdownMenu
								icon={<Icon />}
								toggleProps={toggleProps}
								label={__(`Responsive BR`, 'vk-blocks-pro')}
								controls={breakPoints.map((breakPoint) => {
									return {
										title:
											__(
												`Responsive BR`,
												'vk-blocks-pro'
											) + `( ${breakPoint} )`,
										icon: <Icon />,
										onClick: () => {
											insertBR(
												value,
												onChange,
												breakPoint
											);
										},
									};
								})}
							/>
						)}
					</ToolbarItem>
				</ToolbarGroup>
			</BlockControls>
		);
	},
});
