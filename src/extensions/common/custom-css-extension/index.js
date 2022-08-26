/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { hasBlockSupport } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { assign } from 'lodash';
import MonacoEditor from '@monaco-editor/react';
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import { EditorView } from '@codemirror/view';

/**
 * Internal dependencies
 */

export const inString = (str, keyword) => {
	return str.indexOf(keyword) !== -1;
};

export const isAddBlockCss = (blockName) => {
	const allowed = ['core', 'vk-blocks'];
	const returnBool =
		allowed.find((item) => inString(blockName, item)) !== undefined;
	return returnBool;
};

/**
 * Block.json
 *
 * @param {string} settings
 */
addFilter('blocks.registerBlockType', 'vk-blocks/custom-css', (settings) => {
	if (
		isAddBlockCss(settings.name) &&
		hasBlockSupport(settings.name, 'customClassName', true)
	) {
		settings.attributes = assign(settings.attributes, {
			vkbCustomCss: {
				type: 'string',
				default: null,
			},
		});
	}
	return settings;
});

/**
 * edit.js
 */
addFilter(
	'editor.BlockEdit',
	'vk-blocks/custom-css',
	createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			const { name, attributes, setAttributes, isSelected } = props;
			const { vkbCustomCss } = attributes;
			const hasCustomClassName = hasBlockSupport(
				name,
				'customClassName',
				true
			);
			if (isAddBlockCss(name) && hasCustomClassName && isSelected) {
				return (
					<>
						<BlockEdit {...props} />
						<InspectorControls>
							<PanelBody
								className={'vk-custom-css-editor-panel-body'}
								title={__('Custom CSS', 'vk-blocks')}
								initialOpen={false}
							>
								CodeMirror
								<CodeMirror
									className="custom-css-editor"
									height="200px"
									// https://uiwjs.github.io/react-codemirror/#/extensions/color
									extensions={[
										css(),
										EditorView.lineWrapping,
									]}
									value={vkbCustomCss ? vkbCustomCss : ''}
									onChange={(value) => {
										setAttributes({ vkbCustomCss: value });
									}}
								/>
								MonacoEditor
								<MonacoEditor
									className="custom-css-editor"
									width="100%"
									height="200px"
									theme="vs-dark"
									defaultLanguage="css"
									options={{
										wordWrap: true,
										quickSuggestions: false, //コンテンツエリアに被るため無効
									}}
									value={vkbCustomCss ? vkbCustomCss : ''}
									onChange={(value) => {
										setAttributes({ vkbCustomCss: value });
									}}
								/>
							</PanelBody>
						</InspectorControls>
					</>
				);
			}
			return <BlockEdit {...props} />;
		};
	}, 'vkbCustomCss')
);

/**
 * edit.js
 */
addFilter(
	'editor.BlockListBlock',
	'vk-blocks/custom-css',
	createHigherOrderComponent((BlockListBlock) => {
		return (props) => {
			const cssTag = props.attributes.vkbCustomCss
				? props.attributes.vkbCustomCss
				: '';
			return (
				<>
					{cssTag ? <style>{cssTag}</style> : null}
					<BlockListBlock {...props} />
				</>
			);
		};
	}, 'vkbCustomCss')
);

/**
 * save.js
 */
addFilter(
	'blocks.getSaveElement',
	'vk-blocks/custom-css',
	(el, type, attributes) => {
		const cssTag = attributes.vkbCustomCss;
		if (!cssTag) {
			return el;
		}
		// NOTE: useBlockProps + style要素を挿入する場合、useBlockPropsを使った要素が最初（上）にこないと、
		// カスタムクラスを追加する処理が失敗する
		return (
			<>
				{el}
				<style type="text/css">{cssTag}</style>
			</>
		);
	}
);
