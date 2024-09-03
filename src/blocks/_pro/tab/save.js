{
	"apiVersion": 2,
	"name": "vk-blocks/tab",
	"category": "vk-blocks-cat",
	"editorScript": "vk-blocks-build-js",
	"editorStyle": "vk-blocks-build-editor-css",
	"style": "vk-blocks/tab",
	"attributes": {
		"tabOptionJSON": {
			"type": "string",
			"default": "[]"
		},
		"tabSizeSp": {
			"type": "string",
			"default": "fitText"
		},
		"tabSizeTab": {
			"type": "string",
			"default": "fitText"
		},
		"tabSizePc": {
			"type": "string",
			"default": "fitText"
		},
		"firstActive": {
			"type": "number",
			"default": 0
		},
		"tabDisplayOptionsSp": {
			"type": "string",
			"default": "notSet"
		},
		"tabDisplayOptionsTab": {
			"type": "string",
			"default": "notSet"
		},
		"tabDisplayOptionsPc": {
			"type": "string",
			"default": "notSet"
		},
		"displayManyTabs": {
			"type": "boolean",
			"default": false
		},
		"showScrollMessage": {
			"type": "boolean",
			"default": false
		},
		"scrollMessageText": {
			"type": "string",
			"default": "You can scroll"
		},
		"scrollIconLeft": {
			"type": "string",
			"default": "fa-solid fa-caret-left"
		},
		"scrollIconRight": {
			"type": "string",
			"default": "fa-solid fa-caret-right"
		},
		"scrollBreakpoint": {
			"type": "string",
			"default": ""
		},
		"blockId": {
			"type": "string",
			"default": ""
		}
	},
	"supports": {
		"className": true
	}
}
