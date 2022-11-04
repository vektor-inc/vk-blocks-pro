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
	} = props;

	return (
		<CodeMirror
			id={id}
			className={classnames(`vk_custom-css-editor`, className)}
			height={height}
			// https://uiwjs.github.io/react-codemirror/#/extensions/color
			extensions={[css(), EditorView.lineWrapping]}
			value={value}
			onChange={onChange}
		/>
	);
};
