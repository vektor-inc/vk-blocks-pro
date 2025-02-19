/* globals MutationObserver, vk_block_post_type_params */
// import WordPress Scripts
import { useEffect } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

// Load VK Blocks Compornents
import { DisplayItemsControl } from '@vkblocks/components/display-items-control';
import { ColumnLayoutControl } from '@vkblocks/components/column-layout-control';
import { DisplayCondition } from '@vkblocks/components/display-condition';

export default function PostListEdit(props) {
	const { attributes, setAttributes } = props;

	const postTypesProps = vk_block_post_type_params.post_type_option;
	const termsByTaxonomyName = vk_block_post_type_params.term_by_taxonomy_name;

	const blockProps = useBlockProps();

	// リンクを無効にする関数
	const disableLinks = () => {
		// iframe の有無を確認して適切なドキュメントを取得
		const iframe = document.querySelector('.block-editor-iframe__container iframe');
		const targetDocument = iframe?.contentWindow?.document || document;

		const links = targetDocument.querySelectorAll(
			'.vk_post_imgOuter a, .vk_post .vk_post_title a, .postListText_title a, .card-intext .card-intext-inner, .postListText_singleTermLabel_inner, .vk_post_btnOuter a'
		);
		links.forEach((link) => {
			link.addEventListener('click', (event) => {
				event.preventDefault();
			});
			link.style.cursor = 'default';
			link.style.boxShadow = 'unset';
			// ホバー効果を無効化
			link.style.textDecorationColor = 'inherit';
		});
	};

	useEffect(() => {
		// MutationObserverでDOMの変化を監視
		const iframe = document.querySelector('.block-editor-iframe__container iframe');
		const targetDocument = iframe?.contentWindow?.document || document;
		const observerTarget = targetDocument.querySelector('body');

		const observer = new MutationObserver(disableLinks);
		if (observerTarget) {
			observer.observe(observerTarget, { childList: true, subtree: true });
		}

		// 初回およびattributesの変更時にリンクを無効化
		disableLinks();

		// クリーンアップ関数
		return () => {
			observer.disconnect(); // 監視を停止
		};
	}, [attributes]);

	return (
		<>
			<InspectorControls>
				<DisplayCondition
					attributes={attributes}
					setAttributes={setAttributes}
					postTypesProps={postTypesProps}
					termsByTaxonomyName={termsByTaxonomyName}
				/>
				<ColumnLayoutControl {...props} />
				<DisplayItemsControl {...props} />
			</InspectorControls>
			<div {...blockProps}>
				<ServerSideRender
					block="vk-blocks/post-list"
					attributes={attributes}
					onRendered={disableLinks}
				/>
			</div>
		</>
	);
}
