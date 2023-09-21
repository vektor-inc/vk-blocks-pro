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
						'現在のブロック設定をブロックバリエーションとして登録できます。',
						'vk-blocks-pro'
					)}
					<ExternalLink
						href={__(
							'https://ja.wordpress.org/team/handbook/block-editor/reference-guides/block-api/block-variations/',
							// 'https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/',
							'vk-blocks-pro'
						)}
						target="_blank"
						rel="noreferrer"
					>
						{__(
							'ブロックバリエーションについてさらに詳しく',
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
				<TextControl
					__nextHasNoMarginBottom
					label={__('タイトル (必須)', 'vk-blocks-pro')}
					value={variation.title}
					onChange={(value) => {
						setVariation({ ...variation, title: value });
					}}
					placeholder={__('マイバリエーション', 'vk-blocks-pro')}
				/>
				{!variation.title && (
					<p style={{ marginTop: '0', color: '#c00' }}>
						{__('title is required', 'vk-blocks-pro')}
					</p>
				)}
				<TextControl
					__nextHasNoMarginBottom
					label={__('説明', 'vk-blocks-pro')}
					value={variation.description}
					onChange={(value) => {
						setVariation({ ...variation, description: value });
					}}
				/>
				<h4>{__('スコープ (必須)', 'vk-blocks-pro')}</h4>
				{SCOPE_OPTIONS.filter((scopeOption) =>
					support.scope.includes(scopeOption.name)
				).map((scopeOption) => (
					<CheckboxControl
						key={scopeOption.name}
						__nextHasNoMarginBottom
						checked={variation.scope?.includes(scopeOption.name)}
						help={scopeOption.help}
						label={scopeOption.label}
						onChange={(isChecked) => {
							const newScope = isChecked
								? [...(variation.scope || []), scopeOption.name]
								: variation.scope.filter(
										(item) => item !== scopeOption.name
								  );
							setVariation({ ...variation, scope: newScope });
						}}
					/>
				))}
				{variation.scope.length === 0 && (
					<p style={{ marginTop: '0', color: '#c00' }}>
						{__('scope is required', 'vk-blocks-pro')}
					</p>
				)}
				{variation.scope.includes('inserter') && (
					<>
						<h4>{__('Category')}</h4>
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
					</>
				)}
				<TextControl
					__nextHasNoMarginBottom
					label={__('アイコン', 'vk-blocks-pro')}
					value={variation.icon}
					onChange={(value) => {
						setVariation({ ...variation, icon: value });
					}}
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
					value={variation.keywords}
					onChange={(value) => {
						setVariation({ ...variation, keywords: value });
					}}
					placeholder={__('キーワード', 'vk-blocks-pro')}
				/>
			</VStack>
		</>
	);
}
