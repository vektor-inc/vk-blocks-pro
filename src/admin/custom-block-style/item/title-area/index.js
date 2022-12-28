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
	activeBlockType,
	index,
	blockStyleListObj,
	isOpen,
	setIsOpen,
}) => {
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
						<FlexItem className="custom_block_style_drag-handle">
							<BlockIcon icon={dragHandle} />
						</FlexItem>
						<FlexItem>
							<MoverButton index={index} />
						</FlexItem>
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
								blockStyleListObj={blockStyleListObj}
							/>
						</FlexItem>
					</Flex>
				</FlexItem>
			</Flex>
		</div>
	);
};
