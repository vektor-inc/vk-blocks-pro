<?php
/**
 * VK_Blocks_Blog_Card class
 *
 * @package vk-blocks
 */

if ( class_exists( 'VK_Blocks_Blog_Card' ) ) {
	return;
}

/**
 * VK_Blocks_Blog_Card
 */
class VK_Blocks_Blog_Card {

	/**
	 * Initialize
	 *
	 * @return VK_Blocks_Blog_Card
	 */
	public static function init() {
		static $instance                         = null;
		return $instance ? $instance : $instance = new static();
	}


	/**
	 * Get Blog Card Data
	 *
	 * @param url     $url URL.
	 * @param boolean $clear_cache キャッシュクリアするか否か.
	 * @return array vk_get_blog_card_data
	 */
	public static function vk_get_blog_card_data( $url, $clear_cache = false ) {
		$post_id = url_to_postid( $url );

		// Transient per URL.
		$cache_key = static::build_cache_key_for_url( $url );

		// Attempt to retrieve cached response.
		$cached_response = static::get_cache( $cache_key );

		if ( ! empty( $cached_response ) && ! $clear_cache ) {
			$data = $cached_response;
		} elseif ( $post_id ) {
				/**
				 * $post_idが取得できる時
				 */
				$data = static::vk_get_blog_card_data_from_post_id( $post_id );
		} else {
			/**
			 * $post_idが取得できない場合
			 */
			$data = static::vk_get_blog_card_data_from_url( $url );
			static::set_cache( $cache_key, $data );
		}

		return $data;
	}

	/**
	 * 外部サイトの場合のブログカードdata
	 *
	 * @param url $url URL.
	 * @return array.
	 */
	public static function vk_get_blog_card_data_from_url( $url ) {
		/**
		 * リンク先のHTMLを取得
		 */
		$response = wp_remote_get( $url );

		/**
		 * HTTP レスポンスステータスコードで条件分岐
		 */
		$status_code = wp_remote_retrieve_response_code( $response );
		if ( 200 !== $status_code && 304 !== $status_code ) {
			$blog_card_data['url']          = $url;
			$blog_card_data['cannot_embed'] = true;
			return $blog_card_data;
		}

		// URLが埋め込み可能かチェック
		$is_embeddable = wp_oembed_get( $url );
		if ( ! $is_embeddable ) {
			$blog_card_data['url']          = $url;
			$blog_card_data['cannot_embed'] = true;
			return $blog_card_data;
		}

		// URLのHTMLを$bodyに入れる
		$body = $response['body'];
		// 取得したHTMLを今のサイトの文字コードにencode
		$body = static::encode( $body );

		/**
		 * ブログカードに必要な情報を取得
		 */
		$blog_card_data['cannot_embed']   = false;
		$blog_card_data['url']            = $url;
		$blog_card_data['title']          = static::get_title( $body );
		$blog_card_data['featured_image'] = static::get_featured_image( $body );
		$blog_card_data['excerpt']        = static::get_excerpt( $body );
		$blog_card_data['site_logo']      = static::get_site_logo( $body );
		$blog_card_data['site_title']     = static::get_site_name( $body );
		$blog_card_data['domain']         = static::get_domain( $url );

		// domain以外何もない場合はcannot_embedをtrueにする
		if ( ! empty( $url ) && empty( $blog_card_data['title'] ) && empty( $blog_card_data['featured_image'] ) && empty( $blog_card_data['excerpt'] ) && empty( $blog_card_data['site_logo'] ) && empty( $blog_card_data['site_title'] ) ) {
			$blog_card_data['cannot_embed'] = true;
		}

		return $blog_card_data;
	}

	/**
	 * 内部リンク ブログカードdata
	 *
	 * @param string $post_id post_id.
	 * @return array.
	 */
	public static function vk_get_blog_card_data_from_post_id( $post_id ) {

		/**
		 * ブログカードに必要な情報を取得
		 */
		$blog_card_data['post_id']        = $post_id;
		$blog_card_data['cannot_embed']   = false;
		$blog_card_data['url']            = get_permalink( $post_id );
		$blog_card_data['title']          = get_the_title( $post_id );
		$blog_card_data['featured_image'] = get_the_post_thumbnail_url( $post_id, 'large' );
		$blog_card_data['excerpt']        = get_the_excerpt( $post_id );
		$blog_card_data['site_logo']      = get_site_icon_url( 32 );
		$blog_card_data['site_title']     = get_bloginfo( 'name' );
		$blog_card_data['domain']         = home_url();

		return $blog_card_data;
	}

