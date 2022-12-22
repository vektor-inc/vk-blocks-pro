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
	showBlockTypes,
	index,
	onChange,
	blockStyleListObj,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<TitleArea
				showBlockTypes={showBlockTypes}
				index={index}
				blockStyleListObj={blockStyleListObj}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
			{isOpen && (
				<BodyArea
					showBlockTypes={showBlockTypes}
					index={index}
					onChange={onChange}
					blockStyleListObj={blockStyleListObj}
				/>
			)}
		</>
	);
};
