/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { registerBlockVariation } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import VariationForm from './block-variation-form';
import { VariationIcon } from '../icons';
import { SaveButton } from '../save-button';
import { STORE_NAME } from '@vkblocks/utils/store/constants';

const DEFAULT_VARIATION = {
	name: '',
	title: '',
	description: '',
	category: '',
	icon: '',
	scope: [],
	keywords: '',
};

export default function CreateVariation(props) {
	const { blockName, clientId, setIsModalOpen, setHasUpdates } = props;
	const [variation, setVariation] = useState(DEFAULT_VARIATION);
	const [canSave, setCanSave] = useState(false);

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

	useEffect(() => {
		if (JSON.stringify(variation) === JSON.stringify(DEFAULT_VARIATION)) {
			setHasUpdates(false);
		} else {
			setHasUpdates(true);
		}
	}, [variation]);

	const { getBlocksByClientId } = useSelect(
		(select) => select(blockEditorStore),
		[]
	);
	const blockObj = getBlocksByClientId(clientId)[0] ?? {};

	const updateSettings = (newVariation) => {
		variationState.push({
			block_name: blockName,
			...newVariation,
		});
		setVariationState([...variationState]);
	};

	const saveAttributes = generateAttributes(blockObj.attributes, ['url']);
	const saveInnerBlocks = generateInnerBlocks(blockObj.innerBlocks);
	const saveButtonClick = () => {
		const updateVariation = {
			...variation,
			attributes: JSON.stringify(saveAttributes),
			innerBlocks: JSON.stringify(saveInnerBlocks),
		};
		updateSettings(updateVariation);
		const blockVariation = {
			...updateVariation,
			attributes: saveAttributes,
			innerBlocks: saveInnerBlocks,
			icon: variation.icon || VariationIcon,
			block_name: undefined,
		};
		registerBlockVariation(blockName, blockVariation);

		setIsModalOpen(false);
	};
	return (
		<>
			<VariationForm
				variation={variation}
				setVariation={setVariation}
				blockName={blockName}
				canSave={canSave}
				setCanSave={setCanSave}
				variationState={variationState}
				setVariationState={setVariationState}
			/>
			<SaveButton
				disabled={
					!canSave || !variation.title || variation.scope.length === 0
				}
				onClick={saveButtonClick}
				variationState={variationState}
				setVariationState={setVariationState}
				saveButtonChildren={__('Add', 'vk-blocks-pro')}
			/>
		</>
	);
}

function generateAttributes(attributes, excludeAttributes = []) {
	const generatedAttributes = {};

	for (const key in attributes) {
		if (
			excludeAttributes.find((attribute) => {
				return attribute === key;
			}) === undefined
		) {
			if (
				typeof attributes[key] === 'object' &&
				!Array.isArray(attributes[key])
			) {
				generatedAttributes[key] = generateAttributes(attributes[key]);
			} else {
				generatedAttributes[key] = attributes[key];
			}
		}
	}

	return generatedAttributes;
}

function generateInnerBlocks(propsInnerBlocks = []) {
	return propsInnerBlocks.map(
		({ name, attributes = {}, innerBlocks = [] }) => [
			name,
			attributes,
			generateInnerBlocks(innerBlocks),
		]
	);
}
