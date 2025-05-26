import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	ToggleControl,
	BaseControl,
	CheckboxControl,
	TextControl,
	ToolbarGroup,
} from '@wordpress/components';
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
	BlockControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import CommonItemControl from '../gridcolcard/edit-common.js';
import classnames from 'classnames';
import { isHexColor } from '@vkblocks/utils/is-hex-color';
import { isGradientStyle } from '@vkblocks/utils/is-gradient-style';
import { isParentReusableBlock } from '@vkblocks/utils/is-parent-reusable-block';
import LinkToolbar from '@vkblocks/components/link-toolbar';

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const ALLOWED_BLOCKS = [
		'vk-blocks/gridcolcard-item-header',
		'vk-blocks/gridcolcard-item-body',
		'vk-blocks/gridcolcard-item-footer',
	];
	// インナーブロックの構成を変更（ header / footer を削除 ）する事はできないので、ここではフルに記述している。
	// そのかわり header / footer ブロックの方で中身を出力しないようにしている
	const TEMPLATE = [
		['vk-blocks/gridcolcard-item-header'],
		['vk-blocks/gridcolcard-item-body'],
		['vk-blocks/gridcolcard-item-footer'],
	];

	const {
		editLock,
		headerDisplay,
		footerDisplay,
		containerSpace,
		borderRadius,
		border,
		borderColor,
		borderWidth,
		borderStyle,
		textColor,
		backgroundColor,
		backgroundGradient,
		url,
		urlOpenType,
		relAttribute,
	} = attributes;

	const { updateBlockAttributes } = useDispatch(blockEditorStore);

	// 更に Header インナー に値を送る
	// const { updateBlockAttributes } = dispatch('core/block-editor');
	const { getBlocksByClientId } = useSelect((select) => {
		return select('core/block-editor');
	}, []);

	const thisBlock = getBlocksByClientId(clientId);
	// 親ブロック情報取得
	useEffect(() => {
		if (isParentReusableBlock(clientId) === false) {
			// Send attribute to child
			if (thisBlock && thisBlock[0] && thisBlock[0].innerBlocks) {
				const thisInnerBlocks = thisBlock[0].innerBlocks;
				thisInnerBlocks.forEach(function (thisInnerBlock) {
					updateBlockAttributes(thisInnerBlock.clientId, {
						containerSpace: attributes.containerSpace,
						headerImageAspectRatio:
							attributes.headerImageAspectRatio,
						headerImageFit: attributes.headerImageFit,
						headerDisplay: attributes.headerDisplay,
						footerDisplay: attributes.footerDisplay,
					});
				});
			}
		}
	}, [thisBlock, attributes]);

	// カラーパレットに対応
	const containerClasses = classnames('vk_gridcolcard_item', {
		[`vk_gridcolcard_item-noHeader`]: headerDisplay === 'delete',
		[`vk_gridcolcard_item-noFooter`]: footerDisplay === 'delete',
		[`has-background`]: !!backgroundColor,
		[`has-border-color`]: !!border,
		[`has-${backgroundColor}-background-color`]:
			!!backgroundColor && !isHexColor(backgroundColor),
		[`has-${backgroundGradient}-gradient-background`]:
			!!backgroundGradient && !isGradientStyle(backgroundGradient),
		[`has-${borderColor}-border-color`]:
			!!border && !!borderColor && !isHexColor(borderColor),
	});

	const innerClasses = classnames('vk_gridcolcard_item_container', {
		[`has-text-color`]: !!textColor,
		[`has-${textColor}-color`]: !!textColor && !isHexColor(textColor),
	});

	const style = {
		backgroundColor: null,
		border: null,
	};
	if (borderRadius) {
		style.borderRadius = `${borderRadius}`;
	}

	// 背景色
	if (backgroundColor && isHexColor(backgroundColor)) {
		// custom color
		style.backgroundColor = `${backgroundColor}`;
	}

	// 背景グラデーション
	if (backgroundGradient && isGradientStyle(backgroundGradient)) {
		style.background = `${backgroundGradient}`;
	}

	// 線の色と太さ
	if (border) {
		style.borderWidth = borderWidth;
		style.borderStyle = borderStyle;
		if (isHexColor(borderColor)) {
			// custom color
			style.borderColor = `${borderColor}`;
		}
		if (isHexColor(borderStyle)) {
			style.borderStyle = `${borderStyle}`;
		}
	}

	// 文字色
	const textColorCustom =
		textColor && isHexColor(textColor) ? textColor : null;

	// mb-3 alert alert-danger
	const alertClass = url ? 'mb-3 alert alert-danger' : 'mb-3';

	const blockProps = useBlockProps({
		className: classnames(containerClasses, {
			'vk_gridcolcard_item-noHeader': headerDisplay === 'delete',
			'vk_gridcolcard_item-noFooter': footerDisplay === 'delete',
			[`vk_gridcolcard_item-header-${headerDisplay}`]:
				headerDisplay !== 'delete',
			[`vk_gridcolcard_item-footer-${footerDisplay}`]:
				footerDisplay !== 'delete',
		}),
		style,
	});

	const handleRelChange = (type, checked) => {
		const rel = relAttribute ? relAttribute.split(' ') : [];
		if (checked) {
			rel.push(type);
		} else {
			const index = rel.indexOf(type);
			if (index !== -1) {
				rel.splice(index, 1);
			}
		}

		setAttributes({ relAttribute: rel.join(' ') });
	};

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<LinkToolbar
						linkUrl={url}
						setLinkUrl={(url) => setAttributes({ url })}
						linkTarget={urlOpenType ? '_blank' : undefined}
						setLinkTarget={(target) => {
							setAttributes({ urlOpenType: !!target });
						}}
						relAttribute={relAttribute}
						setRelAttribute={(rel) =>
							setAttributes({ relAttribute: rel })
						}
					/>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={__('Edit mode', 'vk-blocks-pro')}
					initialOpen={true}
				>
					<div className="components-base-control__help alert alert-warning">
						{__(
							'If Edit Lock is disabled, changes made in this item block (such as color or image ratio) will be overwritten when the parent Grid Column Card block is re-selected.',
							'vk-blocks-pro'
						)}
					</div>
					<label htmlFor="vk_hiddenControl-hiddenEditLock">
						{__('Edit Lock', 'vk-blocks-pro')}
					</label>
					<ToggleControl
						label={__(
							'Lock edits this block from the parent and other Grid Column Item block',
							'vk-blocks-pro'
						)}
						checked={editLock}
						onChange={(checked) =>
							setAttributes({ editLock: checked })
						}
					/>
				</PanelBody>
				<PanelBody
					title={__('Column Setting', 'vk-blocks-pro')}
					initialOpen={true}
				>
					<BaseControl
						label={__('Link URL:', 'vk-blocks-pro')}
						id={`	`}
					>
						<TextControl
							value={url}
							onChange={(value) => setAttributes({ url: value })}
						/>
						<CheckboxControl
							label={__('Open link new tab.', 'vk-blocks-pro')}
							checked={urlOpenType}
							onChange={(checked) =>
								setAttributes({ urlOpenType: checked })
							}
						/>

						<CheckboxControl
							label={__('Add noreferrer', 'vk-blocks-pro')}
							checked={!!relAttribute?.includes('noreferrer')}
							onChange={(checked) =>
								handleRelChange('noreferrer', checked)
							}
						/>

						<CheckboxControl
							label={__('Add nofollow', 'vk-blocks-pro')}
							checked={!!relAttribute?.includes('nofollow')}
							onChange={(checked) =>
								handleRelChange('nofollow', checked)
							}
						/>

						<p className={alertClass}>
							{__(
								'If you set a link URL, do not place the link element (text or button) in the Grid Column Card Item. It may not be displayed correctly.',
								'vk-blocks-pro'
							)}
							{__(
								'Make sure that no link is specified for the image block, etc.',
								'vk-blocks-pro'
							)}
						</p>
					</BaseControl>

					<hr />

					<CommonItemControl {...props} />
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div
					className={innerClasses}
					style={{
						paddingTop: containerSpace.top,
						paddingBottom: containerSpace.bottom,
						paddingLeft: containerSpace.left,
						paddingRight: containerSpace.right,
						color: textColorCustom,
					}}
				>
					<InnerBlocks
						allowedBlocks={ALLOWED_BLOCKS}
						template={TEMPLATE}
						templateLock="all"
					/>
				</div>
			</div>
		</>
	);
}
