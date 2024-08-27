/**
 * Internal dependencies
 */
import { TitleArea } from './title-area';
import { BodyArea } from './body-area';

export const Item = ({
	activeBlockType,
	index,
	onChange,
	blockStyleListObj,
	openNameLists,
	setOpenNameLists,
	array,
}) => {
	const isOpen = openNameLists.includes(blockStyleListObj.property_name);

	return (
		<div className="custom_block_style_item">
			<TitleArea
				activeBlockType={activeBlockType}
				index={index}
				blockStyleListObj={blockStyleListObj}
				openNameLists={openNameLists}
				setOpenNameLists={setOpenNameLists}
				array={array}
			/>
			{isOpen && (
				<BodyArea
					activeBlockType={activeBlockType}
					index={index}
					onChange={onChange}
					blockStyleListObj={blockStyleListObj}
				/>
			)}
		</div>
	);
};
