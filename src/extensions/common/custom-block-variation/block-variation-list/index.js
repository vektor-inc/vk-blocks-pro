/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { STORE_NAME } from '@vkblocks/utils/store/constants';
import { BlockVariationItem } from './item';
import { SaveButton } from '../save-button';

function BlockVariationList(props) {
	const { hasUpdates, setHasUpdates } = props;
	const [openNameLists, setOpenNameLists] = useState([]);

	const variationChanged = (value) => {
		setVariationState(value);
		setHasUpdates(true);
	};

	const [variationState, setVariationState] = useState();

	const { optionObj } = useSelect((select) => {
		const { getOptions } = select(STORE_NAME);
		return {
			optionObj: getOptions(),
		};
	}, []);
	const blockVariationLists =
		optionObj?.vkBlocksOption?.block_variation_lists;
	useEffect(() => {
		setVariationState(blockVariationLists);
	}, [blockVariationLists]);

	return (
		<>
			{variationState?.map((item, index, array) => {
				return (
					<BlockVariationItem
						key={index}
						element={item}
						vIndex={index}
						array={array}
						blockName={item.block_name}
						variationState={variationState}
						setVariationState={variationChanged}
						openNameLists={openNameLists}
						setOpenNameLists={setOpenNameLists}
					/>
				);
			})}
			<SaveButton
				variationState={variationState}
				disabled={!hasUpdates}
				setHasUpdates={setHasUpdates}
				saveButtonChildren={__('Save setting', 'vk-blocks-pro')}
			/>
		</>
	);
}

export default BlockVariationList;
