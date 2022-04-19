import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	Button,
	ButtonGroup,
	ToggleControl,
	BaseControl,
	CheckboxControl,
	TextControl,
	ToolbarGroup,
	ToolbarButton,
	Dropdown,
} from '@wordpress/components';
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
	BlockControls,
	store as blockEditorStore,
	URLInput,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import CommonItemControl from '../gridcolcard/edit-common.js';
import { link, linkOff, keyboardReturn } from '@wordpress/icons';

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
		textColor,
		backgroundColor,
		url,
		urlOpenType,
	} = attributes;

	// editModeは値として保持させずに常に個別モードでスタートさせる
	const [editMode, setEditMode] = useState('self');

	const { rootClientId } = useSelect(
		(select) => {
			// 親ブロックのIDを取得するメソッドを取得
			const { getBlockRootClientId } = select(blockEditorStore);
			// 特ブロックのIDを取得
			const rootId = getBlockRootClientId(clientId);

			return {
				rootClientId: rootId,
			};
		},
		[clientId]
	);

	const { updateBlockAttributes } = useDispatch(blockEditorStore);

	// 更に Header インナー に値を送る
	// const { updateBlockAttributes } = dispatch('core/block-editor');
	const { getBlocksByClientId } = useSelect((select) => {
		return select('core/block-editor');
	}, []);

	const thisBlock = getBlocksByClientId(clientId);
	// 親ブロック情報取得
	const parentBlock = getBlocksByClientId(rootClientId);
	useEffect(() => {
		// Send attribute to child
		if (thisBlock && thisBlock[0] && thisBlock[0].innerBlocks) {
			const thisInnerBlocks = thisBlock[0].innerBlocks;
			thisInnerBlocks.forEach(function (thisInnerBlock) {
				updateBlockAttributes(thisInnerBlock.clientId, {
					containerSpace: attributes.containerSpace,
					headerImageAspectRatio: attributes.headerImageAspectRatio,
					headerImageFit: attributes.headerImageFit,
					headerDisplay: attributes.headerDisplay,
					footerDisplay: attributes.footerDisplay,
				});
			});
		}

		// Send attribute to parent
		if (editMode === 'all') {
			if (parentBlock && parentBlock[0] && parentBlock[0].innerBlocks) {
				const parentInnerBlocks = parentBlock[0].innerBlocks;

				// 兄弟ブロックの値の変更
				parentInnerBlocks.forEach(function (thisInnerBlock) {
					// 編集ロックがかかっていないものだけ上書きする
					if (thisInnerBlock.attributes.editLock === false) {
						updateBlockAttributes(thisInnerBlock.clientId, {
							editMode: attributes.editMode,
							containerSpace: attributes.containerSpace,
							headerImageAspectRatio:
								attributes.headerImageAspectRatio,
							headerImageFit: attributes.headerImageFit,
							headerDisplay: attributes.headerDisplay,
							footerDisplay: attributes.footerDisplay,
							borderRadius: attributes.borderRadius,
							border: attributes.border,
							borderColor: attributes.borderColor,
							textColor: attributes.textColor,
							backgroundColor: attributes.backgroundColor,
						});
					}
				});

				// 子ブロックから親ブロックの値の変更
				updateBlockAttributes(rootClientId, {
					containerSpace: attributes.containerSpace,
					headerImageAspectRatio: attributes.headerImageAspectRatio,
					headerImageFit: attributes.headerImageFit,
					headerDisplay: attributes.headerDisplay,
					footerDisplay: attributes.footerDisplay,
					borderRadius: attributes.borderRadius,
					border: attributes.border,
					borderColor: attributes.borderColor,
					textColor: attributes.textColor,
					backgroundColor: attributes.backgroundColor,
				});
			}
		}
	}, [thisBlock, attributes]);

	const style = {
		backgroundColor: null,
		border: null,
	};
	if (textColor) {
		style.color = `${textColor}`;
	}
	if (backgroundColor) {
		style.backgroundColor = `${backgroundColor}`;
	}
	if (border) {
		style.border = `1px solid ${borderColor}`;
	}
	if (borderRadius) {
		style.borderRadius = `${borderRadius}`;
	}

	const containerClasses = ['vk_gridcolcard_item'];

	// ヘッダーやフッターを削除する場合に、
	// 内容量によってボタンの位置が揃わなくなったりしないように高さ制御するためのクラスを付与
	if (headerDisplay === 'delete') {
		containerClasses.push('vk_gridcolcard_item-noHeader');
	}
	if (footerDisplay === 'delete') {
		containerClasses.push('vk_gridcolcard_item-noFooter');
	}
	const containerClass = containerClasses.join(' ');

	// mb-3 alert alert-danger
	const alertClass = url ? 'mb-3 alert alert-danger' : 'mb-3';

	const blockProps = useBlockProps({
		className: `${containerClass}`,
		style,
	});

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<Dropdown
						renderToggle={({ isOpen, onToggle }) => {
							const setLink = () => {
								if (isOpen && url !== '') {
									// linkOff
									setAttributes({ url: '' });
								}
								onToggle();
							};
							return (
								<ToolbarButton
									aria-expanded={isOpen}
									icon={url !== '' && isOpen ? linkOff : link}
									isActive={
										url !== '' && isOpen ? true : false
									}
									label={
										url !== '' && isOpen
											? __('Unlink')
											: __('Input Link URL', 'vk-blocks')
									}
									onClick={setLink}
								/>
							);
						}}
						renderContent={(params) => {
							return (
								<div className="block-editor-url-input__button block-editor-link-control">
									<form
										className="block-editor-link-control__search-input-wrapper"
										onSubmit={() => {
											params.onClose();
										}}
									>
										<div className="block-editor-link-control__search-input">
											<URLInput
												value={url}
												onChange={(value) => {
													setAttributes({
														url: value,
													});
												}}
											/>
											<CheckboxControl
												label={__(
													'Open link new tab.',
													'vk-blocks'
												)}
												checked={urlOpenType}
												onChange={(checked) =>
													setAttributes({
														urlOpenType: checked,
													})
												}
											/>
											<div className="block-editor-link-control__search-actions">
												<Button
													icon={keyboardReturn}
													label={__('Submit')}
													type="submit"
												/>
											</div>
										</div>
									</form>
								</div>
							);
						}}
					/>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={__('Edit mode', 'vk-blocks')}
					initialOpen={true}
				>
					<ButtonGroup className={`mb-3`}>
						<Button
							isSmall
							isPrimary={editMode === 'all'}
							isSecondary={editMode !== 'all'}
							onClick={() => setEditMode('all')}
						>
							{__('All columns', 'vk-blocks')}
						</Button>
						<Button
							isSmall
							isPrimary={editMode === 'self'}
							isSecondary={editMode !== 'self'}
							onClick={() => setEditMode('self')}
						>
							{__('This column only', 'vk-blocks')}
						</Button>
					</ButtonGroup>
					<hr />
					<label htmlFor="vk_hiddenControl-hiddenEditLock">
						{__('Edit Lock', 'vk-blocks')}
					</label>
					<ToggleControl
						label={__(
							'Lock edits this block from the parent and other Grid Column Item block',
							'vk-blocks'
						)}
						checked={editLock}
						onChange={(checked) =>
							setAttributes({ editLock: checked })
						}
					/>
				</PanelBody>
				<PanelBody
					title={__('Column Setting', 'vk-blocks')}
					initialOpen={true}
				>
					<BaseControl label={__('Link URL:', 'vk-blocks')} id={`	`}>
						<TextControl
							value={url}
							onChange={(value) => setAttributes({ url: value })}
						/>
						<CheckboxControl
							label={__('Open link new tab.', 'vk-blocks')}
							checked={urlOpenType}
							onChange={(checked) =>
								setAttributes({ urlOpenType: checked })
							}
						/>
						<p className={alertClass}>
							{__(
								'If you set a link URL, do not place the link element (text or button) in the Grid Column Card Item. It may not be displayed correctly.',
								'vk-blocks'
							)}
							{__(
								'Make sure that no link is specified for the image block, etc.',
								'vk-blocks'
							)}
						</p>
					</BaseControl>

					<hr />

					<CommonItemControl {...props} />
					
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div
					className={`vk_gridcolcard_item_container`}
					style={{
						paddingTop: containerSpace.top,
						paddingBottom: containerSpace.bottom,
						paddingLeft: containerSpace.left,
						paddingRight: containerSpace.right,
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
