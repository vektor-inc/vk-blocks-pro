/* globals MutationObserver */
// import WordPress Scripts
import { useEffect } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

// Load VK Blocks Compornents
import { DisplayItemsControl } from '@vkblocks/components/display-items-control';
import { ColumnLayoutControl } from '@vkblocks/components/column-layout-control';
import { DisplayCondition } from '@vkblocks/components/display-condition';

export default function PostListEdit(props) {
	const { attributes, setAttributes, vkBlockParams, name } = props;
	attributes.name = name;

	const blockProps = useBlockProps();

	// リンクを無効にする関数
	const disableLinks = () => {
		const links = document.querySelectorAll(
			'.vk_post_imgOuter a, .vk_post .vk_post_title a, .postListText_title a, .card-intext .card-intext-inner, .postListText_singleTermLabel_inner, .vk_post_btnOuter a'
		);
		links.forEach((link) => {
			link.addEventListener('click', (event) => {
				event.preventDefault();
			});
			link.style.cursor = 'default';
			link.style.boxShadow = 'unset';

			// ホバー効果を無効化
			link.style.color = 'inherit';
			link.style.textDecorationColor = 'inherit';
		});
	};

	useEffect(() => {
		// MutationObserverでDOMの変化を監視
		const observer = new MutationObserver(disableLinks);

		// body全体を監視
		const targetNode = document.querySelector('body');
		observer.observe(targetNode, { childList: true, subtree: true });

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
					vkBlockParams={vkBlockParams}
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
