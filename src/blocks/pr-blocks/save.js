import { useBlockProps, RichText } from '@wordpress/block-editor';
import { isNotJSON } from '@vkblocks/utils/is-not-json';
import { Component } from '@wordpress/element';
import { fixBrokenUnicode } from '@vkblocks/utils/depModules';
import parse from 'html-react-parser';
import { isHexColor } from '@vkblocks/utils/is-hex-color';

export default function save(props) {
	const { attributes } = props;
	const containerClass = `vk_prBlocks row`;

	const blockProps = useBlockProps.save({
		className: containerClass,
	});

	return (
		<div {...blockProps}>
			<ComponentBlockSave attributes={attributes} blockNum={1} />
			<ComponentBlockSave attributes={attributes} blockNum={2} />
			<ComponentBlockSave attributes={attributes} blockNum={3} />
		</div>
	);
}

export class ComponentBlockSave extends Component {
	render() {
		const {
			heading1,
			heading2,
			heading3,
			content1,
			content2,
			content3,
			url1,
			url2,
			url3,
			urlOpenType1,
			urlOpenType2,
			urlOpenType3,
			icon1,
			icon2,
			icon3,
			color1,
			color2,
			color3,
			bgType1,
			bgType2,
			bgType3,
			insertImage1,
			insertImage2,
			insertImage3,
		} = this.props.attributes;
		const blockNum = this.props.blockNum;
		const blockNumArrIndex = this.props.blockNum - 1;

		const heading = [heading1, heading2, heading3];
		const content = [content1, content2, content3];
		const url = [url1, url2, url3];
		const urlOpenType = [urlOpenType1, urlOpenType2, urlOpenType3];
		const icon = [icon1, icon2, icon3];
		const color = [color1, color2, color3];
		const bgType = [bgType1, bgType2, bgType3];
		const insertImage = [insertImage1, insertImage2, insertImage3];

		let richTextH1Save = '';
		let richTextPSave = '';

		const renderSaveAltImage = (Image) => {
			if (isNotJSON(Image)) {
				return <img src={Image} alt="" />;
			}
			const IconImageParse = JSON.parse(fixBrokenUnicode(Image));
			return (
				<img
					src={IconImageParse.sizes.full.url}
					alt={IconImageParse.alt}
				/>
			);
		};

		const renderItemImage = (Image) => {
			const bgImage = Image[blockNumArrIndex];
			if (isNotJSON(bgImage)) {
				return {
					backgroundImage: `url(${bgImage})`,
					backgroundRepeat: 'no-repeat 50% center',
					backgroundSize: 'cover',
				};
			}
			const bgImageParse = JSON.parse(fixBrokenUnicode(bgImage));
			return {
				backgroundImage: `url(${bgImageParse.sizes.full.url})`,
				backgroundRepeat: 'no-repeat 50% center',
				backgroundSize: 'cover',
			};
		};

		const drawElement = (() => {
			if (insertImage[blockNumArrIndex]) {
				return (
					<div
						className="vk_prBlocks_item_image"
						style={renderItemImage(insertImage)}
					>
						{renderSaveAltImage(insertImage[blockNumArrIndex])}
					</div>
				);
			}

			let iconOuterClass = '';
			let iconOuterInlineStyle = {};
			let iconColor = '';
			if (color[blockNumArrIndex] !== undefined) {
				// アイコン背景:ベタ塗り
				if (bgType[blockNumArrIndex] === '0') {
					//カスタムカラーの時
					if (isHexColor(color[blockNumArrIndex])) {
						iconOuterClass = `has-background `;
						iconOuterInlineStyle = {
							backgroundColor: `${color[blockNumArrIndex]}`,
						};
						//カラーパレットの時
					} else {
						iconOuterClass = `has-background has-${color[blockNumArrIndex]}-background-color`;
					}
					// アイコン背景:背景なし
				} else if (bgType[blockNumArrIndex] === '1') {
					//カスタムカラーの時
					if (isHexColor(color[blockNumArrIndex])) {
						iconOuterClass = `has-text-color`;
						iconOuterInlineStyle = {
							border: `1px solid ${color[blockNumArrIndex]}`,
						};
						iconColor = color[blockNumArrIndex];
						//カラーパレットの時
					} else {
						iconOuterClass = `has-text-color has-${color[blockNumArrIndex]}-color`;
					}
				}
			}

			let faIcon = icon[blockNumArrIndex];
			//過去バージョンをリカバリーした時にiconを正常に表示する
			if (faIcon && !faIcon.match(/<i/)) {
				faIcon = `<i class="${faIcon}"></i>`;
			}
			//add class and inline css
			const faIconFragment = faIcon.split(' ');
			if (iconColor !== '') {
				faIconFragment[0] =
					faIconFragment[0] + ` style="color:${iconColor}" `;
			} else {
				faIconFragment[0] = faIconFragment[0] + ` `;
			}
			faIconFragment[1] = faIconFragment[1] + ` vk_prBlocks_item_icon `;
			const faIconTag = faIconFragment.join('');

			return (
				<div
					className={`vk_prBlocks_item_icon_outer ${iconOuterClass}`}
					style={iconOuterInlineStyle}
				>
					{parse(faIconTag)}
				</div>
			);
		})();

		// アイコン背景:背景なし
		let iconOutlineClass = '';
		if (bgType[blockNumArrIndex] === '1') {
			iconOutlineClass = 'is-style-outline';
		}

		richTextH1Save = (
			<RichText.Content
				className={`vk_prBlocks_item_title vk_prBlocks_item_title-${blockNum}`}
				tagName={'h3'}
				value={heading[blockNumArrIndex]}
			/>
		);
		richTextPSave = (
			<RichText.Content
				className={`vk_prBlocks_item_summary vk_prBlocks_item_summary-${blockNum}`}
				tagName={'p'}
				value={content[blockNumArrIndex]}
			/>
		);
		if (url[blockNumArrIndex]) {
			return (
				<div
					className={`vk_prBlocks_item col-sm-4 ${iconOutlineClass}`}
				>
					<a
						href={url[blockNumArrIndex]}
						className="vk_prBlocks_item_link"
						target={
							urlOpenType[blockNumArrIndex] ? '_blank' : '_self'
						}
						rel="noopener noreferrer"
					>
						{drawElement}
						{richTextH1Save}
						{richTextPSave}
					</a>
				</div>
			);
		}
		return (
			<div className={`vk_prBlocks_item col-sm-4 ${iconOutlineClass}`}>
				{drawElement}
				{richTextH1Save}
				{richTextPSave}
			</div>
		);
	}
}
