/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	BaseControl,
	Button,
	ToolbarGroup,
	ToolbarButton,
	Spinner,
	ExternalLink,
} from '@wordpress/components';
import {
	InspectorControls,
	useBlockProps,
	store as blockEditorStore,
	BlockControls,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { edit } from '@wordpress/icons';
import { useState } from '@wordpress/element';
import { View } from '@wordpress/primitives';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import BlogCardPlaceholder from './blog-card-placeholder';
import useRemoteUrlData from '../api/use-rich-url-data';
import fetchUrlData from '../api/fetch-url-data';
import VariationExplorerModal from '@vkblocks/extensions/common/custom-block-variation/block-variation-explorer';

export default function BlogCardWrapperEdit(props) {
	const { name, attributes, setAttributes, clientId } = props;
	const { url: attributesUrl } = attributes;
	const [isEditingURL, setIsEditingURL] = useState(false);
	const [url, setURL] = useState(attributesUrl);
	const [isLoadingClearCache, setIsLoadingClearCache] = useState(false);
	const [isStartingBlank, setIsStartingBlank] = useState(false);
	const hasInnerBlocks = useSelect(
		(select) => !!select(blockEditorStore).getBlocks(clientId).length,
		[clientId]
	);
	const blockProps = useBlockProps();

	const [showPatternsExplorer, setShowPatternsExplorer] = useState(false);
	const hasMultiSelection = useSelect(
		(select) => select(blockEditorStore).hasMultiSelection(),
		[]
	);
	const { canUserEdit } = useSelect((select) => {
		const { canUser } = select(coreStore);
		const canEdit = canUser('update', 'settings');
		return {
			canUserEdit: canEdit,
		};
	}, []);

	const { richData, isFetching } = useRemoteUrlData(
		attributesUrl,
		isLoadingClearCache
	);

	const onClickClearCache = () => {
		setIsLoadingClearCache(true);
		fetchUrlData(url, { clearCache: true }).then(() => {
			setIsLoadingClearCache(false);
		});
	};

	const { replaceInnerBlocks } = useDispatch(blockEditorStore);
	const cannotEmbed = richData === null ? false : richData?.data.cannot_embed;
	const preview = richData === null ? false : !richData?.data.cannot_embed;

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		prioritizedInserterBlocks: [
			'vk-blocks/blog-card-excerpt',
			'vk-blocks/blog-card-featured-image',
			'vk-blocks/blog-card-site-logo',
			'vk-blocks/blog-card-site-title',
			'vk-blocks/blog-card-title',
		],
	});

	// url以外のattributesをundefinedにする
	function setUndefinedExceptSpecifiedProps(obj, propsToKeep) {
		const newObj = {};
		for (const key of Object.keys(obj)) {
			newObj[key] = propsToKeep.includes(key) ? obj[key] : undefined;
		}
		return newObj;
	}
	const propertiesToKeep = ['url'];
	const replaceAttributes = setUndefinedExceptSpecifiedProps(
		attributes,
		propertiesToKeep
	);

	return (
		<>
			<BlockControls>
				{preview && !cannotEmbed && !isEditingURL && (
					<ToolbarGroup>
						<ToolbarButton
							className="components-toolbar__control"
							label={__('Edit URL')}
							icon={edit}
							onClick={() => setIsEditingURL(true)}
						/>
					</ToolbarGroup>
				)}
				{hasInnerBlocks && (
					<ToolbarGroup className="wp-block-template-part__block-control-group">
						<ToolbarButton
							onClick={() => {
								setAttributes({ ...replaceAttributes });
								// innerBlocksを削除する
								replaceInnerBlocks(clientId, []);
								setIsStartingBlank(true);
								setIsEditingURL(false);
							}}
						>
							{__('Replace')}
						</ToolbarButton>
					</ToolbarGroup>
				)}
			</BlockControls>
			<InspectorControls>
				<PanelBody title={__('Settings')}>
					<BaseControl id={`vk_blogCard`}>
						{richData?.data.post_id === undefined && (
							<>
								<Button
									onClick={onClickClearCache}
									variant="primary"
									isBusy={isLoadingClearCache}
									disabled={!!!attributesUrl ? true : false}
								>
									{__('Clear cache', 'vk-blocks-pro')}
								</Button>
								<p style={{ marginTop: '8px' }}>
									{__(
										'If the data is old, please clear the cache. It is usually updated every hour.',
										'vk-blocks-pro'
									)}
								</p>
							</>
						)}
						{hasInnerBlocks &&
							!hasMultiSelection &&
							canUserEdit && (
								<>
									<Button
										onClick={() =>
											setShowPatternsExplorer(true)
										}
										variant="primary"
									>
										{__(
											'Variation settings',
											'vk-blocks-pro'
										)}
									</Button>
									<p style={{ marginTop: '8px' }}>
										{__(
											'You can register the current block settings as block variations.',
											'vk-blocks-pro'
										)}
										<br />
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
									{showPatternsExplorer && (
										<VariationExplorerModal
											onModalClose={() =>
												setShowPatternsExplorer(false)
											}
											setIsModalOpen={
												setShowPatternsExplorer
											}
											blockName={name}
											clientId={clientId}
										/>
									)}
								</>
							)}
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			{(() => {
				if (isFetching || isLoadingClearCache) {
					return (
						<View {...blockProps}>
							<div className="wp-block-blog-card is-loading">
								<Spinner />
							</div>
						</View>
					);
				} else if (
					url &&
					attributesUrl &&
					hasInnerBlocks &&
					!isEditingURL &&
					!richData?.data.cannot_embed
				) {
					return <div {...innerBlocksProps} />;
				}
				return (
					<BlogCardPlaceholder
						isStartingBlank={isStartingBlank}
						setIsStartingBlank={setIsStartingBlank}
						isEditingURL={isEditingURL}
						setIsEditingURL={setIsEditingURL}
						cannotEmbed={cannotEmbed}
						url={url}
						setURL={setURL}
						onClickClearCache={onClickClearCache}
						{...props}
					/>
				);
			})()}
		</>
	);
}
