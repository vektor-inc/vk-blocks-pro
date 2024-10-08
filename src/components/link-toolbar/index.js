import { useState, useEffect } from 'react';
import {
	ToolbarButton,
	Dropdown,
	CheckboxControl,
	Button,
	Tooltip,
} from '@wordpress/components';
import { URLInput } from '@wordpress/block-editor';
import { __, sprintf } from '@wordpress/i18n';
import { link, linkOff, keyboardReturn, globe, copy } from '@wordpress/icons';

const LinkPreview = ({
	linkUrl,
	linkTitle,
	icon,
	linkTarget,
	onRemove,
	onCopy,
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
					text={sprintf(
						__('Copy link: %s', 'vk-blocks-pro'),
						linkUrl
					)}
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

	useEffect(() => {
		if (linkUrl) {
			const formattedUrl = formatUrl(linkUrl);
			const isExternalLink =
				!formattedUrl.startsWith(window.location.origin) &&
				!formattedUrl.startsWith('#'); // 外部リンクかどうか判定

			// 外部リンクの場合はプレビュー（タイトル取得）をスキップする
			if (!isExternalLink) {
				const fetchTitle = function (url) {
					if (url.startsWith('#')) {
						return Promise.resolve(url); // アンカーリンクの場合はそのまま返す
					}
					return fetch(url, { method: 'GET' })
						.then((response) => response.text())
						.then((text) => {
							const titleMatch = text.match(
								/<title>(.*?)<\/title>/i
							);
							return titleMatch ? titleMatch[1] : url;
						})
						.catch(() => {
							return url;
						});
				};

				fetchTitle(formattedUrl).then((title) => {
					setLinkTitle(title);
				});
			} else {
				// 外部リンクの場合はそのままリンクURLをタイトルとして設定する
				setLinkTitle(formattedUrl);
			}

			// アイコン設定
			if (isExternalLink) {
				setIcon(globe); // 外部リンクの場合は地球アイコン
			} else if (formattedUrl.startsWith('#')) {
				setIcon(globe); // アンカーリンクにも地球アイコンを使用
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
					setAriaMessage(
						__('Link copied to clipboard.', 'vk-blocks-pro')
					);
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

	// URLのフォーマット関数を更新
	const formatUrl = (url) => {
		// 絶対パス・相対パス・アンカーリンクであればそのまま返す
		if (
			url.startsWith('http://') ||
			url.startsWith('https://') ||
			url.startsWith('/') ||
			url.startsWith('#') ||
			url === ''
		) {
			return url;
		}
		// その他のリンクは http:// を付加する
		return 'http://' + url;
	};

	const handleSubmit = () => {
		if (linkUrl) {
			setLinkUrl(formatUrl(linkUrl));
		}
	};

	return (
		<>
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
								label={__(
									'Open link new tab.',
									'vk-blocks-pro'
								)}
								checked={linkTarget === '_blank'}
								onChange={(checked) =>
									setLinkTarget(checked ? '_blank' : '')
								}
							/>
						</form>
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
