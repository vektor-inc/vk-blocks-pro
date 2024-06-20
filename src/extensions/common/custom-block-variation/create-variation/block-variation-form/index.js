/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	TextControl,
	__experimentalVStack as VStack,
	CheckboxControl,
	RadioControl,
	ExternalLink,
	FormTokenField,
} from '@wordpress/components';
import { store as blocksStore, getBlockSupport } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import VariationName from './variation-name';
import { SCOPE_OPTIONS } from '../../utils';

export default function VariationForm(props) {
	const {
		variation,
		setVariation,
		blockName,
		canSave,
		setCanSave,
		isVariationList = false,
	} = props;
	const { _getBlockVariations, _getCategories } = useSelect((select) => {
		const { getBlockVariations, getCategories } = select(blocksStore);
		// vk-blocks-cat-deprecated は非表示
		const categories = getCategories().filter(
			(item) => item.slug !== 'vk-blocks-cat-deprecated'
		);
		return {
			_getBlockVariations: getBlockVariations(blockName),
			_getCategories: categories,
		};
	}, []);

	const support = getBlockSupport(blockName, 'vkBlocksBlockVariation');

	return (
		<>
			<VStack spacing="3">
				<p>
					{__(
						'You can register the current block settings as block variations.',
						'vk-blocks-pro'
					)}
					<ExternalLink
						href={__(
							'https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/',
							'vk-blocks-pro'
						)}
						target="_blank"
						rel="noreferrer"
					>
						{__(
							'Learn more about block variations',
							'vk-blocks-pro'
						)}
					</ExternalLink>
				</p>
				{!isVariationList && (
					<VariationName
						blockName={blockName}
						canSave={canSave}
						setCanSave={setCanSave}
						getBlockVariations={_getBlockVariations}
						variation={variation}
						setVariation={setVariation}
					/>
				)}
				<div>
					<h4>{__('Title (required)', 'vk-blocks-pro')}</h4>
					<TextControl
						__nextHasNoMarginBottom
						value={variation.title}
						onChange={(value) => {
							setVariation({ ...variation, title: value });
						}}
						placeholder={__('My variations', 'vk-blocks-pro')}
					/>
					{!variation.title && (
						<p className="block-variation-error-text">
							{__('title is required', 'vk-blocks-pro')}
						</p>
					)}
				</div>
				<div>
					<h4>{__('Description', 'vk-blocks-pro')}</h4>
					<TextControl
						__nextHasNoMarginBottom
						value={variation.description}
						onChange={(value) => {
							setVariation({ ...variation, description: value });
						}}
					/>
				</div>
				<div>
					<h4>{__('Scope (required)', 'vk-blocks-pro')}</h4>
					<p style={{ marginTop: '0' }}>
						{__(
							'You can set where registered variations are displayed. You can call it from the displayed location.',
							'vk-blocks-pro'
						)}
					</p>
					{SCOPE_OPTIONS.filter((scopeOption) =>
						support.scope.includes(scopeOption.name)
					).map((scopeOption) => (
						<CheckboxControl
							key={scopeOption.name}
							__nextHasNoMarginBottom
							checked={variation.scope?.includes(
								scopeOption.name
							)}
							help={scopeOption.help}
							label={scopeOption.label}
							onChange={(isChecked) => {
								const newScope = isChecked
									? [
											...(variation.scope || []),
											scopeOption.name,
									  ]
									: variation.scope.filter(
											(item) => item !== scopeOption.name
									  );
								setVariation({ ...variation, scope: newScope });
							}}
						/>
					))}
					{variation.scope.length === 0 && (
						<p className="block-variation-error-text">
							{__('scope is required', 'vk-blocks-pro')}
						</p>
					)}
				</div>
				{variation.scope.includes('inserter') && (
					<div>
						<h4>{__('Category')}</h4>
						<div className="block-variation-category-list">
							{_getCategories.map((blockCategory) => (
								<RadioControl
									key={blockCategory.slug}
									selected={variation.category}
									options={[
										{
											label: blockCategory.title,
											value: blockCategory.slug,
										},
									]}
									onChange={(value) => {
										setVariation({
											...variation,
											category: value,
										});
									}}
								/>
							))}
						</div>
					</div>
				)}
				<div>
					<h4>{__('Icon', 'vk-blocks-pro')}</h4>
					<TextControl
						__nextHasNoMarginBottom
						value={variation.icon}
						onChange={(value) => {
							setVariation({ ...variation, icon: value });
						}}
						placeholder="embed-generic"
						help={__(
							'For the icon name, please enter alphanumeric characters without "dashicons-". Example: embed-generic',
							'vk-blocks-pro'
						)}
					/>
					<div>
						<ExternalLink
							href="https://developer.wordpress.org/resource/dashicons/#embed-generic"
							target="_blank"
							rel="noreferrer"
						>
							{__('Dashicons list', 'vk-blocks-pro')}
						</ExternalLink>
					</div>
				</div>
				<div>
					<h4>{__('Keyword', 'vk-blocks-pro')}</h4>
					<FormTokenField
						label={__('Add keyword', 'vk-blocks-pro')}
						value={variation.keywords || []}
						onChange={(value) => {
							setVariation({ ...variation, keywords: value });
						}}
					/>
				</div>
			</VStack>
		</>
	);
}
