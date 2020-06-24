const { __ } = wp.i18n; // Import __() from wp.i18n
import { vkbBlockEditor } from "../../_helper/depModules";
const { RichText } = vkbBlockEditor;
const { Fragment } = wp.element;

import { convertToGrid } from "../../_helper/convert-to-grid";

export const DepPRcarditem = (props)=>{

	const {attributes,setAttributes,for_,className}=props;
	const{color, heading, content, icon, url, urlOpenType, bgType,col_xs,col_sm,col_md,col_lg,col_xl,activeControl}=attributes
	const align = JSON.parse(activeControl)

	let style;
	let iconStyle;
	if(bgType == '0'){
		style = {backgroundColor:`${color}`, border:`1px solid ${color}`}
		iconStyle = {color:`#ffffff`}
	}else{
		style = {backgroundColor:`transparent`, border:`1px solid ${color}`}
		iconStyle = {color:`${color}`}
	}

	let contents;
	if(for_ === "edit"){
		contents = <Fragment>
			<div className="vk_icon-card_item_icon_outer" style={style}>
				<i className={`${icon} vk_icon-card_item_icon`} style={iconStyle}/>
			</div>
			<RichText
				className={`vk_icon-card_item_title vk_icon-card_item_title has-text-align-${align.title}`}
				tagName={'h3'}
				onChange={(value) => props.setAttributes({ heading: value })}
				value={heading}
				placeholder={__('Input Title', 'vk-blocks')}
			 />
			 <RichText
				className={`vk_icon_card_item_summary vk_icon_card_item_summary has-text-align-${align.text}`}
				tagName={'p'}
                onChange={(value) => setAttributes({ content: value })}
                value={content}
                placeholder={__('Input Content', 'vk-blocks')}
			/>
		</Fragment>
	}else if(for_ === "save"){
		contents = <a href={url} className="vk_icon-card_item_link" target={urlOpenType ? "_blank" : "_self"} rel="noopener noreferrer">
			<div className="vk_icon-card_item_icon_outer" style={style}>
				<i className={`${icon} vk_icon-card_item_icon`} style={iconStyle}/>
			</div>
			<RichText.Content
				className={`vk_icon-card_item_title vk_icon-card_item_title has-text-align-${align.title}`}
				tagName={'h3'}
				value={heading} />
			<RichText.Content
				className={`vk_icon_card_item_summary vk_icon_card_item_summary has-text-align-${align.text}`}
				tagName={'p'}
				value={content} />
			</a>
	}

	return (
		<div
			className={`${className} vk_post vk_icon-card_item vk_post-col-xs-${convertToGrid(
				col_xs
			)} vk_post-col-sm-${convertToGrid(
				col_sm
			)} vk_post-col-md-${convertToGrid(
				col_md
			)} vk_post-col-lg-${convertToGrid(
				col_lg
			)} vk_post-col-xl-${convertToGrid(
				col_xl
			)}`}
		>
			{contents}
		</div>
	);
}

export const deprecated = [
  {
    attributes: {
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
				default: 3,
			},
			col_lg: {
				type: "number",
				default: 3,
			},
			col_xl: {
				type: "number",
				default: 3,
			},
			url: {
				type: "string",
				default: "",
			},
			activeControl: {
				type: "string",
				default: '{"title":"center","text":"center"}',
			},
			urlOpenType:{
				type: 'Boolean',
				default: false,
			},
			icon:{
				type: 'string',
				default: 'fas fa-file',
			},
			color:{
				type: 'string',
				default: '#0693e3',
			},
			bgType:{
				type: 'string',
				default: '1',
			},
			heading:{
				type: 'string',
				source: 'html',
				selector: '.vk_icon-card_item_title',
			},
			content:{
				type: 'string',
				source: 'html',
				selector: '.vk_icon_card_item_summary',
			}
		},
    save(props) {
      return (
        <DepPRcarditem {...props} for_={"save"} />
      );
    },
	}
];
