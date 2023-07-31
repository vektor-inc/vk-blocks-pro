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

/**
 * Internal dependencies
 */
import BlogCardPlaceholder from './blog-card-placeholder';
import useRemoteUrlData from '../api/use-rich-url-data';
import fetchUrlData from '../api/fetch-url-data';

export default function BlogCardWrapperEdit(props) {
	const { attributes, setAttributes, clientId } = props;
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

	// アスペクト比？

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
		prioritizedInserterBlocks:[
			'vk-blocks/blog-card-excerpt',
			'vk-blocks/blog-card-featured-image',
			'vk-blocks/blog-card-site-logo',
			'vk-blocks/blog-card-site-title',
			'vk-blocks/blog-card-title',
		],
	} );

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
								setAttributes({ style: undefined });
								// innerBlocksを削除する
								replaceInnerBlocks(clientId, {}, false);
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
						<Button
							onClick={onClickClearCache}
							variant="primary"
							isBusy={isLoadingClearCache}
							disabled={!!!attributesUrl ? true : false}
						>
							{__('キャッシュクリア', 'vk-blocks-pro')}
						</Button>
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
					return <div { ...innerBlocksProps } />;
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
						preview={preview}
						onClickClearCache={onClickClearCache}
						{...props}
					/>
				);
			})()}
		</>
	);
}
