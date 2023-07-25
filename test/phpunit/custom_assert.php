<?php

use PHPUnit\Framework\Assert;
class CustomAssert extends Assert {
    public static function assertStringMatchesNumericFormat($expected, $actual, $message = '') {
        // %d を任意の数値にマッチする正規表現に変換
        $pattern = str_replace('%d', '\d+', $expected);

        // preg_quoteを使って正規表現をエスケープし、その後で%dを数字に置き換える
        $pattern = sprintf('/%s/', preg_quote($pattern, '/'));

        // マッチしたかどうかをチェック
        $match = preg_match($pattern, $actual);

        // マッチしなかった場合は失敗
        static::assertNotFalse($match, $message);
    }
}