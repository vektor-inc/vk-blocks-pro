//objectから、指定したプロパティを削除して、新しいobjectを返す。
export default ( object, removeProperty ) => {
	let newObject;
	if ( object[ removeProperty ] ) {
		newObject = { ...object };
		delete newObject[ removeProperty ];
	} else {
		newObject = object;
	}
	return newObject;
};
