const licenseKeyElem = document.getElementById('vk-blocks-pro-license-key');
licenseKeyElem.addEventListener('blur', () => {
	licenseKeyElem.value = licenseKeyElem.value.trim();
});
