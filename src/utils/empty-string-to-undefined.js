export const emptyStringToUndefined = (string) => {
	// 空白文字ならundefinedを返す
	return string !== '' ? string : undefined;
};
