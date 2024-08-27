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
import { getBlockSupport, store as blocksStore } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { SCOPE_OPTIONS } from '../../../utils';

export const BodyArea = ({
	index,
	blockName,
	variationState,
	setVariationState,
}) => {
	const { _getCategories } = useSelect((select) => {
		const { getCategories } = select(blocksStore);
		// vk-blocks-cat-deprecated は非表示
		const categories = getCategories().filter(
			(item) => item.slug !== 'vk-blocks-cat-deprecated'
		);
		return {
			_getCategories: categories,
		};
	}, []);
	const support = getBlockSupport(blockName, 'vkBlocksBlockVariation');

	const onChange = (key, value) => {
		const newItems = variationState;
		newItems[index] = {
			...variationState[index],
			[key]: value,
		};
		setVariationState([...newItems]);
	};

	return (
		<VStack
			spacing="3"
			style={{
				padding: '20px',
				borderTop: '1px solid #ccc',
			}}
		>
			<div>
				<h4>{__('Title (required)', 'vk-blocks-pro')}</h4>
				<TextControl
					__nextHasNoMarginBottom
					value={variationState[index].title}
					onChange={(value) => onChange('title', value)}
					placeholder={__('My variations', 'vk-blocks-pro')}
				/>
				{!variationState[index].title && (
					<p
						className="block-variation-error-text"
						style={{ marginTop: '0', color: '#c00' }}
					>
						{__('title is required', 'vk-blocks-pro')}
					</p>
				)}
			</div>
			<div>
				<h4>{__('Description', 'vk-blocks-pro')}</h4>
				<TextControl
					__nextHasNoMarginBottom
					value={variationState[index].description}
					onChange={(value) => onChange('description', value)}
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
						checked={variationState[index].scope?.includes(
							scopeOption.name
						)}
						help={scopeOption.help}
						label={scopeOption.label}
						onChange={(isChecked) => {
							const newScope = isChecked
								? [
										...(variationState[index].scope || []),
										scopeOption.name,
									]
								: variationState[index].scope.filter(
										(item) => item !== scopeOption.name
									);
							onChange('scope', newScope);
						}}
					/>
				))}
				{variationState[index].scope.length === 0 && (
					<p className="block-variation-error-text">
						{__('scope is required', 'vk-blocks-pro')}
					</p>
				)}
			</div>
			{variationState[index].scope.includes('inserter') && (
				<div>
					<h4>{__('Category')}</h4>
					<div className="block-variation-category-list">
						{_getCategories.map((blockCategory) => (
							<RadioControl
								key={blockCategory.slug}
								selected={variationState[index].category}
								options={[
									{
										label: blockCategory.title,
										value: blockCategory.slug,
									},
								]}
								onChange={(value) =>
									onChange('category', value)
								}
							/>
						))}
					</div>
				</div>
			)}
			<div>
				<h4>{__('Icon', 'vk-blocks-pro')}</h4>
				<TextControl
					__nextHasNoMarginBottom
					value={variationState[index].icon}
					onChange={(value) => onChange('icon', value)}
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
					value={variationState[index].keywords || []}
					onChange={(value) => onChange('keywords', value)}
				/>
			</div>
		</VStack>
	);
};
