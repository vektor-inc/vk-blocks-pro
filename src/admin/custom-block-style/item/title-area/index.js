/**
 * WordPress dependencies
 */
import { Button, Flex, FlexItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { BlockIcon } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { MoverButton } from './mover-button';
import { DeleteButton } from './delete-button';

export const TitleArea = ({
	activeBlockType,
	index,
	blockStyleListObj,
	openNameLists,
	setOpenNameLists,
	array,
}) => {
	const editButtonClick = (clickedName) => {
		const openNames = [...openNameLists];
		if (openNames.includes(clickedName)) {
			const spliceIndex = openNames.indexOf(clickedName);
			openNames.splice(spliceIndex, 1);
			setOpenNameLists(openNames);
		} else {
			openNames.push(clickedName);
			setOpenNameLists(openNames);
		}
	};

	return (
		<div className="custom_block_style_title-area">
			<Flex>
				<FlexItem>
					<Flex>
						{activeBlockType && (
							<FlexItem>
								<BlockIcon icon={activeBlockType.icon} />
							</FlexItem>
						)}
						{array.length > 1 && (
							<FlexItem>
								<MoverButton index={index} />
							</FlexItem>
						)}
						<FlexItem className="custom_block_style_title-area-label">
							{blockStyleListObj.property_label}
						</FlexItem>
					</Flex>
				</FlexItem>
				<FlexItem className="custom_block_style_title-area-button">
					<Flex>
						<FlexItem>
							<Button
								className="edit-item-button"
								variant="secondary"
								onClick={() =>
									editButtonClick(
										blockStyleListObj.property_name
									)
								}
							>
								{__('Edit', 'vk-blocks-pro')}
							</Button>
						</FlexItem>
						<FlexItem>
							<DeleteButton
								index={index}
								blockStyleListObj={blockStyleListObj}
							/>
						</FlexItem>
					</Flex>
				</FlexItem>
			</Flex>
		</div>
	);
};
