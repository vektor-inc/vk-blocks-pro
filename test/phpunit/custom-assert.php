<?php
use PHPUnit\Framework\Assert;

/**
 * Custom assertion class extending PHPUnit\Framework\Assert.
 */
class VkCustomAssert extends Assert {

    /**
     * 文字列内に不特定の数値が含まれる場合、'%d'をプレースホルダとして使用することで、テストに通過するカスタムアサーション
     *
     * @param string $expected 数値を含む文字列の期待されるフォーマットパターン（'%d'を含む）。
     * @param string $actual パターンと照合する文字列。
     * @param string $message 失敗時に表示されるカスタムメッセージ (デフォルト: '')
     * @throws PHPUnit\Framework\AssertionFailedError
     */  
    public static function assertStringMatchesNumericFormat( $expected, $actual, $message = '' ) {
        // %d を一時的な文字列（NUMERIC_PLACEHOLDER）に置き換え
        $pattern = str_replace( '%d', 'NUMERIC_PLACEHOLDER', $expected );
		// preg_quote で / をエスケープ
        $pattern = preg_quote( $pattern, '/' );
        // 一時的な文字列（NUMERIC_PLACEHOLDER）を任意の数値が一つ以上連続にマッチする正規表現 \d+ に変換
        $pattern = str_replace( 'NUMERIC_PLACEHOLDER', '\d+', $pattern );

        // 完全一致をチェックするため、正規表現のパターンに開始と終了のアンカーを追加
        $pattern = sprintf( '/^%s$/', $pattern );

        // マッチしたかどうかをチェック
        $match = preg_match( $pattern, $actual );

        // マッチしなかった場合は失敗
        static::assertTrue( 1 == $match, $message );
    }
}
