import { useState, useEffect } from 'react';
import {
	ToolbarButton,
	Dropdown,
	CheckboxControl,
	Button,
	Tooltip,
	TextControl,
} from '@wordpress/components';
import { URLInput } from '@wordpress/block-editor';
import { __, sprintf } from '@wordpress/i18n';
import { link, linkOff, keyboardReturn, globe, copy, edit } from '@wordpress/icons';

const LinkPreview = ({
	linkUrl,
	linkTitle,
	icon,
	linkTarget,
	onRemove,
	onCopy,
	onEditLinkClick,
}) => {
	const displayURL =
		linkUrl.startsWith('http://') || linkUrl.startsWith('https://')
			? linkUrl
			: 'http://' + linkUrl;

	return (
		<div
			aria-label={__('Currently selected', 'vk-blocks-pro')}
			className="block-editor-link-control__search-item is-current is-rich is-preview"
		>
			<div className="block-editor-link-control__search-item-top">
				<span className="block-editor-link-control__search-item-header">
					<span className="block-editor-link-control__search-item-icon is-image">
						{icon}
					</span>
					<span className="block-editor-link-control__search-item-details">
						<a
							className="components-external-link block-editor-link-control__search-item-title"
							href={displayURL}
							target={linkTarget}
							rel="noopener noreferrer"
						>
							<span
								data-wp-c16t="true"
								data-wp-component="Truncate"
								className="components-truncate af-dc---cacbf-19ok06l e19lxcc00"
							>
								{linkTitle}
							</span>
						</a>
						<span className="block-editor-link-control__search-item-info">
							<span
								data-wp-c16t="true"
								data-wp-component="Truncate"
								className="components-truncate af-dc---cacbf-19ok06l e19lxcc00"
							>
								{linkUrl}
							</span>
						</span>
					</span>
				</span>
				{/* Edit link の追加 */}
				<Tooltip text={__('Edit link', 'vk-blocks-pro')}>
					<Button
						icon={edit}
						label={__('Edit link', 'vk-blocks-pro')}
						onClick={onEditLinkClick}
						size="compact"
					/>
				</Tooltip>
				<Tooltip text={__('Deleting Link', 'vk-blocks-pro')}>
					<button
						type="button"
						className="components-button is-compact has-icon"
						aria-label={__('Deleting Link', 'vk-blocks-pro')}
						onClick={onRemove}
					>
						<span style={{ width: '24px', height: '24px' }}>
							{linkOff}
						</span>
					</button>
				</Tooltip>
				<Tooltip
					text={sprintf(__('Copy link: %s', 'vk-blocks-pro'), linkUrl)}
				>
					<button
						type="button"
						className="components-button is-compact has-icon"
						aria-label={__('Copy link', 'vk-blocks-pro')}
						onClick={() => onCopy(linkUrl)}
					>
						<span style={{ width: '24px', height: '24px' }}>
							{copy}
						</span>
					</button>
				</Tooltip>
			</div>
		</div>
	);
};