	/**
	 * タイトルを取得
	 *
	 * @param string $body body.
	 * @return string
	 */
	public static function get_title( $body ) {
		if ( preg_match( '/title>(.+?)<\/title/is', $body, $matches ) ) {
			return $matches[1];
		}
		return '';
	}

	/**
	 * サムネイルを取得
	 *
	 * @param string $body body.
	 * @return string
	 */
	public static function get_featured_image( $body ) {
		if ( preg_match( '/<meta.+?property=["\']og:image["\'][^\/>]*?content=["\']([^"\']+?)["\'].*?\/?>/is', $body, $matches ) ) {
			return $matches[1];
		}
		return '';
	}

	/**
	 * 説明文を取得
	 *
	 * @param string $body body.
	 * @return string
	 */
	public static function get_excerpt( $body ) {
		if ( preg_match( '/<meta.+?property=["\']og:description["\'][^\/>]*?content=["\']([^"\']+?)["\'].*?\/?>/is', $body, $matches ) ) {
			return $matches[1];
		}
		return '';
	}

	/**
	 * ファビコンを取得
	 *
	 * @param string $body body.
	 * @return string
	 */
	public static function get_site_logo( $body ) {
		if ( preg_match( '/<link [^>]*?rel=["\']icon["\'][^\/>]*? href=["\']([^"\']+?)["\'][^\/>]*?\/?>/si', $body, $matches ) && static::is_url( $matches[1] ) ) {
			return $matches[1];
		}
		if ( preg_match( '/<link [^>]*?rel=["\']shortcut icon["\'][^\/>]*? href=["\']([^"\']+?)["\'][^\/>]*?\/?>/si', $body, $matches ) && static::is_url( $matches[1] ) ) {
			return $matches[1];
		}
		return '';
	}

	/**
	 * サイト名
	 *
	 * @param string $body body.
	 * @return string
	 */
	public static function get_site_name( $body ) {
		if ( preg_match( '/<meta.+?property=["\']og:site_name["\'][^\/>]*?content=["\']([^"\']+?)["\'].*?\/?>/is', $body, $matches ) ) {
			return $matches[1];
		}
		return '';
	}

	/**
	 * ドメイン
	 *
	 * @param string $url url.
	 * @return string
	 */
	public static function get_domain( $url ) {
		$domain = wp_parse_url( $url );
		return $domain['scheme'] . '://' . $domain['host'];
	}

	/**
	 * URL httpから始まるURLかどうか
	 *
	 * @param string $url url.
	 * @return boolean
	 */
	public static function is_url( $url ) {
		if ( filter_var( $url, FILTER_VALIDATE_URL ) && preg_match( '|^https?://.*$|', $url ) ) {
			return true;
		}
		return false;
	}

	/**
	 * Encode.
	 * body部分をエンコードする
	 * 参考：https://github.com/inc2734/wp-oembed-blog-card/blob/HEAD/src/App/Model/Requester.php#L146
	 *
	 * @param string $body body.
	 * @return string
	 */
	public static function encode( $body ) {
		if ( ! function_exists( 'mb_convert_encoding' ) || ! $body ) {
			return $body;
		}

		foreach ( array( 'UTF-8', 'SJIS', 'EUC-JP', 'ASCII', 'JIS' ) as $encode ) {
			$encoded_content = mb_convert_encoding( $body, $encode, $encode );
			if ( strcmp( $body, $encoded_content ) === 0 ) {
				$from_encode = $encode;
				break;
			}
		}

		if ( empty( $from_encode ) ) {
			return $body;
		}

		return mb_convert_encoding( $body, get_bloginfo( 'charset' ), $from_encode );
	}

	/**
	 * Utility function to build cache key for a given URL.
	 *
	 * @param string $url The URL for which to build a cache key.
	 * @return string The cache key.
	 */
	public static function build_cache_key_for_url( $url ) {
		return 'vk_blocks_g_url_details_response_' . md5( $url );
	}

	/**
	 * Utility function to retrieve a value from the cache at a given key.
	 *
	 * @param string $key The cache key.
	 * @return mixed The value from the cache.
	 */
	public static function get_cache( $key ) {
		return get_site_transient( $key );
	}

	/**
	 * Utility function to cache a given data set at a given cache key.
	 *
	 * @param string $key  The cache key under which to store the value.
	 * @param string $data The data to be stored at the given cache key.
	 * @return bool True when transient set. False if not set.
	 */
	public static function set_cache( $key, $data = '' ) {
		$ttl = HOUR_IN_SECONDS;

		return set_site_transient( $key, $data, $ttl );
	}
}
