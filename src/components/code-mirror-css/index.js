/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { transformStyles } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { Tooltip, Icon } from '@wordpress/components';
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
		height = '200px',
		value,
		onChange,
		style = {
			...style,
			marginTop: '0.5em',
			border: '1px solid #ccc',
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

	return (
		<div
			className="vk_custom-css-editor-wrapper"
			style={{ position: 'relative' }}
		>
			<CodeMirror
				id={id}
				className={classnames(`vk_custom-css-editor`, className)}
				height={height}
				// https://uiwjs.github.io/react-codemirror/#/extensions/color
				extensions={[css(), EditorView.lineWrapping]}
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
				style={style}
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
