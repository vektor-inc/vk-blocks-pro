import Sidebar from "./sidebar";

const icon = "smiley";

export const name = "vk-blocks";

export const settings = {
  icon,
  render: Sidebar
};

import apiFetch from "@wordpress/api-fetch";

// GET
apiFetch({ path: "/wp-json/wp/v2/blocks/460" }).then(posts => {
  console.log(posts);
});

// // POST
// apiFetch( {
// 	path: '/wp/v2/posts/1',
// 	method: 'POST',
// 	data: { title: 'New Post Title' },
// } ).then( res => {
// 	console.log( res );
// } );
export const fetchReusableBlocks = async () => {
  // TODO: these are potentially undefined, this fix is in place
  // until there is a filter to not use reusable blocks if undefined
  const postType = await apiFetch({ path: "/wp/v2/types/wp_block" });
  if (!postType) {
    return;
  }
  console.log(postType);

  // try {
  // 	let posts;

  // 	if ( id ) {
  // 		posts = [
  // 			await apiFetch( {
  // 				path: `/wp/v2/${ postType.rest_base }/${ id }`,
  // 			} ),
  // 		];
  // 	} else {
  // 		posts = await apiFetch( {
  // 			path: `/wp/v2/${ postType.rest_base }?per_page=-1`,
  // 		} );
  // 	}

  // 	const results = compact(
  // 		map( posts, ( post ) => {
  // 			if ( post.status !== 'publish' || post.content.protected ) {
  // 				return null;
  // 			}

  // 			return {
  // 				...post,
  // 				content: post.content.raw,
  // 				title: post.title.raw,
  // 			};
  // 		} )
  // 	);

  // 	if ( results.length ) {
  // 		dispatch( receiveReusableBlocksAction( results ) );
  // 	}

  // 	dispatch( {
  // 		type: 'FETCH_REUSABLE_BLOCKS_SUCCESS',
  // 		id,
  // 	} );
  // } catch ( error ) {
  // 	dispatch( {
  // 		type: 'FETCH_REUSABLE_BLOCKS_FAILURE',
  // 		id,
  // 		error,
  // 	} );
  // }
};
fetchReusableBlocks();
