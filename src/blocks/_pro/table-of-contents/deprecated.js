const deprecated = [
	{
		attributes: {
			style: {
				type: "string",
				default: "default",
			},
			renderHtml: {
				type: "string",
				default: "",
			},
			open: {
				type: "string",
				default: "open",
			},
			className: {
				type: "string",
				default: "",
			},
		},
		save() {
			return null
		},
	}
];
export default deprecated;
