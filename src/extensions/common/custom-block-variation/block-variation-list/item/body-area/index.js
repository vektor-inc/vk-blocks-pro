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
			<TextControl
				__nextHasNoMarginBottom
				label={__('タイトル (必須)', 'vk-blocks-pro')}
				value={variationState[index].title}
				onChange={(value) => onChange('title', value)}
				placeholder={__('マイバリエーション', 'vk-blocks-pro')}
			/>
			{!variationState[index].title && (
				<p style={{ marginTop: '0', color: '#c00' }}>
					{__('title is required', 'vk-blocks-pro')}
				</p>
			)}
			<TextControl
				__nextHasNoMarginBottom
				label={__('説明', 'vk-blocks-pro')}
				value={variationState[index].description}
				onChange={(value) => onChange('description', value)}
			/>
			<h4>{__('スコープ (必須)', 'vk-blocks-pro')}</h4>
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
				<p style={{ marginTop: '0', color: '#c00' }}>
					{__('scope is required', 'vk-blocks-pro')}
				</p>
			)}
			{variationState[index].scope.includes('inserter') && (
				<>
					<h4>{__('Category')}</h4>
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
							onChange={(value) => onChange('category', value)}
						/>
					))}
				</>
			)}
			<TextControl
				__nextHasNoMarginBottom
				label={__('アイコン', 'vk-blocks-pro')}
				value={variationState[index].icon}
				onChange={(value) => onChange('icon', value)}
				placeholder="embed-generic"
			/>
			<div>
				<ExternalLink
					href="https://developer.wordpress.org/resource/dashicons/#embed-generic"
					target="_blank"
					rel="noreferrer"
				>
					{__('Dashicons リスト', 'vk-blocks-pro')}
				</ExternalLink>
			</div>
			<TextControl
				__nextHasNoMarginBottom
				label={__('キーワード', 'vk-blocks-pro')}
				value={variationState[index].keywords}
				onChange={(value) => onChange('keywords', value)}
				placeholder={__('キーワード', 'vk-blocks-pro')}
			/>
		</VStack>
	);
};
