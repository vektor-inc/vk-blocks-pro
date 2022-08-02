/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * External dependencies
 *
 * https://github.com/react-monaco-editor/react-monaco-editor
 */
import MonacoEditor from '@monaco-editor/react';

export default function CustomCSSEdit({ attributes, setAttributes }) {
	const { content } = attributes;

	return (
		<>
			<div {...useBlockProps()}>
				<style>{content}</style>
				<MonacoEditor
					className="vk-custom-css"
					height="200px"
					defaultLanguage="css"
					theme="vs-dark"
					// theme="vs-light"
					options={{
						wordWrap: true,
						quickSuggestions: true,
					}}
					value={content}
					onChange={(value) => setAttributes({ content: value })}
				/>
			</div>
		</>
	);
}
