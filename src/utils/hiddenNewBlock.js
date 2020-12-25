export const hiddenNewBlock = (version) => {
	if (!Number(version)) {
		return;
	}

	let inserterVisible = true;
	if (version > parseFloat(wpVersion)) {
		inserterVisible = false;
	}
	return inserterVisible;
};