const LinkToolbar = ({ linkUrl, setLinkUrl, linkTarget, setLinkTarget }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [linkTitle, setLinkTitle] = useState('');
	const [icon, setIcon] = useState(null);
	const [isSnackbarVisible, setSnackbarVisible] = useState(false);
	const [isSubmitDisabled, setSubmitDisabled] = useState(true);
	const [ariaMessage, setAriaMessage] = useState('');

	// 統合された状態を追加
	const [linkDescription, setLinkDescription] = useState('');
	const [relAttribute, setRelAttribute] = useState('');
	const [isEditingLink, setIsEditingLink] = useState(false);

	useEffect(() => {
		if (linkUrl) {
			const formattedUrl = formatUrl(linkUrl);
			const isExternalLink =
				!formattedUrl.startsWith(window.location.origin) &&
				!formattedUrl.startsWith('#');

			const fetchTitle = function (url) {
				if (url.startsWith('#')) {
					return Promise.resolve(url); // アンカーリンクの場合はそのまま返す
				}
				return fetch(url, { method: 'GET' })
					.then((response) => response.text())
					.then((text) => {
						const titleMatch = text.match(/<title>(.*?)<\/title>/i);
						return titleMatch ? titleMatch[1] : url;
					})
					.catch(() => {
						return url;
					});
			};

			fetchTitle(formattedUrl).then((title) => {
				setLinkTitle(title);
			});

			if (isExternalLink) {
				setIcon(globe);
			} else if (formattedUrl.startsWith('#')) {
				setIcon(globe);
			} else {
				try {
					const domain = new URL(formattedUrl).origin;
					const faviconUrl = `${domain}/favicon.ico`;
					setIcon(
						<img
							src={faviconUrl}
							alt=""
							style={{ width: '16px', height: '16px' }}
						/>
					);
				} catch {
					setIcon(link); // URLが無効な場合はリンクアイコンを使用
				}
			}
		}
	}, [linkUrl]);

	useEffect(() => {
		setSubmitDisabled(!linkUrl || linkUrl.trim() === '');
	}, [linkUrl]);

	const handleToggle = () => {
		if (!isOpen) {
			setIsOpen(true);
		} else if (linkUrl === '') {
			setIsOpen(false);
		}
	};

	const handleRemove = () => {
		setLinkUrl('');
		setLinkTarget('');
		setIsOpen(false);
	};

	const handleCopy = function (url) {
		const formattedUrl = url.startsWith('#') ? url : formatUrl(url);
		if (typeof window !== 'undefined' && window.navigator.clipboard) {
			window.navigator.clipboard
				.writeText(formattedUrl)
				.then(() => {
					setAriaMessage(__('Link copied to clipboard.', 'vk-blocks-pro'));
					setSnackbarVisible(true);
					setTimeout(() => setSnackbarVisible(false), 3000);
				})
				.catch(() => {
					// console.error('Failed to copy: ', error);
				});
		} else {
			// Clipboard API がサポートされていない場合のフォールバック
			const textArea = document.createElement('textarea');
			textArea.value = formattedUrl;
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();
			document.execCommand('copy');
			document.body.removeChild(textArea);
			setAriaMessage(__('Link copied to clipboard.', 'vk-blocks-pro'));
			setSnackbarVisible(true);
			setTimeout(() => setSnackbarVisible(false), 3000);
		}
	};

	const formatUrl = (url) => {
		if (
			url.startsWith('http://') ||
			url.startsWith('https://') ||
			url.startsWith('#') ||
			url === ''
		) {
			return url;
		}
		return 'http://' + url;
	};

	const handleEditLinkClick = () => {
		setIsEditingLink(!isEditingLink); // 編集モードを切り替える
	};

	const handleSubmit = () => {
		if (linkUrl) {
			setLinkUrl(formatUrl(linkUrl));
		}
	};

	const handleSaveEdit = () => {
		// リンク URL の保存
		setLinkUrl(linkUrl);
		// リンクの説明と rel 属性の保存
		setRelAttribute(relAttribute);
		setLinkDescription(linkDescription);
		setIsEditingLink(false); // 編集モードを終了する
	};

	// リンクを新しいタブで開くかどうかをチェックし、rel属性を更新
	const handleLinkTargetChange = (checked) => {
		setLinkTarget(checked ? '_blank' : '');
		if (checked) {
			setRelAttribute('noopener noreferrer');
		} else {
			setRelAttribute('');
		}
	};

	return (
		<>
			{/* リンク表示部分 */}
			<Dropdown
				popoverProps={{ placement: 'bottom-start' }}
				renderToggle={({ isOpen, onToggle }) => {
					const setLink = () => {
						handleToggle();
						onToggle();
					};
					return (
						<ToolbarButton
							aria-expanded={isOpen}
							icon={isOpen ? linkOff : link}
							isActive={!!linkUrl}
							label={
								isOpen
									? __('Unlink', 'vk-blocks-pro')
									: __('Input Link URL', 'vk-blocks-pro')
							}
							onClick={setLink}
							className={linkUrl ? 'is-pressed' : ''}
						/>
					);
				}}
				renderContent={({ onClose }) => (
					<div>
						{linkUrl && (
							<LinkPreview
								linkUrl={formatUrl(linkUrl)}
								linkTitle={linkTitle}
								icon={icon}
								linkTarget={linkTarget}
								onRemove={handleRemove}
								onCopy={handleCopy}
								onEditLinkClick={handleEditLinkClick}
							/>
						)}
						<form
							onSubmit={(e) => {
								e.preventDefault();
								handleSubmit();
								onClose();
							}}
						>
							<div className="vk-block-editor-url-input-wrapper">
								<URLInput
									__nextHasNoMarginBottom
									value={linkUrl}
									onChange={(value) => setLinkUrl(value)}
								/>
								<Button
									icon={keyboardReturn}
									label={__('Submit', 'vk-blocks-pro')}
									type="submit"
									disabled={isSubmitDisabled}
								/>
							</div>
							<CheckboxControl
								label={__('Open link new tab.', 'vk-blocks-pro')}
								checked={linkTarget === '_blank'}
								onChange={handleLinkTargetChange} // 新しいハンドラーを使用
							/>
						</form>

						{/* 編集モードの表示 */}
						{isEditingLink && (
							<div>
								<TextControl
									label={__('Rel Attribute', 'vk-blocks-pro')}
									value={relAttribute}
									onChange={(value) => setRelAttribute(value)}
								/>
								<TextControl
									label={__('Link Description', 'vk-blocks-pro')} // aria-labelとhidden textの統合
									value={linkDescription}
									onChange={(value) => setLinkDescription(value)}
								/>
								<Button isPrimary onClick={handleSaveEdit}>
									{__('Save', 'vk-blocks-pro')}
								</Button>
							</div>
						)}
					</div>
				)}
			/>
			{isSnackbarVisible && (
				<div
					aria-live="polite"
					style={{
						position: 'fixed',
						bottom: '-3.5rem',
						right: '0',
						zIndex: 9999,
						background: '#000',
						color: '#fff',
						padding: '10px',
						borderRadius: '4px',
						fontSize: '12px',
						lineHeight: '1.2',
					}}
				>
					{__('Link copied to clipboard.', 'vk-blocks-pro')}
				</div>
			)}
			<div
				aria-live="polite"
				style={{
					position: 'absolute',
					width: '1px',
					height: '1px',
					margin: '-1px',
					padding: '0',
					overflow: 'hidden',
					clip: 'rect(0,0,0,0)',
					border: '0',
				}}
			>
				{ariaMessage}
			</div>
		</>
	);
};

export default LinkToolbar;
