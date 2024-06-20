/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { transformStyles } from '@wordpress/block-editor';
import { useState, useRef, useEffect } from '@wordpress/element';
import { Tooltip, Icon, ResizeObserver } from '@wordpress/components';
import { info } from '@wordpress/icons';

/**
 * External dependencies
 */
import classnames from 'classnames';
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import { EditorView } from '@codemirror/view';

/**
 * Internal dependencies
 */
import { stripHTML } from '@vkblocks/utils/strip-html';

export const CodeMirrorCss = (props) => {
	const {
		id = 'vk-custom-css-code-mirror',
		className,
		value,
		onChange,
		style = {
			...style,
			marginTop: '0.5em',
			border: '1px solid #ccc',
			height: '200px',
			resize: 'vertical',
			overflow: 'hidden',
		},
		onBlur = (event) => {
			if (!event?.target?.textContent) {
				setCSSError(null);
				return;
			}

			const [transformed] = transformStyles(
				[{ css: event.target.textContent }],
				'.editor-styles-wrapper'
			);

			setCSSError(
				transformed === null
					? __(
							'There is an error with your CSS structure.',
							'vk-blocks-pro'
						)
					: null
			);
		},
	} = props;
	const [cssError, setCSSError] = useState(null);
	const wrapperRef = useRef(null);
	const [isInitialLoad, setIsInitialLoad] = useState(true);

	// リサイズ検知して高さを動的に調整
	useEffect(() => {
		if (wrapperRef.current) {
			const observer = new ResizeObserver(() => {
				if (isInitialLoad) {
					wrapperRef.current.style.setProperty(
						'height',
						'auto',
						'important'
					);
					setIsInitialLoad(false);
				}
			});
			observer.observe(wrapperRef.current);
			return () => observer.disconnect();
		}
	}, [isInitialLoad]);

	// gutterの高さ検知して動的に調整
	useEffect(() => {
		if (wrapperRef.current) {
			const gutters = wrapperRef.current.querySelector('.cm-gutters');
			if (gutters) {
				const observer = new ResizeObserver(() => {
					const guttersHeight = gutters.offsetHeight;
					if (guttersHeight < 200) {
						gutters.style.setProperty(
							'minHeight',
							'200px',
							'important'
						);
					} else {
						gutters.style.minHeight = '';
					}
				});
				observer.observe(gutters);
				return () => observer.disconnect();
			}
		}
	}, [value]);

	const customStyleExtension = EditorView.theme({
		'.cm-editor': {
			minHeight: '200px',
			height: '100%',
			overflowY: 'auto',
			resize: 'vertical',
		},
		'.cm-scroller': {
			minHeight: '200px',
			overflow: 'auto',
		},
	});

	return (
		<div
			className="vk_custom-css-editor-wrapper"
			style={{ position: 'relative' }}
		>
			<CodeMirror
				id={id}
				className={classnames(`vk_custom-css-editor`, className)}
				height="100%" // 内部のエディタをラッパーの高さに合わせる
				// https://uiwjs.github.io/react-codemirror/#/extensions/color
				extensions={[
					css(),
					EditorView.lineWrapping,
					customStyleExtension,
				]}
				value={value}
				onChange={(newValue) => {
					onChange(stripHTML(newValue));

					const [transformed] = transformStyles(
						[{ css: newValue }],
						'.editor-styles-wrapper'
					);
					if (transformed) {
						setCSSError(null);
					}
				}}
				style={{
					...style,
					height: '200px',
					minHeight: '200px',
					resize: 'vertical',
				}}
				onBlur={(event) => {
					onBlur(event);
				}}
			/>
			{cssError && (
				<Tooltip text={cssError}>
					<div
						style={{
							position: 'absolute',
							bottom: '0px',
							right: '5px',
						}}
					>
						<Icon icon={info} style={{ fill: '#cc1818' }} />
					</div>
				</Tooltip>
			)}
			{(() => {
				if (value && value.indexOf('　') !== -1) {
					return (
						<p>
							{__(
								'Note : Contains double-byte spaces; CSS may not work.',
								'vk-blocks-pro'
							)}
						</p>
					);
				}
			})()}
		</div>
	);
};
