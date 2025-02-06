/**
 * cover-style block type
 *
 * @package
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import LinkToolbar from '@vkblocks/components/link-toolbar';
import { __ } from '@wordpress/i18n';

const isCoverBlock = (name) => name === 'core/cover';

const addLinkAttributesToCoverBlock = (settings, name) => {
	if (!isCoverBlock(name)) {
		return settings;
	}

	settings.attributes = {
		...settings.attributes,
		linkUrl: {
			type: 'string',
			default: '',
		},
		linkTarget: {
			type: 'string',
			default: '',
		},
		relAttribute: {
			type: 'string',
			default: '',
		},
		linkDescription: {
			type: 'string',
			default: '',
		},
	};

	return settings;
};
addFilter(
	'blocks.registerBlockType',
	'custom/add-link-attributes',
	addLinkAttributesToCoverBlock
);

const enhanceCoverBlock = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if (!isCoverBlock(props.name)) {
			return <BlockEdit {...props} />;
		}

		const {
			attributes: { linkUrl, linkTarget, relAttribute, linkDescription },
			setAttributes,
		} = props;

		return (
			<Fragment>
				<BlockEdit {...props} />
				<BlockControls>
					<ToolbarGroup>
						<LinkToolbar
							linkUrl={linkUrl}
							setLinkUrl={(url) =>
								setAttributes({ linkUrl: url })
							}
							linkTarget={linkTarget}
							setLinkTarget={(target) =>
								setAttributes({ linkTarget: target })
							}
							relAttribute={relAttribute}
							setRelAttribute={(rel) =>
								setAttributes({ relAttribute: rel })
							}
							linkDescription={linkDescription}
							setLinkDescription={(description) =>
								setAttributes({ linkDescription: description })
							}
						/>
					</ToolbarGroup>
				</BlockControls>
			</Fragment>
		);
	};
}, 'enhanceCoverBlock');
addFilter('editor.BlockEdit', 'custom/enhance-cover-block', enhanceCoverBlock);

/**
 * 元の save 関数をラップし、リンク属性がある場合に上書きした保存処理を返す関数
 *
 * @param {Function} originalSave 既存の save 関数
 * @return {Function} 上書き用の save 関数
 */
const newCoverBlockSave = (originalSave) => {
	return (props) => {
		// オリジナルの保存要素を取得
		const element = originalSave(props);
		const { linkUrl, linkTarget, relAttribute, linkDescription } =
			props.attributes;

		// リンク URL が設定されていなければ元の要素をそのまま返す
		if (!linkUrl) {
			return element;
		}

		// 既存のクラス名やスタイルを取得
		const existingClassName = element.props.className || '';
		const classNameWithLink = `${existingClassName} has-link`.trim();
		const existingStyle = element.props.style || {};

		// ラッパー <div> 内にオリジナルの子要素とリンク用の <a> 要素を追加
		return (
			<div className={classNameWithLink} style={existingStyle}>
				{element.props.children}
				<a
					href={linkUrl}
					{...(linkTarget ? { target: linkTarget } : {})}
					{...(relAttribute ? { rel: relAttribute } : {})}
					className="wp-block-cover-vk-link"
				>
					<span className="screen-reader-text">
						{linkDescription
							? linkDescription
							: __('Cover link', 'vk-blocks-pro')}
					</span>
				</a>
			</div>
		);
	};
};

import { assign } from 'lodash';

/**
 * core/cover ブロックの設定を上書きするフィルター関数
 *
 * @param {Object} settings ブロックの設定オブジェクト
 * @param {string} name     ブロック名
 * @return {Object} 変更後の設定オブジェクト
 */
const insertLinkIntoCoverBlock = (settings, name) => {
	// 対象が core/cover ブロックでなければそのまま返す
	if (name !== 'core/cover') {
		return settings;
	}

	// 元の save 関数を取得して、新しい save 関数を作成
	const originalSave = settings.save;
	const save = newCoverBlockSave(originalSave);

	// lodash の assign を使って新しい設定オブジェクトを作成
	const newSettings = assign({}, settings, {
		save,
	});

	return newSettings;
};

addFilter(
	'blocks.registerBlockType',
	'custom/insert-link-into-cover-block',
	insertLinkIntoCoverBlock
);
