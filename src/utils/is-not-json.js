//引数がJSON or 文字列化されたJSONかをチェックする。
export const isNotJSON = ( insertImage ) => {
	//文字列か判定
	if ( typeof insertImage === 'string' ) {
		//パースしてJSONでなければtrueを返す
		try {
			JSON.parse( insertImage );
		} catch ( e ) {
			return true;
		}
		return false;

		//objectか判定
	} else if ( typeof insertImage === 'object' ) {
		//配列であればtrueをでなければJSONなのでfalseを返す
		return Array.isArray( insertImage );

		//それ以外の型であればtrueを返す
	}
	return true;
};
