export const schema = {
  selectId: {
		type: "number",
		default: -1,
  },
  name: {
    type: "string",
    default: "",
  },
  layout: {
    type: "string",
    default: "card-horizontal",
  },
  col_xs: {
    type: "number",
    default: 1,
  },
  col_sm: {
    type: "number",
    default: 2,
  },
  col_md: {
    type: "number",
    default: 2,
  },
  col_lg: {
    type: "number",
    default: 2,
  },
  col_xl: {
    type: "number",
    default: 2,
  },
  display_image: {
    type: "boolean",
    default: true,
  },
  display_image_overlay_term: {
    type: "boolean",
    default: true,
  },
  display_excerpt: {
    type: "boolean",
    default: true,
  },
  display_date: {
    type: "boolean",
    default: false,
  },
  display_new: {
    type: "boolean",
    default: false,
  },
  display_btn: {
    type: "boolean",
    default: true,
  },
  new_date: {
    type: "number",
    default: 7,
  },
  new_text: {
    type: "string",
    default: "New!!",
  },
  btn_text: {
    type: "string",
    default: "Read more",
  },
  btn_align: {
    type: "string",
    default: "text-right",
  },
  numberPosts: {
    type: "number",
    default: 6,
  },
  isCheckedPostType: {
    type: "string",
    default: '["post"]',
  },
  coreTerms: {
    type: "string",
    default: "[]",
  },
  isCheckedTerms: {
    type: "string",
    default: "{}",
  },
  className: {
    type: "string",
    default: "",
  },
  selfIgnore: {
    type: "boolean",
    default: false,
  },
};
