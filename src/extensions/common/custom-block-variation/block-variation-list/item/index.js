/**
 * Internal dependencies
 */
import { TitleArea } from './title-area';
import { BodyArea } from './body-area';

export const BlockVariationItem = ({
	vIndex,
	element,
	array,
	blockName,
	variationState,
	setVariationState,
	openNameLists,
	setOpenNameLists,
}) => {
	const isOpen = openNameLists.includes(variationState[vIndex].name);

	return (
		<div
			key={vIndex}
			className="block-variation-list"
			style={{
				borderRadius: '5px',
				border: '1px solid #ccc',
				margin: '20px 0',
			}}
		>
			<TitleArea
				index={vIndex}
				element={element}
				array={array}
				blockName={blockName}
				variationState={variationState}
				setVariationState={setVariationState}
				openNameLists={openNameLists}
				setOpenNameLists={setOpenNameLists}
			/>
			{isOpen && (
				<BodyArea
					index={vIndex}
					element={element}
					array={array}
					blockName={blockName}
					variationState={variationState}
					setVariationState={setVariationState}
				/>
			)}
		</div>
	);
};
