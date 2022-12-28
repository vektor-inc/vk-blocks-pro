/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

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
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="custom_block_style_item">
			<TitleArea
				activeBlockType={activeBlockType}
				index={index}
				blockStyleListObj={blockStyleListObj}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
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
