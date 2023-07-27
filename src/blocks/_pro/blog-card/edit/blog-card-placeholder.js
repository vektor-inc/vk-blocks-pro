/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import {
	createBlocksFromInnerBlocksTemplate,
	store as blocksStore,
} from '@wordpress/blocks';
import {
	useBlockProps,
	store as blockEditorStore,
	__experimentalBlockVariationPicker,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { useScopedBlockVariations, fallback } from '../utils';
import URLPlaceholder from './url-placeholder';

export default function BlogCardPlaceholder({
	attributes,
	clientId,
	name,
	setAttributes,
	onFocus,
	isStartingBlank,
	setIsStartingBlank,
	isEditingURL,
	setIsEditingURL,
	cannotEmbed,
	url,
	setURL,
	preview,
	onClickClearCache,
	onReplace,
}) {
	const blockProps = useBlockProps();

	const { blockType } = useSelect(
		(select) => {
			const { getBlockType } = select(blocksStore);
			return {
				blockType: getBlockType(name),
			};
		},
		[name, clientId]
	);

	const icon = blockType?.icon?.src;
	const label = blockType?.title;
	if (isStartingBlank && !cannotEmbed && !isEditingURL) {
		return (
			<BlogCardVariationPicker
				clientId={clientId}
				attributes={attributes}
				setAttributes={setAttributes}
				icon={icon}
				label={label}
			/>
		);
	}

	const showEmbedPlaceholder = !preview || cannotEmbed || isEditingURL;
	if (showEmbedPlaceholder) {
		return (
			<div {...blockProps}>
				<URLPlaceholder
					icon={icon}
					label={label}
					onFocus={onFocus}
					onSubmit={(event) => {
						if (event) {
							event.preventDefault();
						}
						if (!!url) {
							setIsEditingURL(false);
							setAttributes({ url });
							setIsStartingBlank(true);
						}
					}}
					value={url}
					cannotEmbed={cannotEmbed}
					onChange={(event) => {
						setURL(event.target.value);
					}}
					fallback={() => fallback(url, onReplace)}
					tryAgain={onClickClearCache}
				/>
			</div>
		);
	}
}

function BlogCardVariationPicker({
	clientId,
	attributes,
	setAttributes,
	icon,
	label,
}) {
	const scopeVariations = useScopedBlockVariations(attributes);
	const { replaceInnerBlocks } = useDispatch(blockEditorStore);
	const blockProps = useBlockProps();
	return (
		<div {...blockProps}>
			<__experimentalBlockVariationPicker
				icon={icon}
				label={label}
				variations={scopeVariations}
				onSelect={(variation) => {
					if (variation.attributes) {
						setAttributes({
							...variation.attributes,
						});
					}
					if (variation.innerBlocks) {
						replaceInnerBlocks(
							clientId,
							createBlocksFromInnerBlocksTemplate(
								variation.innerBlocks
							),
							false
						);
					}
				}}
			/>
		</div>
	);
}
