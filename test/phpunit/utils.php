<?php

//開発環境のURLヘ変更
function replaceURL( $url ) {
	return str_replace('http://localhost:8888','http://localhost:8889',$url);
}


function unescapeHTML( $html ) {
	// バックスラッシュを削除
	$html = str_replace('\\','',$html);

	// URLを開発環境に変更
	return replaceURL($html);
}
