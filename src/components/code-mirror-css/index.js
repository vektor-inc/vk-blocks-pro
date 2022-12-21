/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import classnames from 'classnames';
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import { EditorView } from '@codemirror/view';

export const CodeMirrorCss = (props) => {
	const {
		id = 'vk-custom-css-code-mirror',
		className,
		height = '200px',
		value,
		onChange,
		style = {
			...style,
			marginTop: "0.5em",
			border: "1px solid #ccc",
		}
	} = props;

	return (
		<>
			<CodeMirror
				id={id}
				className={classnames(`vk_custom-css-editor`, className)}
				height={height}
				// https://uiwjs.github.io/react-codemirror/#/extensions/color
				extensions={[css(), EditorView.lineWrapping]}
				value={value}
				onChange={onChange}
				style={style}
			/>
			{(() => {
				if (value && value.indexOf('　') !== -1) {
					return (
						<p>
							{__(
								'Note : Contains double-byte spaces; CSS may not work.',
								'vk-blocks'
							)}
						</p>
					);
				}
			})()}
		</>
	);
};
