/**
 * WordPress dependencies
 */
import {
	Button,
	Flex,
	FlexItem,
	Dashicon,
	__experimentalTruncate as Truncate,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { MoverButton } from './mover-button';
import { DeleteButton } from './delete-button';
import { VariationIcon } from '../../../icons';

export const TitleArea = ({
	element,
	index,
	array,
	blockName,
	variationState,
	setVariationState,
	openNameLists,
	setOpenNameLists,
}) => {
	const editButtonClick = () => {
		const openNames = [...openNameLists];
		if (openNames.includes(variationState[index].name)) {
			const spliceIndex = openNames.indexOf(variationState[index].name);
			openNames.splice(spliceIndex, 1);
			setOpenNameLists(openNames);
		} else {
			openNames.push(variationState[index].name);
			setOpenNameLists(openNames);
		}
	};

	return (
		<div
			className="custom_block_variation_title-area"
			style={{
				padding: '20px',
			}}
		>
			<Flex>
				<FlexItem style={{ flex: '1' }}>
					<Flex>
						<FlexItem>
							<Dashicon
								size={48}
								icon={
									element.icon ? element.icon : VariationIcon
								}
							/>
						</FlexItem>
						{array.length > 1 && (
							<FlexItem>
								<MoverButton
									index={index}
									blockName={blockName}
									variationState={variationState}
									setVariationState={setVariationState}
								/>
							</FlexItem>
						)}
						<FlexItem
							style={{ flex: '1' }}
							className="custom_block_variation_title-area-label"
						>
							<Truncate numberOfLines={1}>
								{element.title}
							</Truncate>
						</FlexItem>
					</Flex>
				</FlexItem>
				<FlexItem className="custom_block_variation_title-area-button">
					<Flex>
						<FlexItem>
							<Button
								className="edit-item-button"
								variant="secondary"
								onClick={editButtonClick}
							>
								{__('Edit', 'vk-blocks-pro')}
							</Button>
						</FlexItem>
						<FlexItem>
							<DeleteButton
								index={index}
								blockName={blockName}
								variationState={variationState}
								setVariationState={setVariationState}
							/>
						</FlexItem>
					</Flex>
				</FlexItem>
			</Flex>
		</div>
	);
};
