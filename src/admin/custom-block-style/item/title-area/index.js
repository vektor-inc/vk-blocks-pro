/**
 * WordPress dependencies
 */
import { Button, Flex, FlexItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { BlockIcon } from '@wordpress/block-editor';
import { dragHandle } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { MoverButton } from './mover-button';
import { DeleteButton } from './delete-button';

export const TitleArea = ({
	showBlockTypes,
	index,
	textStyleListObj,
	isOpen,
	setIsOpen,
}) => {
	const activeBlockType = showBlockTypes.find(
		(blockType) => blockType.name === textStyleListObj.block_name
	);

	return (
		<div className="custom_block_style_title-area">
			<Flex>
				<FlexItem>
					<Flex expanded={false}>
						<FlexItem>
							<BlockIcon icon={activeBlockType.icon} />
						</FlexItem>
						<FlexItem>
							<BlockIcon icon={dragHandle} />
						</FlexItem>
						<FlexItem>
							<MoverButton index={index} />
						</FlexItem>
						<FlexItem>{textStyleListObj.property_label}</FlexItem>
					</Flex>
				</FlexItem>
				<FlexItem>
					<Flex>
						<FlexItem>
							<Button
								className="edit-item-button"
								variant="secondary"
								onClick={() => setIsOpen(!isOpen)}
							>
								{__(
									'編集',
									// 'Edit',
									'vk-blocks'
								)}
							</Button>
						</FlexItem>
						<FlexItem>
							<DeleteButton
								index={index}
								textStyleListObj={textStyleListObj}
							/>
						</FlexItem>
					</Flex>
				</FlexItem>
			</Flex>
		</div>
	);
};
