/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	Button,
	ToolbarGroup,
	ToolbarButton,
	Spinner,
	ButtonGroup,
	BaseControl,
} from '@wordpress/components';
import {
	InspectorControls,
	useBlockProps,
	BlockControls,
} from '@wordpress/block-editor';
import { edit } from '@wordpress/icons';
import { useState } from '@wordpress/element';
import { View } from '@wordpress/primitives';
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Internal dependencies
 */
import BlogCardPlaceholder from './blog-card-placeholder';
import useRemoteUrlData from '../../blog-card/api/use-rich-url-data';
import fetchUrlData from '../../blog-card/api/fetch-url-data';

export default function BlogCardWrapperEdit(props) {
	const { attributes, setAttributes } = props;
	const { url: attributesUrl, cardType } = attributes;
	const [isEditingURL, setIsEditingURL] = useState(false);
	const [url, setURL] = useState(attributesUrl);
	const [isLoadingClearCache, setIsLoadingClearCache] = useState(false);
	const blockProps = useBlockProps();

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

	const cannotEmbed = richData === null ? false : richData?.data.cannot_embed;
	const preview = richData === null ? false : !richData?.data.cannot_embed;

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
					<ButtonGroup>
						<Button
							isSmall={true}
							variant={cardType === '' ? 'primary' : 'secondary'}
							onClick={() => setAttributes({ cardType: '' })}
						>
							{__('右画像', 'vk-blocks-pro')}
						</Button>
						<Button
							isSmall={true}
							variant={
								cardType === 'left-text-right-image'
									? 'primary'
									: 'secondary'
							}
							onClick={() =>
								setAttributes({
									cardType: 'left-text-right-image',
								})
							}
						>
							{__('左画像', 'vk-blocks-pro')}
						</Button>
						<Button
							isSmall={true}
							variant={
								cardType ===
								'large-image-and-image-lower-character'
									? 'primary'
									: 'secondary'
							}
							onClick={() =>
								setAttributes({
									cardType:
										'large-image-and-image-lower-character',
								})
							}
						>
							{__('大画像 & 画像下文字', 'vk-blocks-pro')}
						</Button>
					</ButtonGroup>
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
					!isEditingURL &&
					!richData?.data.cannot_embed
				) {
					return (
						<div {...blockProps}>
							<ServerSideRender
								skipBlockSupportAttributes
								block="vk-blocks/blog-card-2"
								attributes={attributes}
							/>
						</div>
					);
				}
				return (
					<BlogCardPlaceholder
						// isStartingBlank={isStartingBlank}
						// setIsStartingBlank={setIsStartingBlank}
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
